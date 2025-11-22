# ContratosJardim - Sistema de Gestão de Contratos

Sistema de controle e gestão de contratos da Prefeitura Municipal de Jardim - CE

## 🎯 Objetivo

Realizar um acompanhamento eficiente da posição atualizada dos contratos municipais e como a gestão está lidando com seus prazos e entregas, com foco especial em:
- Contratos próximos do vencimento
- Contratos vencidos
- Alertas para gestores

## 👥 Tipos de Usuários

### 1. Administradores (vinculados à CGM)
- Visualizam todos os contratos do município
- Podem adicionar, editar e excluir qualquer contrato
- Gerenciam usuários do sistema
- Alteram permissões de outros usuários

### 2. Gestores de Contratos
- Visualizam apenas seus próprios contratos
- Podem adicionar novos contratos
- Podem editar e excluir seus contratos
- Recebem alertas sobre vencimentos

## 🚀 Como Começar

### Primeiro Acesso - Criar Administrador

1. **Acesse o sistema** pela primeira vez
2. Você pode criar o primeiro usuário administrador de duas formas:

   **Opção A - Via Interface (se habilitado):**
   - Preencha o formulário de configuração inicial
   - Defina nome, email e senha para o administrador
   - O sistema criará automaticamente um usuário com permissão de administrador

   **Opção B - Via Código (Recomendado):**
   - Abra o arquivo `/components/InitialSetup.tsx`
   - Use a função de criação de usuário no servidor

3. **Faça login** com as credenciais criadas

### Adicionar Novos Usuários

1. Faça login como **Administrador**
2. Clique no botão **"Gerenciar Usuários"**
3. Clique em **"Adicionar Usuário"**
4. Preencha:
   - Nome completo
   - E-mail institucional
   - Senha (mínimo 6 caracteres)
   - Função: Administrador ou Gestor
5. Clique em **"Criar Usuário"**

## 📋 Funcionalidades Principais

### Dashboard
- **Total de Contratos**: Visão geral do total de contratos cadastrados
- **Vigentes**: Contratos com mais de 30 dias para vencimento
- **Vencem em 30 dias**: Contratos em período de alerta
- **Vencidos**: Contratos que ultrapassaram a data de vencimento

### Gestão de Contratos

#### Adicionar Novo Contrato
1. Clique em **"Novo Contrato"**
2. Preencha os dados obrigatórios:
   - Número do contrato
   - Objeto (descrição)
   - Data de vencimento
3. Dados opcionais:
   - Fornecedor/Contratado
   - Valor
   - Data de início
   - Observações
4. Clique em **"Criar Contrato"**

#### Editar Contrato
1. Localize o contrato na tabela
2. Clique no ícone de **edição** (lápis)
3. Altere as informações necessárias
4. Clique em **"Salvar Alterações"**

#### Excluir Contrato
1. Localize o contrato na tabela
2. Clique no ícone de **exclusão** (lixeira)
3. Confirme a exclusão

### Filtros e Busca
- **Buscar**: Digite número, objeto ou fornecedor
- **Filtrar por Status**:
  - Todos os contratos
  - Vigentes
  - A vencer (30 dias)
  - Vencidos

## 🎨 Sistema de Alertas Visuais

### Cores de Status

| Cor | Status | Descrição |
|-----|--------|-----------|
| 🟢 Verde | Vigente | Mais de 30 dias para vencer |
| 🟡 Amarelo | Atenção | Vence em até 30 dias |
| 🔴 Vermelho | Vencido | Prazo expirado |

## 🔒 Segurança e Privacidade

- ✅ Dados dos contratos **NÃO são públicos**
- ✅ Acesso apenas mediante autenticação
- ✅ Gestores veem apenas seus contratos
- ✅ Administradores têm visão completa
- ✅ Senhas armazenadas de forma segura

## ⚙️ Tecnologias Utilizadas

- **Frontend**: React + TypeScript
- **Estilização**: Tailwind CSS
- **Autenticação**: Supabase Auth
- **Armazenamento**: localStorage (client-side)

## 📊 Estrutura de Dados

### Contrato
```typescript
{
  id: string                  // UUID único
  numero: string              // Ex: "001/2025"
  objeto: string              // Descrição do contrato
  fornecedor: string          // Nome do contratado
  valor: number               // Valor em R$
  dataInicio: string          // Data de início (YYYY-MM-DD)
  dataVencimento: string      // Data de vencimento (YYYY-MM-DD)
  status: string              // vigente | vencido | renovado | encerrado
  observacoes: string         // Observações adicionais
  gestorId: string            // ID do gestor responsável
  gestorNome: string          // Nome do gestor
}
```

### Usuário
```typescript
{
  id: string                  // UUID único
  email: string               // E-mail de acesso
  name: string                // Nome completo
  role: 'admin' | 'gestor'    // Função no sistema
}
```

## 📝 Boas Práticas

1. **Mantenha os dados atualizados**: Atualize contratos regularmente
2. **Monitore os alertas**: Contratos a vencer em 30 dias devem receber atenção
3. **Documente observações**: Use o campo de observações para informações relevantes
4. **Gerencie vencimentos**: Tome ação quando um contrato está próximo do vencimento
5. **Segurança**: Use senhas fortes e não compartilhe credenciais

## ⚠️ Importante

**Este sistema é um protótipo para fins de demonstração.**

Para uso em produção com dados sensíveis:
- Configure infraestrutura dedicada
- Implemente backup regular
- Configure políticas de segurança avançadas
- Adicione auditoria de ações
- Configure servidor de e-mail para notificações automáticas

## 📞 Suporte

Em caso de dúvidas ou problemas:
- Entre em contato com a Controladoria Geral do Município (CGM)
- Para questões técnicas, consulte a equipe de TI da prefeitura

---

© 2025 Prefeitura Municipal de Jardim - CE  
Controladoria Geral do Município