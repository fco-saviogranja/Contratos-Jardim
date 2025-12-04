# ✅ ATUALIZAÇÃO: Upload de Foto com FormData

## 🎯 PROBLEMAS CORRIGIDOS

### 1. ❌ Perfil aparecendo errado
**Problema:** Em "Meu Perfil", estava aparecendo "Fiscal de Contratos" mas o usuário é "Administrador CGM"

**Causa:** A função `getPerfilBadge()` não normalizava o valor do perfil. O backend salva "Administrador CGM" (texto completo) mas o código esperava "admin" (código).

**Solução:** ✅ Adicionada normalização automática que reconhece:
- "Administrador CGM" ou "admin" → Badge azul de Administrador
- "Gestor de Contratos" ou "gestor" → Badge verde de Gestor
- Qualquer outro valor → Badge roxo de Fiscal

---

### 2. ❌ Upload de foto usando base64
**Problema:** Upload de foto estava convertendo para base64 e enviando como JSON, o que:
- Aumenta tamanho em ~33%
- Sobrecarrega memória do navegador
- Menos eficiente

**Solução:** ✅ Mudado para **FormData com arquivo real** (método recomendado)

---

## 🔄 ALTERAÇÕES IMPLEMENTADAS

### Frontend: `/components/MeuPerfil.tsx`

#### 1. Correção do Badge de Perfil

**ANTES:**
```typescript
const getPerfilBadge = (perfil: string) => {
  if (perfil === 'admin') {
    return <Badge>Administrador</Badge>;
  }
  if (perfil === 'gestor') {
    return <Badge>Gestor</Badge>;
  }
  // Sempre retorna Fiscal se não for admin ou gestor
  return <Badge>Fiscal de Contratos</Badge>;
};
```

**DEPOIS:**
```typescript
const getPerfilBadge = (perfil: string) => {
  // Normalizar perfil para código
  const perfilNormalizado = perfil.toLowerCase().includes('administrador') 
    ? 'admin'
    : perfil.toLowerCase().includes('gestor')
    ? 'gestor'
    : perfil === 'admin' || perfil === 'gestor' || perfil === 'fiscal'
    ? perfil
    : 'fiscal';
  
  if (perfilNormalizado === 'admin') {
    return <Badge azul>Administrador (CGM)</Badge>;
  }
  if (perfilNormalizado === 'gestor') {
    return <Badge verde>Gestor de Contratos</Badge>;
  }
  return <Badge roxo>Fiscal de Contratos</Badge>;
};
```

**Resultado:** ✅ Agora reconhece "Administrador CGM" e exibe badge correto!

---

#### 2. Upload com FormData

**ANTES (Base64):**
```typescript
const handleFotoChange = async (file: File) => {
  // Converter para base64
  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64 = reader.result as string;
    
    // Enviar JSON com base64
    await usuariosAPI.uploadFotoPerfil(base64, file.name);
  };
  reader.readAsDataURL(file);
};
```

**DEPOIS (FormData):**
```typescript
const handleFotoChange = async (file: File) => {
  // Criar FormData com arquivo real
  const formData = new FormData();
  formData.append('foto', file);
  
  // Enviar FormData diretamente
  await usuariosAPI.uploadFotoPerfil(formData);
};
```

**Benefícios:**
- ✅ Mais simples (sem FileReader)
- ✅ Mais rápido
- ✅ Menos memória
- ✅ Método recomendado

---

### API: `/utils/api.tsx`

**ANTES:**
```typescript
async uploadFotoPerfil(foto: string, fileName: string) {
  return await apiRequest('/usuarios/me/foto', {
    method: 'POST',
    body: JSON.stringify({ foto, fileName }),
  });
}
```

**DEPOIS:**
```typescript
async uploadFotoPerfil(formData: FormData) {
  const token = localStorage.getItem('access_token');
  
  const response = await fetch(`${API_URL}/usuarios/me/foto`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // NÃO definir Content-Type - navegador define automaticamente
    },
    body: formData
  });

  return await response.json();
}
```

**Importante:** ⚠️ NÃO definir `Content-Type` header - o navegador define automaticamente com o `boundary` correto para multipart/form-data.

---

### Backend: `/supabase/functions/server/index.tsx`

**ANTES (Recebia JSON com base64):**
```typescript
app.post('/make-server-1a8b02da/usuarios/me/foto', async (c) => {
  const { foto, fileName } = await c.req.json();
  
  // Converter base64 para buffer
  const base64Data = foto.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
  
  // Upload para Storage...
});
```

**DEPOIS (Recebe FormData com arquivo real):**
```typescript
app.post('/make-server-1a8b02da/usuarios/me/foto', async (c) => {
  // Obter FormData
  const formData = await c.req.formData();
  const foto = formData.get('foto') as File;
  
  // Validações
  if (!foto.type.startsWith('image/')) {
    return c.json({ error: 'Arquivo deve ser uma imagem' }, 400);
  }
  
  if (foto.size > 5 * 1024 * 1024) {
    return c.json({ error: 'Imagem deve ter no máximo 5MB' }, 400);
  }
  
  // Converter File para buffer
  const arrayBuffer = await foto.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  
  // Upload para Storage
  await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, buffer, {
      contentType: foto.type,  // Tipo real do arquivo
      upsert: true
    });
});
```

**Vantagens:**
- ✅ Recebe arquivo real ao invés de string base64
- ✅ Validação de tipo nativa (`foto.type`)
- ✅ Validação de tamanho nativa (`foto.size`)
- ✅ Usa content-type correto do arquivo
- ✅ Logs mais informativos

---

## 📊 COMPARAÇÃO

### Tamanho da Requisição

| Método | Foto 1MB | Foto 3MB | Foto 5MB |
|--------|----------|----------|----------|
| **Base64 (JSON)** | ~1.33 MB | ~4 MB | ~6.65 MB |
| **FormData (Arquivo)** | 1 MB | 3 MB | 5 MB |
| **Economia** | 25% | 25% | 25% |

### Performance

| Aspecto | Base64 | FormData | Vantagem |
|---------|--------|----------|----------|
| **Conversão no frontend** | Sim (FileReader) | Não | FormData |
| **Uso de memória** | Alto | Baixo | FormData |
| **Velocidade** | Lenta | Rápida | FormData |
| **Código** | Complexo | Simples | FormData |

---

## 🧪 COMO TESTAR

### 1. Fazer Deploy do Backend

```bash
# Via Dashboard Supabase
1. Abrir https://supabase.com/dashboard/project/wdkgxmwnacmzdfcvrofe
2. Edge Functions → make-server-1a8b02da
3. Copiar código de /supabase/functions/server/index.tsx
4. Deploy

# Ou via CLI
supabase functions deploy make-server-1a8b02da --no-verify-jwt
```

### 2. Testar Perfil Correto

1. Login: `controleinterno@jardim.ce.gov.br` / `@Gustavo25`
2. Ir para "Administração" → "Gerenciar usuários"
3. Clicar na aba "Meu Perfil"
4. **Verificar:** Badge azul "Administrador (CGM)" ✅

### 3. Testar Upload de Foto

1. Ainda em "Meu Perfil"
2. Clicar no ícone da câmera
3. Selecionar uma foto (JPG, PNG)
4. **Verificar:** 
   - Foto carregada sem erros ✅
   - Foto aparece no perfil ✅
   - Foto aparece no header ✅

### 4. Verificar Logs do Backend

No Dashboard Supabase → Edge Functions → Logs:

```
📸 [UPLOAD-FOTO] Upload de foto para usuário: abc-123-def
📎 [UPLOAD-FOTO] Arquivo: perfil.jpg (245.67 KB)
🗑️ [UPLOAD-FOTO] Deletando foto anterior: perfil/abc-123-def-1701619200000.jpg
✅ [UPLOAD-FOTO] Foto salva com sucesso: perfil/abc-123-def-1701619300000.jpg
```

---

## ✅ CHECKLIST DE VERIFICAÇÃO

### Perfil
- [ ] Badge mostra "Administrador (CGM)" em azul
- [ ] Badge mostra "Gestor de Contratos" em verde
- [ ] Badge mostra "Fiscal de Contratos" em roxo

### Upload de Foto
- [ ] Upload funciona sem erros
- [ ] Foto aparece no perfil
- [ ] Foto aparece no header
- [ ] Foto anterior é deletada
- [ ] Tamanho máximo 5MB validado
- [ ] Apenas imagens aceitas

### Backend
- [ ] FormData processado corretamente
- [ ] Validações funcionando
- [ ] Logs informativos
- [ ] Storage funcionando

---

## 🔍 DEBUG

### Perfil aparecendo errado ainda?

1. **Verificar valor no backend:**
   - Dashboard Supabase → Table Editor → kv_store_1a8b02da
   - Procurar chave `user:...`
   - Ver campo `perfil`
   - Deve ser "Administrador CGM" ou "admin"

2. **Limpar cache do navegador:**
   - Ctrl+Shift+Delete
   - Limpar cache e cookies
   - Fazer login novamente

### Upload não funciona?

1. **Verificar se backend foi deployado:**
   ```
   https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/health
   ```

2. **Ver logs do navegador:**
   - F12 → Console
   - Procurar por "📸 Fazendo upload"

3. **Ver logs do backend:**
   - Dashboard → Edge Functions → make-server-1a8b02da → Logs
   - Procurar por erros

### Foto muito grande?

**Erro:** "Imagem deve ter no máximo 5MB"

**Solução:** Redimensionar foto antes do upload:
- Windows: Paint → Redimensionar
- Mac: Preview → Tools → Adjust Size
- Online: https://imageresizer.com

---

## 📚 REFERÊNCIAS

- [FormData MDN](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Hono FormData](https://hono.dev/api/request#formdata)

---

## ✅ STATUS

```
✅ Perfil exibido corretamente
✅ Upload com FormData implementado
✅ Backend atualizado
✅ Frontend atualizado
✅ API atualizada
✅ Validações adicionadas
✅ Logs melhorados
✅ Pronto para deploy!
```

---

**Data:** 03/12/2024  
**Sistema:** ContratosJardim  
**Módulo:** Upload de Fotos + Perfil  
**Status:** ✅ CONCLUÍDO  
