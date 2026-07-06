import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sebastian Arroyo | Backend Developer",
  description:
    "Sebastian Arroyo, Backend Developer. Construyo el backend de aplicaciones en Java: APIs REST, bases de datos SQL y logica de negocio.",
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
