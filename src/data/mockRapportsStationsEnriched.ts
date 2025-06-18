
import { RapportStation } from './mockRapportsStations';

export interface RapportStationEnriched extends RapportStation {
  numero_rapport: string;
  heure_creation: string;
  total_vente_comptant: number;
  total_vente_credit: number;
  total_non_carburant: number;
}

export const mockRapportsStationsEnriched: RapportStationEnriched[] = [
  {
    uuid: "rpt-1101000158",
    station_uuid: "sta_001", // S/S HAY INARA
    doc_entry: "22400",
    date_rapport: "2025-06-03T11:19:00Z",
    gerant_nom: "Mr. ILYASS LAMZABI",
    total_ca: 162039.34,
    total_tonnage: 15389,
    statut: "complet",
    // Nouveaux champs
    numero_rapport: "1101000158",
    heure_creation: "11:19",
    total_vente_comptant: 160858.44,
    total_vente_credit: 8214,
    total_non_carburant: 1180.90
  },
  {
    uuid: "rpt-500101159",
    station_uuid: "sta_002", // S/S CALIFORNIE
    doc_entry: "25714",
    date_rapport: "2025-06-03T13:17:00Z",
    gerant_nom: "YASSINE KHEIR",
    total_ca: 70767.32,
    total_tonnage: 6982,
    statut: "complet",
    // Nouveaux champs
    numero_rapport: "500101159",
    heure_creation: "13:17",
    total_vente_comptant: 70563.52,
    total_vente_credit: 5930,
    total_non_carburant: 203.80
  },
  {
    uuid: "rpt-1101000160",
    station_uuid: "sta_001", // S/S HAY INARA
    doc_entry: "22401",
    date_rapport: "2025-06-04T10:45:00Z",
    gerant_nom: "Mr. ILYASS LAMZABI",
    total_ca: 145789.22,
    total_tonnage: 14203,
    statut: "complet",
    // Nouveaux champs
    numero_rapport: "1101000160",
    heure_creation: "10:45",
    total_vente_comptant: 146433.06,
    total_vente_credit: 2963.76,
    total_non_carburant: 950.40
  },
  {
    uuid: "rpt-500101160",
    station_uuid: "sta_002", // S/S CALIFORNIE
    doc_entry: "25715",
    date_rapport: "2025-06-04T14:22:00Z",
    gerant_nom: "YASSINE KHEIR",
    total_ca: 68945.18,
    total_tonnage: 6745,
    statut: "en_cours",
    // Nouveaux champs
    numero_rapport: "500101160",
    heure_creation: "14:22",
    total_vente_comptant: 68945.18,
    total_vente_credit: 0,
    total_non_carburant: 156.25
  },
  {
    uuid: "rpt-1101000161",
    station_uuid: "sta_003", // S/S HASSAN II
    doc_entry: "22402",
    date_rapport: "2025-06-03T09:30:00Z",
    gerant_nom: "MOHAMED ALAMI",
    total_ca: 89456.77,
    total_tonnage: 8921,
    statut: "complet",
    // Nouveaux champs
    numero_rapport: "1101000161",
    heure_creation: "09:30",
    total_vente_comptant: 89328.00,
    total_vente_credit: 0,
    total_non_carburant: 560.00
  }
];
