import { Accordion } from "@base-ui/react/accordion";
import type { Metadata } from "next";
import { FormularioContato } from "@/components/formulario-contato";
import { agendar, clinica, convenios, duvidas, enderecoEmLinha, fechado, formasPagamento, horarios } from "@/data/clinica";

export const metadata: Metadata = {
  title: "Contato",
  description: `Agende pelo WhatsApp ou mande uma mensagem. ${enderecoEmLinha}. Convênios, horários e dúvidas frequentes.`,
  alternates: { canonical: "/contato" },
};

const { lat, lon } = clinica.local;
const bbox = [lon - 0.006, lat - 0.004, lon + 0.006, lat + 0.004].map((n) => n.toFixed(4)).join(",");
const mapaOsm = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
const googleMaps = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
const waze = `https://waze.com/ul?ll=${lat},${lon}&navigate=yes`;

const dadosDuvidas = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: duvidas.map((d) => ({ "@type": "Question", name: d.pergunta, acceptedAnswer: { "@type": "Answer", text: d.resposta } })),
};

export default function Contato() {
  return (
    <>
      <div className="mx-auto max-w-[1240px] px-margem pb-12 pt-10 sm:pt-16">
        <h1 className="max-w-[14ch] text-[clamp(44px,6.4vw,84px)] leading-[0.98] tracking-[-0.035em]">Vamos marcar sua avaliação.</h1>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={agendar} className="botao botao-preto">
            Agendar pelo WhatsApp
          </a>
          <a href={`tel:${clinica.telefone.replace(/\D/g, "")}`} className="text-[15px] font-semibold underline-offset-4 hover:underline">
            Ou ligue: {clinica.telefone}
          </a>
        </div>
      </div>

      {/* Onde + horários */}
      <section aria-labelledby="onde" className="mx-auto grid max-w-[1240px] gap-10 px-margem pb-20 lg:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-botao border border-linha">
          <iframe title={`Mapa com a localização da ${clinica.nome}`} src={mapaOsm} loading="lazy" className="block aspect-[4/3] w-full lg:aspect-[16/10]" />
        </div>
        <div>
          <h2 id="onde" className="text-[clamp(30px,3.6vw,42px)] leading-[1.05]">
            Onde estamos
          </h2>
          <p className="mt-3 text-suave">{enderecoEmLinha}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={googleMaps} target="_blank" rel="noopener noreferrer" className="botao botao-contorno botao-pequeno">
              Google Maps
            </a>
            <a href={waze} target="_blank" rel="noopener noreferrer" className="botao botao-contorno botao-pequeno">
              Waze
            </a>
          </div>
          <dl className="mt-8 divide-y divide-linha border-y border-linha text-[15px]">
            {horarios.map((h) => (
              <div key={h.dias} className="flex flex-col py-3 min-[420px]:flex-row min-[420px]:justify-between">
                <dt>{h.dias}</dt>
                <dd className="font-semibold tabular-nums">{h.horas}</dd>
              </div>
            ))}
            {fechado && (
              <div className="flex flex-col py-3 text-suave min-[420px]:flex-row min-[420px]:justify-between">
                <dt>{fechado}</dt>
                <dd>Fechado</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {/* Convênios + dúvidas */}
      <section aria-labelledby="convenios" className="mx-auto grid max-w-[1240px] gap-10 border-t border-linha px-margem pb-20 pt-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 id="convenios" className="text-[clamp(30px,3.6vw,42px)] leading-[1.05]">
            Convênios
          </h2>
          <p className="mt-3 text-suave">{convenios.join(", ")}.</p>
          <p className="mt-4 text-[15px]">{formasPagamento}</p>
        </div>
        <div>
          <h2 className="sr-only">Dúvidas frequentes</h2>
          <Accordion.Root className="border-t border-linha">
            {duvidas.map((d) => (
              <Accordion.Item key={d.pergunta} className="border-b border-linha">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left font-titulo text-[21px] leading-snug tracking-[-0.015em] select-none">
                    {d.pergunta}
                    <span className="grid size-8 shrink-0 place-items-center rounded-botao border border-linha transition-transform duration-200 ease-in-out group-data-panel-open:rotate-45" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                {/* Sem animar a altura (só opacidade + deslize curto, na GPU) */}
                <Accordion.Panel className="pb-6 pr-14 text-suave transition-[opacity,translate] duration-200 ease-out data-ending-style:opacity-0 data-starting-style:-translate-y-1 data-starting-style:opacity-0">
                  {d.resposta}
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* Formulário */}
      <section aria-labelledby="escrever" className="mx-auto grid max-w-[1240px] gap-10 border-t border-linha px-margem pb-24 pt-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 id="escrever" className="text-[clamp(30px,3.6vw,42px)] leading-[1.05]">
            Prefere escrever?
          </h2>
          <p className="mt-3 max-w-[40ch] text-suave">Mande uma mensagem e respondemos no mesmo dia, em horário de atendimento.</p>
        </div>
        <FormularioContato />
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosDuvidas).replace(/</g, "\\u003c") }} />
    </>
  );
}
