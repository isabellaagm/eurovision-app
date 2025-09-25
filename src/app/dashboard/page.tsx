// src/app/dashboard/page.tsx
import React from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import ProjectsByStatusChart from "@/components/dashboard/ProjectsByStatusChart";
import ProjectsByGerenciaChart from "@/components/dashboard/ProjectsByGerenciaChart";
import { getDashboardMetrics, getProjectsSummary } from "@/lib/api";
import { ExportToExcel } from "@/components/dashboard/ExportToExcel";
import { mockProjects } from "@/lib/mockData";

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics();
  const projectsSummary = await getProjectsSummary();

  const totalProjects = metrics.find((metric) => metric.label.toLowerCase().includes("total"));
  const concluded = metrics.find((metric) => metric.label.toLowerCase().includes("conclu"));
  const budget = metrics.find((metric) => metric.label.toLowerCase().includes("budget"));

  const formatNumber = (value: string | number | undefined) => {
    if (value === undefined) return "-";
    if (typeof value === "number") {
      return new Intl.NumberFormat("pt-BR").format(value);
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? value : new Intl.NumberFormat("pt-BR").format(parsed);
  };

  const formatBudget = (value: string | number | undefined, unit?: string) => {
    if (value === undefined) return "-";
    const numeric = typeof value === "number" ? value : Number(value);
    if (Number.isNaN(numeric)) {
      return unit ? `${unit} ${value}` : `${value}`;
    }
    const formatted = numeric.toLocaleString("pt-BR", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return unit ? `${unit} ${formatted} mi` : formatted;
  };

  return (
    <div className="page-shell">
      <section className="glass-panel text-white">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Painel executivo
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold sm:text-5xl">
                Dashboard de Inovação
              </h1>
              <p className="text-base leading-relaxed text-white/70">
                Visão consolidada das iniciativas estratégicas da Eurofarma para orientar decisões rápidas, com indicadores, engajamento dos squads e alocação de budget em um único lugar.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-white/70">
              <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2">
                <span className="text-base font-semibold text-white">{formatNumber(totalProjects?.value)}</span>
                Projetos ativos no portfólio
              </div>
              <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2">
                <span className="text-base font-semibold text-white">{formatNumber(concluded?.value)}</span>
                Concluídos no último ano
              </div>
              <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2">
                <span className="text-base font-semibold text-white">{formatBudget(budget?.value, budget?.unit)}</span>
                Budget alocado em inovação
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 self-stretch rounded-[28px] border border-white/15 bg-white/5 p-6 shadow-[0_24px_60px_-32px_rgba(59,130,246,0.55)] backdrop-blur-xl lg:max-w-sm">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-white">
                Exporte insights instantaneamente
              </h2>
              <p className="text-sm text-white/70">
                Baixe um relatório completo dos projetos com filtros aplicados para levar a conversa estratégica para fora da plataforma.
              </p>
            </div>
            <ExportToExcel
              data={mockProjects}
              fileName="relatorio_projetos_inovacao"
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            unit={metric.unit}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="surface-panel">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Projetos por Status
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Compare a distribuição do pipeline para identificar gargalos ou oportunidades de aceleração.
              </p>
            </div>
          </div>
          <div className="mt-8 h-[260px]">
            <ProjectsByStatusChart data={projectsSummary.byStatus} />
          </div>
        </div>
        <div className="surface-panel">
          <h3 className="text-xl font-semibold text-slate-900">
            Projetos por Gerência
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Veja quais áreas lideram a transformação e onde incentivar novas iniciativas.
          </p>
          <div className="mt-8 h-[260px]">
            <ProjectsByGerenciaChart data={projectsSummary.byGerencia} />
          </div>
        </div>
      </section>
    </div>
  );
}