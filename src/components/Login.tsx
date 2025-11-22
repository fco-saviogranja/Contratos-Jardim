import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { localStore } from '../utils/localStore';

interface LoginProps {
  onLoginSuccess: () => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Authenticate offline (no Supabase)
      const user = localStore.authenticate(email, password);
      
      if (!user) {
        throw new Error('Usuário ou senha incorretos');
      }

      toast.success('Login realizado com sucesso!');
      onLoginSuccess();
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-green-700 mb-2">ContratosJardim</h1>
            <p className="text-gray-600">Sistema de Gestão de Contratos</p>
            <p className="text-gray-500 text-sm mt-1">Prefeitura Municipal de Jardim - CE</p>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 shadow-xl">
          <div className="mb-6 text-center">
            <h2 className="mb-2">Acesso ao Sistema</h2>
            <p className="text-gray-600 text-sm">
              Digite suas credenciais para acessar
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Usuário</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="gustavobarros"
                required
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t text-center text-sm text-gray-600">
            <p>
              Primeiro acesso ou esqueceu sua senha?
            </p>
            <p className="mt-1">
              Entre em contato com a CGM
            </p>
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-blue-600 hover:text-blue-700">
                Como criar o primeiro administrador?
              </summary>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg text-xs space-y-2">
                <p className="font-semibold">Via Console do Navegador:</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                  <li>Pressione F12 para abrir o Console</li>
                  <li>Cole o código de criação de admin</li>
                  <li>Substitua os dados pelos seus</li>
                  <li>Execute e aguarde confirmação</li>
                </ol>
                <p className="text-gray-500 italic mt-2">
                  Consulte o arquivo SETUP.md para instruções detalhadas
                </p>
              </div>
            </details>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Prefeitura Municipal de Jardim - CE
          </p>
        </div>
      </div>
    </div>
  );
}