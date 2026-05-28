import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Groupe Scolaire Marie Albert',
  description: "Informations sur les pensions et établissements du Groupe Scolaire Marie Albert",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
