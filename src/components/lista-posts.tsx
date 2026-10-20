import Link from "next/link";
import { formatarData, type Post } from "@/data/clinica";

// `nivel`: h2 quando a lista está direto sob o h1 da página (/blog); h3 sob uma seção com h2 (início)
export function ListaPosts({ posts, nivel = "h3" }: { posts: Post[]; nivel?: "h2" | "h3" }) {
  const Titulo = nivel;
  if (posts.length === 0) return null;
  return (
    <ul className="mt-8 grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="group block h-full rounded-cartao border border-linha bg-superficie p-6 transition-colors duration-150 hover:border-tinta/25"
          >
            <p className="text-[0.95rem] text-suave">
              <time dateTime={post.data}>{formatarData(post.data)}</time>, {post.leitura}
            </p>
            <Titulo className="mt-2 text-2xl transition-colors duration-150 group-hover:text-tinta">{post.titulo}</Titulo>
            <p className="mt-2 text-suave">{post.resumo}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
