// src/components/layout/Header.tsx
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-md !p-5">
      <nav className="container !mx-auto flex justify-between items-center">
        {/* Logo/Título */}
        <Link href="/" className="text-2xl font-bold text-eurofarma-blue">
          EuroVision
        </Link>

        {/* Links de Navegação */}
        <div className="flex !gap-x-4">
          <Link
            href="/dashboard"
            className="text-light-black !hover:text-eurofarma-blue transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/projects"
            className="text-light-black hover:text-eurofarma-blue transition-colors"
          >
            Projetos
          </Link>
          <Link
            href="/requests"
            className="text-eurofarma-blue font-medium !hover:underline"
          >
            Pedir Solução
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
