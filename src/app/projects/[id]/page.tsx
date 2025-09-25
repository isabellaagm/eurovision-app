// src/app/projects/[id]/page.tsx
import React from 'react';
import Link from 'next/link';

import { notFound } from 'next/navigation';
import { cookies, headers } from 'next/headers';
import type { Project } from '@/lib/types';

type ProjectParticipantEntry = NonNullable<Project["project_participants"]>[number];

// Ajuste aqui: tipagem como Promise para evitar erro do build
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
  const participants = (project.project_participants ?? [])
    .map((participant: ProjectParticipantEntry) => participant.users?.full_name ?? participant.user_id)
    .filter((name): name is string => Boolean(name));

  return (
    <div className="page-shell">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
      >
        &larr; Voltar ao Catálogo
      </Link>

      <section className="glass-panel text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-white/70">Detalhes do projeto</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{project.name}</h1>
          </div>
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusBadgeColor(project.status)}`}
          >
            Status: {statusLabel}
          </span>
        </div>
        <p className="mt-4 max-w-3xl text-sm text-white/70">
          Gerência responsável: {gerencia}
        </p>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/90 p-8 text-slate-900 shadow-xl backdrop-blur">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <DetailItem label="ID do Projeto" value={project.id} />
          <DetailItem label="Gerência Responsável" value={gerencia} />
          <DetailItem label="Criado em" value={createdAt} />
          <DetailItem label="Última atualização" value={updatedAt} />
          {lastUpdatedBy && <DetailItem label="Última modificação por" value={lastUpdatedBy} />}
        </div>

        {participants.length > 0 ? (
          <div className="mt-8 border-t border-slate-200 pt-6">
            <h3 className="text-xl font-semibold text-slate-900">Participantes</h3>
            <ul className="mt-3 space-y-1 text-sm text-slate-600">
              {participants.map((participant) => (
                <li key={participant}>{participant}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {project.description ? (
          <div className="mt-8 border-t border-slate-200 pt-6">
            <h3 className="text-xl font-semibold text-slate-900">Descrição</h3>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
              {project.description}
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}

async function fetchProject(id: string): Promise<Project | null> {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') ?? (process.env.NODE_ENV === 'production' ? 'https' : 'http');

  if (!host) {
    console.error('Cabeçalho Host ausente ao buscar projeto.');
    return null;
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
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
