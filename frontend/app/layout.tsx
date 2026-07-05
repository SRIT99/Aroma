import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const merriweather = Merriweather({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Aroma Restaurant - Best Restaurant in Gauradaha, Jhapa',
  description: 'Experience authentic cuisine at Aroma Restaurant in Gauradaha, Jhapa. Discover today\'s specials, loyalty rewards, and exceptional dining.',
  keywords: 'restaurant Gauradaha, restaurant Jhapa, dining Gauradaha, authentic food Nepal, Aroma restaurant',
  openGraph: {
    title: 'Aroma Restaurant - Best Restaurant in Gauradaha, Jhapa',
    description: 'Discover exceptional dining at Aroma Restaurant. Order today and earn loyalty points!',
    type: 'website',
    locale: 'en_NP',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#d97706" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
