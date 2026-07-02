import Link from 'next/link';
import { Etablissement, TYPE_LABELS } from '@/types';

const TYPE_COLORS: Record<string, string> = {
  primaire:   'bg-blue-50 text-blue-700',
  college:    'bg-violet-50 text-violet-700',
  lycee:      'bg-indigo-50 text-indigo-700',
  universite: 'bg-purple-50 text-purple-700',
  autre:      'bg-gray-50 text-gray-600',
};

const TYPE_ICONS: Record<string, string> = {
  primaire:   '🏫',
  college:    '📚',
  lycee:      '🎓',
  universite: '🏛️',
  autre:      '🏢',
};

export default function EtablissementCard({ etab }: { etab: Etablissement }) {
  const totalObligatoire = etab.pensions
    .filter((p) => p.obligatoire)
    .reduce((sum, p) => sum + p.montant, 0);

  return (
    <Link href={`/etablissements/${etab.slug}`} className="group block">
      <div className="bg-white rounded-xl border border-gray-200 hover:border-[#6B21A8]/40 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden h-full">

        {etab.flyer ? (
          <div className="h-40 overflow-hidden">
            <img src={etab.flyer} alt={etab.nom} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="h-40 bg-gradient-to-br from-[#1a2878]/8 to-[#6B21A8]/8 flex items-center justify-center">
            <span className="text-5xl opacity-60">{TYPE_ICONS[etab.type]}</span>
          </div>
        )}

        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h2 className="font-bold text-[#1a2878] text-sm leading-snug group-hover:text-[#6B21A8] transition-colors">
              {etab.nom}
            </h2>
            <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${TYPE_COLORS[etab.type]}`}>
              {TYPE_LABELS[etab.type]}
            </span>
          </div>
          <p className="text-gray-400 text-xs line-clamp-2 mb-4">{etab.description}</p>
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Frais / an</p>
              <p className="font-bold text-[#1a2878] text-sm">
                {totalObligatoire.toLocaleString('fr-FR')}{' '}
                <span className="text-[#C8A400] text-xs">{etab.pensions[0]?.devise}</span>
              </p>
            </div>
            <span className="text-xs text-[#6B21A8] font-semibold group-hover:underline">
              Détails →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
