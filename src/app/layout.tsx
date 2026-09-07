import type { Metadata } from 'next'
import { Fraunces, Montserrat, Caveat } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
})

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Iris Amanda — Estudante de Psicologia | UNAMA',
  description:
    'Portfólio de Iris Amanda, estudante do 6º semestre de Psicologia na UNAMA. Conheça sua trajetória, vivências práticas em clínica infantil e Recursos Humanos, e projetos acadêmicos.',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${montserrat.variable} ${caveat.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased text-[#291F1A] bg-[#F3E6D3] selection:bg-[#E8A76F] selection:text-[#291F1A]">
        {children}
      </body>
    </html>
  )
}

