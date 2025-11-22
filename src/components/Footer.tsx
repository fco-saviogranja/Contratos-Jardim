export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm">
              Prefeitura Municipal de Jardim - CE
            </p>
            <p className="text-xs text-gray-400">
              Controladoria Geral do Município
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-xs text-gray-400">
              © {currentYear} - Todos os direitos reservados
            </p>
            <p className="text-xs text-gray-400">
              Sistema de Gestão de Contratos
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
