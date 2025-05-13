// Exemplo: Tipo para um Projeto (simplificado por enquanto)
export interface Project {
    id: string;
    name: string;
    gerencia: string;
    status: 'Idea' | 'Development' | 'Completed' | 'On Hold';
    startDate: string; 
    endDate?: string; 
    description?: string; // Adicionado/Confirmado
  }
  // ... resto dos tipos
  
  
  // Exemplo: Tipo para Métricas do Dashboard
  export interface DashboardMetric {
    label: string;
    value: string | number;
    unit?: string;
  }

  // Tipos para Gamificação
export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string; // URL para a imagem do badge
}

export interface TrailStage {
  id: string;
  name: string;
  description: string;
  criteriaToComplete: string; // Ex: "submit_idea_sustainability", "comment_on_3_ideas"
  pointsAwarded: number;
  badgeIdToAward?: string; // ID do badge concedido ao completar esta etapa
}

export interface InnovationTrail {
  id: string;
  name: string;
  description: string;
  iconUrl?: string; // URL para um ícone da trilha
  stages: TrailStage[];
}

export interface User {
  id: string;
  name: string;
  // outros campos de usuário existentes ou futuros
}

export interface UserGamificationProgress {
  userId: string;
  currentPoints: number;
  earnedBadgeIds: string[];
  completedStageIds: string[];
  // Poderia ter progresso específico por trilha também
  // progressByTrail: { trailId: string, currentStageId: string, completedStagesInTrail: string[] }[];
}

  
  