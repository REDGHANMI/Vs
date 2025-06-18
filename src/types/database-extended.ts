
// Extended types for additional CRUD entities

export interface Article {
  id: string;
  nom: string;
  code_article: string;
  famille_article_id: string;
  prix_unitaire: number;
  unite_mesure: string;
  description?: string;
  active: boolean;
  created_at: string;
  // Enhanced fields
  prix_achat?: number;
  marge_beneficiaire?: number;
  stock_minimum?: number;
  stock_actuel?: number;
  fournisseur_principal?: string;
  code_barre?: string;
  photo_url?: string;
  // Relations
  famille_article?: FamilleArticle;
}

export interface FamilleArticle {
  id: string;
  nom: string;
  code_famille: string;
  description?: string;
  active: boolean;
  created_at: string;
  // Enhanced fields
  couleur_theme?: string;
  icone?: string;
  taux_tva_defaut?: number;
  compte_comptable?: string;
}

export interface IndiceCarburant {
  id: string;
  nom: string;
  type_carburant: "gasoil" | "ssp" | "mixte";
  valeur_indice: number;
  date_application: string;
  source: string;
  active: boolean;
  created_at: string;
  // Enhanced fields
  valeur_precedente?: number;
  variation_pourcentage?: number;
  frequence_mise_a_jour?: "quotidien" | "hebdomadaire" | "mensuel";
  methode_calcul?: string;
  commentaires?: string;
}

export interface CategorieDepense {
  id: string;
  nom: string;
  code_categorie: string;
  type_depense: "fixe" | "variable" | "exceptionnelle";
  compte_comptable?: string;
  description?: string;
  active: boolean;
  created_at: string;
  // Enhanced fields
  budget_mensuel?: number;
  seuil_alerte?: number;
  responsable?: string;
  autorisation_requise?: boolean;
  niveau_autorisation?: "gerant" | "manager" | "direction";
}
