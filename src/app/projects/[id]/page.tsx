// src/app/projects/[id]/page.tsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cookies, headers } from 'next/headers';
import type { Project } from '@/lib/types';

type ParamsPromise = Promise<{ id: string }>;

export default async function ProjectDetailsPage({ params }: { params: ParamsPromise }) {
  const { id } = await params;
  const project = await fetchProject(id);

  if (!project) {
    notFound();
  }

  const createdAt = formatDate(project.created_at);
  const updatedAt = formatDate(project.updated_at);
  const statusLabel = project.status ?? 'Sem status';
  const gerencia = project.gerencia ?? 'Não informada';
  const lastUpdatedBy = project.users?.full_name ?? null;
  const participants = project.project_participants
    ?.map((participant) => participant.users?.full_name ?? participant.user_id)
    .filter(Boolean) ?? [];

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
          Status: {statusLabel}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 !gap-x-8 !gap-y-4">
        <DetailItem label="ID do Projeto" value={project.id} />
        <DetailItem label="Gerência Responsável" value={gerencia} />
        <DetailItem label="Criado em" value={createdAt} />
        <DetailItem label="Última atualização" value={updatedAt} />
        {lastUpdatedBy && <DetailItem label="Última modificação por" value={lastUpdatedBy} />}
      </div>

      {participants.length > 0 && (
        <div className="!pt-4 border-t">
          <h3 className="text-xl font-semibold !mb-2">Participantes</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {participants.map((participant) => (
              <li key={participant}>{participant}</li>
            ))}
          </ul>
        </div>
      )}

      {project.description && (
        <div className="!pt-4 border-t">
          <h3 className="text-xl font-semibold !mb-2">Descrição</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{project.description}</p>
        </div>
      )}
    </div>
  );
}

async function fetchProject(id: string): Promise<Project | null> {
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') ?? (process.env.NODE_ENV === 'production' ? 'https' : 'http');

  if (!host) {
    console.error('Cabeçalho Host ausente ao buscar projeto.');
    return null;
  }

  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');

  const response = await fetch(`${protocol}://${host}/api/projects/${id}`, {
    headers: {
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    cache: 'no-store',
  });

  if (response.status === 404) {
    return null;
  }

  if (response.status === 401) {
    throw new Error('Usuário não autenticado para visualizar projetos.');
  }

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Falha ao carregar projeto (${response.status}): ${errorBody}`);
  }

  const data = (await response.json()) as { project?: Project | null };
  return data.project ?? null;
}

function formatDate(value?: string | null) {
  if (!value) {
    return 'Não informado';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return 'Data inválida';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(parsed);
}

function getStatusBadgeColor(status?: string | null) {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Development':
      return 'bg-blue-100 text-blue-800';
    case 'On Hold':
      return 'bg-yellow-100 text-yellow-800';
    case 'Idea':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-lg text-gray-900">{value}</p>
    </div>
  );
}
