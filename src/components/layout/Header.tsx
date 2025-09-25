// src/components/layout/Header.tsx
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      {/* ALTURA DEFINITIVA: h-20 (80px) */}
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="flex flex-shrink-0 items-center gap-3 text-xl font-semibold text-white"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[--color-eurofarma-blue] text-white">
            EV
          </span>
          <span className="hidden sm:inline">EuroVision</span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-white/80">
          <Link href="/dashboard" className="transition hover:text-white">
            Dashboard
          </Link>
          <Link href="/projects" className="transition hover:text-white">
            Projetos
          </Link>
          <Link href="/gamification" className="transition hover:text-white">
            Trilhas
          </Link>
          <Link href="/requests" className="transition hover:text-white">
            Pedir solução
          </Link>
          <Link
            href="/auth/login"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
          >
            Entrar
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

