// app/api/requests/route.ts
import { NextResponse } from 'next/server'

interface RequestBody {
  title: string
  description: string
  gerencia: string
}

interface RequestItem extends RequestBody {
  id: number
  date: string
}

// const porque a referência ao array não muda, mesmo que façamos push()
const requests: RequestItem[] = []

export async function GET() {
  return NextResponse.json({ requests })
}

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json()
    if (!body.title || !body.description || !body.gerencia) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando.' }, { status: 400 })
    }

    const newRequest: RequestItem = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...body,
    }

    requests.push(newRequest)
    return NextResponse.json({ success: true, request: newRequest })
  } catch {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
  }
}
