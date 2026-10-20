"use client";

import { useEffect, useState } from "react";
import { agendar } from "@/data/clinica";

// Celular: "Agendar avaliação" fixo embaixo. Aparece depois da capa (ou depois de rolar um pouco
// nas páginas sem capa) e some perto do rodapé, que já tem os contatos.
export function BarraAgendar() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => {
      const capa = document.querySelector("[data-capa]");
      const passouCapa = capa ? capa.getBoundingClientRect().bottom < 80 : window.scrollY > window.innerHeight * 0.5;
      const rodape = document.querySelector("footer");
      const pertoRodape = rodape ? rodape.getBoundingClientRect().top < window.innerHeight : false;
      setVisivel(passouCapa && !pertoRodape);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, []);

  return (
    <div
      data-visivel={visivel || undefined}
      inert={!visivel}
      className="fixed inset-x-0 bottom-0 z-20 translate-y-[110%] border-t border-linha bg-white/90 px-margem pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-[260ms] ease-out data-visivel:translate-y-0 md:hidden motion-reduce:transition-none"
    >
      <a href={agendar} className="botao botao-preto w-full">
        Agendar avaliação
      </a>
    </div>
  );
}
