# 💻 EXEMPLOS DE CÓDIGO - ALTERAÇÕES

## 🎨 1. NORMALIZAÇÃO DE PERFIL

### Problema Original

```typescript
// ❌ ANTES - Não funcionava com "Administrador CGM"
const getPerfilBadge = (perfil: string) => {
  if (perfil === 'admin') {
    return <Badge>Administrador</Badge>;
  }
  if (perfil === 'gestor') {
    return <Badge>Gestor</Badge>;
  }
  // PROBLEMA: Sempre retorna Fiscal se não for exatamente "admin" ou "gestor"
  return <Badge>Fiscal</Badge>;
};

// Resultado:
// perfil = "Administrador CGM" → ❌ Badge Fiscal (ERRADO!)
// perfil = "admin" → ✅ Badge Administrador (correto)
```

### Solução Implementada

```typescript
// ✅ DEPOIS - Funciona com qualquer variação
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

// Resultado:
// perfil = "Administrador CGM" → ✅ Badge Administrador (correto!)
// perfil = "ADMINISTRADOR" → ✅ Badge Administrador (correto!)
// perfil = "admin" → ✅ Badge Administrador (correto!)
// perfil = "Gestor de Contratos" → ✅ Badge Gestor (correto!)
// perfil = "gestor" → ✅ Badge Gestor (correto!)
```

---

## 📤 2. UPLOAD COM FORMDATA

### Método Antigo (Base64)

```typescript
// ❌ ANTES - Complexo e ineficiente
const handleFotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    setUploadingFoto(true);
    
    // 1. Criar FileReader
    const reader = new FileReader();
    
    // 2. Definir callback
    reader.onloadend = async () => {
      try {
        // 3. Obter base64
        const base64 = reader.result as string;
        
        // 4. Enviar JSON com base64 gigante
        const response = await usuariosAPI.uploadFotoPerfil(base64, file.name);
        
        if (response.success) {
          toast.success('Foto atualizada!');
        }
      } catch (error) {
        toast.error('Erro: ' + error.message);
      } finally {
        setUploadingFoto(false);
      }
    };
    
    // 5. Iniciar conversão
    reader.readAsDataURL(file);
    
  } catch (error) {
    toast.error('Erro: ' + error.message);
    setUploadingFoto(false);
  }
};

// Problemas:
// - 20+ linhas de código
// - FileReader assíncrono complexo
// - Base64 aumenta tamanho em 33%
// - Usa mais memória
// - Mais lento
```

### Método Novo (FormData)

```typescript
// ✅ DEPOIS - Simples e eficiente
const handleFotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    setUploadingFoto(true);
    
    // 1. Criar FormData
    const formData = new FormData();
    formData.append('foto', file);
    
    // 2. Enviar direto
    const response = await usuariosAPI.uploadFotoPerfil(formData);
    
    if (response.success) {
      toast.success('Foto atualizada!');
    }
  } catch (error) {
    toast.error('Erro: ' + error.message);
  } finally {
    setUploadingFoto(false);
  }
};

// Vantagens:
// - 10 linhas de código (50% menos)
// - Sem FileReader
// - Tamanho real do arquivo
// - Menos memória
// - Mais rápido
// - Código limpo e legível
```

---

## 🌐 3. API - ENVIO DE FORMDATA

### Método Antigo (JSON)

```typescript
// ❌ ANTES - Envio de JSON com base64
async uploadFotoPerfil(foto: string, fileName: string) {
  console.log('📸 Fazendo upload...');
  
  return await apiRequest('/usuarios/me/foto', {
    method: 'POST',
    body: JSON.stringify({ 
      foto: foto,        // String base64 gigante
      fileName: fileName 
    }),
  });
}

// Requisição HTTP gerada:
// POST /usuarios/me/foto
// Content-Type: application/json
// 
// {
//   "foto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA...", (50.000+ caracteres)
//   "fileName": "perfil.jpg"
// }
```

### Método Novo (FormData)

```typescript
// ✅ DEPOIS - Envio de FormData
async uploadFotoPerfil(formData: FormData) {
  console.log('📸 Fazendo upload (FormData)...');
  
  const token = localStorage.getItem('access_token');
  
  const response = await fetch(`${API_URL}/usuarios/me/foto`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // ⚠️ IMPORTANTE: NÃO definir Content-Type
      // O navegador define automaticamente com boundary
    },
    body: formData  // Arquivo binário real
  });

  return await response.json();
}

// Requisição HTTP gerada:
// POST /usuarios/me/foto
// Content-Type: multipart/form-data; boundary=----WebKitFormBoundary...
// 
// ------WebKitFormBoundary...
// Content-Disposition: form-data; name="foto"; filename="perfil.jpg"
// Content-Type: image/jpeg
// 
// [dados binários da imagem]
// ------WebKitFormBoundary...
```

---

## 🖥️ 4. BACKEND - PROCESSAMENTO

### Método Antigo (JSON + Base64)

```typescript
// ❌ ANTES - Processar JSON com base64
app.post('/make-server-1a8b02da/usuarios/me/foto', async (c) => {
  // 1. Ler JSON
  const { foto, fileName } = await c.req.json();
  
  // 2. Remover prefixo data:image
  const base64Data = foto.replace(/^data:image\/\w+;base64,/, '');
  
  // 3. Decodificar base64 para binário
  const buffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
  
  // 4. Adivinhar extensão do nome do arquivo
  const fileExtension = fileName?.split('.').pop() || 'jpg';
  
  // 5. Upload
  await supabase.storage.upload(filePath, buffer, {
    contentType: `image/${fileExtension}`,  // Tipo adivinhado
  });
});

// Problemas:
// - Precisa decodificar base64
// - Content-type adivinhado
// - Validações manuais
// - Mais código
```

### Método Novo (FormData + Arquivo Real)

```typescript
// ✅ DEPOIS - Processar FormData com arquivo
app.post('/make-server-1a8b02da/usuarios/me/foto', async (c) => {
  // 1. Obter FormData
  const formData = await c.req.formData();
  const foto = formData.get('foto') as File;
  
  // 2. Validações nativas
  if (!foto.type.startsWith('image/')) {
    return c.json({ error: 'Deve ser imagem' }, 400);
  }
  
  if (foto.size > 5 * 1024 * 1024) {
    return c.json({ error: 'Máximo 5MB' }, 400);
  }
  
  // 3. Converter File para buffer
  const arrayBuffer = await foto.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  
  // 4. Upload
  await supabase.storage.upload(filePath, buffer, {
    contentType: foto.type,  // Tipo real do arquivo
  });
  
  // 5. Log informativo
  console.log(`📎 Arquivo: ${foto.name} (${(foto.size / 1024).toFixed(2)} KB)`);
});

// Vantagens:
// - Sem decodificação base64
// - Content-type real (foto.type)
// - Validações nativas (foto.size, foto.type)
// - Logs informativos
// - Código mais limpo
```

---

## 📊 5. COMPARAÇÃO DE TAMANHO

### Exemplo Real: Foto de 1MB

#### Base64
```javascript
// Arquivo original: 1.000.000 bytes (1 MB)
const file = new File([...], 'foto.jpg');

// Converter para base64
const reader = new FileReader();
reader.readAsDataURL(file);

// Resultado: 1.333.333 bytes (1.33 MB)
// Aumento: +333.333 bytes (+33%)
const base64 = "data:image/jpeg;base64,/9j/4AAQSkZJ..."; // 1.33 MB

// Enviar via JSON
const json = JSON.stringify({ 
  foto: base64,
  fileName: "foto.jpg" 
});
// Total: ~1.33 MB
```

#### FormData
```javascript
// Arquivo original: 1.000.000 bytes (1 MB)
const file = new File([...], 'foto.jpg');

// Criar FormData
const formData = new FormData();
formData.append('foto', file);

// Enviar FormData
// Total: ~1.000.050 bytes (~1 MB)
// Overhead: apenas ~50 bytes (headers)
// Aumento: +0.005%
```

### Economia de Banda

```
Foto 1MB:
- Base64: 1.33 MB → FormData: 1.00 MB = -25% (330 KB economizados)

Foto 3MB:
- Base64: 4.00 MB → FormData: 3.00 MB = -25% (1 MB economizado)

Foto 5MB:
- Base64: 6.65 MB → FormData: 5.00 MB = -25% (1.65 MB economizados)
```

---

## 🔍 6. EXEMPLO COMPLETO DE FLUXO

### Antes (Base64)
```typescript
// 1️⃣ FRONTEND - MeuPerfil.tsx
const file = e.target.files[0];

const reader = new FileReader();
reader.onloadend = async () => {
  const base64 = reader.result;  // "data:image/jpeg;base64,..."
  
  // 2️⃣ API - api.tsx
  await fetch('/usuarios/me/foto', {
    body: JSON.stringify({ foto: base64, fileName: file.name })
  });
};
reader.readAsDataURL(file);

// 3️⃣ BACKEND - index.tsx
const { foto, fileName } = await c.req.json();
const buffer = Uint8Array.from(atob(foto.split(',')[1]), c => c.charCodeAt(0));
await storage.upload(path, buffer);
```

### Depois (FormData)
```typescript
// 1️⃣ FRONTEND - MeuPerfil.tsx
const file = e.target.files[0];

const formData = new FormData();
formData.append('foto', file);

// 2️⃣ API - api.tsx
await fetch('/usuarios/me/foto', {
  body: formData
});

// 3️⃣ BACKEND - index.tsx
const formData = await c.req.formData();
const foto = formData.get('foto');
const buffer = new Uint8Array(await foto.arrayBuffer());
await storage.upload(path, buffer);
```

---

## 🎯 7. VALIDAÇÕES

### Frontend
```typescript
const handleFotoChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // ✅ Validar tamanho
  if (file.size > 5 * 1024 * 1024) {
    toast.error('A imagem deve ter no máximo 5MB');
    return;
  }

  // ✅ Validar tipo
  if (!file.type.startsWith('image/')) {
    toast.error('Apenas imagens são permitidas');
    return;
  }

  // Prosseguir com upload...
};
```

### Backend
```typescript
app.post('/usuarios/me/foto', async (c) => {
  const foto = formData.get('foto') as File;
  
  // ✅ Validar tipo
  if (!foto.type.startsWith('image/')) {
    return c.json({ error: 'Arquivo deve ser uma imagem' }, 400);
  }
  
  // ✅ Validar tamanho
  if (foto.size > 5 * 1024 * 1024) {
    return c.json({ error: 'Imagem deve ter no máximo 5MB' }, 400);
  }
  
  // ✅ Log informativo
  console.log(`📎 [UPLOAD-FOTO] Arquivo: ${foto.name} (${(foto.size / 1024).toFixed(2)} KB)`);
  
  // Prosseguir com upload...
});
```

---

## ✅ RESUMO DAS VANTAGENS

### FormData vs Base64

| Aspecto | Base64 | FormData | Vencedor |
|---------|--------|----------|----------|
| **Código** | 20+ linhas | 5 linhas | ✅ FormData |
| **Tamanho** | +33% | 0% | ✅ FormData |
| **Memória** | Alta | Baixa | ✅ FormData |
| **Velocidade** | Lenta | Rápida | ✅ FormData |
| **Validação** | Manual | Nativa | ✅ FormData |
| **Content-Type** | Adivinhado | Real | ✅ FormData |
| **Complexidade** | Alta | Baixa | ✅ FormData |

---

**Conclusão:** FormData é superior em todos os aspectos! ✅

---

**Sistema:** ContratosJardim  
**Arquivo:** EXEMPLOS_CODIGO.md  
**Data:** 03/12/2024  
