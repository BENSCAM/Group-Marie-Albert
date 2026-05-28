import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="bg-[#1a2878] text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <Image
            src="/logo.png"
            alt="Logo Groupe Scolaire Marie Albert"
            width={52}
            height={52}
            className="rounded-full bg-white p-0.5"
          />
          <div>
            <p className="font-bold text-xs leading-tight text-[#c8a400] uppercase tracking-wide">
              Groupe Scolaire
            </p>
            <p className="font-bold text-base leading-tight">Marie Albert</p>
            <p className="text-[10px] text-blue-200 italic leading-tight">
              Innovation · Discipline · Excellence
            </p>
          </div>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-[#c8a400] transition-colors">
            Accueil
          </Link>
          <Link href="/#etablissements" className="hover:text-[#c8a400] transition-colors">
            Établissements
          </Link>
        </nav>
      </div>
    </header>
  );
}
