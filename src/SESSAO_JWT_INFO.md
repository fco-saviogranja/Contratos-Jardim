# ℹ️ Informações sobre Sessão e Token JWT

## O que é o Token JWT?

O **JWT (JSON Web Token)** é um token de autenticação usado para manter você logado no sistema ContratosJardim. Quando você faz login, o servidor gera um token único que é armazenado no seu navegador.

## ⏱️ Tempo de Expiração

Por padrão, o Supabase Auth define um tempo de expiração para os tokens JWT:
- **Tempo de vida do token**: 1 hora (3600 segundos)
- **Refresh token**: 7 dias

## 🔄 O que acontece quando o token expira?

Quando o token JWT expira, você verá uma das seguintes mensagens:

```
⚠️ Token inválido ou expirado (401)
❌ Erro na requisição: Error: SESSION_EXPIRED
Sessão expirada. Por favor, faça login novamente.
```

**Isso é NORMAL e esperado!** O sistema foi projetado para:

1. ✅ Detectar automaticamente quando o token expira
2. ✅ Limpar a sessão localmente
3. ✅ Redirecionar você para a tela de login
4. ✅ Não quebrar a aplicação

## 🛡️ Por que os tokens expiram?

A expiração de tokens é uma **medida de segurança**:
- Reduz o risco de roubo de credenciais
- Limita o tempo que um token comprometido pode ser usado
- Força re-autenticação periódica

## 💡 Boas Práticas

### Para usuários:
1. **Salve seu trabalho regularmente** - Não deixe formulários abertos por muito tempo
2. **Faça logout** - Quando terminar de usar o sistema
3. **Recarregue a página** - Se perceber comportamento estranho

### Para desenvolvedores:
1. ✅ O sistema já detecta sessões expiradas automaticamente
2. ✅ Erros de sessão são tratados de forma silenciosa (sem spammar o console)
3. ✅ Verificações periódicas garantem que sessões inválidas sejam limpas

## 🔧 Monitoramento Automático

O sistema implementa as seguintes proteções:

### 1. Verificação no AuthContext
- Verifica a cada **1 minuto** se a sessão ainda é válida
- Faz logout automático se detectar sessão inválida

### 2. Verificação no App
- Verifica a cada **30 segundos** a validade da sessão
- Redireciona automaticamente para login se necessário

### 3. Tratamento de Erros na API
- Detecta erros 401 (Unauthorized)
- Detecta mensagem "Invalid JWT"
- Limpa sessão e retorna erro amigável

### 4. Navigation Resiliente
- Não tenta carregar alertas se não houver usuário autenticado
- Silencia erros de sessão expirada (comportamento normal)
- Atualiza alertas a cada **2 minutos** (reduzido para economizar recursos)

## 📋 Logs Normais vs. Problemas Reais

### ✅ Logs NORMAIS (não se preocupe):
```
ℹ️ [API] Token JWT expirado ou inválido - sessão encerrada
ℹ️ [NAVIGATION] Sessão expirada - alertas não carregados (isso é normal)
⚠️ [APP] Sessão inválida detectada - redirecionando para login
```

### ❌ Logs PROBLEMÁTICOS (requerem atenção):
```
❌ Servidor retornou HTML em vez de JSON
❌ Edge Function pode não estar implantada
🔌 Erro de rede: Não foi possível conectar ao servidor
⏱️ Timeout: Servidor não respondeu em 10 segundos
```

## 🔐 Segurança

### O que é armazenado no navegador:
- `access_token` - Token JWT para autenticação
- `user` - Dados básicos do usuário (nome, email, perfil)

### O que NÃO é armazenado:
- ❌ Senha do usuário
- ❌ SUPABASE_SERVICE_ROLE_KEY (apenas no backend)
- ❌ Dados sensíveis de outros usuários

## 🚀 Solução para "Sessão expirada"

Se você vir a mensagem de sessão expirada:

1. ✅ **Não entre em pânico** - É comportamento normal
2. ✅ **Faça login novamente** - Com seu email e senha
3. ✅ **Seu trabalho está salvo** - Se você salvou antes

## 📞 Suporte

Para problemas relacionados a autenticação:
- 📧 Email: controleinterno@jardim.ce.gov.br
- 👥 Equipe: Controladoria Geral do Município (CGM)

---

**Última atualização**: 3 de dezembro de 2025
**Sistema**: ContratosJardim v2.0
