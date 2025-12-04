import React from 'react';

export function Footer() {
  return (
    <div className="bg-[#0a4e33] w-full">
      <div className="flex items-center justify-between px-8 py-2.5">
        <span className="text-[#e6f7ee] text-xs">
          © <a 
            href="https://www.jardim.ce.gov.br/secretaria.php?sec=25" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Controladoria Geral do Municipio de Jardim - CE
          </a> • Portal Interno de Gestão de Contratos
        </span>
        
        <div className="flex items-center gap-3">
          <a 
            href="https://www.jardim.ce.gov.br/index.php" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#e6f7ee] text-xs hover:underline"
          >
            Institucional
          </a>
          <a 
            href="https://www.jardim.ce.gov.br/acessoainformacao.php" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#e6f7ee] text-xs hover:underline"
          >
            Transparência
          </a>
        </div>
      </div>
    </div>
  );
}