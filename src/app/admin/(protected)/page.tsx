import Link from 'next/link';
import { getEtablissements, getSiteConfig } from '@/lib/data';
import { TYPE_LABELS } from '@/types';

export default function AdminDashboard() {
  const etablissements = getEtablissements();
  const config = getSiteConfig();
  const actifs = etablissements.filter((e) => e.actif).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Tableau de bord</h1>
        <p className="text-slate-500 text-sm mt-1">Gestion du {config.nom}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-3xl font-bold text-[#6B21A8]">{etablissements.length}</p>
          <p className="text-sm text-slate-500 mt-1">Établissements</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-3xl font-bold text-green-600">{actifs}</p>
          <p className="text-sm text-slate-500 mt-1">Actifs</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-3xl font-bold text-slate-600">{etablissements.length - actifs}</p>
          <p className="text-sm text-slate-500 mt-1">Inactifs</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-3xl font-bold text-[#C8A400]">
            {etablissements.reduce((s, e) => s + e.pensions.length, 0)}
          </p>
          <p className="text-sm text-slate-500 mt-1">Lignes de frais</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mb-8">
        <Link
          href="/admin/etablissements/nouveau"
          className="bg-[#6B21A8] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#4C1678] transition-colors"
        >
          + Nouvel établissement
        </Link>
        <Link
          href="/admin/etablissements"
          className="border border-slate-300 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          Gérer les établissements
        </Link>
      </div>

      {/* Recent establishments */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Établissements</h2>
          <Link href="/admin/etablissements" className="text-xs text-[#6B21A8] hover:underline">
            Voir tout
          </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {etablissements.map((etab) => (
            <div key={etab.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
              <div>
                <p className="font-medium text-slate-800 text-sm">{etab.nom}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {TYPE_LABELS[etab.type]} · {etab.pensions.length} frais · {etab.anneeScolaire}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${etab.actif ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {etab.actif ? 'Actif' : 'Inactif'}
                </span>
                <Link
                  href={`/admin/etablissements/${etab.id}`}
                  className="text-xs text-[#6B21A8] hover:underline"
                >
                  Modifier
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
