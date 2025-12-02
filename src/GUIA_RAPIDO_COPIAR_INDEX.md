# 🚀 GUIA RÁPIDO: Copiar e Configurar index.tsx

## Instruções Passo a Passo

### Opção 1: Cópia Manual (Recomendado)

1. **Abra o arquivo original:**
   - Navegue até `/supabase/functions/server/index.tsx`
   - Selecione todo o conteúdo (Ctrl+A ou Cmd+A)
   - Copie (Ctrl+C ou Cmd+C)

2. **Crie o novo arquivo:**
   - Crie um novo arquivo: `/supabase/functions/make-server-1a8b02da/index.tsx`
   - Cole o conteúdo copiado (Ctrl+V ou Cmd+V)

3. **Faça a substituição global:**
   - Abra a busca e substituição (Ctrl+H ou Cmd+Option+F)
   - **Buscar:** `"/hello-world`
   - **Substituir por:** `"/make-server-1a8b02da`
   - Clique em "Substituir Tudo" (Replace All)
   - ✅ Deve encontrar e substituir **38 ocorrências**

4. **Atualize a mensagem de log (opcional):**
   - Procure por: `console.log('🚀 Edge Function: server');`
   - Substitua por: `console.log('🚀 Edge Function: make-server-1a8b02da');`

5. **Salve o arquivo** (Ctrl+S ou Cmd+S)

### Opção 2: Scripts Automatizados

Execute um dos scripts disponíveis na pasta `/supabase/functions/`:

**Python:**
```bash
python3 supabase/functions/create_index.py
```

**Bash (Linux/Mac):**
```bash
bash supabase/functions/create_index.sh
```

**PowerShell (Windows):**
```powershell
powershell supabase/functions/create_index.ps1
```

## ✅ Verificação

Após copiar, verifique:
- [ ] Arquivo criado em `/supabase/functions/make-server-1a8b02da/index.tsx`
- [ ] Todas as rotas começam com `/make-server-1a8b02da/` (não mais `/hello-world/`)
- [ ] Arquivo tem aproximadamente 1980 linhas
- [ ] Primeira linha: `import { Hono } from "npm:hono";`
- [ ] Última linha: `Deno.serve(app.fetch);`

## 🚀 Deploy

Após criar o arquivo, faça o deploy:

```bash
cd seu-projeto
supabase functions deploy make-server-1a8b02da
```

## 🧪 Teste

Teste se a Edge Function está funcionando:

```bash
curl https://qtbepussaveckryzrhor.supabase.co/functions/v1/make-server-1a8b02da/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "timestamp": "2025-12-02T..."
}
```

## 🎯 Resultado

Após concluir estes passos, o sistema estará completamente funcional com:

- ✅ Gestão de contratos
- ✅ Gestão de usuários
- ✅ **Gestão de secretarias** (NOVA funcionalidade restaurada!)
- ✅ Alertas e prazos
- ✅ Relatórios
- ✅ Configurações completas

Todas as rotas estarão apontando para `/make-server-1a8b02da/` corretamente!
