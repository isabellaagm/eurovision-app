// src/lib/mockData.ts
import { Project, DashboardMetric } from "./types";

// Dados mockados para Projetos
export const mockProjects: Project[] = [
  { id: 'P001', name: 'Plataforma IA Vendas', gerencia: 'Comercial', status: 'Development', startDate: '2024-01-15' },
  { id: 'P002', name: 'Otimização Logística Rota', gerencia: 'Supply Chain', status: 'Completed', startDate: '2023-11-01', endDate: '2024-04-30' },
  { id: 'P003', name: 'App Engajamento RH', gerencia: 'RH', status: 'Idea', startDate: '2024-05-01' },
  { id: 'P004', name: 'Redução Custo Embalagem', gerencia: 'Produção', status: 'Development', startDate: '2024-02-20' },
  { id: 'P005', name: 'Análise Preditiva Qualidade', gerencia: 'Qualidade', status: 'On Hold', startDate: '2024-03-10' },
  { id: 'P006', name: 'Novo Canal E-commerce B2B', gerencia: 'Comercial', status: 'Development', startDate: '2024-04-05' },
];

// Dados mockados para Métricas do Dashboard
export const mockMetrics: DashboardMetric[] = [
  { label: 'Total de Projetos', value: mockProjects.length },
  { label: 'Em Desenvolvimento', value: mockProjects.filter(p => p.status === 'Development').length },
  { label: 'Concluídos (Último Ano)', value: mockProjects.filter(p => p.status === 'Completed').length }, // Simplificado
  { label: 'Budget Alocado (Milhões)', value: 12.5, unit: 'R$' }, // Valor fictício
];

// Dados mockados para Resumo dos Projetos (para gráficos)
export const mockProjectsSummary = {
  byStatus: [
    { name: 'Idea', value: mockProjects.filter(p => p.status === 'Idea').length },
    { name: 'Development', value: mockProjects.filter(p => p.status === 'Development').length },
    { name: 'Completed', value: mockProjects.filter(p => p.status === 'Completed').length },
    { name: 'On Hold', value: mockProjects.filter(p => p.status === 'On Hold').length },
  ],
  byGerencia: [
    { name: 'Comercial', value: mockProjects.filter(p => p.gerencia === 'Comercial').length },
    { name: 'Supply Chain', value: mockProjects.filter(p => p.gerencia === 'Supply Chain').length },
    { name: 'RH', value: mockProjects.filter(p => p.gerencia === 'RH').length },
    { name: 'Produção', value: mockProjects.filter(p => p.gerencia === 'Produção').length },
    { name: 'Qualidade', value: mockProjects.filter(p => p.gerencia === 'Qualidade').length },
  ]
};
