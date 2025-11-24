import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FormProvider } from '@/contexts/FormContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Form Builder - JotForm Clone',
  description: 'Create and customize forms with a powerful form builder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FormProvider>{children}</FormProvider>
      </body>
    </html>
  );
}

