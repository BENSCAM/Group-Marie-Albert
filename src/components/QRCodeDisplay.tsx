'use client';

import { useEffect, useRef } from 'react';

interface QRCodeDisplayProps {
  url: string;
  nom: string;
  size?: number;
}

export default function QRCodeDisplay({ url, nom, size = 180 }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    import('qrcode').then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, url, {
        width: size,
        margin: 2,
        color: { dark: '#1e3a5f', light: '#ffffff' },
      });
    });
    return () => { cancelled = true; };
  }, [url, size]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `qr-${nom.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas ref={canvasRef} className="rounded-lg border border-slate-200 shadow-sm" />
      <button
        onClick={handleDownload}
        className="text-xs text-[#1e3a5f] border border-[#1e3a5f] rounded-full px-4 py-1.5 hover:bg-[#1e3a5f] hover:text-white transition-colors"
      >
        Télécharger le QR Code
      </button>
      <p className="text-xs text-slate-400 text-center max-w-[160px]">
        Imprimez et affichez ce QR code à l&apos;entrée de l&apos;établissement
      </p>
    </div>
  );
}
