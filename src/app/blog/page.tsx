import type { Metadata } from "next";
import { ListaPosts } from "@/components/lista-posts";
import { posts } from "@/data/clinica";

export const metadata: Metadata = {
  title: "Blog",
  description: "Textos curtos da equipe da Clínica Esmalte sobre saúde bucal, tratamentos e dúvidas comuns.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  return (
    <>
      <div className="mx-auto max-w-[1240px] px-margem pb-6 pt-10 sm:pt-16">
        <h1 className="text-[clamp(44px,6.4vw,84px)] leading-[0.98] tracking-[-0.035em]">Blog</h1>
        <p className="mt-4 max-w-[48ch] text-suave">Respostas curtas para as dúvidas que mais ouvimos no consultório.</p>
      </div>
      <div className="mx-auto max-w-[1240px] px-margem pb-20">
        {posts.length > 0 ? (
          <ListaPosts posts={posts} nivel="h2" />
        ) : (
          <p className="text-suave">Ainda não há textos publicados.</p>
        )}
      </div>
    </>
  );
}
