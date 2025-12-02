# 🗑️ Guia de Limpeza do Sistema ContratosJardim

## ⚠️ Problema com Deploy do Backend

Se você receber o erro **403** ao fazer deploy da Edge Function, não se preocupe! Criamos funções locais que funcionam **100% no navegador** sem precisar de backend.

---

## 🚀 Solução Rápida (SEM PRECISAR DE DEPLOY)

### 1. Abra o Console do Navegador
- Pressione **F12** ou **Ctrl+Shift+J** (Windows/Linux)
- Ou **Cmd+Option+J** (Mac)

### 2. Execute um dos comandos abaixo:

#### ⭐ **Limpeza Completa** (RECOMENDADO)
```javascript
limparSistemaCompleto()
```
**O que faz:**
- ✅ Remove **TODOS** os usuários mock do localStorage
- ✅ Remove **TODAS** as solicitações pendentes
- ✅ Limpa **TODOS** os contratos
- ✅ Limpa **TODOS** os alertas
- ✅ Mantém apenas o **Gustavo Barros**

---

#### 🔄 **Resetar para Estado Inicial**
```javascript
resetarSistemaInicial()
```
**O que faz:**
- ✅ Limpa **TUDO** do localStorage
- ✅ Cria usuário **Gustavo Barros**
- ✅ Cria **10 secretarias** padrão
- ✅ Sistema limpo e pronto para usar

---

#### 🔍 **Verificar Estado do Sistema**
```javascript
verificarEstadoSistema()
```
**O que mostra:**
- 👥 Quantidade de usuários
- 📄 Quantidade de contratos
- 📨 Quantidade de solicitações
- 🔔 Quantidade de alertas
- 🔐 Se há sessão ativa

---

## 📋 Credenciais do Administrador

Após a limpeza, use estas credenciais para fazer login:

```
👤 Nome: Gustavo Barros
📧 Email: controleinterno@jardim.ce.gov.br
🔑 Senha: @Gustavo25
🏢 Secretaria: CGM - Controladoria Geral
👔 Perfil: Administrador CGM
```

---

## 📝 Exemplo de Uso Completo

```javascript
// 1. Verificar estado atual
verificarEstadoSistema()

// 2. Limpar tudo
limparSistemaCompleto()

// 3. Recarregar a página
// Pressione F5

// 4. Fazer login com as credenciais acima
```

---

## 🎯 Cenários de Uso

### Cenário 1: Sistema com muitos usuários indesejados
```javascript
// Execute:
limparSistemaCompleto()
// Recarregue: F5
// Faça login com controleinterno@jardim.ce.gov.br
```

### Cenário 2: Sistema corrompido ou com erros
```javascript
// Execute:
resetarSistemaInicial()
// Recarregue: F5
// Sistema estará 100% limpo e funcional
```

### Cenário 3: Verificar quantos usuários/contratos existem
```javascript
// Execute:
verificarEstadoSistema()
// Verá um relatório completo no console
```

---

## 🔧 Funções Disponíveis (Todas Locais)

| Função | Descrição | Precisa de Deploy? |
|--------|-----------|-------------------|
| `limparSistemaCompleto()` | Limpa tudo, mantém Gustavo | ❌ NÃO |
| `resetarSistemaInicial()` | Reset completo do sistema | ❌ NÃO |
| `verificarEstadoSistema()` | Verificar dados atuais | ❌ NÃO |
| `resetarDadosMock()` | Resetar dados mock apenas | ❌ NÃO |

---

## ✅ Logs Detalhados

Ao executar `limparSistemaCompleto()`, você verá:

```
╔═══════════════════════════════════════════════════════════╗
║       🗑️ LIMPEZA COMPLETA DO SISTEMA (LOCAL)            ║
╚═══════════════════════════════════════════════════════════╝

⚠️ ATENÇÃO: Esta ação irá:
   • Limpar TODOS os usuários do localStorage
   • Limpar TODAS as solicitações pendentes
   • Limpar TODOS os contratos salvos
   • Limpar TODOS os alertas
   • Manter APENAS o Gustavo Barros

🗑️ 1. Limpando usuários mock...
   ✅ Usuários mock limpos!

🗑️ 2. Limpando solicitações...
   ✅ Solicitações limpas!

🗑️ 3. Limpando contratos...
   ✅ Contratos limpos!

🗑️ 4. Limpando alertas...
   ✅ Alertas limpos!

🗑️ 5. Limpando sessão atual...
   ✅ Sessão limpa!

╔═══════════════════════════════════════════════════════════╗
║              ✅ LIMPEZA COMPLETA FINALIZADA!             ║
╚═══════════════════════════════════════════════════════════╝

📋 ÚNICO USUÁRIO NO SISTEMA:

   👤 Nome: Gustavo Barros
   📧 Email: controleinterno@jardim.ce.gov.br
   🔑 Senha: @Gustavo25
   🏢 Secretaria: CGM - Controladoria Geral
   👔 Perfil: Administrador CGM

🔄 PRÓXIMO PASSO:
   Recarregue a página (F5) para aplicar as mudanças!
```

---

## ⚠️ Importante

1. **Sempre recarregue a página (F5)** após executar as funções de limpeza
2. **As funções funcionam em modo offline** (não precisam de internet/backend)
3. **Os dados são salvos no localStorage** do navegador
4. **Limpar localStorage = perder todos os dados mock**

---

## 🆘 Problemas Comuns

### Erro: "Function not defined"
**Solução:** Recarregue a página (F5) e tente novamente

### Erro: "Cannot read property"
**Solução:** Execute `resetarSistemaInicial()` para recriar tudo

### Login não funciona após limpeza
**Solução:** 
1. Limpe o cache do navegador (Ctrl+Shift+Delete)
2. Recarregue a página (F5)
3. Tente fazer login novamente

---

## 📞 Suporte

Se precisar de ajuda, verifique:
1. Se executou a função corretamente no console
2. Se recarregou a página após executar
3. Se está usando as credenciais corretas do Gustavo Barros

---

**Sistema ContratosJardim** - Controladoria Geral do Município de Jardim
