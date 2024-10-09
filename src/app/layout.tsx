import type { Metadata } from "next";

import "./globals.css";
import { inter } from "@/config";



export const metadata: Metadata = {
  title: "Halloween",
  description: "Crea tu disfraz para halloween",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
