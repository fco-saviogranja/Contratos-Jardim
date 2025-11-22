import { LogOut, Home, FileText, Settings, Circle } from 'lucide-react';
import { Button } from './ui/button';
import logoJardim from 'figma:asset/b107e2f7d442a296b9b47ab7656cc4c84e4300b6.png';

interface HeaderProps {
  userName?: string;
  userRole?: string;
  onLogout: () => void;
  currentPage?: 'dashboard' | 'contratos' | 'administracao';
  onNavigate?: (page: 'dashboard' | 'contratos' | 'administracao') => void;
}

export function Header({ userName, userRole, onLogout, currentPage = 'dashboard', onNavigate }: HeaderProps) {
  const isAdmin = userRole === 'admin';

  return (
    <header className="sticky top-0 z-50" style={{ 
      '--header-primary': 'var(--primary-color, #16a34a)'
    } as React.CSSProperties}>
      {/* Top Bar - Verde */}
      <div className="text-white" style={{ backgroundColor: 'var(--header-primary)' }}>
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <a 
              href="https://jardim.ce.gov.br/acessoainformacao.php" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity flex items-center gap-1"
            >
              🔗 Transparência
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Circle className="w-2 h-2 fill-green-400 text-green-400" />
              <span>Online</span>
            </div>
            <span>{userName}</span>
            <button onClick={onLogout} className="hover:opacity-80 transition-opacity">
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Main Header - Branco */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo e Nome do Sistema */}
          <div className="flex items-center gap-4">
            <img src={logoJardim} alt="Brasão de Jardim" className="h-12" />
            <div className="flex flex-col">
              <h1 className="transpjardim-title transpjardim-title-medium">ContratosJardim</h1>
              <p className="text-sm text-[var(--jardim-gray)] hidden sm:block">Gestão de Contratos Municipal</p>
            </div>
          </div>

          {/* Menu de Navegação */}
          <nav className="flex items-center gap-2">
            <Button
              onClick={() => onNavigate?.('dashboard')}
              variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
              className="gap-2"
              style={currentPage === 'dashboard' ? {
                backgroundColor: 'var(--header-primary)',
                color: 'white'
              } : {}}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Button>

            <Button
              onClick={() => onNavigate?.('contratos')}
              variant={currentPage === 'contratos' ? 'default' : 'ghost'}
              className="gap-2"
              style={currentPage === 'contratos' ? {
                backgroundColor: 'var(--header-primary)',
                color: 'white'
              } : {}}
            >
              <FileText className="w-4 h-4" />
              Contratos
            </Button>

            {isAdmin && (
              <Button
                onClick={() => onNavigate?.('administracao')}
                variant={currentPage === 'administracao' ? 'default' : 'ghost'}
                className="gap-2"
                style={currentPage === 'administracao' ? {
                  backgroundColor: 'var(--header-primary)',
                  color: 'white'
                } : {}}
              >
                <Settings className="w-4 h-4" />
                Administração
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}