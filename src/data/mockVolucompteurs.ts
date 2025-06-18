
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

export const mockVolucompteurs: Volucompteur[] = [
  // ILOT 1 - S/S CALIFORNIE (Rapport 500101159)
  {
    id: "vol_001",
    code_volucompteur: "6G3501_500",
    ilot_id: "ilot_001",
    station_id: "sta_002",
    produit_code: "008035-00",
    produit_nom: "GASOIL 10PPM",
    prix_unitaire: 10.56,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "vol_002",
    code_volucompteur: "0SSP1_500",
    ilot_id: "ilot_001",
    station_id: "sta_002",
    produit_code: "008000-00",
    produit_nom: "SUPER S/PLOMB",
    prix_unitaire: 12.66,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "vol_003",
    code_volucompteur: "6G3502_500",
    ilot_id: "ilot_001",
    station_id: "sta_002",
    produit_code: "008035-00",
    produit_nom: "GASOIL 10PPM",
    prix_unitaire: 10.56,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  },

  // ILOT 2 - S/S CALIFORNIE  
  {
    id: "vol_004",
    code_volucompteur: "6G3505_500",
    ilot_id: "ilot_002",
    station_id: "sta_002",
    produit_code: "008035-00",
    produit_nom: "GASOIL 10PPM",
    prix_unitaire: 10.56,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "vol_005",
    code_volucompteur: "0SSP3_500",
    ilot_id: "ilot_002",
    station_id: "sta_002",
    produit_code: "008000-00",
    produit_nom: "SUPER S/PLOMB",
    prix_unitaire: 12.66,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  },

  // ILOT 1 - S/S HAY INARA (Rapport 1101000158)
  {
    id: "vol_006",
    code_volucompteur: "6G3501_110",
    ilot_id: "ilot_005",
    station_id: "sta_001",
    produit_code: "008035-00",
    produit_nom: "GASOIL 10PPM",
    prix_unitaire: 10.56,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "vol_007",
    code_volucompteur: "6G3502_110",
    ilot_id: "ilot_005",
    station_id: "sta_001",
    produit_code: "008035-00",
    produit_nom: "GASOIL 10PPM",
    prix_unitaire: 10.56,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "vol_008",
    code_volucompteur: "0SSP1_110",
    ilot_id: "ilot_005",
    station_id: "sta_001",
    produit_code: "008000-00",
    produit_nom: "SUPER S/PLOMB",
    prix_unitaire: 12.66,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "vol_009",
    code_volucompteur: "0SSP2_110",
    ilot_id: "ilot_005",
    station_id: "sta_001",
    produit_code: "008000-00",
    produit_nom: "SUPER S/PLOMB",
    prix_unitaire: 12.66,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  }
];
