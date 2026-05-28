import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getEtablissementById, updateEtablissement, deleteEtablissement } from '@/lib/data';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const etab = getEtablissementById(id);
  if (!etab) return NextResponse.json({ error: 'Introuvable' }, { status: 404 });
  return NextResponse.json(etab);
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Données invalides' }, { status: 400 });
  const updated = updateEtablissement(id, body);
  if (!updated) return NextResponse.json({ error: 'Introuvable' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }
  const { id } = await params;
  const deleted = deleteEtablissement(id);
  if (!deleted) return NextResponse.json({ error: 'Introuvable' }, { status: 404 });
  return NextResponse.json({ success: true });
}
