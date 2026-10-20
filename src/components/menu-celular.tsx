"use client";

import { Drawer } from "@base-ui/react/drawer";
import Link from "next/link";
import { useState } from "react";
import { agendar, clinica, enderecoEmLinha } from "@/data/clinica";
import { paginas } from "@/data/navegacao";

// Menu do celular: painel que sobe de baixo e fecha arrastando para baixo (gesto da Base UI,
// com velocidade: um peteleco rápido já fecha). Fecha sozinho ao trocar de página.
export function MenuCelular({ pathname }: { pathname: string }) {
  const [aberto, setAberto] = useState(false);
  const [rotaAnterior, setRotaAnterior] = useState(pathname);
  if (rotaAnterior !== pathname) {
    setRotaAnterior(pathname);
    setAberto(false);
  }

  return (
    <Drawer.Root open={aberto} onOpenChange={setAberto}>
      <Drawer.Trigger className="botao botao-contorno botao-pequeno md:hidden" aria-label="Abrir menu">
        Menu
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 z-50 min-h-dvh bg-black opacity-[calc(0.3*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[400ms] ease-gaveta data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*250ms)] data-starting-style:opacity-0 data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Drawer.Viewport className="fixed inset-0 z-50 flex items-end">
          <Drawer.Popup className="w-full rounded-t-xl bg-white px-margem pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 shadow-flutua outline-none [transform:translateY(var(--drawer-swipe-movement-y))] transition-transform duration-[400ms] ease-gaveta data-ending-style:[transform:translateY(100%)] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*250ms)] data-starting-style:[transform:translateY(100%)] data-swiping:select-none motion-reduce:transition-none">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-linha" aria-hidden="true" />
            <Drawer.Content>
              <Drawer.Title className="sr-only">Menu</Drawer.Title>
              <nav aria-label="Principal">
                <ul className="border-t border-linha">
                  {[{ href: "/", nome: "Início" }, ...paginas].map((p) => (
                    <li key={p.href} className="border-b border-linha">
                      <Link
                        href={p.href}
                        aria-current={pathname === p.href ? "page" : undefined}
                        className="flex min-h-14 items-center font-titulo text-[28px] transition-opacity duration-100 select-none active:opacity-50 tracking-[-0.02em] aria-[current=page]:underline aria-[current=page]:decoration-1 aria-[current=page]:underline-offset-8"
                      >
                        {p.nome}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <a href={agendar} className="botao botao-preto mt-6 w-full">
                Agendar avaliação
              </a>
              <p className="mt-4 text-[14px] text-suave">
                {clinica.nome}. {enderecoEmLinha}.
              </p>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
