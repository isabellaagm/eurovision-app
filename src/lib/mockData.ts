// src/lib/mockData.ts
import { Project, DashboardMetric, Badge, InnovationTrail, UserGamificationProgress, UserProfile, UserCompletedStage } from "./types";

// Dados mockados para Projetos
export const mockProjects: Project[] = [
  { id: 'P001', name: 'Plataforma IA Vendas', gerencia: 'Comercial', status: 'Development', created_at: '2024-01-15' },
  { id: 'P002', name: 'Otimização Logística Rota', gerencia: 'Supply Chain', status: 'Completed', created_at: '2023-11-01', updated_at: '2024-04-30' },
  { id: 'P003', name: 'App Engajamento RH', gerencia: 'RH', status: 'Idea', created_at: '2024-05-01' },
  { id: 'P004', name: 'Redução Custo Embalagem', gerencia: 'Produção', status: 'Development', created_at: '2024-02-20' },
  { id: 'P005', name: 'Análise Preditiva Qualidade', gerencia: 'Qualidade', status: 'On Hold', created_at: '2024-03-10' },
  { id: 'P006', name: 'Novo Canal E-commerce B2B', gerencia: 'Comercial', status: 'Development', created_at: '2024-04-05' },
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

export const mockBadges: Badge[] = [
  { id: "B001", name: "Inovador Iniciante", description: "Completou sua primeira trilha de inovação.", image_url: "/icons/badge_beginner.svg" },
  { id: "B002", name: "Mestre das Ideias", description: "Submeteu 5 ideias de alta qualidade.", image_url: "/icons/badge_idea_master.svg" },
  { id: "B003", name: "Colaborador Estrela", description: "Participou ativamente em 3 projetos colaborativos.", image_url: "/icons/badge_collaborator.svg" },
  { id: "B004", name: "Explorador da Sustentabilidade", description: "Completou a Trilha de Sustentabilidade.", image_url: "/icons/badge_sustainability.svg" },
];

export const mockInnovationTrails: InnovationTrail[] = [
  {
    id: "T001",
    name: "Trilha de Sustentabilidade",
    description: "Aprenda e contribua com ideias para um futuro mais verde.",
    icon_url: "/icons/trail_sustainability.svg",
    stages: [
      {
        id: "T001S001",
        trail_id: "T001",
        name: "Introdução à Sustentabilidade",
        description: "Leia o material sobre os pilares da sustentabilidade.",
        criteria_type: "read_sustainability_intro_material",
        points_awarded: 10,
        stage_sequence: 1,
      },
      {
        id: "T001S002",
        trail_id: "T001",
        name: "Ideia Sustentável",
        description: "Submeta uma ideia de projeto com foco em sustentabilidade.",
        criteria_type: "submit_idea_sustainability_topic",
        points_awarded: 50,
        badge_id_to_award: mockBadges[3].id,
        badge_to_award: mockBadges[3],
        stage_sequence: 2,
      },
      {
        id: "T001S003",
        trail_id: "T001",
        name: "Feedback Construtivo",
        description: "Comente em pelo menos duas outras ideias da trilha de sustentabilidade.",
        criteria_type: "comment_on_2_sustainability_ideas",
        points_awarded: 20,
        stage_sequence: 3,
      },
    ]
  },
  {
    id: "T002",
    name: "Trilha de Otimização de Processos",
    description: "Descubra como tornar nossos processos mais eficientes.",
    icon_url: "/icons/trail_optimization.svg",
    stages: [
      {
        id: "T002S001",
        trail_id: "T002",
        name: "Mapeamento de Processo Atual",
        description: "Analise um processo existente e identifique gargalos.",
        criteria_type: "analyze_current_process_bottlenecks",
        points_awarded: 30,
        stage_sequence: 1,
      },
      {
        id: "T002S002",
        trail_id: "T002",
        name: "Proposta de Melhoria",
        description: "Submeta uma ideia para otimizar o processo analisado.",
        criteria_type: "submit_idea_process_optimization",
        points_awarded: 50,
        stage_sequence: 2,
      },
    ]
  }
];

export const mockUser: UserProfile = {
  id: "U001",
  full_name: "Usuário Teste",
  job_title: "Inovador",
};

export const mockUserCompletedStage: UserCompletedStage = {
  user_id: "U001",
  stage_id: "T001S001",
  completed_at: "2024-04-01T12:00:00Z",
};
export const mockUserGamificationProgress: UserGamificationProgress = {
  user_id: "U001",
  current_points: 60,
  earned_badge_ids: ["B001"],
  completed_stage_ids: ["T001S001"],
  user_completed_stages: [mockUserCompletedStage],
};

