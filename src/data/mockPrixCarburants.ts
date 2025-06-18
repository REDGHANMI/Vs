
import { PrixCarburant } from "@/types/database";

export const mockPrixCarburants: PrixCarburant[] = [
  {
    id: "prix_001",
    date_prix: "2025-01-01",
    prix_gasoil: 11.29,
    prix_ssp: 13.20,
    societe_id: "soc_001",
    created_at: "2025-01-01T00:00:00Z"
  },
  {
    id: "prix_002", 
    date_prix: "2025-01-01",
    prix_gasoil: 11.28,
    prix_ssp: 13.19,
    societe_id: "soc_002",
    created_at: "2025-01-01T00:00:00Z"
  },
  {
    id: "prix_003",
    date_prix: "2025-01-01", 
    prix_gasoil: 11.28,
    prix_ssp: 13.19,
    societe_id: "soc_003",
    created_at: "2025-01-01T00:00:00Z"
  },
  {
    id: "prix_004",
    date_prix: "2025-01-17",
    prix_gasoil: 11.47,
    prix_ssp: 13.38,
    societe_id: "soc_003", 
    created_at: "2025-01-17T00:00:00Z"
  }
];
