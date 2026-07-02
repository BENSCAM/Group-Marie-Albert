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
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Logo GSMA" width={38} height={38} className="rounded-full" />
            <div>
              <p className="text-[#6B21A8] text-[10px] font-bold uppercase tracking-wide leading-none">Admin</p>
              <p className="text-[#1a2878] text-sm font-bold leading-tight">Marie Albert Group</p>
            </div>
          </Link>
          <nav className="flex gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-[#1a2878] text-white'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-[#1a2878]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xs text-gray-400 hover:text-[#6B21A8] transition-colors">
            ← Site
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs bg-gray-100 hover:bg-red-50 hover:text-red-600 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors font-medium"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
}
