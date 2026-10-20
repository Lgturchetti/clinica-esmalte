import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetalheTratamento } from "@/components/detalhe-tratamento";
import { tratamentos } from "@/data/clinica";

// Página inteira do tratamento: quem chega pelo Google ou por um link compartilhado.
// Navegando dentro do site, o mesmo endereço abre a janela por cima (app/@modal).
export function generateStaticParams() {
  // Com Cache Components a lista não pode ser vazia: sem itens, um endereço provisório (cai no notFound)
  return tratamentos.length > 0 ? tratamentos.map((t) => ({ slug: t.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/tratamentos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = tratamentos.find((x) => x.slug === slug);
  if (!t) return {};
  return { title: `${t.nome} (${t.problema.toLowerCase()})`, description: t.resumo, alternates: { canonical: `/tratamentos/${t.slug}` } };
}

export default async function PaginaTratamento({ params }: PageProps<"/tratamentos/[slug]">) {
  const { slug } = await params;
  const t = tratamentos.find((x) => x.slug === slug);
  if (!t) notFound();
  return (
    <div className="mx-auto max-w-[880px] pb-16 pt-4 md:px-margem">
      <Link href="/tratamentos" className="mb-4 inline-block px-margem text-[15px] font-semibold underline-offset-4 hover:underline md:px-0">
        Todos os tratamentos
      </Link>
      <div className="overflow-hidden md:rounded-cartao md:border md:border-linha">
        <DetalheTratamento t={t} />
      </div>
    </div>
  );
}
