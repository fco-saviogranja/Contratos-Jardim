# 🗑️ Como Limpar TODOS os Usuários do Sistema

## 🎯 Objetivo
Esta página executa automaticamente a limpeza completa de **TODOS os usuários** do sistema ContratosJardim, incluindo:
- ✗ Todos os usuários do localStorage (frontend)
- ✗ Todos os usuários do Supabase Auth (backend)
- ✗ Todos os usuários do KV Store (backend)
- ✗ Todas as solicitações de acesso pendentes
- ✗ Sessão do usuário atual (logout automático)

---

## 🚀 Como Usar

### **Método 1: Acessar a Página Automática** ⭐ RECOMENDADO

Simplesmente acesse a URL:

```
/limpar-sistema
```

ou

```
https://seu-dominio.com/limpar-sistema
```

**O que vai acontecer:**

1. Uma tela de confirmação será exibida com todos os detalhes
2. Você precisa clicar no botão **"Confirmar e Limpar Tudo"**
3. O sistema executará automaticamente:
   - Limpeza do Backend (Supabase)
   - Limpeza do Frontend (localStorage)
4. Você verá logs em tempo real da operação
5. Ao finalizar, verá um resumo completo
6. Poderá voltar para a tela de login

---

### **Método 2: Via Página de Diagnóstico**

1. Acesse `/diagnostico`
2. No card vermelho "🚨 Ação de Emergência", clique no link `/limpar-sistema`
3. Ou role até o final e clique no botão **"Limpar Todos os Usuários"**

---

### **Método 3: Via Console do Navegador**

1. Pressione `F12` para abrir o Console
2. Digite e execute:

```javascript
await limparTodosUsuarios()
```

---

## ⚠️ AVISOS IMPORTANTES

### 🔴 Esta operação é **IRREVERSÍVEL**!

- Não há como desfazer após a execução
- Todos os usuários serão permanentemente excluídos
- O sistema ficará completamente vazio
- Você será deslogado automaticamente

### ✅ Quando usar esta funcionalidade:

- Para resetar o sistema durante desenvolvimento
- Para limpar dados de teste
- Para começar do zero com usuários reais
- Para corrigir problemas graves de duplicação de usuários

### 🛡️ Segurança:

- A operação requer confirmação manual
- Logs detalhados são exibidos em tempo real
- Você pode cancelar antes de confirmar

---

## 📊 O que você verá

### **Tela de Confirmação:**
```
⚠️ ATENÇÃO - OPERAÇÃO IRREVERSÍVEL

Esta ação irá excluir TODOS os usuários do sistema

O que será excluído:
✗ Todos os usuários do localStorage (frontend)
✗ Todos os usuários do Supabase Auth (backend)
✗ Todos os usuários do KV Store (backend)
✗ Todas as solicitações de acesso pendentes
✗ Sessão do usuário atual (logout automático)

[Cancelar e Voltar]  [Confirmar e Limpar Tudo]
```

### **Durante a Limpeza:**
```
🔄 Limpando Sistema...

╔══════════════════════════════════════════════════╗
║     🗑️  LIMPEZA AUTOMÁTICA DO SISTEMA           ║
╚══════════════════════════════════════════════════╝

📍 PASSO 1/2: Limpando Backend
🔄 Limpando Backend (Supabase)...
   📡 Enviando requisição ao servidor...
✅ Backend limpo!
   👥 Usuários Auth excluídos: 5
   📦 Usuários KV excluídos: 5

📍 PASSO 2/2: Limpando Frontend
🔄 Limpando Frontend (localStorage)...
   📊 3 usuários mock encontrados
   👤 Removendo usuário logado
   🔑 Removendo token de autenticação
✅ Frontend limpo! 3 itens removidos

╔══════════════════════════════════════════════════╗
║        ✅ LIMPEZA CONCLUÍDA COM SUCESSO!         ║
╚══════════════════════════════════════════════════╝
```

### **Após Conclusão:**
```
✅ Limpeza Concluída!

Todos os usuários foram excluídos com sucesso do sistema.

📊 Resumo:
Frontend: 3 itens removidos
Backend Auth: 5 usuários excluídos
Backend KV: 5 usuários excluídos

[← Voltar para Login]
```

---

## 🔧 Recursos Técnicos

### **Arquivos Envolvidos:**

1. **`/pages/LimparSistema.tsx`** - Página principal de limpeza automática
2. **`/utils/limparTodosUsuarios.js`** - Utilitário de limpeza via console
3. **`/App.tsx`** - Rota `/limpar-sistema` configurada
4. **`/supabase/functions/server/index.tsx`** - Endpoint `/admin/limpar-usuarios`

### **Funções Disponíveis:**

```javascript
// Limpar TUDO (Frontend + Backend)
await limparTodosUsuarios()

// Limpar apenas Frontend
limparUsuariosFrontend()

// Limpar apenas Backend
await limparUsuariosBackend()
```

---

## ✅ Próximos Passos Após a Limpeza

Após limpar todos os usuários, você precisará:

1. **Recarregar a página** (F5)
2. **Criar o primeiro usuário** através de:
   - Página de Solicitação de Acesso
   - Console do navegador: `criarAdminAgora()`
   - Gerenciar Usuários (se tiver acesso admin)

---

## 📞 Suporte

Se encontrar algum problema:

1. Verifique os logs no console do navegador (F12)
2. Acesse `/diagnostico` para diagnósticos detalhados
3. Tente executar novamente a limpeza

---

**Desenvolvido para o Sistema ContratosJardim**  
**Controladoria Geral do Município de Jardim - CE**
