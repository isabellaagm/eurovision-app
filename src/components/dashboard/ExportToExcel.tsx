'use client';

import { useState } from 'react';
import { Download } from 'lucide-react'; // Ícone para o botão

export function ExportToExcel() {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/export/excel');

      if (!response.ok) {
        // Se a API retornar um erro, podemos tratar aqui
        throw new Error('Falha ao gerar o relatório. Tente novamente.');
      }

      // Converte a resposta em um "blob" (um tipo de arquivo binário)
      const blob = await response.blob();
      
      // Cria uma URL temporária para o arquivo em memória
      const url = window.URL.createObjectURL(blob);
      
      // Cria um link invisível para iniciar o download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'relatorio_projetos_inovacao.xlsx';
      document.body.appendChild(a);
      a.click();
      
      // Limpa o link e a URL da memória
      a.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Erro ao exportar para Excel:', error);
      // Aqui você poderia mostrar uma notificação de erro para o usuário
      alert(error instanceof Error ? error.message : 'Ocorreu um erro.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isLoading}
      className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-gradient-to-r from-eurofarma-blue via-sky-600 to-emerald-400 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_20px_45px_-25px_rgba(56,189,248,0.6)] transition-transform duration-300 ease-out hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-emerald-300/70 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading ? (
        'Gerando...'
      ) : (
        <>
          <Download className="h-4 w-4" />
          Exportar para Excel
        </>
      )}
    </button>
  );
}