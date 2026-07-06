import type { Metadata } from 'next';
import { Inter, Fraunces, Space_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
});
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
});

export const metadata: Metadata = {
  title: 'Aroma Restaurant - Live-Fire Kitchen in Gauradaha, Jhapa',
  description:
    "Experience Aroma's live-fire kitchen in Gauradaha, Jhapa. Discover today's specials, loyalty rewards, and a dining experience that runs on smoke and char.",
  keywords: 'restaurant Gauradaha, restaurant Jhapa, dining Gauradaha, authentic food Nepal, Aroma restaurant',
  openGraph: {
    title: 'Aroma Restaurant - Live-Fire Kitchen in Gauradaha, Jhapa',
    description: 'Discover exceptional dining at Aroma Restaurant. Order today and earn loyalty points!',
    type: 'website',
    locale: 'en_NP',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${spaceMono.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0906" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex min-h-screen flex-col bg-[var(--bg)]">
        <Preloader />
        <CustomCursor />
        <div className="grain-overlay" />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
