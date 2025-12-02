# 🚀 INSTRUÇÕES DE DEPLOY MANUAL

## ⚠️ IMPORTANTE

A Edge Function no Supabase foi deployada com o nome `make-server-1a8b02da`, mas o código local precisa ser atualizado para refletir isso.

## ✅ O QUE JÁ FOI FEITO

1. ✅ Criada a pasta `/supabase/functions/make-server-1a8b02da/`
2. ✅ Criados os arquivos:
   - `config.json`
   - `import_map.json`
   - `kv_store.tsx`
   - `README.md`
3. ✅ Atualizado `/utils/api.tsx` para usar a URL correta: `https://qtbepussaveckryzrhor.supabase.co/functions/v1/make-server-1a8b02da`

## 📝 O QUE FALTA FAZER

### Criar o arquivo `index.tsx`

O arquivo `/supabase/functions/server/index.tsx` precisa ser copiado para `/supabase/functions/make-server-1a8b02da/index.tsx` com as seguintes substituições:

**Substituir (38 ocorrências):**
```
"/hello-world"
```

**Por:**
```
"/make-server-1a8b02da"
```

### Como fazer isso:

#### Opção 1: Usando Editor de Código
1. Abra `/supabase/functions/server/index.tsx`
2. Copie todo o conteúdo
3. Crie `/supabase/functions/make-server-1a8b02da/index.tsx`
4. Cole o conteúdo
5. Use "Find & Replace" (Ctrl+H ou Cmd+H):
   - Find: `"/hello-world`
   - Replace: `"/make-server-1a8b02da`
   - Replace All
6. Salve o arquivo

#### Opção 2: Usando Terminal (Linux/Mac)
```bash
# Copiar e substituir automaticamente
sed 's|"/hello-world|"/make-server-1a8b02da|g' /supabase/functions/server/index.tsx > /supabase/functions/make-server-1a8b02da/index.tsx
```

#### Opção 3: Usando PowerShell (Windows)
```powershell
(Get-Content '/supabase/functions/server/index.tsx') -replace '"/hello-world"', '"/make-server-1a8b02da"' | Set-Content '/supabase/functions/make-server-1a8b02da/index.tsx'
```

### Atualizar a mensagem de log no final do arquivo

No final do arquivo `/supabase/functions/make-server-1a8b02da/index.tsx`, na linha ~1973, altere:

```typescript
console.log('🚀 Edge Function: server');
```

Para:

```typescript
console.log('🚀 Edge Function: make-server-1a8b02da');
```

## 🔄 PRÓXIMOS PASSOS

Depois de criar o arquivo `index.tsx`:

1. **Teste localmente** (se possível):
   ```bash
   supabase functions serve make-server-1a8b02da
   ```

2. **Faça o deploy**:
   ```bash
   supabase functions deploy make-server-1a8b02da
   ```

3. **Teste o endpoint**:
   ```bash
   curl https://qtbepussaveckryzrhor.supabase.co/functions/v1/make-server-1a8b02da/health
   ```

   Deve retornar:
   ```json
   {"status":"ok","timestamp":"2025-12-02T..."}
   ```

## ✅ VERIFICAÇÃO FINAL

Depois do deploy, teste o login no frontend:
1. Abra o sistema ContratosJardim
2. Vá para a página de Login
3. Use as credenciais:
   - **Email**: controleinterno@jardim.ce.gov.br
   - **Senha**: @Gustavo25
4. Se o login funcionar, está tudo correto! 🎉

## 🗑️ LIMPEZA (OPCIONAL)

Depois de confirmar que tudo funciona, você pode deletar a pasta antiga:
```bash
rm -rf /supabase/functions/server/
```

Ou no Windows:
```powershell
Remove-Item -Recurse -Force '/supabase/functions/server/'
```

## 📞 SUPORTE

Se encontrar problemas:
1. Verifique os logs do Supabase Dashboard
2. Confirme que as variáveis de ambiente estão configuradas
3. Teste cada endpoint individualmente
