// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header"; // Importa nosso Header
import ChatWidget from "@/components/ai/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EuroVision - Painel de Inovação",
  description: "Painel executivo para projetos de inovação da Eurofarma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header /> {/* Adiciona o Header aqui */} 
        <main className="p-4 md:p-6">
          {children} {/* Conteúdo da página será renderizado aqui */} 
        </main>
        {/* Poderíamos adicionar um Footer aqui no futuro */}
        <ChatWidget />
      </body>
    </html>
  );
}
