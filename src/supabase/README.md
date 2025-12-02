# 🚀 SERVIDOR BACKEND DO CONTRATOSJARDIM

## ✅ Servidor Habilitado

O servidor backend foi configurado para funcionar com o Figma Make usando Edge Functions do Supabase.

## 📡 Configuração da Edge Function

**Nome da função:** `make-server-1a8b02da`
**Endpoint base:** `/make-server-1a8b02da`

### Endpoints disponíveis:

#### 🔐 Autenticação
- `POST /make-server-1a8b02da/auth/setup-admin` - Criar admin inicial
- `POST /make-server-1a8b02da/auth/signup` - Criar novo usuário
- `POST /make-server-1a8b02da/auth/login` - Fazer login

#### 📋 Contratos
- `GET /make-server-1a8b02da/contratos` - Listar todos
- `GET /make-server-1a8b02da/contratos/:id` - Ver detalhes
- `POST /make-server-1a8b02da/contratos` - Criar novo
- `PUT /make-server-1a8b02da/contratos/:id` - Atualizar
- `DELETE /make-server-1a8b02da/contratos/:id` - Deletar

#### 👥 Usuários
- `GET /make-server-1a8b02da/usuarios` - Listar todos
- `GET /make-server-1a8b02da/usuarios/me` - Dados do usuário logado
- `PUT /make-server-1a8b02da/usuarios/:id` - Atualizar usuário
- `DELETE /make-server-1a8b02da/usuarios/:id` - Deletar usuário

#### 📬 Solicitações de Cadastro
- `POST /make-server-1a8b02da/solicitar-cadastro` - Enviar solicitação
- `GET /make-server-1a8b02da/solicitacoes` - Listar (apenas admin)
- `POST /make-server-1a8b02da/solicitacoes/:id/aprovar` - Aprovar (apenas admin)
- `POST /make-server-1a8b02da/solicitacoes/:id/rejeitar` - Rejeitar (apenas admin)

#### 🔔 Alertas
- `GET /make-server-1a8b02da/alertas` - Listar alertas
- `PUT /make-server-1a8b02da/alertas/:id` - Atualizar alerta

#### 🏢 Secretarias
- `GET /make-server-1a8b02da/secretarias` - Listar secretarias
- `POST /make-server-1a8b02da/secretarias` - Criar secretaria
- `PUT /make-server-1a8b02da/secretarias/:id` - Atualizar
- `DELETE /make-server-1a8b02da/secretarias/:id` - Deletar

## 🔧 Configuração

### Variáveis de Ambiente necessárias:

O Supabase fornece automaticamente:
- `SUPABASE_URL` - URL do projeto
- `SUPABASE_ANON_KEY` - Chave anônima pública
- `SUPABASE_SERVICE_ROLE_KEY` - Chave de serviço (admin)

### Arquivo de configuração:

**`/supabase/config.toml`:**
```toml
[functions]
enabled = true

[functions.make-server]
verify_jwt = false
```

**`/supabase/functions/server/config.json`:**
```json
{
  "importMap": "./import_map.json",
  "verify_jwt": false
}
```

## 📦 Armazenamento de Dados

Os dados são salvos no **Supabase KV Store** (Deno KV):
- `user:{id}` - Dados do usuário
- `contrato:{id}` - Dados do contrato
- `solicitacao:{id}` - Solicitações de cadastro
- `alerta:{id}` - Alertas de vencimento
- `secretaria:{id}` - Secretarias municipais

## 🔄 Modo Offline como Fallback

Se o backend estiver indisponível, o sistema automaticamente ativa o **modo offline** usando:
- localStorage do navegador
- Dados mock para desenvolvimento
- Todas as funcionalidades continuam operando

## 🚀 Deploy

O deploy é feito automaticamente pelo Figma Make quando você salva alterações.

Se precisar fazer deploy manual:
```bash
supabase functions deploy make-server-1a8b02da
```

## ✅ Benefícios dessa abordagem:

1. ✅ **Dados persistentes** no Supabase KV
2. ✅ **Autenticação real** com Supabase Auth
3. ✅ **API REST completa** e funcional
4. ✅ **Fallback offline** automático
5. ✅ **Escalável** e pronto para produção

## 🎯 Setup Inicial

Para criar o usuário administrador padrão, faça login e execute no console:

```javascript
criarAdministrador()
```

Isso criará o usuário:
- **Email:** controleinterno@jardim.ce.gov.br
- **Senha:** @Gustavo25
- **Perfil:** Administrador CGM

## 📊 Status do Sistema

Para verificar o status, abra o console (F12) e use:

```javascript
verificarEstadoSistema()
```

---

**Sistema pronto para uso!** 🎉
