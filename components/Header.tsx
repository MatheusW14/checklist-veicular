"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [tema, setTema] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTema(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  function alternarTema() {
    const novo = tema === "dark" ? "light" : "dark";
    setTema(novo);
    document.documentElement.dataset.theme = novo;
    try {
      localStorage.setItem("tema", novo);
    } catch {
      /* sem localStorage: só vale nesta sessão */
    }
  }

  const link = (href: string, texto: string) => (
    <Link href={href} className={pathname === href ? "nav-link ativo" : "nav-link"}>
      {texto}
    </Link>
  );

  return (
    <header className="header">
      <div className="header-conteudo">
        <Link href="/" className="marca">
          Checklist de Frota
        </Link>
        <nav className="nav">
          {link("/", "Garagem")}
          {link("/relatorios", "Relatórios")}
        </nav>
        <button
          type="button"
          className="btn btn-tema"
          onClick={alternarTema}
          aria-label={tema === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
        >
          {tema === "dark" ? "☀ Claro" : "☾ Escuro"}
        </button>
      </div>
    </header>
  );
}
