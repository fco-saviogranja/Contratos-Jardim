# 🔐 CREDENCIAIS DO SISTEMA - ContratosJardim

## 📧 **Administrador Principal**

### **Credenciais de Acesso:**

```
Email:    controleinterno@jardim.ce.gov.br
Senha:    @Gustavo25
Nome:     Controle Interno CGM
Perfil:   Administrador CGM
```

---

## 🚀 **Como Fazer o Primeiro Login**

### **Opção 1: Setup Automático (RECOMENDADO)**

1. **Acesse a página de diagnóstico:**
   ```
   http://seu-site/diagnostico
   ```

2. **Clique no botão verde:**
   ```
   🚀 Criar Admin Funcional Agora
   ```

3. **Aguarde 5-10 segundos** enquanto o sistema:
   - Cria o usuário no Supabase Auth
   - Confirma o email automaticamente
   - Salva os dados no KV Store
   - Testa o login para garantir que funciona

4. **Copie as credenciais mostradas na tela**

5. **Clique em "Voltar para Login"**

6. **Faça login com:**
   - Email: `controleinterno@jardim.ce.gov.br`
   - Senha: `@Gustavo25`

---

### **Opção 2: Via Endpoint Direto**

Faça uma requisição POST para:

```bash
POST https://{projectId}.supabase.co/functions/v1/make-server-1a8b02da/auth/setup-admin

Headers:
  Content-Type: application/json
  Authorization: Bearer {SUPABASE_ANON_KEY}
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "Administrador configurado com sucesso!",
  "credentials": {
    "email": "controleinterno@jardim.ce.gov.br",
    "password": "@Gustavo25"
  },
  "user": {
    "id": "uuid-aqui",
    "nome": "Controle Interno CGM",
    "email": "controleinterno@jardim.ce.gov.br",
    "perfil": "Administrador CGM",
    "secretaria": "Controladoria Geral do Município"
  }
}
```

---

## 📊 **Arquitetura do Sistema**

### **Backend (Supabase Edge Function)**

- **Nome:** `make-server-1a8b02da`
- **URL Base:** `https://{projectId}.supabase.co/functions/v1/make-server-1a8b02da`
- **Arquivos:**
  - `/supabase/functions/server/index.tsx` - Servidor principal
  - `/supabase/functions/server/kv_store.tsx` - Gerenciamento de dados

### **Banco de Dados (KV Store)**

- **Tabela:** `kv_store_1a8b02da`
- **Estrutura:**
  ```sql
  CREATE TABLE kv_store_1a8b02da (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL
  );
  ```

### **Autenticação**

- **Supabase Auth:** Gerenciamento de usuários e senhas
- **KV Store:** Dados complementares (perfil, secretaria, etc)
- **JWT Tokens:** Sessões autenticadas

---

## 🔍 **Endpoints Disponíveis**

### **1. Health Check**
```
GET /make-server-1a8b02da/health
```

**Resposta:**
```json
{
  "status": "ok",
  "service": "ContratosJardim Backend",
  "version": "2.0.0",
  "timestamp": "2024-12-03T...",
  "edge_function": "make-server-1a8b02da",
  "admin_email": "controleinterno@jardim.ce.gov.br"
}
```

### **2. Setup Admin**
```
POST /make-server-1a8b02da/auth/setup-admin
```
Cria o administrador principal automaticamente.

### **3. Login**
```
POST /make-server-1a8b02da/auth/login

Body:
{
  "email": "controleinterno@jardim.ce.gov.br",
  "password": "@Gustavo25"
}
```

### **4. Signup (Criar Usuário)**
```
POST /make-server-1a8b02da/auth/signup

Body:
{
  "email": "usuario@jardim.ce.gov.br",
  "password": "senha123",
  "nome": "Nome do Usuário",
  "perfil": "Gestor de Contratos",
  "secretaria": "Secretaria Exemplo"
}
```

### **5. Listar Usuários (Admin)**
```
GET /make-server-1a8b02da/admin/listar-usuarios-kv
```

### **6. Debug - Verificar Usuário**
```
POST /make-server-1a8b02da/debug/check-user

Body:
{
  "email": "controleinterno@jardim.ce.gov.br"
}
```

### **7. Debug - Testar Login**
```
POST /make-server-1a8b02da/debug/test-login

Body:
{
  "email": "controleinterno@jardim.ce.gov.br",
  "password": "@Gustavo25"
}
```

### **8. Debug - Resetar Senha**
```
POST /make-server-1a8b02da/debug/reset-password

Body:
{
  "email": "controleinterno@jardim.ce.gov.br",
  "novaSenha": "NovaSenha123"
}
```

---

## 🛠️ **Solução de Problemas**

### **Problema: Não consigo fazer login**

**Solução 1 - Via Página de Diagnóstico:**
1. Acesse `/diagnostico`
2. Clique em "🚀 Criar Admin Funcional Agora"
3. Use as credenciais mostradas

**Solução 2 - Via Console do Navegador:**
```javascript
// No console do navegador (F12):
const response = await fetch('https://{projectId}.supabase.co/functions/v1/make-server-1a8b02da/auth/setup-admin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {SUPABASE_ANON_KEY}'
  }
});
const data = await response.json();
console.log(data);
```

### **Problema: Edge Function não responde**

**Verificar:**
1. A Edge Function está implantada no Supabase?
2. As variáveis de ambiente estão configuradas?
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

**Testar:**
```bash
curl https://{projectId}.supabase.co/functions/v1/make-server-1a8b02da/health
```

### **Problema: Usuário criado mas não consegue logar**

**Diagnóstico:**
1. Acesse `/diagnostico`
2. Preencha email: `controleinterno@jardim.ce.gov.br`
3. Preencha senha: `@Gustavo25`
4. Clique em "Diagnosticar Login"
5. Veja qual é o problema específico

**Solução Rápida:**
1. Clique em "Resetar Senha"
2. Digite nova senha
3. Tente logar novamente

---

## 📝 **Logs do Servidor**

Ao iniciar, o servidor mostra:

```
═══════════════════════════════════════════════════════════
✅ SERVIDOR BACKEND INICIADO
═══════════════════════════════════════════════════════════

🚀 Edge Function: make-server-1a8b02da
📧 Admin Email: controleinterno@jardim.ce.gov.br
🔑 Admin Password: @Gustavo25
📡 Status: Aguardando requisições...

═══════════════════════════════════════════════════════════
```

Ao executar setup:

```
═══════════════════════════════════════════════════════════
🔧 SETUP INICIAL - CRIAR ADMINISTRADOR PRINCIPAL
═══════════════════════════════════════════════════════════

📧 Email: controleinterno@jardim.ce.gov.br
🔑 Senha: @Gustavo25
👤 Nome: Controle Interno CGM
🎭 Perfil: Administrador CGM

📝 Criando novo administrador...
✅ Administrador criado!
✅ Dados salvos no KV Store!
🔍 Testando login...
✅ TESTE DE LOGIN PASSOU!

═══════════════════════════════════════════════════════════
✅ SETUP CONCLUÍDO COM SUCESSO!
═══════════════════════════════════════════════════════════
```

---

## 🔒 **Segurança**

### **Variáveis de Ambiente (Obrigatórias)**

```bash
SUPABASE_URL=https://{projectId}.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Boas Práticas**

1. ✅ **Nunca** exponha `SUPABASE_SERVICE_ROLE_KEY` no frontend
2. ✅ Use `SUPABASE_ANON_KEY` para requisições do cliente
3. ✅ Sempre valide tokens JWT no servidor
4. ✅ Use `email_confirm: true` apenas em desenvolvimento
5. ✅ Em produção, configure envio de emails de confirmação

---

## 📞 **Suporte**

**Sistema:** ContratosJardim - Gestão de Contratos  
**Município:** Jardim - CE  
**Email Administrador:** controleinterno@jardim.ce.gov.br  
**Versão:** 2.0.0  
**Data:** Dezembro 2024  

---

## ✅ **Checklist Pós-Instalação**

- [ ] Edge Function `make-server-1a8b02da` implantada
- [ ] Variáveis de ambiente configuradas
- [ ] Tabela `kv_store_1a8b02da` criada no banco
- [ ] Health check respondendo: `/health`
- [ ] Setup admin executado
- [ ] Login testado e funcionando
- [ ] Página de diagnóstico acessível: `/diagnostico`
- [ ] Credenciais documentadas e seguras

---

**🎉 Pronto! O sistema está configurado e pronto para uso!**
