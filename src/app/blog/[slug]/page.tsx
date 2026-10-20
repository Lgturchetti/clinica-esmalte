import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { clinica, formatarData, posts } from "@/data/clinica";

export function generateStaticParams() {
  // Com Cache Components a lista não pode ser vazia: sem itens, um endereço provisório (cai no notFound)
  return posts.length > 0 ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

function buscar(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = buscar((await params).slug);
  if (!post) return {};
  return {
    title: post.titulo,
    description: post.resumo,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.titulo, description: post.resumo, publishedTime: post.data },
  };
}

export default async function PostBlog({ params }: PageProps<"/blog/[slug]">) {
  const post = buscar((await params).slug);
  if (!post) notFound();

  const dadosArtigo = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.resumo,
    datePublished: post.data,
    author: { "@type": "Person", name: post.autor },
    publisher: { "@type": "Organization", name: clinica.nome },
    mainEntityOfPage: `${clinica.url}/blog/${post.slug}`,
  };

  return (
    <>
      <article className="mx-auto max-w-[42rem] px-margem pb-20 pt-10 sm:pt-14">
        <Link href="/blog" className="font-semibold text-tinta underline-offset-4 hover:underline">
          Blog
        </Link>
        <h1 className="mt-4 text-[clamp(36px,5vw,60px)] leading-[1.02] tracking-[-0.03em]">{post.titulo}</h1>
        <p className="mt-4 text-suave">
          {post.autor}, <time dateTime={post.data}>{formatarData(post.data)}</time>. {post.leitura}.
        </p>

        <div className="artigo mt-10 border-t border-linha pt-8">
          {post.corpo.map((bloco, i) => {
            if (bloco.tipo === "h2") return <h2 key={i}>{bloco.texto}</h2>;
            if (bloco.tipo === "lista")
              return (
                <ul key={i}>
                  {bloco.itens.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            return <p key={i}>{bloco.texto}</p>;
          })}
        </div>
      </article>


      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosArtigo).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
