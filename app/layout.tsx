import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { FolderKanban, MapPin } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Project Management System',
  description: 'Manage construction projects and sites',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg flex items-center gap-2">
              <FolderKanban className="w-5 h-5" />
              Project Manager
            </Link>
            <div className="flex gap-6">
              <Link
                href="/projects"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/sites"
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
              >
                <MapPin className="w-4 h-4" />
                Sites
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
