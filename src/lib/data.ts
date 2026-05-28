import fs from 'fs';
import path from 'path';
import { Etablissement, SiteConfig } from '@/types';

const dataDir = path.join(process.cwd(), 'data');

function readJSON<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

function writeJSON<T>(filename: string, data: T): void {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function getEtablissements(): Etablissement[] {
  return readJSON<Etablissement[]>('etablissements.json');
}

export function getEtablissement(slug: string): Etablissement | null {
  const all = getEtablissements();
  return all.find((e) => e.slug === slug) ?? null;
}

export function getEtablissementById(id: string): Etablissement | null {
  const all = getEtablissements();
  return all.find((e) => e.id === id) ?? null;
}

export function saveEtablissements(etablissements: Etablissement[]): void {
  writeJSON('etablissements.json', etablissements);
}

export function createEtablissement(data: Omit<Etablissement, 'id' | 'createdAt' | 'updatedAt'>): Etablissement {
  const all = getEtablissements();
  const newEtab: Etablissement = {
    ...data,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  all.push(newEtab);
  saveEtablissements(all);
  return newEtab;
}

export function updateEtablissement(id: string, data: Partial<Etablissement>): Etablissement | null {
  const all = getEtablissements();
  const index = all.findIndex((e) => e.id === id);
  if (index === -1) return null;
  all[index] = { ...all[index], ...data, id, updatedAt: new Date().toISOString() };
  saveEtablissements(all);
  return all[index];
}

export function deleteEtablissement(id: string): boolean {
  const all = getEtablissements();
  const index = all.findIndex((e) => e.id === id);
  if (index === -1) return false;
  all.splice(index, 1);
  saveEtablissements(all);
  return true;
}

export function getSiteConfig(): SiteConfig {
  return readJSON<SiteConfig>('config.json');
}

export function updateSiteConfig(data: Partial<SiteConfig>): SiteConfig {
  const current = getSiteConfig();
  const updated = { ...current, ...data };
  writeJSON('config.json', updated);
  return updated;
}
