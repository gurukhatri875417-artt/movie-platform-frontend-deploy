import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bollyflix Clone - Watch & Download Movies',
  description: 'High-speed movie streaming and downloading platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Popunder Ad Script */}
        <script 
          src="https://pl30515811.effectivecpmnetwork.com/e4/d5/cf/e4d5cfac6ae8b6d240c200932bf8c02f.js"
          async
        ></script>
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}