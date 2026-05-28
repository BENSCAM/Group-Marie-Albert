import Image from 'next/image';
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
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-[#1a2878] via-[#1e2f8a] to-[#111b5a] text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <a href="/" className="inline-flex items-center gap-1 text-blue-200 text-sm hover:text-white mb-5 transition-colors">
            ← Retour à l&apos;accueil
          </a>
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-[#c8a400]/50 flex items-center justify-center text-3xl shrink-0">
              {etab.logo ? (
                <img src={etab.logo} alt={etab.nom} className="w-full h-full object-cover rounded-full" />
              ) : (
                <span>{TYPE_ICONS[etab.type]}</span>
              )}
            </div>
            <div>
              <span className="text-xs bg-[#c8a400]/20 border border-[#c8a400]/40 text-[#e8c220] rounded-full px-3 py-0.5 mb-2 inline-block font-medium">
                {TYPE_LABELS[etab.type]}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold">{etab.nom}</h1>
              <p className="text-blue-200 text-sm mt-1 flex items-center gap-1">
                <span>📍</span> {etab.adresse}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gold separator line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#c8a400] to-transparent" />

      {/* Main content */}
      <main className="flex-1 py-10 px-4 bg-[#f8f9fc]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Pension info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl border border-[#dde1f0] p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#1a2878] mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#c8a400] rounded-full inline-block" />
                Présentation
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">{etab.description}</p>
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-[#dde1f0] text-sm">
                {etab.telephone && (
                  <a href={`tel:${etab.telephone}`} className="flex items-center gap-1.5 text-slate-600 hover:text-[#1a2878] transition-colors">
                    <span>📞</span> {etab.telephone}
                  </a>
                )}
                {etab.email && (
                  <a href={`mailto:${etab.email}`} className="flex items-center gap-1.5 text-slate-600 hover:text-[#1a2878] transition-colors">
                    <span>✉️</span> {etab.email}
                  </a>
                )}
              </div>
            </div>

            {/* Fees table */}
            <div className="bg-white rounded-xl border border-[#dde1f0] p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#1a2878] mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#c8a400] rounded-full inline-block" />
                Frais de scolarité — {etab.anneeScolaire}
              </h2>

              {pensionsObligatoires.length > 0 && (
                <>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Frais obligatoires
                  </p>
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-[#1a2878]/10 text-left">
                          <th className="py-2 pr-4 font-semibold text-[#1a2878]">Libellé</th>
                          <th className="py-2 text-right font-semibold text-[#1a2878]">Montant</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pensionsObligatoires.map((p) => (
                          <tr key={p.id} className="border-b border-[#dde1f0]/60 hover:bg-[#f0f2ff]">
                            <td className="py-2.5 pr-4">
                              <p className="font-medium text-slate-700">{p.label}</p>
                              {p.description && (
                                <p className="text-xs text-slate-400 mt-0.5">{p.description}</p>
                              )}
                            </td>
                            <td className="py-2.5 text-right font-semibold text-slate-800 whitespace-nowrap">
                              {p.montant.toLocaleString('fr-FR')}{' '}
                              <span className="text-[#c8a400] text-xs">{p.devise}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-[#1a2878] text-white">
                          <td className="py-3 px-3 rounded-bl-lg font-bold">Total obligatoire</td>
                          <td className="py-3 px-3 text-right font-bold rounded-br-lg whitespace-nowrap text-[#e8c220]">
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
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 mt-4">
                    Services optionnels
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody>
                        {pensionsOptionnelles.map((p) => (
                          <tr key={p.id} className="border-b border-[#dde1f0]/60 hover:bg-[#f0f2ff]">
                            <td className="py-2.5 pr-4">
                              <p className="font-medium text-slate-700">{p.label}</p>
                              {p.description && (
                                <p className="text-xs text-slate-400 mt-0.5">{p.description}</p>
                              )}
                            </td>
                            <td className="py-2.5 text-right font-semibold text-slate-800 whitespace-nowrap">
                              {p.montant.toLocaleString('fr-FR')}{' '}
                              <span className="text-[#c8a400] text-xs">{p.devise}</span>
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
              <div className="bg-white rounded-xl border border-[#dde1f0] p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#1a2878] mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#c8a400] rounded-full inline-block" />
                  Flyer de prospection
                </h2>
                <img src={etab.flyer} alt={`Flyer ${etab.nom}`} className="w-full rounded-lg border border-[#dde1f0]" />
              </div>
            )}
          </div>

          {/* Right: QR Code + Summary */}
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-[#dde1f0] p-6 text-center shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="w-6 h-px bg-[#c8a400]" />
                <h3 className="font-bold text-[#1a2878] text-sm uppercase tracking-wide">QR Code</h3>
                <span className="w-6 h-px bg-[#c8a400]" />
              </div>
              <p className="text-xs text-slate-500 mb-4">Partagez ce code pour un accès rapide</p>
              <QRCodeDisplay url={pageUrl} nom={etab.nom} size={180} />
            </div>

            <div className="bg-[#1a2878] text-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-px bg-[#c8a400]" />
                <h3 className="font-bold text-sm uppercase tracking-wide">Résumé</h3>
              </div>
              <p className="text-3xl font-bold text-[#e8c220]">
                {totalObligatoire.toLocaleString('fr-FR')}
              </p>
              <p className="text-sm text-blue-200">
                {etab.pensions[0]?.devise} / an · frais obligatoires
              </p>
              <div className="mt-3 pt-3 border-t border-white/20 text-sm text-blue-200">
                <p>Année scolaire :</p>
                <p className="text-white font-semibold">{etab.anneeScolaire}</p>
              </div>
            </div>

            {/* Logo GSMA on sidebar */}
            <div className="bg-white rounded-xl border border-[#dde1f0] p-4 flex items-center justify-center shadow-sm">
              <Image src="/logo.png" alt="Logo GSMA" width={90} height={90} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
