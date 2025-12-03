# 🔧 CONFIGURAR VARIÁVEIS DE AMBIENTE

## 📍 **LOCALIZAÇÃO DAS VARIÁVEIS**

### **Frontend (React) - JÁ CONFIGURADO ✅**
- **Arquivo:** `/utils/supabase/info.tsx`
- **Status:** Auto-gerado pelo Figma Make
- **Ação:** Nenhuma necessária

### **Backend (Edge Function) - PRECISA CONFIGURAR ⚠️**
- **Local:** Supabase Dashboard → Edge Functions → Secrets
- **Status:** Precisa verificar/configurar
- **Ação:** Seguir instruções abaixo

---

## 🔑 **CHAVES NECESSÁRIAS**

Você precisa de **3 variáveis** no backend:

```env
SUPABASE_URL=https://wdkgxmwnacmzdfcvrofe.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indka2d4bXduYWNtemRmY3Zyb2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NjM0MzQsImV4cCI6MjA4MDMzOTQzNH0.V9Lrz5f12WaSMPBzWWHqyMlPR6UOpAarmli5kF8bcNk
SUPABASE_SERVICE_ROLE_KEY=[PEGAR NO DASHBOARD]
```

---

## 📖 **PASSO A PASSO: PEGAR AS CHAVES**

### **1. Acesse o Supabase Dashboard**

```
🌐 URL: https://supabase.com/dashboard
👤 Faça login com sua conta
```

### **2. Selecione o Projeto**

```
📂 Projeto: ContratosJardim
🆔 Project ID: wdkgxmwnacmzdfcvrofe
```

### **3. Vá em Settings → API**

```
⚙️ Settings (engrenagem no menu lateral)
   └─ 📡 API
```

### **4. Copie as Chaves**

Você verá uma tela assim:

```
┌─────────────────────────────────────────────────────┐
│ Configuration                                        │
├─────────────────────────────────────────────────────┤
│                                                      │
│ Project URL                                          │
│ https://wdkgxmwnacmzdfcvrofe.supabase.co            │
│                                                      │
│ Project API keys                                     │
│                                                      │
│ anon public                                          │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...             │
│ [Copy]                                               │
│                                                      │
│ service_role secret                                  │
│ ••••••••••••••••••••••••••••••••                    │
│ [Reveal] [Copy]                                      │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Copie:**
1. ✅ Project URL
2. ✅ anon public (já copiado)
3. ✅ service_role (clique em "Reveal" primeiro)

---

## 🚀 **CONFIGURAR NO SUPABASE**

### **Método 1: Via Dashboard (Recomendado)**

#### **Passo 1: Acessar Secrets**

```
1. No Supabase Dashboard
2. Vá em: Edge Functions
3. Clique em: Configuration ou Settings
4. Procure: "Secrets" ou "Environment Variables"
```

#### **Passo 2: Adicionar Variáveis**

Clique em **"Add new secret"** para cada uma:

**Secret 1:**
```
Name: SUPABASE_URL
Value: https://wdkgxmwnacmzdfcvrofe.supabase.co
```

**Secret 2:**
```
Name: SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indka2d4bXduYWNtemRmY3Zyb2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NjM0MzQsImV4cCI6MjA4MDMzOTQzNH0.V9Lrz5f12WaSMPBzWWHqyMlPR6UOpAarmli5kF8bcNk
```

**Secret 3:**
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: [Cole a chave service_role que você copiou]
```

#### **Passo 3: Salvar**

```
Clique em: "Save" ou "Create"
```

---

### **Método 2: Via CLI (Alternativo)**

Se você tem o Supabase CLI instalado:

```bash
# 1. Login
supabase login

# 2. Link com o projeto
supabase link --project-ref wdkgxmwnacmzdfcvrofe

# 3. Adicionar secrets
supabase secrets set SUPABASE_URL=https://wdkgxmwnacmzdfcvrofe.supabase.co

supabase secrets set SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indka2d4bXduYWNtemRmY3Zyb2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NjM0MzQsImV4cCI6MjA4MDMzOTQzNH0.V9Lrz5f12WaSMPBzWWHqyMlPR6UOpAarmli5kF8bcNk

supabase secrets set SUPABASE_SERVICE_ROLE_KEY=[SUA_SERVICE_ROLE_KEY]

# 4. Verificar
supabase secrets list
```

---

## ✅ **VERIFICAR SE ESTÁ CONFIGURADO**

### **Opção 1: Via CLI**

```bash
supabase secrets list
```

**Saída esperada:**
```
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

### **Opção 2: Via Dashboard**

```
1. Edge Functions → Configuration → Secrets
2. Você deve ver 3 secrets listadas
```

### **Opção 3: Testar Health Check**

Abra no navegador:
```
https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/health
```

**Se estiver configurado:**
```json
{
  "status": "ok",
  "service": "ContratosJardim Backend"
}
```

**Se NÃO estiver:**
```
Error: SUPABASE_URL is not defined
```

---

## 🔍 **ENCONTRAR SERVICE_ROLE_KEY**

### **Localizações Possíveis:**

#### **1. Supabase Dashboard (Principal)**
```
Settings → API → service_role secret
[Clique em "Reveal"]
```

#### **2. Emails do Supabase**
Quando você criou o projeto, recebeu um email com:
```
Subject: Your Supabase project is ready
- Project URL
- anon key
- service_role key
```

#### **3. .env.local (se você configurou localmente)**
Alguns projetos podem ter:
```
/.env.local
/.env
/supabase/.env.local
```

---

## ⚠️ **SEGURANÇA IMPORTANTE**

### **NUNCA compartilhe:**
- ❌ `SUPABASE_SERVICE_ROLE_KEY` (é como uma senha de admin)
- ❌ Não comite em repositórios públicos
- ❌ Não exponha no frontend

### **PODE compartilhar:**
- ✅ `SUPABASE_URL` (é pública)
- ✅ `SUPABASE_ANON_KEY` (é pública, feita para frontend)
- ✅ `projectId` (é público)

---

## 📝 **TEMPLATE COMPLETO**

Salve isso para referência:

```env
# ========================================
# VARIÁVEIS DE AMBIENTE - BACKEND
# ========================================
# Configure no Supabase Dashboard → Edge Functions → Secrets

# URL do projeto Supabase
SUPABASE_URL=https://wdkgxmwnacmzdfcvrofe.supabase.co

# Chave pública (frontend pode acessar)
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indka2d4bXduYWNtemRmY3Zyb2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NjM0MzQsImV4cCI6MjA4MDMzOTQzNH0.V9Lrz5f12WaSMPBzWWHqyMlPR6UOpAarmli5kF8bcNk

# Chave secreta (⚠️ NUNCA EXPOR - só backend)
SUPABASE_SERVICE_ROLE_KEY=[PEGAR NO DASHBOARD - Settings → API → Reveal]
```

---

## 🚀 **PRÓXIMOS PASSOS**

Após configurar as variáveis:

1. ✅ **Redeploy da Edge Function** (se necessário)
   ```bash
   supabase functions deploy make-server-1a8b02da
   ```

2. ✅ **Testar Health Check**
   ```
   https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/health
   ```

3. ✅ **Executar Setup Admin**
   ```javascript
   // No console (F12):
   testarConexao()
   ```

4. ✅ **Fazer Login**
   ```
   Email: controleinterno@jardim.ce.gov.br
   Senha: @Gustavo25
   ```

---

## 🆘 **PROBLEMAS COMUNS**

### **"SUPABASE_URL is not defined"**
- ❌ Variáveis não configuradas
- ✅ Configure no Dashboard → Edge Functions → Secrets

### **"Invalid JWT"**
- ❌ ANON_KEY incorreta
- ✅ Copie novamente do Dashboard → Settings → API

### **"Permission denied"**
- ❌ SERVICE_ROLE_KEY incorreta ou não configurada
- ✅ Copie a service_role (clique em "Reveal" primeiro)

---

## ✅ **RESUMO**

**Frontend:**
- ✅ JÁ configurado em `/utils/supabase/info.tsx`
- ✅ Nenhuma ação necessária

**Backend:**
- ⚠️ Configure 3 secrets no Supabase Dashboard
- ⚠️ Ou use Supabase CLI
- ✅ Teste com health check

**Chaves:**
- ✅ Todas estão em: Dashboard → Settings → API
- ✅ service_role precisa clicar em "Reveal"

---

**Dúvidas?** Consulte a documentação oficial:
https://supabase.com/docs/guides/functions/secrets
