import type { Metadata } from "next";
import Image from "next/image";
import { Fileira } from "@/components/fileira";
import { clinica, equipe, fotosEspaco, textos } from "@/data/clinica";

export const metadata: Metadata = {
  title: "A clínica",
  description: "Conheça a equipe e o espaço da Clínica Esmalte, odontologia digital no centro de Santa Maria desde 2012.",
  alternates: { canonical: "/clinica" },
};

export default function Clinica() {
  return (
    <>
      <div className="mx-auto grid max-w-[1240px] gap-8 px-margem pb-16 pt-10 sm:pt-16 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <h1 className="text-[clamp(44px,6.4vw,84px)] leading-[0.98] tracking-[-0.035em]">Uma clínica que mostra antes de fazer.</h1>
        <p className="max-w-[48ch] text-suave">{textos.historia}</p>
      </div>

      <section aria-labelledby="espaco" className="pb-24">
        <Fileira
          rotulo="Fotos do espaço"
          titulo={
            <h2 id="espaco" className="font-sans text-[22px] font-semibold tracking-normal">
              O espaço
            </h2>
          }
        >
          {fotosEspaco.map((f, i) => (
            <Image key={i} src={f.src} alt={f.alt} placeholder="blur" sizes="(min-width: 768px) 560px, 85vw" className="aspect-[4/3] w-[min(85vw,560px)] rounded-botao object-cover" />
          ))}
        </Fileira>
      </section>

      <section aria-labelledby="equipe" className="mx-auto max-w-[1240px] px-margem pb-24">
        <h2 id="equipe" className="text-[clamp(32px,4vw,48px)] leading-[1.05]">
          Equipe
        </h2>
        <ul className="mt-8 divide-y divide-linha border-y border-linha">
          {equipe.map((p) => (
            <li key={p.nome} className="grid gap-5 py-8 sm:grid-cols-[220px_1fr] sm:gap-10">
              <Image src={p.foto.src} alt={p.foto.alt} placeholder="blur" sizes="(min-width: 640px) 220px, 100vw" className="aspect-[4/5] w-full max-w-[280px] rounded-botao object-cover" />
              <div className="sm:pt-2">
                <h3 className="text-[clamp(28px,3vw,38px)] leading-[1.05]">{p.nome}</h3>
                <p className="mt-1 text-suave">
                  {p.area}, {p.cro}
                </p>
                <p className="mt-4 max-w-[56ch]">{p.bio}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[14px] text-suave">
          Responsável técnico: {clinica.responsavelTecnico.nome}, {clinica.responsavelTecnico.cro}.
        </p>
      </section>
    </>
  );
}
