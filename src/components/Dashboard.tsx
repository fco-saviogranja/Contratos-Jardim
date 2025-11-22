import { useState, useEffect } from 'react';
import { Plus, FileText, AlertTriangle, CheckCircle, Clock, Settings } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { StatsCard } from './StatsCard';
import { ContractsTable } from './ContractsTable';
import { ContractForm } from './ContractForm';
import { AdminPanel } from './AdminPanel';
import { StatusLegend } from './StatusLegend';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { createClient } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';
import { localStore } from '../utils/localStore';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'gestor';
}

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
  gestorId: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [accessToken, setAccessToken] = useState<string>('');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'contratos' | 'administracao'>('dashboard');

  useEffect(() => {
    initSession();
  }, []);

  const initSession = async () => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.access_token) {
      setAccessToken(session.access_token);
      loadContracts(session.access_token);
    } else {
      setLoading(false);
      toast.error('Sessão expirada. Por favor, faça login novamente.');
      onLogout();
    }
  };

  const loadContracts = async (token: string) => {
    setLoading(true);
    try {
      // Load contracts from localStorage
      const allContracts = localStore.getAllContracts();
      
      // Filter based on user role
      if (user.role === 'admin') {
        setContracts(allContracts);
      } else {
        // Gestores only see their own contracts
        setContracts(allContracts.filter(c => c.gestorId === user.id));
      }
    } catch (error) {
      console.error('Error loading contracts:', error);
      toast.error('Erro ao carregar contratos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateContract = async (contractData: Omit<Contract, 'id' | 'gestorNome' | 'gestorId'>) => {
    try {
      const contractId = crypto.randomUUID();
      
      const newContract: Contract = {
        ...contractData,
        id: contractId,
        gestorId: user.id,
        gestorNome: user.name,
      };

      // Save to localStorage
      localStore.setContract(contractId, {
        ...newContract,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      setContracts([...contracts, newContract]);
      setShowForm(false);
      toast.success('Contrato criado com sucesso!');
    } catch (error) {
      console.error('Error creating contract:', error);
      toast.error('Erro ao criar contrato');
      throw error;
    }
  };

  const handleUpdateContract = async (contractData: Omit<Contract, 'id' | 'gestorNome' | 'gestorId'>) => {
    if (!editingContract) return;

    try {
      const updatedContract: Contract = {
        ...editingContract,
        ...contractData,
      };

      // Update in localStorage
      localStore.setContract(editingContract.id, {
        ...updatedContract,
        updatedAt: new Date().toISOString(),
      });

      setContracts(contracts.map(c => c.id === editingContract.id ? updatedContract : c));
      setShowForm(false);
      setEditingContract(null);
      toast.success('Contrato atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating contract:', error);
      toast.error('Erro ao atualizar contrato');
      throw error;
    }
  };

  const handleDeleteContract = async (id: string) => {
    try {
      // Delete from localStorage
      localStore.deleteContract(id);
      
      setContracts(contracts.filter(c => c.id !== id));
      toast.success('Contrato excluído com sucesso!');
    } catch (error) {
      console.error('Error deleting contract:', error);
      toast.error('Erro ao excluir contrato');
    }
  };

  const getStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const total = contracts.length;
    
    const vencidos = contracts.filter(c => {
      const vencimento = new Date(c.dataVencimento);
      vencimento.setHours(0, 0, 0, 0);
      return vencimento < today;
    }).length;

    const aVencer = contracts.filter(c => {
      const vencimento = new Date(c.dataVencimento);
      vencimento.setHours(0, 0, 0, 0);
      const diffTime = vencimento.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 30;
    }).length;

    const vigentes = contracts.filter(c => {
      const vencimento = new Date(c.dataVencimento);
      vencimento.setHours(0, 0, 0, 0);
      const diffTime = vencimento.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 30;
    }).length;

    return { total, vencidos, aVencer, vigentes };
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = 
      contract.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.objeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.fornecedor.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'all') return matchesSearch;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const vencimento = new Date(contract.dataVencimento);
    vencimento.setHours(0, 0, 0, 0);
    const diffTime = vencimento.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (filterStatus === 'vencido') {
      return matchesSearch && diffDays < 0;
    } else if (filterStatus === 'avencer') {
      return matchesSearch && diffDays >= 0 && diffDays <= 30;
    } else if (filterStatus === 'vigente') {
      return matchesSearch && diffDays > 30;
    }

    return matchesSearch;
  });

  const handleNavigate = (page: 'dashboard' | 'contratos' | 'administracao') => {
    setCurrentPage(page);
    if (page === 'administracao') {
      setShowAdminPanel(true);
    } else {
      setShowAdminPanel(false);
    }
  };

  const stats = getStats();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        userName={user.name} 
        userRole={user.role} 
        onLogout={onLogout}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Dashboard View */}
        {currentPage === 'dashboard' && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatsCard
                title="Total de Contratos"
                value={stats.total}
                icon={FileText}
                variant="default"
              />
              <StatsCard
                title="Vigentes"
                value={stats.vigentes}
                icon={CheckCircle}
                variant="success"
              />
              <StatsCard
                title="Vencem em 30 dias"
                value={stats.aVencer}
                icon={Clock}
                variant="warning"
              />
              <StatsCard
                title="Vencidos"
                value={stats.vencidos}
                icon={AlertTriangle}
                variant="danger"
              />
            </div>

            {/* Quick Summary */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-green-800 mb-4">Visão Geral do Sistema</h2>
              <p className="text-gray-600">
                Bem-vindo ao ContratosJardim. Use o menu acima para navegar entre as diferentes seções do sistema.
              </p>
            </div>
          </>
        )}

        {/* Contratos View */}
        {currentPage === 'contratos' && (
          <>
            {/* Filters and Actions */}
            <div className="bg-white rounded-lg border p-4 mb-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                  <Input
                    placeholder="Buscar por número, objeto ou fornecedor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="md:w-48">
                      <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os contratos</SelectItem>
                      <SelectItem value="vigente">Vigentes</SelectItem>
                      <SelectItem value="avencer">A vencer (30 dias)</SelectItem>
                      <SelectItem value="vencido">Vencidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => {
                      setEditingContract(null);
                      setShowForm(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 gap-2 flex-1 sm:flex-initial"
                  >
                    <Plus className="w-4 h-4" />
                    Novo Contrato
                  </Button>
                </div>
              </div>
            </div>

            {/* Contracts Table */}
            {loading ? (
              <div className="bg-white rounded-lg border p-12 text-center">
                <p className="text-gray-600">Carregando contratos...</p>
              </div>
            ) : (
              <>
                {/* Status Legend */}
                <div className="mb-4">
                  <StatusLegend />
                </div>
                
                <ContractsTable
                  contracts={filteredContracts}
                  onEdit={(contract) => {
                    setEditingContract(contract);
                    setShowForm(true);
                  }}
                  onDelete={handleDeleteContract}
                  isAdmin={user.role === 'admin'}
                />
              </>
            )}
          </>
        )}

        {/* Administração View */}
        {currentPage === 'administracao' && user.role === 'admin' && (
          <div className="bg-white rounded-lg border">
            <AdminPanel
              accessToken={accessToken}
              onClose={() => {
                setShowAdminPanel(false);
                setCurrentPage('dashboard');
              }}
              embedded
            />
          </div>
        )}
      </main>

      <Footer />

      {/* Contract Form Modal */}
      {showForm && (
        <ContractForm
          contract={editingContract}
          onSubmit={editingContract ? handleUpdateContract : handleCreateContract}
          onCancel={() => {
            setShowForm(false);
            setEditingContract(null);
          }}
        />
      )}
    </div>
  );
}