// src/app/gamification/page.tsx
import React from "react";
import TrailCard from "@/components/gamification/TrailCard";
import UserProfileGamification from "@/components/gamification/UserProfileGamification";
import { mockInnovationTrails, mockUserGamificationProgress, mockUser, mockBadges } from "@/lib/mockData";
// import Link from 'next/link'; // Removido pois não está sendo usado

export default function GamificationPage() {
  return (
    <div className="page-shell">
      <section className="glass-panel text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-white/70">
              Engajamento
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Central de Gamificação
            </h1>
            <p className="text-base text-white/70">
              Reconheça conquistas, acompanhe o progresso das squads e incentive práticas colaborativas que aceleram a inovação.
            </p>
          </div>
        </div>
      </section>

      <UserProfileGamification
        user={mockUser}
        progress={mockUserGamificationProgress}
        allBadges={mockBadges}
      />

      <section className="rounded-3xl border border-white/10 bg-white/90 p-8 text-slate-900 shadow-xl backdrop-blur">
        <h2 className="text-2xl font-semibold">Trilhas de Inovação Disponíveis</h2>
        {mockInnovationTrails.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mockInnovationTrails.map((trail) => (
              <TrailCard key={trail.id} trail={trail} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-600">
            Nenhuma trilha de inovação disponível no momento.
          </p>
        )}
      </section>
    </div>
  );
}