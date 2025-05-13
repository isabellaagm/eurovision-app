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

// Dados Mockados para Gamificação
import { Badge, InnovationTrail, UserGamificationProgress, User } from "./types";

export const mockBadges: Badge[] = [
  { id: "B001", name: "Inovador Iniciante", description: "Completou sua primeira trilha de inovação.", imageUrl: "/icons/badge_beginner.svg" },
  { id: "B002", name: "Mestre das Ideias", description: "Submeteu 5 ideias de alta qualidade.", imageUrl: "/icons/badge_idea_master.svg" },
  { id: "B003", name: "Colaborador Estrela", description: "Participou ativamente em 3 projetos colaborativos.", imageUrl: "/icons/badge_collaborator.svg" },
  { id: "B004", name: "Explorador da Sustentabilidade", description: "Completou a Trilha de Sustentabilidade.", imageUrl: "/icons/badge_sustainability.svg" },
];

export const mockInnovationTrails: InnovationTrail[] = [
  {
    id: "T001",
    name: "Trilha de Sustentabilidade",
    description: "Aprenda e contribua com ideias para um futuro mais verde.",
    iconUrl: "/icons/trail_sustainability.svg",
    stages: [
      { id: "T001S001", name: "Introdução à Sustentabilidade", description: "Leia o material sobre os pilares da sustentabilidade.", criteriaToComplete: "read_sustainability_intro_material", pointsAwarded: 10 },
      { id: "T001S002", name: "Ideia Sustentável", description: "Submeta uma ideia de projeto com foco em sustentabilidade.", criteriaToComplete: "submit_idea_sustainability_topic", pointsAwarded: 50, badgeIdToAward: "B004" },
      { id: "T001S003", name: "Feedback Construtivo", description: "Comente em pelo menos duas outras ideias da trilha de sustentabilidade.", criteriaToComplete: "comment_on_2_sustainability_ideas", pointsAwarded: 20 },
    ]
  },
  {
    id: "T002",
    name: "Trilha de Otimização de Processos",
    description: "Descubra como tornar nossos processos mais eficientes.",
    iconUrl: "/icons/trail_optimization.svg",
    stages: [
      { id: "T002S001", name: "Mapeamento de Processo Atual", description: "Analise um processo existente e identifique gargalos.", criteriaToComplete: "analyze_current_process_bottlenecks", pointsAwarded: 30 },
      { id: "T002S002", name: "Proposta de Melhoria", description: "Submeta uma ideia para otimizar o processo analisado.", criteriaToComplete: "submit_idea_process_optimization", pointsAwarded: 50 },
    ]
  }
];

export const mockUser: User = {
  id: "U001",
  name: "Usuário Teste",
};

export const mockUserGamificationProgress: UserGamificationProgress = {
  userId: "U001",
  currentPoints: 60,
  earnedBadgeIds: ["B001"],
  completedStageIds: ["T001S001"],
};

