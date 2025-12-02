# 🚀 SERVIDOR BACKEND DO CONTRATOSJARDIM

## ✅ Servidor Habilitado

O servidor backend foi configurado para funcionar com o Figma Make usando Edge Functions do Supabase.

## 📡 Configuração da Edge Function

**Nome da função:** `hello-world`
**Endpoint base:** `/hello-world`

### Endpoints disponíveis:

#### 🔐 Autenticação
- `POST /hello-world/auth/setup-admin` - Criar admin inicial
- `POST /hello-world/auth/signup` - Criar novo usuário
- `POST /hello-world/auth/login` - Fazer login

#### 📋 Contratos
- `GET /hello-world/contratos` - Listar todos
- `GET /hello-world/contratos/:id` - Ver detalhes
- `POST /hello-world/contratos` - Criar novo
- `PUT /hello-world/contratos/:id` - Atualizar
- `DELETE /hello-world/contratos/:id` - Deletar

#### 👥 Usuários
- `GET /hello-world/usuarios` - Listar todos
- `GET /hello-world/usuarios/me` - Dados do usuário logado
- `PUT /hello-world/usuarios/:id` - Atualizar usuário
- `DELETE /hello-world/usuarios/:id` - Deletar usuário

#### 📬 Solicitações de Cadastro
- `POST /hello-world/solicitar-cadastro` - Enviar solicitação
- `GET /hello-world/solicitacoes` - Listar (apenas admin)
- `POST /hello-world/solicitacoes/:id/aprovar` - Aprovar (apenas admin)
- `POST /hello-world/solicitacoes/:id/rejeitar` - Rejeitar (apenas admin)

#### 🔔 Alertas
- `GET /hello-world/alertas` - Listar alertas
- `PUT /hello-world/alertas/:id` - Atualizar alerta

#### 🏢 Secretarias
- `GET /hello-world/secretarias` - Listar secretarias
- `POST /hello-world/secretarias` - Criar secretaria
- `PUT /hello-world/secretarias/:id` - Atualizar
- `DELETE /hello-world/secretarias/:id` - Deletar

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
supabase functions deploy hello-world
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
