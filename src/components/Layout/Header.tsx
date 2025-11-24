import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logoImage from 'figma:asset/600321a23fd1c8706abb2a9ad97f41dade268db0.png';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-[#0a4e33] w-full">
      <div className="flex items-center justify-between px-8 py-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <ImageWithFallback 
                src={logoImage}
                alt="ContratosJardim - Gestão de Contratos Municipal"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
          <div className="border-l border-[rgba(230,247,238,0.2)] pl-4">
            <span className="text-[#e6f7ee] text-sm">
              Sistema Interno de Gestão de Contratos
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-[#e6f7ee] text-sm">Ajuda</span>
          
          <div className="bg-[#e9f7ee] rounded-lg px-2.5 py-1.5 flex items-center gap-2">
            <div className="bg-[#0b6b3a] rounded-full size-6" />
            <div className="flex flex-col">
              <span className="text-[#0b6b3a] text-sm">
                {user?.nome}
              </span>
              <span className="text-gray-600 text-xs">
                {user?.perfil === 'admin' ? 'Administrador (CGM)' : 
                 user?.perfil === 'gestor' ? 'Gestor de Contratos' : 
                 'Fiscal de Contratos'}
              </span>
            </div>
            <button
              onClick={logout}
              className="text-[#0b6b3a] text-sm hover:underline"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}