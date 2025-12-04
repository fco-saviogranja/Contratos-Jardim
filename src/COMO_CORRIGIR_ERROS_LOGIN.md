# 🔧 Como Corrigir Erros de Login - Guia Completo

## 🚨 Erros Comuns

```
❌ A user with this email address has already been registered
❌ Credenciais inválidas. Verifique seu e-mail e senha
❌ Erro ao criar usuário
❌ Erro ao fazer login
```

## 📊 Status da Correção

✅ **Backend Corrigido** - Perfil do admin agora é `"admin"` (em vez de `"Administrador CGM"`)  
✅ **Endpoint de Fix Criado** - `/debug/fix-user` sincroniza Auth + KV Store  
✅ **Interface Atualizada** - Página de Diagnóstico mostra status completo  
✅ **Auto-Normalização** - Login automático corrige perfil se necessário  

## 🎯 Solução Rápida (3 Passos)

### Passo 1: Acesse a Página de Diagnóstico

**Opção A - Via Interface (Recomendado):**
1. Na tela de login, clique no ícone ⚙️ (Configurações) no canto inferior direito
2. Clique em "Diagnóstico de Sistema"

**Opção B - URL Direta:**
- Acesse: `http://localhost:8080/diagnostico` (ou seu domínio)

### Passo 2: Corrigir o Usuário

1. Na seção **"Diagnosticar Login"**
2. Digite o email: `controleinterno@jardim.ce.gov.br`
3. Clique no botão verde **"Corrigir Usuário"**

### Passo 3: Fazer Login

O sistema exibirá as credenciais corretas:
- **Email:** `controleinterno@jardim.ce.gov.br`
- **Senha:** `@Gustavo25`

Use essas credenciais na tela de login.

## 🛠️ O Que o Sistema Faz Automaticamente

Quando você clica em "Corrigir Usuário", o sistema:

1. ✅ Busca o usuário no Supabase Auth
2. ✅ Atualiza a senha para `@Gustavo25`
3. ✅ Corrige o perfil para `admin`
4. ✅ Salva todos os dados no KV Store
5. ✅ Testa o login automaticamente
6. ✅ Exibe as credenciais na tela

## 💻 Solução Alternativa (Console do Navegador)

Se você não conseguir acessar a interface:

1. Abra a tela de login
2. Pressione **F12** para abrir o Console
3. Cole e execute este código:

```javascript
fetch(window.location.origin + '/functions/v1/make-server-1a8b02da/debug/fix-user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + 'SUA_ANON_KEY_AQUI'
  },
  body: JSON.stringify({
    email: 'controleinterno@jardim.ce.gov.br'
  })
})
.then(r => r.json())
.then(data => {
  console.log('✅ CORREÇÃO CONCLUÍDA!');
  console.log('');
  console.log('🔑 Use estas credenciais para fazer login:');
  console.log('   Email:', data.credentials.email);
  console.log('   Senha:', data.credentials.password);
  console.log('');
  console.log('📊 Dados do usuário:', data.kvUser);
});
```

**Importante:** Substitua `SUA_ANON_KEY_AQUI` pela sua chave anônima do Supabase.

## 📱 Como Obter a Anon Key

Existem duas formas:

### Forma 1: Via Código-Fonte
1. Abra o Console (F12)
2. Digite: `localStorage.getItem('anon_key')`
3. Copie o valor retornado

### Forma 2: Via Supabase Dashboard
1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em Settings → API
4. Copie a "anon public" key

## 🔍 Verificar Se Funcionou

Após a correção:

1. **Faça login** com as credenciais:
   - Email: `controleinterno@jardim.ce.gov.br`
   - Senha: `@Gustavo25`

2. **Verifique o perfil:**
   - Vá em: **Gerenciar Usuários** → Aba **"Administradores (CGM)"**
   - O usuário "Controle Interno CGM" deve aparecer

3. **Verifique os dados:**
   - Clique na foto/nome no canto superior direito
   - Selecione **"Meu Perfil"**
   - Confirme que o perfil é **"Administrador CGM"**

## 📊 Entendendo o Problema

### Antes da Correção:
```json
{
  "perfil": "Administrador CGM"  // ❌ String errada
}
```

### Depois da Correção:
```json
{
  "perfil": "admin"  // ✅ Valor correto
}
```

### Por Que Isso Importa?

O frontend filtra usuários assim:
```javascript
usuarios.filter(user => user.perfil === 'admin')
```

Se o perfil for `"Administrador CGM"`, o usuário não aparece na lista!

## 🔐 Segurança

### Em Desenvolvimento:
- ✅ Endpoint `/debug/fix-user` disponível
- ✅ Pode ser usado livremente

### Em Produção:
- ⚠️ **IMPORTANTE:** Proteja ou remova endpoints de debug
- ⚠️ Adicione autenticação admin nos endpoints `/debug/*`
- ⚠️ Ou remova completamente da Edge Function

## 🚀 Após Correção

O sistema possui **auto-normalização** implementada!

Sempre que o usuário `controleinterno@jardim.ce.gov.br` fizer login:
- O perfil é automaticamente corrigido para `admin`
- A senha é mantida como `@Gustavo25`
- Dados são sincronizados entre Auth e KV Store

**Código em:** `/supabase/functions/server/index.tsx` linhas 374-393

## ❓ FAQ - Perguntas Frequentes

### P: Posso mudar a senha padrão?
**R:** Sim! Depois de fazer login, vá em "Meu Perfil" e altere a senha.

### P: O que acontece se eu mudar o perfil manualmente?
**R:** No próximo login, o sistema corrige automaticamente para `admin`.

### P: Posso usar esse endpoint para outros usuários?
**R:** Sim, mas para usuários que não são admin, ele apenas sincroniza os dados sem alterar a senha.

### P: E se eu já deletei o usuário?
**R:** Use o endpoint `/auth/setup-admin` para recriar o usuário do zero.

### P: Como testar sem fazer login?
**R:** Use a função "Diagnosticar Login" na página de Diagnóstico - ela testa sem fazer login.

## 📞 Suporte

Se nada funcionar:

1. **Verifique os logs do Console** (F12)
2. **Verifique os logs do Supabase** (Dashboard → Logs)
3. **Execute o Setup Inicial** na página de Diagnóstico
4. **Entre em contato** com controleinterno@jardim.ce.gov.br

## 📝 Resumo dos Arquivos Alterados

### Backend:
- ✅ `/supabase/functions/server/index.tsx`
  - Linha 157: Perfil corrigido para `"admin"`
  - Linhas 374-393: Auto-normalização no login
  - Linhas 606-720: Endpoint `/debug/fix-user` criado

### Frontend:
- ✅ `/pages/Diagnostico.tsx`
  - Linhas 95-123: Função `corrigirUsuario` atualizada
  - Linhas 833-889: Renderização de resultado `fix-success`

### Documentação:
- ✅ `/CORRECAO_PERFIL_ADMIN.md` - Detalhes técnicos
- ✅ `/SOLUCAO_RAPIDA_ERRO_LOGIN.md` - Guia rápido
- ✅ `/COMO_CORRIGIR_ERROS_LOGIN.md` - Este guia completo

## ✅ Checklist de Correção

- [ ] Acesso à página de Diagnóstico
- [ ] Email digitado: controleinterno@jardim.ce.gov.br
- [ ] Clicado em "Corrigir Usuário"
- [ ] Credenciais exibidas na tela
- [ ] Login realizado com sucesso
- [ ] Usuário aparece em "Gerenciar Usuários"
- [ ] Perfil verificado em "Meu Perfil"

**Tudo marcado? Parabéns! 🎉 Sistema corrigido com sucesso!**
