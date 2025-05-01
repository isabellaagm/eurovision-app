'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [userInput, setUserInput] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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

      const data = await res.json()
      const reply = data.response || 'Desculpe, sem resposta.'

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
            placeholder="Digite uma mensagem..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            type="submit"
            className="shrink-0 bg-blue-600 text-white !px-4 !py-1.5 rounded-full hover:bg-blue-700 text-sm transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  )
}
