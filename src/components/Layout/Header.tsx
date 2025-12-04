import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, Menu, X, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { usuarios as usuariosAPI } from '../../utils/api';
import logoImage from 'figma:asset/600321a23fd1c8706abb2a9ad97f41dade268db0.png';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const { user, logout } = useAuth();
  const [fotoPerfil, setFotoPerfil] = useState<string>(user?.fotoPerfil || '');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Inicializar com a foto do usuário do contexto
    if (user?.fotoPerfil) {
      setFotoPerfil(user.fotoPerfil);
    }
    
    // Carregar foto atualizada do backend
    carregarFotoPerfil();
    
    // Listener para atualizar foto quando houver mudança
    const handleFotoAtualizada = () => {
      carregarFotoPerfil();
    };
    
    window.addEventListener('fotoPerfilAtualizada', handleFotoAtualizada);
    
    return () => {
      window.removeEventListener('fotoPerfilAtualizada', handleFotoAtualizada);
    };
  }, [user]);

  const carregarFotoPerfil = async () => {
    try {
      if (!user) return;
      
      const response = await usuariosAPI.getMe();
      if (response.success && response.usuario) {
        // Atualizar foto no estado local
        setFotoPerfil(response.usuario.fotoPerfil || '');
        
        // IMPORTANTE: Atualizar localStorage com dados completos do usuário
        // Isso garante que na próxima vez que o usuário fizer login, a foto estará lá
        const usuarioAtualizado = {
          ...user,
          ...response.usuario
        };
        localStorage.setItem('user', JSON.stringify(usuarioAtualizado));
      } else {
        // Limpar foto se não houver
        setFotoPerfil('');
      }
    } catch (error) {
      console.log('Erro ao carregar foto de perfil:', error);
      // Não mostra erro para o usuário, apenas não exibe a foto
      setFotoPerfil('');
    }
  };

  const handleMeuPerfil = () => {
    setShowProfileMenu(false);
    setShowMobileMenu(false);
    onNavigate('meu-perfil');
  };

  return (
    <div className="bg-[#0a4e33] w-full">
      <div className="flex items-center justify-between px-4 md:px-8 py-2">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-white p-1.5 md:p-2 rounded-lg">
              <ImageWithFallback 
                src={logoImage}
                alt="ContratosJardim - Gestão de Contratos Municipal"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
          </div>
          <div className="hidden lg:flex border-l border-[rgba(230,247,238,0.2)] pl-4">
            <span className="text-[#e6f7ee] text-sm">
              Sistema Interno de Gestão de Contratos
            </span>
          </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <button
            onClick={() => onNavigate('ajuda')}
            className="text-[#e6f7ee] text-sm hover:underline cursor-pointer flex items-center gap-1"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden lg:inline">Ajuda</span>
          </button>
          
          {/* Profile Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="bg-[#e9f7ee] rounded-lg px-2 lg:px-2.5 py-1.5 flex items-center gap-2 hover:bg-[#d9ede0] transition-colors"
            >
              <div className="size-6 rounded-full bg-gradient-to-br from-[#102a43] to-[#243b53] flex items-center justify-center text-white text-xs font-medium overflow-hidden">
                {fotoPerfil ? (
                  <img 
                    src={fotoPerfil} 
                    alt={user?.nome || 'Usuário'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{user?.nome?.charAt(0)?.toUpperCase() || 'U'}</span>
                )}
              </div>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-[#0b6b3a] text-sm">
                  {user?.nome}
                </span>
                <span className="text-gray-600 text-xs">
                  {user?.perfil === 'admin' || user?.perfil === 'Administrador CGM' ? 'Administrador (CGM)' : 
                   user?.perfil === 'gestor' || user?.perfil === 'Gestor de Contratos' ? 'Gestor de Contratos' : 
                   user?.perfil === 'fiscal' || user?.perfil === 'Fiscal de Contratos' ? 'Fiscal de Contratos' :
                   user?.perfil || 'Usuário'}
                </span>
              </div>
              <ChevronDown className="size-4 text-[#0b6b3a] hidden lg:block" />
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={handleMeuPerfil}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-gray-700 text-sm transition-colors"
                >
                  <User className="size-4" />
                  <div>
                    <div className="font-medium">Meu Perfil</div>
                    <div className="text-xs text-gray-500">Gerenciar informações pessoais</div>
                  </div>
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-red-600 text-sm transition-colors"
                >
                  <LogOut className="size-4" />
                  <span>Sair do sistema</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden text-[#e6f7ee] p-2"
        >
          {showMobileMenu ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="md:hidden bg-[#0d612f] border-t border-[rgba(230,247,238,0.2)]">
          <div className="px-4 py-3 space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-[rgba(230,247,238,0.2)]">
              <div className="size-10 rounded-full bg-gradient-to-br from-[#102a43] to-[#243b53] flex items-center justify-center text-white text-sm font-medium overflow-hidden">
                {fotoPerfil ? (
                  <img 
                    src={fotoPerfil} 
                    alt={user?.nome || 'Usuário'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{user?.nome?.charAt(0)?.toUpperCase() || 'U'}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[#e6f7ee] text-sm font-medium">
                  {user?.nome}
                </span>
                <span className="text-[#e6f7ee]/70 text-xs">
                  {user?.perfil === 'admin' || user?.perfil === 'Administrador CGM' ? 'Administrador (CGM)' : 
                   user?.perfil === 'gestor' || user?.perfil === 'Gestor de Contratos' ? 'Gestor de Contratos' : 
                   user?.perfil === 'fiscal' || user?.perfil === 'Fiscal de Contratos' ? 'Fiscal de Contratos' :
                   user?.perfil || 'Usuário'}
                </span>
              </div>
            </div>
            
            <button
              onClick={handleMeuPerfil}
              className="w-full text-left text-[#e6f7ee] text-sm py-2 px-3 rounded hover:bg-[#0a4e33] flex items-center gap-2"
            >
              <User className="size-4" />
              Meu Perfil
            </button>

            <button
              onClick={() => {
                onNavigate('ajuda');
                setShowMobileMenu(false);
              }}
              className="w-full text-left text-[#e6f7ee] text-sm py-2 px-3 rounded hover:bg-[#0a4e33] flex items-center gap-2"
            >
              <HelpCircle className="size-4" />
              Ajuda
            </button>
            
            <button
              onClick={logout}
              className="w-full text-left text-[#e6f7ee] text-sm py-2 px-3 rounded hover:bg-[#0a4e33] flex items-center gap-2"
            >
              <LogOut className="size-4" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}