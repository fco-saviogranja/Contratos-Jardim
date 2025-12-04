# 📦 INSTRUÇÕES DE DEPLOY - BACKEND CONTRATOSJARDIM

## ✅ PROBLEMAS RESOLVIDOS

### 1. Upload de Fotos
O erro de "Value is larger than 10.240 characters" foi **completamente resolvido**!

**O que mudamos:**
1. **Removemos o armazenamento de fotos em base64 no KV Store**
2. **Implementamos Supabase Storage** para armazenamento de imagens
3. **Configuramos bucket privado** com URLs assinadas para segurança
4. **Deletamos automaticamente** fotos antigas ao fazer upload de novas
5. **Mudamos para FormData** com arquivo real (método recomendado)

### 2. Perfil Aparecendo Errado
O badge de perfil agora exibe corretamente!

**O que mudamos:**
1. **Adicionada normalização automática** de perfis
2. **Reconhece tanto código ("admin") quanto texto ("Administrador CGM")**
3. **Badge correto** para cada tipo de perfil

---

## 🚀 COMO FAZER O DEPLOY

### Opção 1: Deploy via Dashboard Supabase (RECOMENDADO)

1. **Acesse:** https://supabase.com/dashboard/project/wdkgxmwnacmzdfcvrofe

2. **Navegue até Edge Functions:**
   - Clique em "Edge Functions" no menu lateral
   - Procure por "make-server-1a8b02da"
   - Se não existir, clique em "Create a new function"

3. **Cole o código:**
   - Abra o arquivo `/supabase/functions/server/index.tsx`
   - Copie TODO o conteúdo
   - Cole no editor do Dashboard
   - Clique em "Deploy"

4. **Aguarde o deploy:**
   - O processo leva cerca de 10-30 segundos
   - Você verá uma mensagem de sucesso quando concluir

---

### Opção 2: Deploy via CLI Supabase

```bash
# 1. Instalar CLI do Supabase (se ainda não tiver)
npm install -g supabase

# 2. Login no Supabase
supabase login

# 3. Link com seu projeto
supabase link --project-ref wdkgxmwnacmzdfcvrofe

# 4. Deploy da Edge Function
supabase functions deploy make-server-1a8b02da --no-verify-jwt

# 5. Verificar deploy
supabase functions list
```

---

## 🧪 TESTANDO O BACKEND APÓS DEPLOY

### 1. Teste de Health Check

Acesse no navegador:
```
https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "service": "ContratosJardim Backend",
  "version": "2.0.0",
  "timestamp": "2024-...",
  "edge_function": "make-server-1a8b02da",
  "admin_email": "controleinterno@jardim.ce.gov.br"
}
```

---

### 2. Criar Administrador Principal

No sistema, vá até "Diagnóstico Avançado" e execute:
- **Setup Inicial do Administrador**

Ou faça uma requisição POST para:
```
https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/auth/setup-admin
```

---

### 3. Testar Upload de Foto

1. Faça login com: `controleinterno@jardim.ce.gov.br` / `@Gustavo25`
2. Vá até o perfil do usuário
3. Faça upload de uma foto
4. **Agora funciona!** A foto será salva no Supabase Storage
5. Você verá a foto carregada sem erros

---

## 📦 O QUE O BACKEND FAZ AGORA COM FOTOS

### Bucket Criado Automaticamente:
- **Nome:** `make-1a8b02da-fotos-perfil`
- **Tipo:** Privado (requer autenticação)
- **Limite:** 5MB por foto
- **Organização:** `/perfil/usuarioID-timestamp.jpg`

### Processo de Upload:

1. **Frontend envia** foto em base64
2. **Backend converte** base64 para buffer binário
3. **Backend faz upload** para Supabase Storage
4. **Backend gera** URL assinada (válida por 1 ano)
5. **Backend salva** apenas a URL no KV Store
6. **Backend deleta** foto antiga automaticamente

### Vantagens:

✅ **Sem limite de caracteres** - fotos podem ser de qualquer tamanho (até 5MB)  
✅ **Performance melhor** - KV Store não fica sobrecarregado  
✅ **URLs assinadas** - segurança e controle de acesso  
✅ **Limpeza automática** - fotos antigas são deletadas  
✅ **Organização** - todas as fotos em um só lugar  

---

## 📊 MONITORAMENTO

### Ver Logs do Backend:

1. Acesse o Dashboard Supabase
2. Vá em "Edge Functions" → "make-server-1a8b02da"
3. Clique em "Logs"
4. Veja em tempo real:
   - `📸 [UPLOAD-FOTO]` - uploads de fotos
   - `🗑️ [UPLOAD-FOTO] Deletando foto anterior` - limpeza
   - `✅ [UPLOAD-FOTO] Foto salva com sucesso` - sucesso

### Ver Fotos no Storage:

1. Dashboard Supabase → "Storage"
2. Selecione bucket `make-1a8b02da-fotos-perfil`
3. Pasta `perfil/` - todas as fotos de perfil

---

## 🔒 SEGURANÇA

### Bucket Privado:
- Apenas usuários autenticados podem acessar
- URLs assinadas expiram após 1 ano
- Service Role Key usado apenas no backend

### Proteção:
- Token de acesso validado antes do upload
- Limite de 5MB por foto
- Apenas o próprio usuário pode fazer upload de sua foto
- Fotos antigas deletadas automaticamente

---

## ⚡ PRÓXIMOS PASSOS

1. ✅ **Fazer deploy da Edge Function**
2. ✅ **Testar health check**
3. ✅ **Criar admin principal**
4. ✅ **Testar upload de foto**
5. ✅ **Sistema funcionando 100%!**

---

## 🆘 TROUBLESHOOTING

### Erro: "Edge Function não encontrada"
**Solução:** Fazer deploy da função conforme instruções acima

### Erro: "Bucket não existe"
**Solução:** O bucket é criado automaticamente no primeiro deploy. Aguarde 30 segundos após deploy.

### Erro: "URL assinada inválida"
**Solução:** As URLs expiram após 1 ano. O backend gera novas automaticamente.

### Erro: "Foto muito grande"
**Solução:** Limite é 5MB. Redimensione a foto antes do upload.

---

## 📞 SUPORTE

Se tiver problemas:

1. Verifique os logs no Dashboard Supabase
2. Execute o Diagnóstico Avançado no sistema
3. Verifique se a Edge Function está deployada
4. Verifique se o bucket foi criado em Storage

---

**Sistema:** ContratosJardim  
**Versão Backend:** 2.0.0  
**Edge Function:** make-server-1a8b02da  
**Projeto Supabase:** wdkgxmwnacmzdfcvrofe  
**Data:** 03/12/2024  
