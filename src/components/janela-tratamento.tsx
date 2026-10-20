"use client";

import { Drawer } from "@base-ui/react/drawer";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";

// Janela do detalhe do tratamento (rota interceptada). Base UI cuida de foco preso, Esc, clique
// fora e leitor de tela. No celular é um painel que sobe de baixo e fecha arrastando; no desktop
// cresce a partir do cartão clicado (FLIP com a Web Animations API).
export function JanelaTratamento({ slug, titulo, children }: { slug: string; titulo: string; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [aberta, setAberta] = useState(true);
  const popup = useRef<HTMLDivElement>(null);

  // Cresce a partir do cartão (só desktop; no celular o painel sobe de baixo pelo CSS)
  useEffect(() => {
    const el = popup.current;
    if (!el || !matchMedia("(min-width: 768px)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // O mesmo cartão pode existir duas vezes (fileira no celular, grade no desktop): usar o visível
    const cartao = [...document.querySelectorAll<HTMLElement>(`[data-cartao="${slug}"]`)].find((el) => el.getClientRects().length > 0);
    const para = el.getBoundingClientRect();
    if (cartao) {
      const de = cartao.getBoundingClientRect();
      el.animate(
        [
          { transform: `translate(${de.left - para.left}px, ${de.top - para.top}px) scale(${de.width / para.width}, ${de.height / para.height})`, opacity: 0.6 },
          { transform: "none", opacity: 1 },
        ],
        { duration: 320, easing: "cubic-bezier(0.32, 0.72, 0, 1)" },
      );
    } else {
      el.animate([{ transform: "scale(0.97)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 220, easing: "cubic-bezier(0.23, 1, 0.32, 1)" });
    }
  }, [slug]);

  // Se a pessoa navegou para outra página por um link, a janela não deve continuar aberta
  if (!pathname.startsWith(`/tratamentos/${slug}`)) return null;

  return (
    <Drawer.Root
      open={aberta}
      onOpenChange={setAberta}
      // Só volta no histórico depois da animação de saída terminar
      onOpenChangeComplete={(open) => {
        if (!open) router.back();
      }}
    >
      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 z-50 min-h-dvh bg-black opacity-[calc(0.35*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[400ms] ease-gaveta data-ending-style:opacity-0 data-ending-style:duration-200 data-starting-style:opacity-0 data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Drawer.Viewport className="fixed inset-0 z-50 flex items-end justify-center md:items-start md:pt-[6vh]">
          <Drawer.Popup
            ref={popup}
            className="relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-xl bg-white shadow-flutua outline-none [transform:translateY(var(--drawer-swipe-movement-y))] transition-[transform,opacity] duration-[400ms] ease-gaveta data-ending-style:duration-200 data-swiping:select-none max-md:data-ending-style:[transform:translateY(100%)] max-md:data-starting-style:[transform:translateY(100%)] md:max-h-[88vh] md:w-[min(880px,92vw)] md:rounded-cartao md:data-ending-style:opacity-0 md:data-ending-style:[transform:translateY(12px)_scale(0.98)] motion-reduce:transition-none"
          >
            <Drawer.Title className="sr-only">{titulo}</Drawer.Title>
            <div className="sticky top-0 z-10 flex h-0 justify-end">
              <Drawer.Close aria-label="Fechar" className="m-3 grid size-11 place-items-center rounded-botao bg-white/90 backdrop-blur transition-transform duration-150 active:scale-95">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="m3 3 10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Drawer.Close>
            </div>
            {/* Puxador do celular */}
            <div className="absolute left-1/2 top-2 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-white/80 md:hidden" aria-hidden="true" />
            <Drawer.Content>{children}</Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
