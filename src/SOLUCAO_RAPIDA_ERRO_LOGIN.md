# 🚨 Solução Rápida: Erros de Login e Cadastro

## 📋 Erros Encontrados

```
❌ A user with this email address has already been registered
❌ Credenciais inválidas. Verifique seu e-mail e senha.
```

## 🔍 Causa

O usuário já existe no Supabase Auth mas:
- A senha pode estar incorreta
- Os dados não estão sincronizados com o KV Store
- O perfil está com valor incorreto

## ✅ Solução Automática (Recomendada)

### Passo 1: Acessar Página de Diagnóstico

1. Faça login como administrador (se conseguir)
2. Vá em: **Configurações** → **Diagnóstico de Sistema**
3. OU acesse diretamente: `/diagnostico`

### Passo 2: Corrigir Usuário

1. Na seção **"Diagnosticar Login"**
2. Digite o email: `controleinterno@jardim.ce.gov.br`
3. Clique em **"Corrigir Usuário"**
4. O sistema irá:
   - ✅ Sincronizar dados entre Auth e KV Store
   - ✅ Atualizar senha para senha padrão (`@Gustavo25`)
   - ✅ Corrigir perfil para `admin`
   - ✅ Testar login automaticamente

### Passo 3: Fazer Login

Use as credenciais exibidas:
- **Email:** `controleinterno@jardim.ce.gov.br`
- **Senha:** `@Gustavo25`

## 🛠️ Solução Manual (Via Backend)

Se você tem acesso ao backend do Supabase:

### Opção 1: Usando cURL

```bash
curl -X POST https://SEU_PROJECT_ID.supabase.co/functions/v1/make-server-1a8b02da/debug/fix-user \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_ANON_KEY" \
  -d '{"email": "controleinterno@jardim.ce.gov.br"}'
```

### Opção 2: Usando Console do Navegador

1. Abra a página do sistema
2. Abra o Console do Navegador (F12)
3. Cole e execute:

```javascript
fetch('https://SEU_PROJECT_ID.supabase.co/functions/v1/make-server-1a8b02da/debug/fix-user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer SEU_ANON_KEY'
  },
  body: JSON.stringify({
    email: 'controleinterno@jardim.ce.gov.br'
  })
})
.then(r => r.json())
.then(data => {
  console.log('✅ Resultado:', data);
  if (data.credentials) {
    console.log('🔑 Use estas credenciais:');
    console.log('   Email:', data.credentials.email);
    console.log('   Senha:', data.credentials.password);
  }
});
```

## 🔧 O Que o Fix Faz

O endpoint `/debug/fix-user` executa automaticamente:

1. **Verifica usuário no Supabase Auth**
   - Se não existir: retorna erro
   - Se existir: continua

2. **Para Administrador Principal** (`controleinterno@jardim.ce.gov.br`):
   - Atualiza senha para `@Gustavo25`
   - Define perfil como `admin`
   - Define nome como `Controle Interno CGM`
   - Define secretaria como `Controladoria Geral do Município`

3. **Para Outros Usuários**:
   - Sincroniza dados do Auth metadata com KV Store
   - Mantém perfil e dados existentes

4. **Salva no KV Store**
   - Cria ou atualiza registro em `user:{userId}`
   - Garante sincronização completa

5. **Testa Login**
   - Para admin: testa com senha padrão
   - Retorna sucesso/erro

## 📊 Resposta de Sucesso

```json
{
  "success": true,
  "message": "Usuário sincronizado com sucesso",
  "authUser": {
    "id": "uuid-do-usuario",
    "email": "controleinterno@jardim.ce.gov.br",
    "email_confirmed": true
  },
  "kvUser": {
    "id": "uuid-do-usuario",
    "email": "controleinterno@jardim.ce.gov.br",
    "nome": "Controle Interno CGM",
    "perfil": "admin",
    "secretaria": "Controladoria Geral do Município",
    "situacao": "ativo"
  },
  "loginTest": {
    "success": true,
    "error": null
  },
  "credentials": {
    "email": "controleinterno@jardim.ce.gov.br",
    "password": "@Gustavo25"
  }
}
```

## 🚀 Após Correção

1. **Faça Logout** (se estiver logado)
2. **Faça Login** com as credenciais corretas
3. **Verifique** em "Gerenciar Usuários" → "Administradores (CGM)"
4. O usuário deve aparecer corretamente!

## 🔐 Segurança

- O endpoint `/debug/fix-user` deve ser protegido em produção
- Apenas administradores devem ter acesso
- Considere remover ou proteger endpoints de debug em produção

## 📝 Prevenção Futura

O sistema agora possui **auto-normalização** no login:
- Sempre que o admin principal faz login
- O perfil é automaticamente corrigido
- Garante consistência dos dados

Isso está implementado em `/supabase/functions/server/index.tsx` linhas 374-393.
