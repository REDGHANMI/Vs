
import { PrixCarburant } from "@/types/database";

export interface PrixCarburantEnriched extends PrixCarburant {
  station_id?: string;
  variation_gasoil?: number;
  variation_ssp?: number;
}

export const mockPrixCarburantsEnriched: PrixCarburantEnriched[] = [
  // June 18, 2025 - Current prices
  {
    id: "prix_001",
    date_prix: "2025-06-18",
    prix_gasoil: 19.56,
    prix_ssp: 19.66,
    societe_id: "soc_001",
    station_id: "sta_001",
    variation_gasoil: 0.02,
    variation_ssp: -0.01,
    created_at: "2025-06-18T00:00:00Z"
  },
  {
    id: "prix_002", 
    date_prix: "2025-06-18",
    prix_gasoil: 10.56,
    prix_ssp: 20.66,
    societe_id: "soc_002",
    station_id: "sta_002",
    variation_gasoil: 0.02,
    variation_ssp: -0.01,
    created_at: "2025-06-18T00:00:00Z"
  },
  
  // June 17, 2025
  {
    id: "prix_003",
    date_prix: "2025-06-17",
    prix_gasoil: 10.54,
    prix_ssp: 12.67,
    societe_id: "soc_001",
    station_id: "sta_001",
    variation_gasoil: -0.01,
    variation_ssp: 0.02,
    created_at: "2025-06-17T00:00:00Z"
  },
  {
    id: "prix_004",
    date_prix: "2025-06-17",
    prix_gasoil: 10.54,
    prix_ssp: 12.67,
    societe_id: "soc_002",
    station_id: "sta_002",
    variation_gasoil: -0.01,
    variation_ssp: 0.02,
    created_at: "2025-06-17T00:00:00Z"
  },

  // June 16, 2025
  {
    id: "prix_005",
    date_prix: "2025-06-16",
    prix_gasoil: 10.55,
    prix_ssp: 12.65,
    societe_id: "soc_001",
    station_id: "sta_001",
    variation_gasoil: 0.01,
    variation_ssp: -0.02,
    created_at: "2025-06-16T00:00:00Z"
  },
  {
    id: "prix_006",
    date_prix: "2025-06-16",
    prix_gasoil: 10.55,
    prix_ssp: 12.65,
    societe_id: "soc_002",
    station_id: "sta_002",
    variation_gasoil: 0.01,
    variation_ssp: -0.02,
    created_at: "2025-06-16T00:00:00Z"
  },

  // June 15, 2025
  {
    id: "prix_007",
    date_prix: "2025-06-15",
    prix_gasoil: 10.54,
    prix_ssp: 12.67,
    societe_id: "soc_001",
    station_id: "sta_001",
    variation_gasoil: -0.01,
    variation_ssp: 0.02,
    created_at: "2025-06-15T00:00:00Z"
  },
  {
    id: "prix_008",
    date_prix: "2025-06-15",
    prix_gasoil: 10.54,
    prix_ssp: 12.67,
    societe_id: "soc_002",
    station_id: "sta_002",
    variation_gasoil: -0.01,
    variation_ssp: 0.02,
    created_at: "2025-06-15T00:00:00Z"
  },

  // June 14, 2025
  {
    id: "prix_009",
    date_prix: "2025-06-14",
    prix_gasoil: 10.55,
    prix_ssp: 12.65,
    societe_id: "soc_001",
    station_id: "sta_001",
    variation_gasoil: 0.01,
    variation_ssp: -0.02,
    created_at: "2025-06-14T00:00:00Z"
  },
  {
    id: "prix_010",
    date_prix: "2025-06-14",
    prix_gasoil: 10.55,
    prix_ssp: 12.65,
    societe_id: "soc_002",
    station_id: "sta_002",
    variation_gasoil: 0.01,
    variation_ssp: -0.02,
    created_at: "2025-06-14T00:00:00Z"
  },

  // Add data for other stations
  {
    id: "prix_011",
    date_prix: "2025-06-18",
    prix_gasoil: 10.57,
    prix_ssp: 12.68,
    societe_id: "soc_001",
    station_id: "sta_003",
    variation_gasoil: 0.03,
    variation_ssp: 0.01,
    created_at: "2025-06-18T00:00:00Z"
  },
  {
    id: "prix_012",
    date_prix: "2025-06-17",
    prix_gasoil: 10.54,
    prix_ssp: 12.67,
    societe_id: "soc_001",
    station_id: "sta_003",
    variation_gasoil: -0.01,
    variation_ssp: 0.02,
    created_at: "2025-06-17T00:00:00Z"
  },
  {
    id: "prix_013",
    date_prix: "2025-06-16",
    prix_gasoil: 10.55,
    prix_ssp: 12.65,
    societe_id: "soc_001",
    station_id: "sta_003",
    variation_gasoil: 0.01,
    variation_ssp: -0.02,
    created_at: "2025-06-16T00:00:00Z"
  },
  {
    id: "prix_014",
    date_prix: "2025-06-15",
    prix_gasoil: 10.54,
    prix_ssp: 12.67,
    societe_id: "soc_001",
    station_id: "sta_003",
    variation_gasoil: -0.01,
    variation_ssp: 0.02,
    created_at: "2025-06-15T00:00:00Z"
  },
  {
    id: "prix_015",
    date_prix: "2025-06-14",
    prix_gasoil: 10.55,
    prix_ssp: 12.65,
    societe_id: "soc_001",
    station_id: "sta_003",
    variation_gasoil: 0.01,
    variation_ssp: -0.02,
    created_at: "2025-06-14T00:00:00Z"
  }
];
