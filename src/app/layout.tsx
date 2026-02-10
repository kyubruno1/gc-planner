import './globals.css'
import PublicHeader from '@/components/PublicHeader'
import React from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <PublicHeader />
        {children}
      </body>
    </html>
  )
}
