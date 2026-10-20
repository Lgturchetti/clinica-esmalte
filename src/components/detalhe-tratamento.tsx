import Image from "next/image";
import { clinica, type Tratamento, linkWhatsApp } from "@/data/clinica";

// Conteúdo do detalhe: o mesmo na janela por cima e na página inteira.
export function DetalheTratamento({ t, Titulo = "h1" }: { t: Tratamento; Titulo?: "h1" | "h2" }) {
  // Subtítulos um nível abaixo do título (h1 → h2 na página inteira; h2 → h3 na janela)
  const Sub = Titulo === "h1" ? "h2" : "h3";
  return (
    <article>
      <Image
        src={t.foto.src}
        alt={t.foto.alt}
        placeholder="blur"
        preload
        sizes="(min-width: 768px) 880px, 100vw"
        className="aspect-[16/9] w-full object-cover"
      />
      <div className="px-margem pb-[calc(2rem+env(safe-area-inset-bottom))] pt-6 md:px-10 md:pb-10 md:pt-8">
        <p className="text-suave">{t.problema}</p>
        <Titulo className="text-[clamp(34px,4.4vw,48px)] leading-[1.02]">{t.nome}</Titulo>
        <p className="mt-4 max-w-[62ch]">{t.oQueE}</p>

        <div className="mt-8 grid gap-8 border-t border-linha pt-6 md:grid-cols-2">
          <div>
            <Sub className="font-sans text-[15px] font-semibold tracking-normal">Como funciona</Sub>
            <ol className="mt-2 space-y-1.5 text-suave">
              {t.etapas.map((e, i) => (
                <li key={e} className="flex gap-3">
                  <span className="w-4 shrink-0 tabular-nums text-tinta" aria-hidden="true">
                    {i + 1}
                  </span>
                  {e}
                </li>
              ))}
            </ol>
          </div>
          <dl className="space-y-4 text-[15px]">
            <div>
              <dt className="font-semibold">Para quem é</dt>
              <dd className="mt-1 text-suave">{t.paraQuem}</dd>
            </div>
            <div>
              <dt className="font-semibold">Tecnologia</dt>
              <dd className="mt-1 text-suave">{t.tecnologia}</dd>
            </div>
            <div>
              <dt className="font-semibold">Duração</dt>
              <dd className="mt-1 text-suave">{t.duracao}</dd>
            </div>
          </dl>
        </div>

        <a href={linkWhatsApp(`Olá! Quero saber mais sobre ${t.nome.toLowerCase()} na ${clinica.nome}.`)} className="botao botao-preto mt-8 w-full sm:w-auto">
          Perguntar no WhatsApp
        </a>
      </div>
    </article>
  );
}
