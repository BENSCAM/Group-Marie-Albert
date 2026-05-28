'use client';

import Image from 'next/image';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Erreur de connexion');
      }
    } catch {
      setError('Erreur réseau');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2878] via-[#1e2f8a] to-[#111b5a] flex items-center justify-center p-4">
      {/* Decorative gold ring */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#c8a400]/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#c8a400]/5" />
      </div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        {/* Gold top accent */}
        <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-[#c8a400] to-transparent rounded-full" />

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-[#f0f2ff] rounded-full p-2 ring-2 ring-[#c8a400]/30">
              <Image
                src="/logo.png"
                alt="Logo GSMA"
                width={72}
                height={72}
                className="rounded-full"
              />
            </div>
          </div>
          <h1 className="text-xl font-bold text-[#1a2878]">Administration</h1>
          <p className="text-[#c8a400] text-xs font-semibold uppercase tracking-widest mt-0.5">
            G.S.M.A · M.A.G
          </p>
          <p className="text-slate-400 text-xs mt-1">Groupe Scolaire Marie Albert</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1a2878] mb-1">
              Mot de passe administrateur
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#dde1f0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2878] focus:border-transparent"
              placeholder="••••••••"
              required
              autoFocus
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a2878] text-white rounded-lg py-2.5 font-medium hover:bg-[#111b5a] transition-colors disabled:opacity-60 relative overflow-hidden"
          >
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8a400]/50 to-transparent" />
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          <a href="/" className="hover:text-[#1a2878] transition-colors">← Retour au site</a>
        </p>
      </div>
    </div>
  );
}
