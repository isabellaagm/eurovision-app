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
    <div className="!p-6 bg-white rounded-lg border border-gray-200 shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 !mb-2">Progresso de {userName}</h3>
      {user.job_title && (
        <p className="text-sm text-gray-500 !mb-2">{user.job_title}</p>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between !gap-2 !mb-4">
        <p className="text-lg text-blue-600 font-bold">Pontos atuais: {progress.current_points}</p>
        <p className="text-sm text-gray-600">
          Etapas concluídas: {completedStageIds.length}
        </p>
      </div>

      <h4 className="text-xl font-semibold text-gray-700 !mt-6 !mb-3">Badges Conquistados:</h4>
      {earnedBadgesDetails.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnedBadgesDetails.map(badge => (
            <BadgeCard key={badge.id} badge={badge} earned={true} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Nenhum badge conquistado ainda. Continue participando!</p>
      )}
      {/* Futuramente, pode-se adicionar um resumo do progresso nas trilhas aqui */}
    </div>
  );
};

export default UserProfileGamification;
