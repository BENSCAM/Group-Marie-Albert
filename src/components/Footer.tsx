import Image from 'next/image';
import { getSiteConfig } from '@/lib/data';

export default function Footer() {
  const config = getSiteConfig();
  return (
    <footer className="bg-[#111b5a] text-slate-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image
              src="/logo.png"
              alt="Logo GSMA"
              width={48}
              height={48}
              className="rounded-full bg-white p-0.5"
            />
            <div>
              <p className="font-bold text-white text-sm leading-tight">{config.nom}</p>
              <p className="text-[#c8a400] text-xs italic">Innovation · Discipline · Excellence</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 italic">&ldquo;{config.slogan}&rdquo;</p>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-3 border-b border-[#c8a400]/30 pb-1">Contact</h3>
          <ul className="space-y-1.5 text-sm">
            {config.telephone && (
              <li className="flex items-center gap-2">
                <span className="text-[#c8a400]">📞</span> {config.telephone}
              </li>
            )}
            {config.email && (
              <li className="flex items-center gap-2">
                <span className="text-[#c8a400]">✉️</span> {config.email}
              </li>
            )}
            {config.adresse && (
              <li className="flex items-center gap-2">
                <span className="text-[#c8a400]">📍</span> {config.adresse}
              </li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-3 border-b border-[#c8a400]/30 pb-1">
            Accès rapide
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Scannez le QR code à l&apos;entrée de chaque établissement pour accéder directement aux informations de pension et aux flyers.
          </p>
        </div>
      </div>
      <div className="border-t border-[#c8a400]/20 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {config.nom} — G.S.M.A · M.A.G
      </div>
    </footer>
  );
}
