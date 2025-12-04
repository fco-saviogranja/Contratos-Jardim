# ⚡ GUIA RÁPIDO DE DEPLOY

## 🎯 O QUE FAZER AGORA

### 1️⃣ FAZER DEPLOY DO BACKEND (5 minutos)

```
📍 ACESSE: https://supabase.com/dashboard/project/wdkgxmwnacmzdfcvrofe

1. Clique em "Edge Functions" (menu lateral esquerdo)
2. Procure "make-server-1a8b02da"
3. Clique em "Edit"
4. APAGUE todo o código atual
5. COPIE todo o conteúdo de /supabase/functions/server/index.tsx
6. COLE no editor
7. Clique em "Deploy"
8. Aguarde ~30 segundos

✅ Pronto!
```

---

### 2️⃣ TESTAR PERFIL (1 minuto)

```
1. Abra o sistema ContratosJardim
2. Login: controleinterno@jardim.ce.gov.br
3. Senha: @Gustavo25
4. Vá em "Administração" → "Gerenciar usuários"
5. Clique na aba "Meu Perfil"

✅ DEVE APARECER: Badge azul "Administrador (CGM)"
❌ NÃO PODE: Badge roxo "Fiscal de Contratos"
```

---

### 3️⃣ TESTAR UPLOAD (2 minutos)

```
1. Ainda em "Meu Perfil"
2. Clique no ícone da câmera (sobre o avatar)
3. Selecione uma foto do seu computador
4. Aguarde upload

✅ DEVE ACONTECER:
   - Mensagem: "Foto atualizada com sucesso!"
   - Foto aparece no perfil
   - Foto aparece no header (canto superior direito)

❌ NÃO PODE:
   - Erro "Value is larger than..."
   - Erro de timeout
   - Foto não aparece
```

---

### 4️⃣ VERIFICAR STORAGE (1 minuto)

```
📍 ACESSE: https://supabase.com/dashboard/project/wdkgxmwnacmzdfcvrofe

1. Clique em "Storage" (menu lateral)
2. Procure bucket "make-1a8b02da-fotos-perfil"
3. Clique para abrir
4. Abra pasta "perfil/"

✅ DEVE TER: Arquivo com nome tipo "abc123-1701619200000.jpg"
```

---

### 5️⃣ VERIFICAR LOGS (1 minuto)

```
📍 ACESSE: https://supabase.com/dashboard/project/wdkgxmwnacmzdfcvrofe

1. Clique em "Edge Functions"
2. Clique em "make-server-1a8b02da"
3. Clique em "Logs"

✅ DEVE TER (após fazer upload):
   📸 [UPLOAD-FOTO] Upload de foto para usuário: ...
   📎 [UPLOAD-FOTO] Arquivo: perfil.jpg (245.67 KB)
   🗑️ [UPLOAD-FOTO] Deletando foto anterior: ...
   ✅ [UPLOAD-FOTO] Foto salva com sucesso: ...
```

---

## 🎯 CHECKLIST RÁPIDO

```
☐ 1. Deploy do backend feito
☐ 2. Health check funcionando
☐ 3. Login funcionando
☐ 4. Perfil mostrando "Administrador (CGM)" (azul)
☐ 5. Upload de foto funcionando
☐ 6. Foto aparecendo no perfil
☐ 7. Foto aparecendo no header
☐ 8. Storage tem a foto
☐ 9. Logs mostram sucesso
```

---

## ❌ SE DER ERRO

### Erro: "Edge Function not found"
```
→ Fazer deploy novamente
→ Aguardar 1 minuto
→ Testar health check
```

### Erro: "Token inválido"
```
→ Fazer logout
→ Fazer login novamente
→ Tentar upload novamente
```

### Erro: "Imagem muito grande"
```
→ Redimensionar foto para menos de 5MB
→ Usar: https://imageresizer.com
→ Ou Paint/Preview
```

### Perfil ainda mostra "Fiscal"
```
→ Ctrl+Shift+Delete (limpar cache)
→ Fazer logout e login
→ Verificar no Dashboard se perfil é "Administrador CGM"
```

---

## 🔗 LINKS IMPORTANTES

### Health Check
```
https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/health
```

### Dashboard
```
https://supabase.com/dashboard/project/wdkgxmwnacmzdfcvrofe
```

### Sistema
```
Seu domínio local ou produção
```

---

## 📱 TESTE COMPLETO EM 5 PASSOS

```
1️⃣ Deploy backend (2 min)
   ↓
2️⃣ Abrir sistema (10 seg)
   ↓
3️⃣ Fazer login (10 seg)
   ↓
4️⃣ Ir em Meu Perfil (10 seg)
   ↓
5️⃣ Upload foto (1 min)
   ↓
✅ FUNCIONANDO!
```

---

## 🎉 SUCESSO

Quando todos os testes passarem:

```
╔════════════════════════════════════════╗
║                                        ║
║   ✅ Sistema 100% Funcional            ║
║                                        ║
║   ✓ Perfil correto                    ║
║   ✓ Upload de fotos                   ║
║   ✓ Storage configurado               ║
║   ✓ Pronto para uso!                  ║
║                                        ║
╚════════════════════════════════════════╝
```

---

## 📚 DOCUMENTAÇÃO DETALHADA

Para mais informações, consulte:

- **`/RESUMO_FINAL_ALTERACOES.md`** - Visão geral
- **`/ATUALIZACAO_UPLOAD_FORMDATA.md`** - Detalhes técnicos
- **`/INSTRUCOES_DEPLOY_ATUALIZADO.md`** - Deploy completo

---

**Tempo total:** ~10 minutos  
**Dificuldade:** Fácil  
**Status:** ✅ Pronto  
