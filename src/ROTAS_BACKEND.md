# 📡 ROTAS DO BACKEND - ContratosJardim

Documentação completa das rotas da API Backend (Edge Function Supabase).

---

## 🔗 **BASE URL**

```
https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da
```

---

## 🔐 **AUTENTICAÇÃO**

Todas as rotas (exceto health check e setup-admin) requerem autenticação via Bearer Token no header:

```http
Authorization: Bearer {access_token}
```

Para rotas públicas, usar o `publicAnonKey`:

```http
Authorization: Bearer {publicAnonKey}
```

---

## 📋 **ÍNDICE DE ROTAS**

- [Health Check](#health-check)
- [Autenticação](#autenticação)
- [Alertas](#alertas)
- [Dashboard](#dashboard)
- [Admin/Debug](#admindebug)

---

## 🏥 **HEALTH CHECK**

### `GET /health`

Verifica o status do servidor.

**Autenticação:** Pública (opcional)

**Resposta:**

```json
{
  "status": "ok",
  "service": "ContratosJardim Backend",
  "version": "2.0.0",
  "timestamp": "2024-12-03T10:30:00.000Z",
  "edge_function": "make-server-1a8b02da",
  "admin_email": "controleinterno@jardim.ce.gov.br"
}
```

---

## 🔐 **AUTENTICAÇÃO**

### `POST /auth/setup-admin`

Cria ou atualiza o administrador principal do sistema.

**Autenticação:** Pública (usa publicAnonKey)

**Resposta de Sucesso:**

```json
{
  "success": true,
  "message": "Administrador configurado com sucesso!",
  "credentials": {
    "email": "controleinterno@jardim.ce.gov.br",
    "password": "@Gustavo25"
  },
  "user": {
    "id": "uuid-do-usuario",
    "nome": "Controle Interno CGM",
    "email": "controleinterno@jardim.ce.gov.br",
    "perfil": "Administrador CGM",
    "secretaria": "Controladoria Geral do Município"
  }
}
```

---

### `POST /auth/login`

Faz login no sistema.

**Autenticação:** Pública (usa publicAnonKey)

**Body:**

```json
{
  "email": "controleinterno@jardim.ce.gov.br",
  "password": "@Gustavo25"
}
```

**Resposta de Sucesso:**

```json
{
  "success": true,
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-do-usuario",
    "email": "controleinterno@jardim.ce.gov.br",
    "nome": "Controle Interno CGM",
    "perfil": "Administrador CGM",
    "secretaria": "Controladoria Geral do Município"
  }
}
```

**Resposta de Erro (401):**

```json
{
  "error": "Credenciais inválidas. Verifique seu e-mail e senha.",
  "hint": "Se você ainda não tem uma conta, execute o Setup Inicial."
}
```

---

### `POST /auth/signup`

Cria um novo usuário no sistema.

**Autenticação:** Requer token de admin

**Body:**

```json
{
  "email": "usuario@exemplo.com",
  "password": "SenhaForte123!",
  "nome": "Nome do Usuário",
  "perfil": "gestor",
  "secretaria": "Secretaria Municipal de Educação"
}
```

**Resposta de Sucesso:**

```json
{
  "success": true,
  "user": {
    "id": "uuid-do-usuario",
    "email": "usuario@exemplo.com",
    "nome": "Nome do Usuário",
    "perfil": "gestor",
    "secretaria": "Secretaria Municipal de Educação"
  }
}
```

---

## 🔔 **ALERTAS**

### `GET /alertas`

Lista todos os alertas do sistema.

**Autenticação:** Requer token válido

**Resposta:**

```json
{
  "success": true,
  "alertas": [
    {
      "id": "alerta-001",
      "tipo": "vencimento",
      "prioridade": "critica",
      "contratoId": "contrato-004",
      "titulo": "Contrato próximo ao vencimento",
      "mensagem": "O contrato 015/2023 vence em 15 dias",
      "status": "nao_lido",
      "dataVencimento": "2024-12-15",
      "destinatarios": ["admin-001", "gestor-001"],
      "criadoEm": "2024-11-25T08:00:00Z",
      "criadoPor": null,
      "atualizadoEm": "2024-11-25T08:00:00Z"
    }
  ],
  "total": 3,
  "timestamp": "2024-12-03T10:30:00.000Z"
}
```

**Tipos de Alerta:**

- `vencimento` - Contrato próximo ao vencimento
- `prazo` - Prazo de renovação
- `documento` - Documentos pendentes
- `irregular` - Irregularidades detectadas
- `outro` - Outros tipos

**Prioridades:**

- `critica` - Requer ação imediata
- `alta` - Importante
- `media` - Normal
- `baixa` - Informativo

**Status:**

- `nao_lido` - Alerta novo
- `lido` - Visualizado
- `resolvido` - Já tratado

---

### `POST /alertas`

Cria um novo alerta.

**Autenticação:** Requer token válido

**Body:**

```json
{
  "tipo": "vencimento",
  "prioridade": "critica",
  "contratoId": "contrato-001",
  "titulo": "Contrato vencendo em breve",
  "mensagem": "O contrato 001/2024 vence em 10 dias",
  "dataVencimento": "2024-12-13",
  "destinatarios": ["admin-001", "gestor-002"]
}
```

**Campos Obrigatórios:**

- `tipo` (string)
- `titulo` (string)
- `mensagem` (string)

**Campos Opcionais:**

- `prioridade` (string) - Padrão: "media"
- `contratoId` (string)
- `status` (string) - Padrão: "nao_lido"
- `dataVencimento` (string)
- `destinatarios` (array)
- `criadoPor` (string)

**Resposta de Sucesso:**

```json
{
  "success": true,
  "alerta": {
    "id": "alerta-1733226600000-abc123",
    "tipo": "vencimento",
    "prioridade": "critica",
    "contratoId": "contrato-001",
    "titulo": "Contrato vencendo em breve",
    "mensagem": "O contrato 001/2024 vence em 10 dias",
    "status": "nao_lido",
    "dataVencimento": "2024-12-13",
    "destinatarios": ["admin-001", "gestor-002"],
    "criadoEm": "2024-12-03T10:30:00.000Z",
    "criadoPor": null,
    "atualizadoEm": "2024-12-03T10:30:00.000Z"
  },
  "message": "Alerta criado com sucesso"
}
```

**Resposta de Erro (400):**

```json
{
  "success": false,
  "error": "Campos obrigatórios: tipo, titulo, mensagem"
}
```

---

### `PUT /alertas/:id`

Atualiza um alerta existente (ex: marcar como lido).

**Autenticação:** Requer token válido

**Parâmetros de URL:**

- `:id` - ID do alerta

**Body (exemplo para marcar como lido):**

```json
{
  "status": "lido"
}
```

**Resposta de Sucesso:**

```json
{
  "success": true,
  "alerta": {
    "id": "alerta-001",
    "tipo": "vencimento",
    "prioridade": "critica",
    "status": "lido",
    "atualizadoEm": "2024-12-03T10:35:00.000Z"
  },
  "message": "Alerta atualizado com sucesso"
}
```

**Resposta de Erro (404):**

```json
{
  "success": false,
  "error": "Alerta não encontrado"
}
```

---

### `DELETE /alertas/:id`

Deleta um alerta.

**Autenticação:** Requer token válido

**Parâmetros de URL:**

- `:id` - ID do alerta

**Resposta de Sucesso:**

```json
{
  "success": true,
  "message": "Alerta deletado com sucesso"
}
```

**Resposta de Erro (404):**

```json
{
  "success": false,
  "error": "Alerta não encontrado"
}
```

---

## 📊 **DASHBOARD**

### `GET /dashboard/stats`

Retorna estatísticas gerais do sistema.

**Autenticação:** Requer token válido

**Resposta:**

```json
{
  "success": true,
  "stats": {
    "contratos": {
      "total": 15,
      "vigentes": 10,
      "vencidos": 3,
      "suspensos": 2,
      "vencendo": 4,
      "valorTotal": 2500000.50
    },
    "alertas": {
      "total": 8,
      "criticos": 3,
      "naoLidos": 5,
      "porTipo": {
        "vencimento": 4,
        "prazo": 2,
        "documento": 2
      }
    },
    "usuarios": {
      "total": 12,
      "ativos": 10
    },
    "timestamp": "2024-12-03T10:30:00.000Z"
  }
}
```

**Detalhes dos Campos:**

- `contratos.total` - Total de contratos
- `contratos.vigentes` - Contratos ativos
- `contratos.vencidos` - Contratos vencidos
- `contratos.suspensos` - Contratos suspensos
- `contratos.vencendo` - Contratos que vencem nos próximos 30 dias
- `contratos.valorTotal` - Soma de todos os valores
- `alertas.total` - Total de alertas
- `alertas.criticos` - Alertas com prioridade crítica
- `alertas.naoLidos` - Alertas não visualizados
- `alertas.porTipo` - Contagem de alertas por tipo
- `usuarios.total` - Total de usuários
- `usuarios.ativos` - Usuários com situação ativa

---

### `GET /dashboard/alertas`

Retorna resumo de alertas agrupados por tipo.

**Autenticação:** Requer token válido

**Resposta:**

```json
{
  "success": true,
  "alertas": [
    {
      "tipo": "vencimento",
      "total": 12,
      "criticos": 5,
      "naoLidos": 8
    },
    {
      "tipo": "prazo",
      "total": 3,
      "criticos": 0,
      "naoLidos": 2
    },
    {
      "tipo": "documento",
      "total": 7,
      "criticos": 1,
      "naoLidos": 4
    }
  ],
  "total": 22,
  "timestamp": "2024-12-03T10:30:00.000Z"
}
```

---

## 🔧 **ADMIN/DEBUG**

### `GET /admin/listar-usuarios-kv`

Lista todos os usuários armazenados no KV Store.

**Autenticação:** Requer token de admin

**Resposta:**

```json
{
  "success": true,
  "total": 5,
  "usuarios": [
    {
      "id": "uuid-001",
      "email": "controleinterno@jardim.ce.gov.br",
      "nome": "Controle Interno CGM",
      "perfil": "Administrador CGM",
      "secretaria": "Controladoria Geral do Município",
      "situacao": "ativo",
      "criadoEm": "2024-11-01T00:00:00Z",
      "ultimoAcesso": "2024-12-03T10:25:00Z"
    }
  ],
  "timestamp": "2024-12-03T10:30:00.000Z"
}
```

---

### `POST /admin/criar-admin-simples`

Cria administrador de forma simplificada (para diagnóstico).

**Autenticação:** Pública (usa publicAnonKey)

**Resposta:**

```json
{
  "success": true,
  "message": "Admin criado com sucesso!",
  "credentials": {
    "email": "controleinterno@jardim.ce.gov.br",
    "password": "@Gustavo25",
    "nome": "Controle Interno CGM",
    "perfil": "Administrador CGM"
  },
  "loginTested": true
}
```

---

### `POST /debug/check-user`

Verifica se um usuário existe no Auth e no KV Store.

**Autenticação:** Pública

**Body:**

```json
{
  "email": "usuario@exemplo.com"
}
```

**Resposta:**

```json
{
  "authUser": {
    "id": "uuid-001",
    "email": "usuario@exemplo.com",
    "email_confirmed_at": "2024-11-01T10:00:00Z"
  },
  "kvUser": {
    "id": "uuid-001",
    "email": "usuario@exemplo.com",
    "nome": "Nome do Usuário",
    "perfil": "gestor"
  }
}
```

---

### `POST /debug/test-login`

Testa se credenciais são válidas.

**Autenticação:** Pública

**Body:**

```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Resposta:**

```json
{
  "success": true,
  "error": null
}
```

---

### `POST /debug/reset-password`

Redefine a senha de um usuário.

**Autenticação:** Pública

**Body:**

```json
{
  "email": "usuario@exemplo.com",
  "novaSenha": "NovaSenha123!"
}
```

**Resposta de Sucesso:**

```json
{
  "success": true
}
```

**Resposta de Erro (404):**

```json
{
  "error": "Usuário não encontrado"
}
```

---

## 📝 **CÓDIGOS DE STATUS HTTP**

| Código | Significado |
|--------|-------------|
| `200` | Sucesso |
| `400` | Erro na requisição (dados inválidos) |
| `401` | Não autorizado (credenciais inválidas) |
| `404` | Recurso não encontrado |
| `500` | Erro interno do servidor |

---

## 🔍 **EXEMPLOS DE USO**

### **1. Setup Inicial + Login**

```javascript
// 1. Criar admin
const setup = await fetch('https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/auth/setup-admin', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${publicAnonKey}`
  }
});

// 2. Fazer login
const login = await fetch('https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`
  },
  body: JSON.stringify({
    email: 'controleinterno@jardim.ce.gov.br',
    password: '@Gustavo25'
  })
});

const { access_token } = await login.json();
```

---

### **2. Criar e Listar Alertas**

```javascript
// 1. Criar alerta
const criarAlerta = await fetch('https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/alertas', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  },
  body: JSON.stringify({
    tipo: 'vencimento',
    prioridade: 'critica',
    titulo: 'Contrato vencendo',
    mensagem: 'Contrato 001/2024 vence em 5 dias',
    dataVencimento: '2024-12-08'
  })
});

// 2. Listar alertas
const listarAlertas = await fetch('https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/alertas', {
  headers: {
    'Authorization': `Bearer ${access_token}`
  }
});

const { alertas } = await listarAlertas.json();
```

---

### **3. Marcar Alerta como Lido**

```javascript
const marcarLido = await fetch('https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/alertas/alerta-001', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  },
  body: JSON.stringify({
    status: 'lido'
  })
});
```

---

### **4. Buscar Estatísticas do Dashboard**

```javascript
const stats = await fetch('https://wdkgxmwnacmzdfcvrofe.supabase.co/functions/v1/make-server-1a8b02da/dashboard/stats', {
  headers: {
    'Authorization': `Bearer ${access_token}`
  }
});

const { stats: { contratos, alertas, usuarios } } = await stats.json();
```

---

## ✅ **RESUMO DAS ROTAS IMPLEMENTADAS**

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/health` | Status do servidor |
| `POST` | `/auth/setup-admin` | Criar admin principal |
| `POST` | `/auth/login` | Fazer login |
| `POST` | `/auth/signup` | Criar novo usuário |
| `GET` | `/alertas` | Listar alertas |
| `POST` | `/alertas` | Criar alerta |
| `PUT` | `/alertas/:id` | Atualizar alerta |
| `DELETE` | `/alertas/:id` | Deletar alerta |
| `GET` | `/dashboard/stats` | Estatísticas gerais |
| `GET` | `/dashboard/alertas` | Resumo de alertas |
| `GET` | `/admin/listar-usuarios-kv` | Listar usuários do KV |
| `POST` | `/admin/criar-admin-simples` | Criar admin (debug) |
| `POST` | `/debug/check-user` | Verificar usuário |
| `POST` | `/debug/test-login` | Testar login |
| `POST` | `/debug/reset-password` | Redefinir senha |

---

**Total:** 15 rotas implementadas ✅

**Próximas rotas a implementar:**
- Contratos (CRUD completo)
- Usuários (gerenciamento)
- Secretarias (gerenciamento)
- Solicitações de cadastro
