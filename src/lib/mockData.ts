// src/lib/mockData.ts
// Versão final com todos os tipos e dados de exemplo sincronizados.

import { Project, DashboardMetric, Badge, InnovationTrail, UserGamificationProgress, UserProfile, UserCompletedStage, TrailStage } from "./types";

// --- Dados de Usuários Fictícios para reuso ---
const mockUser1: UserProfile = { id: 'U001', full_name: 'Ana Inovadora', job_title: 'Gerente de Produto', avatar_url: 'https://i.pravatar.cc/150?u=ana' };
const mockUser2: UserProfile = { id: 'U002', full_name: 'Beto Criativo', job_title: 'Desenvolvedor Frontend', avatar_url: 'https://i.pravatar.cc/150?u=beto' };
const mockUser3: UserProfile = { id: 'U003', full_name: 'Clara Estrategista', job_title: 'Analista de Negócios', avatar_url: 'https://i.pravatar.cc/150?u=clara' };
const mockUser4: UserProfile = { id: 'U004', full_name: 'Daniel Tech', job_title: 'Arquiteto de Soluções', avatar_url: 'https://i.pravatar.cc/150?u=daniel' };


// --- Dados mockados para Projetos (CORRIGIDOS E EXPANDIDOS) ---
export const mockProjects: Project[] = [
  {
    id: 'P001', name: 'Plataforma IA Vendas', gerencia: 'Comercial', status: 'Development',
    created_at: '2025-01-15T10:00:00Z', updated_at: '2025-08-20T11:00:00Z',
    description: 'Desenvolvimento de uma plataforma com IA para auxiliar a equipe de vendas na qualificação de leads e sugestão de produtos.',
    last_modified_by_user_id: 'U001',
    budget_allocated: 1800000,
    user_profiles: [{ full_name: mockUser1.full_name, avatar_url: mockUser1.avatar_url }],
    project_participants: [
      { user_id: 'U001', user_profiles: [mockUser1] },
      { user_id: 'U002', user_profiles: [mockUser2] },
    ]
  },
  {
    id: 'P002', name: 'Otimização Logística Rota', gerencia: 'Supply Chain', status: 'Completed',
    created_at: '2024-11-01T09:00:00Z', updated_at: '2025-04-30T17:00:00Z',
    description: 'Projeto concluído para otimização de rotas de entrega, resultando em 15% de economia de combustível.',
    last_modified_by_user_id: 'U003',
    budget_allocated: 1250000,
    user_profiles: [{ full_name: mockUser3.full_name, avatar_url: mockUser3.avatar_url }],
    project_participants: [ { user_id: 'U003', user_profiles: [mockUser3] } ]
  },
  {
    id: 'P003', name: 'App Engajamento RH', gerencia: 'RH', status: 'Idea',
    created_at: '2025-05-01T14:00:00Z', updated_at: '2025-06-10T09:00:00Z',
    description: 'Ideia para um aplicativo de engajamento interno com gamificação e reconhecimento.',
    last_modified_by_user_id: 'U001',
    budget_allocated: 350000,
    user_profiles: [{ full_name: mockUser1.full_name, avatar_url: mockUser1.avatar_url }],
    project_participants: [ { user_id: 'U001', user_profiles: [mockUser1] } ]
  },
  {
    id: 'P004', name: 'Redução Custo Embalagem', gerencia: 'Produção', status: 'On Hold',
    created_at: '2025-02-20T16:00:00Z', updated_at: '2025-04-10T10:00:00Z',
    description: 'Projeto em espera para reavaliar fornecedores de material para embalagens sustentáveis e mais econômicas.',
    last_modified_by_user_id: 'U002',
    budget_allocated: 480000,
    user_profiles: [{ full_name: mockUser2.full_name, avatar_url: mockUser2.avatar_url }],
    project_participants: []
  },
  {
    id: 'P005', name: 'Dashboard Financeiro em Tempo Real', gerencia: 'Financeiro', status: 'Development',
    created_at: '2025-03-12T11:00:00Z', updated_at: '2025-09-01T15:00:00Z',
    description: 'Criação de um dashboard integrado com o ERP para visualização de métricas financeiras em tempo real pela diretoria.',
    last_modified_by_user_id: 'U003',
    budget_allocated: 2100000,
    user_profiles: [{ full_name: mockUser3.full_name, avatar_url: mockUser3.avatar_url }],
    project_participants: [
      { user_id: 'U003', user_profiles: [mockUser3] },
      { user_id: 'U004', user_profiles: [mockUser4] },
    ]
  },
  {
    id: 'P006', name: 'Migração para Cloud Híbrida', gerencia: 'TI', status: 'Development',
    created_at: '2024-10-05T08:00:00Z', updated_at: '2025-08-22T18:00:00Z',
    description: 'Projeto estratégico de migração de parte da infraestrutura on-premise para um ambiente de nuvem híbrida visando escalabilidade.',
    last_modified_by_user_id: 'U004',
    budget_allocated: 3500000,
    user_profiles: [{ full_name: mockUser4.full_name, avatar_url: mockUser4.avatar_url }],
    project_participants: [ { user_id: 'U004', user_profiles: [mockUser4] } ]
  },
];


// --- O RESTANTE DO ARQUIVO NÃO PRECISA DE ALTERAÇÕES, MAS FOI CORRIGIDO TAMBÉM ---
export const mockMetrics: DashboardMetric[] = [
  { label: 'Total de Projetos', value: mockProjects.length },
  { label: 'Em Desenvolvimento', value: mockProjects.filter(p => p.status === 'Development').length },
  { label: 'Concluídos (Último Ano)', value: mockProjects.filter(p => p.status === 'Completed').length },
  { label: 'Budget Alocado (Milhões)', value: mockProjects.reduce((sum, p) => sum + (p.budget_allocated || 0), 0) / 1000000, unit: 'R$' },
];

export const mockProjectsSummary = {
  byStatus: ["Idea", "Development", "Completed", "On Hold"].map(status => ({
    name: status,
    value: mockProjects.filter(p => p.status === status).length
  })),
  byGerencia: [...new Set(mockProjects.map(p => p.gerencia).filter(g => g))].map(gerencia => ({
    name: gerencia!,
    value: mockProjects.filter(p => p.gerencia === gerencia).length
  })),
};

export const mockBadges: Badge[] = [
  { id: "8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d", name: "Inovador Iniciante", description: "Completou sua primeira trilha de inovação.", image_url: "/icons/award.svg" },
  { id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e", name: "Mestre das Ideias", description: "Submeteu 5 ideias de alta qualidade.", image_url: "/icons/lightbulb.svg" },
];

export const mockInnovationTrails: InnovationTrail[] = [
  {
    id: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9b",
    name: "Trilha de Sustentabilidade",
    description: "Aprenda e contribua com ideias para um futuro mais verde.",
    icon_url: "/icons/leaf.svg",
    icon_name: "Leaf",
    stages: [
      { id: "f0a1b2c3-d4e5-f6a7-b8c9-0d1e2f3a4b5c", trail_id: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9b", name: "Introdução à Sustentabilidade", description: "Leia o material sobre os pilares da sustentabilidade.", points_awarded: 10, stage_sequence: 1, badge_id: undefined } as TrailStage,
      // CORREÇÃO: Usando 'badge_id'
      { id: "a1b2c3d4-e5f6-a7b8-c9d0-1e2f3a4b5c6d", trail_id: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9b", name: "Ideia Sustentável", description: "Submeta uma ideia de projeto com foco em sustentabilidade.", points_awarded: 50, badge_id: mockBadges[0].id, stage_sequence: 2 } as TrailStage,
    ]
  },
];

export const mockUser: UserProfile = {
  id: "11111111-1111-1111-1111-111111111111",
  full_name: "Ana Inovadora",
  job_title: "Gerente de Produto",
};

export const mockUserCompletedStage: UserCompletedStage = {
  user_id: "11111111-1111-1111-1111-111111111111",
  stage_id: "f0a1b2c3-d4e5-f6a7-b8c9-0d1e2f3a4b5c",
  completed_at: "2025-04-01T12:00:00Z",
};

export const mockUserGamificationProgress: UserGamificationProgress = {
  user_id: "11111111-1111-1111-1111-111111111111",
  current_points: 60,
  earned_badge_ids: ["8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d"],
  completed_stage_ids: ["f0a1b2c3-d4e5-f6a7-b8c9-0d1e2f3a4b5c", "a1b2c3d4-e5f6-a7b8-c9d0-1e2f3a4b5c6d"],
};