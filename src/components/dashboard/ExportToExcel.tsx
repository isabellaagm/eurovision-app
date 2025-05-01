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
      className="
        !mt-4 inline-flex items-center !space-x-2
        bg-gradient-to-r from-green-400 to-blue-500
        hover:from-green-500 hover:to-blue-600
        text-white font-semibold
        !px-4 !py-2 rounded-lg shadow-md
        transition-all duration-300 ease-in-out transform
        hover:shadow-lg hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300
      "
    >
      Exportar para Excel
    </button>
  )
}
