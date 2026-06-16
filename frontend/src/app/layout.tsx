import { ReactNode } from 'react'
import { Providers } from './providers'
import { Orbitron, Exo_2 } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${exo2.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
