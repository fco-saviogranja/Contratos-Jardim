import React from 'react';
import { Shield, Users, Eye, Edit } from 'lucide-react';

export function ParametrosPerfis() {
  const perfis = [
    {
      id: 'admin',
      nome: 'Administrador (CGM)',
      icon: Shield,
      cor: 'text-red-600',
      bgCor: 'bg-red-50',
      descricao: 'Gestão global do sistema',
      permissoes: [
        'Acesso total a contratos de todas as secretarias',
        'Gerenciamento de usuários e perfis',
        'Configuração de parâmetros do sistema',
        'Exportação de relatórios consolidados',
        'Auditoria e logs de sistema'
      ]
    },
    {
      id: 'gestor',
      nome: 'Gestor de Contratos',
      icon: Users,
      cor: 'text-blue-600',
      bgCor: 'bg-blue-50',
      descricao: 'Gestão na unidade vinculada',
      permissoes: [
        'Cadastro e edição de contratos da própria secretaria',
        'Registro de providências e ações',
        'Designação de fiscais',
        'Visualização de alertas e prazos',
        'Exportação de relatórios da secretaria'
      ]
    },
    {
      id: 'fiscal',
      nome: 'Fiscal de Contratos',
      icon: Eye,
      cor: 'text-green-600',
      bgCor: 'bg-green-50',
      descricao: 'Fiscalização técnica',
      permissoes: [
        'Visualização de contratos designados',
        'Registro de ocorrências e fiscalizações',
        'Inclusão de anexos e documentos',
        'Acompanhamento de execução',
        'Notificações de irregularidades'
      ]
    }
  ];

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-[#102a43] text-2xl mb-1 font-medium">
          Parâmetros e perfis
        </h1>
        <p className="text-gray-600 text-sm">
          Configuração de perfis de acesso e parâmetros de alerta do sistema.
        </p>
      </div>

      {/* Perfis de acesso */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#102a43] text-lg font-medium">
            Perfis de acesso
          </h2>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-[#102a43] text-sm hover:bg-gray-50 flex items-center gap-2 font-medium">
            <Edit className="size-4" />
            Editar perfis
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {perfis.map(perfil => {
            const Icon = perfil.icon;
            return (
              <div key={perfil.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className={`${perfil.bgCor} px-4 py-3 flex items-center gap-3`}>
                  <Icon className={`size-5 ${perfil.cor}`} />
                  <div>
                    <h3 className="text-[#102a43] font-medium">
                      {perfil.nome}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {perfil.descricao}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-3 font-medium">
                    Permissões:
                  </p>
                  <ul className="space-y-2">
                    {perfil.permissoes.map((permissao, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="bg-green-100 rounded-full size-4 flex items-center justify-center mt-0.5 shrink-0">
                          <div className="bg-green-600 rounded-full size-2" />
                        </div>
                        <span className="text-gray-600 text-sm">
                          {permissao}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Parâmetros de alertas */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[#102a43] text-lg mb-1 font-medium">
              Parâmetros de alertas e prazos
            </h2>
            <p className="text-gray-600 text-sm">
              Define quando os alertas são disparados e para quem.
            </p>
          </div>
          <button className="px-4 py-2 bg-[#0b6b3a] text-white rounded-md text-sm hover:bg-[#0a5a31] flex items-center gap-2 font-medium">
            <Edit className="size-4" />
            Editar parâmetros de alertas
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 text-sm font-medium">
                  Alerta de vencimento
                </span>
                <span className="text-[#0b6b3a] font-medium">
                  30 dias
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Notifica quando o contrato estiver próximo do vencimento
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 text-sm font-medium">
                  Alerta crítico de vencimento
                </span>
                <span className="text-red-600 font-medium">
                  7 dias
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Alerta urgente quando faltam poucos dias para vencer
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 text-sm font-medium">
                  Alerta de renovação/aditivo
                </span>
                <span className="text-[#0b6b3a] font-medium">
                  60 dias
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Lembra de iniciar processo de renovação ou aditamento
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-gray-700 text-sm mb-3 font-medium">
                Canais de notificação
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="size-4 text-[#0b6b3a] rounded"
                  />
                  <span className="text-gray-600 text-sm">
                    Painel interno do sistema
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="size-4 text-[#0b6b3a] rounded"
                  />
                  <span className="text-gray-600 text-sm">
                    E-mail institucional
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="size-4 text-[#0b6b3a] rounded"
                  />
                  <span className="text-gray-600 text-sm">
                    SMS (em desenvolvimento)
                  </span>
                </label>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-gray-700 text-sm mb-3 font-medium">
                Destinatários
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="size-4 text-[#0b6b3a] rounded"
                  />
                  <span className="text-gray-600 text-sm">
                    Gestor responsável
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="size-4 text-[#0b6b3a] rounded"
                  />
                  <span className="text-gray-600 text-sm">
                    Fiscal designado
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="size-4 text-[#0b6b3a] rounded"
                  />
                  <span className="text-gray-600 text-sm">
                    Administradores (CGM)
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
