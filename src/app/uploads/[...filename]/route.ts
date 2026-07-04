import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string[] }> },
) {
  const { filename } = await params;
  // Prevent path traversal
  const safe = filename.map((f) => path.basename(f));
  const filePath = path.join(process.cwd(), 'public', 'uploads', ...safe);

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const ext = filePath.split('.').pop()?.toLowerCase() ?? '';
  const contentType = MIME[ext] ?? 'application/octet-stream';
  const buffer = fs.readFileSync(filePath);

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
