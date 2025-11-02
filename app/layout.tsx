import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Projeto Next.js',
  description: 'Projeto criado com Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

