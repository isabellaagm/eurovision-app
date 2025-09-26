// src/components/gamification/TrailDetailView.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { InnovationTrail, UserGamificationProgress, Badge } from "@/lib/types";
import BadgeCard from "./BadgeCard";
import { CheckCircle2 } from "lucide-react";

interface TrailDetailViewProps {
  trail: InnovationTrail;
  initialProgress: UserGamificationProgress | null;
  allBadges: Badge[];
  userId?: string;
}

export default function TrailDetailView({ trail, initialProgress, allBadges, userId }: TrailDetailViewProps) {
  const [userProgress, setUserProgress] = useState(initialProgress);
  const [loadingStage, setLoadingStage] = useState<string | null>(null);

  const handleCompleteStage = async (stageId: string) => {
    if (!userId) {
      alert("Você precisa estar logado para completar uma etapa.");
      return;
    }
    setLoadingStage(stageId);

    try {
      const response = await fetch("/api/gamification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stageId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao completar etapa.");
      }

      const result = await response.json();
      setUserProgress(result.progress);
      alert(result.message || "Etapa completada com sucesso!");

    } catch (err) {
      console.error("Erro ao completar etapa:", err);
      alert(err instanceof Error ? `Erro: ${err.message}` : "Ocorreu um erro desconhecido.");
    } finally {
      setLoadingStage(null);
    }
  };
  
  const stages = trail.stages ?? [];

  return (
    <div className="page-shell">
      <Link
        href="/gamification"
        className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
      >
        &larr; Voltar para a Central de Gamificação
      </Link>

      {/* Seção do Cabeçalho da Trilha */}
      <section className="glass-panel text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            {trail.icon_url && (
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10">
                <img src={trail.icon_url} alt={`${trail.name} icon`} width={48} height={48} />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-semibold text-white">{trail.name}</h1>
              <p className="mt-2 max-w-2xl text-sm text-white/70">{trail.description}</p>
            </div>
          </div>
          <div className="flex-shrink-0 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white/80">
            {stages.length} etapa{stages.length === 1 ? "" : "s"}
          </div>
        </div>
      </section>

      {/* Seção das Etapas da Trilha */}
      <section className="surface-panel">
        <h2 className="text-2xl font-semibold text-slate-900">Etapas da Trilha</h2>
        {stages.length > 0 ? (
          <div className="mt-6 space-y-4">
            {stages.map((stage, index) => {
              const isCompleted = userProgress?.completed_stage_ids?.includes(stage.id);
              const badgeToAward = stage.badge_id ? allBadges.find((b) => b.id === stage.badge_id) : null;
              
              return (
                <div key={stage.id} className={`rounded-2xl border p-5 transition ${isCompleted ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white"}`}>
                  <h3 className={`flex items-center gap-2 text-lg font-semibold ${isCompleted ? "text-emerald-700" : "text-slate-900"}`}>
                    {isCompleted && <CheckCircle2 className="h-5 w-5" />}
                    Etapa {index + 1}: {stage.name} {isCompleted && "(Concluída)"}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{stage.description}</p>
                  <p className="mt-3 text-sm font-medium text-eurofarma-blue">
                    Pontos: {stage.points_awarded ?? 0}
                  </p>
                  
                  {badgeToAward && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-slate-700">Recompensa por completar esta etapa:</p>
                      <BadgeCard badge={badgeToAward} earned={Boolean(userProgress?.earned_badge_ids?.includes(badgeToAward.id))} />
                    </div>
                  )}

                  {!isCompleted && (
                    <button
                      onClick={() => handleCompleteStage(stage.id)}
                      className="btn-primary mt-4"
                      disabled={loadingStage === stage.id}
                    >
                      {loadingStage === stage.id ? 'Processando...' : 'Marcar como Concluída'}
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