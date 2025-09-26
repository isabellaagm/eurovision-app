// src/app/api/gamification/route.ts

import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import { completeStageForUser, getUserProgress } from "@/lib/data/gamification";

// Handler para buscar o progresso
export async function GET() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Supabase não configurado." }, { status: 500 });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
  }

  const { progress, error } = await getUserProgress(user.id);
  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ progress });
}

// Handler para atualizar o progresso (completar uma etapa)
export async function POST(request: Request) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Supabase não configurado." }, { status: 500 });
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
  }

  try {
    const { stageId } = await request.json();
    if (!stageId) {
      return NextResponse.json({ error: "ID da etapa é obrigatório." }, { status: 400 });
    }

    const result = await completeStageForUser(user.id, stageId);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ message: result.message, progress: result.progress });

  } catch (err) {
    console.error("Erro na API de Gamificação (POST):", err);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}