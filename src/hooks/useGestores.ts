import { useState, useEffect } from 'react';
import { projectId } from '../utils/supabase/info';

export function useGestores() {
  const [gestores, setGestores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarGestores = async () => {
      try {
        console.log('🔄 [GESTORES] Carregando gestores...');
        
        // Obter o access_token do localStorage para autenticação
        const accessToken = localStorage.getItem('access_token');
        
        console.log('🔑 [GESTORES] Access token encontrado:', accessToken ? 'SIM' : 'NÃO');
        
        if (!accessToken) {
          console.warn('⚠️ [GESTORES] Nenhum token de acesso encontrado. Usuário não autenticado.');
          setGestores([]);
          setLoading(false);
          return;
        }
        
        const url = `https://${projectId}.supabase.co/functions/v1/hello-world/usuarios`;
        console.log('🌐 [GESTORES] URL:', url);
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('📡 [GESTORES] Status da resposta:', response.status, response.statusText);
        
        const data = await response.json();
        console.log('📥 [GESTORES] Resposta COMPLETA recebida:', JSON.stringify(data, null, 2));
        
        if (data.success && data.usuarios && Array.isArray(data.usuarios)) {
          // Filtrar apenas usuários com perfil de Gestor ou Administrador
          const gestoresAtivos = data.usuarios.filter((u: any) => 
            u.situacao === 'ativo' && 
            (u.perfil === 'Gestor de Contratos' || u.perfil === 'gestor' || u.perfil === 'Administrador CGM' || u.perfil === 'admin')
          );
          
          console.log(`✅ [GESTORES] ${gestoresAtivos.length} gestores ativos carregados de ${data.usuarios.length} usuários totais`);
          console.log('📋 [GESTORES] Gestores:', gestoresAtivos);
          setGestores(gestoresAtivos);
        } else if (data.error) {
          console.error('❌ [GESTORES] Erro retornado pela API:', data.error);
          setGestores([]);
        } else {
          console.warn('⚠️ [GESTORES] Nenhum gestor retornado');
          console.warn('⚠️ [GESTORES] Resposta completa:', data);
          setGestores([]);
        }
      } catch (err) {
        console.error('❌ [GESTORES] Erro ao carregar gestores:', err);
        console.error('❌ [GESTORES] Detalhes do erro:', err.message, err.stack);
        setGestores([]);
      } finally {
        setLoading(false);
      }
    };
    carregarGestores();
  }, []);

  return { gestores, loading };
}