import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { Inter, Poppins } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  subsets: ['latin'],
  weight: '100'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <Header />
          {children}
      </body>
    </html>
  )
}