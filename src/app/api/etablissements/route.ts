import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getEtablissements, createEtablissement } from '@/lib/data';
import type { Etablissement } from '@/types';

export async function GET() {
  return NextResponse.json(getEtablissements());
}

export async function POST(req: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || !body.nom || !body.type) {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 });
  }

  const newEtab = createEtablissement(body as Omit<Etablissement, 'id' | 'createdAt' | 'updatedAt'>);
  return NextResponse.json(newEtab, { status: 201 });
}
