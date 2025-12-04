# 🔍 COMO ACESSAR O DIAGNÓSTICO AVANÇADO

## ❌ PROBLEMA ATUAL

O sistema está com erro de **TIMEOUT** porque a Edge Function não está respondendo:

```
❌ Erro na requisição: TimeoutError: signal timed out
⏱️ Timeout: Servidor não respondeu em 10 segundos
⚠️ Backend indisponível, usando dados mock
```

---

## ✅ SOLUÇÃO RÁPIDA

### 1️⃣ Acesse o Diagnóstico Avançado

Abra esta URL no navegador:

```
/diagnostico-avancado
```

Ou acesse diretamente:
```
https://seu-dominio/diagnostico-avancado
```

### 2️⃣ Execute os Testes

A página irá automaticamente:
- ✅ Testar configuração do sistema
- ✅ Testar conectividade com Supabase
- ✅ Testar Health Check da Edge Function (15 segundos de timeout)
- ✅ Testar rotas de autenticação
- ✅ Testar rotas de alertas (que está com problema)
- ✅ Testar rotas de contratos

### 3️⃣ Veja os Resultados

O diagnóstico mostrará:
- 🟢 **Verde** = Funcionando
- 🔴 **Vermelho** = Com erro (inclui sugestões de solução)
- 🟡 **Amarelo** = Aviso

---

## 🚨 CAUSA PROVÁVEL DO ERRO

A Edge Function `make-server-1a8b02da` **não está deployada** no Supabase.

### Sinais de que a Edge Function não está deployada:

1. ❌ Timeout de 10+ segundos em todas as requisições
2. ❌ Mensagem "BACKEND_UNAVAILABLE" 
3. ❌ Sistema usando dados mock
4. ❌ Health check não responde

---

## 🔧 COMO RESOLVER

### OPÇÃO 1: Deploy via Supabase Dashboard (Recomendado)

1. Acesse: https://supabase.com/dashboard
2. Selecione o projeto: `wdkgxmwnacmzdfcvrofe`
3. Vá em **Edge Functions** → **Create a new function**
4. Nome: `make-server-1a8b02da`
5. Cole o código de `/supabase/functions/server/index.tsx`
6. Clique em **Deploy**

### OPÇÃO 2: Deploy via CLI

```bash
# Login
supabase login

# Linkar projeto
supabase link --project-ref wdkgxmwnacmzdfcvrofe

# Deploy
supabase functions deploy make-server-1a8b02da

# Verificar
supabase functions logs make-server-1a8b02da
```

---

## ✅ VERIFICAÇÃO PÓS-DEPLOY

Após o deploy, acesse:

```
https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "service": "ContratosJardim Backend",
  "version": "2.0.0"
}
```

Se ver esta resposta, **a Edge Function está funcionando!** ✅

---

## 📊 OUTRAS PÁGINAS ÚTEIS

### Diagnóstico Básico
```
/diagnostico
```
- Setup inicial do administrador
- Verificação de usuários
- Reset de senha

### Limpar Sistema
```
/limpar-sistema
```
- Limpar contratos e alertas
- Limpar usuários (exceto admin)
- Reiniciar sistema

---

## 🆘 SUPORTE

Se ainda tiver problemas após o deploy:

1. **Verifique os logs da Edge Function:**
   - Supabase Dashboard → Edge Functions → make-server-1a8b02da → Logs

2. **Execute o Diagnóstico Avançado novamente:**
   - `/diagnostico-avancado`
   - Veja quais testes falharam

3. **Verifique as variáveis de ambiente:**
   - `SUPABASE_URL` ✅
   - `SUPABASE_ANON_KEY` ✅
   - `SUPABASE_SERVICE_ROLE_KEY` ✅

---

**Última atualização:** 03/12/2024
**Sistema:** ContratosJardim
**Versão:** 2.0.0
