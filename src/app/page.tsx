import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  FolderKanban,
  Lightbulb,
  Sparkles,
  Trophy,
} from "lucide-react";
import { getDashboardMetrics, getProjectsSummary } from "@/lib/api";

const quickLinks = [
  {
    href: "/dashboard",
    title: "Visão Executiva",
    description: "KPIs em tempo real e tendências do portfólio.",
    icon: BarChart3,
  },
  {
    href: "/projects",
    title: "Portfólio de Projetos",
    description: "Filtros avançados, equipes e status detalhados.",
    icon: FolderKanban,
  },
  {
    href: "/gamification",
    title: "Gamificação",
    description: "Trilhas, badges e engajamento de squads.",
    icon: Trophy,
  },
  {
    href: "/requests",
    title: "Solicitações de Solução",
    description: "Pipeline de ideias com priorização colaborativa.",
    icon: Lightbulb,
  },
];

export default async function HomePage() {
  const [metrics, projectSummary] = await Promise.all([
    getDashboardMetrics(),
    getProjectsSummary(),
  ]);

  const statusHighlights = projectSummary.byStatus.slice(0, 3);
  const gerenciaHighlights = projectSummary.byGerencia.slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/40 via-purple-600/30 to-slate-900 p-10 shadow-2xl">
          <div className="absolute -top-20 -right-10 h-64 w-64 rounded-full bg-indigo-500/40 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-purple-500/30 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Plataforma estratégica de inovação
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Visibilidade integrada do ecossistema de inovação
              </h1>
              <p className="mt-4 text-lg text-white/80">
                Conecte métricas executivas, portfólio de projetos e iniciativas de engajamento em um único hub. Facilite decisões com dados confiáveis e trilhas que mobilizam squads.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-slate-900 transition hover:bg-slate-100"
                >
                  Explorar dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-white transition hover:bg-white/10"
                >
                  Ver portfólio completo
                </Link>
              </div>
            </div>
            <div className="grid w-full max-w-md grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl bg-white/10 p-4 text-left shadow-inner"
                >
                  <p className="text-sm uppercase tracking-wide text-white/60">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {metric.value}
                    {metric.unit ? <span className="ml-1 text-sm text-white/60">{metric.unit}</span> : null}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-2">
          {quickLinks.map(({ href, title, description, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-indigo-400/60 hover:bg-slate-900"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-200">
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white transition group-hover:text-indigo-100">
                  {title}
                </h2>
                <p className="mt-2 text-sm text-white/70">{description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-indigo-200 transition group-hover:translate-x-1">
                  Acessar
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Status do portfólio</h3>
              <span className="text-sm text-white/60">Top 3 categorias</span>
            </div>
            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              {statusHighlights.map((item) => (
                <div key={item.name} className="rounded-xl bg-white/5 p-4">
                  <dt className="text-sm text-white/60">{item.name}</dt>
                  <dd className="mt-2 text-2xl font-semibold text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-white/60">
              Aproveite a visão executiva para monitorar gargalos e realocar investimentos conforme o ritmo de entrega.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <h3 className="text-lg font-semibold text-white">Engajamento por gerência</h3>
            <ul className="mt-6 space-y-4">
              {gerenciaHighlights.map((item, index) => (
                <li key={item.name} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/30 text-sm font-semibold text-indigo-100">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-white">{item.name}</span>
                  </div>
                  <span className="text-lg font-semibold text-white">{item.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/60">
              Priorize mentoria e gamificação para as áreas que mais demandam suporte na jornada de inovação.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}