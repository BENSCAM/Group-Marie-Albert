import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const SECRET = process.env.SESSION_SECRET || 'marie-albert-secret-change-in-prod';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@2025';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours
const COOKIE_NAME = 'ma_admin_session';

export function verifyPassword(password: string): boolean {
  const expected = Buffer.from(ADMIN_PASSWORD);
  const provided = Buffer.from(password);
  if (expected.length !== provided.length) return false;
  return timingSafeEqual(expected, provided);
}

export function createToken(): string {
  const nonce = randomBytes(16).toString('hex');
  const expiry = Date.now() + SESSION_DURATION_MS;
  const payload = `${nonce}:${expiry}`;
  const sig = createHmac('sha256', SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${sig}`).toString('base64url');
}

export function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const lastColon = decoded.lastIndexOf(':');
    if (lastColon === -1) return false;
    const payload = decoded.substring(0, lastColon);
    const sig = decoded.substring(lastColon + 1);
    const expectedSig = createHmac('sha256', SECRET).update(payload).digest('hex');
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) return false;
    const parts = payload.split(':');
    const expiry = parseInt(parts[1], 10);
    return Date.now() < expiry;
  } catch {
    return false;
  }
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}

export function getSessionCookieOptions(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_DURATION_MS / 1000,
  };
}
