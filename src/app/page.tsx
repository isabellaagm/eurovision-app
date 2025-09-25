import Link from "next/link";
import { ArrowRight, Lock, Sparkles } from "lucide-react";

const features = [
  {
    title: "Indicadores executivos",
    description:
      "Monitore KPIs estratégicos e tendências do ecossistema de inovação em um único painel.",
  },
  {
    title: "Portfólio centralizado",
    description:
      "Visualize o pipeline completo de projetos com contexto de equipes, status e dependências.",
  },
  {
    title: "Engajamento contínuo",
    description:
      "Utilize trilhas, gamificação e comunidades para mobilizar squads em torno das iniciativas prioritárias.",
  },
];

export default function HomePage() {

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-16 sm:px-10 lg:px-16">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/40 via-purple-600/30 to-slate-900 p-10 shadow-2xl">
        <div className="absolute -top-20 -right-10 h-64 w-64 rounded-full bg-indigo-500/40 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-purple-500/30 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Plataforma estratégica de inovação
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Tudo o que você precisa para acompanhar o ecossistema de inovação
          </h1>
          <p className="text-lg text-white/80">
            Conheça a plataforma que centraliza dados, processos e iniciativas de engajamento. Faça login para acessar dashboards, portfólio completo e recursos colaborativos.
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-slate-900 transition hover:bg-slate-100"
            >
              Fazer login
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="inline-flex items-center gap-2 text-sm text-white/70">
              <Lock className="h-4 w-4" />
              Acesso restrito a usuários autenticados
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
          >
            <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
            <p className="mt-3 text-sm text-white/70">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
