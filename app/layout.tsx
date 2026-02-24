import type { Metadata, Viewport } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["400", "500", "700"] })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "AutoGestion ERP - Plataforma Modular",
  description: "Sistema ERP modular para concesionarias automotrices. Ordenes, inventario, finanzas y reportes.",
}

export const viewport: Viewport = {
  themeColor: "#1a2332",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans h-full antialiased`}>
        {children}
      </body>
    </html>
  )
}
