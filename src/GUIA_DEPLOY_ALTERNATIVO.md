# 🚀 Guia de Deploy Alternativo - ContratosJardim

## ⚠️ Por Que Este Guia?

O erro 403 no Figma Make é uma **limitação do ambiente**, não do código.  
Este guia mostra como fazer deploy do sistema de forma simples e **SEM ERROS**.

---

## 🎯 Opção Recomendada: Vercel (Mais Simples)

### Passo 1: Exportar o Código
1. No Figma Make, clique em **"Export"** ou **"Download"**
2. Salve o código em uma pasta local

### Passo 2: Criar Repositório Git
```bash
cd sua-pasta
git init
git add .
git commit -m "Initial commit - ContratosJardim"
```

### Passo 3: Subir para GitHub
1. Crie um repositório no GitHub: https://github.com/new
2. Nome: `contratos-jardim`
3. Visibilidade: Pública ou Privada

```bash
git remote add origin https://github.com/seu-usuario/contratos-jardim.git
git branch -M main
git push -u origin main
```

### Passo 4: Deploy na Vercel
1. Acesse: https://vercel.com
2. Clique em **"New Project"**
3. Conecte sua conta GitHub
4. Selecione o repositório `contratos-jardim`
5. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL` = (copie do arquivo `/utils/supabase/info.tsx`)
   - `VITE_SUPABASE_ANON_KEY` = (copie do arquivo `/utils/supabase/info.tsx`)
6. Clique em **"Deploy"**

**Pronto!** Em 2 minutos seu sistema estará no ar.

---

## 🎯 Opção Alternativa: Netlify

### Passo 1-3: Mesmos da Vercel (Exportar + Git + GitHub)

### Passo 4: Deploy na Netlify
1. Acesse: https://netlify.com
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Conecte sua conta GitHub
4. Selecione o repositório `contratos-jardim`
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Adicione variáveis de ambiente:
   - `VITE_SUPABASE_URL` = (do arquivo info.tsx)
   - `VITE_SUPABASE_ANON_KEY` = (do arquivo info.tsx)
7. Clique em **"Deploy"**

**Pronto!** Sistema no ar sem erros.

---

## 🎯 Opção Sem GitHub: Deploy Direto

### Via Vercel CLI
```bash
# Instalar Vercel CLI
npm install -g vercel

# Na pasta do projeto
cd sua-pasta

# Login na Vercel
vercel login

# Deploy
vercel

# Seguir prompts e adicionar variáveis de ambiente
```

### Via Netlify CLI
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Na pasta do projeto
cd sua-pasta

# Login na Netlify
netlify login

# Deploy
netlify deploy --prod

# Seguir prompts e adicionar variáveis de ambiente
```

---

## 📋 Variáveis de Ambiente Necessárias

Você precisa configurar 2 variáveis de ambiente:

### 1. VITE_SUPABASE_URL
**Onde encontrar:**
- Arquivo: `/utils/supabase/info.tsx`
- Linha que diz: `export const projectId = "..."`
- Formato: `https://[projectId].supabase.co`

**Exemplo:**
```
VITE_SUPABASE_URL=https://nlzjw4g8hlsarmtcpfmerj.supabase.co
```

### 2. VITE_SUPABASE_ANON_KEY
**Onde encontrar:**
- Arquivo: `/utils/supabase/info.tsx`
- Linha que diz: `export const publicAnonKey = "..."`
- Copiar o valor completo

**Exemplo:**
```
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ✅ Checklist Pré-Deploy

Antes de fazer deploy, verifique:

- [ ] Código exportado do Figma Make
- [ ] Variáveis de ambiente copiadas do arquivo `info.tsx`
- [ ] Conta criada na Vercel ou Netlify
- [ ] Git instalado (se usar GitHub)

---

## 🎉 Após o Deploy

### 1. Acessar o Sistema
- Vercel: `https://seu-projeto.vercel.app`
- Netlify: `https://seu-projeto.netlify.app`

### 2. Primeiro Acesso
1. Acesse a URL do deploy
2. Sistema mostrará tela de **Configuração Inicial**
3. Crie o primeiro administrador:
   - Nome: Administrador CGM
   - Email: admin@jardim.ce.gov.br (ou qualquer)
   - Senha: admin (ou sua preferência)
   - Função: Administrador

### 3. Testar Funcionalidades
- [ ] Login com admin/admin funciona
- [ ] Dashboard carrega corretamente
- [ ] Criar novo contrato funciona
- [ ] Editar contrato funciona
- [ ] Deletar contrato funciona
- [ ] Filtros funcionam
- [ ] Busca funciona
- [ ] Cores dinâmicas funcionam (Configurações)
- [ ] Criar novo usuário funciona (Admin)

---

## 🔧 Solução de Problemas

### Problema: Site não carrega
**Solução:**
- Verificar se as variáveis de ambiente estão corretas
- Conferir se o build foi bem-sucedido
- Ver logs do deploy no dashboard Vercel/Netlify

### Problema: Erro de autenticação
**Solução:**
- Verificar `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- Conferir se o projeto Supabase está ativo
- Ver se Auth está habilitado no Supabase

### Problema: Dados não salvam
**Solução:**
- Sistema usa localStorage
- Testar em navegador sem modo anônimo
- Verificar se localStorage está habilitado no navegador

---

## 🌐 Domínio Personalizado (Opcional)

### Na Vercel:
1. Vá em **Settings** → **Domains**
2. Adicione seu domínio: `contratos.jardim.ce.gov.br`
3. Siga instruções para configurar DNS

### Na Netlify:
1. Vá em **Domain settings** → **Add custom domain**
2. Adicione seu domínio: `contratos.jardim.ce.gov.br`
3. Siga instruções para configurar DNS

---

## 📊 Comparação: Figma Make vs. Deploy Externo

| Aspecto | Figma Make | Vercel/Netlify |
|---------|-----------|----------------|
| Erro 403 | ❌ Sim | ✅ Não |
| Velocidade | 🟡 Média | ✅ Rápida |
| Domínio próprio | 🟡 Limitado | ✅ Fácil |
| URL pública | 🟡 Interna | ✅ Pública |
| Custo | Gratuito | Gratuito |
| Facilidade | 🟡 Com erro | ✅ Simples |

---

## 💡 Dicas Importantes

1. **Sempre use HTTPS**
   - Vercel e Netlify fornecem SSL grátis
   - Necessário para Supabase Auth funcionar

2. **Mantenha variáveis privadas**
   - Não commite `info.tsx` no GitHub público
   - Use variáveis de ambiente sempre

3. **Configure redirects**
   - Ambos plataformas suportam SPA routing
   - Geralmente automático para React/Vite

4. **Monitore uso**
   - Vercel: 100GB bandwidth/mês grátis
   - Netlify: 100GB bandwidth/mês grátis
   - Suficiente para uso municipal

---

## 🆘 Precisa de Ajuda?

### Documentação Oficial:
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- Supabase: https://supabase.com/docs

### Recursos:
- Tutorial Vercel: https://vercel.com/docs/getting-started-with-vercel
- Tutorial Netlify: https://docs.netlify.com/get-started/
- Discord Supabase: https://discord.supabase.com

---

## ✅ Resultado Final

Após seguir este guia, você terá:

- ✅ Sistema no ar sem erros
- ✅ URL pública funcionando
- ✅ SSL/HTTPS automático
- ✅ Deploy automático (ao fazer push no GitHub)
- ✅ Todas as funcionalidades operacionais
- ✅ Zero custo

---

**Tempo estimado:** 10-15 minutos  
**Dificuldade:** ⭐⭐☆☆☆ (Fácil)  
**Resultado:** 🎉 Sistema funcionando perfeitamente!

---

© 2025 Prefeitura Municipal de Jardim - CE  
Sistema pronto para produção 🚀
