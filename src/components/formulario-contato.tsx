"use client";

import { useActionState, useEffect, useRef } from "react";
import { enviarContato } from "@/app/contato/actions";
import { assuntos, type Campo, type EstadoContato } from "@/data/contato";

const inicial: EstadoContato = { status: "inicial" };

const estiloCampo =
  "mt-1.5 block w-full rounded-botao border border-linha bg-white px-4 py-3 text-tinta transition-colors duration-150 placeholder:text-suave/60 hover:border-tinta/30 focus:border-tinta focus:outline-none focus:ring-2 focus:ring-tinta/10 aria-[invalid=true]:border-red-700";

export function FormularioContato() {
  const [estado, enviar, enviando] = useActionState(enviarContato, inicial);
  const inicio = useRef<HTMLInputElement>(null);
  const aviso = useRef<HTMLDivElement>(null);

  const abertoEm = useRef(0);

  // Marca quando o formulário apareceu (armadilha de tempo contra robôs). Roda de novo a cada
  // resposta porque o React limpa os campos do formulário depois de cada envio.
  useEffect(() => {
    if (!abertoEm.current) abertoEm.current = Date.now();
    if (inicio.current) inicio.current.value = String(abertoEm.current);
    // Erro: foco no primeiro campo errado (o aviso no topo é lido por ser role="alert").
    // Sucesso: foco na mensagem de enviado.
    if (estado.status === "erro") {
      const primeiro = document.querySelector<HTMLElement>("form [aria-invalid=true]");
      (primeiro ?? aviso.current)?.focus();
    } else if (estado.status === "enviado") aviso.current?.focus();
  }, [estado]);

  if (estado.status === "enviado") {
    return (
      <div ref={aviso} tabIndex={-1} role="status" className="entra rounded-cartao border border-linha bg-superficie p-6 sm:p-8">
        <p className="font-titulo text-[30px] leading-tight">Mensagem enviada.</p>
        <p className="mt-2">Respondemos no mesmo dia, em horário de atendimento.</p>
        {estado.demonstracao && (
          <p className="mt-4 text-[0.95rem] text-suave">
            Este é um site de demonstração: a mensagem foi validada, mas não foi enviada para nenhum e-mail.
          </p>
        )}
      </div>
    );
  }

  const erro = (campo: Campo) => estado.erros?.[campo];
  const props = (campo: Campo) => ({
    id: campo,
    name: campo,
    defaultValue: estado.valores?.[campo],
    "aria-invalid": erro(campo) ? true : undefined,
    "aria-describedby": erro(campo) ? `${campo}-erro` : undefined,
    className: estiloCampo,
  });
  const mensagemErro = (campo: Campo) =>
    erro(campo) ? (
      <p id={`${campo}-erro`} className="mt-1.5 text-[0.95rem] text-red-800">
        {erro(campo)}
      </p>
    ) : null;

  return (
    <form action={enviar} noValidate className="grid gap-5 sm:grid-cols-2">
      {estado.status === "erro" && (
        <div ref={aviso} tabIndex={-1} role="alert" className="rounded-cartao border border-red-800/30 bg-red-50 p-4 text-red-900 sm:col-span-2">
          {estado.mensagem}
        </div>
      )}

      <div className="sm:col-span-2">
        <label htmlFor="nome" className="text-[15px] font-semibold">Nome</label>
        <input {...props("nome")} type="text" autoComplete="name" autoCapitalize="words" enterKeyHint="next" required maxLength={80} />
        {mensagemErro("nome")}
      </div>

      <div>
        <label htmlFor="telefone" className="text-[15px] font-semibold">Telefone ou WhatsApp</label>
        <input {...props("telefone")} type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="next" placeholder="(55) 99999-9999" required maxLength={20} />
        {mensagemErro("telefone")}
      </div>

      <div>
        <label htmlFor="email" className="text-[15px] font-semibold">
          E-mail <span className="font-normal text-suave">(opcional)</span>
        </label>
        <input {...props("email")} type="email" inputMode="email" autoComplete="email" autoCapitalize="none" autoCorrect="off" spellCheck={false} enterKeyHint="next" maxLength={120} />
        {mensagemErro("email")}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="assunto" className="text-[15px] font-semibold">Assunto</label>
        <select {...props("assunto")} defaultValue={estado.valores?.assunto ?? assuntos[0]}>
          {assuntos.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
        {mensagemErro("assunto")}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="mensagem" className="text-[15px] font-semibold">Mensagem</label>
        <textarea {...props("mensagem")} rows={5} required maxLength={2000} />
        {mensagemErro("mensagem")}
      </div>

      {/* Armadilhas contra robôs: invisíveis para pessoas */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="site">Não preencha este campo</label>
        <input id="site" name="site" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={inicio} type="hidden" name="inicio" defaultValue="0" />

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-[0.95rem] text-suave">
          Usamos os seus dados só para responder esta mensagem.
        </p>
        <button
          type="submit"
          disabled={enviando}
          className="botao botao-preto shrink-0 disabled:cursor-wait disabled:opacity-70"
        >
          {enviando ? "Enviando…" : "Enviar mensagem"}
        </button>
      </div>
    </form>
  );
}
