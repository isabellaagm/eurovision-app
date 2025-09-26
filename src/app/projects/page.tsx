
"use client";

import React, { useState, useMemo, useEffect } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import { Project } from "@/lib/types"; // Certifique-se que o tipo Project está correto

const isNonNullable = <T,>(value: T): value is NonNullable<T> => value !== null && value !== undefined;

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
    return ["All", ...Array.from(new Set(allProjects.map((p) => p.status).filter(isNonNullable)))];
  }, [allProjects, isLoading, error]);

 const gerencias = useMemo(() => {
    if (isLoading || error) return ["All"];
    return ["All", ...Array.from(new Set(allProjects.map((p) => p.gerencia).filter(isNonNullable)))];
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
    return (
      <div className="page-shell">
        <section className="glass-panel text-center text-white">
          Carregando projetos...
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-shell">
        <section className="glass-panel text-center text-red-200">
          Erro: {error}
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section className="glass-panel text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-white/70">
              Portfólio estratégico
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Catálogo de Projetos
            </h1>
            <p className="text-base text-white/70">
              Explore o pipeline completo de iniciativas e refine a busca por status, gerência ou palavra-chave.
            </p>
          </div>
        </div>
        <p className="mt-6 text-sm text-white/70">
          {filteredProjects.length} projeto
          {filteredProjects.length === 1 ? "" : "s"} em exibição.
        </p>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/90 p-8 text-slate-900 shadow-xl backdrop-blur">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <input
            type="text"
            placeholder="Buscar por nome..."
            className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-eurofarma-blue focus:ring-2 focus:ring-eurofarma-blue/30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-eurofarma-blue] focus:ring-2 focus:ring-eurofarma-blue/30"
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
            className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-eurofarma-blue focus:ring-2 focus:ring-eurofarma-blue/30"
            value={gerenciaFilter}
            onChange={(e) => setGerenciaFilter(e.target.value)}
          >
            {gerencias.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </section>

      {filteredProjects.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      ) : (
        <section className="glass-panel text-center text-white/80">
          Nenhum projeto encontrado com os filtros atuais.
        </section>
      )}
    </div>
  );
}