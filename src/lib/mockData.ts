// src/lib/mockData.ts
// Versão final com os dados de exemplo sincronizados com os tipos.

import { Project, DashboardMetric, Badge, InnovationTrail, UserGamificationProgress, UserProfile, UserCompletedStage } from "./types";

// --- Dados de Usuários Fictícios para reuso ---
const mockUser1: UserProfile = { id: 'U001', full_name: 'Ana Inovadora', job_title: 'Gerente de Produto', avatar_url: 'https://i.pravatar.cc/150?u=ana' };
const mockUser2: UserProfile = { id: 'U002', full_name: 'Beto Criativo', job_title: 'Desenvolvedor Frontend', avatar_url: 'https://i.pravatar.cc/150?u=beto' };
const mockUser3: UserProfile = { id: 'U003', full_name: 'Clara Estrategista', job_title: 'Analista de Negócios', avatar_url: 'https://i.pravatar.cc/150?u=clara' };

// --- Dados mockados para Projetos (CORRIGIDOS PARA USAR ARRAYS) ---
export const mockProjects: Project[] = [
  {
    id: 'P001',
    name: 'Plataforma IA Vendas',
    gerencia: 'Comercial',
    status: 'Development',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-05-20T11:00:00Z',
    description: 'Desenvolvimento de uma plataforma com IA para auxiliar a equipe de vendas na qualificação de leads e sugestão de produtos.',
    last_modified_by_user_id: 'U001',
    // CORREÇÃO: user_profiles agora é um array
    user_profiles: [{ full_name: mockUser1.full_name, avatar_url: mockUser1.avatar_url }],
    project_participants: [
      // CORREÇÃO: user_profiles de cada participante agora é um array
      { user_id: 'U001', user_profiles: [mockUser1] },
      { user_id: 'U002', user_profiles: [mockUser2] },
    ]
  },
  {
    id: 'P002',
    name: 'Otimização Logística Rota',
    gerencia: 'Supply Chain',
    status: 'Completed',
    created_at: '2023-11-01T09:00:00Z',
    updated_at: '2024-04-30T17:00:00Z',
    description: 'Projeto concluído para otimização de rotas de entrega, resultando em 15% de economia de combustível.',
    last_modified_by_user_id: 'U003',
    // CORREÇÃO: user_profiles agora é um array
    user_profiles: [{ full_name: mockUser3.full_name, avatar_url: mockUser3.avatar_url }],
    project_participants: [
      { user_id: 'U003', user_profiles: [mockUser3] },
    ]
  },
  {
    id: 'P003',
    name: 'App Engajamento RH',
    gerencia: 'RH',
    status: 'Idea',
    created_at: '2024-05-01T14:00:00Z',
    updated_at: undefined,
    description: 'Ideia para um aplicativo de engajamento interno com gamificação e reconhecimento.',
    last_modified_by_user_id: 'U001',
    // CORREÇÃO: user_profiles agora é um array
    user_profiles: [{ full_name: mockUser1.full_name, avatar_url: mockUser1.avatar_url }],
    project_participants: [
       { user_id: 'U001', user_profiles: [mockUser1] },
    ]
  },
  {
    id: 'P004',
    name: 'Redução Custo Embalagem',
    gerencia: 'Produção',
    status: 'On Hold',
    created_at: '2024-02-20T16:00:00Z',
    updated_at: '2024-04-10T10:00:00Z',
    description: 'Projeto em espera para reavaliar fornecedores de material para embalagens sustentáveis e mais econômicas.',
    last_modified_by_user_id: 'U002',
    // CORREÇÃO: user_profiles agora é um array
    user_profiles: [{ full_name: mockUser2.full_name, avatar_url: mockUser2.avatar_url }],
    project_participants: []
  },
];

// --- O RESTANTE DO ARQUIVO NÃO PRECISA DE ALTERAÇÕES ---
// ... (cole o restante do seu mockData aqui, ele não precisa de mudanças) ...
export const mockMetrics: DashboardMetric[] = [
  { label: 'Total de Projetos', value: mockProjects.length },
  { label: 'Em Desenvolvimento', value: mockProjects.filter(p => p.status === 'Development').length },
  { label: 'Concluídos (Último Ano)', value: mockProjects.filter(p => p.status === 'Completed').length },
  { label: 'Budget Alocado (Milhões)', value: 12.5, unit: 'R$' },
];
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
      { id: "T001S001", trail_id: "T001", name: "Introdução à Sustentabilidade", description: "Leia o material sobre os pilares da sustentabilidade.", criteria_type: "read_sustainability_intro_material", points_awarded: 10, stage_sequence: 1, },
      { id: "T001S002", trail_id: "T001", name: "Ideia Sustentável", description: "Submeta uma ideia de projeto com foco em sustentabilidade.", criteria_type: "submit_idea_sustainability_topic", points_awarded: 50, badge_id_to_award: mockBadges[3].id, badge_to_award: mockBadges[3], stage_sequence: 2, },
      { id: "T001S003", trail_id: "T001", name: "Feedback Construtivo", description: "Comente em pelo menos duas outras ideias da trilha de sustentabilidade.", criteria_type: "comment_on_2_sustainability_ideas", points_awarded: 20, stage_sequence: 3, },
    ]
  },
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