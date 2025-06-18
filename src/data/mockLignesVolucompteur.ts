
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

export const mockLignesVolucompteur: LigneVolucompteur[] = [
  // Rapport CALIFORNIE (500101159) - ILOT 1
  {
    id: "lvc_001",
    rapport_uuid: "rpt-500101159",
    volucompteur_id: "vol_001", // 6G3501_500
    index_initial: 572047,
    index_final: 572700,
    retour_cuve: 0,
    sortie_litres: 653,
    valeur_totale: 6895.68,
    created_at: "2025-06-03T13:17:00Z"
  },
  {
    id: "lvc_002", 
    rapport_uuid: "rpt-500101159",
    volucompteur_id: "vol_002", // 0SSP1_500
    index_initial: 170524,
    index_final: 170639,
    retour_cuve: 0,
    sortie_litres: 115,
    valeur_totale: 1455.9,
    created_at: "2025-06-03T13:17:00Z"
  },
  {
    id: "lvc_003",
    rapport_uuid: "rpt-500101159", 
    volucompteur_id: "vol_003", // 6G3502_500
    index_initial: 114318,
    index_final: 114318,
    retour_cuve: 0,
    sortie_litres: 0,
    valeur_totale: 0,
    created_at: "2025-06-03T13:17:00Z"
  },

  // Rapport CALIFORNIE (500101159) - ILOT 2
  {
    id: "lvc_004",
    rapport_uuid: "rpt-500101159",
    volucompteur_id: "vol_004", // 6G3505_500
    index_initial: 1554062,
    index_final: 1555055,
    retour_cuve: 0,
    sortie_litres: 993,
    valeur_totale: 10486.08,
    created_at: "2025-06-03T13:17:00Z"
  },
  {
    id: "lvc_005",
    rapport_uuid: "rpt-500101159",
    volucompteur_id: "vol_005", // 0SSP3_500
    index_initial: 544694,
    index_final: 545237,
    retour_cuve: 0,
    sortie_litres: 543,
    valeur_totale: 6874.38,
    created_at: "2025-06-03T13:17:00Z"
  },

  // Rapport HAY INARA (1101000158) - ILOT 1
  {
    id: "lvc_006",
    rapport_uuid: "rpt-1101000158",
    volucompteur_id: "vol_006", // 6G3501_110
    index_initial: 114193,
    index_final: 114564,
    retour_cuve: 0,
    sortie_litres: 371,
    valeur_totale: 3917.76,
    created_at: "2025-06-03T11:19:00Z"
  },
  {
    id: "lvc_007",
    rapport_uuid: "rpt-1101000158",
    volucompteur_id: "vol_007", // 6G3502_110  
    index_initial: 414599,
    index_final: 415927,
    retour_cuve: 0,
    sortie_litres: 1328,
    valeur_totale: 14023.68,
    created_at: "2025-06-03T11:19:00Z"
  },
  {
    id: "lvc_008",
    rapport_uuid: "rpt-1101000158",
    volucompteur_id: "vol_008", // 0SSP1_110
    index_initial: 28991,
    index_final: 29140,
    retour_cuve: 0,
    sortie_litres: 149,
    valeur_totale: 1886.34,
    created_at: "2025-06-03T11:19:00Z"
  },
  {
    id: "lvc_009",
    rapport_uuid: "rpt-1101000158",
    volucompteur_id: "vol_009", // 0SSP2_110
    index_initial: 80631,
    index_final: 80884,
    retour_cuve: 0,
    sortie_litres: 253,
    valeur_totale: 3202.98,
    created_at: "2025-06-03T11:19:00Z"
  }
];
