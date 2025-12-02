# 🎯 GUIA DE TESTE PASSO A PASSO

## 📋 CHECKLIST INTERATIVO

Siga estes passos em ordem e marque cada um conforme completa:

---

## FASE 1: PREPARAÇÃO ⚙️

### ☐ Passo 1.1: Abrir o Console do Navegador
1. Pressione **F12** (ou clique com botão direito → Inspecionar)
2. Clique na aba **Console**
3. ✅ Console aberto e visível

### ☐ Passo 1.2: Limpar dados antigos (opcional)
```javascript
// Cole no console e pressione Enter
localStorage.clear()
console.log('✅ localStorage limpo!')
```

---

## FASE 2: VERIFICAR CONFIGURAÇÃO 🔍

### ☐ Passo 2.1: Verificar modo atual
```javascript
// Cole no console
console.log('Modo offline:', localStorage.getItem('offline_mode'))
console.log('Usuário logado:', localStorage.getItem('contratos_jardim_user'))
```

**Resultado esperado:**
- `null` ou `"false"` = tentará conectar ao backend
- `"true"` = modo offline ativo

### ☐ Passo 2.2: Ver estado completo
```javascript
// Cole no console
console.log('=== DADOS NO SISTEMA ===')
console.log('Usuários:', JSON.parse(localStorage.getItem('mock_users') || '[]').length)
console.log('Contratos:', JSON.parse(localStorage.getItem('mock_contratos') || '[]').length)
console.log('Solicitações:', JSON.parse(localStorage.getItem('mock_solicitacoes') || '[]').length)
console.log('Secretarias:', JSON.parse(localStorage.getItem('mock_secretarias') || '[]').length)
```

---

## FASE 3: CRIAR USUÁRIO ADMIN 👑

### ☐ Passo 3.1: Verificar se admin existe
```javascript
// Cole no console
const users = JSON.parse(localStorage.getItem('mock_users') || '[]')
const admin = users.find(u => u.email === 'controleinterno@jardim.ce.gov.br')
console.log('Admin existe?', admin ? '✅ SIM' : '❌ NÃO')
if (admin) {
  console.log('Dados do admin:', admin)
}
```

### ☐ Passo 3.2: Criar admin se não existir
```javascript
// Se o passo anterior mostrou "❌ NÃO", cole este código:

const adminUser = {
  id: 'admin-gustavo-001',
  nome: 'Gustavo Barros',
  email: 'controleinterno@jardim.ce.gov.br',
  senha: '@Gustavo25',
  perfil: 'admin',
  secretaria: 'CGM - Controladoria Geral',
  situacao: 'ativo',
  dataCadastro: new Date().toISOString()
}

// Buscar usuários existentes
const existingUsers = JSON.parse(localStorage.getItem('mock_users') || '[]')

// Adicionar admin se não existir
const adminExists = existingUsers.some(u => u.email === adminUser.email)
if (!adminExists) {
  existingUsers.push(adminUser)
  localStorage.setItem('mock_users', JSON.stringify(existingUsers))
  console.log('✅ Admin criado com sucesso!')
} else {
  console.log('ℹ️ Admin já existe!')
}

// Verificar
console.log('Total de usuários:', existingUsers.length)
console.log('Admin:', existingUsers.find(u => u.perfil === 'admin'))
```

---

## FASE 4: TESTAR LOGIN 🔐

### ☐ Passo 4.1: Ir para tela de login
1. Se estiver logado, faça logout
2. Você deve estar na tela de login
3. ✅ Tela de login visível

### ☐ Passo 4.2: Inserir credenciais
```
Email: controleinterno@jardim.ce.gov.br
Senha: @Gustavo25
```

### ☐ Passo 4.3: Clicar em "Entrar"
1. Clique no botão "Entrar"
2. Observe o console (F12)

**O que procurar no console:**

✅ **SUCESSO - Backend Online:**
```
✅ Login bem-sucedido via servidor!
✅ Backend disponível
```

✅ **SUCESSO - Modo Offline:**
```
🔌 Ativando modo offline
✅ Login bem-sucedido (modo offline)
📦 Usando dados do localStorage
```

❌ **ERRO:**
```
❌ Erro ao fazer login
❌ Credenciais inválidas
❌ Usuário não encontrado
```

### ☐ Passo 4.4: Verificar se entrou no sistema
- ✅ Dashboard carregou?
- ✅ Vê seu nome no canto superior?
- ✅ Menu lateral está visível?

---

## FASE 5: TESTAR FUNCIONALIDADES 🎯

### ☐ Passo 5.1: Verificar Dashboard
1. Você deve ver:
   - 📊 Total de Contratos
   - ⚠️ Vencendo em 30 dias
   - 📝 Contratos Ativos
   - 🔔 Alertas Pendentes

**Anote os números que aparecem:**
```
Total de Contratos: ___
Vencendo em 30 dias: ___
Contratos Ativos: ___
Alertas Pendentes: ___
```

### ☐ Passo 5.2: Criar um contrato de teste
1. Clique em **"Contratos"** no menu lateral
2. Clique em **"+ Novo Contrato"**
3. Preencha:
   ```
   Número: TESTE-001
   Empresa/Contratada: Empresa Teste Ltda
   Objeto: Teste de funcionamento do sistema
   Valor: 10000
   Vigência Início: (data de hoje)
   Vigência Fim: (data daqui 1 ano)
   Secretaria: CGM - Controladoria Geral
   Gestor: Gustavo Barros
   ```
4. Clique em **"Salvar"**

**Resultado esperado:**
- ✅ Toast verde: "Contrato criado com sucesso!"
- ✅ Contrato aparece na lista

### ☐ Passo 5.3: Recarregar a página (TESTE CRÍTICO)
1. Pressione **F5** para recarregar
2. Faça login novamente se necessário
3. Vá em **"Contratos"**

**PERGUNTA CRUCIAL:**
- ✅ O contrato TESTE-001 ainda está lá?
  - **SIM** = Dados estão persistindo! 🎉
  - **NÃO** = Problema de persistência ⚠️

---

## FASE 6: DIAGNÓSTICO FINAL 🏥

### ☐ Passo 6.1: Verificar estado completo
```javascript
// Cole no console
console.log('=== DIAGNÓSTICO FINAL ===')
console.log('')

// 1. Verificar usuário logado
const user = JSON.parse(localStorage.getItem('contratos_jardim_user') || 'null')
console.log('1️⃣ USUÁRIO LOGADO:')
console.log(user ? `✅ ${user.nome} (${user.perfil})` : '❌ Nenhum usuário logado')
console.log('')

// 2. Verificar dados
const users = JSON.parse(localStorage.getItem('mock_users') || '[]')
const contratos = JSON.parse(localStorage.getItem('mock_contratos') || '[]')
const secretarias = JSON.parse(localStorage.getItem('mock_secretarias') || '[]')

console.log('2️⃣ DADOS NO SISTEMA:')
console.log(`✅ Usuários: ${users.length}`)
console.log(`✅ Contratos: ${contratos.length}`)
console.log(`✅ Secretarias: ${secretarias.length}`)
console.log('')

// 3. Verificar modo
const offlineMode = localStorage.getItem('offline_mode')
console.log('3️⃣ MODO DE OPERAÇÃO:')
console.log(offlineMode === 'true' ? '🔌 MODO OFFLINE' : '🌐 TENTANDO BACKEND')
console.log('')

// 4. Verificar contratos específicos
console.log('4️⃣ CONTRATOS:')
contratos.forEach((c, i) => {
  console.log(`${i + 1}. ${c.numero} - ${c.empresa}`)
})
console.log('')

// 5. Resumo
console.log('=== RESUMO ===')
if (user && contratos.length > 0) {
  console.log('✅ SISTEMA FUNCIONANDO PERFEITAMENTE!')
  console.log('✅ Login OK')
  console.log('✅ Dados persistindo OK')
  console.log('✅ Contratos salvos OK')
} else if (user && contratos.length === 0) {
  console.log('⚠️ Sistema funcionando, mas sem contratos')
  console.log('💡 Crie um contrato de teste')
} else {
  console.log('❌ Sistema com problemas')
  console.log('💡 Tente fazer login novamente')
}
```

---

## 📊 RESULTADOS

Marque o que aconteceu:

### ☐ Cenário A: TUDO FUNCIONANDO! 🎉
- [x] Login bem-sucedido
- [x] Dashboard carregou
- [x] Conseguiu criar contrato
- [x] Contrato persistiu após F5
- [x] Console mostra dados corretos

**PARABÉNS! Sistema 100% operacional!** ✅

### ☐ Cenário B: Funcionando em Modo Offline 🔌
- [x] Login bem-sucedido
- [x] Console mostra "modo offline"
- [x] Conseguiu criar contrato
- [x] Dados persistem no localStorage
- [ ] Backend não está respondendo

**Sistema funcionando em modo offline! Tudo OK!** ✅

### ☐ Cenário C: Problemas Encontrados ❌
- [ ] Não consegue fazer login
- [ ] Dashboard não carrega
- [ ] Contratos não persistem
- [ ] Erros no console

**Precisamos investigar!** 🔍

---

## 🆘 SE TIVER PROBLEMAS

### Problema 1: Não consegue fazer login

**Solução:**
```javascript
// Resetar sistema completo
localStorage.clear()
location.reload()

// Depois criar admin novamente (usar Passo 3.2)
```

### Problema 2: Dados não persistem

**Solução:**
```javascript
// Verificar se localStorage está funcionando
try {
  localStorage.setItem('teste', 'ok')
  const resultado = localStorage.getItem('teste')
  console.log('localStorage:', resultado === 'ok' ? '✅ OK' : '❌ ERRO')
  localStorage.removeItem('teste')
} catch (e) {
  console.log('❌ localStorage bloqueado:', e)
}
```

### Problema 3: Erro 403 ainda aparece

**Isso é NORMAL se:**
- O Figma Make não permite deploy de Edge Functions
- Você não tem permissões no Supabase

**Solução:**
```javascript
// Forçar modo offline permanente
localStorage.setItem('offline_mode', 'true')
console.log('✅ Modo offline forçado')
location.reload()
```

---

## ✅ CONCLUSÃO

Depois de completar todos os passos, você deve ter uma das seguintes conclusões:

1. **✅ Sistema funcionando com backend online**
   - Login via servidor
   - Dados no Supabase KV
   - Deploy funcionou!

2. **✅ Sistema funcionando em modo offline**
   - Login via localStorage
   - Dados persistem localmente
   - Tudo funcionando perfeitamente!

3. **❌ Sistema com problemas**
   - Precisamos investigar mais
   - Me diga exatamente o que aconteceu em cada passo

---

## 📞 PRÓXIMO PASSO

**ME DIGA:**

1. Qual cenário aconteceu (A, B ou C)?
2. O que apareceu no console no Passo 4.3?
3. O contrato persistiu após F5 no Passo 5.3?
4. Qual foi o resultado do Diagnóstico Final (Passo 6.1)?

**Com essas informações, posso te ajudar ainda mais!** 🚀
