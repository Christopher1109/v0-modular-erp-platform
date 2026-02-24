"use client"

// Este archivo modifica el layout global de la aplicación para que refleje
// un producto ERP genérico en lugar de una concesionaria automotriz.  Se
// ajustan el título y la descripción del metadata a una demo modular.

import { DM_Sans, Playfair_Display } from "next/font/google"
import "@/styles/globals.css"

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata = {
  title: "Plataforma ERP Modular Demo",
  description: "Una plataforma demostrativa para explorar diferentes módulos ERP.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className={`${dmSans.className} ${playfair.className} h-full bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  )
}
