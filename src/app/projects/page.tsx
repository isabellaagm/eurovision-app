
"use client";

import React, { useState, useMemo, useEffect } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import { Project } from "@/lib/types"; // Certifique-se que o tipo Project está correto

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados dos filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [gerenciaFilter, setGerenciaFilter] = useState("All");
  // Removidos filtros de data por enquanto para simplificar a migração para dados reais
  // const [dateStart, setDateStart] = useState("");
  // const [dateEnd, setDateEnd] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Falha ao buscar projetos");
        }
        const data = await response.json();
        setAllProjects(data.projects || []);
      } catch (err: unknown) {
        console.error("Erro ao buscar projetos:", err);
        const message = err instanceof Error ? err.message : "Ocorreu um erro ao carregar os projetos.";
        setError(message);
        setAllProjects([]); // Limpa os projetos em caso de erro
      }
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  // Opções únicas para filtros (agora baseadas nos dados carregados)
  const statuses = useMemo(() => {
    if (isLoading || error) return ["All"];
    return ["All", ...Array.from(new Set(allProjects.map((p) => p.status).filter(Boolean)))];
  }, [allProjects, isLoading, error]);

  const gerencias = useMemo(() => {
    if (isLoading || error) return ["All"];
    return ["All", ...Array.from(new Set(allProjects.map((p) => p.gerencia).filter(Boolean)))];
  }, [allProjects, isLoading, error]);

  // Lista filtrada
  const filteredProjects = useMemo(() => {
    if (isLoading || error) return [];
    return allProjects.filter((p) => {
      if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (statusFilter !== "All" && p.status !== statusFilter) {
        return false;
      }
      if (gerenciaFilter !== "All" && p.gerencia !== gerenciaFilter) {
        return false;
      }
      // Lógica de filtro de data removida temporariamente
      return true;
    });
  }, [allProjects, searchTerm, statusFilter, gerenciaFilter, isLoading, error]);

  if (isLoading) {
    return <p className="!p-6 text-center">Carregando projetos...</p>;
  }

  if (error) {
    return <p className="!p-6 text-center text-red-500">Erro: {error}</p>;
  }

  return (
    <div className="!space-y-6">
      <div className="!m-6 flex justify-between items-center">
        <h2 className="text-3xl font-semibold">Catálogo de Projetos</h2>
        {/* TODO: Adicionar botão para criar novo projeto que leve a um formulário/modal */}
      </div>

      <div className="bg-white !p-4 !m-6 rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Buscar por nome..."
          className="border !p-2 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border !p-2 rounded w-full"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          className="border !p-2 rounded w-full"
          value={gerenciaFilter}
          onChange={(e) => setGerenciaFilter(e.target.value)}
        >
          {gerencias.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        {/* Filtros de data removidos temporariamente */}
      </div>

      <p className="!m-6 text-sm text-gray-600">
        {filteredProjects.length} projeto
        {filteredProjects.length === 1 ? "" : "s"} encontrado
        {filteredProjects.length === 1 ? "" : "s"}
      </p>

      {filteredProjects.length > 0 ? (
        <div className="!m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center !mt-10">
          Nenhum projeto encontrado com os filtros atuais.
        </p>
      )}
    </div>
  );
}
