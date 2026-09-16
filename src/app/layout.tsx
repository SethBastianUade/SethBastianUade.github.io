import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sebastián Arroyo | Agentes de IA y Backend Java",
  description:
    "Sebastián Arroyo, implementador de agentes de IA y Analista Programador Java. Llevé un agente de IA sobre WhatsApp Business API a producción y desarrollo a medida para banca y PyMEs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.className}`}>
      <body>{children}</body>
    </html>
  );
}
