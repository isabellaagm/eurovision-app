// src/components/dashboard/ExportToExcel.tsx
'use client'

import * as XLSX from 'xlsx'

interface ExportToExcelProps<T extends object> {
  /** Array de objetos; cada chave vira uma coluna na planilha */
  data: T[]
  /** Nome do arquivo (sem extensão) */
  fileName?: string
}

export function ExportToExcel<T extends object>({
  data,
  fileName = 'relatorio',
}: ExportToExcelProps<T>) {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados')
    XLSX.writeFile(workbook, `${fileName}.xlsx`)
  }

  return (
    <button
      onClick={handleExport}
      className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/30 bg-gradient-to-r from-[--color-eurofarma-blue] via-sky-600 to-emerald-400 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_20px_45px_-25px_rgba(56,189,248,0.6)] transition-transform duration-300 ease-out hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-emerald-300/70 focus:ring-offset-2 focus:ring-offset-slate-900"
    >
      Exportar para Excel
    </button>
  )
}