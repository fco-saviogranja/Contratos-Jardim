import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function useSecretarias() {
  const [secretarias, setSecretarias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarSecretarias = async () => {
      try {
        console.log('🔄 [SECRETARIAS] Carregando secretarias...');
        
        // Obter o access_token do localStorage para autenticação
        const accessToken = localStorage.getItem('access_token');
        
        console.log('🔑 [SECRETARIAS] Access token encontrado:', accessToken ? 'SIM' : 'NÃO');
        
        if (!accessToken) {
          console.warn('⚠️ [SECRETARIAS] Nenhum token de acesso encontrado. Usuário não autenticado.');
          setSecretarias([]);
          setLoading(false);
          return;
        }
        
        const url = `https://${projectId}.supabase.co/functions/v1/hello-world/secretarias`;
        console.log('🌐 [SECRETARIAS] URL:', url);
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('📡 [SECRETARIAS] Status da resposta:', response.status, response.statusText);
        
        const data = await response.json();
        console.log('📥 [SECRETARIAS] Resposta COMPLETA recebida:', JSON.stringify(data, null, 2));
        console.log('📥 [SECRETARIAS] Tipo de data:', typeof data);
        console.log('📥 [SECRETARIAS] data.success:', data.success);
        console.log('📥 [SECRETARIAS] data.secretarias:', data.secretarias);
        console.log('📥 [SECRETARIAS] Array.isArray(data.secretarias):', Array.isArray(data.secretarias));
        
        if (data.success && data.secretarias && Array.isArray(data.secretarias)) {
          console.log(`✅ [SECRETARIAS] ${data.secretarias.length} secretarias carregadas`);
          console.log('📋 [SECRETARIAS] Primeiras 3:', data.secretarias.slice(0, 3));
          setSecretarias(data.secretarias);
        } else if (data.error) {
          console.error('❌ [SECRETARIAS] Erro retornado pela API:', data.error);
          setSecretarias([]);
        } else {
          console.warn('⚠️ [SECRETARIAS] Nenhuma secretaria retornada');
          console.warn('⚠️ [SECRETARIAS] Resposta completa:', data);
          setSecretarias([]);
        }
      } catch (err) {
        console.error('❌ [SECRETARIAS] Erro ao carregar secretarias:', err);
        console.error('❌ [SECRETARIAS] Detalhes do erro:', err.message, err.stack);
        setSecretarias([]);
      } finally {
        setLoading(false);
      }
    };
    carregarSecretarias();
  }, []);

  return { secretarias, loading };
}