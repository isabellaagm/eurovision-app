// app/api/ai/chat/route.ts

import { NextResponse } from 'next/server'
import {
  mockProjects,
  mockMetrics,
  mockProjectsSummary,
} from '@/lib/mockData'

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt não fornecido.' }, { status: 400 })
    }

    if (!OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY não configurada.')
      return NextResponse.json(
        { error: 'Configuração ausente da chave de API. Contate o administrador.' },
        { status: 500 }
      )
    }

    // Monta um system prompt que inclui seus dados mockados
    const systemPrompt = `
Você é o assistente EuroVision AI. Use APENAS as informações abaixo para responder de forma concisa.

🗂️ Projetos mockados:
${JSON.stringify(mockProjects, null, 2)}

📊 Métricas mockadas:
${JSON.stringify(mockMetrics, null, 2)}

📈 Resumo por status/gerência:
${JSON.stringify(mockProjectsSummary, null, 2)}
`

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ]

    const res = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 150,
        temperature: 0.7,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('OpenRouter API error:', errText)
      return NextResponse.json({ error: 'Erro na API OpenRouter', details: errText }, { status: res.status })
    }

    const data = await res.json()
    const aiMessage = data.choices?.[0]?.message?.content?.trim() || 'Sem resposta.'

    return NextResponse.json({ response: aiMessage })
  } catch (err) {
    console.error('Erro interno no handler /api/ai/chat:', err)
    return NextResponse.json(
      { error: 'Erro interno. Tente novamente mais tarde.' },
      { status: 500 }
    )
  }
}
