// Types pour la structure de base de données métier

export interface Societe {
  id: string;
  nom: string;
  code: string;
  created_at: string;
  active: boolean;
  // Enhanced fields
  description?: string;
  adresse?: string;
  ville?: string;
  code_postal?: string;
  telephone?: string;
  email?: string;
  site_web?: string;
  logo_url?: string;
  couleur_theme?: string;
  date_creation?: string;
  capital_social?: number;
  forme_juridique?: string;
  numero_rc?: string;
  numero_ice?: string;
  numero_if?: string;
  numero_cnss?: string;
  numero_patente?: string;
}

export interface Gerant {
  id: string;
  nom_complet: string;
  nom: string;
  prenom: string;
  station_uuid?: string;
  est_responsable_station: boolean;
  poste: string;
  type_contrat?: "cdi" | "cdd" | "stage" | "freelance";
  telephone?: string;
  email?: string;
  actif: boolean;
  date_embauche?: string;
  created_at: string;
  // Enhanced fields
  cin?: string;
  date_naissance?: string;
  adresse?: string;
  ville?: string;
  situation_familiale?: "celibataire" | "marie" | "divorce" | "veuf";
  nombre_enfants?: number;
  niveau_education?: string;
  experience_precedente?: string;
  salaire_base?: number;
  prime_mensuelle?: number;
  date_fin_contrat?: string;
  photo_url?: string;
  commentaires?: string;
  // Keep compatibility with old active field
  active: boolean;
}

export interface Station {
  id: string;
  nom: string;
  societe_id: string;
  gerant_id: string;
  latitude: number;
  longitude: number;
  date_mise_en_service?: string;
  code_station?: string;
  active: boolean;
  created_at: string;
  // Enhanced fields
  adresse_complete?: string;
  ville?: string;
  region?: string;
  code_postal?: string;
  superficie?: number;
  nombre_pistons?: number;
  capacite_stockage_gasoil?: number;
  capacite_stockage_ssp?: number;
  services_additionnels?: string[];
  horaires_ouverture?: {
    lundi?: { ouvert: boolean; debut?: string; fin?: string };
    mardi?: { ouvert: boolean; debut?: string; fin?: string };
    mercredi?: { ouvert: boolean; debut?: string; fin?: string };
    jeudi?: { ouvert: boolean; debut?: string; fin?: string };
    vendredi?: { ouvert: boolean; debut?: string; fin?: string };
    samedi?: { ouvert: boolean; debut?: string; fin?: string };
    dimanche?: { ouvert: boolean; debut?: string; fin?: string };
  };
  photo_url?: string;
  statut_operationnel?: "operationnel" | "maintenance" | "ferme" | "construction";
  derniere_inspection?: string;
  certification_environnementale?: boolean;
  commentaires?: string;
  contact_urgence?: string;
  // Additional enriched fields
  date_ouverture?: string;
  statut?: "operationnel" | "maintenance" | "ferme" | "construction";
  // Relations
  societe?: Societe;
  gerant?: Gerant;
}

export interface FamilleCharge {
  id: string;
  nom: string;
  code: string;
  type: "charge" | "produit";
  compte_comptable: string;
  description?: string;
  active: boolean;
  created_at: string;
}

export interface PrixCarburant {
  id: string;
  date_prix: string;
  prix_gasoil: number;
  prix_ssp: number;
  societe_id: string;
  created_at: string;
  // Enhanced fields
  prix_gasoil_precedent?: number;
  prix_ssp_precedent?: number;
  variation_gasoil?: number;
  variation_ssp?: number;
  motif_changement?: string;
  applique_par?: string;
  date_application?: string;
}

// Enhanced types for comprehensive data model
export interface RapportStation {
  uuid: string;
  station_uuid: string;
  doc_entry: string;
  date_rapport: string;
  gerant_nom: string;
  total_ca: number;
  total_tonnage: number;
  statut: "complet" | "manquant" | "en_cours";
}

export interface VenteCarburant {
  rapport_uuid: string;
  produit: string;
  quantite: number;
  prix: number;
  valeur: number;
  type_vente: "comptant" | "credit";
  client?: string;
}

export interface VenteNonCarburant {
  rapport_uuid: string;
  produit: string;
  quantite: number;
  prix_unitaire: number;
  valeur: number;
  categorie: "lubrifiant" | "accessoire" | "boutique" | "service";
}

export interface StockCiterne {
  rapport_uuid: string;
  produit: string;
  stock_debut: number;
  livraisons: number;
  ventes: number;
  stock_fin: number;
  stock_theorique: number;
  ecart: number;
  capacite_max: number;
  pourcentage_remplissage: number;
}

export interface Encaissement {
  rapport_uuid: string;
  type_paiement: "espece" | "carte" | "credit" | "cheque";
  montant: number;
  pourcentage: number;
  nb_transactions?: number;
}

export interface Notification {
  id: string;
  type: "alert" | "info" | "warning" | "success";
  title: string;
  message: string;
  station_id?: string;
  societe_id?: string;
  priority: "low" | "medium" | "high" | "critical";
  is_read: boolean;
  created_at: string;
  // Enhanced fields
  user_id?: string;
  action_url?: string;
  expires_at?: string;
  category?: "system" | "business" | "maintenance" | "finance";
  metadata?: Record<string, any>;
  // Relations
  station?: Station;
  societe?: Societe;
  user?: User;
}

export interface User {
  id: string;
  nom_complet: string;
  email: string;
  telephone?: string;
  role: "admin" | "gestionnaire" | "operateur" | "consultant";
  societe_id?: string;
  active: boolean;
  last_login?: string;
  created_at: string;
  // Enhanced fields
  avatar_url?: string;
  date_naissance?: string;
  adresse?: string;
  permissions?: string[];
  preferences?: {
    theme?: "light" | "dark" | "auto";
    langue?: "fr" | "ar" | "en";
    notifications_email?: boolean;
    notifications_push?: boolean;
  };
  date_derniere_modification?: string;
  modifie_par?: string;
  // Relations
  societe?: Societe;
}

export interface MouvementCharge {
  id: string;
  type: "entree" | "sortie";
  categorie: "carburant" | "lubrifiant" | "maintenance" | "personnel" | "autre";
  description: string;
  montant: number;
  date_mouvement: string;
  station_id: string;
  societe_id: string;
  created_by: string;
  created_at: string;
  // Enhanced fields
  sous_categorie?: string;
  fournisseur?: string;
  numero_facture?: string;
  mode_paiement?: "espece" | "cheque" | "virement" | "carte";
  tva_applicable?: boolean;
  montant_tva?: number;
  piece_jointe_url?: string;
  approuve_par?: string;
  date_approbation?: string;
  statut?: "en_attente" | "approuve" | "rejete" | "paye";
  // Relations
  station?: Station;
  societe?: Societe;
  created_by_user?: User;
  approuve_par_user?: User;
}

export interface CompteComptable {
  id: string;
  numero_compte: string;
  libelle: string;
  type_compte: "actif" | "passif" | "charge" | "produit";
  societe_id: string;
  active: boolean;
  created_at: string;
  // Enhanced fields
  compte_parent_id?: string;
  niveau?: number;
  description?: string;
  solde_initial?: number;
  solde_actuel?: number;
  // Relations
  societe?: Societe;
  compte_parent?: CompteComptable;
  comptes_enfants?: CompteComptable[];
}

export interface EcritureComptable {
  id: string;
  numero_piece: string;
  date_ecriture: string;
  libelle: string;
  compte_debit: string;
  compte_credit: string;
  montant: number;
  station_id?: string;
  societe_id: string;
  mouvement_id?: string;
  created_by: string;
  created_at: string;
  // Enhanced fields
  journal?: string;
  numero_ligne?: number;
  devise?: string;
  taux_change?: number;
  reference_externe?: string;
  validee?: boolean;
  validee_par?: string;
  date_validation?: string;
  exercice_comptable?: string;
  // Relations
  station?: Station;
  societe?: Societe;
  mouvement?: MouvementCharge;
  compte_debit_details?: CompteComptable;
  compte_credit_details?: CompteComptable;
  created_by_user?: User;
  validee_par_user?: User;
}

export interface DashboardStats {
  total_stations: number;
  stations_actives: number;
  ca_total_mois: number;
  volume_total_mois: number;
  notifications_non_lues: number;
  alertes_critiques: number;
  stations_par_societe: {
    societe: string;
    count: number;
    ca_estime: number;
    volume_estime: number;
  }[];
  tendance_ca: {
    date: string;
    ca: number;
  }[];
  repartition_charges: {
    categorie: string;
    montant: number;
  }[];
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
}

// Enhanced enums and constants
export const STATUTS_STATION = [
  "operationnel",
  "maintenance", 
  "ferme",
  "construction"
] as const;

export const TYPES_CONTRAT = [
  "cdi",
  "cdd", 
  "stage",
  "freelance"
] as const;

export const SITUATIONS_FAMILIALES = [
  "celibataire",
  "marie",
  "divorce", 
  "veuf"
] as const;

export const STATUTS_RAPPORT = [
  "complet",
  "manquant",
  "en_cours"
] as const;

export const TYPES_VENTE = [
  "comptant",
  "credit"
] as const;

export const CATEGORIES_NON_CARBURANT = [
  "lubrifiant",
  "accessoire", 
  "boutique",
  "service"
] as const;

export const TYPES_PAIEMENT = [
  "espece",
  "carte",
  "credit",
  "cheque"
] as const;
