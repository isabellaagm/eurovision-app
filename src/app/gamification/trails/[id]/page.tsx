// src/app/gamification/trails/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  InnovationTrail,
  // TrailStage, // Não usado diretamente aqui, mas faz parte de InnovationTrail
  UserGamificationProgress,
  // Badge, // Não usado diretamente aqui, mas faz parte do mockBadges e BadgeCard
  // User, // Não usado diretamente aqui, mas faz parte do mockUser
} from "@/lib/types";
import {
  mockInnovationTrails,
  mockUser,
  mockBadges,
  mockUserGamificationProgress // Import initial mock progress
} from "@/lib/mockData";
import Image from "next/image";
import Link from "next/link";
import BadgeCard from "@/components/gamification/BadgeCard";

export default function TrailDetailPage() {
  const params = useParams();
  const trailId = params.id as string;

  const [trail, setTrail] = useState<InnovationTrail | null>(null);
  const [userProgress, setUserProgress] = useState<UserGamificationProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simula a busca inicial dos dados da trilha e progresso do usuário
  useEffect(() => {
    setIsLoading(true);
    const foundTrail = mockInnovationTrails.find(t => t.id === trailId);
    if (foundTrail) {
      setTrail(foundTrail);
      // Inicializa o progresso do usuário com o mock. Em um app real, buscaria da API.
      setUserProgress(JSON.parse(JSON.stringify(mockUserGamificationProgress))); 
    } else {
      setError("Trilha não encontrada.");
    }
    setIsLoading(false);
  }, [trailId]);

  const handleCompleteStage = async (stageId: string) => {
    if (!userProgress) return;

    try {
      const response = await fetch("/api/gamification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: mockUser.id, // Usando mockUser por enquanto
          action: "complete_stage",
          stageId: stageId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao completar etapa.");
      }

      const result = await response.json();
      setUserProgress(result.progress); // Atualiza o progresso com a resposta da API
      alert(result.message || "Etapa completada com sucesso!");

    } catch (err: unknown) { // Alterado de any para unknown
      console.error("Erro ao completar etapa:", err);
      if (err instanceof Error) {
        alert(`Erro: ${err.message}`);
      } else {
        alert("Ocorreu um erro desconhecido.");
      }
    }
  };

  if (isLoading) return <p className="!p-6 text-center">Carregando detalhes da trilha...</p>;
  if (error) return <p className="!p-6 text-center text-red-500">Erro: {error}</p>;
  if (!trail) return <p className="!p-6 text-center">Trilha não encontrada.</p>;

  return (
    <div className="!p-6">
      <Link href="/gamification" className="text-blue-600 hover:underline !mb-6 inline-block">
        &larr; Voltar para a Central de Gamificação
      </Link>

      <div className="bg-white !p-8 rounded-lg shadow-lg !mb-8">
        <div className="flex items-center !mb-4">
          {trail.icon_url && (
            <div className="!mr-4 flex-shrink-0">
              <Image src={trail.icon_url} alt={`${trail.name} icon`} width={60} height={60} className="rounded-full" />
            </div>
          )}
          <h2 className="text-3xl font-bold text-gray-800">{trail.name}</h2>
        </div>
        <p className="text-gray-600 !mb-6">{trail.description}</p>
      </div>

      <h3 className="text-2xl font-semibold !mb-4">Etapas da Trilha</h3>
      {trail.stages.length > 0 ? (
        <div className="!space-y-4">
          {trail.stages.map((stage, index) => {
            const isCompleted = userProgress?.completed_stage_ids.includes(stage.id);
            const badgeToAward = stage.badge_id_to_award ? mockBadges.find(b => b.id === stage.badge_id_to_award) : null;
            return (
              <div key={stage.id} className={`!p-5 rounded-md border ${isCompleted ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-200"}`}>
                <h4 className={`text-xl font-semibold ${isCompleted ? "text-green-700" : "text-gray-800"}`}>
                  Etapa {index + 1}: {stage.name} {isCompleted && "(Concluída)"}
                </h4>
                <p className="text-gray-600 !my-2">{stage.description}</p>
                <p className="text-sm text-blue-500">Pontos: {stage.points_awarded ?? 0}</p>
                {badgeToAward && (
                    <div className="!mt-3">
                        <p className="text-sm font-medium text-gray-700 !mb-1">Recompensa por completar esta etapa:</p>
                        <BadgeCard badge={badgeToAward} earned={userProgress?.earned_badge_ids.includes(badgeToAward.id) || false} />
                    </div>
                )}
                {!isCompleted && (
                  <button 
                    onClick={() => handleCompleteStage(stage.id)}
                    className="!mt-4 !px-4 !py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                    disabled={!userProgress} // Desabilita se o progresso não carregou
                  >
                    Marcar como Concluída
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">Nenhuma etapa definida para esta trilha ainda.</p>
      )}
    </div>
  );
}

