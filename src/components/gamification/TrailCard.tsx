// src/components/gamification/TrailCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { InnovationTrail } from '@/lib/types';

interface TrailCardProps {
  trail: InnovationTrail;
}

const TrailCard: React.FC<TrailCardProps> = ({ trail }) => {
  return (
    <Link
      href={`/gamification/trails/${trail.id}`}
      className="block h-full rounded-2xl border border-white/20 bg-white/90 p-6 text-slate-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[--color-eurofarma-blue]/40 hover:shadow-2xl"
    >
      <div className="mb-4 flex items-center">
        {trail.icon_url && (
          <div className="mr-4 flex-shrink-0">
            <Image src={trail.icon_url} alt={`${trail.name} icon`} width={40} height={40} className="rounded-full" />
          </div>
        )}
        <h5 className="text-xl font-bold tracking-tight text-gray-900">{trail.name}</h5>
      </div>
      <p className="mb-4 text-sm text-slate-600">{trail.description}</p>
      {/* Poderia adicionar um indicador de progresso ou status aqui */}
      <div className="text-sm font-semibold text-[--color-eurofarma-blue]">
        Ver detalhes da trilha &rarr;
      </div>
    </Link>
  );
};

export default TrailCard;
