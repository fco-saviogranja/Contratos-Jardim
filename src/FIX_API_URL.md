# ✅ CORREÇÃO: API_URL não definido

## ❌ ERRO ORIGINAL

```
❌ Erro ao fazer upload: ReferenceError: API_URL is not defined
```

## 🔍 CAUSA

No arquivo `/utils/api.tsx`, a variável usada é `SERVER_URL` e não `API_URL`:

```typescript
// URLs do backend
const SUPABASE_URL = `https://${projectId}.supabase.co`;
const SERVER_URL = `${SUPABASE_URL}/functions/v1/make-server-1a8b02da`;  // ✅ Correto
```

A função `uploadFotoPerfil()` estava usando `API_URL` (que não existe):

```typescript
// ❌ ERRADO
const response = await fetch(`${API_URL}/usuarios/me/foto`, {
  ...
});
```

## ✅ SOLUÇÃO

Alterado para usar `SERVER_URL`:

```typescript
// ✅ CORRETO
const response = await fetch(`${SERVER_URL}/usuarios/me/foto`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
  body: formData
});
```

## 📝 ARQUIVO CORRIGIDO

**Arquivo:** `/utils/api.tsx`  
**Linha:** ~497  
**Função:** `usuarios.uploadFotoPerfil()`

## 🧪 TESTE

Agora o upload deve funcionar:

1. Login no sistema
2. Ir em "Meu Perfil"
3. Clicar no ícone da câmera
4. Selecionar foto
5. ✅ Upload funciona sem erros!

## ✅ STATUS

```
✅ Erro corrigido
✅ SERVER_URL usado corretamente
✅ Pronto para testar upload
```

---

**Data:** 03/12/2024  
**Erro:** ReferenceError: API_URL is not defined  
**Status:** ✅ RESOLVIDO
