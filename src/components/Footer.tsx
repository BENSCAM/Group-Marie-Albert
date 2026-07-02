import Image from 'next/image';
import { getSiteConfig } from '@/lib/data';

export default function Footer() {
  const config = getSiteConfig();
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image src="/logo.png" alt="Logo GSMA" width={48} height={48} className="rounded-full" />
            <div>
              <p className="font-bold text-[#1a2878] text-sm leading-tight">{config.nom}</p>
              <p className="text-[#6B21A8] text-[10px] font-semibold tracking-wide">G.S.M.A · M.A.G</p>
            </div>
          </div>
          <p className="text-gray-400 text-xs italic">&ldquo;{config.slogan}&rdquo;</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#1a2878] text-sm mb-3">Contact</h3>
          <ul className="space-y-1.5 text-xs text-gray-500">
            {config.telephone && <li>📞 {config.telephone}</li>}
            {config.email && <li>✉️ {config.email}</li>}
            {config.adresse && <li>📍 {config.adresse}</li>}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-[#1a2878] text-sm mb-3">Accès rapide</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Scannez le QR code à l&apos;entrée de chaque établissement pour accéder directement aux informations de pension.
          </p>
        </div>
      </div>
      <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-300">
        © {new Date().getFullYear()} {config.nom}
      </div>
    </footer>
  );
}
