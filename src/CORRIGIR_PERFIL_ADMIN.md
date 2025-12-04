# 🔧 CORRIGIR PERFIL DE ADMINISTRADOR

## ⚠️ PROBLEMA

Você está vendo esta mensagem no console:

```
⚠️ MENU DE ADMINISTRAÇÃO NÃO APARECERÁ!
💡 Verifique se o perfil está como "Administrador CGM"
```

---

## 🔍 DIAGNÓSTICO RÁPIDO

### **Passo 1: Verificar o perfil atual**

Abra o console do navegador (F12) e execute:

```javascript
verificarPerfil()
```

Este comando irá mostrar:
- ✅ Dados completos do usuário
- ✅ Perfil atual (exatamente como está salvo)
- ✅ Permissões detectadas
- ✅ Se o perfil é válido ou não

---

## 🛠️ SOLUÇÕES

### **Solução 1: Corrigir Perfil Direto (MAIS RÁPIDO)**

No console do navegador (F12), execute:

```javascript
corrigirPerfilAdmin()
```

Depois **recarregue a página** (F5).

---

### **Solução 2: Fazer Logout e Login Novamente**

1. Faça logout do sistema
2. Faça login novamente com:
   - Email: `controleinterno@jardim.ce.gov.br`
   - Senha: `@Gustavo25`

O backend irá configurar o perfil corretamente automaticamente.

---

### **Solução 3: Usar a Página de Diagnóstico**

1. Acesse: `http://localhost:5173/diagnostico`
2. Vá até a seção **"Alterar Perfil do Usuário Logado"**
3. Clique em **"Tornar Administrador CGM"**
4. Recarregue a página (F5)

---

## 📊 VERIFICAR SE FUNCIONOU

Após aplicar qualquer solução acima:

1. Abra o console (F12)
2. Execute: `verificarPerfil()`
3. Você deve ver:

```
✅ PERFIL VÁLIDO!
═══════════════════════════════════════════════════════════
🎉 Você tem acesso TOTAL ao sistema!

Você pode:
  ✅ Gerenciar usuários
  ✅ Gerenciar contratos
  ✅ Gerenciar secretarias
  ✅ Ver relatórios
  ✅ Acessar configurações
  ✅ Aprovar solicitações
```

4. O menu de administração deve aparecer no sidebar

---

## 🎯 PERFIS VÁLIDOS DO SISTEMA

| Perfil | Variações Aceitas |
|--------|-------------------|
| **Administrador** | `admin`, `Administrador CGM`, `administrador cgm` |
| **Gestor** | `gestor`, `Gestor de Contratos`, `gestor de contratos` |
| **Fiscal** | `fiscal`, `Fiscal de Contratos`, `fiscal de contratos` |

---

## 🔧 COMANDOS DISPONÍVEIS NO CONSOLE

### **Verificação:**
```javascript
verificarPerfil()          // Ver perfil e permissões atuais
verificarConfig()          // Ver configuração do Supabase
```

### **Correção de Perfil:**
```javascript
corrigirPerfilAdmin()      // Tornar Administrador CGM
corrigirPerfilGestor()     // Tornar Gestor de Contratos
corrigirPerfilFiscal()     // Tornar Fiscal de Contratos
```

### **Testes:**
```javascript
testarConexao()            // Testar conexão com backend
diagnostico()              // Diagnóstico completo do sistema
```

---

## 📝 EXEMPLO DE USO COMPLETO

```javascript
// 1. Verificar problema
verificarPerfil()

// Output:
// ⚠️ PROBLEMA DETECTADO!
// Perfil atual: "gestor"
// 💡 SOLUÇÃO: Execute: corrigirPerfilAdmin()

// 2. Corrigir perfil
corrigirPerfilAdmin()

// Output:
// Perfil ANTES: gestor
// Perfil DEPOIS: Administrador CGM
// ✅ PERFIL CORRIGIDO!
// 💡 IMPORTANTE: Recarregue a página (F5)

// 3. Recarregar página
// Pressione F5

// 4. Verificar novamente
verificarPerfil()

// Output:
// ✅ PERFIL VÁLIDO!
// 🎉 Você tem acesso TOTAL ao sistema!
```

---

## 🚨 SE AINDA NÃO FUNCIONAR

### **Limpar localStorage e fazer login novamente:**

```javascript
// No console (F12):
localStorage.clear()
location.reload()

// Depois faça login novamente
```

### **Ou usar o Setup Backend:**

```javascript
// No console (F12):
testarConexao()

// Isso vai:
// 1. Verificar configuração
// 2. Criar admin no backend
// 3. Testar login
// 4. Salvar token
```

---

## ✅ CHECKLIST DE VERIFICAÇÃO

Após corrigir, verifique se:

- [ ] `verificarPerfil()` mostra "✅ É ADMINISTRADOR"
- [ ] Menu de administração aparece no sidebar
- [ ] Você consegue acessar "Gerenciar Usuários"
- [ ] Você consegue acessar "Configurações"
- [ ] Você consegue acessar "Parâmetros e Perfis"

---

## 🎉 RESULTADO ESPERADO

Depois de corrigir, você deve ver no sidebar:

```
📊 Início
📋 Contratos
  📂 Todos os Contratos
  ➕ Novo Contrato
🔔 Alertas e Prazos
📈 Relatórios

⚙️ ADMINISTRAÇÃO          ← ESTE MENU DEVE APARECER!
  👥 Gerenciar Usuários
  🎭 Parâmetros e Perfis
  🎨 Aparência e Layout
  ⚙️ Configurações Gerais
  ❓ Ajuda
```

---

**Pronto! Seu perfil de administrador está corrigido! 🎉**
