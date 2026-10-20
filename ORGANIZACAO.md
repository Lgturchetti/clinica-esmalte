# Organização — Clínica Esmalte (v2)

> Etapa 3 da linha de produção: páginas, ordem das seções e interações. Sem cor e sem visual ainda.
> Base: `BRIEFING.md`. Regra herdada da v1: a página inicial **conta uma história**, não é um
> sumário do site (nada de seção-prévia com "ver todos").

## Páginas (pacote Institucional: até 5 + blog)
| Página | Endereço | Papel |
|---|---|---|
| Início | `/` | Convencer em segundos e levar ao agendamento |
| Tratamentos | `/tratamentos` | Explorar tudo o que a clínica faz, sem sair da página |
| Detalhe do tratamento | `/tratamentos/[nome]` | Abre **por cima** da lista, saindo do cartão; acessado direto (Google, link compartilhado) vira página inteira |
| A clínica | `/clinica` | Equipe, história e o espaço/equipamentos |
| Contato | `/contato` | Agendar, onde fica, horários, convênios e dúvidas — tudo o que é prático |
| Blog | `/blog` e `/blog/[texto]` | 2 textos (SEO); fica no menu e no rodapé, não na página inicial |

Saiu da v1: página "Convênios e dúvidas" (virou parte do Contato) e página "Sobre" separada da equipe.

## Página inicial — a história em 5 passos
1. **Capa interativa** — promessa ("Tratamento que você vê antes de começar") + botão de agendar
   visível sem precisar mexer + algo para mexer (definido no `/prototype`, etapa 5).
2. **"O que você quer resolver?"** — fileira deslizante de cartões grandes, cada um com problema e
   tratamento ("Dente perdido · Implante", "Sorriso mais branco · Clareamento", "Dor agora · Urgência",
   "Dentes tortos · Alinhadores", "Revisão · Limpeza e prevenção", "Para meu filho · Odontopediatria").
   Tocar abre o detalhe do tratamento por cima. É a navegação principal: o conteúdo é o menu.
   No celular, o próximo cartão aparece pela metade na borda (convite para arrastar).
3. **"O que a tecnologia muda para você"** — abas com indicador deslizante: Escaneamento 3D ·
   Planejamento digital · Implante guiado · Coroa em 1 sessão. Cada aba: benefício em 1 frase,
   "como era / como é aqui", imagem.
4. **Quem atende** — os dentistas com foto, área, CRO e 1 frase de apresentação, direto na página.
5. **Antes de vir** — a primeira consulta em 3 linhas (conversa, escaneamento, plano na tela),
   endereço, horário, convênios e o botão final de agendar.

## Página Tratamentos
- Fileiras por categoria, como no streaming: Agora (urgência) · Prevenção · Estética · Repor dentes ·
  Alinhar · Crianças. **Os cartões são os mesmos da página inicial** (problema · tratamento) e abrem o
  mesmo detalhe por cima (endereço muda; fechar volta ao mesmo lugar). Uma divisão só no site inteiro.
- Detalhe: o que é, para quem, como funciona (etapas), qual tecnologia usa, duração, botão de WhatsApp
  com a mensagem pronta.

## Página A clínica
- História curta. Equipe com a apresentação completa direto na página (sem janela por cima). O espaço e os equipamentos numa
  fileira deslizante de fotos. Responsável técnico e CRO.

## Página Contato
- Agendar: WhatsApp (principal) e formulário. Onde: mapa + Google Maps/Waze. Horários. Convênios e
  pagamento. Dúvidas frequentes (abrem e fecham).

## Interações em todo o site
| Interação | Onde | Observação |
|---|---|---|
| Cabeçalho que se transforma ao rolar | Todas | Transparente sobre a capa, ganha fundo depois |
| Transição suave entre páginas | Todas | View Transitions; sem salto (lição da v1: rolagem no topo) |
| Detalhe que sai do cartão (por cima) | **Só tratamentos** (início e página Tratamentos) | Rota interceptada do Next: link próprio; Esc e "voltar" fecham; foco preso dentro e devolvido ao cartão |
| Fileiras deslizantes com encaixe | Início, Tratamentos, A clínica | Rolagem nativa com scroll-snap; próximo cartão aparece pela metade; setas só no desktop; navegável pelo teclado |
| Abas com indicador deslizante | Início (tecnologia) | Teclado: setas trocam de aba |
| Menu do celular como painel que sobe de baixo, arrastável para fechar | Celular | Mola (spring) |
| Barra "Agendar" fixa embaixo no celular | Celular, depois da capa | No celular é o único "Agendar" fixo (sai do cabeçalho); some no rodapé e com o teclado aberto |

## Fica de fora (de propósito)
Preços, antes e depois, depoimentos (CFO). Carrossel automático na capa. Seção do blog na página inicial.

## Revisão (design-critique, 20/10/2026)
Aplicado: uma divisão só dos tratamentos (problema · tratamento) em todo o site; janela por cima só
para tratamentos; "Primeira consulta" foi para dentro de "Antes de vir" (início com 5 passos);
próximo cartão aparecendo na borda; um "Agendar" fixo por tela; regras de acessibilidade das janelas,
abas e fileiras; botão de agendar da capa visível sem interação.
