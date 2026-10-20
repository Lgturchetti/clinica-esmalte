import Image from "next/image";
import Link from "next/link";
import type { Tratamento } from "@/data/clinica";

// O mesmo cartão em todo o site: "problema · tratamento". Abre o detalhe por cima (rota interceptada).
// `data-cartao` permite que a janela de detalhe encontre o cartão e cresça a partir dele.
export function CartaoTratamento({ t, prioridade }: { t: Tratamento; prioridade?: boolean }) {
  return (
    <Link href={`/tratamentos/${t.slug}`} scroll={false} data-cartao={t.slug} className="cartao group block overflow-hidden rounded-cartao bg-superficie">
      <div className="aspect-[4/5] overflow-hidden">
        <Image
          src={t.foto.src}
          alt=""
          placeholder="blur"
          preload={prioridade}
          sizes="(min-width: 768px) 290px, 72vw"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="px-4 pb-4 pt-3.5">
        <p className="font-titulo text-[23px] leading-[1.15] tracking-[-0.02em]">{t.problema}</p>
        <p className="mt-0.5 text-[14px] text-suave">{t.nome}</p>
      </div>
    </Link>
  );
}
