import Link from 'next/link';
import { getEtablissements } from '@/lib/data';
import { TYPE_LABELS } from '@/types';

export default function AdminEtablissements() {
  const etablissements = getEtablissements();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Établissements</h1>
          <p className="text-sm text-slate-500 mt-1">{etablissements.length} établissement(s)</p>
        </div>
        <Link
          href="/admin/etablissements/nouveau"
          className="bg-[#6B21A8] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#4C1678] transition-colors"
        >
          + Nouveau
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {etablissements.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-4xl mb-3">🏫</p>
            <p>Aucun établissement. Commencez par en créer un.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">Nom</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">Type</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">Année</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">Statut</th>
                <th className="text-right px-5 py-3 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {etablissements.map((etab) => (
                <tr key={etab.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-800">{etab.nom}</p>
                    <p className="text-xs text-slate-400">{etab.adresse}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{TYPE_LABELS[etab.type]}</td>
                  <td className="px-5 py-3.5 text-slate-600">{etab.anneeScolaire}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${etab.actif ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {etab.actif ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/etablissements/${etab.slug}`}
                        target="_blank"
                        className="text-slate-400 hover:text-slate-600 transition-colors text-xs"
                      >
                        Voir ↗
                      </Link>
                      <Link
                        href={`/admin/etablissements/${etab.id}`}
                        className="text-[#6B21A8] hover:underline text-xs font-medium"
                      >
                        Modifier
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
