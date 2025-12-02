import { projectId } from './supabase/info';

const SUPABASE_URL = `https://${projectId}.supabase.co`;
const SERVER_URL = `${SUPABASE_URL}/functions/v1/make-server-1a8b02da`;

export async function checkServerHealth() {
  try {
    console.log('🔍 Verificando servidor...');
    console.log('URL:', `${SERVER_URL}/health`);
    
    const response = await fetch(`${SERVER_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Status da resposta:', response.status);
    console.log('Content-Type:', response.headers.get('content-type'));
    
    const contentType = response.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('❌ Resposta não é JSON:', text);
      return {
        success: false,
        error: 'Edge Function não deployada ou não está retornando JSON',
        details: text.substring(0, 200)
      };
    }
    
    const data = await response.json();
    console.log('✅ Resposta do servidor:', data);
    
    return {
      success: true,
      data
    };
  } catch (error: any) {
    console.error('❌ Erro ao verificar servidor:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function diagnoseServer() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🏥 DIAGNÓSTICO DO SERVIDOR');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('📊 Informações:');
  console.log(`   Project ID: ${projectId}`);
  console.log(`   Supabase URL: ${SUPABASE_URL}`);
  console.log(`   Server URL: ${SERVER_URL}`);
  console.log('');
  
  const result = await checkServerHealth();
  
  if (result.success) {
    console.log('✅ SERVIDOR FUNCIONANDO!');
    console.log('   Status:', result.data?.status);
    console.log('   Timestamp:', result.data?.timestamp);
  } else {
    console.log('❌ SERVIDOR NÃO ESTÁ FUNCIONANDO!');
    console.log('   Erro:', result.error);
    if (result.details) {
      console.log('   Detalhes:', result.details);
    }
    console.log('');
    console.log('💡 SOLUÇÕES POSSÍVEIS:');
    console.log('');
    console.log('1. Verificar se a Edge Function está deployada:');
    console.log('   supabase functions deploy make-server-1a8b02da');
    console.log('');
    console.log('2. Copiar o arquivo index.tsx da pasta antiga para a nova:');
    console.log('   - De: /supabase/functions/server/index.tsx');
    console.log('   - Para: /supabase/functions/make-server-1a8b02da/index.tsx');
    console.log('   - Substituir "/hello-world" por "/make-server-1a8b02da" (38 vezes)');
    console.log('');
    console.log('3. Verificar no Supabase Dashboard:');
    console.log(`   ${SUPABASE_URL}/project/_/functions`);
  }
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  
  return result;
}
