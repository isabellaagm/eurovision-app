'use client'

import { useMemo, useState } from 'react'
import { MessageCircle } from 'lucide-react'

interface ChatWidgetProps {
  isConfigured: boolean;
}

export default function ChatWidget({ isConfigured }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [userInput, setUserInput] = useState('')

  const unavailableMessage = useMemo(
    () => 'Assistente indisponível. Configure a variável OPENROUTER_API_KEY para ativar o chat.',
    []
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConfigured) {
      return
    }
    if (!userInput.trim()) return

    // adiciona mensagem do usuário
    setMessages((prev) => [...prev, { role: 'user', content: userInput }])
    const promptToSend = userInput
    setUserInput('')

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToSend }),
      })

       const rawBody = await res.text()

      if (!res.ok) {
        let errorMessage = 'Erro ao obter resposta do assistente. Tente novamente mais tarde.'

        if (rawBody) {
          try {
            const parsed = JSON.parse(rawBody)
            const parsedMessage =
              typeof parsed?.error === 'string'
                ? parsed.error
                : typeof parsed?.message === 'string'
                  ? parsed.message
                  : undefined

            if (parsedMessage) {
              errorMessage = parsedMessage
            }
          } catch {
            errorMessage = rawBody
          }
        }

        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: errorMessage },
        ])
        return
      }

      let data: unknown
      try {
        data = rawBody ? JSON.parse(rawBody) : {}
      } catch (error) {
        console.error('Falha ao interpretar resposta /api/ai/chat:', error)
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Não foi possível interpretar a resposta do assistente.',
          },
        ])
        return
      }

      let reply: string | null = null
      if (typeof data === 'object' && data !== null && 'response' in data) {
        const candidate = (data as Record<string, unknown>).response
        if (typeof candidate === 'string') {
          reply = candidate
        }
      }

      reply = reply || 'Desculpe, sem resposta.'

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      console.error('Erro ao chamar /api/ai/chat:', err)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Erro interno. Tente mais tarde.' },
      ])
    }
  }

  return (
    <>
      {/* Ícone flutuante */}
      <div
        className="fixed bottom-6 right-6 z-50 cursor-pointer rounded-full bg-[--color-eurofarma-blue] p-4 text-white shadow-lg transition hover:scale-110 hover:bg-blue-700"
        onClick={() => setIsOpen((o) => !o)}
      >
        <MessageCircle size={24} />
      </div>

      {/* Janela do chat */}
      <div
        className={`fixed bottom-28 right-6 z-50 flex w-[340px] max-h-[520px] flex-col rounded-3xl border border-white/10 bg-slate-900/90 text-slate-100 shadow-2xl backdrop-blur transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Cabeçalho */}
        <div className="rounded-t-3xl border-b border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white">
          Assistente Virtual
        </div>

        {/* Área de mensagens */}
        <div className="flex-1 space-y-3 overflow-y-auto bg-transparent px-5 py-4">
          {!isConfigured && (
            <div className="rounded-xl border border-amber-300/40 bg-amber-400/20 px-3 py-2 text-xs text-amber-100">
              {unavailableMessage}
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow ${
                msg.role === 'user'
                  ? 'ml-auto bg-[--color-eurofarma-blue] text-white'
                  : 'mr-auto bg-white/90 text-slate-900'
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* Campo de entrada */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 rounded-b-3xl border-t border-white/10 bg-white/5 px-4 py-3"
        >
          <input
            className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sky-400"
            type="text"
            placeholder={isConfigured ? 'Digite uma mensagem...' : 'Chat indisponível no momento'}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={!isConfigured}
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-[--color-eurofarma-blue] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!isConfigured}
            >
            {isConfigured ? 'Enviar' : 'Indisponível'}
          </button>
        </form>
      </div>
    </>
  )
}