
// Simplified expense management types

export interface CategorieDepense {
  id: string;
  nom: string;
  code_categorie: string;
  type_depense: "fixe" | "variable" | "exceptionnelle";
  compte_comptable?: string;
  description?: string;
  active: boolean;
  created_at: string;
  budget_mensuel?: number;
  couleur?: string;
}

export interface MouvementDepense {
  id: string;
  type: "depense" | "recette";
  categorie_id: string;
  description: string;
  montant: number;
  date_mouvement: string;
  station_id: string;
  societe_id: string;
  mode_paiement: "espece" | "cheque" | "virement" | "carte";
  numero_piece?: string;
  created_by: string;
  created_at: string;
  // Relations
  categorie?: CategorieDepense;
  station?: any;
  societe?: any;
}

export interface ExpenseAnalytics {
  total_depenses_mois: number;
  total_recettes_mois: number;
  resultat_net: number;
  repartition_par_categorie: {
    categorie: string;
    montant: number;
    pourcentage: number;
    couleur: string;
  }[];
  evolution_mensuelle: {
    mois: string;
    depenses: number;
    recettes: number;
    resultat: number;
  }[];
  top_depenses: {
    description: string;
    montant: number;
    categorie: string;
    date: string;
  }[];
}

export interface TypeCharge {
  id: string;
  nom: string;
  code: string;
  type: "charge" | "produit";
  compte_comptable?: string;
  description?: string;
  active: boolean;
  created_at: string;
  couleur_theme?: string;
}
