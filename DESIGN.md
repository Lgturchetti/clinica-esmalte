# DESIGN.md — Clínica Esmalte v2

Identidade visual e regras de interface. Ler antes de mexer em qualquer tela.
Origem das decisões: `BRIEFING.md` (etapas 1, 2, 4 e 5) e `ORGANIZACAO.md` (etapa 3).
Os tokens daqui são os mesmos de `src/app/globals.css`.

## Ideia
Odontologia digital apresentada como produto premium: editorial, branco, preto, muito espaço.
A interação é a parte "premium": fluida como um app de streaming (HBO Max, Disney+) e direta
como o Lovable. Nada de cara de modelo pronto: sem cartões repetidos com ícone, sem pílulas
coloridas, sem gradientes de enfeite.

## Cores (identidade "Galeria")
| Token | Hex | Uso |
|---|---|---|
| `fundo` | #ffffff | Fundo da página |
| `superficie` | #f5f5f4 | Cartões, fundo das fotos enquanto carregam |
| `tinta` | #0a0a0a | Texto, títulos e **a cor de ação** (botões pretos) |
| `suave` | #66666a | Texto secundário (AA sobre branco) |
| `linha` | rgb(10 10 10 / 0.1) | Bordas e réguas |
| `luz-azul` / `luz-pessego` | #c9d8ff / #ffe3d3 | Só no lado "como é aqui" das comparações (a luz da tecnologia) |

Sem outra cor de destaque. A cor vem das fotos.

## Tipografia
- **Hedvig Letters Serif** (títulos, 400): serifa editorial. Títulos grandes, entrelinha 0.95–1.05,
  espaçamento −0.025em a −0.04em nos maiores.
- **Onest** (texto, 400/500/600): corpo 17px, rótulos e botões 15px/600.
- Sem caixa-alta em rótulos. Sem palavra destacada em outra cor dentro do título.

## Forma
- Raio: **4px** em botões e fotos, **6px** em cartões, **12px** só no topo do painel que sobe no celular.
- Sem sombras, exceto em elementos que flutuam (detalhe aberto, painel do celular).
- Botões: preto cheio (principal) e branco com borda fina (secundário). Altura mínima 48px (40px no cabeçalho).

## Layout
- Largura máxima 1240px; margem lateral 16px no celular (respeita o notch).
- Capa "Cinema": foto do consultório de ponta a ponta (passa por baixo do cabeçalho), véu branco à
  esquerda e embaixo para o texto, título grande, um botão. A fileira "O que você quer resolver?"
  sobe por cima da borda de baixo da capa.
- Página inicial em 5 passos (ver ORGANIZACAO.md); seções separadas por espaço, não por cor.

## Interações (o coração do site)
| Interação | Regra |
|---|---|
| Fileira deslizante | Rolagem nativa + `scroll-snap`; próximo cartão aparece pela metade; setas só com mouse; teclado navega |
| Cartão → detalhe | O detalhe cresce a partir do retângulo do cartão (FLIP), 320ms curva de gaveta; fechar é mais rápido (180ms). Endereço muda; Esc/voltar fecham; foco preso e devolvido |
| Comparar (tecnologia) | Divisória arrastável (`clip-path`, só GPU); teclado move de 5 em 5%; uma "respirada" de dica na primeira vez que aparece |
| Abas | Indicador desliza (260ms ease-out); setas do teclado trocam; conteúdo troca com esmaecido + desfoque curto (220ms) |
| Cabeçalho | Transparente sobre a capa, ganha fundo e régua ao rolar |
| Celular | Barra "Agendar avaliação" fixa embaixo depois da capa; menu como painel que sobe de baixo |
| Toque | Tudo que aperta responde no `:active` (scale 0.97–0.98, 140ms) |

Curvas: `--ease-out` cubic-bezier(0.23, 1, 0.32, 1) · `--ease-in-out` (0.77, 0, 0.175, 1) ·
`--ease-gaveta` (0.32, 0.72, 0, 1). UI abaixo de 300ms. `prefers-reduced-motion`: só esmaecer.

## Conteúdo
- Regras do CFO: sem preços, sem promessa de resultado, sem antes/depois de pacientes, sem
  depoimentos. Nome e CRO do responsável técnico visíveis.
- Tecnologia sempre pelo **benefício** ("sem massa na boca"), nunca pela ficha técnica.
- Voz: frases curtas, falando com o paciente ("você"). Botões dizem o que acontece.
