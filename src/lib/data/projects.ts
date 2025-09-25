import { mockProjects } from "../mockData";
import type { Project } from "../types";
import { getSupabaseServerClient, isSupabaseConfigured } from "../supabase/serverClient";

interface ProjectsMeta {
  source: "supabase" | "mock";
  warning?: string;
}

interface ProjectsSuccess {
  status: number;
  projects: Project[];
  meta: ProjectsMeta;
}

interface ProjectSuccess {
  status: number;
  project: Project;
  meta: ProjectsMeta;
}

interface ErrorResult {
  status: number;
  error: string;
}

type ListProjectsResult = ProjectsSuccess | ErrorResult;
type GetProjectResult = ProjectSuccess | ErrorResult;

export type ProjectPayload = Pick<Project, "name" | "description" | "status" | "gerencia">;

const DEFAULT_ERROR = "Falha ao comunicar com o Supabase.";

export async function listProjects(): Promise<ListProjectsResult> {
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return {
      status: 200,
      projects: mockProjects,
      meta: {
        source: "mock",
        warning: isSupabaseConfigured()
          ? "Cliente supabase indisponível."
          : "Supabase não configurado. Exibindo dados fictícios.",
      },
    };
  }

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      return {
        status: 401,
        error: authError.message || "Usuário não autenticado.",
      };
    }

    if (!user) {
      return {
        status: 200,
        projects: mockProjects,
        meta: {
          source: "mock",
          warning: "Sessão não encontrada. Exibindo dados fictícios até que o usuário se autentique.",
        },
      };
    }

    const { data, error } = await supabase
      .from("projects")
      .select(
        `id, name, description, status, gerencia, created_at, updated_at, last_modified_by_user_id,
         users (full_name, avatar_url),
         project_participants (user_id, users(full_name, avatar_url, job_title))`
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro Supabase ao listar projetos:", error);
      return {
        status: 500,
        error: error.message || DEFAULT_ERROR,
      };
    }

    return {
      status: 200,
      projects: (data as Project[]) ?? [],
      meta: { source: "supabase" },
    };
  } catch (err) {
    console.error("Erro inesperado ao listar projetos:", err);
    return {
      status: 500,
      error: err instanceof Error ? err.message : DEFAULT_ERROR,
    };
  }
}

export async function fetchProjectById(id: string): Promise<GetProjectResult> {
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    const project = mockProjects.find((p) => p.id === id);
    if (!project) {
      return { status: 404, error: "Projeto não encontrado." };
    }
    return {
      status: 200,
      project,
      meta: {
        source: "mock",
        warning: isSupabaseConfigured()
          ? "Cliente supabase indisponível."
          : "Supabase não configurado. Exibindo dados fictícios.",
      },
    };
  }

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      return {
        status: 401,
        error: authError.message || "Usuário não autenticado.",
      };
    }

    if (!user) {
      const project = mockProjects.find((p) => p.id === id);
      if (!project) {
        return { status: 404, error: "Projeto não encontrado." };
      }
      return {
        status: 200,
        project,
        meta: {
          source: "mock",
          warning: "Sessão não encontrada. Exibindo dados fictícios até que o usuário se autentique.",
        },
      };
    }

    const { data, error } = await supabase
      .from("projects")
      .select(
        `id, name, description, status, gerencia, created_at, updated_at, last_modified_by_user_id,
         users (full_name, avatar_url),
         project_participants (user_id, users(full_name, avatar_url, job_title))`
      )
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return { status: 404, error: "Projeto não encontrado." };
      }
      console.error(`Erro Supabase ao buscar projeto ${id}:`, error);
      return {
        status: 500,
        error: error.message || DEFAULT_ERROR,
      };
    }

    return {
      status: 200,
      project: data as Project,
      meta: { source: "supabase" },
    };
  } catch (err) {
    console.error(`Erro inesperado ao buscar projeto ${id}:`, err);
    return {
      status: 500,
      error: err instanceof Error ? err.message : DEFAULT_ERROR,
    };
  }
}

export async function createProject(payload: ProjectPayload) {
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return {
      status: 503,
      error: "Supabase não configurado. Não é possível criar projetos reais neste ambiente.",
    } satisfies ErrorResult;
  }

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        status: 401,
        error: authError?.message || "Usuário não autenticado.",
      } satisfies ErrorResult;
    }

    const { data, error } = await supabase
      .from("projects")
      .insert({
        name: payload.name,
        description: payload.description,
        status: payload.status,
        gerencia: payload.gerencia,
        last_modified_by_user_id: user.id,
      })
      .select(
        `id, name, description, status, gerencia, created_at, updated_at, last_modified_by_user_id`
      )
      .single();

    if (error) {
      console.error("Erro Supabase ao criar projeto:", error);
      return {
        status: 500,
        error: error.message || DEFAULT_ERROR,
      } satisfies ErrorResult;
    }

    return {
      status: 201,
      project: data as Project,
      meta: { source: "supabase" },
    } satisfies ProjectSuccess;
  } catch (err) {
    console.error("Erro inesperado ao criar projeto:", err);
    return {
      status: 500,
      error: err instanceof Error ? err.message : DEFAULT_ERROR,
    } satisfies ErrorResult;
  }
}

export async function updateProject(id: string, payload: ProjectPayload) {
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return {
      status: 503,
      error: "Supabase não configurado. Não é possível atualizar projetos reais neste ambiente.",
    } satisfies ErrorResult;
  }

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        status: 401,
        error: authError?.message || "Usuário não autenticado.",
      } satisfies ErrorResult;
    }

    const { data, error } = await supabase
      .from("projects")
      .update({
        name: payload.name,
        description: payload.description,
        status: payload.status,
        gerencia: payload.gerencia,
        last_modified_by_user_id: user.id,
      })
      .eq("id", id)
      .select(
        `id, name, description, status, gerencia, created_at, updated_at, last_modified_by_user_id`
      )
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return { status: 404, error: "Projeto não encontrado ou permissão negada." } satisfies ErrorResult;
      }

      console.error(`Erro Supabase ao atualizar projeto ${id}:`, error);
      return {
        status: 500,
        error: error.message || DEFAULT_ERROR,
      } satisfies ErrorResult;
    }

    if (!data) {
      return { status: 404, error: "Projeto não encontrado." } satisfies ErrorResult;
    }

    return {
      status: 200,
      project: data as Project,
      meta: { source: "supabase" },
    } satisfies ProjectSuccess;
  } catch (err) {
    console.error(`Erro inesperado ao atualizar projeto ${id}:`, err);
    return {
      status: 500,
      error: err instanceof Error ? err.message : DEFAULT_ERROR,
    } satisfies ErrorResult;
  }
}

export async function removeProject(id: string) {
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return {
      status: 503,
      error: "Supabase não configurado. Não é possível excluir projetos reais neste ambiente.",
    } satisfies ErrorResult;
  }

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        status: 401,
        error: authError?.message || "Usuário não autenticado.",
      } satisfies ErrorResult;
    }

    const { error, count } = await supabase
      .from("projects")
      .delete({ count: "exact" })
      .eq("id", id);

    if (error) {
      console.error(`Erro Supabase ao excluir projeto ${id}:`, error);
      return {
        status: 500,
        error: error.message || DEFAULT_ERROR,
      } satisfies ErrorResult;
    }

    if (!count) {
      return { status: 404, error: "Projeto não encontrado ou permissão negada." } satisfies ErrorResult;
    }

    return { status: 204 } as const;
  } catch (err) {
    console.error(`Erro inesperado ao excluir projeto ${id}:`, err);
    return {
      status: 500,
      error: err instanceof Error ? err.message : DEFAULT_ERROR,
    } satisfies ErrorResult;
  }
}