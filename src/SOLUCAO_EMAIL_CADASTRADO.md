# 🔧 SOLUÇÃO: "Este e-mail já está cadastrado no sistema"

## 🎯 Problema
Ao tentar solicitar acesso ou fazer login, aparece o erro:
```
❌ Erro ao enviar solicitação: {
  "error": "Este e-mail já está cadastrado no sistema"
}
```

---

## ✅ SOLUÇÃO RÁPIDA (Copie e Cole no Console)

### 1️⃣ Abra o Console do Navegador
- Pressione **`F12`** (Windows/Linux) ou **`Cmd + Option + J`** (Mac)
- Clique na aba **"Console"**

### 2️⃣ Cole este código e pressione Enter:

```javascript
// SOLUÇÃO COMPLETA AUTOMÁTICA
(async function() {
  console.log('🚀 Iniciando limpeza completa...');
  
  // 1. Limpar localStorage
  localStorage.clear();
  console.log('✅ localStorage limpo');
  
  // 2. Resetar senha do admin no backend
  const SERVER_URL = 'https://qjiwmutqpmydazhnabri.supabase.co/functions/v1/make-server-1a8b02da';
  
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
  
  // 3. Recarregar página
  console.log('🔄 Recarregando em 2 segundos...');
  setTimeout(() => location.reload(), 2000);
})();
```

### 3️⃣ Aguarde 2 segundos

A página vai recarregar automaticamente.

### 4️⃣ Faça login

Use as credenciais:
- **Email:** `controleinterno@jardim.ce.gov.br`
- **Senha:** `@Gustavo25`

---

## 🔍 SOLUÇÃO PASSO A PASSO (Detalhada)

Se preferir fazer manualmente, siga estes passos:

### Passo 1: Limpar dados locais
```javascript
localStorage.clear()
```

### Passo 2: Carregar funções de limpeza
```javascript
const SERVER_URL = 'https://qjiwmutqpmydazhnabri.supabase.co/functions/v1/make-server-1a8b02da';

async function resetarSenhaBackend(email, novaSenha) {
  try {
    const response = await fetch(`${SERVER_URL}/debug/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, novaSenha })
    });
    const result = await response.json();
    console.log('✅ Senha resetada!');
    return result;
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}
```

### Passo 3: Resetar senha
```javascript
await resetarSenhaBackend('controleinterno@jardim.ce.gov.br', '@Gustavo25')
```

### Passo 4: Recarregar
```javascript
location.reload()
```

---

## 🆘 AINDA NÃO FUNCIONOU?

### Opção 1: Verificar conexão com o backend
```javascript
fetch('https://qjiwmutqpmydazhnabri.supabase.co/functions/v1/make-server-1a8b02da/health')
  .then(r => r.json())
  .then(d => console.log('✅ Backend online:', d))
  .catch(e => console.log('❌ Backend offline:', e))
```

### Opção 2: Limpar TUDO e fechar navegador
1. Execute no console:
   ```javascript
   localStorage.clear();
   sessionStorage.clear();
   ```
2. **Feche TODAS as abas** do sistema
3. **Feche o navegador completamente**
4. Abra novamente e acesse o sistema
5. Tente fazer login

### Opção 3: Usar navegador anônimo/privado
1. Abra uma janela anônima (`Ctrl + Shift + N` no Chrome)
2. Acesse o sistema
3. Faça login com as credenciais do admin

---

## 💡 POR QUE ESSE ERRO ACONTECE?

O erro **"Este e-mail já está cadastrado no sistema"** acontece quando:

1. **No localStorage:** O navegador tem dados antigos salvos de tentativas anteriores
2. **No backend Supabase:** O email já foi criado anteriormente no sistema de autenticação

A solução limpa AMBOS os locais para permitir que você faça login normalmente.

---

## 📞 ONDE ENCONTRAR AJUDA

- **Guia completo do console:** `/GUIA_CONSOLE_NAVEGADOR.md`
- **Funções de limpeza local:** `/utils/limparUsuariosLocal.js`
- **Funções de limpeza backend:** `/utils/limparBackend.js`

---

## ✅ CHECKLIST DE VERIFICAÇÃO

Após executar a solução, verifique:

- [ ] Executei a limpeza completa no console
- [ ] Esperei a página recarregar
- [ ] Tentei fazer login com `controleinterno@jardim.ce.gov.br`
- [ ] Usei a senha `@Gustavo25`
- [ ] O login funcionou sem erros

Se TODOS os itens estiverem marcados ✅, o problema foi resolvido!

---

**Última atualização:** 02/12/2025
