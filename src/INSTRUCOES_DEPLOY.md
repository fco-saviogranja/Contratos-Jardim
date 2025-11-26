# 🚀 INSTRUÇÕES PARA DEPLOY DA EDGE FUNCTION

## ⚠️ PROBLEMA ATUAL

O Figma Make está gerando o erro **403** ao tentar fazer o deploy automático da Edge Function `make-server`. Isso é normal - o deploy precisa ser feito **MANUALMENTE** no Dashboard do Supabase.

---

## ✅ SITUAÇÃO ATUAL

**O QUE JÁ ESTÁ FUNCIONANDO:**
- ✅ Login/Logout
- ✅ Autenticação Supabase Auth
- ✅ KV Store (leitura)
- ✅ Frontend completo

**O QUE PRECISA SER DEPLOYADO:**
- ❌ Edge Function `make-server` (rotas POST para criar solicitações, contratos, etc.)

---

## 📋 PASSOS PARA DEPLOY MANUAL

### **Opção 1: Deploy via Supabase CLI (Recomendado)**

1. **Instale o Supabase CLI** (se ainda não tiver):
```bash
npm install -g supabase
```

2. **Faça login no Supabase**:
```bash
supabase login
```

3. **Vincule seu projeto**:
```bash
supabase link --project-ref wtxmdybivrakmamwzere
```

4. **Faça o deploy da função**:
```bash
supabase functions deploy make-server
```

---

### **Opção 2: Deploy via Dashboard do Supabase**

1. **Acesse o Dashboard**:
   - URL: https://supabase.com/dashboard/project/wtxmdybivrakmamwzere/functions

2. **Crie uma nova Edge Function** chamada `make-server`

3. **Copie o conteúdo dos arquivos**:
   - Arquivo principal: `/supabase/functions/make-server/index.ts`
   - Arquivo auxiliar: `/supabase/functions/make-server/kv_store.ts`

4. **Cole o código** na interface do Dashboard

5. **Deploy** a função

---

## 🔧 APÓS O DEPLOY

Depois do deploy bem-sucedido:

1. **Teste a função** acessando:
```
https://wtxmdybivrakmamwzere.supabase.co/functions/v1/make-server-1a8b02da/health
```

2. **Resposta esperada**:
```json
{
  "status": "ok",
  "timestamp": "2025-11-26T..."
}
```

3. **Teste a solicitação de cadastro** no formulário do sistema

---

## 📊 ERROS ATUAIS E SOLUÇÕES

| Erro | Status | Solução |
|------|--------|---------|
| ❌ **403 no deploy** | RESOLVIDO | Deploy manual via CLI ou Dashboard |
| ❌ **404 nas rotas** | PENDENTE | Aguarda deploy da função |
| ❌ **JSON parsing error** | PENDENTE | Resolverá após deploy |
| ✅ **403 no logout** | **CORRIGIDO** | Mudado para `scope: 'local'` |
| ⚠️ **400 refresh token** | INFO | Token expirado - normal, faz novo login |

---

## 🎯 COMANDOS ÚTEIS

**Ver logs da função**:
```bash
supabase functions logs make-server
```

**Testar localmente** (opcional):
```bash
supabase start
supabase functions serve make-server
```

**Verificar status**:
```bash
supabase functions list
```

---

## 📞 SUPORTE

Se ainda assim der erro 403 no deploy:

1. Verifique se você tem permissões de **Owner** no projeto Supabase
2. Verifique se o projeto está no plano correto (Edge Functions requer plano pago ou trial)
3. Entre em contato com suporte do Supabase

---

## 🔐 VARIÁVEIS DE AMBIENTE (já configuradas)

As seguintes variáveis já estão disponíveis automaticamente nas Edge Functions:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ANON_KEY`

Não é necessário configurar nada adicional!

---

## ✨ PRÓXIMOS PASSOS

Após fazer o deploy:

1. ✅ Teste o formulário de solicitação de cadastro
2. ✅ Teste a criação de contratos
3. ✅ Teste a criação de usuários
4. ✅ Verifique os alertas automáticos

**BOA SORTE!** 🚀
