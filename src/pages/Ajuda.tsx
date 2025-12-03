import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Bell, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  ChevronRight,
  Home,
  UserPlus,
  Upload,
  Download,
  CheckCircle,
  AlertTriangle,
  Search,
  Camera,
  Shield,
  Key,
  Mail,
  Sliders,
  Layout
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Ajuda() {
  const { user } = useAuth();
  const [secaoAtiva, setSecaoAtiva] = useState<string>('introducao');
  const [buscaTexto, setBuscaTexto] = useState('');

  // Função para buscar conteúdo
  const buscarConteudo = (texto: string) => {
    setBuscaTexto(texto);
    
    if (!texto.trim()) return;
    
    const textoLower = texto.toLowerCase();
    
    // Mapa de palavras-chave para seções
    const mapaBusca: Record<string, string> = {
      'login': 'primeiros-passos',
      'senha': 'primeiros-passos',
      'acesso': 'primeiros-passos',
      'cadastrar': 'contratos',
      'novo contrato': 'contratos',
      'editar': 'contratos',
      'documento': 'contratos',
      'upload': 'contratos',
      'alerta': 'alertas',
      'vencimento': 'alertas',
      'notificação': 'alertas',
      'email': 'alertas',
      'relatório': 'relatorios',
      'exportar': 'relatorios',
      'excel': 'relatorios',
      'pdf': 'relatorios',
      'usuário': 'usuarios',
      'criar usuário': 'usuarios',
      'perfil': 'perfil',
      'foto': 'perfil',
      'avatar': 'perfil',
      'administração': 'administracao',
      'configuração': 'administracao',
      'dúvida': 'faq',
      'problema': 'faq',
      'ajuda': 'faq'
    };
    
    // Buscar correspondência
    for (const [palavra, secao] of Object.entries(mapaBusca)) {
      if (textoLower.includes(palavra)) {
        setSecaoAtiva(secao);
        return;
      }
    }
  };

  // Seções da ajuda
  const secoes = [
    {
      id: 'introducao',
      titulo: 'Introdução',
      icon: BookOpen,
      perfis: ['admin', 'gestor', 'fiscal']
    },
    {
      id: 'primeiros-passos',
      titulo: 'Primeiros Passos',
      icon: Home,
      perfis: ['admin', 'gestor', 'fiscal']
    },
    {
      id: 'contratos',
      titulo: 'Gestão de Contratos',
      icon: FileText,
      perfis: ['admin', 'gestor', 'fiscal']
    },
    {
      id: 'alertas',
      titulo: 'Alertas e Prazos',
      icon: Bell,
      perfis: ['admin', 'gestor', 'fiscal']
    },
    {
      id: 'relatorios',
      titulo: 'Relatórios',
      icon: BarChart3,
      perfis: ['admin', 'gestor', 'fiscal']
    },
    {
      id: 'usuarios',
      titulo: 'Gerenciar Usuários',
      icon: Users,
      perfis: ['admin']
    },
    {
      id: 'perfil',
      titulo: 'Meu Perfil',
      icon: Camera,
      perfis: ['admin', 'gestor', 'fiscal']
    },
    {
      id: 'administracao',
      titulo: 'Administração',
      icon: Settings,
      perfis: ['admin']
    },
    {
      id: 'faq',
      titulo: 'Perguntas Frequentes',
      icon: HelpCircle,
      perfis: ['admin', 'gestor', 'fiscal']
    }
  ];

  // Filtrar seções por perfil do usuário
  const secoesVisiveis = secoes.filter(secao => 
    secao.perfis.includes(user?.perfil || '')
  );

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Cabeçalho */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-gray-900 mb-2">Central de Ajuda</h1>
            <p className="text-gray-600 text-sm md:text-base">
              Guia completo para utilização do Sistema ContratosJardim
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
            <Shield className="size-4 text-green-700 flex-shrink-0" />
            <span className="text-green-700 text-sm">
              {user?.perfil === 'admin' ? 'Administrador' : 
               user?.perfil === 'gestor' ? 'Gestor' : 
               'Fiscal'}
            </span>
          </div>
        </div>

        {/* Busca */}
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar na ajuda..."
              value={buscaTexto}
              onChange={(e) => buscarConteudo(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  buscarConteudo(buscaTexto);
                }
              }}
              className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Menu lateral */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:sticky lg:top-6">
            <h3 className="text-gray-700 mb-3 text-sm md:text-base">Tópicos</h3>
            <nav className="space-y-1">
              {secoesVisiveis.map((secao) => {
                const Icon = secao.icon;
                const ativo = secaoAtiva === secao.id;
                
                return (
                  <button
                    key={secao.id}
                    onClick={() => setSecaoAtiva(secao.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                      ativo
                        ? 'bg-green-50 text-green-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`size-4 flex-shrink-0 ${ativo ? 'text-green-700' : 'text-gray-500'}`} />
                    <span className="text-sm">{secao.titulo}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-8">
            {secaoAtiva === 'introducao' && <SecaoIntroducao />}
            {secaoAtiva === 'primeiros-passos' && <SecaoPrimeirosPassos />}
            {secaoAtiva === 'contratos' && <SecaoContratos />}
            {secaoAtiva === 'alertas' && <SecaoAlertas />}
            {secaoAtiva === 'relatorios' && <SecaoRelatorios />}
            {secaoAtiva === 'usuarios' && <SecaoUsuarios />}
            {secaoAtiva === 'perfil' && <SecaoPerfil />}
            {secaoAtiva === 'administracao' && <SecaoAdministracao />}
            {secaoAtiva === 'faq' && <SecaoFAQ />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Componentes de seções

function SecaoIntroducao() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-gray-900 mb-4">Bem-vindo ao ContratosJardim</h2>
      
      <p className="text-gray-600 mb-6">
        O <strong>ContratosJardim</strong> é o Sistema Interno de Gestão de Contratos da 
        Controladoria Geral do Município de Jardim, desenvolvido para facilitar o controle, 
        monitoramento e gestão de todos os contratos municipais.
      </p>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="text-green-900 mb-2">🎯 Objetivo do Sistema</h4>
        <p className="text-green-800 text-sm mb-0">
          Centralizar a gestão de contratos, automatizar alertas de vencimento, gerar relatórios 
          gerenciais e garantir o controle eficiente dos prazos e obrigações contratuais.
        </p>
      </div>

      <h3 className="text-gray-900 mt-6 mb-3">Perfis de Usuário</h3>
      
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="size-5 text-red-600" />
            <h4 className="text-gray-900 mb-0">Administrador CGM</h4>
          </div>
          <p className="text-gray-600 text-sm mb-2">
            Acesso total ao sistema, incluindo:
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>✅ Gerenciar todos os contratos</li>
            <li>✅ Criar e gerenciar usuários</li>
            <li>✅ Configurar parâmetros do sistema</li>
            <li>✅ Visualizar todos os relatórios</li>
            <li>✅ Configurar alertas e notificações</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="size-5 text-blue-600" />
            <h4 className="text-gray-900 mb-0">Gestor de Contratos</h4>
          </div>
          <p className="text-gray-600 text-sm mb-2">
            Responsável pela gestão operacional:
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>✅ Cadastrar e editar contratos</li>
            <li>✅ Visualizar dashboard e relatórios</li>
            <li>✅ Gerenciar alertas de prazos</li>
            <li>✅ Fazer upload de documentos</li>
            <li>❌ Não pode gerenciar usuários ou configurações</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="size-5 text-green-600" />
            <h4 className="text-gray-900 mb-0">Fiscal de Contratos</h4>
          </div>
          <p className="text-gray-600 text-sm mb-2">
            Acesso para consulta e fiscalização:
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>✅ Visualizar todos os contratos</li>
            <li>✅ Consultar dashboard e relatórios</li>
            <li>✅ Receber notificações de alertas</li>
            <li>✅ Exportar relatórios</li>
            <li>❌ Não pode cadastrar ou editar contratos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function SecaoPrimeirosPassos() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-gray-900 mb-4">Primeiros Passos</h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <HelpCircle className="size-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-blue-900 mb-1">Primeiro acesso?</h4>
            <p className="text-blue-800 text-sm mb-0">
              Se você ainda não tem uma conta, utilize o botão "Solicitar acesso" na tela de login 
              e aguarde a aprovação do administrador.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-gray-900 mb-3">1. Fazendo Login</h3>
      <ol className="text-gray-600 space-y-2">
        <li>Acesse o sistema através do navegador</li>
        <li>Digite seu <strong>e-mail institucional</strong> (exemplo@jardim.ce.gov.br)</li>
        <li>Digite sua <strong>senha</strong></li>
        <li>Clique em <strong>"Entrar"</strong></li>
      </ol>

      <h3 className="text-gray-900 mt-6 mb-3">2. Conhecendo a Interface</h3>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <h4 className="text-gray-900 mb-2">🔝 Cabeçalho Superior</h4>
        <ul className="text-gray-600 text-sm space-y-1 mb-0">
          <li>• <strong>Logo do sistema</strong> - Identidade visual ContratosJardim</li>
          <li>• <strong>Ajuda</strong> - Acesso a esta central de ajuda</li>
          <li>• <strong>Foto/Nome do usuário</strong> - Seus dados e opção de sair</li>
        </ul>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <h4 className="text-gray-900 mb-2">🧭 Menu de Navegação</h4>
        <ul className="text-gray-600 text-sm space-y-1 mb-0">
          <li>• <strong>Dashboard</strong> - Visão geral do sistema</li>
          <li>• <strong>Contratos</strong> - Lista completa de contratos</li>
          <li>• <strong>Alertas e prazos</strong> - Contratos próximos do vencimento</li>
          <li>• <strong>Relatórios</strong> - Análises e exportações</li>
          <li>• <strong>Administração</strong> - Configurações (apenas admin)</li>
        </ul>
      </div>

      <h3 className="text-gray-900 mt-6 mb-3">3. Configurando seu Perfil</h3>
      <ol className="text-gray-600 space-y-2">
        <li>Clique em <strong>"Administração do sistema"</strong> → <strong>"Gerenciar usuários"</strong></li>
        <li>Selecione a aba <strong>"Meu Perfil"</strong></li>
        <li>Atualize suas informações (nome, secretaria, senha)</li>
        <li>Adicione uma <strong>foto de perfil</strong> clicando no ícone da câmera</li>
        <li>Clique em <strong>"Salvar alterações"</strong></li>
      </ol>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="text-yellow-900 mb-1">⚠️ Importante</h4>
            <p className="text-yellow-800 text-sm mb-0">
              Você não pode alterar seu e-mail ou perfil de acesso. Apenas o administrador 
              pode fazer essas alterações.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecaoContratos() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-gray-900 mb-4">Gestão de Contratos</h2>

      <p className="text-gray-600 mb-6">
        O módulo de contratos permite cadastrar, editar, visualizar e gerenciar todos os 
        contratos do município de forma centralizada.
      </p>

      <h3 className="text-gray-900 mb-3">📝 Cadastrar Novo Contrato</h3>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <p className="text-green-800 text-sm mb-2">
          <strong>Perfis autorizados:</strong> Administrador e Gestor
        </p>
      </div>

      <ol className="text-gray-600 space-y-3">
        <li>
          <strong>Acesse o módulo:</strong>
          <ul className="mt-1 text-sm">
            <li>• Clique em <strong>"Contratos"</strong> no menu superior</li>
            <li>• Clique no botão <strong>"+ Novo contrato"</strong></li>
          </ul>
        </li>
        <li>
          <strong>Preencha os dados básicos:</strong>
          <ul className="mt-1 text-sm">
            <li>• <strong>Número do contrato</strong> - Identificação única</li>
            <li>• <strong>Objeto</strong> - Descrição detalhada do contrato</li>
            <li>• <strong>Tipo</strong> - Serviços, Obras, Fornecimento, etc.</li>
            <li>• <strong>Modalidade</strong> - Licitação, Pregão, Dispensa, etc.</li>
            <li>• <strong>Número do processo</strong> - Número do processo administrativo</li>
          </ul>
        </li>
        <li>
          <strong>Defina datas e valores:</strong>
          <ul className="mt-1 text-sm">
            <li>• <strong>Data de assinatura</strong></li>
            <li>• <strong>Data de início</strong></li>
            <li>• <strong>Data de término</strong></li>
            <li>• <strong>Valor total</strong> - Em reais (R$)</li>
          </ul>
        </li>
        <li>
          <strong>Identifique os responsáveis:</strong>
          <ul className="mt-1 text-sm">
            <li>• <strong>Contratada</strong> - Empresa ou fornecedor</li>
            <li>• <strong>CNPJ da contratada</strong></li>
            <li>• <strong>Secretaria responsável</strong></li>
            <li>• <strong>Gestor do contrato</strong></li>
            <li>• <strong>Fiscal do contrato</strong></li>
          </ul>
        </li>
        <li>
          <strong>Adicione informações extras (opcional):</strong>
          <ul className="mt-1 text-sm">
            <li>• <strong>Observações</strong> - Notas importantes</li>
            <li>• <strong>Tags</strong> - Palavras-chave para organização</li>
          </ul>
        </li>
        <li>
          <strong>Faça upload de documentos:</strong>
          <ul className="mt-1 text-sm">
            <li>• Contrato assinado (PDF)</li>
            <li>• Termos aditivos</li>
            <li>• Documentos complementares</li>
            <li>• Máximo de <strong>10MB por arquivo</strong></li>
          </ul>
        </li>
        <li>
          Clique em <strong>"Salvar contrato"</strong>
        </li>
      </ol>

      <h3 className="text-gray-900 mt-6 mb-3">🔍 Visualizar e Pesquisar Contratos</h3>
      
      <p className="text-gray-600 mb-3">
        Na página <strong>"Contratos"</strong>, você pode:
      </p>

      <ul className="text-gray-600 space-y-2">
        <li>
          <strong>Pesquisar:</strong> Use a barra de busca para encontrar por número, 
          objeto, contratada ou processo
        </li>
        <li>
          <strong>Filtrar:</strong> Clique em "Filtros" para refinar por:
          <ul className="mt-1 text-sm ml-4">
            <li>• Status (Vigente, Alerta, Vencido)</li>
            <li>• Secretaria</li>
            <li>• Tipo de contrato</li>
            <li>• Período</li>
          </ul>
        </li>
        <li>
          <strong>Ordenar:</strong> Clique nos cabeçalhos da tabela para ordenar
        </li>
        <li>
          <strong>Visualizar detalhes:</strong> Clique em qualquer contrato para ver 
          informações completas
        </li>
      </ul>

      <h3 className="text-gray-900 mt-6 mb-3">✏️ Editar Contrato</h3>
      
      <ol className="text-gray-600 space-y-2">
        <li>Acesse a lista de contratos</li>
        <li>Clique no contrato que deseja editar</li>
        <li>Clique no botão <strong>"Editar"</strong></li>
        <li>Altere as informações necessárias</li>
        <li>Clique em <strong>"Salvar alterações"</strong></li>
      </ol>

      <h3 className="text-gray-900 mt-6 mb-3">📎 Gerenciar Documentos</h3>
      
      <p className="text-gray-600 mb-3">
        Cada contrato pode ter múltiplos documentos anexados:
      </p>

      <ul className="text-gray-600 space-y-2">
        <li><strong>Upload:</strong> Clique em "Adicionar documento" na edição do contrato</li>
        <li><strong>Download:</strong> Clique no nome do documento para baixar</li>
        <li><strong>Excluir:</strong> Clique no ícone de lixeira ao lado do documento</li>
        <li><strong>Formatos aceitos:</strong> PDF, DOC, DOCX, XLS, XLSX, JPG, PNG</li>
        <li><strong>Tamanho máximo:</strong> 10MB por arquivo</li>
      </ul>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="size-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-blue-900 mb-1">💡 Dica</h4>
            <p className="text-blue-800 text-sm mb-0">
              Organize seus documentos com nomes descritivos. Exemplo: "Contrato_123-2024_Assinado.pdf", 
              "Termo_Aditivo_01_Contrato_123.pdf"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecaoAlertas() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-gray-900 mb-4">Alertas e Prazos</h2>

      <p className="text-gray-600 mb-6">
        O sistema monitora automaticamente todos os contratos e envia alertas quando 
        estão próximos do vencimento.
      </p>

      <h3 className="text-gray-900 mb-3">🔔 Como Funcionam os Alertas</h3>

      <div className="space-y-4">
        <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="size-3 rounded-full bg-yellow-500" />
            <h4 className="text-yellow-900 mb-0">Alerta (90 dias ou menos)</h4>
          </div>
          <p className="text-yellow-800 text-sm mb-0">
            O sistema emite alertas quando o contrato tem <strong>90 dias ou menos</strong> 
            para vencer. Você receberá notificação no painel e por e-mail.
          </p>
        </div>

        <div className="border border-red-200 bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="size-3 rounded-full bg-red-500" />
            <h4 className="text-red-900 mb-0">Vencido</h4>
          </div>
          <p className="text-red-800 text-sm mb-0">
            Contratos com data de término já ultrapassada aparecem como <strong>vencidos</strong> 
            e exigem ação imediata (renovação ou encerramento).
          </p>
        </div>

        <div className="border border-green-200 bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="size-3 rounded-full bg-green-500" />
            <h4 className="text-green-900 mb-0">Vigente</h4>
          </div>
          <p className="text-green-800 text-sm mb-0">
            Contratos com mais de <strong>90 dias</strong> para vencer estão 
            em situação normal.
          </p>
        </div>
      </div>

      <h3 className="text-gray-900 mt-6 mb-3">📧 Notificações por E-mail</h3>

      <p className="text-gray-600 mb-3">
        O sistema envia e-mails automáticos para:
      </p>

      <ul className="text-gray-600 space-y-2">
        <li>✉️ <strong>Gestor do contrato</strong> - Responsável direto</li>
        <li>✉️ <strong>Fiscal do contrato</strong> - Responsável pela fiscalização</li>
        <li>✉️ <strong>Administradores</strong> - Controladoria Geral</li>
      </ul>

      <p className="text-gray-600 mt-4 mb-3">
        Os e-mails são enviados pelo remetente:
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2">
          <Mail className="size-4 text-gray-600" />
          <code className="text-sm text-gray-700">controleinterno@jardim.ce.gov.br</code>
        </div>
      </div>

      <h3 className="text-gray-900 mt-6 mb-3">🎯 Acessar Alertas</h3>

      <ol className="text-gray-600 space-y-2">
        <li>Clique em <strong>"Alertas e prazos"</strong> no menu superior</li>
        <li>Visualize a lista de contratos com alertas ativos</li>
        <li>O <strong>badge numérico</strong> no menu indica quantos alertas pendentes existem</li>
        <li>Clique em qualquer alerta para ver detalhes do contrato</li>
      </ol>

      <h3 className="text-gray-900 mt-6 mb-3">✅ Marcar Alerta como Lido</h3>

      <p className="text-gray-600 mb-3">
        Para organizar melhor os alertas:
      </p>

      <ol className="text-gray-600 space-y-2">
        <li>Acesse a página de <strong>"Alertas e prazos"</strong></li>
        <li>Clique no alerta que deseja marcar</li>
        <li>Clique em <strong>"Marcar como lido"</strong> ou <strong>"Resolver"</strong></li>
        <li>Alertas lidos/resolvidos não aparecem mais na contagem do badge</li>
      </ol>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="text-yellow-900 mb-1">⚠️ Atenção</h4>
            <p className="text-yellow-800 text-sm mb-0">
              Marcar um alerta como lido não renova o contrato. É apenas uma forma de organização. 
              Para renovar um contrato, você deve editá-lo e atualizar a data de término.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecaoRelatorios() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-gray-900 mb-4">Relatórios</h2>

      <p className="text-gray-600 mb-6">
        O módulo de relatórios permite gerar análises detalhadas e exportar dados 
        do sistema em diversos formatos.
      </p>

      <h3 className="text-gray-900 mb-3">📊 Tipos de Relatórios</h3>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-gray-900 mb-2">📈 Relatório Geral de Contratos</h4>
          <p className="text-gray-600 text-sm mb-2">
            Lista completa de todos os contratos com suas informações principais.
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>• Número, objeto e contratada</li>
            <li>• Datas de início e término</li>
            <li>• Valores e status</li>
            <li>• Gestor e fiscal responsáveis</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-gray-900 mb-2">⚠️ Relatório de Contratos com Alerta</h4>
          <p className="text-gray-600 text-sm mb-2">
            Contratos que vencem em 90 dias ou menos.
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>• Dias restantes para vencimento</li>
            <li>• Priorização por urgência</li>
            <li>• Ações recomendadas</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-gray-900 mb-2">🔴 Relatório de Contratos Vencidos</h4>
          <p className="text-gray-600 text-sm mb-2">
            Contratos com data de término já ultrapassada.
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>• Dias em atraso</li>
            <li>• Necessidade de renovação ou encerramento</li>
            <li>• Histórico de ações</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-gray-900 mb-2">🏛️ Relatório por Secretaria</h4>
          <p className="text-gray-600 text-sm mb-2">
            Agrupa contratos por secretaria responsável.
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>• Total de contratos por pasta</li>
            <li>• Valores consolidados</li>
            <li>• Status de cada secretaria</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-gray-900 mb-2">💰 Relatório Financeiro</h4>
          <p className="text-gray-600 text-sm mb-2">
            Análise dos valores dos contratos.
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>• Valor total contratado</li>
            <li>• Distribuição por tipo</li>
            <li>• Evolução temporal</li>
          </ul>
        </div>
      </div>

      <h3 className="text-gray-900 mt-6 mb-3">📥 Exportar Relatórios</h3>

      <p className="text-gray-600 mb-3">
        Todos os relatórios podem ser exportados nos seguintes formatos:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-3 text-center">
          <Download className="size-6 text-green-600 mx-auto mb-2" />
          <h4 className="text-gray-900 text-sm mb-1">Excel (.xlsx)</h4>
          <p className="text-gray-600 text-xs mb-0">
            Ideal para análises e planilhas
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-3 text-center">
          <Download className="size-6 text-red-600 mx-auto mb-2" />
          <h4 className="text-gray-900 text-sm mb-1">PDF (.pdf)</h4>
          <p className="text-gray-600 text-xs mb-0">
            Ideal para impressão e apresentações
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-3 text-center">
          <Download className="size-6 text-blue-600 mx-auto mb-2" />
          <h4 className="text-gray-900 text-sm mb-1">CSV (.csv)</h4>
          <p className="text-gray-600 text-xs mb-0">
            Ideal para importação em outros sistemas
          </p>
        </div>
      </div>

      <h3 className="text-gray-900 mt-6 mb-3">🎯 Como Gerar um Relatório</h3>

      <ol className="text-gray-600 space-y-2">
        <li>Clique em <strong>"Relatórios"</strong> no menu superior</li>
        <li>Selecione o <strong>tipo de relatório</strong> desejado</li>
        <li>Configure os <strong>filtros</strong> (período, secretaria, status, etc.)</li>
        <li>Clique em <strong>"Gerar relatório"</strong></li>
        <li>Visualize o resultado na tela</li>
        <li>Clique em <strong>"Exportar"</strong> e escolha o formato (Excel, PDF ou CSV)</li>
        <li>O arquivo será baixado automaticamente</li>
      </ol>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="size-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-blue-900 mb-1">💡 Dica</h4>
            <p className="text-blue-800 text-sm mb-0">
              Use os filtros para gerar relatórios específicos. Por exemplo, você pode gerar 
              um relatório apenas dos contratos da Secretaria de Saúde que vencem nos próximos 30 dias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecaoUsuarios() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-gray-900 mb-4">Gerenciar Usuários</h2>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="size-5 text-red-600 mt-0.5" />
          <div>
            <h4 className="text-red-900 mb-1">🔒 Acesso Restrito</h4>
            <p className="text-red-800 text-sm mb-0">
              Esta funcionalidade está disponível apenas para usuários com perfil 
              <strong> Administrador CGM</strong>.
            </p>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-6">
        O módulo de gerenciamento de usuários permite controlar todos os acessos ao sistema.
      </p>

      <h3 className="text-gray-900 mb-3">👥 Lista de Usuários</h3>

      <p className="text-gray-600 mb-3">
        Na aba <strong>"Lista de Usuários"</strong>, você pode:
      </p>

      <ul className="text-gray-600 space-y-2">
        <li>📋 Visualizar todos os usuários cadastrados</li>
        <li>🔍 Pesquisar por nome, e-mail ou secretaria</li>
        <li>✏️ Editar informações de qualquer usuário</li>
        <li>🗑️ Excluir usuários (exceto administradores)</li>
        <li>🔐 Alterar perfis de acesso</li>
        <li>🔑 Resetar senhas</li>
      </ul>

      <h3 className="text-gray-900 mt-6 mb-3">➕ Criar Novo Usuário</h3>

      <ol className="text-gray-600 space-y-2">
        <li>Acesse <strong>"Gerenciar usuários"</strong></li>
        <li>Clique no botão <strong>"+ Novo usuário"</strong></li>
        <li>Preencha os dados:
          <ul className="mt-1 text-sm ml-4">
            <li>• <strong>Nome completo</strong></li>
            <li>• <strong>E-mail institucional</strong> (deve ser @jardim.ce.gov.br)</li>
            <li>• <strong>Secretaria</strong></li>
            <li>• <strong>Perfil de acesso</strong> (Admin, Gestor ou Fiscal)</li>
            <li>• <strong>Senha inicial</strong> (mínimo 6 caracteres)</li>
          </ul>
        </li>
        <li>Clique em <strong>"Criar usuário"</strong></li>
        <li>O novo usuário receberá um e-mail com as credenciais</li>
      </ol>

      <h3 className="text-gray-900 mt-6 mb-3">✏️ Editar Usuário</h3>

      <ol className="text-gray-600 space-y-2">
        <li>Localize o usuário na lista</li>
        <li>Clique no ícone de <strong>edição (lápis)</strong></li>
        <li>Modifique as informações necessárias:
          <ul className="mt-1 text-sm ml-4">
            <li>• Nome</li>
            <li>• E-mail</li>
            <li>• Secretaria</li>
            <li>• Perfil de acesso</li>
            <li>• Senha (se necessário)</li>
          </ul>
        </li>
        <li>Clique em <strong>"Salvar"</strong></li>
      </ol>

      <h3 className="text-gray-900 mt-6 mb-3">📝 Solicitações de Acesso</h3>

      <p className="text-gray-600 mb-3">
        Na aba <strong>"Solicitações de Acesso"</strong>, você gerencia pedidos de novos usuários:
      </p>

      <ol className="text-gray-600 space-y-2">
        <li>Visualize todas as solicitações pendentes</li>
        <li>Analise os dados fornecidos pelo solicitante:
          <ul className="mt-1 text-sm ml-4">
            <li>• Nome completo</li>
            <li>• E-mail institucional</li>
            <li>• Secretaria</li>
            <li>• Justificativa de acesso</li>
          </ul>
        </li>
        <li>Decida a ação:
          <ul className="mt-1 text-sm ml-4">
            <li>✅ <strong>Aprovar:</strong> Define perfil e senha, cria o usuário</li>
            <li>❌ <strong>Recusar:</strong> Rejeita a solicitação com justificativa</li>
          </ul>
        </li>
        <li>O solicitante receberá um e-mail com o resultado</li>
      </ol>

      <h3 className="text-gray-900 mt-6 mb-3">🔑 Resetar Senha</h3>

      <p className="text-gray-600 mb-3">
        Se um usuário esqueceu a senha:
      </p>

      <ol className="text-gray-600 space-y-2">
        <li>Localize o usuário na lista</li>
        <li>Clique em <strong>"Editar"</strong></li>
        <li>Defina uma <strong>nova senha temporária</strong></li>
        <li>Clique em <strong>"Salvar"</strong></li>
        <li>Informe a nova senha ao usuário</li>
        <li>Oriente o usuário a alterar a senha no primeiro acesso</li>
      </ol>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="text-yellow-900 mb-1">⚠️ Segurança</h4>
            <ul className="text-yellow-800 text-sm mb-0 space-y-1">
              <li>• Senhas devem ter no mínimo 6 caracteres</li>
              <li>• Use senhas fortes (letras, números e símbolos)</li>
              <li>• Não compartilhe senhas por e-mail não criptografado</li>
              <li>• Revise periodicamente a lista de usuários ativos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecaoPerfil() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-gray-900 mb-4">Meu Perfil</h2>

      <p className="text-gray-600 mb-6">
        A seção "Meu Perfil" permite que cada usuário gerencie suas próprias informações 
        e personalize sua experiência no sistema.
      </p>

      <h3 className="text-gray-900 mb-3">🎯 Acessar Meu Perfil</h3>

      <ol className="text-gray-600 space-y-2">
        <li>Clique em <strong>"Administração do sistema"</strong> → <strong>"Gerenciar usuários"</strong></li>
        <li>Selecione a aba <strong>"Meu Perfil"</strong></li>
        <li>Visualize e edite suas informações</li>
      </ol>

      <h3 className="text-gray-900 mt-6 mb-3">📝 Informações Editáveis</h3>

      <div className="space-y-4">
        <div className="border border-green-200 bg-green-50 rounded-lg p-4">
          <h4 className="text-green-900 mb-2">✅ Você PODE editar:</h4>
          <ul className="text-green-800 text-sm space-y-1 mb-0">
            <li>• <strong>Nome completo</strong> - Seu nome de exibição</li>
            <li>• <strong>Secretaria</strong> - Órgão onde trabalha</li>
            <li>• <strong>Senha</strong> - Sua senha de acesso</li>
            <li>• <strong>Foto de perfil</strong> - Sua imagem no sistema</li>
          </ul>
        </div>

        <div className="border border-red-200 bg-red-50 rounded-lg p-4">
          <h4 className="text-red-900 mb-2">❌ Você NÃO PODE editar:</h4>
          <ul className="text-red-800 text-sm space-y-1 mb-0">
            <li>• <strong>E-mail</strong> - Apenas o administrador pode alterar</li>
            <li>• <strong>Perfil de acesso</strong> - Apenas o administrador pode alterar</li>
          </ul>
          <p className="text-red-800 text-sm mt-2 mb-0">
            Se precisar alterar e-mail ou perfil, solicite ao administrador do sistema.
          </p>
        </div>
      </div>

      <h3 className="text-gray-900 mt-6 mb-3">📸 Adicionar Foto de Perfil</h3>

      <ol className="text-gray-600 space-y-2">
        <li>Acesse <strong>"Meu Perfil"</strong></li>
        <li>Clique no <strong>ícone da câmera</strong> sobre o avatar</li>
        <li>Selecione uma imagem do seu computador:
          <ul className="mt-1 text-sm ml-4">
            <li>• Formatos aceitos: JPG, PNG, GIF</li>
            <li>• Tamanho máximo: 5MB</li>
            <li>• Recomendado: imagem quadrada (ex: 400x400px)</li>
          </ul>
        </li>
        <li>A foto será carregada e processada automaticamente</li>
        <li>Sua foto aparecerá no <strong>cabeçalho do sistema</strong> (canto superior direito)</li>
      </ol>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Camera className="size-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-blue-900 mb-1">💡 Dica</h4>
            <p className="text-blue-800 text-sm mb-0">
              Use uma foto profissional e de boa qualidade. A foto ajuda outros usuários 
              a identificá-lo no sistema e torna a interface mais personalizada.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-gray-900 mt-6 mb-3">🔑 Alterar Senha</h3>

      <ol className="text-gray-600 space-y-2">
        <li>Acesse <strong>"Meu Perfil"</strong></li>
        <li>Localize o campo <strong>"Nova senha"</strong></li>
        <li>Digite sua nova senha (mínimo 6 caracteres)</li>
        <li>Clique em <strong>"Salvar alterações"</strong></li>
        <li>Na próxima vez que fizer login, use a nova senha</li>
      </ol>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <Key className="size-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="text-yellow-900 mb-1">🔐 Segurança da Senha</h4>
            <ul className="text-yellow-800 text-sm mb-0 space-y-1">
              <li>• Use no mínimo 6 caracteres</li>
              <li>• Combine letras maiúsculas e minúsculas</li>
              <li>• Inclua números</li>
              <li>• Use caracteres especiais (@, #, $, !, etc.)</li>
              <li>• Não use dados pessoais óbvios (data de nascimento, nome, etc.)</li>
              <li>• Não compartilhe sua senha com ninguém</li>
            </ul>
          </div>
        </div>
      </div>

      <h3 className="text-gray-900 mt-6 mb-3">💾 Salvar Alterações</h3>

      <p className="text-gray-600 mb-3">
        Após fazer qualquer alteração:
      </p>

      <ol className="text-gray-600 space-y-2">
        <li>Revise todas as informações</li>
        <li>Clique no botão <strong>"Salvar alterações"</strong></li>
        <li>Aguarde a confirmação de sucesso</li>
        <li>As alterações serão aplicadas imediatamente</li>
      </ol>
    </div>
  );
}

function SecaoAdministracao() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-gray-900 mb-4">Administração do Sistema</h2>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="size-5 text-red-600 mt-0.5" />
          <div>
            <h4 className="text-red-900 mb-1">🔒 Acesso Restrito</h4>
            <p className="text-red-800 text-sm mb-0">
              As funcionalidades de administração estão disponíveis apenas para usuários com perfil 
              <strong> Administrador CGM</strong>.
            </p>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-6">
        O menu "Administração do sistema" agrupa todas as configurações avançadas para 
        gerenciamento completo da plataforma.
      </p>

      <h3 className="text-gray-900 mb-3">⚙️ Módulos Disponíveis</h3>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="size-5 text-blue-600" />
            <h4 className="text-gray-900 mb-0">Gerenciar Usuários</h4>
          </div>
          <p className="text-gray-600 text-sm mb-2">
            Controle completo de todos os usuários do sistema.
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>• Criar, editar e excluir usuários</li>
            <li>• Aprovar solicitações de acesso</li>
            <li>• Resetar senhas</li>
            <li>• Alterar perfis de acesso</li>
            <li>• Gerenciar seu próprio perfil</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="size-5 text-purple-600" />
            <h4 className="text-gray-900 mb-0">Parâmetros e Perfis</h4>
          </div>
          <p className="text-gray-600 text-sm mb-2">
            Configuração de permissões e regras de negócio.
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>• Definir permissões por perfil (Admin, Gestor, Fiscal)</li>
            <li>• Configurar alertas de vencimento (dias)</li>
            <li>• Definir regras de notificação</li>
            <li>• Personalizar campos obrigatórios</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Layout className="size-5 text-indigo-600" />
            <h4 className="text-gray-900 mb-0">Aparência e Layout</h4>
          </div>
          <p className="text-gray-600 text-sm mb-2">
            Personalização visual do sistema.
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>• Alterar cores do tema</li>
            <li>• Personalizar logotipo</li>
            <li>• Configurar layout das páginas</li>
            <li>• Ajustar tipografia e espaçamentos</li>
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sliders className="size-5 text-orange-600" />
            <h4 className="text-gray-900 mb-0">Configurações Gerais</h4>
          </div>
          <p className="text-gray-600 text-sm mb-2">
            Configurações globais do sistema.
          </p>
          <ul className="text-gray-600 text-sm space-y-1 mb-0">
            <li>• Configurar servidor de e-mail (SMTP)</li>
            <li>• Definir remetente padrão</li>
            <li>• Gerenciar secretarias/órgãos</li>
            <li>• Configurar tipos de contrato</li>
            <li>• Definir modalidades de licitação</li>
            <li>• Backup e restauração de dados</li>
          </ul>
        </div>
      </div>

      <h3 className="text-gray-900 mt-6 mb-3">🔧 Boas Práticas</h3>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-blue-900 mb-2">💡 Recomendações</h4>
        <ul className="text-blue-800 text-sm space-y-2 mb-0">
          <li>
            <strong>Backup regular:</strong> Faça backup dos dados periodicamente 
            (recomendado: semanal)
          </li>
          <li>
            <strong>Auditoria de usuários:</strong> Revise mensalmente a lista de usuários 
            ativos e remova acessos desnecessários
          </li>
          <li>
            <strong>Teste antes de aplicar:</strong> Ao alterar configurações críticas, 
            teste em ambiente controlado primeiro
          </li>
          <li>
            <strong>Documentação:</strong> Mantenha registro de todas as alterações 
            importantes feitas no sistema
          </li>
          <li>
            <strong>Comunicação:</strong> Informe os usuários sobre mudanças que possam 
            afetar seu trabalho
          </li>
        </ul>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="text-yellow-900 mb-1">⚠️ Atenção</h4>
            <ul className="text-yellow-800 text-sm mb-0 space-y-1">
              <li>• Alterações em parâmetros afetam todo o sistema</li>
              <li>• Não exclua secretarias ou tipos que estejam em uso</li>
              <li>• Mudanças de permissões afetam imediatamente todos os usuários</li>
              <li>• Sempre faça backup antes de grandes alterações</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecaoFAQ() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-gray-900 mb-4">Perguntas Frequentes (FAQ)</h2>

      <div className="space-y-4">
        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="text-gray-900 cursor-pointer">
            <strong>❓ Esqueci minha senha. O que faço?</strong>
          </summary>
          <p className="text-gray-600 text-sm mt-2 mb-0">
            Entre em contato com o administrador do sistema (Controladoria Geral - CGM). 
            Apenas administradores podem resetar senhas. Envie um e-mail para 
            <code className="text-sm"> controleinterno@jardim.ce.gov.br</code> solicitando 
            o reset de senha.
          </p>
        </details>

        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="text-gray-900 cursor-pointer">
            <strong>❓ Como solicito acesso ao sistema?</strong>
          </summary>
          <div className="text-gray-600 text-sm mt-2 mb-0">
            <ol className="space-y-1">
              <li>1. Na tela de login, clique em <strong>"Solicitar acesso"</strong></li>
              <li>2. Preencha o formulário com seus dados</li>
              <li>3. Use seu e-mail institucional (@jardim.ce.gov.br)</li>
              <li>4. Justifique o motivo do acesso</li>
              <li>5. Aguarde a aprovação do administrador</li>
              <li>6. Você receberá um e-mail com a resposta</li>
            </ol>
          </div>
        </details>

        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="text-gray-900 cursor-pointer">
            <strong>❓ Não recebi o alerta de vencimento de contrato por e-mail</strong>
          </summary>
          <div className="text-gray-600 text-sm mt-2 mb-0">
            <p className="mb-2">Verifique:</p>
            <ul className="space-y-1">
              <li>• Se o e-mail não está na caixa de <strong>spam/lixo eletrônico</strong></li>
              <li>• Se seu e-mail cadastrado está correto (veja em "Meu Perfil")</li>
              <li>• Se você é o gestor ou fiscal do contrato</li>
              <li>• Se o contrato tem menos de 90 dias para vencer</li>
            </ul>
            <p className="mt-2 mb-0">
              O remetente dos e-mails é: <code>controleinterno@jardim.ce.gov.br</code>
            </p>
          </div>
        </details>

        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="text-gray-900 cursor-pointer">
            <strong>❓ Posso alterar meu e-mail?</strong>
          </summary>
          <p className="text-gray-600 text-sm mt-2 mb-0">
            Não. Apenas o administrador pode alterar o e-mail de um usuário, pois o e-mail 
            é usado como identificador único no sistema. Se precisar alterar, solicite ao 
            administrador.
          </p>
        </details>

        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="text-gray-900 cursor-pointer">
            <strong>❓ Como adiciono documentos a um contrato?</strong>
          </summary>
          <div className="text-gray-600 text-sm mt-2 mb-0">
            <ol className="space-y-1">
              <li>1. Acesse a página <strong>"Contratos"</strong></li>
              <li>2. Clique no contrato desejado</li>
              <li>3. Clique em <strong>"Editar"</strong></li>
              <li>4. Role até a seção "Documentos"</li>
              <li>5. Clique em <strong>"Adicionar documento"</strong> ou arraste arquivos</li>
              <li>6. Clique em <strong>"Salvar alterações"</strong></li>
            </ol>
            <p className="mt-2 mb-0">
              <strong>Formatos aceitos:</strong> PDF, DOC, DOCX, XLS, XLSX, JPG, PNG<br/>
              <strong>Tamanho máximo:</strong> 10MB por arquivo
            </p>
          </div>
        </details>

        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="text-gray-900 cursor-pointer">
            <strong>❓ Qual a diferença entre Gestor e Fiscal de contrato?</strong>
          </summary>
          <div className="text-gray-600 text-sm mt-2 mb-0">
            <ul className="space-y-2">
              <li>
                <strong>Gestor de Contrato:</strong> Responsável pela gestão administrativa 
                do contrato, incluindo acompanhamento de prazos, renovações, aditivos e 
                documentação.
              </li>
              <li>
                <strong>Fiscal de Contrato:</strong> Responsável pela fiscalização técnica 
                da execução do contrato, verificando se os serviços/produtos estão sendo 
                entregues conforme especificado.
              </li>
            </ul>
            <p className="mt-2 mb-0">
              Ambos recebem alertas de vencimento e podem ser a mesma pessoa.
            </p>
          </div>
        </details>

        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="text-gray-900 cursor-pointer">
            <strong>❓ Como renovo um contrato?</strong>
          </summary>
          <div className="text-gray-600 text-sm mt-2 mb-0">
            <p className="mb-2">Para renovar um contrato:</p>
            <ol className="space-y-1">
              <li>1. Acesse o contrato que será renovado</li>
              <li>2. Clique em <strong>"Editar"</strong></li>
              <li>3. Atualize a <strong>data de término</strong> para a nova data</li>
              <li>4. Se houver alteração de valor, atualize o <strong>valor total</strong></li>
              <li>5. Adicione nas <strong>observações</strong> informações sobre a renovação</li>
              <li>6. Faça upload do <strong>termo aditivo</strong> de renovação</li>
              <li>7. Clique em <strong>"Salvar alterações"</strong></li>
            </ol>
          </div>
        </details>

        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="text-gray-900 cursor-pointer">
            <strong>❓ Posso exportar a lista de contratos?</strong>
          </summary>
          <p className="text-gray-600 text-sm mt-2 mb-0">
            Sim! Acesse <strong>"Relatórios"</strong> no menu superior, selecione o tipo de 
            relatório desejado, configure os filtros e clique em <strong>"Exportar"</strong>. 
            Você pode exportar em Excel (.xlsx), PDF (.pdf) ou CSV (.csv).
          </p>
        </details>

        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="text-gray-900 cursor-pointer">
            <strong>❓ Como altero minha foto de perfil?</strong>
          </summary>
          <div className="text-gray-600 text-sm mt-2 mb-0">
            <ol className="space-y-1">
              <li>1. Acesse <strong>"Administração do sistema"</strong> → <strong>"Gerenciar usuários"</strong></li>
              <li>2. Clique na aba <strong>"Meu Perfil"</strong></li>
              <li>3. Clique no <strong>ícone da câmera</strong> sobre o avatar</li>
              <li>4. Selecione uma imagem (JPG, PNG, GIF - máx 5MB)</li>
              <li>5. A foto será carregada automaticamente</li>
              <li>6. Sua foto aparecerá no cabeçalho do sistema</li>
            </ol>
          </div>
        </details>

        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="text-gray-900 cursor-pointer">
            <strong>❓ Quantos dias antes do vencimento o sistema envia alerta?</strong>
          </summary>
          <p className="text-gray-600 text-sm mt-2 mb-0">
            O sistema começa a emitir alertas quando o contrato tem <strong>90 dias ou menos</strong> 
            para vencer. Os alertas aparecem no painel de alertas e são enviados por e-mail 
            para o gestor, fiscal e administradores.
          </p>
        </details>

        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="text-gray-900 cursor-pointer">
            <strong>❓ O sistema funciona em celular/tablet?</strong>
          </summary>
          <p className="text-gray-600 text-sm mt-2 mb-0">
            Sim! O ContratosJardim é <strong>responsivo</strong> e funciona em qualquer 
            dispositivo (computador, tablet ou smartphone). Porém, para melhor experiência 
            e acesso a todas as funcionalidades, recomendamos o uso em computadores.
          </p>
        </details>

        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="text-gray-900 cursor-pointer">
            <strong>❓ Preciso de suporte técnico. Com quem falo?</strong>
          </summary>
          <div className="text-gray-600 text-sm mt-2 mb-0">
            <p className="mb-2">
              Entre em contato com a Controladoria Geral do Município (CGM):
            </p>
            <ul className="space-y-1">
              <li>📧 <strong>E-mail:</strong> controleinterno@jardim.ce.gov.br</li>
              <li>👤 <strong>Responsável:</strong> Equipe CGM (Controladoria Geral)</li>
            </ul>
          </div>
        </details>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <HelpCircle className="size-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="text-green-900 mb-1">💬 Não encontrou sua dúvida?</h4>
            <p className="text-green-800 text-sm mb-0">
              Entre em contato com o suporte através do e-mail 
              <code className="text-sm"> controleinterno@jardim.ce.gov.br</code>. 
              Teremos prazer em ajudá-lo!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
