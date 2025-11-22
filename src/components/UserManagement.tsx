import { useState, useEffect } from 'react';
import { Plus, Users, Shield, User as UserIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { createClient } from '../utils/supabase/client';
import { localStore } from '../utils/localStore';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'gestor';
  createdAt: string;
}

interface UserManagementProps {
  accessToken: string;
  onClose: () => void;
  embedded?: boolean;
}

export function UserManagement({ accessToken, onClose, embedded = false }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'gestor' as 'admin' | 'gestor'
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      // Load users from localStorage
      const allUsers = localStore.getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const supabase = createClient();
      
      // Convert username to email format
      const userEmail = formData.email.includes('@') 
        ? formData.email 
        : `${formData.email}@jardim.ce.gov.br`;
      
      // Create auth user in Supabase
      const { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error('Erro ao criar usuário');
      }

      // Store user profile in localStorage
      localStore.setUser(data.user.id, {
        id: data.user.id,
        email: userEmail,
        name: formData.name,
        role: formData.role,
        createdAt: new Date().toISOString(),
      });

      toast.success('Usuário criado com sucesso!');
      setFormData({ name: '', email: '', password: '', role: 'gestor' });
      setShowForm(false);
      loadUsers();
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error(error.message || 'Erro ao criar usuário');
    }
  };

  const handleChangeRole = async (userId: string, newRole: 'admin' | 'gestor') => {
    try {
      // Update role in localStorage
      const user = localStore.getUser(userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      localStore.setUser(userId, {
        ...user,
        role: newRole,
      });

      toast.success('Função atualizada com sucesso!');
      loadUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Erro ao atualizar função');
    }
  };

  const content = (
    <div className="space-y-6">
      {/* Add User Button */}
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 gap-2"
        >
          <Plus className="w-4 h-4" />
          Adicionar Usuário
        </Button>
      )}

      {/* Add User Form */}
      {showForm && (
        <Card className="p-6 border-2 border-green-200">
          <h3 className="mb-4">Novo Usuário</h3>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Usuário</Label>
                <Input
                  id="email"
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="usuario"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Função</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: 'admin' | 'gestor') => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gestor">Gestor de Contratos</SelectItem>
                    <SelectItem value="admin">Administrador - CGM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Criar Usuário
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ name: '', email: '', password: '', role: 'gestor' });
                }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Users List */}
      <div>
        <h3 className="mb-4">Usuários Cadastrados</h3>
        {loading ? (
          <div className="text-center py-8 text-gray-600">
            Carregando usuários...
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            Nenhum usuário encontrado
          </div>
        ) : (
          <div className="grid gap-4">
            {users.map((user) => (
              <Card key={user.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      {user.role === 'admin' ? (
                        <Shield className="w-6 h-6 text-green-600" />
                      ) : (
                        <UserIcon className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p>{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select
                      value={user.role}
                      onValueChange={(value: 'admin' | 'gestor') => handleChangeRole(user.id, value)}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gestor">Gestor de Contratos</SelectItem>
                        <SelectItem value="admin">Administrador - CGM</SelectItem>
                      </SelectContent>
                    </Select>
                    <Badge
                      variant={user.role === 'admin' ? 'default' : 'secondary'}
                      className={user.role === 'admin' ? 'bg-green-600' : ''}
                    >
                      {user.role === 'admin' ? 'Admin' : 'Gestor'}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // If embedded, return only the content without modal wrapper
  if (embedded) {
    return content;
  }

  // Otherwise, return with modal wrapper
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-green-600" />
            <div>
              <h2>Gerenciamento de Usuários</h2>
              <p className="text-sm text-gray-600">Administre usuários do sistema</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Fechar
          </button>
        </div>

        <div className="p-6">
          {content}
        </div>
      </div>
    </div>
  );
}