import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyC Asesores | Orden financiero y control para empresas en crecimiento",
  description:
    "Ayudamos a pymes a ordenar su estructura financiera, mejorar el control operativo e implementar herramientas adaptadas a su negocio.",
  keywords: [
    "consultoría financiera",
    "pymes Chile",
    "control financiero",
    "optimización de procesos",
    "asesoría empresas",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
