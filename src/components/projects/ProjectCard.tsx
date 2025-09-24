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

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const createdAtLabel = formatDate(project.created_at);
  const updatedAtLabel = project.updated_at ? formatDate(project.updated_at) : null;
  const gerencia = project.gerencia ?? "Não informada";
  const statusLabel = project.status ?? "Sem status";

  return (
    <Link href={`/projects/${project.id}`} className="!p-3 block card hover:border-blue-500 border border-transparent transition-colors duration-200">
      {/* Usando Link para tornar o card clicável e navegar para os detalhes */}
      <div className="flex justify-between items-start !mb-2">
        <h3 className="text-lg font-semibold truncate" title={project.name}>{project.name}</h3>
        <span 
          className={`text-xs font-medium !px-2.5 !py-0.5 rounded-full ${getStatusBadgeColor(project.status)}`}
        >
          {statusLabel}
        </span>
      </div>
      <p className="text-sm text-gray-600 !mb-2">Gerência: {gerencia}</p>
      <p className="text-sm text-gray-500">Criado em: {createdAtLabel}</p>
      {updatedAtLabel && (
        <p className="text-sm text-gray-500">Atualizado em: {updatedAtLabel}</p>
      )}
      {/* Poderíamos adicionar uma breve descrição aqui se disponível */}
      {/* {project.description && <p className="text-sm text-gray-700 mt-2 line-clamp-2">{project.description}</p>} */}
    </Link>
  );
};

export default ProjectCard;
