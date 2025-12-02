// Utilidades para exportação de dados

export interface ContratoExport {
  numero: string;
  objeto: string;
  contratado: string;
  vencimento: string;
  situacao: string;
  gestor: string;
  secretaria: string;
}

// Exportar para CSV
export function exportToCSV(data: ContratoExport[], filename: string = 'contratos') {
  const headers = ['Número', 'Objeto', 'Contratado', 'Vencimento', 'Situação', 'Gestor', 'Secretaria'];
  
  const csvContent = [
    headers.join(';'),
    ...data.map(row => [
      row.numero,
      `"${row.objeto}"`,
      `"${row.contratado}"`,
      row.vencimento,
      row.situacao,
      `"${row.gestor}"`,
      `"${row.secretaria}"`
    ].join(';'))
  ].join('\n');

  // Adicionar BOM para UTF-8
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Exportar para Excel (formato HTML que o Excel reconhece)
export function exportToExcel(data: ContratoExport[], filename: string = 'contratos') {
  const headers = ['Número', 'Objeto', 'Contratado', 'Vencimento', 'Situação', 'Gestor', 'Secretaria'];
  
  let htmlContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head>
        <meta charset="UTF-8">
        <style>
          table { border-collapse: collapse; width: 100%; }
          th { background-color: #0b6b3a; color: white; padding: 8px; text-align: left; font-weight: bold; }
          td { border: 1px solid #ddd; padding: 8px; }
          tr:nth-child(even) { background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              ${headers.map(h => `<th>${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr>
                <td>${row.numero}</td>
                <td>${row.objeto}</td>
                <td>${row.contratado}</td>
                <td>${row.vencimento}</td>
                <td>${row.situacao}</td>
                <td>${row.gestor}</td>
                <td>${row.secretaria}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.xls`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Exportar para PDF (usando HTML e window.print)
export function exportToPDF(data: ContratoExport[], filename: string = 'contratos') {
  const headers = ['Número', 'Objeto', 'Contratado', 'Vencimento', 'Situação', 'Gestor', 'Secretaria'];
  
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Por favor, permita pop-ups para exportar PDF');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${filename}</title>
        <style>
          @page { size: A4 landscape; margin: 1cm; }
          body { 
            font-family: Arial, sans-serif; 
            font-size: 9pt;
            margin: 0;
            padding: 20px;
          }
          h1 { 
            color: #0b6b3a; 
            font-size: 18pt; 
            margin-bottom: 5px;
            text-align: center;
          }
          .subtitle {
            text-align: center;
            color: #666;
            font-size: 10pt;
            margin-bottom: 20px;
          }
          table { 
            border-collapse: collapse; 
            width: 100%; 
            margin-top: 10px;
          }
          th { 
            background-color: #0b6b3a; 
            color: white; 
            padding: 8px 4px; 
            text-align: left; 
            font-weight: bold;
            font-size: 9pt;
            border: 1px solid #0b6b3a;
          }
          td { 
            border: 1px solid #ddd; 
            padding: 6px 4px;
            font-size: 8pt;
          }
          tr:nth-child(even) { background-color: #f9f9f9; }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 8pt;
            color: #666;
          }
          @media print {
            body { padding: 0; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>Relatório de Contratos - ContratosJardim</h1>
        <div class="subtitle">Controladoria Geral do Município - Gerado em ${new Date().toLocaleDateString('pt-BR')}</div>
        
        <table>
          <thead>
            <tr>
              ${headers.map(h => `<th>${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr>
                <td>${row.numero}</td>
                <td>${row.objeto.length > 80 ? row.objeto.substring(0, 80) + '...' : row.objeto}</td>
                <td>${row.contratado}</td>
                <td>${row.vencimento}</td>
                <td>${row.situacao}</td>
                <td>${row.gestor}</td>
                <td>${row.secretaria}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="footer">
          Total de contratos: ${data.length}
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}