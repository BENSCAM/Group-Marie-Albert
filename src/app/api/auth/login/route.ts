import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createToken, getSessionCookieOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { password } = body as { password?: string };

  if (!password || !verifyPassword(password)) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
  }

  const token = createToken();
  const response = NextResponse.json({ success: true });
  const opts = getSessionCookieOptions(token);
  response.cookies.set(opts);
  return response;
}
