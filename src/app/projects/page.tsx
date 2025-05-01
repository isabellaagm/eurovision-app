'use client'

import React, { useState, useMemo } from 'react'
import { mockProjects } from '@/lib/mockData'
import ProjectCard from '@/components/projects/ProjectCard'

export default function ProjectsPage() {
  // 1️⃣ Estado dos filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [gerenciaFilter, setGerenciaFilter] = useState('All')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')

  // 2️⃣ Opções únicas
  const statuses = useMemo(
    () => ['All', ...Array.from(new Set(mockProjects.map((p) => p.status)))],
    []
  )
  const gerencias = useMemo(
    () => ['All', ...Array.from(new Set(mockProjects.map((p) => p.gerencia)))],
    []
  )

  // 3️⃣ Lista filtrada
  const filteredProjects = useMemo(() => {
    return mockProjects.filter((p) => {
      // Busca por nome (case-insensitive)
      if (
        searchTerm &&
        !p.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }
      // Filtro de status
      if (statusFilter !== 'All' && p.status !== statusFilter) {
        return false
      }
      // Filtro de gerência
      if (gerenciaFilter !== 'All' && p.gerencia !== gerenciaFilter) {
        return false
      }
      // Filtro de data de início
      if (dateStart && new Date(p.startDate) < new Date(dateStart)) {
        return false
      }
      // Filtro de data de início até
      if (dateEnd && new Date(p.startDate) > new Date(dateEnd)) {
        return false
      }
      return true
    })
  }, [searchTerm, statusFilter, gerenciaFilter, dateStart, dateEnd])

  return (
    <div className="!space-y-6">
      {/* Cabeçalho */}
      <div className="!m-6 flex justify-between items-center">
        <h2 className="text-3xl font-semibold">Catálogo de Projetos</h2>
        {/* Botão futuro de “Novo Projeto” */}
        {/* <button className="btn-primary">Novo Projeto</button> */}
      </div>

      {/* Filtros */}
      <div className="bg-white !p-4 !m-6 rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Busca por nome */}
        <input
          type="text"
          placeholder="Buscar por nome..."
          className="border !p-2 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filtro de status */}
        <select
          className="border !p-2 rounded w-full"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Filtro de gerência */}
        <select
          className="border !p-2 rounded w-full"
          value={gerenciaFilter}
          onChange={(e) => setGerenciaFilter(e.target.value)}
        >
          {gerencias.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* Data de início mínima */}
        <input
          type="date"
          className="border !p-2 rounded w-full"
          value={dateStart}
          onChange={(e) => setDateStart(e.target.value)}
        />

        {/* Data de início máxima */}
        <input
          type="date"
          className="border !p-2 rounded w-full"
          value={dateEnd}
          onChange={(e) => setDateEnd(e.target.value)}
        />
      </div>

      {/* Total de resultados */}
      <p className="!m-6 text-sm text-gray-600">
        {filteredProjects.length} projeto
        {filteredProjects.length === 1 ? '' : 's'} encontrado
        {filteredProjects.length === 1 ? '' : 's'}
      </p>

      {/* Grid de Projetos */}
      {filteredProjects.length > 0 ? (
        <div className="!m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center !mt-10">
          Nenhum projeto encontrado.
        </p>
      )}
    </div>
  )
}
