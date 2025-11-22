import { FileText, AlertTriangle, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Contract {
  id: string;
  numero: string;
  objeto: string;
  fornecedor: string;
  valor: number;
  dataInicio: string;
  dataVencimento: string;
  status: string;
  observacoes: string;
  gestorNome: string;
}

interface ContractsTableProps {
  contracts: Contract[];
  onEdit: (contract: Contract) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

export function ContractsTable({ contracts, onEdit, onDelete, isAdmin }: ContractsTableProps) {
  const getContractStatus = (dataVencimento: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const vencimento = new Date(dataVencimento);
    vencimento.setHours(0, 0, 0, 0);
    
    const diffTime = vencimento.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { label: 'Vencido', variant: 'danger', days: Math.abs(diffDays) };
    } else if (diffDays <= 30) {
      return { label: 'Vence em Breve', variant: 'warning', days: diffDays };
    } else {
      return { label: 'Vigente', variant: 'success', days: diffDays };
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  if (contracts.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-12 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Nenhum contrato encontrado</p>
        <p className="text-gray-500 text-sm mt-2">
          Clique em "Novo Contrato" para adicionar o primeiro contrato
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Número</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Objeto</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Fornecedor</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Valor</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Vencimento</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Situação</th>
              {isAdmin && (
                <th className="px-4 py-3 text-left text-sm text-gray-600">Gestor</th>
              )}
              <th className="px-4 py-3 text-right text-sm text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {contracts.map((contract) => {
              const status = getContractStatus(contract.dataVencimento);
              
              return (
                <tr key={contract.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-sm">{contract.numero}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="max-w-xs">
                      <p className="text-sm truncate" title={contract.objeto}>
                        {contract.objeto}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{contract.fornecedor || '-'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm">{formatCurrency(contract.valor)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm">{formatDate(contract.dataVencimento)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {status.variant === 'danger' && (
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      )}
                      {status.variant === 'warning' && (
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      )}
                      {status.variant === 'success' && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                      <div className="flex flex-col">
                        <Badge
                          variant={
                            status.variant === 'danger' ? 'destructive' :
                            status.variant === 'warning' ? 'default' :
                            'secondary'
                          }
                          className={
                            status.variant === 'warning' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : ''
                          }
                        >
                          {status.label}
                        </Badge>
                        <span className="text-xs text-gray-500 mt-1">
                          {status.variant === 'danger' 
                            ? `${status.days} dia${status.days !== 1 ? 's' : ''} vencido${status.days !== 1 ? 's' : ''}`
                            : `${status.days} dia${status.days !== 1 ? 's' : ''}`
                          }
                        </span>
                      </div>
                    </div>
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{contract.gestorNome}</span>
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(contract)}
                        className="hover:bg-blue-50"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (confirm('Tem certeza que deseja excluir este contrato?')) {
                            onDelete(contract.id);
                          }
                        }}
                        className="hover:bg-red-50 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
