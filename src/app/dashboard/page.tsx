// src/app/dashboard/page.tsx
import React from 'react'
import MetricCard from '@/components/dashboard/MetricCard'
import ProjectsByStatusChart from '@/components/dashboard/ProjectsByStatusChart'
import ProjectsByGerenciaChart from '@/components/dashboard/ProjectsByGerenciaChart'
import { getDashboardMetrics, getProjectsSummary } from '@/lib/api'
import { ExportToExcel } from '@/components/dashboard/ExportToExcel'
import { mockProjects } from '@/lib/mockData'

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics()
  const projectsSummary = await getProjectsSummary()

  return (
    <div className="!p-6">
      <h2 className="text-3xl font-semibold">Dashboard de Inovação</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 !p-3">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            unit={metric.unit}
          />
        ))}
      </div>

      {/* Seção de Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 !m-6">
        <div className="card !p-3">
          <h3 className="text-xl font-semibold !mb-3">Projetos por Status</h3>
          <ProjectsByStatusChart data={projectsSummary.byStatus} />
        </div>
        <div className="card !p-3">
          <h3 className="text-xl font-semibold !mb-3">Projetos por Gerência</h3>
          <ProjectsByGerenciaChart data={projectsSummary.byGerencia} />
        </div>
      </div>

      <section>
        <h3 className="text-xl font-semibold mb-2">Relatório de Projetos</h3>
        {/* Botão para exportar todos os projetos mockados */}
        <ExportToExcel data={mockProjects} fileName="relatorio_projetos_inovacao" />
      </section>

    </div>
  )
}
