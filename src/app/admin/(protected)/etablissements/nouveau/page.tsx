import Link from 'next/link';
import EtablissementForm from '@/components/EtablissementForm';

export default function NouvelEtablissement() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/etablissements" className="text-sm text-slate-500 hover:text-slate-700">
          ← Retour
        </Link>
        <h1 className="text-2xl font-bold text-slate-800 mt-2">Nouvel établissement</h1>
      </div>
      <EtablissementForm mode="create" />
    </div>
  );
}
