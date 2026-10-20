import type { Tecnologia } from "@/data/clinica";

// Ilustrações em linha fina do lado "como é aqui" das comparações (a tela do computador da clínica).
// Mesmo traço em todas: preto a 55% para contorno, 18% para a malha.
const contorno = { stroke: "#0a0a0a", strokeOpacity: 0.55, strokeWidth: 1.2, fill: "rgb(255 255 255 / 0.7)" };
const malha = { stroke: "#0a0a0a", strokeOpacity: 0.18, strokeWidth: 1 };

function Arco() {
  const n = 14;
  const dentes = Array.from({ length: n }, (_, i) => {
    const a = Math.PI + (Math.PI * (i + 0.5)) / n;
    const x = 300 + 230 * Math.cos(a);
    const y = 330 + 250 * Math.sin(a);
    const ang = (a * 180) / Math.PI + 90;
    const lateral = i < 3 || i > 10;
    const w = lateral ? 46 : 36;
    const h = lateral ? 44 : 50;
    return (
      <g key={i} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(1)})`}>
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={14} {...contorno} />
        <path d={`M${-w / 2 + 6} 0H${w / 2 - 6}M0 ${-h / 2 + 6}V${h / 2 - 6}`} {...malha} />
      </g>
    );
  });
  return (
    <>
      <path d="M70 330A230 250 0 0 1 530 330" stroke="#0a0a0a" strokeOpacity={0.12} strokeDasharray="3 5" fill="none" />
      {dentes}
    </>
  );
}

function Sorriso() {
  // Linha do sorriso com os dentes da frente e a grade de proporções do planejamento
  const dentes = [-150, -100, -52, 0, 52, 100, 150];
  return (
    <>
      {[-180, -90, 0, 90, 180].map((x) => (
        <path key={x} d={`M${300 + x} 60V300`} {...malha} strokeDasharray="4 6" />
      ))}
      <path d="M110 150H490" {...malha} />
      {dentes.map((x, i) => {
        const w = i === 3 ? 50 : i === 2 || i === 4 ? 44 : i === 1 || i === 5 ? 40 : 36;
        const h = i === 3 ? 100 : i === 2 || i === 4 ? 92 : i === 1 || i === 5 ? 84 : 74;
        const y = 150 + Math.abs(x) * 0.12;
        return <rect key={x} x={300 + x - w / 2} y={y} width={w} height={h} rx={16} {...contorno} />;
      })}
      <path d="M120 170Q300 290 480 170" fill="none" stroke="#0a0a0a" strokeOpacity={0.55} strokeWidth={1.2} />
    </>
  );
}

function Guia() {
  // Corte do osso com o implante planejado e o guia por cima
  return (
    <>
      <path d="M120 170Q300 140 480 170V320H120Z" fill="rgb(255 255 255 / 0.5)" stroke="#0a0a0a" strokeOpacity={0.3} />
      {[150, 190, 230, 270, 310, 350, 390, 430].map((x) => (
        <path key={x} d={`M${x} 175V320`} {...malha} />
      ))}
      <rect x={140} y={100} width={320} height={46} rx={10} {...contorno} />
      <rect x={284} y={92} width={32} height={62} rx={6} fill="#fff" stroke="#0a0a0a" strokeOpacity={0.55} />
      <path d="M300 154V300" stroke="#0a0a0a" strokeOpacity={0.35} strokeDasharray="4 5" />
      <path d="M290 190h20l-3 100h-14z" {...contorno} />
      {[205, 225, 245, 265].map((y) => (
        <path key={y} d={`M290 ${y}h20`} {...malha} strokeOpacity={0.4} />
      ))}
    </>
  );
}

function Coroa() {
  // Coroa desenhada em malha, ainda sendo "fresada" (linhas de corte)
  return (
    <>
      <path d="M200 120Q210 70 260 80Q300 60 340 80Q390 70 400 120Q420 200 380 260Q350 300 300 300Q250 300 220 260Q180 200 200 120Z" {...contorno} />
      {[100, 140, 180, 220, 260].map((y) => (
        <path key={y} d={`M195 ${y}Q300 ${y + 20} 405 ${y}`} fill="none" {...malha} />
      ))}
      {[240, 270, 300, 330, 360].map((x) => (
        <path key={x} d={`M${x} 75Q${x + (x - 300) * 0.2} 190 ${x} 300`} fill="none" {...malha} />
      ))}
      <path d="M440 60V140" stroke="#0a0a0a" strokeOpacity={0.4} />
      <rect x={430} y={40} width={20} height={24} rx={4} fill="#fff" stroke="#0a0a0a" strokeOpacity={0.55} />
    </>
  );
}

export function Ilustracao({ desenho, legenda }: { desenho: Tecnologia["desenho"]; legenda: string }) {
  return (
    <svg viewBox="0 0 600 360" className="h-auto w-[min(82%,620px)]" role="img" aria-label={legenda}>
      {desenho === "arco" && <Arco />}
      {desenho === "sorriso" && <Sorriso />}
      {desenho === "guia" && <Guia />}
      {desenho === "coroa" && <Coroa />}
    </svg>
  );
}
