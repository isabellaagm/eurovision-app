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
    <div
      className={`flex items-center gap-3 rounded-2xl border p-4 shadow-sm transition ${earned ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50 opacity-70"}`}
    >
      {badge.image_url && (
        <div className="flex-shrink-0">
          <Image src={badge.image_url} alt={`${badge.name} icon`} width={50} height={50} className="rounded-md" />
        </div>
      )}
      <div>
        <h5 className={`text-md font-semibold ${earned ? 'text-green-700' : 'text-gray-700'}`}>{badge.name}</h5>
        <p className={`text-sm ${earned ? 'text-emerald-600' : 'text-slate-500'}`}>{badge.description}</p>
        {!earned && <p className="mt-1 text-xs italic text-slate-400">Ainda não conquistado</p>}
      </div>
    </div>
  );
};

export default BadgeCard;
