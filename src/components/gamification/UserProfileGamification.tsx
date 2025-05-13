// src/components/gamification/UserProfileGamification.tsx
import React from 'react';
import { UserGamificationProgress, Badge, User } from '@/lib/types';
// import { mockBadges, mockUser } from '@/lib/mockData'; // Removido pois não está sendo usado diretamente aqui
import BadgeCard from './BadgeCard';

interface UserProfileGamificationProps {
  progress: UserGamificationProgress;
  user: User;
  allBadges: Badge[]; // Pass all available badges to find details
}

const UserProfileGamification: React.FC<UserProfileGamificationProps> = ({ progress, user, allBadges }) => {
  const earnedBadgesDetails = allBadges.filter(badge => progress.earnedBadgeIds.includes(badge.id));

  return (
    <div className="!p-6 bg-white rounded-lg border border-gray-200 shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 !mb-2">Progresso de {user.name}</h3>
      <p className="text-lg text-blue-600 font-bold !mb-4">Pontos Atuais: {progress.currentPoints}</p>

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
