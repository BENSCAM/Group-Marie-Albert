import Image from 'next/image';
import { getEtablissements, getSiteConfig } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EtablissementCard from '@/components/EtablissementCard';

export default function HomePage() {
  const config = getSiteConfig();
  const etablissements = getEtablissements().filter((e) => e.actif);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a2878] via-[#1e2f8a] to-[#111b5a] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-2 shadow-2xl shadow-[#c8a400]/30 ring-4 ring-[#c8a400]/40">
              <Image
                src="/logo.png"
                alt="Logo Groupe Scolaire Marie Albert"
                width={120}
                height={120}
                className="rounded-full"
                priority
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2 text-balance">
            {config.nom}
          </h1>
          <p className="text-[#c8a400] text-base md:text-lg font-medium tracking-widest uppercase mb-3">
            G.S.M.A &nbsp;·&nbsp; M.A.G
          </p>
          <p className="text-blue-200 italic mb-6">
            &ldquo;{config.slogan}&rdquo;
          </p>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base">
            {config.description}
          </p>
          <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 text-sm">
            <span>📱</span>
            <span>Scannez le QR code de votre établissement pour accéder aux informations de pension</span>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#111b5a] text-white py-4 px-4 border-b-2 border-[#c8a400]/40">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-10">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#c8a400]">{etablissements.length}</p>
            <p className="text-xs text-blue-200 uppercase tracking-wide">Établissements</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#c8a400]">4</p>
            <p className="text-xs text-blue-200 uppercase tracking-wide">Niveaux d&apos;enseignement</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#c8a400]">2024-2025</p>
            <p className="text-xs text-blue-200 uppercase tracking-wide">Année scolaire</p>
          </div>
        </div>
      </section>

      {/* Establishments Grid */}
      <section id="etablissements" className="py-16 px-4 bg-[#f8f9fc]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[#c8a400] text-xs uppercase tracking-widest font-semibold mb-2">
              <span className="w-8 h-px bg-[#c8a400]" />
              Nos établissements
              <span className="w-8 h-px bg-[#c8a400]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2878]">
              Informations de pension
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Cliquez sur un établissement pour voir les détails et les tarifs complets
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {etablissements.map((etab) => (
              <EtablissementCard key={etab.id} etab={etab} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-[#dde1f0] py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[#c8a400] text-xs uppercase tracking-widest font-semibold mb-2">
              <span className="w-8 h-px bg-[#c8a400]" />
              Comment ça fonctionne
              <span className="w-8 h-px bg-[#c8a400]" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1a2878]">
              Fini les flyers imprimés
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: '📱', title: 'Scannez', desc: "Scannez le QR code affiché à l'entrée de chaque établissement" },
              { icon: '💰', title: 'Consultez', desc: 'Accédez à tous les tarifs de pension et frais de scolarité à jour' },
              { icon: '📋', title: 'Comparez', desc: 'Comparez les établissements et choisissez celui qui convient' },
            ].map((step) => (
              <div key={step.title} className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-[#1a2878]/10 border-2 border-[#1a2878]/20 rounded-full flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
                <h3 className="font-bold text-[#1a2878]">{step.title}</h3>
                <p className="text-sm text-slate-500 max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
