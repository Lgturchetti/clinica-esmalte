import type { Metadata, Viewport } from "next";
import { Hedvig_Letters_Serif, Onest } from "next/font/google";
import { BarraAgendar } from "@/components/barra-agendar";
import { Cabecalho } from "@/components/cabecalho";
import { Rodape } from "@/components/rodape";
import { clinica, horarios } from "@/data/clinica";
import "./globals.css";

const hedvig = Hedvig_Letters_Serif({ variable: "--font-hedvig", subsets: ["latin"] });
const onest = Onest({ variable: "--font-onest", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(clinica.url),
  title: {
    default: `${clinica.nome} — odontologia digital em Santa Maria`,
    template: `%s — ${clinica.nome}`,
  },
  description: clinica.descricao,
  openGraph: { siteName: clinica.nome, locale: "pt_BR", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

// Dados estruturados: clínica odontológica em Santa Maria
const dadosClinica = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinica.nome,
  description: clinica.descricao,
  url: clinica.url,
  telephone: clinica.telefone,
  email: clinica.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: clinica.endereco.rua,
    addressLocality: clinica.endereco.cidade,
    addressRegion: clinica.endereco.uf,
    postalCode: clinica.endereco.cep,
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: clinica.local.lat, longitude: clinica.local.lon },
  openingHoursSpecification: horarios.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.schema,
    opens: h.abre,
    closes: h.fecha,
  })),
  sameAs: [clinica.instagram],
};

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${hedvig.variable} ${onest.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <a
          href="#conteudo"
          className="sr-only z-50 rounded-botao bg-tinta px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>
        <Cabecalho />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Rodape />
        <BarraAgendar />
        {modal}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosClinica).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
