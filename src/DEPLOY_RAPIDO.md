# 🚀 DEPLOY RÁPIDO - ContratosJardim

## ⚡ **PASSOS PARA COLOCAR O SISTEMA NO AR**

Siga exatamente esta ordem:

---

## 1️⃣ **INSTALAR SUPABASE CLI**

```bash
npm install -g supabase
```

**Verificar instalação:**
```bash
supabase --version
```

---

## 2️⃣ **FAZER LOGIN NO SUPABASE**

```bash
supabase login
```

Isso abrirá o navegador para você fazer login.

---

## 3️⃣ **LINKAR O PROJETO**

```bash
supabase link --project-ref yxxkishjqjsoxcjlqdrk
```

Quando solicitar a senha do banco, pegue em:
https://supabase.com/dashboard/project/yxxkishjqjsoxcjlqdrk/settings/database

---

## 4️⃣ **FAZER DEPLOY DA EDGE FUNCTION**

```bash
cd [pasta-do-projeto]
supabase functions deploy make-server-1a8b02da
```

**Aguarde a mensagem de sucesso!** ✅

---

## 5️⃣ **CRIAR A TABELA NO BANCO**

1. Acesse: https://supabase.com/dashboard/project/yxxkishjqjsoxcjlqdrk/sql

2. Clique em "New Query"

3. Cole este SQL:

```sql
CREATE TABLE kv_store_1a8b02da (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
```

4. Clique em "Run" ▶️

5. Verifique se a tabela foi criada em:
   https://supabase.com/dashboard/project/yxxkishjqjsoxcjlqdrk/database/tables

---

## 6️⃣ **TESTAR O SERVIDOR**

Abra no navegador:
```
https://yxxkishjqjsoxcjlqdrk.supabase.co/functions/v1/make-server-1a8b02da/health
```

**Deve retornar:**
```json
{
  "status": "ok",
  "timestamp": "2024-11-30T..."
}
```

---

## 7️⃣ **CONFIGURAR O SISTEMA**

1. Acesse o sistema ContratosJardim
2. Clique em **"Configurar Sistema (Setup Inicial)"**
3. Clique em **"Criar administrador e iniciar sistema"**
4. Aguarde a confirmação ✅

---

## 8️⃣ **FAZER PRIMEIRO LOGIN**

**E-mail:** `controleinterno@jardim.ce.gov.br`  
**Senha:** `@Gustavo25`

---

## ✅ **PRONTO!**

Seu sistema está no ar! 🎉

---

## 🐛 **SE ALGO DER ERRADO:**

### **❌ Erro ao fazer deploy:**
```bash
# Verificar se está na pasta correta
pwd

# Verificar se a pasta /supabase/functions/server existe
ls -la supabase/functions/server
```

### **❌ Erro "function not found":**
- Aguarde 1-2 minutos após o deploy
- Verifique em: https://supabase.com/dashboard/project/yxxkishjqjsoxcjlqdrk/functions

### **❌ Erro ao criar tabela:**
- Verifique se você está no projeto correto
- Tente criar manualmente pela interface do Supabase

### **❌ Erro 401 no login:**
- Verifique se a Edge Function está rodando
- Verifique os logs em: https://supabase.com/dashboard/project/yxxkishjqjsoxcjlqdrk/logs/edge-functions

---

## 📞 **PRECISA DE AJUDA?**

1. Abra o Console do navegador (F12)
2. Vá na aba "Console"
3. Copie os erros que aparecerem com emoji ❌
4. Verifique os logs do Supabase

---

**Boa sorte! 🚀**
