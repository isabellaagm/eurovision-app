"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Lock, Mail } from "lucide-react";

import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError(
        "Configure as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY para habilitar o login."
      );
      return;
    }

    setIsLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    setSuccess("Autenticação realizada com sucesso. Redirecionando para projetos...");
    setTimeout(() => {
      router.push("/projects");
    }, 600);
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-gradient-to-br from-white via-[#f4f6ff] to-white px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="space-y-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[--color-eurofarma-blue]/20 bg-[--color-eurofarma-blue]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-300">
            <Lock className="h-4 w-4" /> Área Restrita
          </span>
          <h1 className="text-2xl font-semibold text-slate-700">Acesse o portfólio estratégico</h1>
          <p className="text-sm text-slate-700">
            Use as credenciais fornecidas pelo PMO de Inovação para visualizar projetos e enviar novas solicitações.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block text-left text-sm font-medium text-slate-700">
            E-mail corporativo
            <span className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <Mail className="h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-transparent text-sm text-[--color-light-black] outline-none placeholder:text-slate-500"
                placeholder="nome.sobrenome@empresa.com"
              />
            </span>
          </label>

          <label className="block text-left text-sm font-medium text-slate-700">
            Senha
            <span className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <Lock className="h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full bg-transparent text-sm text-[--color-light-black] outline-none placeholder:text-slate-500"
                placeholder="Digite sua senha"
              />
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[--color-eurofarma-blue] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00257a] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Entrar na plataforma
          </button>
        </form>

        {error ? (
          <div className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4" />
            <span>{error}</span>
          </div>
        ) : null}

        {success ? (
          <div className="flex items-start gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4" />
            <span>{success}</span>
          </div>
        ) : null}

        <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-medium text-[--color-light-black]">Precisa de acesso?</p>
          <p>
            Solicite habilitação ao time do PMO ou <Link href="/requests" className="font-medium text-[--color-eurofarma-blue]">envie uma demanda</Link> para iniciar uma nova iniciativa.
          </p>
        </div>
      </div>
    </div>
  );
}