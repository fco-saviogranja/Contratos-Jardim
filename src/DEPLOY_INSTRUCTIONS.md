# 🚀 Instruções de Deploy da Edge Function

## ❌ Erro Atual
Se você está vendo este erro:
```
⚠️ Erro ao verificar admin: Error: Health check falhou: 401
```

Significa que a Edge Function **NÃO ESTÁ DEPLOYADA** no Supabase ou está com configuração incorreta.

---

## ✅ Como Resolver

### Passo 1: Acessar o Dashboard do Supabase
1. Acesse: https://supabase.com/dashboard/project/qtbepussaveckryzrhor/functions/hello-world
2. Faça login na sua conta Supabase

### Passo 2: Deploy da Edge Function

**OPÇÃO A - Deploy via Dashboard (Recomendado):**

1. No menu lateral, vá em **Edge Functions**
2. Clique na função `hello-world` (ou crie uma nova com este nome)
3. Copie TODO o conteúdo do arquivo `/supabase/functions/server/index.tsx`
4. Cole no editor do Supabase
5. Clique em **Deploy**

**OPÇÃO B - Deploy via CLI do Supabase:**

Se você tem o Supabase CLI instalado:

```bash
# 1. Login no Supabase
supabase login

# 2. Link ao projeto
supabase link --project-ref qtbepussaveckryzrhor

# 3. Deploy da função
supabase functions deploy hello-world --no-verify-jwt
```

### Passo 3: Configurar Variáveis de Ambiente

No Dashboard do Supabase, vá em **Settings > Edge Functions > Environment Variables** e adicione:

1. `SUPABASE_URL` = `https://qtbepussaveckryzrhor.supabase.co`
2. `SUPABASE_ANON_KEY` = (sua anon key - já configurada)
3. `SUPABASE_SERVICE_ROLE_KEY` = (sua service role key - já configurada)

**IMPORTANTE:** As variáveis SUPABASE_URL, SUPABASE_ANON_KEY e SUPABASE_SERVICE_ROLE_KEY são configuradas automaticamente pelo Supabase. Você NÃO precisa adicionar manualmente.

### Passo 4: Verificar Deploy

Após o deploy, teste o health check:

```bash
curl https://qtbepussaveckryzrhor.supabase.co/functions/v1/hello-world/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "timestamp": "2024-12-02T..."
}
```

---

## 📋 Checklist de Verificação

- [ ] Edge Function `hello-world` está deployada
- [ ] Arquivo `config.json` tem `"verify_jwt": false`
- [ ] Health check retorna status 200 (não 401)
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy concluído sem erros

---

## 🔧 Arquivos Importantes

- **Servidor:** `/supabase/functions/server/index.tsx`
- **Configuração:** `/supabase/functions/server/config.json`
- **Import Map:** `/supabase/functions/server/import_map.json`
- **KV Store:** `/supabase/functions/server/kv_store.tsx`

---

## 💡 Dica

Se ainda estiver com erro 401, o problema é que a Edge Function não está configurada com `verify_jwt: false`.

Certifique-se de que o arquivo `config.json` foi deployado junto com a função.
