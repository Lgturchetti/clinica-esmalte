# Briefing — Clínica Esmalte (v2)

> Etapa 1 e 2 da linha de produção. Clínica FICTÍCIA, site de portfólio (pacote Institucional).
> A v1 está guardada em `~/projetos/clinica-demo` (tag `v1-esmalte`).

## O negócio
- **Nome:** Clínica Esmalte Odontologia, centro de Santa Maria/RS.
- **Diferencial: odontologia digital.** O que a tecnologia muda para o paciente:
  - **Escaneamento 3D** no lugar da moldagem com massa (sem ânsia, sem gosto ruim, 2 minutos).
  - **Planejamento digital do sorriso:** o paciente vê o resultado planejado na tela antes de começar.
  - **Implante guiado por computador:** cirurgia planejada em 3D a partir da tomografia, menos invasiva.
  - **Peças feitas na própria clínica** (fresadora/impressora 3D): coroa em uma sessão, sem provisório.
  - **Radiografia digital:** imagem na hora, com menos radiação.
- **Promessa em uma frase (rascunho):** tratamento que você vê antes de começar.

## Para quem
- Adultos de 25 a 55 anos de Santa Maria, que pesquisam no celular, valorizam tecnologia e estética
  e estão dispostos a pagar mais por conforto e previsibilidade.
- Quem tem medo de dentista: a tecnologia é o argumento (menos desconforto, menos sessões, sem surpresas).

## O que o site precisa fazer
1. Fazer a pessoa entender em segundos que a clínica é diferente (tecnologia, não "mais um dentista").
2. Mostrar a tecnologia **pelo benefício** (o que muda para o paciente), não pela ficha técnica.
3. Levar ao agendamento da avaliação pelo WhatsApp.

## Regras (CFO)
Sem preços, sem promessa de resultado, sem "antes e depois" de pacientes, sem depoimentos.
Nome e CRO do responsável técnico visíveis.

## Referências do Lorenzo
HBO Max, Disney+, Lovable — "sites com cara de premium".

**Correção do Lorenzo:** não é para copiar a cor (não precisa ser escuro). O que ele gosta nesses
sites é **como se usa**: a interface é fluida, premium e fácil de mexer. É isso que vamos trazer.

O que faz esses sites parecerem fluidos (e como vira site de clínica):
| Na referência | Por que parece premium | Na Clínica Esmalte |
|---|---|---|
| HBO Max / Disney+: fileiras de conteúdo que deslizam com o dedo ou o mouse, com encaixe | Navegar é brincar; muita coisa à mão sem sair da página | Tratamentos e tecnologias em fileiras deslizantes de cartões grandes com foto |
| HBO Max / Disney+: o cartão cresce e vira a página de detalhes (sem "piscar" a tela) | Continuidade: você vê de onde a informação veio | Tocar num tratamento abre os detalhes **saindo do próprio cartão**, por cima da página; o endereço muda (dá para compartilhar o link) e fechar volta exatamente onde estava |
| Todas: troca de página sem recarregar e sem salto | Parece aplicativo, não site | Transições suaves entre páginas (View Transitions) |
| Disney+ / HBO Max: cabeçalho transparente que ganha fundo ao rolar | A capa ocupa a tela inteira | Cabeçalho que se transforma ao rolar |
| Lovable: abas com indicador que desliza; conteúdo troca com um esmaecido curto | Responde na hora, sem esperar | "Como funciona a tecnologia": abas Escaneamento / Planejamento / Implante guiado / Coroa em 1 sessão |
| Lovable: a capa já é uma interação (a caixa de pergunta) | Convida a mexer antes de ler | Capa com algo para mexer: ex. comparar "moldagem com massa x escaneamento 3D", ou escolher o que quer resolver |
| Todas: tudo responde ao toque na hora, com movimento de "mola" | Sensação física, de qualidade | Molas (spring) em vez de animações de tempo fixo nos elementos que o usuário arrasta ou abre |

**Cor:** livre — decidir na etapa 4 com opções lado a lado (clara, escura ou mista).

## Identidade escolhida (etapa 4, 20/10/2026): **Galeria**
Quadro comparativo em `identidade/index.html?v=3`.
- Cores: fundo #ffffff · superfície #f5f5f4 · tinta #0a0a0a · texto suave #66666a · ação = preto #0a0a0a ·
  luz suave (gradiente) azul #c9d8ff + pêssego #ffe3d3 no canto da capa.
- Fontes: **Hedvig Letters Serif** (títulos) + **Onest** (texto).
- Forma: botões retos (4px), cartões 6px, fotos com canto quase reto (4px), sem sombra; linhas finas.
- Premium editorial, de revista: depende de fotos boas (no cliente real, sessão de fotos vale a pena).

## Capa e estrutura escolhidas (etapa 5, 20/10/2026)
Protótipos em `prototipos/capa.html` (Comparar, Pergunta, Cinema, Luz).
- **Capa: Cinema** — foto do consultório de ponta a ponta, título grande, fileira "O que você quer resolver?" já aparecendo sobre a borda de baixo.
- **Seção de tecnologia: Comparar dentro das abas** — cada aba (Escaneamento 3D, Planejamento digital, Implante guiado, Coroa em 1 sessão) é uma comparação arrastável "como era / como é aqui". É o ponto alto do meio da página.
- **Sem a luz que segue o mouse** (Lorenzo descartou).
- Detalhe do tratamento abre saindo do cartão (como no protótipo).
