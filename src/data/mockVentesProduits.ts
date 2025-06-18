
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
  famille_produit: "carburant" | "non_carburant";
  categorie: "carburant" | "lubrifiant" | "service" | "accessoire";
  created_at: string;
}

export const mockVentesProduits: VenteProduit[] = [
  // ===== RAPPORT CALIFORNIE (500101159) =====
  
  // VENTES CARBURANT COMPTANT
  {
    id: "vp_001",
    rapport_uuid: "rpt-500101159",
    volucompteur_id: "vol_002",
    produit_code: "008000-00",
    produit_nom: "SSP",
    quantite: 1316,
    prix_unitaire: 12.66,
    valeur_totale: 16660.56,
    type_vente: "comptant",
    famille_produit: "carburant",
    categorie: "carburant",
    created_at: "2025-06-03T13:17:00Z"
  },
  {
    id: "vp_002",
    rapport_uuid: "rpt-500101159",
    volucompteur_id: "vol_001",
    produit_code: "008035-00", 
    produit_nom: "GASOIL 10ppm",
    quantite: 5104,
    prix_unitaire: 10.56,
    valeur_totale: 53902.96,
    type_vente: "comptant",
    famille_produit: "carburant",
    categorie: "carburant",
    created_at: "2025-06-03T13:17:00Z"
  },

  // VENTES CARBURANT CREDIT
  {
    id: "vp_003",
    rapport_uuid: "rpt-500101159",
    volucompteur_id: "vol_002",
    produit_code: "008000-00",
    produit_nom: "SSP",
    quantite: 496.21,
    prix_unitaire: 12.66,
    valeur_totale: 6279.78,
    type_vente: "credit",
    client_nom: "STE PETROMIN OILS DU",
    famille_produit: "carburant",
    categorie: "carburant",
    created_at: "2025-06-03T13:17:00Z"
  },
  {
    id: "vp_004",
    rapport_uuid: "rpt-500101159",
    volucompteur_id: "vol_001",
    produit_code: "008035-00",
    produit_nom: "GASOIL 10ppm",
    quantite: 561.55,
    prix_unitaire: 10.56,
    valeur_totale: 5930.05,
    type_vente: "credit",
    client_nom: "BER ANAS",
    famille_produit: "carburant",
    categorie: "carburant",
    created_at: "2025-06-03T13:17:00Z"
  },

  // VENTES NON CARBURANT
  {
    id: "vp_005",
    rapport_uuid: "rpt-500101159",
    produit_code: "LUB_001",
    produit_nom: "ULTRA-7 20W50",
    quantite: 1,
    prix_unitaire: 41.6,
    valeur_totale: 41.6,
    type_vente: "comptant",
    famille_produit: "non_carburant",
    categorie: "lubrifiant",
    created_at: "2025-06-03T13:17:00Z"
  },
  {
    id: "vp_006",
    rapport_uuid: "rpt-500101159",
    produit_code: "LUB_002",
    produit_nom: "AT ULTRA D 15W30",
    quantite: 2,
    prix_unitaire: 75.2,
    valeur_totale: 150.4,
    type_vente: "comptant",
    famille_produit: "non_carburant",
    categorie: "lubrifiant",
    created_at: "2025-06-03T13:17:00Z"
  },
  {
    id: "vp_007",
    rapport_uuid: "rpt-500101159",
    produit_code: "ACC_001",
    produit_nom: "Liquide lave-glace",
    quantite: 3,
    prix_unitaire: 4.0,
    valeur_totale: 12.0,
    type_vente: "comptant",
    famille_produit: "non_carburant",
    categorie: "accessoire",
    created_at: "2025-06-03T13:17:00Z"
  },

  // ===== RAPPORT HAY INARA (1101000158) =====
  
  // VENTES CARBURANT COMPTANT
  {
    id: "vp_008",
    rapport_uuid: "rpt-1101000158",
    volucompteur_id: "vol_008",
    produit_code: "008000-00",
    produit_nom: "SSP",
    quantite: 3126,
    prix_unitaire: 12.66,
    valeur_totale: 39575.16,
    type_vente: "comptant",
    famille_produit: "carburant",
    categorie: "carburant",
    created_at: "2025-06-03T11:19:00Z"
  },
  {
    id: "vp_009",
    rapport_uuid: "rpt-1101000158",
    volucompteur_id: "vol_006",
    produit_code: "008035-00",
    produit_nom: "GASOIL 10ppm",
    quantite: 11485,
    prix_unitaire: 10.56,
    valeur_totale: 121283.28,
    type_vente: "comptant",
    famille_produit: "carburant",
    categorie: "carburant",
    created_at: "2025-06-03T11:19:00Z"
  },

  // VENTES CARBURANT CREDIT
  {
    id: "vp_010",
    rapport_uuid: "rpt-1101000158",
    volucompteur_id: "vol_008",
    produit_code: "008000-00",
    produit_nom: "SSP",
    quantite: 777.84,
    prix_unitaire: 12.66,
    valeur_totale: 9849.46,
    type_vente: "credit",
    client_nom: "STE PETROMIN OILS TPE",
    famille_produit: "carburant",
    categorie: "carburant",
    created_at: "2025-06-03T11:19:00Z"
  },
  {
    id: "vp_011",
    rapport_uuid: "rpt-1101000158",
    volucompteur_id: "vol_006",
    produit_code: "008035-00",
    produit_nom: "GASOIL 10ppm",
    quantite: 778,
    prix_unitaire: 10.56,
    valeur_totale: 8215.68,
    type_vente: "credit",
    client_nom: "TRANS MAGHREB",
    famille_produit: "carburant",
    categorie: "carburant",
    created_at: "2025-06-03T11:19:00Z"
  },

  // VENTES NON CARBURANT
  {
    id: "vp_012",
    rapport_uuid: "rpt-1101000158",
    produit_code: "LUB_003",
    produit_nom: "EXTRA SUPER 20W40",
    quantite: 5,
    prix_unitaire: 38.7,
    valeur_totale: 193.5,
    type_vente: "comptant",
    famille_produit: "non_carburant",
    categorie: "lubrifiant",
    created_at: "2025-06-03T11:19:00Z"
  },
  {
    id: "vp_013",
    rapport_uuid: "rpt-1101000158",
    produit_code: "LUB_004",
    produit_nom: "DIESEL OIL HD1-40",
    quantite: 1,
    prix_unitaire: 170.4,
    valeur_totale: 170.4,
    type_vente: "comptant",
    famille_produit: "non_carburant",
    categorie: "lubrifiant",
    created_at: "2025-06-03T11:19:00Z"
  },
  {
    id: "vp_014",
    rapport_uuid: "rpt-1101000158",
    produit_code: "SRV_001",
    produit_nom: "Lavage Premium",
    quantite: 8,
    prix_unitaire: 25.0,
    valeur_totale: 200.0,
    type_vente: "comptant",
    famille_produit: "non_carburant",
    categorie: "service",
    created_at: "2025-06-03T11:19:00Z"
  },
  {
    id: "vp_015",
    rapport_uuid: "rpt-1101000158",
    produit_code: "ACC_002",
    produit_nom: "Chargeur USB",
    quantite: 2,
    prix_unitaire: 35.0,
    valeur_totale: 70.0,
    type_vente: "comptant",
    famille_produit: "non_carburant",
    categorie: "accessoire",
    created_at: "2025-06-03T11:19:00Z"
  }
];
