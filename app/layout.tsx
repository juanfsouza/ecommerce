import './globals.css';
import Navbar from '@/components/Navbar';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'E-commerce Challenge',
  description: 'Simulação de venda de produtos',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-100">
        <Navbar />
        <main className="min-h-screen p-8">
          {children}
        </main>
        <ToastContainer />
      </body>
    </html>
  );
}
