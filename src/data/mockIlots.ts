
export interface Ilot {
  id: string;
  station_id: string;
  numero_ilot: number;
  nom_ilot?: string;
  nombre_pistons: number;
  active: boolean;
  created_at: string;
}

export const mockIlots: Ilot[] = [
  // Station S/S CALIFORNIE (sta_002)
  {
    id: "ilot_001",
    station_id: "sta_002",
    numero_ilot: 1,
    nom_ilot: "ILOT 1",
    nombre_pistons: 8,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "ilot_002", 
    station_id: "sta_002",
    numero_ilot: 2,
    nom_ilot: "ILOT 2",
    nombre_pistons: 6,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "ilot_003",
    station_id: "sta_002", 
    numero_ilot: 3,
    nom_ilot: "ILOT 3",
    nombre_pistons: 8,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "ilot_004",
    station_id: "sta_002",
    numero_ilot: 4,
    nom_ilot: "ILOT 4",
    nombre_pistons: 2,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  },

  // Station S/S HAY INARA (sta_001)
  {
    id: "ilot_005",
    station_id: "sta_001",
    numero_ilot: 1,
    nom_ilot: "ILOT 1",
    nombre_pistons: 4,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "ilot_006",
    station_id: "sta_001",
    numero_ilot: 2,
    nom_ilot: "ILOT 2",
    nombre_pistons: 8,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "ilot_007",
    station_id: "sta_001",
    numero_ilot: 3,
    nom_ilot: "ILOT 3",
    nombre_pistons: 6,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "ilot_008",
    station_id: "sta_001",
    numero_ilot: 4,
    nom_ilot: "ILOT 4",
    nombre_pistons: 4,
    active: true,
    created_at: "2024-01-01T00:00:00Z"
  }
];
