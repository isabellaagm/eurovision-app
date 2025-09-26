// src/app/gamification/trails/[id]/page.tsx

import React from "react";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import { getTrailById, getUserProgress, listBadges } from "@/lib/data/gamification";
import TrailDetailView from "@/components/gamification/TrailDetailView"; // Vamos usar um componente de cliente

// A página em si é um Server Component que busca os dados
export default async function TrailDetailPage({ params }: { params: { id: string } }) {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase!.auth.getUser();

  const [trailResult, progressResult, badgesResult] = await Promise.all([
    getTrailById(params.id),
    user ? getUserProgress(user.id) : Promise.resolve({ progress: null }),
    listBadges()
  ]);

  const { trail, error } = trailResult;
  const userProgress = progressResult.progress;
  const allBadges = badgesResult.badges ?? [];

  if (error || !trail) {
    return (
      <div className="page-shell">
        <section className="glass-panel text-center text-white/80">
          Trilha não encontrada.
        </section>
      </div>
    );
  }

  // Passamos os dados buscados como props para o componente de cliente
  return (
    <TrailDetailView
      trail={trail}
      initialProgress={userProgress ?? null}
      allBadges={allBadges}
      userId={user?.id}
    />
  );
}