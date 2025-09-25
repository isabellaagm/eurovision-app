// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
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
  const isChatConfigured = Boolean(process.env.OPENROUTER_API_KEY);
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-transparent text-slate-100`}>
        <div className="relative min-h-screen">
          <Header />
          {/* CORREÇÃO DEFINITIVA:
            O padding-top (pt-20) DEVE estar aqui. Ele corresponde exatamente
            à altura do Header (h-20) e empurra o conteúdo de TODAS as páginas
            para baixo, evitando a sobreposição.
          */}
          <main className="pb-16 pt-20">
            {children}
          </main>
          <ChatWidget isConfigured={isChatConfigured} />
        </div>
      </body>
    </html>
  );
}

