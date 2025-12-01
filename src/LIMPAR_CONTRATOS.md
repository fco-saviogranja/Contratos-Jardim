# 🗑️ Como Deletar Todos os Contratos do Sistema

## ⚠️ ATENÇÃO

Esta operação irá **DELETAR PERMANENTEMENTE** todos os contratos cadastrados no sistema. Esta ação é **IRREVERSÍVEL**!

Apenas usuários com perfil **Administrador (admin)** podem executar esta operação.

---

## 📋 Passo a Passo

### **Método 1: Via Console do Navegador (Mais Simples)**

1. **Faça login no sistema** como administrador
   - E-mail: `controleinterno@jardim.ce.gov.br`
   - Senha: `@Gustavo25`

2. **Abra o Console do Navegador**
   - Pressione `F12` ou `Ctrl+Shift+I` (Windows/Linux)
   - Pressione `Cmd+Option+I` (Mac)
   - Vá para a aba **Console**

3. **Execute o seguinte código** no console:

```javascript
// Importar a função de limpeza
import('./utils/limparContratos.js').then(module => {
  module.limparTodosContratos()
    .then(response => {
      console.log('✅ Limpeza concluída!');
      console.log(`📊 ${response.deletados} contrato(s) deletado(s)`);
      // Recarregar a página
      window.location.reload();
    })
    .catch(err => {
      console.error('❌ Erro ao limpar contratos:', err.message);
    });
});
```

4. **Confirme a execução** pressionando `Enter`

5. **Aguarde** a mensagem de sucesso

6. A **página será recarregada automaticamente** e o sistema estará vazio

---

### **Método 2: Via API Direta (Avançado)**

Se preferir, você pode chamar a API diretamente usando `fetch`:

```javascript
// Obter o token de autenticação
const accessToken = localStorage.getItem('access_token');

// Fazer a requisição DELETE
fetch('https://[SEU_PROJECT_ID].supabase.co/functions/v1/make-server-1a8b02da/contratos', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }
})
.then(response => response.json())
.then(data => {
  console.log('✅ Resposta:', data);
  console.log(`📊 ${data.deletados} contrato(s) deletado(s)`);
  window.location.reload();
})
.catch(error => {
  console.error('❌ Erro:', error);
});
```

---

## 🔒 Segurança

- ✅ Apenas administradores podem executar esta operação
- ✅ O sistema verifica o perfil do usuário antes de deletar
- ✅ Todos os contratos são removidos do banco de dados KV Store
- ✅ A operação é registrada nos logs do servidor

---

## 🔄 Próximos Passos Após a Limpeza

Após deletar todos os contratos:

1. **Dashboard** mostrará estado vazio com mensagem informativa
2. **Página de Contratos** não exibirá nenhum registro
3. **Alertas** relacionados aos contratos também devem ser revisados
4. Você pode **importar novos contratos via Excel** ou **cadastrar manualmente**

---

## 📝 Notas

- A operação é **instantânea** e **irreversível**
- Não há backup automático - certifique-se de exportar os dados antes se necessário
- Os alertas não são deletados automaticamente (apenas os contratos)
- Os usuários e secretarias permanecem intactos

---

## ❓ Problemas Comuns

### "Não autorizado" ou "403 Forbidden"
**Causa:** Você não está logado como administrador  
**Solução:** Faça logout e login novamente com as credenciais do administrador

### "Token inválido ou expirado"
**Causa:** Sua sessão expirou  
**Solução:** Faça logout e login novamente

### "Erro ao conectar ao servidor"
**Causa:** A Edge Function não está ativa ou há problema de rede  
**Solução:** Verifique se a aplicação está rodando corretamente

---

## 🆘 Suporte

Se tiver problemas, verifique:
1. Console do navegador (F12) para mensagens de erro detalhadas
2. Logs do servidor Supabase
3. Status da Edge Function no painel Supabase

---

**Última atualização:** Dezembro 2024
