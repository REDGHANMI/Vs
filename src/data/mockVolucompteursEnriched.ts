
import { Volucompteur } from './mockVolucompteurs';

export interface VolucompteurEnriched extends Volucompteur {
  index_courant?: number;
  statut?: "operationnel" | "maintenance" | "anomalie";
  date_maj?: string;
  ilot_nom?: string;
}

export const mockVolucompteursEnriched: VolucompteurEnriched[] = [
  {
    id: "vol_001",
    code_volucompteur: "6G3501_500",
    ilot_id: "ilot_001",
    station_id: "sta_002",
    produit_code: "008035-00",
    produit_nom: "GASOIL 10PPM",
    prix_unitaire: 10.56,
    active: true,
    created_at: "2024-01-01T00:00:00Z",
    index_courant: 156743,
    statut: "operationnel",
    date_maj: "2025-06-18T08:30:00Z",
    ilot_nom: "ILOT 1"
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
    created_at: "2024-01-01T00:00:00Z",
    index_courant: 98562,
    statut: "operationnel",
    date_maj: "2025-06-18T08:30:00Z",
    ilot_nom: "ILOT 1"
  },
  {
    id: "vol_006",
    code_volucompteur: "6G3501_110",
    ilot_id: "ilot_005",
    station_id: "sta_001",
    produit_code: "008035-00",
    produit_nom: "GASOIL 10PPM",
    prix_unitaire: 10.56,
    active: true,
    created_at: "2024-01-01T00:00:00Z",
    index_courant: 234567,
    statut: "operationnel",
    date_maj: "2025-06-18T09:15:00Z",
    ilot_nom: "ILOT 1"
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
    created_at: "2024-01-01T00:00:00Z",
    index_courant: 145678,
    statut: "maintenance",
    date_maj: "2025-06-17T16:45:00Z",
    ilot_nom: "ILOT 1"
  }
];
