// src/app/projects/page.tsx
import React from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import { getAllProjects } from '@/lib/api'; // Função para buscar todos os projetos (mock)

export default async function ProjectsPage() {
  // Busca a lista de todos os projetos
  const projects = await getAllProjects();

  return (
    <div className="space-y-6">
      <div className="!m-6 flex justify-between items-center">
        <h2 className="text-3xl font-semibold">Catálogo de Projetos</h2>
        {/* Botão para adicionar novo projeto (funcionalidade futura) */}
        {/* <button className="btn-primary">Novo Projeto</button> */}
      </div>

      {/* Filtros e Busca (funcionalidade futura) */}
      {/* <div className="bg-white p-4 rounded-lg shadow-sm"> ... Filtros aqui ... </div> */}

      {/* Grid de Projetos */}
      {projects.length > 0 ? (
        <div className="!m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center !mt-10">Nenhum projeto encontrado.</p>
      )}
    </div>
  );
}
