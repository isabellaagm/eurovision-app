// src/lib/types.ts

// Representa o perfil público de um usuário, vinculado ao auth.users do Supabase
export interface UserProfile {
  id: string; // UUID, corresponde ao auth.users.id
  created_at?: string;
  updated_at?: string;
  full_name?: string | null;
  avatar_url?: string | null;
  email?: string | null; // Deve ser único
  job_title?: string | null; // Ex: "Desenvolvedor", "Gerente", "Líder", "Executivo"
}

// Representa um projeto no sistema
export interface Project {
  id: string; // UUID
  created_at: string;
  updated_at?: string;
  name: string;
  description?: string | null;
  status?: string | null; // Ex: "Ideia", "Em Desenvolvimento", "Concluído"
  gerencia?: string | null;
  last_modified_by_user_id?: string | null; // UUID do usuário que modificou por último
  // Informações do usuário que modificou por último (se incluído na query)
  users?: {
    full_name?: string | null;
    avatar_url?: string | null;
  } | null;
   project_participants?: {
    user_id: string;
    users?: {
      full_name?: string | null;
      avatar_url?: string | null;
      job_title?: string | null;
    } | null;
  }[] | null;
  // Se precisarmos de participantes diretamente no objeto Project, seria uma lista de UserProfile ou de IDs.
  // project_participants?: ProjectParticipant[]; 
}

// Representa a associação de um usuário a um projeto
export interface ProjectParticipant {
  project_id: string; // UUID
  user_id: string; // UUID
  joined_at?: string;
  user?: UserProfile; // Opcional, para dados do participante
}

// Tipos para Gamificação

// Representa um badge/conquista
export interface Badge {
  id: string; // UUID
  created_at?: string;
  name: string;
  description?: string | null;
  image_url?: string | null;
}

// Representa uma etapa de uma trilha de inovação
export interface TrailStage {
  id: string; // UUID
  trail_id: string; // UUID da trilha pai
  name: string;
  description?: string | null;
  stage_sequence: number; // Ordem da etapa na trilha
  points_awarded?: number;
  badge_id_to_award?: string | null; // UUID do badge concedido
  criteria_type?: string | null; // Tipo de critério para completar (ex: "submit_task", "receive_approval")
  criteria_details?: Record<string, unknown> | null; // JSONB com detalhes do critério
  badge_to_award?: Badge | null; // Opcional, para dados do badge
}

// Representa uma trilha de inovação
export interface InnovationTrail {
  id: string; // UUID
  created_at?: string;
  name: string;
  description?: string | null;
  icon_url?: string | null;
  is_active?: boolean;
  stages?: TrailStage[]; // Populado por query separada ou join
}

// Progresso de gamificação de um usuário (geral)
export interface UserGamificationProgress {
  user_id: string; // UUID, chave primária e estrangeira para users.id
  current_points: number;
  updated_at?: string;
  earned_badge_ids: string[];
  completed_stage_ids: string[];
  // Badges e estágios completados seriam buscados de suas respectivas tabelas
  // user_earned_badges?: UserEarnedBadge[];
  user_completed_stages?: UserCompletedStage[];
}

// Registro de um estágio completado por um usuário
export interface UserCompletedStage {
  user_id: string; // UUID
  stage_id: string; // UUID
  completed_at?: string;
  user?: UserProfile; // Opcional
  stage?: TrailStage; // Opcional
}

// Registro de um badge conquistado por um usuário
export interface UserEarnedBadge {
  user_id: string; // UUID
  badge_id: string; // UUID
  earned_at?: string;
  user?: UserProfile; // Opcional
  badge?: Badge; // Opcional
}

// Exemplo: Tipo para Métricas do Dashboard (pode ser mantido ou adaptado)
export interface DashboardMetric {
  label: string;
  value: string | number;
  unit?: string;
}

