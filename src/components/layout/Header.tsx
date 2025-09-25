// src/components/layout/Header.tsx
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-semibold text-[--color-eurofarma-blue]"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[--color-eurofarma-blue] text-white">
            EV
          </span>
          EuroVision
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-[--color-light-black]">
          <Link
            href="/dashboard"
            className="transition hover:text-[--color-eurofarma-blue]"
          >
            Dashboard
          </Link>
          <Link
            href="/projects"
            className="transition hover:text-[--color-eurofarma-blue]"
          >
            Projetos
          </Link>
          <Link
            href="/gamification"
            className="transition hover:text-[--color-eurofarma-blue]"
          >
            Trilhas
          </Link>
          <Link
            href="/requests"
            className="transition hover:text-[--color-eurofarma-blue]"
          >
            Pedir solução
          </Link>
          <Link
            href="/auth/login"
            className="rounded-full border border-[--color-eurofarma-blue] px-4 py-2 text-[--color-eurofarma-blue] transition hover:bg-[--color-eurofarma-blue] hover:text-white"
          >
            Entrar
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;