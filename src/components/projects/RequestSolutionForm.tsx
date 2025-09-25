// src/components/RequestSolutionForm.tsx
'use client'

import { useEffect, useState } from 'react'

export default function RequestSolutionForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [gerencia, setGerencia] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, gerencia }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setTitle('')
      setDescription('')
      setGerencia('')
    } catch {
      setStatus('error')
    }
  }

  useEffect(() => {
    if (status !== 'success') {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setStatus('idle')
    }, 4000)

    return () => window.clearTimeout(timeoutId)
  }, [status])

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl space-y-6 rounded-3xl border border-white/10 bg-white/90 p-8 text-slate-900 shadow-xl backdrop-blur"
    >
      <h2 className="text-2xl font-semibold text-slate-900">Solicitar Nova Solução</h2>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-slate-900 shadow-sm outline-none transition focus:border-[--color-eurofarma-blue] focus:ring-2 focus:ring-[--color-eurofarma-blue]/30"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descrição do Problema
          </label>
          <textarea
            id="description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-[--color-eurofarma-blue] focus:ring-2 focus:ring-[--color-eurofarma-blue]/30"
          />
        </div>
        <div>
          <label htmlFor="gerencia" className="block text-sm font-medium text-gray-700">
            Gerência
          </label>
          <input
            id="gerencia"
            type="text"
            value={gerencia}
            onChange={(e) => setGerencia(e.target.value)}
            required
            className="mt-1 block w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-slate-900 shadow-sm outline-none transition focus:border-[--color-eurofarma-blue] focus:ring-2 focus:ring-[--color-eurofarma-blue]/30"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center gap-2 rounded-full bg-[--color-eurofarma-blue] px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? (
            <svg
              className="h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          ) : null}
          {status === 'loading' ? 'Enviando...' : 'Enviar Solicitação'}
        </button>
      </div>

      {status === 'success' && (
        <p className="text-center text-emerald-600">Solicitação enviada com sucesso!</p>
      )}
      {status === 'error' && (
        <p className="text-center text-red-600">Erro ao enviar solicitação. Tente novamente.</p>
      )}
    </form>
  )
}