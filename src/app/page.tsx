import Image from 'next/image';
import { getEtablissements, getSiteConfig } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EtablissementCard from '@/components/EtablissementCard';

export default function HomePage() {
  const config = getSiteConfig();
  const etablissements = getEtablissements().filter((e) => e.actif);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Hero — photo de l'établissement en background */}
      <section
        className="relative py-20 px-4 border-b border-gray-100 overflow-hidden"
        style={{ backgroundImage: "url('/hero-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Overlay bleu foncé — photo visible, textes lisibles */}
        <div className="absolute inset-0 bg-[#1a2878]/65" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-1.5 shadow-xl">
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 text-balance drop-shadow">
            {config.nom}
          </h1>
          <p className="text-[#C8A400] text-sm font-semibold tracking-widest uppercase mb-4">
            Innovation · Discipline · Excellence
          </p>
          <p className="text-blue-100 max-w-xl mx-auto text-sm leading-relaxed mb-8">
            {config.description}
          </p>
          <a
            href="#etablissements"
            className="inline-flex items-center gap-2 bg-[#6B21A8] hover:bg-[#4C1678] text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm shadow-lg"
          >
            Voir les établissements
          </a>
        </div>
      </section>

      {/* Stats — fond très léger */}
      <section className="bg-gray-50 border-b border-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-4xl font-bold text-[#1a2878]">
              {etablissements.length}
              <span className="text-[#6B21A8] text-2xl">+</span>
            </p>
            <p className="text-gray-400 text-xs mt-1 uppercase tracking-wide">Établissements</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#1a2878]">20</p>
            <p className="text-gray-400 text-xs mt-1 uppercase tracking-wide">Programmes</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#1a2878]">
              80<span className="text-[#6B21A8] text-2xl">+</span>
            </p>
            <p className="text-gray-400 text-xs mt-1 uppercase tracking-wide">Enseignants</p>
          </div>
        </div>
      </section>

      {/* Establishments Grid */}
      <section id="etablissements" className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#1a2878] mb-2">Nos Établissements</h2>
            <div className="w-12 h-0.5 bg-[#6B21A8] mx-auto" />
            <p className="text-gray-400 text-sm mt-3">
              Cliquez sur un établissement pour voir les frais et le QR code
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {etablissements.map((etab) => (
              <EtablissementCard key={etab.id} etab={etab} />
            ))}
          </div>
        </div>
      </section>

      {/* QR info — fond gris très léger */}
      <section className="bg-gray-50 border-t border-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: '📱', title: 'Scannez', desc: "Scannez le QR code à l'entrée de l'établissement" },
            { icon: '💰', title: 'Consultez', desc: 'Accédez aux tarifs de pension à jour' },
            { icon: '📋', title: 'Comparez', desc: "Choisissez l'établissement adapté" },
          ].map((step, i) => (
            <div key={step.title} className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center text-2xl shadow-sm relative">
                {step.icon}
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#6B21A8] text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-semibold text-[#1a2878] text-sm">{step.title}</h3>
              <p className="text-xs text-gray-400 max-w-[180px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
