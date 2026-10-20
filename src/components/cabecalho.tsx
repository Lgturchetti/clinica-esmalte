"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuCelular } from "@/components/menu-celular";
import { agendar, clinica } from "@/data/clinica";
import { paginas } from "@/data/navegacao";

function ativo(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Transparente no topo (a capa passa por baixo); ganha fundo e régua ao rolar.
export function Cabecalho() {
  const pathname = usePathname();
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header
      data-rolou={rolou || undefined}
      className="sticky top-0 z-30 border-b border-transparent pt-[env(safe-area-inset-top)] transition-[background-color,border-color] duration-200 data-rolou:border-linha data-rolou:bg-white/85 data-rolou:backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-margem">
        <Link href="/" className="min-w-0 truncate font-titulo text-[23px] tracking-[-0.02em]" translate="no" aria-label={`${clinica.nome}, página inicial`}>
          {clinica.nomeCurto}
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 text-[15px] md:flex">
          {paginas.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              aria-current={ativo(pathname, p.href) ? "page" : undefined}
              className="text-suave transition-colors duration-150 hover:text-tinta aria-[current=page]:text-tinta"
            >
              {p.nome}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={agendar} className="botao botao-preto botao-pequeno hidden md:inline-flex">
            Agendar avaliação
          </a>
          <MenuCelular pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
