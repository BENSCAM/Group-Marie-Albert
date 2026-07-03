import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEtablissement, getSiteConfig } from '@/lib/data';
import { TYPE_LABELS } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const etab = getEtablissement(slug);
  if (!etab) return { title: 'Établissement introuvable' };
  return {
    title: `${etab.nom} – Groupe Scolaire Marie Albert`,
    description: etab.description,
  };
}

const TYPE_ICONS: Record<string, string> = {
  primaire:   '🏫',
  college:    '📚',
  lycee:      '🎓',
  universite: '🏛️',
  autre:      '🏢',
};

export default async function EtablissementPage({ params }: Props) {
  const { slug } = await params;
  const etab = getEtablissement(slug);
  if (!etab) notFound();

  const config = getSiteConfig();
  const pageUrl = `${config.siteUrl}/etablissements/${etab.slug}`;

  const pensionsObligatoires = etab.pensions.filter((p) => p.obligatoire);
  const pensionsOptionnelles = etab.pensions.filter((p) => !p.obligatoire);
  const totalObligatoire = pensionsObligatoires.reduce((s, p) => s + p.montant, 0);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Page header */}
      <section className="bg-white border-b border-gray-200 py-5 md:py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1 text-[#6B21A8] text-xs hover:underline mb-3 md:mb-4 transition-colors">
            ← Retour
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            {etab.photo ? (
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-gray-200 shrink-0">
                <img src={etab.photo} alt={etab.nom} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-11 h-11 md:w-12 md:h-12 bg-[#1a2878]/8 rounded-full flex items-center justify-center text-xl md:text-2xl shrink-0">
                {TYPE_ICONS[etab.type]}
              </div>
            )}
            <div className="min-w-0">
              <span className="text-[10px] bg-[#6B21A8]/10 text-[#6B21A8] rounded-full px-2.5 py-0.5 font-semibold uppercase tracking-wide">
                {TYPE_LABELS[etab.type]}
              </span>
              <h1 className="text-lg md:text-2xl font-bold text-[#1a2878] mt-1 leading-tight">{etab.nom}</h1>
              <p className="text-gray-400 text-xs mt-0.5 truncate">📍 {etab.adresse}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1 py-6 md:py-8 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-5 md:gap-6">

          {/* Right — en premier dans le HTML = en premier sur mobile */}
          <div className="space-y-4 lg:col-start-3 lg:row-start-1 lg:sticky lg:top-20 lg:self-start">

            {/* Summary — prix en tête sur mobile */}
            <div className="bg-[#1a2878] text-white rounded-xl p-4 md:p-5">
              <p className="text-[10px] uppercase tracking-widest text-blue-200 mb-1.5">Total obligatoire</p>
              <p className="text-3xl md:text-3xl font-bold text-[#C8A400]">
                {totalObligatoire.toLocaleString('fr-FR')}
              </p>
              <p className="text-xs text-blue-200 mt-0.5">{etab.pensions[0]?.devise} / an</p>
              <div className="mt-3 pt-3 border-t border-white/15 text-xs text-blue-200">
                Année scolaire : <span className="text-white font-semibold">{etab.anneeScolaire}</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 text-center">
              <h3 className="text-xs font-bold text-[#1a2878] uppercase tracking-wide mb-1">QR Code</h3>
              <p className="text-[10px] text-gray-400 mb-3 md:mb-4">Affichez à l&apos;entrée de l&apos;établissement</p>
              <QRCodeDisplay url={pageUrl} nom={etab.nom} size={160} />
            </div>

            {/* Logo */}
            <div className="hidden lg:flex bg-white rounded-xl border border-gray-200 p-4 justify-center">
              <Image src="/logo.png" alt="Logo GSMA" width={80} height={80} />
            </div>
          </div>

          {/* Left — description, frais, flyer */}
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 space-y-4 md:space-y-5">

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5">
              <h2 className="text-sm font-bold text-[#1a2878] mb-3 flex items-center gap-2">
                <span className="w-0.5 h-4 bg-[#6B21A8] rounded-full" />
                Présentation
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">{etab.description}</p>
              <div className="flex flex-wrap gap-3 md:gap-4 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                {etab.telephone && (
                  <a href={`tel:${etab.telephone}`} className="flex items-center gap-1 hover:text-[#6B21A8] transition-colors">
                    📞 {etab.telephone}
                  </a>
                )}
                {etab.email && (
                  <a href={`mailto:${etab.email}`} className="flex items-center gap-1 hover:text-[#6B21A8] transition-colors">
                    ✉️ {etab.email}
                  </a>
                )}
              </div>
            </div>

            {/* Fees */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5">
              <h2 className="text-sm font-bold text-[#1a2878] mb-4 flex items-center gap-2">
                <span className="w-0.5 h-4 bg-[#6B21A8] rounded-full" />
                Frais de scolarité — {etab.anneeScolaire}
              </h2>

              {pensionsObligatoires.length > 0 && (
                <>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">
                    Frais obligatoires
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm mb-4 min-w-[280px]">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="pb-2 pr-4 text-left text-xs font-semibold text-gray-500">Libellé</th>
                          <th className="pb-2 text-right text-xs font-semibold text-gray-500">Montant</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pensionsObligatoires.map((p) => (
                          <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="py-2.5 pr-4">
                              <p className="font-medium text-gray-700 text-xs">{p.label}</p>
                              {p.description && <p className="text-[10px] text-gray-400 mt-0.5">{p.description}</p>}
                            </td>
                            <td className="py-2.5 text-right font-semibold text-[#1a2878] text-xs whitespace-nowrap">
                              {p.montant.toLocaleString('fr-FR')}
                              <span className="text-[#C8A400] ml-1">{p.devise}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-[#1a2878] text-white">
                          <td className="py-2.5 px-3 rounded-bl-lg text-xs font-bold">Total obligatoire</td>
                          <td className="py-2.5 px-3 text-right text-xs font-bold rounded-br-lg whitespace-nowrap text-[#C8A400]">
                            {totalObligatoire.toLocaleString('fr-FR')} {etab.pensions[0]?.devise}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </>
              )}

              {pensionsOptionnelles.length > 0 && (
                <>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 mt-3">
                    Services optionnels
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[280px]">
                      <tbody>
                        {pensionsOptionnelles.map((p) => (
                          <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="py-2.5 pr-4">
                              <p className="font-medium text-gray-700 text-xs">{p.label}</p>
                              {p.description && <p className="text-[10px] text-gray-400 mt-0.5">{p.description}</p>}
                            </td>
                            <td className="py-2.5 text-right font-semibold text-[#1a2878] text-xs whitespace-nowrap">
                              {p.montant.toLocaleString('fr-FR')}
                              <span className="text-[#C8A400] ml-1">{p.devise}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>

            {/* Flyer */}
            {etab.flyer && (
              <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5">
                <h2 className="text-sm font-bold text-[#1a2878] mb-3 flex items-center gap-2">
                  <span className="w-0.5 h-4 bg-[#6B21A8] rounded-full" />
                  Flyer de prospection
                </h2>
                <img src={etab.flyer} alt={`Flyer ${etab.nom}`} className="w-full rounded-lg border border-gray-100" />
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
