export type TypeEtablissement = 'primaire' | 'college' | 'lycee' | 'universite' | 'autre';

export const TYPE_LABELS: Record<TypeEtablissement, string> = {
  primaire: 'École Primaire',
  college: 'Collège',
  lycee: 'Lycée',
  universite: 'Institut Supérieur',
  autre: 'Autre',
};

export interface Pension {
  id: string;
  label: string;
  montant: number;
  devise: string;
  description?: string;
  obligatoire: boolean;
}

export interface Etablissement {
  id: string;
  slug: string;
  nom: string;
  type: TypeEtablissement;
  description: string;
  adresse: string;
  telephone?: string;
  email?: string;
  logo?: string;
  flyer?: string;
  pensions: Pension[];
  anneeScolaire: string;
  actif: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SiteConfig {
  nom: string;
  slogan: string;
  description: string;
  email?: string;
  telephone?: string;
  adresse?: string;
  siteUrl: string;
}

export interface AdminSession {
  authenticated: boolean;
}
