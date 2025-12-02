# 📝 COMO CRIAR O ARQUIVO index.tsx

## Instruções Simples

1. **Copie o arquivo original**:
   - Abra `/supabase/functions/server/index.tsx` no seu editor
   - Selecione todo o conteúdo (Ctrl+A ou Cmd+A)
   - Copie (Ctrl+C ou Cmd+C)

2. **Crie o novo arquivo**:
   - Crie um arquivo em `/supabase/functions/make-server-1a8b02da/index.tsx`
   - Cole o conteúdo copiado (Ctrl+V ou Cmd+V)

3. **Faça a substituição global**:
   - Pressione Ctrl+H (ou Cmd+Option+F no Mac) para abrir Find & Replace
   - **Encontrar**: `"/hello-world`
   - **Substituir por**: `"/make-server-1a8b02da`
   - Clique em "Replace All" ou "Substituir Tudo"
   - Deve encontrar e substituir exatamente **38 ocorrências**

4. **Atualize a mensagem de log**:
   - Vá para a linha ~1973 (perto do final do arquivo)
   - Encontre: `console.log('🚀 Edge Function: server');`
   - Substitua por: `console.log('🚀 Edge Function: make-server-1a8b02da');`

5. **Salve o arquivo** (Ctrl+S ou Cmd+S)

## ✅ Verificação

Seu arquivo deve ter:
- Todas as rotas começando com `/make-server-1a8b02da/` em vez de `/hello-world/`
- Aproximadamente 1980 linhas
- Import do kv_store no topo: `import * as kv from "./kv_store.tsx";`

## 🚀 Depois disso

Execute o deploy:
```bash
supabase functions deploy make-server-1a8b02da
```

E teste:
```bash
curl https://qtbepussaveckryzrhor.supabase.co/functions/v1/make-server-1a8b02da/health
```
