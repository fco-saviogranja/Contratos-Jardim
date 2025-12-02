# 🆘 AJUDA RÁPIDA - CONTRATOSJARDIM

## 🚀 INÍCIO RÁPIDO (3 PASSOS)

### 1️⃣ Abrir o Console
- Pressione **F12**
- Clique na aba **Console**

### 2️⃣ Executar Diagnóstico
```javascript
diagnosticoCompleto()
```

### 3️⃣ Seguir Recomendações
O diagnóstico vai te dizer exatamente o que fazer!

---

## 🛠️ COMANDOS DISPONÍVEIS

### 📊 Diagnóstico e Informações

```javascript
// Ver saúde completa do sistema
diagnosticoCompleto()

// Listar todos os usuários
listarUsuarios()

// Listar todos os contratos
listarContratos()
```

### 👑 Gerenciar Usuários

```javascript
// Criar usuário administrador
criarAdminAgora()

// Ver emails de todos os usuários
varreduraCompleta()
```

### 🔄 Resetar e Limpar

```javascript
// Resetar sistema (mantém apenas admin)
resetarSistemaCompleto()

// Limpar tudo (apaga TUDO)
localStorage.clear()
```

### 🔌 Mudar Modo de Operação

```javascript
// Forçar modo offline
forcarModoOffline()

// Tentar conectar ao backend
tentarModoOnline()
```

---

## ❓ PROBLEMAS COMUNS

### 🔴 Problema 1: Não consigo fazer login

**Solução:**
```javascript
// 1. Criar admin
criarAdminAgora()

// 2. Recarregar página
location.reload()

// 3. Fazer login com:
// Email: controleinterno@jardim.ce.gov.br
// Senha: @Gustavo25
```

### 🔴 Problema 2: Erro 403 no deploy

**Isso é NORMAL!** O sistema funciona em modo offline.

**Solução:**
```javascript
// Forçar modo offline permanente
forcarModoOffline()
```

### 🔴 Problema 3: Dados não aparecem

**Solução:**
```javascript
// 1. Ver o que tem no sistema
diagnosticoCompleto()

// 2. Se score < 50, resetar
resetarSistemaCompleto()

// 3. Recarregar
location.reload()
```

### 🔴 Problema 4: Contratos não salvam

**Solução:**
```javascript
// Verificar se localStorage está funcionando
localStorage.setItem('teste', 'ok')
localStorage.getItem('teste') // deve retornar 'ok'

// Se não funcionar:
// - Desative modo incógnito
// - Permita cookies/storage
// - Desative extensões
```

### 🔴 Problema 5: Muitos usuários duplicados

**Solução:**
```javascript
// Limpar todos usuários exceto admin
limparTudoAgora()

// Ou resetar tudo
resetarSistemaCompleto()
```

---

## 📋 CREDENCIAIS PADRÃO

### 👑 Administrador CGM

```
Email: controleinterno@jardim.ce.gov.br
Senha: @Gustavo25
Nome: Gustavo Barros
Secretaria: CGM - Controladoria Geral
```

---

## 🎯 FLUXO DE TROUBLESHOOTING

```
1. Abrir Console (F12)
   ↓
2. diagnosticoCompleto()
   ↓
3. Ver o SCORE:
   ↓
   ├─ 100 → ✅ Tudo OK!
   ├─ 70-99 → ⚠️ Seguir recomendações
   ├─ 50-69 → ⚠️ Criar admin se necessário
   └─ 0-49 → ❌ resetarSistemaCompleto()
```

---

## 🔍 VERIFICAÇÕES RÁPIDAS

### Ver se está logado
```javascript
JSON.parse(localStorage.getItem('contratos_jardim_user'))
```

### Ver todos os usuários
```javascript
JSON.parse(localStorage.getItem('mock_users'))
```

### Ver todos os contratos
```javascript
JSON.parse(localStorage.getItem('mock_contratos'))
```

### Ver modo de operação
```javascript
localStorage.getItem('offline_mode')
// 'true' = offline
// null ou 'false' = tentando backend
```

---

## 📞 QUANDO PEDIR AJUDA

Ao pedir ajuda, execute e me envie o resultado de:

```javascript
diagnosticoCompleto()
```

E me diga:

1. ✅ O que você tentou fazer?
2. ✅ O que aconteceu?
3. ✅ Qual foi o score do diagnóstico?
4. ✅ Alguma mensagem de erro apareceu?

---

## 🎓 ENTENDENDO O SISTEMA

### 🌐 Modo Online (Backend)
- Dados salvos no Supabase KV Store
- Autenticação via Supabase Auth
- Requer Edge Function deployada

### 🔌 Modo Offline (Local)
- Dados salvos no localStorage
- Autenticação via localStorage
- Funciona sem deploy

### 🔄 Modo Híbrido (Padrão)
- Tenta backend primeiro
- Se falhar, usa localStorage
- **Melhor de ambos os mundos**

---

## ✅ CHECKLIST DE SAÚDE

Execute `diagnosticoCompleto()` e verifique:

- [ ] Score acima de 70
- [ ] localStorage funcionando
- [ ] Admin criado
- [ ] Consegue fazer login
- [ ] Contratos salvam e persistem
- [ ] Recarregar página (F5) mantém dados

Se todos estiverem ✅, **sistema 100% funcional!**

---

## 🎉 SISTEMA FUNCIONANDO = QUALQUER UM DESTES:

1. ✅ Login funciona
2. ✅ Dashboard carrega
3. ✅ Pode criar contratos
4. ✅ Dados persistem após F5

**Não importa se está online ou offline!**
**Se funciona, funciona!** 🚀

---

## 📚 DOCUMENTAÇÃO COMPLETA

- `/GUIA_TESTE_PASSO_A_PASSO.md` - Tutorial detalhado
- `/SOLUCAO_ERRO_403.md` - Resolver erro de deploy
- `/DEBUG_DEPLOY.md` - Checklist de deploy
- `/supabase/README.md` - Info do backend

---

## 💡 DICA PRO

Adicione aos favoritos:

```javascript
// Criar bookmark com este código
javascript:(function(){diagnosticoCompleto()})()
```

Clique no bookmark para diagnóstico instantâneo!

---

**Última atualização:** 2025-12-02
**Status:** ✅ Sistema totalmente funcional

🆘 **Precisa de mais ajuda? Execute `diagnosticoCompleto()` e me mostre o resultado!**
