// ========================================
// TESTE DE CONEXÃO COM BACKEND SUPABASE
// ========================================
// Use no console: testarConexao()

import { projectId, publicAnonKey } from './supabase/info';

const SUPABASE_URL = `https://${projectId}.supabase.co`;
const SERVER_URL = `${SUPABASE_URL}/functions/v1/make-server-1a8b02da`;

export async function testarConexao() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔍 TESTE DE CONEXÃO COM BACKEND SUPABASE');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('🌐 Project ID:', projectId);
  console.log('🔗 URL Base:', SUPABASE_URL);
  console.log('📡 Edge Function:', 'make-server-1a8b02da');
  console.log('');

  // Teste 1: Health Check
  console.log('');
  console.log('───────────────────────────────────────────────────────────');
  console.log('1️⃣ TESTE DE HEALTH CHECK');
  console.log('───────────────────────────────────────────────────────────');
  console.log('');
  
  try {
    const healthUrl = `${SERVER_URL}/health`;
    console.log('📤 Fazendo requisição para:', healthUrl);
    
    const healthResponse = await fetch(healthUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });

    console.log('📡 Status:', healthResponse.status, healthResponse.statusText);
    console.log('📋 Content-Type:', healthResponse.headers.get('content-type'));

    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ SUCESSO! Servidor está respondendo:');
      console.log('📊 Dados:', healthData);
    } else {
      const errorText = await healthResponse.text();
      console.error('❌ FALHOU! Status:', healthResponse.status);
      console.error('📄 Resposta:', errorText.substring(0, 200));
    }
  } catch (error: any) {
    console.error('❌ ERRO ao conectar:', error.message);
    console.error('💡 Possível causa: Edge Function não implantada ou CORS bloqueando');
  }

  // Teste 2: Setup Admin
  console.log('');
  console.log('───────────────────────────────────────────────────────────');
  console.log('2️⃣ TESTE DE SETUP ADMIN');
  console.log('───────────────────────────────────────────────────────────');
  console.log('');

  try {
    const setupUrl = `${SERVER_URL}/auth/setup-admin`;
    console.log('📤 Fazendo requisição para:', setupUrl);

    const setupResponse = await fetch(setupUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });

    console.log('📡 Status:', setupResponse.status, setupResponse.statusText);

    if (setupResponse.ok) {
      const setupData = await setupResponse.json();
      console.log('✅ SUCESSO! Admin configurado:');
      console.log('📊 Credenciais:', setupData.credentials);
      console.log('👤 Usuário:', setupData.user);
    } else {
      const errorData = await setupResponse.json();
      console.error('❌ FALHOU!');
      console.error('📄 Erro:', errorData);
    }
  } catch (error: any) {
    console.error('❌ ERRO ao criar admin:', error.message);
  }

  // Teste 3: Login
  console.log('');
  console.log('───────────────────────────────────────────────────────────');
  console.log('3️⃣ TESTE DE LOGIN');
  console.log('───────────────────────────────────────────────────────────');
  console.log('');

  try {
    const loginUrl = `${SERVER_URL}/auth/login`;
    console.log('📤 Fazendo requisição para:', loginUrl);
    console.log('📧 Email: controleinterno@jardim.ce.gov.br');
    console.log('🔑 Senha: @Gustavo25');

    const loginResponse = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({
        email: 'controleinterno@jardim.ce.gov.br',
        password: '@Gustavo25'
      })
    });

    console.log('📡 Status:', loginResponse.status, loginResponse.statusText);

    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ SUCESSO! Login funcionou:');
      console.log('👤 Usuário:', loginData.user);
      console.log('🎫 Token gerado:', loginData.access_token ? 'Sim' : 'Não');
    } else {
      const errorData = await loginResponse.json();
      console.error('❌ FALHOU!');
      console.error('📄 Erro:', errorData);
      console.error('💡 Hint:', errorData.hint);
    }
  } catch (error: any) {
    console.error('❌ ERRO ao fazer login:', error.message);
  }

  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('✅ TESTE CONCLUÍDO');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
}

// Expor função globalmente
(window as any).testarConexao = testarConexao;

console.log('');
console.log('🔧 Utilitário de teste carregado!');
console.log('💡 Use no console: testarConexao()');
console.log('');
