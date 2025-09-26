// Conteúdo de teste para src/app/api/projects/[id]/route.ts

import { NextResponse } from 'next/server';

// Este é o código mais simples possível para uma rota dinâmica no Next.js.
// Não tem tipos customizados, não tem importações externas.

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return NextResponse.json({ message: `Teste bem-sucedido para o projeto com ID: ${id}` });
}