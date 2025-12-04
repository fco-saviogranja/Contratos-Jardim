# 🚀 GUIA DE DEPLOY DA EDGE FUNCTION

## ❌ PROBLEMA ATUAL

O sistema está apresentando erro de **TIMEOUT (10 segundos)** nas requisições porque a **Edge Function não está deployada** no Supabase.

```
❌ Erro na requisição: TimeoutError: signal timed out
⏱️ Timeout: Servidor não respondeu em 10 segundos
⚠️ Erro ao buscar alertas: Error: BACKEND_UNAVAILABLE
```

## ✅ SOLUÇÃO

A Edge Function precisa ser deployada no Supabase Cloud para funcionar. Existem 2 maneiras:

---

## 📋 OPÇÃO 1: Deploy pelo Supabase Dashboard (RECOMENDADO)

### Passo 1: Acessar o Dashboard
1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto: `wdkgxmwnacmzdfcvrofe`
3. Vá em **Edge Functions** no menu lateral

### Passo 2: Criar a Edge Function
1. Clique em **"Create a new function"**
2. Nome da função: `make-server-1a8b02da`
3. Cole o código do arquivo `/supabase/functions/server/index.tsx`
4. Clique em **"Deploy"**

### Passo 3: Verificar
1. A função deve aparecer como **"Active"**
2. Teste com o endpoint: 
   ```
   https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/health
   ```
3. Deve retornar JSON:
   ```json
   {
     "status": "ok",
     "service": "ContratosJardim Backend",
     "version": "2.0.0"
   }
   ```

---

## 📋 OPÇÃO 2: Deploy via Supabase CLI

### Passo 1: Instalar o Supabase CLI

**Windows:**
```bash
scoop install supabase
```

**macOS:**
```bash
brew install supabase/tap/supabase
```

**Linux:**
```bash
npm install -g supabase
```

### Passo 2: Fazer Login
```bash
supabase login
```

### Passo 3: Linkar o Projeto
```bash
supabase link --project-ref wdkgxmwnacmzdfcvrofe
```

### Passo 4: Deploy da Edge Function
```bash
supabase functions deploy make-server-1a8b02da
```

### Passo 5: Verificar Logs
```bash
supabase functions logs make-server-1a8b02da
```

---

## 🔍 VERIFICAÇÃO APÓS DEPLOY

### 1. Testar Health Check
Abra o navegador e acesse:
```
https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/health
```

**Resposta esperada:**
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

### 2. Testar Setup do Administrador
Execute no navegador:
```javascript
fetch('https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/auth/setup-admin', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indka2d4bXduYWNtemRmY3Zyb2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyNDczODgsImV4cCI6MjA0ODgyMzM4OH0.XeH7lwbMYa8LvQ2KFXQ_1wMKt0lhPpSGPP-ckJQ9hqA'
  }
})
.then(r => r.json())
.then(console.log)
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Administrador configurado com sucesso!",
  "credentials": {
    "email": "controleinterno@jardim.ce.gov.br",
    "password": "@Gustavo25"
  }
}
```

### 3. Usar a Página de Diagnóstico
1. Acesse o sistema ContratosJardim
2. Vá em **Ajuda → Diagnóstico Avançado**
3. Clique em **"Executar Novamente"**
4. Verifique se todos os testes passam (verde)

---

## 🐛 TROUBLESHOOTING

### Problema: "Function not found"
**Solução:** A Edge Function não foi deployada. Siga os passos acima.

### Problema: "Timeout após 10 segundos"
**Solução:** 
1. Verifique se a função está ativa no Dashboard
2. Verifique os logs da função
3. Pode haver erro no código - verifique os logs

### Problema: "Invalid JWT"
**Solução:** 
1. Verifique se o `publicAnonKey` está correto em `/utils/supabase/info.tsx`
2. O key deve ser do projeto `wdkgxmwnacmzdfcvrofe`

### Problema: Deploy falha com erro de dependências
**Solução:**
1. Certifique-se de que todas as importações usam o formato correto:
   - `npm:hono@4` ✅
   - `jsr:@supabase/supabase-js@2` ✅
   - `./kv_store.tsx` ✅

---

## 📊 ARQUIVOS NECESSÁRIOS

Para o deploy funcionar, você precisa destes arquivos na estrutura correta:

```
/supabase/
  functions/
    server/
      index.tsx      ← Código principal da Edge Function
      kv_store.tsx   ← Utilitário para KV Store
```

---

## ⚡ DEPLOY RÁPIDO (Resumo)

```bash
# 1. Login
supabase login

# 2. Linkar projeto
supabase link --project-ref wdkgxmwnacmzdfcvrofe

# 3. Deploy
supabase functions deploy make-server-1a8b02da

# 4. Testar
curl https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/health

# 5. Ver logs
supabase functions logs make-server-1a8b02da --follow
```

---

## ✅ CHECKLIST PÓS-DEPLOY

- [ ] Edge Function aparece como "Active" no Dashboard
- [ ] Health check retorna status 200 OK
- [ ] Setup admin retorna sucesso
- [ ] Login funciona sem timeout
- [ ] Dashboard carrega sem erros
- [ ] Todos os testes do Diagnóstico Avançado passam

---

## 🆘 SUPORTE

Se ainda tiver problemas:

1. **Verifique os logs no Dashboard:**
   - Supabase Dashboard → Edge Functions → make-server-1a8b02da → Logs

2. **Verifique as variáveis de ambiente:**
   - `SUPABASE_URL` ✅
   - `SUPABASE_ANON_KEY` ✅
   - `SUPABASE_SERVICE_ROLE_KEY` ✅

3. **Execute o Diagnóstico Avançado:**
   - Sistema → Ajuda → Diagnóstico Avançado
   - Analise os erros detalhados

---

**Última atualização:** 03/12/2024
**Versão do Backend:** 2.0.0
**Edge Function:** make-server-1a8b02da
