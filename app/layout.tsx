import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/Header";
import { FrotaProvider } from "@/context/FrotaContext";

export const metadata: Metadata = {
  title: "Checklist de Revisão Veicular",
  description: "Protótipo de checklist diário de veículos (front-end com dados mockados)",
};

// Aplica o tema salvo antes da primeira pintura (evita "piscar" claro → escuro)
const scriptTema = `try{var t=localStorage.getItem("tema");if(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)t="dark";if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body>
        <FrotaProvider>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main className="container">{children}</main>
        </FrotaProvider>
      </body>
    </html>
  );
}
