import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'

import './globals.css'

const _dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const _playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'AutoGestion ERP - Plataforma de Gestion para Concesionarias',
  description: 'Sistema ERP modular para concesionarias automotrices. Ordenes, inventario de vehiculos y refacciones, finanzas y reportes.',
}

export const viewport: Viewport = {
  themeColor: '#1a2332',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
