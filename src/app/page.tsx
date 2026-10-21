import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CartaoTratamento } from "@/components/cartao-tratamento";
import { Fileira } from "@/components/fileira";
import { Tecnologia } from "@/components/tecnologia";
import { agendar, clinica, convenios, equipe, fotoCapa, horarios, primeiraConsulta, textos, tratamentos } from "@/data/clinica";

const atraso = (ms: number) => ({ "--atraso": `${ms}ms` }) as CSSProperties;
const daInicial = tratamentos.filter((t) => t.naInicial);

export default function Inicio() {
  return (
    <>
      {/* 1. CAPA "Cinema": foto do consultório de ponta a ponta, passando por baixo do cabeçalho */}
      <section data-capa className="relative -mt-16 flex min-h-[max(560px,min(88svh,860px))] flex-col justify-end overflow-hidden pb-[150px] pt-28 sm:pb-[170px]">
        <Image src={fotoCapa.src} alt={fotoCapa.alt} preload sizes="100vw" className="assenta absolute inset-0 h-full w-full object-cover" />
        {/* Véu branco à esquerda e embaixo: o texto fica legível e a fileira sobe por cima */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgb(255 255 255 / 0.9) 0%, rgb(255 255 255 / 0.55) 38%, rgb(255 255 255 / 0) 65%), linear-gradient(to bottom, rgb(255 255 255 / 0) 25%, rgb(255 255 255 / 0.8) 62%, #fff 88%)",
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <div className="mx-auto max-w-[1240px] px-margem">
            <h1 className="entra max-w-[12ch] text-[clamp(44px,7vw,100px)] leading-[0.98] tracking-[-0.035em]">{textos.capaTitulo}</h1>
            <p className="entra mt-4 max-w-[44ch] text-[#2b2b2e]" style={atraso(80)}>
              {textos.capaSubtitulo}
            </p>
            <a href={agendar} className="entra botao botao-preto mt-6" style={atraso(140)}>
              Agendar avaliação
            </a>
          </div>
        </div>
      </section>

      {/* 2. O QUE VOCÊ QUER RESOLVER? — sobe por cima da borda da capa; o conteúdo é o menu */}
      <section className="relative z-10 -mt-[120px] pb-24 sm:-mt-[140px]" aria-labelledby="resolver">
        <Fileira
          rotulo="Tratamentos"
          titulo={
            <h2 id="resolver" className="font-sans text-[22px] font-semibold tracking-normal">
              O que você quer resolver?
            </h2>
          }
        >
          {daInicial.map((t, i) => (
            <CartaoTratamento key={t.slug} t={t} prioridade={i < 2} />
          ))}
          <Link href="/tratamentos" className="cartao grid place-items-center rounded-cartao border border-linha p-6 text-center">
            <span>
              <span className="block font-titulo text-[23px] leading-tight tracking-[-0.02em]">Todos os tratamentos</span>
              <span className="mt-1 block text-[14px] text-suave">{tratamentos.length} no total</span>
            </span>
          </Link>
        </Fileira>
      </section>

      {/* 3. TECNOLOGIA — o ponto alto: abas com a comparação arrastável */}
      <section className="pb-28" aria-labelledby="tecnologia">
        <div className="mx-auto max-w-[1240px] px-margem">
          <h2 id="tecnologia" className="max-w-[16ch] text-[clamp(36px,5vw,64px)] leading-[1.02] tracking-[-0.03em]">
            O que a tecnologia muda para você
          </h2>
          <p className="mt-4 max-w-[52ch] text-suave">Arraste a linha para comparar como era com como fazemos aqui.</p>
        </div>
        <div className="mt-10">
          <Tecnologia />
        </div>
      </section>

      {/* 4. QUEM ATENDE */}
      <section className="mx-auto max-w-[1240px] px-margem pb-28" aria-labelledby="equipe">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="equipe" className="text-[clamp(32px,4vw,48px)] leading-[1.05]">
            Quem atende
          </h2>
          <Link href="/clinica" className="text-[15px] font-semibold underline-offset-4 hover:underline">
            Conheça a clínica
          </Link>
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {equipe.map((p) => (
            <li key={p.nome} className="grid grid-cols-[104px_1fr] items-start gap-4 sm:block">
              <Image
                src={p.foto.src}
                alt={p.foto.alt}
                sizes="(min-width: 640px) 380px, 104px"
                className="aspect-[4/5] w-full rounded-botao object-cover"
              />
              <div className="sm:mt-4">
                <h3 className="text-[24px] leading-tight">{p.nome}</h3>
                <p className="text-[15px] text-suave">
                  {p.area}, {p.cro}
                </p>
                <p className="mt-2 text-[15px]">{p.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. ANTES DE VIR — tudo o que é prático (o convite final está no rodapé) */}
      <section className="mx-auto max-w-[1240px] px-margem pb-24" aria-labelledby="antes">
        <div className="grid gap-10 border-t border-linha pt-12 lg:grid-cols-[1fr_1.4fr]">
          <h2 id="antes" className="text-[clamp(32px,4vw,48px)] leading-[1.05]">
            Antes de vir
          </h2>
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="font-sans text-[15px] font-semibold tracking-normal">A primeira consulta</h3>
              <ol className="mt-3 space-y-3">
                {primeiraConsulta.map((e, i) => (
                  <li key={e.titulo} className="flex gap-3">
                    <span className="w-4 shrink-0 tabular-nums text-suave" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span>
                      <strong className="font-semibold">{e.titulo}.</strong> <span className="text-suave">{e.texto}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <dl className="space-y-5 text-[15px]">
              <div>
                <dt className="font-semibold">Onde</dt>
                <dd className="mt-1 text-suave">
                  {clinica.endereco.rua}, {clinica.endereco.bairro}.{" "}
                  <Link href="/contato" className="text-tinta underline underline-offset-4">
                    Ver no mapa
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Horário</dt>
                {horarios.map((h) => (
                  <dd key={h.dias} className="mt-1 tabular-nums text-suave">
                    {h.dias}, {h.horas}
                  </dd>
                ))}
              </div>
              <div>
                <dt className="font-semibold">Convênios</dt>
                <dd className="mt-1 text-pretty text-suave">{convenios.join(", ")}.</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
