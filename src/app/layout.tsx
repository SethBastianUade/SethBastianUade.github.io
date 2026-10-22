import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sebastián Arroyo | Backend Java y AI Engineering",
  description:
    "Sebastián Arroyo, desarrollador backend (Java, Spring Boot) en camino a AI Engineering. Sistemas de negocio en producción para banca, seguros y PyMEs, e investigación en evaluación de IA.",
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
