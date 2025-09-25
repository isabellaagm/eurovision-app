// src/app/api/gamification/route.ts
import { NextResponse } from "next/server";
import {
  mockUserGamificationProgress,
  mockInnovationTrails,
  mockBadges,
  mockUser,
} from "@/lib/mockData";
// InnovationTrail e Badge não são usados diretamente aqui, mas TrailStage é.
import { UserGamificationProgress, TrailStage } from "@/lib/types";

// Esta é uma simulação em memória. Em um app real, isso seria um banco de dados.
const userProgressStore: UserGamificationProgress = JSON.parse(JSON.stringify(mockUserGamificationProgress));

// Helper para encontrar uma etapa específica em todas as trilhas
const findStageById = (stageId: string): TrailStage | undefined => {
  for (const trail of mockInnovationTrails) {
    const stage = trail.stages?.find(s => s.id === stageId);
    if (stage) return stage;
  }
  return undefined;
};

export async function POST(request: Request) {
  try {
    // ideaId e commentId não estão sendo usados no momento.
    // Se forem necessários no futuro, descomente e utilize-os.
    // const { userId, action, stageId, ideaId, commentId } = await request.json();
    const { userId, action, stageId } = await request.json();

    if (userId !== mockUser.id) {
      return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    // Simulação de completar uma etapa
    if (action === "complete_stage" && stageId) {
      const stage = findStageById(stageId);
      if (!stage) {
        return NextResponse.json({ error: "Etapa não encontrada." }, { status: 404 });
      }

      // Verifica se a etapa já foi completada
      if (userProgressStore.completed_stage_ids.includes(stageId)) {
        return NextResponse.json({ message: "Etapa já completada anteriormente.", progress: userProgressStore }, { status: 200 });
      }

      // Atualiza o progresso
       userProgressStore.completed_stage_ids.push(stageId);
       userProgressStore.current_points += stage.points_awarded ?? 0;

      if (stage.badge_id_to_award && !userProgressStore.earned_badge_ids.includes(stage.badge_id_to_award)) {
        const badgeExists = mockBadges.find(b => b.id === stage.badge_id_to_award);
        if (badgeExists) {
            userProgressStore.earned_badge_ids.push(stage.badge_id_to_award);
        }
      }
      
      return NextResponse.json({ message: `Etapa "${stage.name}" completada!`, progress: userProgressStore });
    }

    // Endpoint para obter o progresso atual (GET seria mais apropriado, mas simplificando)
    if (action === "get_progress") {
        return NextResponse.json({ progress: userProgressStore });
    }

    return NextResponse.json({ error: "Ação inválida ou parâmetros ausentes." }, { status: 400 });

  } catch (err) {
    console.error("Erro na API de Gamificação:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}

// Poderíamos adicionar um GET handler para buscar progresso, mas para simplificar a chamada do frontend
// vamos usar POST com uma action específica por enquanto.

