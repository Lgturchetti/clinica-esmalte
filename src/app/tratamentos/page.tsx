import type { Metadata } from "next";
import { CartaoTratamento } from "@/components/cartao-tratamento";
import { Fileira } from "@/components/fileira";
import { categorias, tratamentos } from "@/data/clinica";

export const metadata: Metadata = {
  title: "Tratamentos",
  description:
    "Urgência, implante guiado, coroa em 1 sessão, clareamento, alinhadores, limpeza e odontopediatria, com odontologia digital no centro de Santa Maria.",
  alternates: { canonical: "/tratamentos" },
};

// Fileiras por categoria, como num serviço de streaming. Categoria sem tratamento não aparece.
const fileiras = categorias
  .map((c) => ({ ...c, itens: tratamentos.filter((t) => t.categoria === c.id) }))
  .filter((c) => c.itens.length > 0);

export default function Tratamentos() {
  return (
    <>
      <div className="mx-auto max-w-[1240px] px-margem pb-12 pt-10 sm:pt-16">
        <h1 className="max-w-[14ch] text-[clamp(44px,6.4vw,84px)] leading-[0.98] tracking-[-0.035em]">O que você quer resolver?</h1>
        <p className="mt-5 max-w-[48ch] text-suave">
          Toque num tratamento para ver como funciona, que tecnologia usa e quanto tempo leva. O valor sai no plano, antes de começar.
        </p>
      </div>

      {/* Celular: uma fileira deslizante por categoria (como no streaming) */}
      <div className="space-y-14 pb-24 lg:hidden">
        {fileiras.map((c) => (
          <section key={c.id}>
            <Fileira
              rotulo={c.nome}
              titulo={
                <h2 id={`cat-${c.id}`} className="font-sans text-[22px] font-semibold tracking-normal">
                  {c.nome}
                </h2>
              }
            >
              {c.itens.map((t) => (
                <CartaoTratamento key={t.slug} t={t} />
              ))}
            </Fileira>
          </section>
        ))}
      </div>

      {/* Desktop: as categorias são curtas; uma grade única, com a categoria em cada cartão, não deixa vãos */}
      <ul className="mx-auto hidden max-w-[1240px] grid-cols-4 gap-x-4 gap-y-8 px-margem pb-24 lg:grid">
        {fileiras.flatMap((c) =>
          c.itens.map((t) => (
            <li key={t.slug}>
              <CartaoTratamento t={t} categoria={c.nome} />
            </li>
          )),
        )}
      </ul>
    </>
  );
}
