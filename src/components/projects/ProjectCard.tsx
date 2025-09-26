// src/components/projects/ProjectCard.tsx
import React from 'react';
import Link from 'next/link';
import { Project } from '@/lib/types'; // Importa o tipo Project

interface ProjectCardProps {
  project: Project;
}

// Função auxiliar para obter a cor do badge de status
const getStatusBadgeColor = (status: Project['status']) => {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-800';
    case 'Development': return 'bg-blue-100 text-blue-800';
    case 'On Hold': return 'bg-yellow-100 text-yellow-800';
    case 'Idea': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const formatDate = (date?: string | null) => {
  if (!date) {
    return "Não informado";
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return "Data inválida";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

// src/components/projects/ProjectCard.tsx

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const createdAtLabel = formatDate(project.created_at);
  const updatedAtLabel = project.updated_at ? formatDate(project.updated_at) : null;
  const gerencia = project.gerencia ?? "Não informada";
  const statusLabel = project.status ?? "Sem status";

  return (
    // ADICIONADO: a classe "group" para habilitar o hover nos elementos filhos
    <Link
      href={`/projects/${project.id}`}
      className="group block h-full rounded-2xl border border-transparent bg-white/90 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-eurofarma-blue/40 hover:shadow-2xl"
    >
      <div className="mb-3 flex items-start justify-between">
        {/* CORREÇÃO: Adicionadas classes de cor, peso e transição no hover */}
        <h3 
          className="text-lg font-bold text-slate-800 transition-colors group-hover:text-eurofarma-blue" 
          title={project.name}
        >
          {project.name}
        </h3>
        <span
          className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeColor(project.status)}`}
        >
          {statusLabel}
        </span>
      </div>
      <p className="mb-3 text-sm text-gray-600">Gerência: {gerencia}</p>
      <p className="text-sm text-gray-500">Criado em: {createdAtLabel}</p>
      {updatedAtLabel && (
        <p className="text-sm text-gray-500">Atualizado em: {updatedAtLabel}</p>
      )}
    </Link>
  );
};

export default ProjectCard;