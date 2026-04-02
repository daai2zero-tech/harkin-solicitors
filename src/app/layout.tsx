import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Harkin & Associates | Solicitors — Derry',
  description: 'Trusted legal advice for individuals and businesses across Derry and the North West. Expert solicitors in property, family, employment, and commercial law.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
