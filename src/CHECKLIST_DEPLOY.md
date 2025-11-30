# ✅ CHECKLIST DE DEPLOY - ContratosJardim

Use este checklist para garantir que tudo está configurado corretamente.

---

## 📋 **PRÉ-REQUISITOS**

- [ ] Node.js instalado (v16 ou superior)
- [ ] NPM ou Yarn instalado
- [ ] Conta no Supabase criada
- [ ] Projeto Supabase criado (ID: `yxxkishjqjsoxcjlqdrk`)

---

## 🔧 **CONFIGURAÇÃO INICIAL**

### **Credenciais do Supabase:**
- [ ] Project URL configurada: `https://yxxkishjqjsoxcjlqdrk.supabase.co`
- [ ] Project ID configurado: `yxxkishjqjsoxcjlqdrk`
- [ ] Anon Key configurada no arquivo `/utils/supabase/info.tsx`

### **Arquivos do Sistema:**
- [ ] `/utils/api.tsx` atualizado para usar backend Supabase
- [ ] `/utils/supabase/client.tsx` criado
- [ ] `/supabase/functions/server/index.tsx` existe
- [ ] `/supabase/functions/server/kv_store.tsx` existe (NÃO EDITAR)
- [ ] `/components/OfflineBanner.tsx` foi deletado

---

## 🚀 **DEPLOY DO SERVIDOR**

### **1. Instalar Supabase CLI:**
```bash
npm install -g supabase
```
- [ ] CLI instalado com sucesso
- [ ] Versão verificada com `supabase --version`

### **2. Login no Supabase:**
```bash
supabase login
```
- [ ] Login realizado com sucesso
- [ ] Navegador abriu para autenticação

### **3. Linkar Projeto:**
```bash
supabase link --project-ref yxxkishjqjsoxcjlqdrk
```
- [ ] Projeto linkado com sucesso
- [ ] Senha do banco fornecida (se solicitado)

### **4. Deploy da Edge Function:**
```bash
supabase functions deploy make-server-1a8b02da
```
- [ ] Deploy concluído sem erros
- [ ] Mensagem de sucesso exibida
- [ ] Aguardado 1-2 minutos para propagar

### **5. Verificar Deploy:**

Abra no navegador:
```
https://yxxkishjqjsoxcjlqdrk.supabase.co/functions/v1/make-server-1a8b02da/health
```

- [ ] Retornou JSON com `"status": "ok"`
- [ ] Timestamp presente

---

## 🗄️ **CONFIGURAÇÃO DO BANCO DE DADOS**

### **Criar Tabela KV Store:**

1. Acesse: https://supabase.com/dashboard/project/yxxkishjqjsoxcjlqdrk/sql

2. Execute o SQL:
```sql
CREATE TABLE kv_store_1a8b02da (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
```

**Checklist:**
- [ ] SQL executado sem erros
- [ ] Tabela aparece em: Database → Tables
- [ ] Tabela tem 2 colunas: `key` e `value`

---

## 🎯 **PRIMEIRO ACESSO**

### **Setup do Sistema:**
1. Acesse o sistema ContratosJardim
2. Clique em "Configurar Sistema (Setup Inicial)"
3. Clique em "Criar administrador e iniciar sistema"

**Checklist:**
- [ ] Página de setup carregou
- [ ] Botão de criar administrador funcionou
- [ ] Mensagem de sucesso exibida
- [ ] Credenciais mostradas na tela

### **Credenciais do Administrador:**
```
E-mail: controleinterno@jardim.ce.gov.br
Senha: @Gustavo25
```
- [ ] E-mail e senha anotados

---

## 🔐 **TESTE DE LOGIN**

### **Fazer Login:**
1. Vá para a tela de login
2. Digite e-mail: `controleinterno@jardim.ce.gov.br`
3. Digite senha: `@Gustavo25`
4. Clique em "Entrar"

**Checklist:**
- [ ] Login bem-sucedido
- [ ] Dashboard carregou
- [ ] Nome do usuário aparece no header
- [ ] Menu lateral funcionando

---

## 🧪 **TESTES FUNCIONAIS**

### **Dashboard:**
- [ ] Estatísticas carregando
- [ ] Cards mostrando números zerados (normal no início)
- [ ] Gráficos renderizando

### **Contratos:**
- [ ] Página "Todos os Contratos" abre
- [ ] Botão "Novo Contrato" funciona
- [ ] Formulário de cadastro aparece

### **Usuários:**
- [ ] Página "Gerenciar Usuários" abre
- [ ] Administrador aparece na lista
- [ ] Botão "Novo Usuário" funciona

### **Solicitações:**
- [ ] Página pública "Solicitar Acesso" funciona
- [ ] Formulário envia solicitação
- [ ] Admin consegue ver solicitações

### **Secretarias:**
- [ ] Lista de secretarias carrega (10 padrões)
- [ ] Pode adicionar nova secretaria
- [ ] Pode editar secretaria existente

---

## 🔍 **VERIFICAÇÃO DE LOGS**

### **Console do Navegador (F12):**
- [ ] Sem erros em vermelho
- [ ] Logs com emojis aparecem (🔑, 📋, etc)
- [ ] Requisições bem-sucedidas (200 OK)

### **Logs do Supabase:**

Acesse: https://supabase.com/dashboard/project/yxxkishjqjsoxcjlqdrk/logs/edge-functions

- [ ] Logs da função `make-server-1a8b02da` aparecem
- [ ] Sem erros 500
- [ ] Requisições registradas

### **Database:**

Acesse: https://supabase.com/dashboard/project/yxxkishjqjsoxcjlqdrk/database/tables

- [ ] Tabela `kv_store_1a8b02da` existe
- [ ] Tem dados (chaves começando com `user:`, `secretaria:`, etc)
- [ ] Queries funcionando

---

## 🔒 **SEGURANÇA**

### **Após Primeiro Acesso:**
- [ ] Alterar senha do administrador
- [ ] Criar outros usuários admin (se necessário)
- [ ] Revisar permissões de perfis

### **Configurações Supabase:**
- [ ] RLS (Row Level Security) desabilitado na tabela KV (normal)
- [ ] Emails de autenticação configurados (opcional)
- [ ] Rate limiting ativado (opcional)

---

## 📱 **TESTES DE INTEGRAÇÃO**

### **Fluxo Completo:**

1. **Solicitação de Acesso:**
   - [ ] Usuário solicita acesso na página pública
   - [ ] Admin recebe solicitação
   - [ ] Admin aprova
   - [ ] Novo usuário consegue fazer login

2. **Cadastro de Contrato:**
   - [ ] Gestor cria novo contrato
   - [ ] Contrato aparece na lista
   - [ ] Detalhes podem ser editados
   - [ ] Contrato pode ser deletado

3. **Alertas:**
   - [ ] Criar contrato com vencimento próximo
   - [ ] Alerta aparece no painel
   - [ ] Prioridade correta (crítico/médio/baixo)

---

## 🎉 **CHECKLIST FINAL**

- [ ] ✅ Servidor no ar e respondendo
- [ ] ✅ Banco de dados criado e funcionando
- [ ] ✅ Administrador criado e testado
- [ ] ✅ Login funcionando
- [ ] ✅ Dashboard carregando
- [ ] ✅ CRUD de contratos funcionando
- [ ] ✅ Gestão de usuários funcionando
- [ ] ✅ Solicitações de acesso funcionando
- [ ] ✅ Logs sem erros críticos
- [ ] ✅ Senha do admin alterada

---

## 📞 **SE ALGO FALHAR:**

### **Erros Comuns:**

**❌ "Failed to fetch"**
- Servidor não está rodando
- CORS bloqueado
- URL incorreta

**❌ "Unauthorized" (401)**
- Token expirado
- Fazer logout e login novamente

**❌ "Not Found" (404)**
- Edge Function não foi implantada
- Nome da rota incorreto

**❌ "Internal Server Error" (500)**
- Erro no código do servidor
- Verificar logs do Supabase

---

## 🏁 **PRÓXIMOS PASSOS**

Após todos os itens checados:

1. [ ] Documentar senha do admin em local seguro
2. [ ] Criar usuários para gestores e fiscais
3. [ ] Cadastrar secretarias adicionais (se necessário)
4. [ ] Cadastrar primeiros contratos
5. [ ] Configurar alertas de vencimento
6. [ ] Treinar usuários no sistema

---

**🎊 PARABÉNS! Sistema pronto para uso! 🎊**

---

**Data do deploy:** _________________  
**Responsável:** _________________  
**Status:** ☐ Em andamento  ☐ Concluído  ☐ Com problemas
