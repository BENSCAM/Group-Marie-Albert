'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  const navLinks = [
    { href: '/admin', label: 'Tableau de bord' },
    { href: '/admin/etablissements', label: 'Établissements' },
  ];

  return (
    <header className="bg-[#1a2878] text-white shadow-md border-b-2 border-[#c8a400]/40">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Logo GSMA"
              width={36}
              height={36}
              className="rounded-full bg-white p-0.5"
            />
            <div>
              <p className="text-xs text-[#c8a400] font-semibold leading-none">G.S.M.A</p>
              <p className="text-sm font-bold leading-tight">Administration</p>
            </div>
          </Link>
          <nav className="flex gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                  pathname === link.href
                    ? 'bg-[#c8a400]/20 text-[#e8c220] font-medium'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xs text-blue-200 hover:text-white transition-colors">
            Voir le site →
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs bg-white/10 hover:bg-red-500/30 border border-white/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
}
