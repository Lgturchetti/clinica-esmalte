// Tipos e opções do formulário de contato. Ficam fora de actions.ts porque um arquivo
// "use server" só pode exportar funções assíncronas.
export type Campo = "nome" | "telefone" | "email" | "assunto" | "mensagem";

export type EstadoContato = {
  status: "inicial" | "erro" | "enviado";
  erros?: Partial<Record<Campo, string>>;
  mensagem?: string;
  valores?: Partial<Record<Campo, string>>;
  demonstracao?: boolean;
};

export const assuntos = ["Agendar uma avaliação", "Dúvida sobre tratamento", "Convênio ou pagamento", "Outro assunto"];
