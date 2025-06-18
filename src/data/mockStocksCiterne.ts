
export interface StockCiterne {
  rapport_uuid: string;
  produit: string;
  stock_debut: number;
  livraisons: number;
  ventes: number;
  stock_fin: number;
  stock_theorique: number;
  ecart: number;
  capacite_max: number;
  pourcentage_remplissage: number;
}

export const mockStocksCiterne: StockCiterne[] = [
  // Rapport INARA (rpt-1101000158)
  {
    rapport_uuid: "rpt-1101000158",
    produit: "SSP",
    stock_debut: 15420,
    livraisons: 8000,
    ventes: 3903.84,
    stock_fin: 19516.16,
    stock_theorique: 19516.16,
    ecart: 0,
    capacite_max: 25000,
    pourcentage_remplissage: 78.06
  },
  {
    rapport_uuid: "rpt-1101000158",
    produit: "GASOIL 10ppm",
    stock_debut: 28450,
    livraisons: 12000,
    ventes: 11783.5,
    stock_fin: 28666.5,
    stock_theorique: 28666.5,
    ecart: 0,
    capacite_max: 35000,
    pourcentage_remplissage: 81.90
  },

  // Rapport CALIFORNIE (rpt-500101159)
  {
    rapport_uuid: "rpt-500101159",
    produit: "SSP",
    stock_debut: 12800,
    livraisons: 6000,
    ventes: 1812.21,
    stock_fin: 16987.79,
    stock_theorique: 16987.79,
    ecart: 0,
    capacite_max: 20000,
    pourcentage_remplissage: 84.94
  },
  {
    rapport_uuid: "rpt-500101159",
    produit: "GASOIL 10ppm",
    stock_debut: 18950,
    livraisons: 8000,
    ventes: 5104,
    stock_fin: 21846,
    stock_theorique: 21846,
    ecart: 0,
    capacite_max: 28000,
    pourcentage_remplissage: 78.02
  },

  // Rapport HASSAN II (rpt-1101000161)
  {
    rapport_uuid: "rpt-1101000161",
    produit: "SSP",
    stock_debut: 9850,
    livraisons: 5000,
    ventes: 1856,
    stock_fin: 12994,
    stock_theorique: 12994,
    ecart: 0,
    capacite_max: 18000,
    pourcentage_remplissage: 72.19
  },
  {
    rapport_uuid: "rpt-1101000161",
    produit: "GASOIL 10ppm",
    stock_debut: 22100,
    livraisons: 10000,
    ventes: 6234,
    stock_fin: 25866,
    stock_theorique: 25866,
    ecart: 0,
    capacite_max: 32000,
    pourcentage_remplissage: 80.83
  },

  // Rapport ANFA (rpt-1101000162)
  {
    rapport_uuid: "rpt-1101000162",
    produit: "SSP",
    stock_debut: 14560,
    livraisons: 7000,
    ventes: 3390.78,
    stock_fin: 18169.22,
    stock_theorique: 18169.22,
    ecart: 0,
    capacite_max: 24000,
    pourcentage_remplissage: 75.70
  },
  {
    rapport_uuid: "rpt-1101000162",
    produit: "GASOIL 10ppm",
    stock_debut: 26780,
    livraisons: 11000,
    ventes: 9165,
    stock_fin: 28615,
    stock_theorique: 28615,
    ecart: 0,
    capacite_max: 36000,
    pourcentage_remplissage: 79.49
  }
];
