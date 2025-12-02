# Edge Function: make-server-1a8b02da

## Informações
- **Nome da Função**: make-server-1a8b02da
- **URL Base**: `https://qtbepussaveckryzrhor.supabase.co/functions/v1/make-server-1a8b02da`
- **Tipo**: Servidor Backend Hono com Supabase

## Estrutura de Arquivos
```
/supabase/functions/make-server-1a8b02da/
├── config.json          # Configuração da função
├── import_map.json      # Mapeamento de imports NPM
├── kv_store.tsx         # Interface do KV Store
├── index.tsx            # Código principal do servidor
└── README.md            # Este arquivo
```

## Deploy
Para fazer deploy desta função no Supabase:

```bash
supabase functions deploy make-server-1a8b02da
```

## Rotas Disponíveis

### Autenticação
- `POST /make-server-1a8b02da/auth/setup-admin` - Configurar administrador
- `POST /make-server-1a8b02da/auth/signup` - Cadastrar novo usuário
- `POST /make-server-1a8b02da/auth/login` - Fazer login

### Contratos
- `GET /make-server-1a8b02da/contratos` - Listar todos os contratos
- `POST /make-server-1a8b02da/contratos` - Criar novo contrato
- `GET /make-server-1a8b02da/contratos/:id` - Buscar contrato específico
- `PUT /make-server-1a8b02da/contratos/:id` - Atualizar contrato
- `DELETE /make-server-1a8b02da/contratos/:id` - Excluir contrato
- `DELETE /make-server-1a8b02da/contratos` - Excluir todos os contratos (admin)

### Usuários
- `GET /make-server-1a8b02da/usuarios` - Listar usuários
- `GET /make-server-1a8b02da/usuarios/me` - Dados do usuário atual
- `PUT /make-server-1a8b02da/usuarios/:id` - Atualizar usuário
- `DELETE /make-server-1a8b02da/usuarios/:id` - Excluir usuário
- `PUT /make-server-1a8b02da/usuarios/me/perfil` - Atualizar perfil próprio
- `POST /make-server-1a8b02da/usuarios/me/foto` - Upload de foto de perfil

### Solicitações de Cadastro
- `POST /make-server-1a8b02da/solicitar-cadastro` - Criar solicitação (pública)
- `GET /make-server-1a8b02da/solicitacoes` - Listar solicitações (admin)
- `POST /make-server-1a8b02da/solicitacoes/:id/aprovar` - Aprovar solicitação (admin)
- `POST /make-server-1a8b02da/solicitacoes/:id/rejeitar` - Rejeitar solicitação (admin)

### Secretarias
- `GET /make-server-1a8b02da/secretarias` - Listar secretarias
- `POST /make-server-1a8b02da/secretarias` - Criar secretaria
- `PUT /make-server-1a8b02da/secretarias/:id` - Atualizar secretaria
- `DELETE /make-server-1a8b02da/secretarias/:id` - Excluir secretaria

### Alertas
- `GET /make-server-1a8b02da/alertas` - Listar alertas
- `POST /make-server-1a8b02da/alertas` - Criar alerta
- `PUT /make-server-1a8b02da/alertas/:id` - Atualizar alerta

### Dashboard
- `GET /make-server-1a8b02da/dashboard/stats` - Estatísticas do sistema

### Administração
- `POST /make-server-1a8b02da/admin/limpar-usuarios` - Limpar usuários (manter apenas admin)
- `POST /make-server-1a8b02da/reset-all-data` - Resetar sistema completamente

### Debug (Desenvolvimento)
- `GET /make-server-1a8b02da/debug/list-auth-users` - Listar usuários do Auth
- `POST /make-server-1a8b02da/debug/reset-password` - Resetar senha
- `POST /make-server-1a8b02da/debug/check-user` - Verificar usuário
- `POST /make-server-1a8b02da/debug/fix-user` - Corrigir usuário
- `POST /make-server-1a8b02da/debug/fix-all-users` - Corrigir todos os usuários
- `POST /make-server-1a8b02da/debug/delete-user` - Excluir usuário
- `POST /make-server-1a8b02da/debug/change-profile` - Alterar perfil
- `POST /make-server-1a8b02da/debug/test-login` - Testar login

## Credenciais Padrão
- **Email**: controleinterno@jardim.ce.gov.br
- **Senha**: @Gustavo25
- **Nome**: Gustavo Barros
- **Perfil**: Administrador CGM
- **Secretaria**: CGM - Controladoria Geral
