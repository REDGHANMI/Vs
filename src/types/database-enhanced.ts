
import { Station, RapportStation, StockCiterne } from './database';

// Nouvelles interfaces pour les tables créées
export interface Ilot {
  id: string;
  station_id: string;
  numero_ilot: number;
  nom_ilot?: string;
  nombre_pistons: number;
  active: boolean;
  created_at: string;
}

export interface Volucompteur {
  id: string;
  code_volucompteur: string;
  ilot_id: string;
  station_id: string;
  produit_code: string;
  produit_nom: string;
  prix_unitaire: number;
  active: boolean;
  created_at: string;
}

export interface LigneVolucompteur {
  id: string;
  rapport_uuid: string;
  volucompteur_id: string;
  index_initial: number;
  index_final: number;
  retour_cuve: number;
  sortie_litres: number;
  valeur_totale: number;
  created_at: string;
}

export interface VenteProduit {
  id: string;
  rapport_uuid: string;
  volucompteur_id?: string;
  produit_code: string;
  produit_nom: string;
  quantite: number;
  prix_unitaire: number;
  valeur_totale: number;
  type_vente: "comptant" | "credit";
  client_nom?: string;
  categorie: "carburant" | "lubrifiant" | "service" | "accessoire";
  created_at: string;
}

// Interfaces enrichies des tables existantes
export interface StationEnriched extends Station {
  numero_rj?: string;
  capacite_citerne_ssp?: number;
  capacite_citerne_gasoil?: number;
  nombre_ilots?: number;
}

export interface RapportStationEnriched extends RapportStation {
  numero_rapport: string;
  heure_creation: string;
  total_vente_comptant: number;
  total_vente_credit: number;
  total_non_carburant: number;
}

export interface StockCiterneEnriched extends StockCiterne {
  code_produit: string;
  designation_produit: string;
  jauge_initiale: number;
  jauge_finale: number;
  variation: number;
}
