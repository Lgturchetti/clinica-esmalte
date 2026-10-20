"use server";

// Recebe o formulário de contato. Valida tudo de novo aqui (o navegador pode ser burlado)
// e envia por e-mail pelo Resend quando RESEND_API_KEY e CONTATO_EMAIL estão configurados.
// Sem essas variáveis, roda em "modo demonstração": valida e responde, mas não envia nada.

import { assuntos, type Campo, type EstadoContato } from "@/data/contato";

const TEMPO_MINIMO_MS = 3000; // robôs enviam em menos de 3 segundos
const TEMPO_MAXIMO_MS = 24 * 60 * 60 * 1000; // marcador velho ou falso

function texto(formData: FormData, campo: string, max: number) {
  const valor = formData.get(campo);
  return typeof valor === "string" ? valor.trim().slice(0, max) : "";
}

export async function enviarContato(_anterior: EstadoContato, formData: FormData): Promise<EstadoContato> {
  // Armadilhas contra spam: campo escondido preenchido ou envio rápido demais.
  // Responde como se tivesse dado certo, para o robô não tentar de novo.
  const armadilha = texto(formData, "site", 200);
  const inicio = Number(formData.get("inicio"));
  const decorrido = Date.now() - inicio;
  if (armadilha || !Number.isFinite(inicio) || decorrido < TEMPO_MINIMO_MS || decorrido > TEMPO_MAXIMO_MS) {
    return { status: "enviado" };
  }

  const valores = {
    nome: texto(formData, "nome", 80),
    telefone: texto(formData, "telefone", 20),
    email: texto(formData, "email", 120),
    assunto: texto(formData, "assunto", 60),
    mensagem: texto(formData, "mensagem", 2000),
  };

  const erros: Partial<Record<Campo, string>> = {};
  if (valores.nome.length < 2) erros.nome = "Escreva o seu nome.";
  const digitos = valores.telefone.replace(/\D/g, "");
  if (digitos.length < 10 || digitos.length > 13) erros.telefone = "Escreva o telefone com DDD, por exemplo (55) 99999-9999.";
  if (valores.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valores.email)) erros.email = "Confira o e-mail: falta o @ ou o domínio.";
  if (!assuntos.includes(valores.assunto)) erros.assunto = "Escolha um assunto.";
  if (valores.mensagem.length < 5) erros.mensagem = "Escreva a sua mensagem.";

  if (Object.keys(erros).length > 0) {
    return { status: "erro", erros, valores, mensagem: "Confira os campos marcados." };
  }

  const chave = process.env.RESEND_API_KEY;
  const destino = process.env.CONTATO_EMAIL;
  if (!chave || !destino) {
    return { status: "enviado", demonstracao: true };
  }

  // Assunto do e-mail numa linha só (sem quebras vindas do formulário)
  const umaLinha = (s: string) => s.replace(/[\r\n]+/g, " ");
  const resposta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTATO_REMETENTE ?? "Site da clínica <onboarding@resend.dev>",
      to: [destino],
      reply_to: valores.email || undefined,
      subject: umaLinha(`Site: ${valores.assunto} — ${valores.nome}`),
      text: [
        `Nome: ${valores.nome}`,
        `Telefone: ${valores.telefone}`,
        `E-mail: ${valores.email || "não informado"}`,
        `Assunto: ${valores.assunto}`,
        "",
        valores.mensagem,
      ].join("\n"),
    }),
  }).catch(() => null);

  if (!resposta?.ok) {
    return {
      status: "erro",
      valores,
      mensagem: "Não foi possível enviar agora. Tente de novo em alguns minutos ou chame no WhatsApp.",
    };
  }
  return { status: "enviado" };
}
