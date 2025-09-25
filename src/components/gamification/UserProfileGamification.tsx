// src/components/gamification/UserProfileGamification.tsx
import React from 'react';
import { UserGamificationProgress, Badge, UserProfile } from '@/lib/types';
// import { mockBadges, mockUser } from '@/lib/mockData'; // Removido pois não está sendo usado diretamente aqui
import BadgeCard from './BadgeCard';

interface UserProfileGamificationProps {
  progress: UserGamificationProgress;
  user: UserProfile;
  allBadges: Badge[]; // Pass all available badges to find details
}

const UserProfileGamification: React.FC<UserProfileGamificationProps> = ({ progress, user, allBadges }) => {
  const earnedBadgeIds = progress.earned_badge_ids ?? [];
  const completedStageIds = progress.completed_stage_ids ?? [];

  const earnedBadgesDetails = allBadges.filter((badge) => earnedBadgeIds.includes(badge.id));

  const userName = user.full_name ?? 'Colaborador';

  return (
    <div className="rounded-3xl border border-white/10 bg-white/90 p-8 text-slate-900 shadow-xl backdrop-blur">
      <h3 className="text-2xl font-semibold text-slate-900">Progresso de {userName}</h3>
      {user.job_title && (
        <p className="mt-1 text-sm text-slate-600">{user.job_title}</p>
      )}
      <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-blue-100/60 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-semibold text-[--color-eurofarma-blue]">
          Pontos atuais: {progress.current_points}
        </p>
        <p className="text-sm text-slate-600">
          Etapas concluídas: {completedStageIds.length}
        </p>
      </div>

      <h4 className="mt-8 text-xl font-semibold text-slate-800">Badges Conquistados</h4>
      {earnedBadgesDetails.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {earnedBadgesDetails.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} earned={true} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-600">
          Nenhum badge conquistado ainda. Continue participando!
        </p>
      )}
      {/* Futuramente, pode-se adicionar um resumo do progresso nas trilhas aqui */}
    </div>
  );
};

export default UserProfileGamification;