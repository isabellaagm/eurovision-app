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

  if (isLoading)
    return (
      <div className="page-shell">
        <section className="glass-panel text-center text-white">
          Carregando detalhes da trilha...
        </section>
      </div>
    );
  if (error)
    return (
      <div className="page-shell">
        <section className="glass-panel text-center text-red-200">Erro: {error}</section>
      </div>
    );
  if (!trail)
    return (
      <div className="page-shell">
        <section className="glass-panel text-center text-white/80">
          Trilha não encontrada.
        </section>
      </div>
    );

  const stages = trail.stages ?? [];

  return (
    <div className="page-shell">
      <Link
        href="/gamification"
        className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
      >
        &larr; Voltar para a Central de Gamificação
      </Link>

      <section className="glass-panel text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            {trail.icon_url ? (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <Image src={trail.icon_url} alt={`${trail.name} icon`} width={48} height={48} className="rounded-full" />
              </div>
            ) : null}
            <div>
              <h2 className="text-3xl font-semibold text-white">{trail.name}</h2>
              <p className="mt-2 max-w-2xl text-sm text-white/70">{trail.description}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white/80">
            {stages.length} etapa{stages.length === 1 ? "" : "s"}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/90 p-8 text-slate-900 shadow-xl backdrop-blur">
        <h3 className="text-2xl font-semibold text-slate-900">Etapas da Trilha</h3>
        {stages.length > 0 ? (
          <div className="mt-6 space-y-4">
            {stages.map((stage, index) => {
              const isCompleted = userProgress?.completed_stage_ids.includes(stage.id);
              const badgeToAward = stage.badge_id_to_award ? mockBadges.find((b) => b.id === stage.badge_id_to_award) : null;
              return (
                <div
                  key={stage.id}
                  className={`rounded-2xl border p-5 transition ${
                    isCompleted
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <h4
                    className={`text-lg font-semibold ${
                      isCompleted ? "text-emerald-700" : "text-slate-900"
                    }`}
                  >
                    Etapa {index + 1}: {stage.name} {isCompleted && "(Concluída)"}
                  </h4>
                  <p className="mt-2 text-sm text-slate-600">{stage.description}</p>
                  <p className="mt-3 text-sm font-medium text-eurofarma-blue">
                    Pontos: {stage.points_awarded ?? 0}
                  </p>
                  {badgeToAward && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-slate-700">
                        Recompensa por completar esta etapa:
                      </p>
                      <BadgeCard
                        badge={badgeToAward}
                        earned={Boolean(userProgress?.earned_badge_ids.includes(badgeToAward.id))}
                      />
                    </div>
                  )}
                  {!isCompleted && (
                    <button
                      onClick={() => handleCompleteStage(stage.id)}
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-eurofarma-blue px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={!userProgress}
                    >
                      Marcar como Concluída
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-600">Nenhuma etapa definida para esta trilha ainda.</p>
        )}
      </section>
    </div>
  );
}