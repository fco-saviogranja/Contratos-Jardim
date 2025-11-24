import React from 'react';

export function Footer() {
  return (
    <div className="bg-[#0a4e33] w-full">
      <div className="flex items-center justify-between px-8 py-2.5">
        <span className="text-[#e6f7ee] text-xs">
          © Controladoria Geral do Municipio de Jardim - CE • Portal Interno de Gestão de Contratos
        </span>
        
        <div className="flex items-center gap-3">
          <button className="text-[#e6f7ee] text-xs hover:underline">
            Institucional
          </button>
          <button className="text-[#e6f7ee] text-xs hover:underline">
            Transparência
          </button>
          <button className="text-[#e6f7ee] text-xs hover:underline">
            Política de privacidade
          </button>
          <button className="text-[#e6f7ee] text-xs hover:underline">
            Acessibilidade
          </button>
        </div>
      </div>
    </div>
  );
}