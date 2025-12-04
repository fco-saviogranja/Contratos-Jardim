# ✅ CHECKLIST DE DEPLOY - CONTRATOSJARDIM

Use este checklist para garantir que o deploy seja feito corretamente.

---

## 📋 PRÉ-DEPLOY

- [ ] **Código backend atualizado**
  - Arquivo: `/supabase/functions/server/index.tsx`
  - Verificar se contém `initializeBucket()` na linha 38
  - Verificar se contém `BUCKET_NAME = 'make-1a8b02da-fotos-perfil'`
  - Verificar se rota `/usuarios/me/foto` usa Storage (não base64)

- [ ] **Acesso ao Supabase**
  - Login em: https://supabase.com/dashboard
  - Projeto: `wdkgxmwnacmzdfcvrofe`
  - Acesso confirmado

---

## 🚀 DEPLOY DA EDGE FUNCTION

### Opção 1: Via Dashboard (Recomendado)

- [ ] **Acessar Dashboard**
  - URL: https://supabase.com/dashboard/project/wdkgxmwnacmzdfcvrofe
  - Menu: "Edge Functions"

- [ ] **Localizar função**
  - Procurar: `make-server-1a8b02da`
  - Se não existir, criar nova função

- [ ] **Fazer deploy**
  - Copiar TODO o conteúdo de `/supabase/functions/server/index.tsx`
  - Colar no editor
  - Clicar em "Deploy"
  - Aguardar conclusão (10-30 segundos)

- [ ] **Verificar sucesso**
  - Mensagem de sucesso exibida
  - Status da função: "Active"

### Opção 2: Via CLI

- [ ] **Instalar CLI**
  ```bash
  npm install -g supabase
  ```

- [ ] **Login**
  ```bash
  supabase login
  ```

- [ ] **Link projeto**
  ```bash
  supabase link --project-ref wdkgxmwnacmzdfcvrofe
  ```

- [ ] **Deploy**
  ```bash
  supabase functions deploy make-server-1a8b02da --no-verify-jwt
  ```

- [ ] **Verificar**
  ```bash
  supabase functions list
  ```

---

## 🧪 TESTES PÓS-DEPLOY

### 1. Health Check

- [ ] **Testar endpoint**
  - Abrir navegador
  - URL: `https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/health`
  - Resposta esperada:
    ```json
    {
      "status": "ok",
      "service": "ContratosJardim Backend",
      "version": "2.0.0"
    }
    ```

### 2. Verificar Bucket

- [ ] **Acessar Storage**
  - Dashboard → "Storage"
  - Procurar bucket: `make-1a8b02da-fotos-perfil`
  - Se não existir, aguardar 30 segundos e recarregar

- [ ] **Verificar configurações**
  - Tipo: Privado ✅
  - Limite: 5MB ✅

### 3. Setup Administrador

- [ ] **Criar admin principal**
  - Opção A: Via Diagnóstico Avançado no sistema
  - Opção B: POST para `/auth/setup-admin`
  
- [ ] **Verificar criação**
  - Email: `controleinterno@jardim.ce.gov.br`
  - Senha: `@Gustavo25`

### 4. Testar Login

- [ ] **Fazer login**
  - Abrir sistema
  - Email: `controleinterno@jardim.ce.gov.br`
  - Senha: `@Gustavo25`
  - Login bem-sucedido ✅

### 5. Testar Upload de Foto

- [ ] **Ir para perfil**
  - Clicar no avatar/nome do usuário
  - Ir para "Meu Perfil"

- [ ] **Fazer upload**
  - Selecionar uma foto (JPG, PNG)
  - Tamanho: até 5MB
  - Clicar em "Salvar"

- [ ] **Verificar sucesso**
  - Foto exibida no perfil ✅
  - Sem erro de "10.240 characters" ✅
  - URL da foto começa com `https://...supabase.co/storage/...` ✅

- [ ] **Verificar Storage**
  - Dashboard → Storage → `make-1a8b02da-fotos-perfil` → `perfil/`
  - Ver arquivo da foto ✅

### 6. Testar Segunda Foto (Limpeza)

- [ ] **Fazer upload de nova foto**
  - Selecionar foto diferente
  - Clicar em "Salvar"

- [ ] **Verificar limpeza**
  - Nova foto exibida ✅
  - Foto antiga deletada do Storage ✅
  - Apenas 1 foto por usuário no Storage ✅

---

## 📊 MONITORAMENTO

### Logs do Backend

- [ ] **Acessar logs**
  - Dashboard → Edge Functions → `make-server-1a8b02da` → "Logs"

- [ ] **Verificar mensagens**
  - `✅ [STORAGE] Bucket já existe` ou `✅ [STORAGE] Bucket criado`
  - `📸 [UPLOAD-FOTO] Upload de foto para usuário: ...`
  - `🗑️ [UPLOAD-FOTO] Deletando foto anterior: ...`
  - `✅ [UPLOAD-FOTO] Foto salva com sucesso: ...`

### Diagnóstico Avançado

- [ ] **Executar diagnóstico**
  - Ir para "Diagnóstico Avançado"
  - Executar todos os testes
  - Verificar status: 38/38 rotas funcionando ✅

---

## 🔧 TROUBLESHOOTING

### ❌ Health check não funciona

**Possíveis causas:**
- [ ] Edge Function não deployada
- [ ] Nome da função incorreto
- [ ] URL incorreta

**Solução:**
1. Refazer deploy
2. Verificar nome exato: `make-server-1a8b02da`
3. Aguardar 1 minuto após deploy

---

### ❌ Bucket não aparece

**Possíveis causas:**
- [ ] Edge Function não foi executada ainda
- [ ] Erro na inicialização

**Solução:**
1. Fazer qualquer requisição para a Edge Function (health check)
2. Aguardar 30 segundos
3. Recarregar página do Storage
4. Ver logs para mensagens de erro

---

### ❌ Upload de foto falha

**Possíveis causas:**
- [ ] Bucket não existe
- [ ] Foto muito grande (>5MB)
- [ ] Token expirado

**Solução:**
1. Verificar se bucket existe
2. Redimensionar foto para <5MB
3. Fazer logout e login novamente
4. Verificar logs do backend

---

### ❌ Foto antiga não é deletada

**Possíveis causas:**
- [ ] Código antigo ainda deployado
- [ ] Erro de permissão

**Solução:**
1. Verificar se código novo está deployado
2. Ver logs para mensagens de erro
3. Verificar permissões do bucket

---

## 📝 NOTAS IMPORTANTES

### Credenciais Padrão
```
Email: controleinterno@jardim.ce.gov.br
Senha: @Gustavo25
Perfil: Administrador CGM
```

### URLs Importantes
```
Dashboard: https://supabase.com/dashboard/project/wdkgxmwnacmzdfcvrofe
Health Check: https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/health
Edge Function: make-server-1a8b02da
Bucket: make-1a8b02da-fotos-perfil
```

### Limites
```
Foto máxima: 5MB
URL assinada válida por: 1 ano
Formato: JPG, PNG
```

---

## ✅ CONCLUSÃO

Quando todos os itens acima estiverem marcados ✅, o sistema estará:

- ✅ Deployado corretamente
- ✅ Backend funcionando
- ✅ Storage configurado
- ✅ Upload de fotos operacional
- ✅ Limpeza automática ativa
- ✅ Pronto para uso em produção!

---

## 🎉 PRÓXIMOS PASSOS

Após deploy bem-sucedido:

1. Criar usuários adicionais via "Gerenciar Usuários"
2. Cadastrar secretarias
3. Começar a cadastrar contratos
4. Configurar alertas automáticos
5. Treinar equipe

---

**Data do Checklist:** 03/12/2024  
**Sistema:** ContratosJardim  
**Versão:** 2.0.0  
**Status:** Pronto para deploy  
