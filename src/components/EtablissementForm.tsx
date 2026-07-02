'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Etablissement, Pension, TypeEtablissement } from '@/types';
import { TYPE_LABELS } from '@/types';

interface Props {
  initial?: Etablissement;
  mode: 'create' | 'edit';
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function newPension(): Pension {
  return { id: String(Date.now()), label: '', montant: 0, devise: 'FC', obligatoire: true };
}

export default function EtablissementForm({ initial, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [uploadingFlyer, setUploadingFlyer] = useState(false);

  const [nom, setNom] = useState(initial?.nom ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [type, setType] = useState<TypeEtablissement>(initial?.type ?? 'primaire');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [adresse, setAdresse] = useState(initial?.adresse ?? '');
  const [telephone, setTelephone] = useState(initial?.telephone ?? '');
  const [email, setEmail] = useState(initial?.email ?? '');
  const [anneeScolaire, setAnneeScolaire] = useState(initial?.anneeScolaire ?? '2024-2025');
  const [actif, setActif] = useState(initial?.actif ?? true);
  const [flyer, setFlyer] = useState(initial?.flyer ?? '');
  const [pensions, setPensions] = useState<Pension[]>(initial?.pensions ?? [newPension()]);

  function handleNomChange(val: string) {
    setNom(val);
    if (mode === 'create') setSlug(slugify(val));
  }

  function addPension() {
    setPensions([...pensions, newPension()]);
  }

  function removePension(id: string) {
    setPensions(pensions.filter((p) => p.id !== id));
  }

  function updatePension(id: string, field: keyof Pension, value: string | number | boolean) {
    setPensions(pensions.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  async function handleFlyerUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFlyer(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        setFlyer(data.url);
      } else {
        setError(data.error || 'Erreur upload');
      }
    } catch {
      setError('Erreur réseau lors de l\'upload');
    } finally {
      setUploadingFlyer(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);
    const payload = { nom, slug, type, description, adresse, telephone, email, anneeScolaire, actif, flyer: flyer || null, pensions };
    try {
      const url = mode === 'create' ? '/api/etablissements' : `/api/etablissements/${initial?.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push('/admin/etablissements');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Erreur lors de la sauvegarde');
      }
    } catch {
      setError('Erreur réseau');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Supprimer "${nom}" ? Cette action est irréversible.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/etablissements/${initial?.id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/etablissements');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Erreur suppression');
      }
    } catch {
      setError('Erreur réseau');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Infos générales */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-800 mb-4">Informations générales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Nom de l&apos;établissement *</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => handleNomChange(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL) *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B21A8] font-mono"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Type *</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as TypeEtablissement)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
            >
              {(Object.keys(TYPE_LABELS) as TypeEtablissement[]).map((t) => (
                <option key={t} value={t}>{TYPE_LABELS[t]}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B21A8] resize-none"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Adresse *</label>
            <input
              type="text"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
            <input
              type="text"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Année scolaire *</label>
            <input
              type="text"
              value={anneeScolaire}
              onChange={(e) => setAnneeScolaire(e.target.value)}
              placeholder="2024-2025"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
              required
            />
          </div>
          <div className="flex items-center gap-3 mt-1">
            <input
              type="checkbox"
              id="actif"
              checked={actif}
              onChange={(e) => setActif(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[#6B21A8]"
            />
            <label htmlFor="actif" className="text-sm font-medium text-slate-700">
              Établissement actif (visible sur le site)
            </label>
          </div>
        </div>
      </div>

      {/* Flyer */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-800 mb-4">Flyer de prospection</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Uploader une image (JPG, PNG – max 5 Mo)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFlyerUpload}
              className="block w-full text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border file:border-slate-300 file:text-sm file:bg-white file:text-slate-700 hover:file:bg-slate-50"
            />
            {uploadingFlyer && <p className="text-xs text-slate-400 mt-1">Upload en cours...</p>}
          </div>
          {flyer && (
            <div className="flex items-start gap-3 mt-2">
              <img src={flyer} alt="Flyer" className="w-24 h-24 object-cover rounded-lg border border-slate-200" />
              <div>
                <p className="text-xs text-slate-500 font-mono break-all">{flyer}</p>
                <button
                  type="button"
                  onClick={() => setFlyer('')}
                  className="text-xs text-red-500 hover:underline mt-1"
                >
                  Supprimer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pensions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800">Frais de scolarité</h2>
          <button
            type="button"
            onClick={addPension}
            className="text-xs bg-[#6B21A8]/10 text-[#6B21A8] px-3 py-1.5 rounded-lg hover:bg-[#6B21A8]/20 transition-colors"
          >
            + Ajouter une ligne
          </button>
        </div>
        <div className="space-y-3">
          {pensions.map((p, i) => (
            <div key={p.id} className="grid grid-cols-12 gap-2 items-start bg-slate-50 rounded-lg p-3">
              <div className="col-span-12 md:col-span-4">
                <input
                  type="text"
                  placeholder="Libellé *"
                  value={p.label}
                  onChange={(e) => updatePension(p.id, 'label', e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B21A8]"
                  required
                />
              </div>
              <div className="col-span-6 md:col-span-3">
                <input
                  type="number"
                  placeholder="Montant *"
                  value={p.montant || ''}
                  onChange={(e) => updatePension(p.id, 'montant', parseFloat(e.target.value) || 0)}
                  className="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B21A8]"
                  required
                  min={0}
                />
              </div>
              <div className="col-span-3 md:col-span-1">
                <input
                  type="text"
                  placeholder="FC"
                  value={p.devise}
                  onChange={(e) => updatePension(p.id, 'devise', e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B21A8]"
                />
              </div>
              <div className="col-span-12 md:col-span-3">
                <input
                  type="text"
                  placeholder="Description (optionnel)"
                  value={p.description ?? ''}
                  onChange={(e) => updatePension(p.id, 'description', e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B21A8]"
                />
              </div>
              <div className="col-span-9 md:col-span-1 flex items-center gap-3 justify-between">
                <label className="flex items-center gap-1 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={p.obligatoire}
                    onChange={(e) => updatePension(p.id, 'obligatoire', e.target.checked)}
                    className="rounded"
                  />
                  Oblig.
                </label>
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => removePension(p.id)}
                    className="text-red-400 hover:text-red-600 text-lg leading-none"
                    title="Supprimer"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#6B21A8] text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-[#4C1678] transition-colors disabled:opacity-60"
          >
            {saving ? 'Enregistrement...' : mode === 'create' ? 'Créer' : 'Enregistrer'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/etablissements')}
            className="border border-slate-300 text-slate-700 px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-slate-50 transition-colors"
          >
            Annuler
          </button>
        </div>
        {mode === 'edit' && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-60"
          >
            {deleting ? 'Suppression...' : 'Supprimer cet établissement'}
          </button>
        )}
      </div>
    </form>
  );
}
