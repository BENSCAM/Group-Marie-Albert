import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEtablissementById } from '@/lib/data';
import EtablissementForm from '@/components/EtablissementForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditEtablissement({ params }: Props) {
  const { id } = await params;
  const etab = getEtablissementById(id);
  if (!etab) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/etablissements" className="text-sm text-slate-500 hover:text-slate-700">
          ← Retour
        </Link>
        <h1 className="text-2xl font-bold text-slate-800 mt-2">Modifier – {etab.nom}</h1>
      </div>
      <EtablissementForm mode="edit" initial={etab} />
    </div>
  );
}
