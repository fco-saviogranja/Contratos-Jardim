# ContratosJardim - Sistema de Gestão de Contratos

## 🚀 Como Iniciar o Sistema

### 1️⃣ Criar o Usuário Administrador

Antes de fazer login, você precisa criar o usuário administrador:

1. Abra o **Console do Navegador** (pressione F12)
2. Execute o comando:
   ```javascript
   criarAdministrador()
   ```
3. Aguarde a confirmação: `✅ ADMINISTRADOR CRIADO COM SUCESSO!`

### 2️⃣ Fazer Login

Use as credenciais criadas:
- **Email:** `controleinterno@jardim.ce.gov.br`
- **Senha:** `@Gustavo25`

---

## 🗑️ Limpar Todos os Dados (Contratos e Alertas)

Para deletar **TODOS** os contratos e alertas do sistema:

1. Faça login como **Administrador**
2. Abra o **Console do Navegador** (F12)
3. Execute:
   ```javascript
   limparTodosSistema()
   ```
4. O sistema irá:
   - Deletar todos os contratos
   - Deletar todos os alertas
   - Recarregar a página automaticamente

**⚠️ ATENÇÃO:** Esta ação é IRREVERSÍVEL!

---

## ✅ Persistência de Dados

- ✅ Todos os contratos são salvos no **Supabase KV Store**
- ✅ Os dados são **persistentes** e não serão perdidos ao recarregar a página
- ✅ Os contratos cadastrados ficam salvos no banco de dados

---

## 📝 Funcionalidades Globais no Console

Estas funções estão disponíveis no console do navegador:

| Função | Descrição |
|--------|-----------|
| `criarAdministrador()` | Cria o usuário administrador padrão |
| `limparTodosSistema()` | Deleta todos os contratos e alertas |

---

## 🔐 Credenciais Padrão

- **Email:** controleinterno@jardim.ce.gov.br
- **Senha:** @Gustavo25
- **Nome:** Gustavo Barros
- **Perfil:** Administrador CGM
- **Secretaria:** CGM - Controladoria Geral

---

## 📋 Resumo

1. Execute `criarAdministrador()` no console
2. Faça login com as credenciais
3. Use o sistema normalmente
4. Se precisar resetar os dados, execute `limparTodosSistema()`

**Sistema pronto para uso!** 🚀
