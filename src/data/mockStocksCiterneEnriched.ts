
import { StockCiterne } from './mockStocksCiterne';

export interface StockCiterneEnriched extends StockCiterne {
  code_produit: string;
  designation_produit: string;
  jauge_initiale: number;
  jauge_finale: number;
  variation: number;
}

export const mockStocksCiterneEnriched: StockCiterneEnriched[] = [
  // Rapport HAY INARA (rpt-1101000158)
  {
    rapport_uuid: "rpt-1101000158",
    produit: "SSP",
    stock_debut: 17048,
    livraisons: 5000,
    ventes: 3126,
    stock_fin: 18922,
    stock_theorique: 18922,
    ecart: 0,
    capacite_max: 30000,
    pourcentage_remplissage: 63.07,
    // Nouveaux champs
    code_produit: "008000-00",
    designation_produit: "SUPER S/PLOMB",
    jauge_initiale: 18988,
    jauge_finale: 18988,
    variation: 66
  },
  {
    rapport_uuid: "rpt-1101000158",
    produit: "GASOIL 10ppm",
    stock_debut: 31005,
    livraisons: 28000,
    ventes: 12263,
    stock_fin: 46742,
    stock_theorique: 46742,
    ecart: 0,
    capacite_max: 60000,
    pourcentage_remplissage: 77.90,
    // Nouveaux champs
    code_produit: "008035-00",
    designation_produit: "GASOIL 10PPM",
    jauge_initiale: 46838,
    jauge_finale: 46838,
    variation: 96
  },

  // Rapport CALIFORNIE (rpt-500101159)
  {
    rapport_uuid: "rpt-500101159",
    produit: "SSP",
    stock_debut: 9250,
    livraisons: 0,
    ventes: 1316,
    stock_fin: 7934,
    stock_theorique: 7934,
    ecart: 0,
    capacite_max: 20000,
    pourcentage_remplissage: 39.67,
    // Nouveaux champs
    code_produit: "008000-00",
    designation_produit: "SUPER S/PLOMB",
    jauge_initiale: 7864,
    jauge_finale: 7864,
    variation: -70
  },
  {
    rapport_uuid: "rpt-500101159",
    produit: "GASOIL 10ppm",
    stock_debut: 27265,
    livraisons: 0,
    ventes: 5666,
    stock_fin: 21599,
    stock_theorique: 21599,
    ecart: 0,
    capacite_max: 90000,
    pourcentage_remplissage: 24.00,
    // Nouveaux champs
    code_produit: "008035-00",
    designation_produit: "GASOIL 10PPM",
    jauge_initiale: 21427,
    jauge_finale: 21427,
    variation: -172
  }
];
