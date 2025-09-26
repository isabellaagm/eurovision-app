// src/components/gamification/TrailCard.tsx
import React from 'react';
import Link from 'next/link';
import { InnovationTrail } from '@/lib/types';

interface TrailCardProps {
  trail: InnovationTrail;
}

const TrailCard: React.FC<TrailCardProps> = ({ trail }) => {
  return (
    <Link
      href={`/gamification/trails/${trail.id}`}
      className="group block h-full rounded-2xl border border-transparent bg-white/95 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-eurofarma-blue/40 hover:shadow-2xl"
    >
      <div className="flex items-center gap-4">
        {trail.icon_url && (
          <div className="flex-shrink-0">
            <img 
              src={trail.icon_url} 
              alt={`${trail.name} icon`} 
              width={40} 
              height={40} 
            />
          </div>
        )}
        <h3 className="text-xl font-bold text-slate-800 transition-colors group-hover:text-eurofarma-blue">{trail.name}</h3>
      </div>
      
      <p className="mt-3 text-sm text-slate-600 line-clamp-2">{trail.description}</p>
      
      <div className="mt-4 text-sm font-semibold text-eurofarma-blue">
        Ver detalhes da trilha &rarr;
      </div>
    </Link>
  );
};

export default TrailCard;