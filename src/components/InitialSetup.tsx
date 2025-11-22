import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { CheckCircle } from 'lucide-react';
import { createClient } from '../utils/supabase/client';
import { localStore } from '../utils/localStore';

interface InitialSetupProps {
  onSetupComplete: () => void;
}

export function InitialSetup({ onSetupComplete }: InitialSetupProps) {
  const [name, setName] = useState('Administrador');
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      
      // Create auth user in Supabase
      const { data, error } = await supabase.auth.signUp({
        email: 'admin@jardim.ce.gov.br',
        password: password,
        options: {
          data: {
            name: name,
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
        email: 'admin@jardim.ce.gov.br',
        name: name,
        role: 'admin',
        createdAt: new Date().toISOString(),
      });

      toast.success('Administrador criado com sucesso! Você já pode fazer login.');
      onSetupComplete();
    } catch (error: any) {
      console.error('Setup error:', error);
      toast.error(error.message || 'Erro ao criar administrador');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-green-700 mb-2">ContratosJardim</h1>
            <p className="text-gray-600">Sistema de Gestão de Contratos</p>
            <p className="text-gray-500 text-sm mt-1">Prefeitura Municipal de Jardim - CE</p>
          </div>
        </div>
      </div>

      {/* Setup Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 shadow-xl">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="mb-2">Configuração Inicial</h2>
            <p className="text-gray-600 text-sm">
              Crie o primeiro administrador do sistema
            </p>
          </div>

          <form onSubmit={handleSetup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o nome completo"
                required
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Usuário</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin"
                required
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin"
                required
                minLength={5}
                disabled
              />
              <p className="text-xs text-gray-500">Usuário: admin / Senha: admin</p>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Criando...' : 'Criar Administrador'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Importante:</strong> Este será o administrador principal do sistema,
                vinculado à CGM. Após a criação, você poderá adicionar outros usuários.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Prefeitura Municipal de Jardim - CE
          </p>
        </div>
      </div>
    </div>
  );
}