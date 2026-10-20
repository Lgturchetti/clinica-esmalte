import Link from "next/link";

export default function NaoEncontrada() {
  return (
    <div className="mx-auto max-w-[1240px] px-margem py-24">
      <h1 className="text-4xl sm:text-5xl">Página não encontrada</h1>
      <p className="mt-4 max-w-xl text-lg text-suave">
        O endereço pode ter mudado ou ter sido digitado errado.
      </p>
      <Link
        href="/"
        className="botao botao-preto mt-8"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
