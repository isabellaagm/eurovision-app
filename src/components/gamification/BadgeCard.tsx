// src/components/gamification/BadgeCard.tsx
import React from 'react';
import Image from 'next/image';
import { Badge } from '@/lib/types';

interface BadgeCardProps {
  badge: Badge;
  earned: boolean; // Para indicar se o usuário já ganhou este badge
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge, earned }) => {
  return (
    <div className={`!p-4 border rounded-lg flex items-center !space-x-3 ${earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
      {badge.image_url && (
        <div className="flex-shrink-0">
          <Image src={badge.image_url} alt={`${badge.name} icon`} width={50} height={50} className="rounded-md" />
        </div>
      )}
      <div>
        <h5 className={`text-md font-semibold ${earned ? 'text-green-700' : 'text-gray-700'}`}>{badge.name}</h5>
        <p className={`text-sm ${earned ? 'text-green-600' : 'text-gray-500'}`}>{badge.description}</p>
        {!earned && <p className="text-xs text-gray-400 italic !mt-1">Ainda não conquistado</p>}
      </div>
    </div>
  );
};

export default BadgeCard;

