"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

// Fileira deslizante: rolagem nativa com encaixe (CSS .fileira). Setas só aparecem com mouse.
export function Fileira({ titulo, subtitulo, children, rotulo }: { titulo?: ReactNode; subtitulo?: ReactNode; children: ReactNode; rotulo: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inicio, setInicio] = useState(true);
  const [fim, setFim] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const atualizar = () => {
      setInicio(el.scrollLeft < 4);
      setFim(el.scrollLeft + el.clientWidth > el.scrollWidth - 4);
    };
    atualizar();
    el.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    return () => {
      el.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
  }, []);

  const rolar = (dir: number) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div>
      <div className="mx-auto flex max-w-[1240px] items-end justify-between gap-4 px-margem">
        <div>
          {titulo}
          {subtitulo}
        </div>
        <div className="hidden gap-2 pointer-fine:flex">
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => rolar(dir)}
              disabled={dir < 0 ? inicio : fim}
              aria-label={dir < 0 ? "Anteriores" : "Próximos"}
              className="grid size-11 place-items-center rounded-botao border border-linha bg-white transition-[opacity,border-color,transform] duration-150 hover:border-tinta/35 active:scale-95 disabled:cursor-default disabled:opacity-35"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d={dir < 0 ? "M10 3 5 8l5 5" : "m6 3 5 5-5 5"} stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          ))}
        </div>
      </div>
      {/* A fileira vai de borda a borda; o primeiro cartão se alinha ao título (ver .fileira) */}
      <div ref={ref} className="fileira mt-6" tabIndex={0} role="region" aria-label={rotulo}>
        {children}
      </div>
    </div>
  );
}
