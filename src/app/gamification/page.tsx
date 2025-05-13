// src/app/gamification/page.tsx
import React from 'react';
import TrailCard from '@/components/gamification/TrailCard';
import UserProfileGamification from '@/components/gamification/UserProfileGamification';
import { mockInnovationTrails, mockUserGamificationProgress, mockUser, mockBadges } from '@/lib/mockData';
// import Link from 'next/link'; // Removido pois não está sendo usado

export default function GamificationPage() {
  return (
    <div className="!p-6">
      <h2 className="text-3xl font-semibold !mb-6">Central de Gamificação</h2>

      {/* Seção do Perfil de Gamificação do Usuário */}
      <div className="!mb-8">
        <UserProfileGamification 
          user={mockUser} 
          progress={mockUserGamificationProgress} 
          allBadges={mockBadges} 
        />
      </div>

      {/* Seção de Trilhas de Inovação */}
      <div>
        <h3 className="text-2xl font-semibold !mb-4">Trilhas de Inovação Disponíveis</h3>
        {mockInnovationTrails.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockInnovationTrails.map(trail => (
              <TrailCard key={trail.id} trail={trail} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhuma trilha de inovação disponível no momento.</p>
        )}
      </div>

      {/* Link para adicionar ao Header depois */}
      {/* <div className="mt-8">
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          &larr; Voltar para o Dashboard
        </Link>
      </div> */}
    </div>
  );
}
