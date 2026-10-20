"use client";

import { Slider } from "@base-ui/react/slider";
import { Tabs } from "@base-ui/react/tabs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Ilustracao } from "@/components/ilustracao";
import { type Tecnologia as TipoTecnologia, tecnologias } from "@/data/clinica";

// "O que a tecnologia muda para você": abas (Base UI) e, em cada uma, a comparação arrastável
// "como era / como é aqui" (Slider da Base UI controlando um clip-path — só GPU).
export function Tecnologia() {
  const [aba, setAba] = useState(tecnologias[0].id);

  return (
    <Tabs.Root value={aba} onValueChange={(v) => setAba(v as string)}>
      <div className="mx-auto max-w-[1240px] px-margem">
        <Tabs.List className="relative grid grid-cols-2 gap-1 rounded-[8px] border border-linha bg-superficie p-1 sm:flex sm:w-fit">
          {tecnologias.map((t) => (
            <Tabs.Tab
              key={t.id}
              value={t.id}
              className="relative z-10 min-h-11 cursor-pointer select-none rounded-botao px-3 py-2.5 text-[15px] font-medium leading-tight text-suave transition-colors duration-150 hover:text-tinta data-active:text-white sm:whitespace-nowrap sm:px-4"
            >
              {t.nome}
            </Tabs.Tab>
          ))}
          <Tabs.Indicator className="absolute left-0 top-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) translate-y-(--active-tab-top) rounded-botao bg-tinta transition-[translate,width,height] duration-[260ms] ease-out motion-reduce:transition-none" />
        </Tabs.List>
      </div>

      {tecnologias.map((t) => (
        <Tabs.Panel key={t.id} value={t.id} className="mx-auto mt-8 max-w-[1240px] px-margem outline-none">
          <Painel t={t} />
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}

function Painel({ t }: { t: TipoTecnologia }) {
  return (
    <div className="troca grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-center lg:gap-14">
      <div>
        <h3 className="text-[clamp(30px,3.6vw,42px)] leading-[1.05]">{t.titulo}</h3>
        <p className="mt-3 max-w-md text-suave">{t.texto}</p>
        <dl className="mt-6 grid grid-cols-2 gap-3 text-[15px]">
          <div className="rounded-cartao border border-linha p-4">
            <dt className="text-[13px] font-semibold text-suave">Como era</dt>
            <dd className="mt-1">{t.era}</dd>
          </div>
          <div className="rounded-cartao bg-[linear-gradient(135deg,var(--color-luz-azul),var(--color-luz-pessego))] p-4">
            <dt className="text-[13px] font-semibold text-tinta/70">Como é aqui</dt>
            <dd className="mt-1">{t.aqui}</dd>
          </div>
        </dl>
      </div>
      <Comparar t={t} />
    </div>
  );
}

function Comparar({ t }: { t: TipoTecnologia }) {
  const [corte, setCorte] = useState(50);
  const palco = useRef<HTMLDivElement>(null);
  const mexeu = useRef(false);

  // Dica única quando a comparação aparece na tela: a linha "respira" para mostrar que dá para arrastar.
  // Explicativo, por isso mais lento (1,1s). Cancela se a pessoa mexer antes.
  useEffect(() => {
    const el = palco.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let quadro = 0;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const ini = performance.now() + 300;
        const passo = (agora: number) => {
          if (mexeu.current) return;
          const p = Math.min(1, Math.max(0, (agora - ini) / 1100));
          setCorte(50 - 14 * Math.sin(p * Math.PI));
          if (p < 1) quadro = requestAnimationFrame(passo);
        };
        quadro = requestAnimationFrame(passo);
      },
      { threshold: 0.6 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, []);

  return (
    <div ref={palco} className="group/palco relative aspect-[4/5] overflow-hidden rounded-botao bg-superficie select-none sm:aspect-[16/10]" style={{ "--corte": `${corte}%` } as React.CSSProperties}>
      {/* Como era: foto em preto e branco */}
      <Image src={t.fotoEra.src} alt={t.fotoEra.alt} placeholder="blur" sizes="(min-width: 1024px) 700px, 100vw" className="absolute inset-0 h-full w-full object-cover brightness-[0.92] contrast-[1.05] grayscale" />
      <p className="absolute left-3 top-3 max-w-[44%] rounded-botao bg-white/92 px-3 py-2 text-[13px] leading-snug">
        <strong className="block text-[15px]">Como era</strong>
        {t.era}
      </p>

      {/* Como é aqui: a ilustração com a luz da tecnologia, recortada pela divisória */}
      <div
        className="absolute inset-0 grid place-items-center bg-[#f7f8fb] [clip-path:inset(0_0_0_var(--corte))]"
        style={{ backgroundImage: "radial-gradient(60% 70% at 70% 40%, var(--color-luz-azul), transparent 70%), radial-gradient(40% 50% at 40% 80%, var(--color-luz-pessego), transparent 70%)" }}
      >
        <Ilustracao desenho={t.desenho} legenda={`Ilustração: ${t.aqui}`} />
        <p className="absolute right-3 top-3 max-w-[44%] rounded-botao bg-white/92 px-3 py-2 text-right text-[13px] leading-snug">
          <strong className="block text-[15px]">Como é aqui</strong>
          {t.aqui}
        </p>
      </div>

      <Slider.Root
        value={corte}
        onValueChange={(v) => {
          mexeu.current = true;
          setCorte(v as number);
        }}
        min={0}
        max={100}
        step={1}
        largeStep={10}
        className="absolute inset-0"
      >
        {/* pan-y: no celular, arrastar na vertical continua rolando a página */}
        <Slider.Control className="absolute inset-0 cursor-ew-resize touch-pan-y">
          <Slider.Track className="absolute inset-0">
            {/* A alça da Base UI fica invisível (teclado e leitor de tela); o desenho vem logo abaixo */}
            <Slider.Thumb
              aria-label="Comparar como era e como é aqui"
              getAriaValueText={(_texto, v) => `${Math.round(v)}% da imagem mostrando como era`}
              className="size-12 opacity-0"
            />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>

      {/* Divisória desenhada: linha branca + círculo, presos à posição da comparação */}
      <div className="pointer-events-none absolute inset-y-0 left-(--corte)" aria-hidden="true">
        <span className="absolute inset-y-0 -left-px w-0.5 bg-white" />
        <span className="absolute left-0 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_2px_10px_rgb(0_0_0/0.15)] group-has-[input:focus-visible]/palco:outline-2 group-has-[input:focus-visible]/palco:outline-offset-2 group-has-[input:focus-visible]/palco:outline-tinta">
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M6 1 1 6l5 5M14 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </div>
    </div>
  );
}
