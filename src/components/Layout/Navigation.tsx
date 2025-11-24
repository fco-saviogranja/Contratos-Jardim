import React, { useState, useEffect, useRef } from 'react';
import { Home, FileText, FolderOpen, Bell, BarChart3, Users, Settings, Layout, Sliders, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { user } = useAuth();
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAdminDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Função para verificar se o usuário pode ver um item
  const canViewItem = (itemId: string) => {
    if (!user) return false;
    
    switch (itemId) {
      case 'meus-contratos':
        // Apenas gestores e fiscais veem "Meus contratos"
        return user.perfil === 'gestor' || user.perfil === 'fiscal';
      
      case 'todos-contratos':
        // Apenas admin vê "Contratos"
        return user.perfil === 'admin';
      
      case 'usuarios':
      case 'parametros':
      case 'aparencia':
      case 'configuracoes':
        // Apenas admin vê opções de administração
        return user.perfil === 'admin';
      
      default:
        // Todos os outros itens são visíveis para todos
        return true;
    }
  };

  const mainItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'meus-contratos', label: 'Meus contratos', icon: FileText },
    { id: 'todos-contratos', label: 'Contratos', icon: FolderOpen },
    { id: 'alertas', label: 'Alertas e prazos', icon: Bell, badge: 5 },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 }
  ].filter(item => canViewItem(item.id));

  const adminItems = [
    { id: 'usuarios', label: 'Gerenciar usuários', icon: Users },
    { id: 'parametros', label: 'Parâmetros e perfis', icon: Settings },
    { id: 'aparencia', label: 'Aparência e layout', icon: Layout },
    { id: 'configuracoes', label: 'Configurações gerais', icon: Sliders }
  ].filter(item => canViewItem(item.id));

  const NavItem = ({ item }: { item: typeof mainItems[0] }) => {
    const Icon = item.icon;
    const isActive = currentPage === item.id;
    
    return (
      <button
        onClick={() => onNavigate(item.id)}
        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-colors ${
          isActive 
            ? 'bg-[#0d612f]' 
            : 'hover:bg-[#0d612f]/50'
        }`}
      >
        <Icon className="size-4 text-[#e6f7ee]" />
        <span className="text-[#e6f7ee] text-sm whitespace-nowrap">
          {item.label}
        </span>
        {item.badge && (
          <span className="bg-[#f0f4f8] rounded-full px-1.5 text-gray-600 text-xs">
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  const isAdminPageActive = adminItems.some(item => item.id === currentPage);

  return (
    <div className="bg-[#0a4e33] w-full">
      <div className="px-8 py-2">
        <div className="flex items-center gap-1">
          {/* Itens principais */}
          {mainItems.map(item => (
            <NavItem key={item.id} item={item} />
          ))}

          {/* Administração do sistema (dropdown) */}
          {adminItems.length > 0 && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-md transition-colors cursor-pointer ${
                  isAdminPageActive
                    ? 'bg-[#0d612f]' 
                    : 'hover:bg-[#0d612f]/50'
                }`}
              >
                <Settings className="size-4 text-[#e6f7ee]" />
                <span className="text-[#e6f7ee] text-sm whitespace-nowrap">
                  Administração do sistema
                </span>
                <ChevronDown className={`size-4 text-[#e6f7ee] ml-auto transition-transform ${showAdminDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showAdminDropdown && (
                <div 
                  className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[240px]"
                >
                  {adminItems.map(item => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate(item.id);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          isActive
                            ? 'bg-green-50 text-[#0b6b3a]'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className={`size-4 ${isActive ? 'text-[#0b6b3a]' : 'text-gray-600'}`} />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}