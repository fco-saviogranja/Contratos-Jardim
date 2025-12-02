import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Home, FileText, FolderOpen, Bell, BarChart3, Users, Settings, Layout, Sliders, ChevronDown, Building2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { alertas as alertasAPI } from '../../utils/api';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { user } = useAuth();
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [alertasPendentes, setAlertasPendentes] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Função para verificar se o usuário é admin
  const isUserAdmin = useMemo(() => {
    if (!user) {
      console.log('❌ [NAVIGATION] Não há usuário logado');
      return false;
    }
    
    const perfil = user.perfil?.trim() || '';
    const isAdmin = perfil === 'admin' || 
                   perfil === 'Administrador CGM' || 
                   perfil.toLowerCase() === 'administrador cgm' ||
                   perfil.toLowerCase() === 'admin';
    
    console.log('🔍 [NAVIGATION] Verificação de admin:');
    console.log('   Perfil:', perfil);
    console.log('   É admin?', isAdmin);
    
    return isAdmin;
  }, [user?.perfil]);

  // Debug: verificar perfil do usuário
  useEffect(() => {
    if (user) {
      console.log('🔍 [NAVIGATION DEBUG] Perfil do usuário:', user.perfil);
      console.log('🔍 [NAVIGATION DEBUG] É admin?', isUserAdmin);
    }
  }, [user, isUserAdmin]);

  // Carregar alertas pendentes
  useEffect(() => {
    const carregarAlertas = async () => {
      try {
        const response = await alertasAPI.getAll();
        if (response.success && response.alertas) {
          // Contar apenas alertas pendentes (não lidos ou não resolvidos)
          const pendentes = response.alertas.filter(
            (a: any) => a.status === 'pendente' || !a.status || !a.lido
          ).length;
          setAlertasPendentes(pendentes);
        }
      } catch (error) {
        console.warn('⚠️ Erro ao carregar alertas para navegação:', error);
        // Se houver erro, não mostrar badge
        setAlertasPendentes(0);
      }
    };

    carregarAlertas();
    
    // Atualizar a cada 60 segundos
    const interval = setInterval(carregarAlertas, 60000);
    return () => clearInterval(interval);
  }, []);

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
    if (!user) {
      return false;
    }
    
    switch (itemId) {
      case 'usuarios':
      case 'secretarias':
      case 'parametros':
      case 'aparencia':
      case 'configuracoes':
        // Apenas admin vê opções de administração
        return isUserAdmin;
      
      default:
        // Todos os outros itens são visíveis para todos
        return true;
    }
  };

  const mainItems = useMemo(() => [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'todos-contratos', label: 'Contratos', icon: FolderOpen },
    { id: 'alertas', label: 'Alertas e prazos', icon: Bell, badge: alertasPendentes },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 }
  ].filter(item => canViewItem(item.id)), [user, isUserAdmin, alertasPendentes]);

  const adminItems = useMemo(() => [
    { id: 'usuarios', label: 'Gerenciar usuários', icon: Users },
    { id: 'secretarias', label: 'Gerenciar secretarias', icon: Building2 },
    { id: 'parametros', label: 'Parâmetros e perfis', icon: Settings },
    { id: 'aparencia', label: 'Aparência e layout', icon: Layout },
    { id: 'configuracoes', label: 'Configurações gerais', icon: Sliders }
  ].filter(item => canViewItem(item.id)), [user, isUserAdmin]);

  // Debug: verificar adminItems
  useEffect(() => {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🔍 [NAVIGATION] STATUS DO MENU DE ADMINISTRAÇÃO');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('👤 Usuário logado:', user?.nome || 'Nenhum');
    console.log('📧 Email:', user?.email || 'N/A');
    console.log('👔 Perfil:', user?.perfil || 'N/A');
    console.log('🔐 É administrador?', isUserAdmin ? '✅ SIM' : '❌ NÃO');
    console.log('📋 Itens de administração:', adminItems.length);
    console.log('📊 Menu visível?', adminItems.length > 0 ? '✅ SIM' : '❌ NÃO');
    if (adminItems.length > 0) {
      console.log('📝 Itens disponíveis:');
      adminItems.forEach(item => {
        console.log(`   - ${item.label}`);
      });
    } else {
      console.warn('⚠️ MENU DE ADMINISTRAÇÃO NÃO APARECERÁ!');
      console.warn('💡 Verifique se o perfil está como "Administrador CGM"');
    }
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
  }, [adminItems.length, user, isUserAdmin, adminItems]);

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
        {item.badge !== undefined && item.badge > 0 && (
          <span className="bg-[#f0f4f8] rounded-full px-1.5 text-gray-600 text-xs">
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  const isAdminPageActive = adminItems.some(item => item.id === currentPage);

  return (
    <div className="bg-[#0a4e33] w-full overflow-visible">
      <div className="px-4 md:px-8 py-2 overflow-visible">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide" style={{ overflowY: 'visible' }}>
          {/* Itens principais */}
          {mainItems.map(item => (
            <NavItem key={item.id} item={item} />
          ))}

          {/* Administração do sistema (dropdown) */}
          {adminItems.length > 0 && (
            <div className="relative flex-shrink-0 static sm:relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  console.log('');
                  console.log('🖱️ [NAVIGATION] Botão de administração clicado!');
                  console.log('   Estado atual do dropdown:', showAdminDropdown);
                  console.log('   Novo estado do dropdown:', !showAdminDropdown);
                  console.log('   Número de itens:', adminItems.length);
                  console.log('');
                  setShowAdminDropdown(!showAdminDropdown);
                }}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  isAdminPageActive
                    ? 'bg-[#0d612f]' 
                    : 'hover:bg-[#0d612f]/50'
                }`}
              >
                <Settings className="size-4 text-[#e6f7ee]" />
                <span className="text-[#e6f7ee] text-sm hidden sm:inline">
                  Administração do sistema
                </span>
                <span className="text-[#e6f7ee] text-sm sm:hidden">
                  Admin
                </span>
                <ChevronDown className={`size-4 text-[#e6f7ee] transition-transform ${showAdminDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showAdminDropdown && (
                <div 
                  className="fixed sm:absolute top-auto sm:top-full left-0 sm:left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[240px]"
                  style={{ 
                    zIndex: 99999,
                    position: 'fixed',
                    top: dropdownRef.current ? `${dropdownRef.current.getBoundingClientRect().bottom + 4}px` : 'auto',
                    left: dropdownRef.current ? `${dropdownRef.current.getBoundingClientRect().left}px` : 'auto',
                  }}
                >
                  {(() => {
                    console.log('');
                    console.log('📋 [NAVIGATION] DROPDOWN ABERTO!');
                    console.log('   Renderizando', adminItems.length, 'itens:');
                    adminItems.forEach(item => {
                      console.log('   -', item.label);
                    });
                    console.log('');
                    return adminItems.map(item => {
                      const Icon = item.icon;
                      const isActive = currentPage === item.id;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            console.log('🖱️ [NAVIGATION] Item clicado:', item.label);
                            onNavigate(item.id);
                            setShowAdminDropdown(false);
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
                    });
                  })()}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}