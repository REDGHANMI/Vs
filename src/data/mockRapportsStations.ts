
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

export const mockRapportsStations: RapportStation[] = [
  {
    uuid: "rpt-1101000158",
    station_uuid: "sta_001", // S/S HAY INARA
    doc_entry: "22400",
    date_rapport: "2025-06-03T11:19:00Z",
    gerant_nom: "Mr. ILYASS LAMZABI",
    total_ca: 162039.34,
    total_tonnage: 15389,
    statut: "complet"
  },
  {
    uuid: "rpt-500101159",
    station_uuid: "sta_002", // S/S CALIFORNIE
    doc_entry: "25714",
    date_rapport: "2025-06-03T13:17:00Z",
    gerant_nom: "YASSINE KHEIR",
    total_ca: 70767.32,
    total_tonnage: 6982,
    statut: "complet"
  },
  {
    uuid: "rpt-1101000160",
    station_uuid: "sta_001", // S/S HAY INARA
    doc_entry: "22401",
    date_rapport: "2025-06-04T10:45:00Z",
    gerant_nom: "Mr. ILYASS LAMZABI",
    total_ca: 145789.22,
    total_tonnage: 14203,
    statut: "complet"
  },
  {
    uuid: "rpt-500101160",
    station_uuid: "sta_002", // S/S CALIFORNIE
    doc_entry: "25715",
    date_rapport: "2025-06-04T14:22:00Z",
    gerant_nom: "YASSINE KHEIR",
    total_ca: 68945.18,
    total_tonnage: 6745,
    statut: "en_cours"
  },
  {
    uuid: "rpt-1101000161",
    station_uuid: "sta_003", // S/S HASSAN II
    doc_entry: "22402",
    date_rapport: "2025-06-03T09:30:00Z",
    gerant_nom: "MOHAMED ALAMI",
    total_ca: 89456.77,
    total_tonnage: 8921,
    statut: "complet"
  },
  {
    uuid: "rpt-1101000162",
    station_uuid: "sta_004", // S/S ANFA
    doc_entry: "22403",
    date_rapport: "2025-06-03T16:15:00Z",
    gerant_nom: "RACHID BENALI",
    total_ca: 134567.89,
    total_tonnage: 12876,
    statut: "complet"
  },
  {
    uuid: "rpt-1101000163",
    station_uuid: "sta_005", // S/S MAARIF
    doc_entry: "22404",
    date_rapport: "2025-06-04T08:20:00Z",
    gerant_nom: "FATIMA ZAHRA",
    total_ca: 98234.56,
    total_tonnage: 9654,
    statut: "manquant"
  }
];
