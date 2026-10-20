import { notFound } from "next/navigation";
import { DetalheTratamento } from "@/components/detalhe-tratamento";
import { JanelaTratamento } from "@/components/janela-tratamento";
import { tratamentos } from "@/data/clinica";

// Rota interceptada: navegando dentro do site, /tratamentos/[slug] abre por cima da página atual.
export function generateStaticParams() {
  return tratamentos.map((t) => ({ slug: t.slug }));
}

export default async function JanelaPagina({ params }: PageProps<"/tratamentos/[slug]">) {
  const { slug } = await params;
  const t = tratamentos.find((x) => x.slug === slug);
  if (!t) notFound();
  return (
    <JanelaTratamento slug={slug} titulo={t.nome}>
      <DetalheTratamento t={t} Titulo="h2" />
    </JanelaTratamento>
  );
}
