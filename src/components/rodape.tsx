import Link from "next/link";
import { agendar, clinica, enderecoEmLinha, horarios } from "@/data/clinica";
import { paginas } from "@/data/navegacao";

export function Rodape() {
  return (
    <footer className="border-t border-linha pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-16">
      <div className="mx-auto max-w-[1240px] px-margem">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-titulo text-[clamp(32px,4vw,44px)] leading-[1.02] tracking-[-0.025em]">
              Pronto para ver o seu tratamento?
            </p>
            <a href={agendar} className="botao botao-preto mt-6">
              Agendar avaliação
            </a>
          </div>
          <div className="text-[15px]">
            <p className="font-semibold">Onde</p>
            <p className="mt-2 text-suave">{enderecoEmLinha}</p>
            <a href={`tel:${clinica.telefone.replace(/\D/g, "")}`} className="mt-1 inline-block text-suave hover:text-tinta">
              {clinica.telefone}
            </a>
          </div>
          <div className="text-[15px]">
            <p className="font-semibold">Horário</p>
            <dl className="mt-2 text-suave">
              {horarios.map((h) => (
                <div key={h.dias}>
                  <dt className="inline">{h.dias}: </dt>
                  <dd className="inline tabular-nums">{h.horas}</dd>
                </div>
              ))}
            </dl>
          </div>
          <nav aria-label="Rodapé" className="text-[15px]">
            <p className="font-semibold">Páginas</p>
            <ul className="mt-2 space-y-1 text-suave">
              {paginas.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="transition-colors duration-150 hover:text-tinta">
                    {p.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-linha pt-6 text-[13px] text-suave md:flex-row md:justify-between">
          <p>
            <span translate="no">{clinica.nome}</span>. Responsável técnico: {clinica.responsavelTecnico.nome},{" "}
            {clinica.responsavelTecnico.cro}.
          </p>
          <p>Clínica fictícia, projeto de demonstração. Fotos: Pexels.</p>
        </div>
      </div>
    </footer>
  );
}
