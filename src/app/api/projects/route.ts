import { NextResponse } from "next/server";
import { createProject, listProjects } from "@/lib/data/projects";

export async function GET() {
  const result = await listProjects();

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(
    { projects: result.projects, meta: result.meta },
    { status: result.status });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description, status, gerencia } = body ?? {};
  if (!name || typeof name !== "string") {
    return NextResponse.json(
      { error: "Nome do projeto é obrigatório." },
      { status: 400 }
    );
  }
  const result = await createProject({
    name,
    description,
    status,
    gerencia,
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json(
    { project: result.project, meta: result.meta },
    { status: result.status }
  );
}