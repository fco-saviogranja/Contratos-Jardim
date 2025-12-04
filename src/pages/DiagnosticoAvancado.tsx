import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Loader, RefreshCw, Server, Database, Key, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-1a8b02da`;

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error' | 'warning';
  message: string;
  details?: any;
  duration?: number;
}

export function DiagnosticoAvancado() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [testing, setTesting] = useState(false);
  const [currentTest, setCurrentTest] = useState('');

  const updateResult = (name: string, status: TestResult['status'], message: string, details?: any, duration?: number) => {
    setResults(prev => {
      const existing = prev.findIndex(r => r.name === name);
      const newResult = { name, status, message, details, duration };
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newResult;
        return updated;
      }
      return [...prev, newResult];
    });
  };

  const runDiagnostics = async () => {
    setTesting(true);
    setResults([]);

    // 1. Testar configuração básica
    setCurrentTest('Verificando configuração...');
    updateResult('config', 'pending', 'Verificando variáveis de ambiente...');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!projectId || !publicAnonKey) {
      updateResult('config', 'error', 'Variáveis de ambiente não configuradas', {
        projectId: projectId ? '✓' : '✗',
        publicAnonKey: publicAnonKey ? '✓ (primeiros 20 caracteres: ' + publicAnonKey.substring(0, 20) + '...)' : '✗'
      });
    } else {
      updateResult('config', 'success', 'Variáveis de ambiente OK', {
        projectId,
        publicAnonKeyLength: publicAnonKey.length,
        serverUrl: SERVER_URL
      });
    }

    // 2. Testar conectividade básica
    setCurrentTest('Testando conectividade...');
    updateResult('connectivity', 'pending', 'Testando conexão com Supabase...');
    
    const connectStart = Date.now();
    try {
      const response = await fetch(`https://${projectId}.supabase.co/`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });
      const connectDuration = Date.now() - connectStart;
      updateResult('connectivity', 'success', `Supabase acessível (${connectDuration}ms)`, {
        status: response.status,
        statusText: response.statusText
      }, connectDuration);
    } catch (error: any) {
      const connectDuration = Date.now() - connectStart;
      updateResult('connectivity', 'error', `Erro de conexão: ${error.message}`, {
        error: error.message,
        name: error.name
      }, connectDuration);
    }

    // 3. Testar Health Check (com timeout de 15 segundos)
    setCurrentTest('Testando Health Check...');
    updateResult('health', 'pending', 'Verificando saúde do servidor backend...');
    
    const healthStart = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 segundos
      
      const response = await fetch(`${SERVER_URL}/health`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      const healthDuration = Date.now() - healthStart;
      
      const data = await response.json();
      
      if (response.ok && data.status === 'ok') {
        updateResult('health', 'success', `Servidor online (${healthDuration}ms)`, {
          version: data.version,
          service: data.service,
          edge_function: data.edge_function,
          admin_email: data.admin_email,
          timestamp: data.timestamp
        }, healthDuration);
      } else {
        updateResult('health', 'warning', 'Servidor respondeu mas com status incorreto', {
          status: response.status,
          data
        }, healthDuration);
      }
    } catch (error: any) {
      const healthDuration = Date.now() - healthStart;
      if (error.name === 'AbortError') {
        updateResult('health', 'error', '❌ TIMEOUT: Servidor não respondeu em 15 segundos', {
          error: 'A Edge Function pode não estar deployada ou está demorando muito para responder',
          sugestao: 'Execute o deploy da Edge Function no Supabase Dashboard'
        }, healthDuration);
      } else {
        updateResult('health', 'error', `Erro: ${error.message}`, {
          error: error.message,
          name: error.name,
          sugestao: 'Verifique se a Edge Function está deployada'
        }, healthDuration);
      }
    }

    // 4. Testar autenticação (listar usuários KV)
    setCurrentTest('Testando autenticação...');
    updateResult('auth', 'pending', 'Testando acesso autenticado...');
    
    const authStart = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(`${SERVER_URL}/admin/listar-usuarios-kv`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      const authDuration = Date.now() - authStart;
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        updateResult('auth', 'success', `Acesso OK - ${data.total} usuário(s) encontrado(s) (${authDuration}ms)`, {
          total: data.total,
          usuarios: data.usuarios?.map((u: any) => ({ email: u.email, perfil: u.perfil }))
        }, authDuration);
      } else {
        updateResult('auth', 'warning', 'Resposta inesperada', data, authDuration);
      }
    } catch (error: any) {
      const authDuration = Date.now() - authStart;
      if (error.name === 'AbortError') {
        updateResult('auth', 'error', '❌ TIMEOUT: Não respondeu em 15 segundos', {
          error: 'A rota /admin/listar-usuarios-kv está demorando muito'
        }, authDuration);
      } else {
        updateResult('auth', 'error', `Erro: ${error.message}`, error, authDuration);
      }
    }

    // 5. Testar rota de alertas (que está dando timeout)
    setCurrentTest('Testando rota de alertas...');
    updateResult('alertas', 'pending', 'Testando GET /alertas...');
    
    const alertasStart = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(`${SERVER_URL}/alertas`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      const alertasDuration = Date.now() - alertasStart;
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        updateResult('alertas', 'success', `Alertas OK - ${data.total} alerta(s) (${alertasDuration}ms)`, {
          total: data.total
        }, alertasDuration);
      } else {
        updateResult('alertas', 'warning', 'Resposta inesperada', data, alertasDuration);
      }
    } catch (error: any) {
      const alertasDuration = Date.now() - alertasStart;
      if (error.name === 'AbortError') {
        updateResult('alertas', 'error', '❌ TIMEOUT: Rota de alertas não responde em 15 segundos!', {
          error: 'Esta é a rota que está causando o problema no Dashboard',
          sugestao: 'Verifique os logs da Edge Function no Supabase Dashboard'
        }, alertasDuration);
      } else {
        updateResult('alertas', 'error', `Erro: ${error.message}`, error, alertasDuration);
      }
    }

    // 6. Testar rota de contratos
    setCurrentTest('Testando rota de contratos...');
    updateResult('contratos', 'pending', 'Testando GET /contratos...');
    
    const contratosStart = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(`${SERVER_URL}/contratos`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      const contratosDuration = Date.now() - contratosStart;
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        updateResult('contratos', 'success', `Contratos OK - ${data.total} contrato(s) (${contratosDuration}ms)`, {
          total: data.total
        }, contratosDuration);
      } else {
        updateResult('contratos', 'warning', 'Resposta inesperada', data, contratosDuration);
      }
    } catch (error: any) {
      const contratosDuration = Date.now() - contratosStart;
      if (error.name === 'AbortError') {
        updateResult('contratos', 'error', '❌ TIMEOUT: Rota de contratos não responde em 15 segundos!', {
          error: 'Pode haver problema na rota ou no KV Store'
        }, contratosDuration);
      } else {
        updateResult('contratos', 'error', `Erro: ${error.message}`, error, contratosDuration);
      }
    }

    setCurrentTest('');
    setTesting(false);
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'pending':
        return <Loader className="w-5 h-5 text-blue-600 animate-spin" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Sucesso</Badge>;
      case 'error':
        return <Badge variant="destructive">Erro</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Aviso</Badge>;
      case 'pending':
        return <Badge variant="secondary">Testando...</Badge>;
    }
  };

  const successCount = results.filter(r => r.status === 'success').length;
  const errorCount = results.filter(r => r.status === 'error').length;
  const warningCount = results.filter(r => r.status === 'warning').length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Diagnóstico do Sistema</h1>
          <p className="text-gray-600 mt-1">Verificação de conectividade e funcionalidade do backend</p>
        </div>
        <Button
          onClick={runDiagnostics}
          disabled={testing}
          variant="outline"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${testing ? 'animate-spin' : ''}`} />
          Executar Novamente
        </Button>
      </div>

      {/* Status Geral */}
      <Card>
        <CardHeader>
          <CardTitle>Status Geral</CardTitle>
          <CardDescription>Resumo dos testes executados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Server className="w-8 h-8 text-gray-600" />
              <div>
                <div className="text-2xl font-bold">{results.length}</div>
                <div className="text-sm text-gray-600">Testes</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{successCount}</div>
                <div className="text-sm text-gray-600">Sucesso</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
              <XCircle className="w-8 h-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">{errorCount}</div>
                <div className="text-sm text-gray-600">Erros</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
                <div className="text-sm text-gray-600">Avisos</div>
              </div>
            </div>
          </div>

          {currentTest && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center gap-2">
              <Loader className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-blue-900">{currentTest}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resultados dos Testes */}
      <Card>
        <CardHeader>
          <CardTitle>Resultados Detalhados</CardTitle>
          <CardDescription>Detalhes de cada teste executado</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.length === 0 && !testing && (
            <div className="text-center py-8 text-gray-500">
              Nenhum teste executado ainda. Clique em "Executar Novamente" para iniciar.
            </div>
          )}

          {results.map((result, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 space-y-2 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(result.status)}
                  <div>
                    <div className="font-semibold text-gray-900">{result.name}</div>
                    <div className="text-sm text-gray-600">{result.message}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {result.duration && (
                    <span className="text-sm text-gray-500">{result.duration}ms</span>
                  )}
                  {getStatusBadge(result.status)}
                </div>
              </div>

              {result.details && (
                <div className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono overflow-x-auto">
                  <pre>{JSON.stringify(result.details, null, 2)}</pre>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Instruções de Solução */}
      {errorCount > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900">Ações Recomendadas</CardTitle>
            <CardDescription className="text-red-700">Como resolver os problemas encontrados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-red-900">
            <div className="flex items-start gap-2">
              <div className="font-bold min-w-[20px]">1.</div>
              <div>
                <strong>Verifique se a Edge Function está deployada:</strong>
                <p className="text-sm mt-1">Acesse o Supabase Dashboard → Edge Functions → Verifique se "make-server-1a8b02da" está ativa</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="font-bold min-w-[20px]">2.</div>
              <div>
                <strong>Verifique os logs da Edge Function:</strong>
                <p className="text-sm mt-1">No Supabase Dashboard, vá em Edge Functions → make-server-1a8b02da → Logs para ver erros</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="font-bold min-w-[20px]">3.</div>
              <div>
                <strong>Execute o deploy manualmente:</strong>
                <p className="text-sm mt-1">Use o Supabase CLI: <code className="bg-red-100 px-1 rounded">supabase functions deploy make-server-1a8b02da</code></p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informações de Configuração */}
      <Card>
        <CardHeader>
          <CardTitle>Configuração do Sistema</CardTitle>
          <CardDescription>Informações sobre a configuração atual</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm font-mono">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-gray-600" />
            <strong>Project ID:</strong>
            <span className="text-blue-600">{projectId}</span>
          </div>
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-gray-600" />
            <strong>Anon Key:</strong>
            <span className="text-gray-600">{publicAnonKey?.substring(0, 30)}...</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-600" />
            <strong>Server URL:</strong>
            <span className="text-gray-600">{SERVER_URL}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
