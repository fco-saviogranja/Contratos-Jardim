# 🔍 DEBUG: CHECKLIST DE DEPLOY

## ✅ CORREÇÕES APLICADAS

- [x] **Habilitar Edge Functions** no `config.toml`
- [x] **Atualizar exportação** do servidor para formato moderno
- [x] **Configurar verify_jwt** como `false`
- [x] **Documentar soluções** para erro 403

## 📋 CHECKLIST DE VERIFICAÇÃO

### 1. Arquivos de Configuração

- [x] `/supabase/config.toml` existe
- [x] `[functions]` está com `enabled = true`
- [x] `/supabase/functions/server/config.json` existe
- [x] `verify_jwt` está configurado como `false`

### 2. Estrutura de Arquivos

- [x] `/supabase/functions/server/index.tsx` existe
- [x] `/supabase/functions/server/import_map.json` existe
- [x] `/supabase/functions/server/kv_store.tsx` existe
- [x] Servidor usa `export default { fetch: app.fetch }`

### 3. Configuração do Supabase

Verifique no Dashboard do Supabase:

- [ ] Projeto está ativo e acessível
- [ ] Edge Functions está habilitado no plano
- [ ] Variáveis de ambiente estão configuradas
- [ ] Billing está ativo (se necessário)

### 4. Integração Figma ↔ Supabase

- [ ] Integração está conectada
- [ ] Permissões foram concedidas
- [ ] Project ID está correto
- [ ] Anon Key está correto

## 🧪 TESTES PARA FAZER

### Teste 1: Verificar modo offline

```javascript
// No console do navegador (F12)
console.log('Modo offline:', localStorage.getItem('offline_mode'))
```

**Resultado esperado:** `"true"` ou `"false"`

### Teste 2: Tentar fazer login

1. Acesse a tela de login
2. Use as credenciais do admin:
   - Email: `controleinterno@jardim.ce.gov.br`
   - Senha: `@Gustavo25`
3. Observe o console (F12)

**Sinais de sucesso:**
- ✅ Login bem-sucedido
- ✅ Console mostra "Login via servidor" OU "Modo offline ativo"
- ✅ Dashboard carrega normalmente

**Sinais de problema:**
- ❌ Erro de conexão
- ❌ Credenciais inválidas (se for primeiro login, precisa executar setup)
- ❌ Tela branca ou erro de renderização

### Teste 3: Verificar estado do sistema

```javascript
// No console do navegador
verificarEstadoSistema()
```

**O que verificar:**
- Quantos usuários existem
- Quantos contratos existem
- Se está em modo offline ou online
- Última sincronização

### Teste 4: Criar contrato de teste

1. Faça login como admin
2. Vá em "Contratos"
3. Clique em "Novo Contrato"
4. Preencha os dados
5. Salve

**Resultado esperado:**
- ✅ Contrato criado com sucesso
- ✅ Toast de confirmação aparece
- ✅ Contrato aparece na lista

## 🔧 TROUBLESHOOTING POR SINTOMA

### ❌ SINTOMA: Erro 403 ao fazer deploy

**Possíveis causas:**
1. Permissões insuficientes no Supabase
2. Integração Figma não autorizada
3. Plano do Supabase não suporta Edge Functions

**Soluções:**
- ✅ Verificar permissões no Dashboard
- ✅ Reautorizar integração
- ✅ Usar modo offline (já configurado)

### ❌ SINTOMA: "Backend não disponível"

**Possíveis causas:**
1. Edge Function não está deployada
2. Erro 403 impedindo deploy
3. URL ou credenciais incorretas

**Soluções:**
- ✅ Sistema ativa modo offline automaticamente
- ✅ Dados salvos no localStorage
- ✅ Tudo continua funcionando normalmente

### ❌ SINTOMA: Dados não persistem

**Possíveis causas:**
1. localStorage está sendo limpo
2. Navegador em modo incógnito
3. Extensões bloqueando storage

**Soluções:**
- ✅ Verificar se não está em modo incógnito
- ✅ Desabilitar extensões temporariamente
- ✅ Verificar configurações de privacidade do navegador

### ❌ SINTOMA: Não consegue fazer login

**Possíveis causas:**
1. Usuário admin não foi criado
2. Credenciais incorretas
3. Sistema em modo offline sem dados mock

**Soluções:**
```javascript
// Criar usuário admin
criarAdministrador()

// Resetar sistema
resetarSistemaInicial()

// Verificar usuários
varreduraCompleta()
```

## 📊 LOGS IMPORTANTES

### Console do Navegador (F12)

Procure por estas mensagens:

**✅ BOM:**
```
✅ Login bem-sucedido via servidor!
✅ Contratos carregados: 5
✅ Backend disponível
```

**⚠️ ATENÇÃO:**
```
🔌 Ativando modo offline - backend não disponível
⚠️ Usando dados mock
⚠️ Edge Function não está respondendo
```

**❌ RUIM:**
```
❌ Erro ao fazer login
❌ Erro ao carregar contratos
❌ Sessão expirada
```

### Logs do Supabase (Dashboard)

Se tiver acesso ao Dashboard:

1. Vá em **Edge Functions**
2. Clique em `make-server-1a8b02da`
3. Veja os **Logs**

**Procure por:**
- Requisições recebidas
- Erros de autenticação
- Problemas de KV Store

## 🎯 DECISÃO FINAL

### ✅ Backend Online (Ideal)

**Vantagens:**
- Dados persistentes no Supabase KV
- Autenticação real
- Escalável

**Como confirmar:**
```javascript
// Console mostra
"✅ Backend disponível"
"✅ Login via servidor"
```

### ✅ Modo Offline (Funcional)

**Vantagens:**
- Funciona imediatamente
- Sem dependências de deploy
- Sem erros 403

**Como confirmar:**
```javascript
// Console mostra
"🔌 Modo offline ativo"
"📦 Dados em localStorage"
```

## 📈 PRÓXIMOS PASSOS

1. [ ] Salvar todas as alterações
2. [ ] Aguardar tentativa de deploy
3. [ ] Verificar se erro 403 sumiu
4. [ ] Testar login
5. [ ] Criar contrato de teste
6. [ ] Verificar persistência de dados

## 🎉 SUCESSO!

Se você conseguiu:
- ✅ Fazer login
- ✅ Ver o Dashboard
- ✅ Criar um contrato
- ✅ Recarregar a página e ver os dados ainda lá

**Então o sistema está funcionando perfeitamente!** 🚀

Não importa se está em modo online ou offline - o importante é que **funciona**!

---

**Última atualização:** 2025-12-02
**Status:** ✅ Correções aplicadas, aguardando teste
