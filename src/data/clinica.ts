// Clínica FICTÍCIA — projeto de demonstração/portfólio (v2: odontologia digital).
// Todo o conteúdo do site sai daqui. Para um cliente real, trocar os dados e as fotos.
// Regras do CFO: sem preços, sem promessa de resultado, sem antes/depois de pacientes, sem depoimentos.

import type { StaticImageData } from "next/image";
import cadeiraLuz from "@/fotos/cadeira-luz.jpg";
import clareamento from "@/fotos/clareamento.jpg";
import consulta from "@/fotos/consulta.jpg";
import consultorio from "@/fotos/consultorio.jpg";
import criancas from "@/fotos/criancas.jpg";
import drMarcelo from "@/fotos/dr-marcelo.jpg";
import draCamila from "@/fotos/dra-camila.jpg";
import draJuliana from "@/fotos/dra-juliana.jpg";
import implante from "@/fotos/implante.jpg";
import limpeza from "@/fotos/limpeza.jpg";
import ortodontia from "@/fotos/ortodontia.jpg";
import protese from "@/fotos/protese.jpg";

export type Foto = { src: StaticImageData; alt: string };

export const clinica = {
  nome: "Clínica Esmalte Odontologia",
  nomeCurto: "Esmalte",
  descricao:
    "Odontologia digital no centro de Santa Maria: escaneamento 3D sem massa, planejamento na tela e coroa pronta na mesma consulta.",
  url: "https://clinica-esmalte.vercel.app",
  endereco: { rua: "Rua Fictícia, 456, sala 302", bairro: "Centro", cidade: "Santa Maria", uf: "RS", cep: "97010-000" },
  // Endereço fictício: o pino fica no Centro, perto da Praça Saldanha Marinho.
  local: { lat: -29.6862, lon: -53.8095 },
  whatsapp: "5555900000000", // número de exemplo
  telefone: "(55) 3000-0000", // número de exemplo
  email: "contato@exemplo.com.br",
  instagram: "https://www.instagram.com/",
  responsavelTecnico: { nome: "Dr. Marcelo Antunes", cro: "CRO-RS 00000" },
};

// Textos de apresentação: escritos à mão para cada cliente.
export const textos = {
  capaTitulo: "Tratamento que você vê antes de começar.",
  capaSubtitulo: "Escaneamento 3D no lugar da massa, planejamento na tela e coroa pronta na mesma consulta. No centro de Santa Maria.",
  historia:
    "A Esmalte nasceu em 2012 com uma ideia: o paciente tem o direito de ver o tratamento antes de começar. Em 2021 a clínica passou a ser 100% digital, do escaneamento à peça pronta.",
};

export const enderecoEmLinha = `${clinica.endereco.rua}, ${clinica.endereco.bairro}, ${clinica.endereco.cidade}/${clinica.endereco.uf}`;

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${clinica.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export const agendar = linkWhatsApp("Olá! Quero agendar uma avaliação na Clínica Esmalte.");

export const fotoCapa: Foto = {
  src: consultorio,
  alt: "Consultório claro com cadeira odontológica moderna, bancada e janela grande",
};

export const fotosEspaco: Foto[] = [
  { src: consultorio, alt: "Consultório com cadeira odontológica, bancada e computador" },
  { src: cadeiraLuz, alt: "Cadeira odontológica ao lado de uma janela com luz natural" },
  { src: limpeza, alt: "Paciente conversando com a dentista no consultório" },
];

// Horário de atendimento, para exibir. `dias` usa o nome que aparece na tela;
// `schema` é o código do dia para o Google (dados estruturados).
export type Horario = { dias: string; horas: string; abre: string; fecha: string; schema: string[] };

export const horarios: Horario[] = [
  {
    dias: "Segunda a sexta",
    horas: "8h às 19h",
    abre: "08:00",
    fecha: "19:00",
    schema: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  { dias: "Sábado", horas: "8h às 12h", abre: "08:00", fecha: "12:00", schema: ["Saturday"] },
];

// Quando a clínica não abre (aparece na página de contato). Vazio = não mostra a linha.
export const fechado = "Domingo e feriados";

// Tratamentos: UMA divisão no site inteiro. Cada um é "problema · tratamento" e pertence a uma categoria
// (as fileiras da página Tratamentos). O mesmo cartão aparece na página inicial e abre o mesmo detalhe.
export const categorias = [
  { id: "agora", nome: "Agora" },
  { id: "prevencao", nome: "Prevenção" },
  { id: "estetica", nome: "Estética" },
  { id: "repor", nome: "Repor dentes" },
  { id: "alinhar", nome: "Alinhar" },
  { id: "criancas", nome: "Crianças" },
] as const;
export type Categoria = (typeof categorias)[number]["id"];

export type Tratamento = {
  slug: string;
  problema: string; // como o paciente fala
  nome: string; // como a clínica chama
  categoria: Categoria;
  naInicial: boolean; // aparece na fileira da página inicial
  resumo: string;
  oQueE: string;
  paraQuem: string;
  etapas: string[];
  tecnologia: string;
  duracao: string;
  foto: Foto;
};

export const tratamentos: Tratamento[] = [
  {
    slug: "urgencia", problema: "Dor agora", nome: "Urgência", categoria: "agora", naInicial: true,
    resumo: "Atendimento no mesmo dia para dor, dente quebrado ou inchaço.",
    oQueE: "Horários reservados todos os dias para urgências. A radiografia digital sai na hora, e você sai com a dor resolvida e o plano do que fazer depois.",
    paraQuem: "Dor de dente, dente quebrado, inchaço, restauração que caiu.",
    etapas: ["Chame no WhatsApp", "Atendimento no mesmo dia", "Alívio da dor", "Plano do tratamento"],
    tecnologia: "Radiografia digital, com imagem na hora", duracao: "Atendimento no mesmo dia",
    foto: { src: cadeiraLuz, alt: "Cadeira odontológica pronta para o atendimento" },
  },
  {
    slug: "implante", problema: "Dente perdido", nome: "Implante guiado", categoria: "repor", naInicial: true,
    resumo: "Implante planejado em 3D e colocado com um guia feito sob medida.",
    oQueE: "Um pino de titânio no lugar da raiz, posicionado com um guia feito no computador a partir da sua tomografia. Depois, recebe uma coroa igual a um dente natural.",
    paraQuem: "Quem perdeu um ou mais dentes e tem osso suficiente, o que a tomografia mostra.",
    etapas: ["Avaliação e tomografia", "Planejamento 3D", "Colocação com o guia", "Coroa definitiva"],
    tecnologia: "Tomografia, planejamento 3D e guia cirúrgico", duracao: "De 3 a 6 meses do início ao dente pronto",
    foto: { src: implante, alt: "Modelo de gesso mostrando um implante entre dois dentes" },
  },
  {
    slug: "coroa", problema: "Dente quebrado ou desgastado", nome: "Coroa em 1 sessão", categoria: "repor", naInicial: false,
    resumo: "A peça é desenhada e feita aqui na clínica enquanto você espera.",
    oQueE: "Depois do escaneamento, a coroa é desenhada no computador e fresada em cerâmica na própria clínica. Sem provisório e sem segunda consulta para colocar.",
    paraQuem: "Dentes muito restaurados, quebrados ou com canal tratado.",
    etapas: ["Preparo do dente", "Escaneamento 3D", "Desenho e fresagem", "Colocação no mesmo dia"],
    tecnologia: "Escaneamento 3D e fresadora na clínica", duracao: "Uma sessão de 2 a 3 horas",
    foto: { src: protese, alt: "Modelos de arcadas dentárias sobre uma bancada" },
  },
  {
    slug: "clareamento", problema: "Sorriso mais branco", nome: "Clareamento", categoria: "estetica", naInicial: true,
    resumo: "Moldeira sob medida a partir do escaneamento, com acompanhamento.",
    oQueE: "Gel clareador numa moldeira feita a partir do seu escaneamento 3D, usada em casa com retornos. Antes, avaliamos dentes e gengiva.",
    paraQuem: "Quem tem dentes saudáveis e quer um tom mais claro. Restaurações e coroas não clareiam, e isso é explicado antes.",
    etapas: ["Avaliação e limpeza", "Escaneamento 3D", "Uso do gel com retornos", "Ajuste final"],
    tecnologia: "Moldeira feita a partir do escaneamento 3D", duracao: "Em média 2 a 3 semanas",
    foto: { src: clareamento, alt: "Paciente sorrindo e olhando os dentes num espelho de mão" },
  },
  {
    slug: "planejamento-do-sorriso", problema: "Mudar o sorriso", nome: "Planejamento digital do sorriso", categoria: "estetica", naInicial: false,
    resumo: "Você vê o sorriso planejado na tela e aprova antes de qualquer procedimento.",
    oQueE: "A partir de fotos e do escaneamento, o novo sorriso é desenhado no computador. Você vê, opina e ajusta junto com o dentista antes de começar.",
    paraQuem: "Quem pensa em lentes, facetas, clareamento combinado ou ajustes de formato.",
    etapas: ["Fotos e escaneamento", "Desenho do sorriso", "Apresentação na tela", "Ajustes e aprovação"],
    tecnologia: "Fotografia, escaneamento 3D e software de planejamento", duracao: "Duas consultas",
    foto: { src: consulta, alt: "Dentista mostrando o planejamento à paciente" },
  },
  {
    slug: "alinhadores", problema: "Dentes tortos", nome: "Alinhadores", categoria: "alinhar", naInicial: true,
    resumo: "Placas transparentes, com o movimento dos dentes simulado antes.",
    oQueE: "Placas transparentes trocadas a cada poucas semanas. Você vê no computador como os dentes vão se mover antes de começar.",
    paraQuem: "Adolescentes e adultos com dentes tortos, separados ou mordida desalinhada.",
    etapas: ["Escaneamento 3D", "Simulação na tela", "Entrega das placas", "Retornos de acompanhamento"],
    tecnologia: "Escaneamento 3D e simulação do movimento", duracao: "De 6 a 18 meses, conforme o caso",
    foto: { src: ortodontia, alt: "Dentista ajustando aparelho em um paciente" },
  },
  {
    slug: "limpeza", problema: "Revisão", nome: "Limpeza e prevenção", categoria: "prevencao", naInicial: true,
    resumo: "Limpeza e um escaneamento para comparar com a visita anterior.",
    oQueE: "Remoção de placa e tártaro, polimento e um escaneamento de controle: dá para ver na tela se algo mudou desde a última visita.",
    paraQuem: "Todo mundo, a cada 6 meses. É o que evita os tratamentos maiores.",
    etapas: ["Exame", "Limpeza", "Escaneamento de controle", "Orientação"],
    tecnologia: "Escaneamento 3D de controle", duracao: "Uma sessão de 40 a 50 minutos",
    foto: { src: limpeza, alt: "Paciente sorrindo na cadeira enquanto conversa com a dentista" },
  },
  {
    slug: "odontopediatria", problema: "Para meu filho", nome: "Odontopediatria", categoria: "criancas", naInicial: true,
    resumo: "Atendimento no tempo da criança, com menos radiação.",
    oQueE: "Prevenção, orientação aos pais e tratamento de cáries. O escaneamento substitui a massa, o que ajuda muito com crianças.",
    paraQuem: "Do primeiro dente até a adolescência.",
    etapas: ["Conversa com os pais", "Adaptação ao consultório", "Exame e limpeza", "Orientação para casa"],
    tecnologia: "Radiografia digital e escaneamento sem massa", duracao: "Consultas de 30 a 40 minutos",
    foto: { src: criancas, alt: "Dentista e uma menina fazendo sinal de positivo no consultório" },
  },
];

// Tecnologias: as abas da página inicial. Cada uma é uma comparação "como era / como é aqui".
// `desenho`: qual ilustração aparece do lado "como é aqui" (componente Ilustracao).
export type Tecnologia = {
  id: string;
  nome: string;
  titulo: string;
  texto: string;
  era: string;
  aqui: string;
  fotoEra: Foto;
  desenho: "arco" | "sorriso" | "guia" | "coroa";
};

export const tecnologias: Tecnologia[] = [
  {
    id: "escaneamento", nome: "Escaneamento 3D", titulo: "Sem massa na boca",
    texto: "Um scanner do tamanho de uma escova copia seus dentes em 3D em cerca de 2 minutos.",
    era: "Moldeira com massa por 5 minutos, ânsia e gosto ruim.", aqui: "Modelo 3D na tela em 2 minutos.",
    fotoEra: { src: protese, alt: "Modelos de gesso feitos a partir de moldagem com massa" }, desenho: "arco",
  },
  {
    id: "planejamento", nome: "Planejamento digital", titulo: "Você vê antes de começar",
    texto: "O sorriso planejado aparece na tela, e você ajusta junto com o dentista antes de qualquer procedimento.",
    era: "Imaginar como vai ficar e torcer.", aqui: "Ver e aprovar o resultado planejado.",
    fotoEra: { src: clareamento, alt: "Paciente olhando os dentes num espelho" }, desenho: "sorriso",
  },
  {
    id: "implante-guiado", nome: "Implante guiado", titulo: "Cirurgia planejada em 3D",
    texto: "A posição de cada implante é definida no computador a partir da tomografia, e um guia leva a broca ao lugar exato.",
    era: "Decisões tomadas durante a cirurgia.", aqui: "Guia sob medida, cirurgia mais rápida e menos invasiva.",
    fotoEra: { src: implante, alt: "Modelo de implante dentário" }, desenho: "guia",
  },
  {
    id: "coroa", nome: "Coroa em 1 sessão", titulo: "Pronta na mesma consulta",
    texto: "A coroa é desenhada e fresada aqui na clínica enquanto você espera.",
    era: "Provisório, laboratório e uma nova consulta.", aqui: "Uma sessão, sem provisório.",
    fotoEra: { src: protese, alt: "Modelos de gesso enviados ao laboratório" }, desenho: "coroa",
  },
];

// Primeira consulta (seção "Antes de vir"): sequência real, por isso numerada.
export const primeiraConsulta = [
  { titulo: "Conversa", texto: "Você conta o que sente e o que espera." },
  { titulo: "Escaneamento", texto: "Seus dentes em 3D na tela, sem massa." },
  { titulo: "Plano na tela", texto: "Cada etapa, o tempo e o valor, por escrito." },
];

export type Profissional = { nome: string; area: string; cro: string; bio: string; foto: Foto };

export const equipe: Profissional[] = [
  {
    nome: "Dr. Marcelo Antunes", area: "Implantes e reabilitação", cro: "CRO-RS 00000",
    bio: "Fundador e responsável técnico. Especialista em implantodontia, planeja cada cirurgia em 3D.",
    foto: { src: drMarcelo, alt: "Dentista de jaleco branco sentado com os braços cruzados no consultório" },
  },
  {
    nome: "Dra. Juliana Prates", area: "Ortodontia e crianças", cro: "CRO-RS 00001",
    bio: "Especialista em ortodontia. Cuida dos alinhadores e das crianças da clínica.",
    foto: { src: draJuliana, alt: "Dentista de uniforme azul sorrindo, sentada no consultório" },
  },
  {
    nome: "Dra. Camila Werner", area: "Estética e endodontia", cro: "CRO-RS 00002",
    bio: "Faz o planejamento digital do sorriso e tratamentos de canal com microscópio.",
    foto: { src: draCamila, alt: "Dentista de uniforme roxo atendendo com o auxílio de um microscópio" },
  },
];

export const convenios = [
  "Unimed Odonto",
  "OdontoPrev",
  "Amil Dental",
  "Bradesco Dental",
  "SulAmérica Odonto",
  "IPE Saúde",
];

export const formasPagamento = "Particular: Pix, dinheiro, débito ou cartão de crédito em até 10 vezes.";

export const duvidas = [
  {
    pergunta: "Vocês atendem urgência?",
    resposta:
      "Sim. Em caso de dor, chame no WhatsApp: reservamos horários todos os dias para urgências de pacientes.",
  },
  {
    pergunta: "Quanto custa a primeira consulta?",
    resposta:
      "Pelo convênio, a avaliação costuma estar coberta. No particular, informamos o valor quando você agendar.",
  },
  {
    pergunta: "Meu convênio cobre o tratamento todo?",
    resposta:
      "Depende do plano. Limpeza, restaurações e extrações costumam estar cobertas; implantes, clareamento e alinhadores geralmente não. Verificamos o seu plano antes de começar.",
  },
  {
    pergunta: "Tenho muito medo de dentista. E agora?",
    resposta:
      "Conte isso na hora de agendar. A primeira consulta é só conversa e exame, sem nenhum procedimento, e você pode pedir para parar a qualquer momento.",
  },
  {
    pergunta: "Posso levar meu filho pequeno?",
    resposta:
      "Pode e deve. A primeira visita é indicada quando nasce o primeiro dente ou até 1 ano de idade.",
  },
  {
    pergunta: "Tem estacionamento?",
    resposta: "O prédio tem estacionamento rotativo conveniado na garagem, com a primeira hora paga pela clínica.",
  },
];

// Blog: cada post tem blocos simples (parágrafo, subtítulo ou lista).
export type Bloco = { tipo: "p"; texto: string } | { tipo: "h2"; texto: string } | { tipo: "lista"; itens: string[] };

export type Post = {
  slug: string;
  titulo: string;
  resumo: string;
  data: string; // AAAA-MM-DD
  autor: string;
  leitura: string;
  corpo: Bloco[];
};

export const posts: Post[] = [
  {
    slug: "clareamento-estraga-o-dente",
    titulo: "Clareamento estraga o dente?",
    resumo: "O que acontece com o esmalte, por que a sensibilidade aparece e quando o clareamento não é indicado.",
    data: "2026-10-06",
    autor: "Dra. Camila Werner",
    leitura: "4 min de leitura",
    corpo: [
      {
        tipo: "p",
        texto:
          "Feito com acompanhamento de um dentista, não. O gel clareador age nos pigmentos de dentro do dente e não desgasta o esmalte. O problema está no clareamento feito por conta própria, com produtos comprados pela internet ou receitas caseiras.",
      },
      { tipo: "h2", texto: "E a sensibilidade?" },
      {
        tipo: "p",
        texto:
          "É comum sentir os dentes mais sensíveis ao frio durante o tratamento. Ela é passageira e some quando o clareamento termina. O dentista pode ajustar o tempo de uso do gel ou indicar um produto para aliviar.",
      },
      { tipo: "h2", texto: "Quando o clareamento não é indicado" },
      {
        tipo: "lista",
        itens: [
          "Com cáries ou gengiva inflamada: primeiro se trata o problema.",
          "Na gravidez e na amamentação.",
          "Em dentes com restaurações ou coroas na frente: elas não clareiam e ficariam com cor diferente.",
        ],
      },
      { tipo: "h2", texto: "Caseiro ou no consultório?" },
      {
        tipo: "p",
        texto:
          "Os dois funcionam. No caseiro, você usa o gel numa moldeira feita sob medida, com retornos para acompanhar. No consultório, o resultado aparece mais rápido. A escolha depende dos seus dentes e da sua rotina, e é feita na avaliação.",
      },
      {
        tipo: "p",
        texto:
          "Este texto é informativo e não substitui uma consulta. Cada caso é avaliado individualmente.",
      },
    ],
  },
  {
    slug: "primeira-consulta-da-crianca",
    titulo: "Quando levar a criança ao dentista pela primeira vez",
    resumo: "A primeira visita é mais cedo do que muita gente imagina, e pode ser tranquila.",
    data: "2026-09-15",
    autor: "Dra. Juliana Prates",
    leitura: "3 min de leitura",
    corpo: [
      {
        tipo: "p",
        texto:
          "A recomendação é levar quando nasce o primeiro dente, ou no máximo até 1 ano de idade. Não é porque o bebê já tem problemas: é para orientar os pais e criar o hábito, antes de qualquer dor.",
      },
      { tipo: "h2", texto: "O que acontece na primeira consulta" },
      {
        tipo: "lista",
        itens: [
          "Conversa com os pais sobre amamentação, mamadeira, chupeta e açúcar.",
          "Exame rápido da boca, muitas vezes com o bebê no colo.",
          "Orientação de como limpar os dentes em casa e quanto creme dental usar.",
        ],
      },
      { tipo: "h2", texto: "Como preparar a criança" },
      {
        tipo: "p",
        texto:
          "Fale da consulta com naturalidade e evite frases como “não vai doer”, que colocam a dor na cabeça da criança. Marque num horário em que ela costuma estar descansada, e não use o dentista como ameaça.",
      },
      {
        tipo: "p",
        texto:
          "Este texto é informativo e não substitui uma consulta. Cada caso é avaliado individualmente.",
      },
    ],
  },
];

// "6 de outubro de 2026". Em UTC para a data não mudar conforme o fuso do servidor.
const formatoData = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" });
export function formatarData(iso: string) {
  return formatoData.format(new Date(`${iso}T00:00:00Z`));
}
