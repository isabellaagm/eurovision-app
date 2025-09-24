// src/app/api/projects/route.ts
import { NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

// Função para criar um cliente Supabase do lado do servidor
type SupabaseCookieStore = {
  get(name: string): { value: string } | undefined;
  set(options: { name: string; value: string } & CookieOptions): void;
};

async function createSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Variáveis de ambiente do Supabase não configuradas.");
    return null;
  }

  const cookieStore = (await cookies()) as unknown as SupabaseCookieStore;
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
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}

// GET: Listar todos os projetos (respeitando RLS)
export async function GET() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase não configurado." }, { status: 500 });
  }
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
    }

    // A RLS no Supabase já filtra os projetos com base nas permissões.
    // O select busca o projeto e os dados do usuário que o modificou por último.
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select(`
        id, 
        name, 
        description, 
        status, 
        gerencia, 
        created_at, 
        last_modified_by_user_id, 
        users (full_name, avatar_url)
      `)
      .order('created_at', { ascending: false }); // Exemplo de ordenação

    if (projectsError) {
      console.error("Erro ao buscar projetos:", projectsError);
      return NextResponse.json(
        { error: projectsError.message || "Falha ao buscar projetos." },
        { status: 500 }
      );
    }
    return NextResponse.json({ projects });
  } catch (err: unknown) {
    console.error("Erro inesperado na API de projetos (GET):", err);
    const message = err instanceof Error ? err.message : "Erro interno do servidor.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST: Criar um novo projeto
export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase não configurado." }, { status: 500 });
  }
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Usuário não autenticado para criar projeto." }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, status, gerencia } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Nome do projeto é obrigatório." },
        { status: 400 }
      );
    }

    // last_modified_by_user_id será preenchido pelo user.id ou pelo trigger no Supabase.
    const { data: newProject, error: insertError } = await supabase
      .from("projects")
      .insert([
        {
          name,
          description,
          status: status || "Ideia", // Status padrão
          gerencia,
          last_modified_by_user_id: user.id // O criador é o último a modificar inicialmente
        },
      ])
      .select(`
        id, 
        name, 
        description, 
        status, 
        gerencia, 
        created_at, 
        last_modified_by_user_id,
        users (full_name, avatar_url)
      `)
      .single(); // .single() é usado porque estamos inserindo um único registro e esperando um único de volta.

    if (insertError) {
      console.error("Erro ao criar projeto:", insertError);
      if (insertError.code === '23505') { // unique_violation (ex: se nome do projeto for único)
        return NextResponse.json(
            { error: "Erro de duplicação. Um projeto com este nome já pode existir." }, 
            { status: 409 }
        );
      }
      return NextResponse.json(
        { error: insertError.message || "Falha ao criar projeto." },
        { status: 500 }
      );
    }

    // Adicionar o criador como participante do projeto automaticamente
    if (newProject) {
        const { error: participantError } = await supabase
            .from("project_participants")
            .insert({ project_id: newProject.id, user_id: user.id });
        
        if (participantError) {
            // Logar o erro, mas não necessariamente falhar a criação do projeto por isso.
            console.warn("Falha ao adicionar criador como participante do projeto:", participantError.message);
        }
    }

    return NextResponse.json({ project: newProject }, { status: 201 });

  } catch (err: unknown) {
    console.error("Erro inesperado na API de projetos (POST):", err);
    const message = err instanceof Error ? err.message : "Erro interno do servidor.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
