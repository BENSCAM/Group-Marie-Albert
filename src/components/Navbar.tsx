'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity min-w-0">
          <Image
            src="/logo.png"
            alt="Logo Groupe Scolaire Marie Albert"
            width={60}
            height={60}
            className="rounded-full w-10 h-10 md:w-[52px] md:h-[52px] shrink-0"
          />
          <div className="min-w-0">
            <p className="font-bold text-[#1a2878] text-sm md:text-base leading-tight truncate">Groupe Scolaire Marie Albert</p>
            <p className="text-[#6B21A8] text-[10px] md:text-[11px] font-semibold tracking-wide">G.S.M.A · M.A.G</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#1a2878] transition-colors font-medium">
            Accueil
          </Link>
          <Link href="/#etablissements" className="hover:text-[#1a2878] transition-colors font-medium">
            Nos Établissements
          </Link>
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-[#1a2878] transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#1a2878] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#1a2878] transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#1a2878] transition-colors font-medium py-1" onClick={() => setOpen(false)}>
            Accueil
          </Link>
          <Link href="/#etablissements" className="hover:text-[#1a2878] transition-colors font-medium py-1" onClick={() => setOpen(false)}>
            Nos Établissements
          </Link>
        </nav>
      )}
    </header>
  );
}
