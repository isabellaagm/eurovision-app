// src/app/api/projects/[id]/route.ts
import { NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

async function createSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Variáveis de ambiente do Supabase não configuradas.");
    return null;
  }

  const cookieStore = await cookies();
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}

// GET: Buscar um projeto específico por ID
export async function GET(
  _request: Request, 
  context: { params: { id: string } }
) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase não configurado." }, { status: 500 });
  }
  const projectId = context.params.id;

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
    }

    const {
      data: project,
      error: projectError,
    } = await supabase
      .from("projects")
      .select(`
        id,
        name, 
        description, 
        status, 
        gerencia, 
        created_at, 
        last_modified_by_user_id, 
        users (full_name, avatar_url), 
        project_participants (user_id, users(full_name, avatar_url, job_title))
      `)
      .eq("id", projectId)
      .single();

    if (projectError) {
      if (projectError.code === 'PGRST116') { // Recurso não encontrado
        return NextResponse.json({ error: "Projeto não encontrado." }, { status: 404 });
      }
      console.error(`Erro ao buscar projeto ${projectId}:`, projectError);
      return NextResponse.json(
        { error: projectError.message || "Falha ao buscar projeto." },
        { status: 500 }
      );
    }

    if (!project) {
      return NextResponse.json(
        { error: "Projeto não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });

  } catch (err: unknown) {
    console.error(`Erro inesperado na API do projeto ${projectId} (GET):`, err);
    const message = err instanceof Error ? err.message : "Erro interno do servidor.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT: Atualizar um projeto específico
export async function PUT(
  _request: Request, 
  context: { params: { id: string } }
) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase não configurado." }, { status: 500 });
  }
  const projectId = context.params.id;

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Usuário não autenticado para atualizar projeto." }, { status: 401 });
    }

    // Verificar se o usuário é participante do projeto (RLS deve cuidar disso, mas uma verificação extra pode ser útil)
    // A política de RLS "Allow project participants to update project" já faz essa checagem.

    const body = await _request.json();
    const { name, description, status, gerencia } = body;

    // Validar dados de entrada
    if (!name && !description && !status && !gerencia) {
      return NextResponse.json(
        { error: "Nenhum dado fornecido para atualização." },
        { status: 400 }
      );
    }

    const updateData: Partial<{ name: string; description: string; status: string; gerencia: string }> = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (status) updateData.status = status;
    if (gerencia) updateData.gerencia = gerencia;
    // O trigger on_projects_before_update_set_last_modified cuidará de last_modified_by_user_id

    const {
      data: updatedProject,
      error: updateError,
    } = await supabase
      .from("projects")
      .update(updateData)
      .eq("id", projectId)
      .select(`
        id, 
        name, 
        description, 
        status, 
        gerencia, 
        created_at, 
        updated_at, 
        last_modified_by_user_id,
        users (full_name, avatar_url)
      `)
      .single();

    if (updateError) {
      console.error(`Erro ao atualizar projeto ${projectId}:`, updateError);
      // A RLS pode retornar um erro se o usuário não tiver permissão, resultando em 0 linhas atualizadas.
      // O Supabase pode retornar um erro com code PGRST116 (Not Found) se o update não afetar linhas devido a RLS ou ID inexistente.
      if (
        updateError.code === "PGRST116" ||
        (updateError.details && updateError.details.includes("0 rows"))
      ) {
        return NextResponse.json({ error: "Projeto não encontrado ou permissão negada para atualizar." }, { status: 404 });
      }
      return NextResponse.json(
        { error: updateError.message || "Falha ao atualizar projeto." },
        { status: 500 }
      );
    }
    return NextResponse.json({ project: updatedProject });
  } catch (err: unknown) {
    console.error(`Erro inesperado na API do projeto ${projectId} (PUT):`, err);
    const message = err instanceof Error ? err.message : "Erro interno do servidor.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE: Excluir um projeto específico
export async function DELETE(
  _request: Request, 
  context: { params: { id: string } }
) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase não configurado." }, { status: 500 });
  }
  const projectId = context.params.id;

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Usuário não autenticado para excluir projeto." }, { status: 401 });
    }

    // A política de RLS "Allow managers or leaders to delete projects" cuidará da permissão.
    // Precisamos garantir que o job_title do usuário seja obtido e usado pela função get_my_job_title() no Supabase.

    const { error: deleteError, count } = await supabase
      .from("projects")
      .delete({ count: 'exact' })
      .eq("id", projectId);

    if (deleteError) {
      console.error(`Erro ao excluir projeto ${projectId}:`, deleteError);
      return NextResponse.json(
        { error: deleteError.message || "Falha ao excluir projeto." },
        { status: 500 }
      );
    }

    if (count === 0) {
      return NextResponse.json(
        { error: "Projeto não encontrado ou permissão negada para excluir." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Projeto excluído com sucesso." }, { status: 200 }); // Ou 204 No Content

  } catch (err: unknown) {
    console.error(`Erro inesperado na API do projeto ${projectId} (DELETE):`, err);
    const message = err instanceof Error ? err.message : "Erro interno do servidor.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}