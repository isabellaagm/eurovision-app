// src/lib/data/gamification.ts

import { getSupabaseServerClient } from "../supabase/serverClient";
import type { Badge, InnovationTrail, UserGamificationProgress } from "../types";

// Busca todas as trilhas de inovação e suas respectivas etapas
export async function listInnovationTrails(): Promise<{ trails?: InnovationTrail[]; error?: string }> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Supabase não configurado." };

  const { data, error } = await supabase
    .from("innovation_trails")
    .select(`*, stages:trail_stages(*)`)
    .order('created_at', { ascending: true });

  if (error) {
    console.error("Erro ao buscar trilhas:", error);
    return { error: error.message };
  }
  
  return { trails: data };
}

// Busca uma única trilha por ID
export async function getTrailById(id: string): Promise<{ trail?: InnovationTrail; error?: string }> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Supabase não configurado." };

  const { data, error } = await supabase
    .from("innovation_trails")
    .select(`*, stages:trail_stages(*)`)
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Erro ao buscar trilha ${id}:`, error);
    return { error: error.message };
  }
  
  return { trail: data };
}

// Busca o progresso de gamificação de um usuário específico
export async function getUserProgress(userId: string): Promise<{ progress?: UserGamificationProgress | null; error?: string }> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Supabase não configurado." };

  const { data, error } = await supabase
    .from("user_gamification_progress") // Nome da tabela de progresso
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    // Se o erro for 'PGRST116', significa que o usuário ainda não tem um registro de progresso, o que não é um erro fatal.
    if (error.code === 'PGRST116') {
      return { progress: null }; // Retorna nulo para indicar que não há progresso ainda
    }
    console.error("Erro ao buscar progresso do usuário:", error);
    return { error: error.message };
  }

  return { progress: data };
}


// Busca todos os badges disponíveis
export async function listBadges(): Promise<{ badges?: Badge[]; error?: string }> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { error: "Supabase não configurado." };

  const { data, error } = await supabase.from("badges").select('*');

  if (error) {
    console.error("Erro ao buscar badges:", error);
    return { error: error.message };
  }
  
  return { badges: data };
}

// Chama a função do banco de dados para completar uma etapa
export async function completeStageForUser(userId: string, stageId: string): Promise<{ message?: string; error?: string; progress?: UserGamificationProgress }> {
    const supabase = await getSupabaseServerClient();
    if (!supabase) return { error: "Supabase não configurado." };

    const { data, error } = await supabase.rpc('complete_stage_and_update_progress', {
        p_user_id: userId,
        p_stage_id: stageId
    });

    if (error) {
        console.error('Erro ao chamar a função RPC "complete_stage_and_update_progress":', error);
        return { error: error.message };
    }

    return { 
        message: `Etapa completada com sucesso!`,
        progress: data 
    };
}