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
        className="fixed !bottom-6 !right-6 z-50 bg-black text-white !p-4 rounded-full shadow-lg cursor-pointer transition hover:scale-110"
        onClick={() => setIsOpen((o) => !o)}
      >
        <MessageCircle size={24} />
      </div>

      {/* Janela do chat */}
      <div
        className={`fixed !bottom-24 !right-6 z-50 w-100 max-h-[500px] bg-white border border-gray-300 rounded-xl shadow-lg flex flex-col transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Cabeçalho */}
        <div className="!px-4 !py-2 bg-gray-100 border-b rounded-t-xl text-sm font-semibold">
          Assistente Virtual
        </div>

        {/* Área de mensagens */}
        <div className="flex-1 overflow-y-auto !px-4 !py-2 space-y-2 bg-white">
          {!isConfigured && (
            <div className="text-xs text-orange-700 bg-orange-50 border border-orange-200 rounded-md !px-3 !py-2">
              {unavailableMessage}
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] !px-3 !py-2 !mb-2 rounded-2xl text-sm whitespace-pre-wrap ${
                msg.role === 'user'
                  ? '!ml-auto bg-blue-500 text-white'
                  : '!mr-auto bg-gray-200 text-gray-900'
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* Campo de entrada */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 !px-4 !py-3 border-t bg-white rounded-b-xl"
        >
          <input
            className="flex-1 border border-gray-300 rounded-full !px-4 !py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder={isConfigured ? 'Digite uma mensagem...' : 'Chat indisponível no momento'}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={!isConfigured}
          />
          <button
            type="submit"
            className="shrink-0 bg-blue-600 text-white !px-4 !py-1.5 rounded-full hover:bg-blue-700 text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isConfigured}
          >
            {isConfigured ? 'Enviar' : 'Indisponível'}
          </button>
        </form>
      </div>
    </>
  )
}
