import { useState } from 'react';
import { X, Users, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { UserManagement } from './UserManagement';
import { SystemSettings } from './SystemSettings';

interface AdminPanelProps {
  accessToken: string;
  onClose: () => void;
  embedded?: boolean;
}

type TabType = 'users' | 'settings';

export function AdminPanel({ accessToken, onClose, embedded = false }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('users');

  const content = (
    <div className="flex flex-col">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-green-800">Painel de Administração</h2>
            <p className="text-gray-600 text-sm mt-1">
              Gerencie usuários, configurações e comportamento do sistema
            </p>
          </div>
          {!embedded && (
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4 border-b -mb-px">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'users'
                ? 'border-green-600 text-green-700'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Gerenciar Usuários
            </div>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-green-600 text-green-700'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configurações do Sistema
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'users' && (
          <div className="p-6">
            <UserManagement accessToken={accessToken} onClose={onClose} embedded />
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="p-6">
            <SystemSettings accessToken={accessToken} />
          </div>
        )}
      </div>

      {/* Footer */}
      {!embedded && (
        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <Button onClick={onClose} variant="outline">
            Fechar
          </Button>
        </div>
      )}
    </div>
  );

  // If embedded in page, return without modal wrapper
  if (embedded) {
    return content;
  }

  // Otherwise return with modal wrapper
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col">
        {content}
      </div>
    </div>
  );
}