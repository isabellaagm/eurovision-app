import { NextResponse } from "next/server";
import {
  fetchProjectById,
  removeProject,
  updateProject,
  type ProjectPayload,
} from "@/lib/data/projects";

type RouteParams = {
  params: { id: string };
};

export async function GET(_request: Request, { params }: RouteParams) {
  const result = await fetchProjectById(params.id);

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(
    { project: result.project, meta: result.meta },
    { status: result.status },
  );
}

export async function PUT(request: Request, { params }: RouteParams) {
  const payload = (await request.json()) as ProjectPayload;
  const result = await updateProject(params.id, payload);

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(
    { project: result.project, meta: result.meta },
    { status: result.status },
  );
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const result = await removeProject(params.id);

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(null, { status: result.status });
}