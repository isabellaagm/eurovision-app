// src/app/projects/[id]/page.tsx
import React from 'react';
import { getProjectById } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Ajuste aqui: tipagem como Promise para evitar erro do build
type ParamsPromise = Promise<{ id: string }>;

export default async function ProjectDetailsPage({ params }: { params: ParamsPromise }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl !mx-5">
      <Link href="/projects" className="text-blue-600 hover:underline !my-4 inline-block">
        &larr; Voltar ao Catálogo
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 !pb-4 border-b">
        <h2 className="text-3xl font-semibold flex-1 break-words">{project.name}</h2>
        <span 
          className={`text-sm font-medium !px-3 !py-1 rounded-full whitespace-nowrap ${getStatusBadgeColor(project.status)}`}
        >
          Status: {project.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 !gap-x-8 !gap-y-4">
        <div>
          <p className="text-sm font-medium text-gray-500">ID do Projeto</p>
          <p className="text-lg text-gray-900">{project.id}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Gerência Responsável</p>
          <p className="text-lg text-gray-900">{project.gerencia}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Data de Início</p>
          <p className="text-lg text-gray-900">{project.startDate}</p>
        </div>
        {project.endDate && (
          <div>
            <p className="text-sm font-medium text-gray-500">Data de Conclusão</p>
            <p className="text-lg text-gray-900">{project.endDate}</p>
          </div>
        )}
      </div>

      {project.description && (
        <div className="!pt-4 border-t">
          <h3 className="text-xl font-semibold !mb-2">Descrição</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{project.description}</p>
        </div>
      )}
    </div>
  );
}

// Função auxiliar fora do export
function getStatusBadgeColor(status: string) {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-800';
    case 'Development': return 'bg-blue-100 text-blue-800';
    case 'On Hold': return 'bg-yellow-100 text-yellow-800';
    case 'Idea': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}
