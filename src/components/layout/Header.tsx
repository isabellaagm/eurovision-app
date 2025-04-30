// src/components/layout/Header.tsx
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-md !p-5">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo/Título */}
        <Link href="/" className="text-2xl font-bold !text-blue-700">
          EuroVision
        </Link>

        {/* Links de Navegação */}
        <div className="flex gap-x-4">
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-blue-700 transition-colors">
            Dashboard
          </Link>
          <Link
            href="/projects"
            className="text-gray-600 hover:text-blue-700 transition-colors">
            Projetos
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
