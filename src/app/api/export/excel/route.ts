// src/app/api/export/excel/route.ts

import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { listProjects } from '@/lib/data/projects'; // Importamos nossa função que busca os projetos

export async function GET() {
  // Busca os dados reais dos projetos
  const result = await listProjects();

  if ('error' in result) {
    return NextResponse.json({ error: 'Falha ao buscar os dados para exportação.' }, { status: 500 });
  }
  
  // Pega apenas os dados que queremos na planilha
  const projectsToExport = result.projects.map(p => ({
    Nome: p.name,
    Gerência: p.gerencia,
    Status: p.status,
    'Criado em': new Date(p.created_at).toLocaleDateString('pt-BR'),
    'Última Atualização': p.updated_at ? new Date(p.updated_at).toLocaleDateString('pt-BR') : 'N/A',
    Descrição: p.description
  }));

  // Cria a planilha em memória
  const worksheet = XLSX.utils.json_to_sheet(projectsToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Projetos');

  // Converte a planilha para um buffer (um "arquivo binário")
  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

  // Retorna o buffer como um arquivo para download
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Disposition': `attachment; filename="relatorio_projetos_inovacao.xlsx"`,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
  });
}