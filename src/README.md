# 🏛️ ContratosJardim - Sistema de Gestão de Contratos

Sistema interno desenvolvido para a **Controladoria Geral do Município de Jardim - CE** para gerenciamento completo de contratos municipais.

---

## 📋 **SOBRE O SISTEMA**

O **ContratosJardim** é uma solução completa para gestão de contratos públicos, desenvolvida especificamente para a Controladoria Geral do Município de Jardim - Ceará.

### **Funcionalidades Principais:**

✅ **Gestão Completa de Contratos**
- Cadastro, edição e acompanhamento de contratos
- Controle de status (vigente, vencido, pendente)
- Histórico de alterações e aditivos

✅ **Alertas Automáticos de Vencimento**
- Notificações 90, 60 e 30 dias antes do vencimento
- Painel de alertas por prioridade
- Notificações internas e por e-mail

✅ **Gestão de Usuários com 3 Perfis:**
- **Administrador CGM:** Acesso total ao sistema
- **Gestor de Contratos:** Gerenciamento de contratos
- **Fiscal de Contratos:** Acompanhamento e fiscalização

✅ **Sistema de Solicitações**
- Página pública para solicitar acesso
- Aprovação pelo administrador
- Validação de e-mail e justificativa

✅ **Relatórios e Dashboards**
- Estatísticas em tempo real
- Relatórios personalizados
- Gráficos e visualizações

✅ **Multi-secretaria**
- Gestão de 10+ secretarias municipais
- Controle por órgão
- Responsáveis por secretaria

---

## 🔧 **TECNOLOGIAS UTILIZADAS**

### **Frontend:**
- ⚛️ React + TypeScript
- 🎨 Tailwind CSS v4.0
- 🎯 Lucide React Icons
- 📊 Recharts (gráficos)
- 🍞 Sonner (notificações)

### **Backend:**
- 🚀 Supabase (Backend as a Service)
- 🔐 Supabase Auth (autenticação JWT)
- 📦 Supabase Storage (armazenamento)
- 🌐 Edge Functions com Hono
- 🗄️ PostgreSQL (banco de dados)

---

## 🚀 **STATUS DO PROJETO**

### ✅ **CONFIGURAÇÃO CONCLUÍDA!**

O sistema está **100% integrado** com o backend Supabase e pronto para uso após o deploy.

**Credenciais configuradas:**
- Project ID: `yxxkishjqjsoxcjlqdrk`
- Project URL: `https://yxxkishjqjsoxcjlqdrk.supabase.co`

---

## 📖 **COMO USAR**

### **1️⃣ DEPLOY DO SERVIDOR (OBRIGATÓRIO)**

Antes de usar o sistema, você precisa fazer deploy da Edge Function:

```bash
# 1. Instalar Supabase CLI (se ainda não tiver)
npm install -g supabase

# 2. Fazer login
supabase login

# 3. Linkar o projeto
supabase link --project-ref yxxkishjqjsoxcjlqdrk

# 4. Deploy da função
supabase functions deploy make-server-1a8b02da
```

### **2️⃣ CRIAR TABELA NO BANCO**

Acesse: https://supabase.com/dashboard/project/yxxkishjqjsoxcjlqdrk/sql

Execute:
```sql
CREATE TABLE kv_store_1a8b02da (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
```

### **3️⃣ PRIMEIRO ACESSO**

1. Acesse o sistema
2. Clique em "Configurar Sistema (Setup Inicial)"
3. Clique em "Criar administrador e iniciar sistema"
4. Aguarde a confirmação

### **4️⃣ FAZER LOGIN**

**Credenciais do administrador:**
- **E-mail:** `controleinterno@jardim.ce.gov.br`
- **Senha:** `@Gustavo25`

**IMPORTANTE:** Altere a senha após o primeiro acesso!

---

## 👥 **PERFIS DE USUÁRIO**

### **🔴 Administrador CGM**
- Acesso total ao sistema
- Gerenciar usuários e solicitações
- Configurações gerais
- Relatórios completos

### **🟡 Gestor de Contratos**
- Criar e editar contratos
- Visualizar todos os contratos
- Receber alertas de vencimento
- Gerar relatórios

### **🟢 Fiscal de Contratos**
- Visualizar contratos da sua secretaria
- Acompanhar prazos
- Adicionar observações
- Receber alertas

---

## 🔐 **SEGURANÇA**

- ✅ Autenticação JWT com Supabase Auth
- ✅ Controle de acesso por perfil (RBAC)
- ✅ Validação de e-mail institucional
- ✅ Senhas criptografadas
- ✅ Tokens com expiração
- ✅ CORS configurado
- ✅ Logs de auditoria

---

## 📊 **ESTRUTURA DE DADOS**

### **Supabase Auth:**
- Usuários autenticados
- Sessões e tokens
- Metadados de perfil

### **KV Store (PostgreSQL):**
- `user:{id}` - Dados dos usuários
- `contrato:{id}` - Contratos
- `solicitacao:{id}` - Solicitações de acesso
- `secretaria:{id}` - Secretarias municipais
- `alerta:{id}` - Alertas de vencimento

---

## 🛠️ **MANUTENÇÃO**

### **Logs do Servidor:**
https://supabase.com/dashboard/project/yxxkishjqjsoxcjlqdrk/logs/edge-functions

### **Banco de Dados:**
https://supabase.com/dashboard/project/yxxkishjqjsoxcjlqdrk/database/tables

### **Autenticação:**
https://supabase.com/dashboard/project/yxxkishjqjsoxcjlqdrk/auth/users

---

## 📝 **DOCUMENTAÇÃO ADICIONAL**

- 📘 **SUPABASE_CONFIGURADO.md** - Detalhes técnicos da configuração
- 📗 **Attributions.md** - Créditos e licenças

---

## 🆘 **SUPORTE**

### **Problemas comuns:**

**❌ Erro ao fazer login:**
1. Verifique se a Edge Function foi implantada
2. Verifique se a tabela `kv_store_1a8b02da` existe
3. Verifique os logs do Supabase

**❌ "Não autorizado":**
1. Faça logout e login novamente
2. Limpe o localStorage do navegador
3. Verifique se o token não expirou

**❌ Página em branco:**
1. Abra o Console (F12)
2. Verifique erros de JavaScript
3. Verifique se há erros de CORS

---

## 📞 **CONTATO**

**Controladoria Geral do Município de Jardim - CE**

- 🏛️ Órgão: Controladoria Geral do Município (CGM)
- 📧 E-mail: controleinterno@jardim.ce.gov.br
- 🌐 Município: Jardim - Ceará

---

## 📜 **LICENÇA**

Sistema desenvolvido exclusivamente para uso interno da Prefeitura Municipal de Jardim - CE.

**© 2024 Controladoria Geral do Município de Jardim - CE**

---

## 🎯 **ROADMAP FUTURO**

- [ ] Integração com sistema de protocolo
- [ ] Assinatura digital de contratos
- [ ] Envio automático de e-mails
- [ ] Geração de PDF de contratos
- [ ] API pública para integração
- [ ] App mobile

---

**Desenvolvido com ❤️ para a Controladoria Geral do Município de Jardim - CE**
