import { posts } from "@/data/clinica";

// Páginas do menu (cabeçalho, menu do celular, rodapé e mapa do site).
// "Blog" só aparece quando há pelo menos um texto publicado.
export const paginas = [
  { href: "/tratamentos", nome: "Tratamentos" },
  { href: "/clinica", nome: "A clínica" },
  { href: "/contato", nome: "Contato" },
  ...(posts.length > 0 ? [{ href: "/blog", nome: "Blog" }] : []),
];
