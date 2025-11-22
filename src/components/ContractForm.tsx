import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Contract {
  id?: string;
  numero: string;
  objeto: string;
  fornecedor: string;
  valor: number;
  dataInicio: string;
  dataVencimento: string;
  status: string;
  observacoes: string;
}

interface ContractFormProps {
  contract?: Contract | null;
  onSubmit: (contract: Omit<Contract, 'id'>) => Promise<void>;
  onCancel: () => void;
}

export function ContractForm({ contract, onSubmit, onCancel }: ContractFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Contract, 'id'>>({
    numero: contract?.numero || '',
    objeto: contract?.objeto || '',
    fornecedor: contract?.fornecedor || '',
    valor: contract?.valor || 0,
    dataInicio: contract?.dataInicio || new Date().toISOString().split('T')[0],
    dataVencimento: contract?.dataVencimento || '',
    status: contract?.status || 'vigente',
    observacoes: contract?.observacoes || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof Omit<Contract, 'id'>, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2>{contract ? 'Editar Contrato' : 'Novo Contrato'}</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numero">Número do Contrato *</Label>
              <Input
                id="numero"
                value={formData.numero}
                onChange={(e) => handleChange('numero', e.target.value)}
                placeholder="Ex: 001/2025"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vigente">Vigente</SelectItem>
                  <SelectItem value="vencido">Vencido</SelectItem>
                  <SelectItem value="renovado">Renovado</SelectItem>
                  <SelectItem value="encerrado">Encerrado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="objeto">Objeto do Contrato *</Label>
            <Textarea
              id="objeto"
              value={formData.objeto}
              onChange={(e) => handleChange('objeto', e.target.value)}
              placeholder="Descreva o objeto do contrato"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fornecedor">Fornecedor/Contratado</Label>
              <Input
                id="fornecedor"
                value={formData.fornecedor}
                onChange={(e) => handleChange('fornecedor', e.target.value)}
                placeholder="Nome do fornecedor"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                value={formData.valor}
                onChange={(e) => handleChange('valor', parseFloat(e.target.value) || 0)}
                placeholder="0,00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataInicio">Data de Início</Label>
              <Input
                id="dataInicio"
                type="date"
                value={formData.dataInicio}
                onChange={(e) => handleChange('dataInicio', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataVencimento">Data de Vencimento *</Label>
              <Input
                id="dataVencimento"
                type="date"
                value={formData.dataVencimento}
                onChange={(e) => handleChange('dataVencimento', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleChange('observacoes', e.target.value)}
              placeholder="Observações adicionais sobre o contrato"
              rows={3}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? 'Salvando...' : contract ? 'Salvar Alterações' : 'Criar Contrato'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
