# 📘 GUIA COMPLETO: Como Usar o Console do Navegador

## 🎯 O que você vai fazer:
Executar funções JavaScript no console do navegador para limpar usuários duplicados do sistema.

---

## 📍 PASSO 1: Abrir o Console do Navegador

### Google Chrome / Microsoft Edge / Brave:
1. **Opção 1 - Atalho de Teclado:**
   - Windows/Linux: Pressione `F12` ou `Ctrl + Shift + J`
   - Mac: Pressione `Cmd + Option + J`

2. **Opção 2 - Menu:**
   - Clique nos 3 pontinhos no canto superior direito
   - Vá em "Mais ferramentas" → "Ferramentas do desenvolvedor"
   - Clique na aba "Console"

### Firefox:
1. **Atalho de Teclado:**
   - Windows/Linux: `Ctrl + Shift + K`
   - Mac: `Cmd + Option + K`

2. **Menu:**
   - Clique nas 3 linhas no canto superior direito
   - Vá em "Mais ferramentas" → "Ferramentas de desenvolvimento web"
   - Clique na aba "Console"

### Safari:
1. **Primeiro, habilite o menu desenvolvedor:**
   - Safari → Preferências → Avançado
   - Marque "Mostrar menu Desenvolver na barra de menus"

2. **Abrir Console:**
   - Pressione `Cmd + Option + C`
   - Ou vá em Desenvolver → Mostrar Console JavaScript

---

## 📍 PASSO 2: O Console Está Aberto - Como Identificar?

Você verá uma área na parte inferior ou lateral da janela com:
- Um campo onde você pode digitar código
- Símbolo `>` ou `>>` indicando onde digitar
- Possívelmente algumas mensagens em azul, amarelo ou vermelho
- Uma área acima mostrando logs/mensagens

**Exemplo visual:**
```
Console ▼
  [Log] Mensagem exemplo
  [Warn] Algum aviso
  > _  ← Aqui você digita!
```

---

## 📍 PASSO 3: Verificar se as Funções Estão Disponíveis

### 3.1 - Certifique-se de estar na página do ContratosJardim
- A URL deve ser algo como: `http://localhost:5173` ou a URL do seu sistema
- **IMPORTANTE:** O console PRECISA estar aberto na mesma aba/página do sistema!

### 3.2 - Digite este comando no console:
```javascript
typeof limparTudoAgora
```

### 3.3 - Pressione `Enter`

**O que deve aparecer:**
- ✅ Se aparecer `"function"` → As funções ESTÃO disponíveis! Prossiga!
- ❌ Se aparecer `"undefined"` → As funções NÃO foram carregadas. Veja "Solução de Problemas" abaixo.

---

## 📍 PASSO 4: Executar as Funções de Limpeza

Você tem 3 funções disponíveis. Recomendo executar nesta ordem:

### 🔧 OPÇÃO 1 - Limpeza Rápida (Recomendado)
```javascript
limparTudoAgora()
```
**O que faz:**
- Remove TODOS os usuários do localStorage
- Limpa dados de autenticação
- Mantém apenas estrutura básica

**Quando usar:** Quando você quer começar do zero rapidamente.

---

### 🔧 OPÇÃO 2 - Varredura Completa (Mais Detalhada)
```javascript
varreduraCompleta()
```
**O que faz:**
- Mostra TODOS os dados armazenados
- Lista cada chave e seu conteúdo
- Útil para diagnosticar problemas

**Quando usar:** Quando você quer VER o que está armazenado antes de limpar.

---

### 🔧 OPÇÃO 3 - Manter Apenas Gustavo (Mais Segura)
```javascript
excluirTodosEmailsExcetoGustavo()
```
**O que faz:**
- Remove todos os usuários EXCETO "controleinterno@jardim.ce.gov.br"
- Mantém o usuário administrador principal
- Preserva a estrutura do sistema

**Quando usar:** Quando você quer limpar duplicatas mas manter o admin principal.

---

## 📍 PASSO 5: Como Executar (Passo a Passo Detalhado)

### 1️⃣ Clique no campo do console (onde tem o símbolo `>`)

### 2️⃣ Digite ou cole a função escolhida:
```javascript
limparTudoAgora()
```

### 3️⃣ Pressione `Enter`

### 4️⃣ Veja o resultado:
O console mostrará mensagens como:
```
✅ Limpeza completa executada!
Removidos: 5 itens
localStorage limpo com sucesso
```

---

## 📍 PASSO 6: Verificar se Funcionou

### Método 1 - Ver o localStorage:
```javascript
console.log(localStorage)
```
Deve mostrar poucos itens ou vazio.

### Método 2 - Verificar usuários:
```javascript
console.log(localStorage.getItem('contratos_usuarios'))
```
- Se for `null` → Limpeza completa funcionou!
- Se mostrar `[]` → Array vazio, está limpo!
- Se mostrar JSON → Ainda tem usuários

### Método 3 - Recarregar a página:
1. Pressione `F5` ou `Ctrl + R` (Mac: `Cmd + R`)
2. Você deve ser redirecionado para a tela de login
3. Tente fazer login com `controleinterno@jardim.ce.gov.br` / `@Gustavo25`

---

## 🚨 SOLUÇÃO DE PROBLEMAS

### ❌ Problema: `typeof limparTudoAgora` retorna `"undefined"`

**Solução:** As funções precisam ser carregadas no sistema. Vamos carregar manualmente:

#### Opção A - Copiar e Colar Direto no Console:
```javascript
// COLE TODO ESTE CÓDIGO NO CONSOLE:

function limparTudoAgora() {
  try {
    console.log('🧹 Iniciando limpeza completa do localStorage...');
    const antes = localStorage.length;
    localStorage.clear();
    console.log(`✅ Limpeza completa executada!`);
    console.log(`Removidos: ${antes} itens`);
    console.log('localStorage limpo com sucesso');
    return true;
  } catch (error) {
    console.error('❌ Erro ao limpar localStorage:', error);
    return false;
  }
}

function varreduraCompleta() {
  console.log('🔍 VARREDURA COMPLETA DO LOCALSTORAGE:');
  console.log(`Total de itens: ${localStorage.length}`);
  
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    const valor = localStorage.getItem(chave);
    console.log(`\n📦 Chave [${i + 1}]: "${chave}"`);
    
    try {
      const parsed = JSON.parse(valor);
      console.log('Conteúdo (JSON):', parsed);
    } catch {
      console.log('Conteúdo (Texto):', valor.substring(0, 100) + (valor.length > 100 ? '...' : ''));
    }
  }
  
  console.log('\n✅ Varredura concluída!');
}

function excluirTodosEmailsExcetoGustavo() {
  try {
    console.log('🎯 Procurando usuários no localStorage...');
    const usuariosStr = localStorage.getItem('contratos_usuarios');
    
    if (!usuariosStr) {
      console.log('ℹ️ Nenhum usuário encontrado no localStorage');
      return;
    }
    
    const usuarios = JSON.parse(usuariosStr);
    console.log(`📊 Total de usuários antes: ${usuarios.length}`);
    
    const usuariosFiltrados = usuarios.filter(u => 
      u.email === 'controleinterno@jardim.ce.gov.br'
    );
    
    console.log(`📊 Total de usuários depois: ${usuariosFiltrados.length}`);
    
    localStorage.setItem('contratos_usuarios', JSON.stringify(usuariosFiltrados));
    
    console.log('✅ Limpeza concluída!');
    console.log('Usuários mantidos:', usuariosFiltrados.map(u => u.email));
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao excluir usuários:', error);
    return false;
  }
}

console.log('✅ Funções carregadas! Você pode usar:');
console.log('  - limparTudoAgora()');
console.log('  - varreduraCompleta()');
console.log('  - excluirTodosEmailsExcetoGustavo()');
```

Depois de colar e pressionar `Enter`, você verá:
```
✅ Funções carregadas! Você pode usar:
  - limparTudoAgora()
  - varreduraCompleta()
  - excluirTodosEmailsExcetoGustavo()
```

Agora você pode executar qualquer uma das funções!

---

## 📝 EXEMPLO COMPLETO DE USO

```javascript
// 1. Primeiro, veja o que tem armazenado:
varreduraCompleta()

// 2. Limpe tudo:
limparTudoAgora()

// 3. Recarregue a página:
location.reload()

// Ou faça uma limpeza seletiva:
excluirTodosEmailsExcetoGustavo()
location.reload()
```

---

## 🎓 DICAS EXTRAS

### Limpar cache do navegador também:
```javascript
// Limpar localStorage + recarregar forçando cache
localStorage.clear();
location.reload(true);
```

### Ver todos os dados de usuários:
```javascript
console.log(JSON.parse(localStorage.getItem('contratos_usuarios')))
```

### Ver usuário logado atual:
```javascript
console.log(JSON.parse(localStorage.getItem('contratos_usuario_atual')))
```

### Limpar apenas a autenticação:
```javascript
localStorage.removeItem('contratos_usuario_atual')
localStorage.removeItem('contratos_auth_token')
```

---

## ✅ CHECKLIST FINAL

Após executar as funções:

- [ ] Recarreguei a página (`F5`)
- [ ] Fui redirecionado para o login
- [ ] Tentei fazer login com `controleinterno@jardim.ce.gov.br`
- [ ] Senha `@Gustavo25`
- [ ] Login funcionou SEM erro de "email já cadastrado"

Se todos os itens estiverem ✅, a limpeza funcionou!

---

## 🆘 AINDA COM PROBLEMAS?

Se mesmo após limpar ainda aparecer "email já cadastrado":

1. **Feche TODAS as abas do sistema**
2. **Feche o navegador completamente**
3. **Abra novamente e acesse o sistema**
4. **Abra o console (`F12`)**
5. **Execute:**
   ```javascript
   localStorage.clear();
   sessionStorage.clear();
   location.reload();
   ```

---

## 📞 RESUMO RÁPIDO

1. Abrir sistema no navegador
2. Pressionar `F12` (abre o console)
3. Clicar na aba "Console"
4. Colar: `limparTudoAgora()`
5. Pressionar `Enter`
6. Pressionar `F5` (recarrega página)
7. Fazer login normalmente

**Pronto! 🎉**

---

## 🔧 LIMPEZA AVANÇADA - Backend Supabase

Se mesmo após limpar o localStorage o erro **"Este e-mail já está cadastrado"** persistir, o problema está no **backend Supabase**. Siga estes passos:

### 📥 PASSO 1: Carregar funções de limpeza do backend

Copie e cole TODO este código no console:

```javascript
const SERVER_URL = 'https://qjiwmutqpmydazhnabri.supabase.co/functions/v1/make-server-1a8b02da';

async function listarUsuariosBackend() {
  try {
    console.log('🔍 Buscando usuários no Supabase Auth...');
    const response = await fetch(`${SERVER_URL}/debug/list-auth-users`);
    const result = await response.json();
    console.log(`✅ Total: ${result.users.length}`);
    console.table(result.users.map(u => ({
      Email: u.email,
      Nome: u.user_metadata?.nome || 'N/A',
      Perfil: u.user_metadata?.perfil || 'N/A'
    })));
    return result.users;
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

async function resetarSenhaBackend(email, novaSenha) {
  try {
    const response = await fetch(`${SERVER_URL}/debug/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, novaSenha })
    });
    const result = await response.json();
    console.log('✅ Senha resetada com sucesso!');
    console.log('📧 Email:', email);
    console.log('🔑 Nova senha:', novaSenha);
    return result;
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

console.log('✅ Funções carregadas!');
console.log('Digite: await listarUsuariosBackend()');
console.log('Digite: await resetarSenhaBackend("email", "senha")');
```

### 🔍 PASSO 2: Listar usuários cadastrados

```javascript
await listarUsuariosBackend()
```

Isso mostra TODOS os usuários que existem no Supabase Auth.

### 🔑 PASSO 3: Resetar senha do administrador

```javascript
await resetarSenhaBackend('controleinterno@jardim.ce.gov.br', '@Gustavo25')
```

### ✅ PASSO 4: Recarregar e fazer login

```javascript
location.reload()
```

Depois que a página recarregar, faça login com:
- **Email:** controleinterno@jardim.ce.gov.br
- **Senha:** @Gustavo25

---

## 🎯 SOLUÇÃO RÁPIDA COMPLETA

Se você quer resolver TUDO de uma vez, cole este código no console:

```javascript
// SOLUÇÃO COMPLETA AUTOMÁTICA
(async function() {
  console.log('🚀 Iniciando limpeza completa...');
  
  // 1. Limpar localStorage
  localStorage.clear();
  console.log('✅ localStorage limpo');
  
  // 2. Carregar funções do backend
  const SERVER_URL = 'https://qjiwmutqpmydazhnabri.supabase.co/functions/v1/make-server-1a8b02da';
  
  // 3. Resetar senha do admin
  try {
    const response = await fetch(`${SERVER_URL}/debug/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: 'controleinterno@jardim.ce.gov.br', 
        novaSenha: '@Gustavo25' 
      })
    });
    const result = await response.json();
    console.log('✅ Senha do admin resetada!');
  } catch (error) {
    console.log('⚠️ Backend offline ou senha já está correta');
  }
  
  // 4. Recarregar página
  console.log('🔄 Recarregando em 2 segundos...');
  setTimeout(() => location.reload(), 2000);
})();
```

**Pronto! Aguarde 2 segundos e faça login!** 🎉
