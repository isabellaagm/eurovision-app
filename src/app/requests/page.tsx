// app/requests/page.tsx
import RequestSolutionForm from '@/components/projects/RequestSolutionForm'

export default function RequestsPage() {
  return (
    <div className="page-shell">
      <section className="glass-panel text-white">
        <h1 className="text-3xl font-semibold sm:text-4xl">Solicitações de Solução</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Compartilhe desafios de negócio e conecte-se rapidamente ao time de inovação para priorizar novos projetos estratégicos.
        </p>
      </section>
      <RequestSolutionForm />
    </div>
  );
}