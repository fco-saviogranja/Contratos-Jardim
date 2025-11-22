# 🚀 Guia de Deploy Alternativo - ContratosJardim

## ⚠️ Por Que Este Guia?

O erro 403 no Figma Make é uma **limitação do ambiente**, não do código.  
Este guia mostra como fazer deploy do sistema na **Vercel** de forma simples e **SEM ERROS**.

---

## 🎯 Deploy na Vercel

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
2. Faça login com sua conta GitHub
3. Clique em **"Add New"** → **"Project"**
4. Selecione o repositório `contratos-jardim`
5. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL` = `https://aujwpewyxposnxnlbmje.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1andwZXd5eHBvc254bmxibWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2ODI1OTAsImV4cCI6MjA3OTI1ODU5MH0.mcnitaQJmccF6CHpqnkbxwoOkNAA_AqcljV9EDpa5zQ`
6. Clique em **"Deploy"**

**Pronto!** Em 2 minutos seu sistema estará no ar.

---

## 🎯 Deploy Direto via Vercel CLI (Sem GitHub)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Na pasta do projeto
cd sua-pasta

# Login na Vercel
vercel login

# Deploy
vercel

# Quando pedir variáveis de ambiente, adicione:
# VITE_SUPABASE_URL=https://aujwpewyxposnxnlbmje.supabase.co
# VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📋 Variáveis de Ambiente

### VITE_SUPABASE_URL
```
https://aujwpewyxposnxnlbmje.supabase.co
```

### VITE_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1andwZXd5eHBvc254bmxibWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2ODI1OTAsImV4cCI6MjA3OTI1ODU5MH0.mcnitaQJmccF6CHpqnkbxwoOkNAA_AqcljV9EDpa5zQ
```

---

## ✅ Checklist Pré-Deploy

- [ ] Código exportado do Figma Make
- [ ] Conta criada na Vercel
- [ ] Git instalado (se usar GitHub)
- [ ] Variáveis de ambiente prontas (acima)

---

## 🎉 Após o Deploy

### 1. Acessar o Sistema
- URL: `https://seu-projeto.vercel.app`

### 2. Primeiro Acesso
1. Sistema mostrará tela de **Configuração Inicial**
2. Crie o primeiro administrador:
   - Nome: Administrador CGM
   - Email: admin@jardim.ce.gov.br
   - Senha: admin
   - Função: Administrador

### 3. Testar Funcionalidades
- [ ] Login funciona
- [ ] Dashboard carrega
- [ ] Criar contrato funciona
- [ ] Editar contrato funciona
- [ ] Deletar contrato funciona
- [ ] Filtros funcionam
- [ ] Cores dinâmicas funcionam

---

## 🔧 Solução de Problemas

### Site não carrega
- Verificar variáveis de ambiente na Vercel
- Ver logs do deploy no dashboard

### Erro de autenticação
- Conferir se copiou as variáveis corretas
- Verificar se o projeto Supabase está ativo

### Dados não salvam
- Sistema usa localStorage
- Testar em navegador sem modo anônimo

---

## 🌐 Domínio Personalizado (Opcional)

1. Vá em **Settings** → **Domains** na Vercel
2. Adicione: `contratos.jardim.ce.gov.br`
3. Configure DNS conforme instruções

---

## ✅ Resultado Final

- ✅ Sistema no ar sem erros 403
- ✅ URL pública funcionando
- ✅ SSL/HTTPS automático
- ✅ Deploy automático (via GitHub)
- ✅ Zero custo

---

**Tempo estimado:** 10 minutos  
**Dificuldade:** ⭐⭐☆☆☆ (Fácil)  

---

© 2025 Prefeitura Municipal de Jardim - CE  
Sistema pronto para produção 🚀