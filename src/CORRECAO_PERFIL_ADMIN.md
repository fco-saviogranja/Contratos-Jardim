# 🔧 Correção: Usuário Gustavo não aparece em "Gerenciar Usuários"

## 📋 Problema Identificado

O usuário Gustavo (controleinterno@jardim.ce.gov.br) não aparecia na listagem de "Gerenciar Usuários" na aba "Administradores (CGM)".

### Causa Raiz

O perfil do administrador principal estava sendo salvo no backend como `"Administrador CGM"` em vez de `"admin"`, mas a tela de "Gerenciar Usuários" filtra por `perfil === 'admin'`.

**Arquivo afetado:**
- `/supabase/functions/server/index.tsx` linha 157

**Código problemático:**
```typescript
const ADMIN_PRINCIPAL = {
  email: 'controleinterno@jardim.ce.gov.br',
  password: '@Gustavo25',
  nome: 'Controle Interno CGM',
  perfil: 'Administrador CGM', // ❌ ERRADO - não é filtrado corretamente
  secretaria: 'Controladoria Geral do Município'
};
```

**Código corrigido:**
```typescript
const ADMIN_PRINCIPAL = {
  email: 'controleinterno@jardim.ce.gov.br',
  password: '@Gustavo25',
  nome: 'Controle Interno CGM',
  perfil: 'admin', // ✅ CORRETO - compatível com filtros do frontend
  secretaria: 'Controladoria Geral do Município'
};
```

## ✅ Solução Implementada

1. **Correção no Backend**: Alterado o valor de `ADMIN_PRINCIPAL.perfil` de `"Administrador CGM"` para `"admin"`

2. **Auto-Normalização no Login**: O backend já possui lógica de normalização automática (linhas 374-393) que corrige o perfil do administrador principal sempre que ele faz login:

```typescript
// IMPORTANTE: Normalizar perfil do administrador principal
if (email === ADMIN_PRINCIPAL.email) {
  console.log(`🔧 [LOGIN] Normalizando perfil do administrador principal...`);
  
  // Se o perfil está diferente do esperado, corrigir
  if (userData.perfil !== ADMIN_PRINCIPAL.perfil) {
    console.log(`   Perfil anterior: ${userData.perfil}`);
    console.log(`   Perfil corrigido: ${ADMIN_PRINCIPAL.perfil}`);
    userData.perfil = ADMIN_PRINCIPAL.perfil;
  }
  
  // Garantir nome e secretaria corretos
  if (userData.nome !== ADMIN_PRINCIPAL.nome) {
    userData.nome = ADMIN_PRINCIPAL.nome;
  }
  if (userData.secretaria !== ADMIN_PRINCIPAL.secretaria) {
    userData.secretaria = ADMIN_PRINCIPAL.secretaria;
  }
}
```

## 🚀 Como Aplicar a Correção

### Opção 1: Aguardar Próximo Login (Automático)
O perfil será corrigido automaticamente no próximo login do usuário Gustavo.

### Opção 2: Fazer Logout e Login Imediatamente
1. Faça logout do sistema
2. Faça login novamente com as credenciais:
   - **Email:** controleinterno@jardim.ce.gov.br
   - **Senha:** @Gustavo25
3. O backend detectará automaticamente que é o administrador principal e normalizará o perfil para `"admin"`

### Opção 3: Fazer Deploy da Edge Function (Recomendado para Produção)

Se você está trabalhando em produção e quer garantir que novos administradores sejam criados com o perfil correto:

1. Execute o deploy da Edge Function atualizada:
```bash
supabase functions deploy make-server-1a8b02da
```

2. Execute o endpoint de setup para recriar/atualizar o administrador:
```bash
curl -X POST https://SEU_PROJECT_ID.supabase.co/functions/v1/make-server-1a8b02da/auth/setup-admin \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_ANON_KEY"
```

## 📊 Verificação

Após a correção, você pode verificar se está funcionando:

1. Acesse "Gerenciar Usuários"
2. Clique na aba "Administradores (CGM)"
3. O usuário "Controle Interno CGM" (controleinterno@jardim.ce.gov.br) deve aparecer na listagem

## 🔍 Perfis Válidos no Sistema

O sistema suporta três perfis:
- `"admin"` - Administrador CGM (acesso completo)
- `"gestor"` - Gestor de Contratos
- `"fiscal"` - Fiscal de Contratos

**IMPORTANTE:** Os perfis devem ser salvos em minúsculas no KV Store para compatibilidade com os filtros do frontend.

## 📝 Notas Técnicas

- O frontend exibe "Administrador (CGM)" na interface, mas internamente armazena como `"admin"`
- A normalização automática garante resiliência contra alterações manuais incorretas
- Esta correção não afeta usuários já criados com perfis corretos (gestor/fiscal)
