// src/app/dashboard/page.tsx
import React from 'react';
import MetricCard from '@/components/dashboard/MetricCard';
// Importaremos os gráficos depois
// import ProjectsByStatusChart from '@/components/dashboard/ProjectsByStatusChart';
// import ProjectsByGerenciaChart from '@/components/dashboard/ProjectsByGerenciaChart';
import { getDashboardMetrics } from '@/lib/api'; // Função para buscar dados (mock) | import apagado-getProjectsSummary

export default async function DashboardPage() {
  // Busca os dados para o dashboard (simulado)
  const metrics = await getDashboardMetrics();
  //const projectsSummary = await getProjectsSummary(); // Para os gráficos

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold !m-3 !mt-6">Dashboard de Inovação</h2>
      
      {/* Seção de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 !m-6">
        {metrics.map((metric) => (
          <MetricCard 
            key={metric.label} 
            label={metric.label} 
            value={metric.value} 
            unit={metric.unit} 
          />
        ))}
      </div>
      
      {/* Seção de Gráficos (a ser implementada) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 !m-6">
        <div className="card !p-3"> {/* Usando a classe .card de globals.css */}
          <h3 className="text-xl font-semibold mb-3">Projetos por Status</h3>
          {/* <ProjectsByStatusChart data={projectsSummary.byStatus} /> */}
          <p className="text-gray-500">(Gráfico de Status aqui)</p> 
        </div>
        <div className="card !p-3">
          <h3 className="text-xl font-semibold mb-3">Projetos por Gerência</h3>
          {/* <ProjectsByGerenciaChart data={projectsSummary.byGerencia} /> */}
          <p className="text-gray-500">(Gráfico de Gerência aqui)</p>
        </div>
      </div>
    </div>
  );
}
