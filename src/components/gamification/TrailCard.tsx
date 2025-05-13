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
    <Link href={`/gamification/trails/${trail.id}`} className="block !p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 transition-colors duration-200">
      <div className="flex items-center !mb-3">
        {trail.iconUrl && (
          <div className="!mr-4 flex-shrink-0">
            <Image src={trail.iconUrl} alt={`${trail.name} icon`} width={40} height={40} className="rounded-full" />
          </div>
        )}
        <h5 className="text-xl font-bold tracking-tight text-gray-900">{trail.name}</h5>
      </div>
      <p className="font-normal text-gray-700 !mb-3">{trail.description}</p>
      {/* Poderia adicionar um indicador de progresso ou status aqui */}
      <div className="text-sm text-blue-600 hover:underline">
        Ver detalhes da trilha &rarr;
      </div>
    </Link>
  );
};

export default TrailCard;

