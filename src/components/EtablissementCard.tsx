import Link from 'next/link';
import { Etablissement, TYPE_LABELS } from '@/types';

const TYPE_COLORS: Record<string, string> = {
  primaire:   'bg-emerald-100 text-emerald-800 border-emerald-200',
  college:    'bg-blue-100 text-blue-800 border-blue-200',
  lycee:      'bg-violet-100 text-violet-800 border-violet-200',
  universite: 'bg-amber-100 text-amber-800 border-amber-200',
  autre:      'bg-gray-100 text-gray-700 border-gray-200',
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
      <div className="bg-white rounded-xl border border-[#dde1f0] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden h-full">
        {etab.flyer ? (
          <div className="h-40 overflow-hidden">
            <img src={etab.flyer} alt={etab.nom} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="h-40 bg-gradient-to-br from-[#1a2878] to-[#263499] flex items-center justify-center">
            <span className="text-6xl opacity-80">{TYPE_ICONS[etab.type]}</span>
          </div>
        )}
        {/* Gold top border on hover */}
        <div className="h-0.5 bg-gradient-to-r from-[#c8a400] to-[#e8c220] opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h2 className="font-bold text-[#1a2878] text-base leading-tight">
              {etab.nom}
            </h2>
            <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${TYPE_COLORS[etab.type]}`}>
              {TYPE_LABELS[etab.type]}
            </span>
          </div>
          <p className="text-slate-500 text-sm line-clamp-2 mb-4">{etab.description}</p>
          <div className="border-t border-[#dde1f0] pt-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Frais obligatoires</p>
              <p className="font-bold text-[#1a2878] text-sm">
                {totalObligatoire.toLocaleString('fr-FR')}{' '}
                <span className="text-[#c8a400]">{etab.pensions[0]?.devise}</span>
              </p>
            </div>
            <span className="text-xs text-[#c8a400] font-semibold group-hover:underline">
              Voir les détails →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
