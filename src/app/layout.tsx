import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_URL } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Formalia — Tu aliado para crecer · Contabilidad y formalización para emprendedores peruanos",
    template: "%s · Formalia",
  },
  description:
    "Herramienta educativa gratuita: regímenes tributarios, formalización de empresas, calculadoras contables y glosario para emprendedores peruanos. UIT 2026: S/ 5,500.",
  keywords: [
    "contabilidad peru 2026",
    "formalizar empresa peru",
    "regimen tributario sunat",
    "calculadora igv",
    "UIT 2026",
    "MYPE tributario",
    "cronograma sunat 2026",
    "facturacion electronica peru",
    "formalia",
  ],
  authors: [{ name: "Formalia" }],
  creator: "Formalia",
  publisher: "Formalia",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    locale: "es_PE",
    type: "website",
    siteName: "Formalia",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Formalia — Tu aliado para crecer · Herramientas para emprendedores peruanos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@formaliaapp",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main id="contenido-principal" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
