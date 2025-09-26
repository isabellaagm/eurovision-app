// src/lib/api.ts
// Versão final conectada 100% ao Supabase

import { listProjects, fetchProjectById } from "./data/projects";
import type { DashboardMetric, Project } from "./types";

// Busca as métricas do dashboard a partir dos dados reais
export async function getDashboardMetrics(): Promise<DashboardMetric[]> {
  const result = await listProjects();
  if ("error" in result) {
    // Em caso de erro, retorna métricas zeradas para não quebrar o dashboard
    console.error(result.error);
    return [
      { label: 'Total de Projetos', value: 0 },
      { label: 'Em Desenvolvimento', value: 0 },
      { label: 'Concluídos (Último Ano)', value: 0 },
      { label: 'Budget Alocado (Milhões)', value: 0, unit: 'R$' },
    ];
  }

  const projects = result.projects;
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const totalProjects = projects.length;
  const devProjects = projects.filter(p => p.status === 'Development').length;
  const completedLastYear = projects.filter(p =>
    p.status === 'Completed' && p.updated_at && new Date(p.updated_at) > oneYearAgo
  ).length;
  
  const totalBudget = projects.reduce((sum, p) => sum + (p.budget_allocated || 0), 0);
  const budgetInMillions = totalBudget / 1000000;

  return [
    { label: 'Total de Projetos', value: totalProjects },
    { label: 'Em Desenvolvimento', value: devProjects },
    { label: 'Concluídos (Último Ano)', value: completedLastYear },
    { label: 'Budget Alocado (Milhões)', value: budgetInMillions, unit: 'R$' },
  ];
}

// Busca todos os projetos reais
export async function getAllProjects(): Promise<Project[]> {
  const result = await listProjects();
  if ("error" in result) {
    throw new Error(result.error);
  }
  return result.projects;
}

// Busca um projeto real por ID
export async function getProjectById(id: string): Promise<Project | undefined> {
  const result = await fetchProjectById(id);
  if ("error" in result) {
    console.error(result.error);
    return undefined;
  }
  return result.project;
}

// Busca o resumo de projetos para os gráficos a partir dos dados reais
export async function getProjectsSummary(): Promise<{ byStatus: { name: string; value: number }[]; byGerencia: { name: string; value: number }[] }> {
  const result = await listProjects();
  if ('error' in result) {
    throw new Error(result.error);
  }
  
  const projects = result.projects;

  const byStatus = projects.reduce((acc, project) => {
    const status = project.status ?? 'Sem status';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byGerencia = projects.reduce((acc, project) => {
    const gerencia = project.gerencia ?? 'Não informada';
    acc[gerencia] = (acc[gerencia] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    byStatus: Object.entries(byStatus).map(([name, value]) => ({ name, value })),
    byGerencia: Object.entries(byGerencia).map(([name, value]) => ({ name, value })),
  };
}