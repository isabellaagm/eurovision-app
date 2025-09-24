// src/lib/api.ts
import { mockMetrics, mockProjects, mockProjectsSummary } from "./mockData";
import { DashboardMetric, Project } from "./types";

// Simula a busca de métricas do dashboard
export async function getDashboardMetrics(): Promise<DashboardMetric[]> {
  // Simula um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 50)); 
  return mockMetrics;
}

// Simula a busca de todos os projetos
export async function getAllProjects(): Promise<Project[]> {
  await new Promise(resolve => setTimeout(resolve, 100)); 
  return mockProjects;
}

// Simula a busca do resumo de projetos para gráficos
export async function getProjectsSummary(): Promise<typeof mockProjectsSummary> {
  await new Promise(resolve => setTimeout(resolve, 60));
  return mockProjectsSummary;
}
