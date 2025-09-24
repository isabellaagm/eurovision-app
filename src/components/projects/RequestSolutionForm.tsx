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
      className="max-w-2xl !mx-auto bg-white shadow-lg rounded-lg !p-8 !space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Solicitar Nova Solução</h2>

      <div className="grid grid-cols-1 !gap-4">
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
            className="!mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
            className="!mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
            className="!mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center !px-6 !py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <svg
              className="animate-spin h-5 w-5 !mr-2 text-white"
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
        <p className="text-green-600 text-center">Solicitação enviada com sucesso!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-center">Erro ao enviar solicitação. Tente novamente.</p>
      )}
    </form>
  )
}
