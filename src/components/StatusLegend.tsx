import { AlertTriangle, CheckCircle, Clock, Info } from 'lucide-react';

export function StatusLegend() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-start gap-2 mb-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm text-blue-900 mb-2">Legenda de Status dos Contratos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-gray-700">
                <strong>Vigente:</strong> Mais de 30 dias para vencer
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-600 flex-shrink-0" />
              <span className="text-gray-700">
                <strong>Atenção:</strong> Vence em até 30 dias
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span className="text-gray-700">
                <strong>Vencido:</strong> Prazo expirado
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
