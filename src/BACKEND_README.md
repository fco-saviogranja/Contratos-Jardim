# 🔌 Backend Supabase - ContratosJardim

## ✅ Status da Integração
O sistema **ContratosJardim** está agora conectado ao Supabase com backend completo funcional!

---

## 🚀 Funcionalidades Implementadas

### 1. **Autenticação**
- ✅ Sistema de login com Supabase Auth
- ✅ Cadastro de novos usuários (signup)
- ✅ Gerenciamento de sessões com tokens JWT
- ✅ Logout seguro
- ✅ Persistência de sessão no localStorage

### 2. **API Endpoints**

#### **Autenticação**
- `POST /auth/signup` - Criar novo usuário
- `POST /auth/login` - Fazer login

#### **Contratos**
- `GET /contratos` - Listar todos os contratos
- `GET /contratos/:id` - Buscar contrato por ID
- `POST /contratos` - Criar novo contrato
- `PUT /contratos/:id` - Atualizar contrato
- `DELETE /contratos/:id` - Deletar contrato

#### **Usuários**
- `GET /usuarios` - Listar todos os usuários
- `PUT /usuarios/:id` - Atualizar usuário

#### **Alertas**
- `GET /alertas` - Listar todos os alertas
- `POST /alertas` - Criar novo alerta
- `PUT /alertas/:id` - Atualizar alerta

#### **Dashboard**
- `GET /dashboard/stats` - Obter estatísticas do sistema

### 3. **Armazenamento de Dados**
- ✅ Utiliza KV Store (chave-valor) do Supabase
- ✅ Estrutura: `user:id`, `contrato:id`, `alerta:id`
- ✅ Queries por prefixo para buscar múltiplos registros

---

## 📋 Como Usar

### **Passo 1: Criar Primeiro Usuário Administrador**

Acesse a página de primeiro acesso em: `/pages/PrimeiroAcesso.tsx`

```typescript
// Para testar, você pode criar um usuário via código:
import { auth } from './utils/api';

await auth.signup({
  email: 'admin@jardim.ce.gov.br',
  password: 'SenhaSegura123',
  nome: 'Administrador CGM',
  perfil: 'admin',
  secretaria: 'CGM - Controladoria Geral'
});
```

### **Passo 2: Fazer Login**

```typescript
import { auth } from './utils/api';

const result = await auth.login('admin@jardim.ce.gov.br', 'SenhaSegura123');
// Login automático salva token no localStorage
```

### **Passo 3: Usar as APIs**

```typescript
import { contratos, usuarios, alertas, dashboard } from './utils/api';

// Criar contrato
const novoContrato = await contratos.create({
  numero: '001/2024',
  objeto: 'Prestação de serviços',
  contratante: 'Prefeitura Municipal',
  contratada: 'Empresa XYZ',
  valor: 50000,
  dataInicio: '2024-01-01',
  dataTermino: '2024-12-31',
  status: 'vigente'
});

// Listar contratos
const { contratos: lista } = await contratos.getAll();

// Buscar estatísticas
const { stats } = await dashboard.getStats();
console.log(`Total de contratos: ${stats.totalContratos}`);
```

---

## 🔐 Autenticação e Autorização

### **Como Funciona**
1. Usuário faz login e recebe um `access_token` JWT
2. Token é armazenado no `localStorage`
3. Todas as requisições incluem o token no header `Authorization: Bearer <token>`
4. Backend valida o token antes de processar requisições protegidas

### **Rotas Protegidas**
Todas as rotas (exceto `/auth/login` e `/auth/signup`) requerem autenticação.

---

## 🗄️ Estrutura de Dados (KV Store)

### **Usuários** (`user:{id}`)
```json
{
  "id": "uuid",
  "email": "usuario@jardim.ce.gov.br",
  "nome": "Nome Completo",
  "perfil": "admin|gestor|fiscal",
  "secretaria": "CGM - Controladoria Geral",
  "situacao": "ativo|inativo",
  "criadoEm": "2024-01-01T00:00:00Z",
  "ultimoAcesso": "2024-01-15T10:30:00Z"
}
```

### **Contratos** (`contrato:{id}`)
```json
{
  "id": "uuid",
  "numero": "001/2024",
  "objeto": "Descrição do objeto",
  "contratante": "Prefeitura Municipal",
  "contratada": "Empresa XYZ",
  "valor": 50000,
  "dataInicio": "2024-01-01",
  "dataTermino": "2024-12-31",
  "status": "vigente|pendente|vencido|suspenso",
  "gestor": "Nome do Gestor",
  "fiscal": "Nome do Fiscal",
  "criadoEm": "2024-01-01T00:00:00Z",
  "criadoPor": "uuid-do-usuario",
  "atualizadoEm": "2024-01-15T10:30:00Z"
}
```

### **Alertas** (`alerta:{id}`)
```json
{
  "id": "uuid",
  "contratoId": "uuid-do-contrato",
  "tipo": "vencimento|renovacao",
  "prioridade": "normal|critica",
  "mensagem": "Contrato vence em 30 dias",
  "status": "nao_lido|lido|resolvido",
  "criadoEm": "2024-01-01T00:00:00Z"
}
```

---

## 🛠️ Arquivos Criados

1. **Backend (Servidor Hono)**
   - `/supabase/functions/server/index.tsx` - Servidor principal com todas as rotas

2. **Frontend (Utilitários)**
   - `/utils/supabase/client.tsx` - Cliente Supabase singleton
   - `/utils/api.tsx` - API service com todas as funções
   - `/contexts/AuthContext.tsx` - Context atualizado com Supabase
   - `/pages/Login.tsx` - Página de login atualizada
   - `/pages/PrimeiroAcesso.tsx` - Página para criar primeiro admin

---

## 🎯 Próximos Passos Sugeridos

### **1. Integrar páginas existentes com backend**
Atualizar páginas como Dashboard, TodosContratos, etc. para buscar dados reais:

```typescript
// Exemplo: Dashboard.tsx
import { useEffect, useState } from 'react';
import { dashboard } from '../utils/api';

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    dashboard.getStats().then(result => {
      setStats(result.stats);
    });
  }, []);

  // Renderizar com stats reais
}
```

### **2. Adicionar Storage para anexos**
Implementar upload de documentos no Supabase Storage:

```typescript
// Backend: criar bucket privado
const bucketName = 'make-1a8b02da-contratos-anexos';
await supabase.storage.createBucket(bucketName, { public: false });

// Upload de arquivo
await supabase.storage.from(bucketName).upload('contrato-001.pdf', file);
```

### **3. Sistema de notificações por e-mail**
Integrar serviço de e-mail para alertas automáticos.

### **4. Importação de Excel**
Criar endpoint para processar planilhas e popular o banco.

---

## 📝 Notas Importantes

- ⚠️ O sistema usa **KV Store** (chave-valor) - não é um banco relacional tradicional
- ⚠️ Não há migrations ou DDL - a estrutura é flexível e definida no código
- ⚠️ Para dados sensíveis do município, siga as políticas de segurança da LGPD
- ✅ O sistema está pronto para prototipar e testar funcionalidades
- ✅ Todos os logs são exibidos no console do servidor para debugging

---

## 🐛 Debugging

### **Ver logs do servidor**
Os logs aparecem automaticamente no console. Para ver erros detalhados:

```bash
# No console do navegador
console.log('Token atual:', localStorage.getItem('access_token'));

# Ver resposta de erro
try {
  await contratos.create({...});
} catch (error) {
  console.error('Erro detalhado:', error);
}
```

### **Testar endpoints direto**
```bash
curl -X GET \
  https://wtxmdybivrakmamwzere.supabase.co/functions/v1/make-server-1a8b02da/health \
  -H 'Authorization: Bearer YOUR_TOKEN'
```

---

## ✨ Conclusão

O backend está **100% funcional** e pronto para uso! Todas as principais funcionalidades do ContratosJardim podem agora ser integradas com persistência real de dados. 🎉
