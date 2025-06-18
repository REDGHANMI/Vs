
import { mockCategoriesDepenses, mockFamillesArticles, mockStationsConsolidees } from './mockExtendedEntities';

export interface ProfitLossItem {
  poste: string;
  montant: number;
  pourcentage: number;
  icon: any;
  details: {
    description: string;
    montant: number;
    date: string;
    reference?: string;
    rapport_uuid?: string; // Ajout du lien de traçabilité
  }[];
}

export interface ProfitLossData {
  period: string;
  produits: ProfitLossItem[];
  charges: ProfitLossItem[];
  rapports_associes: string[]; // Liste des rapports utilisés pour cette période
}

// 📊 DONNÉES RÉALISTES basées sur les rapports terrain consolidés
const getCarburantDataRealistic = (period: string) => {
  const baseAmounts = {
    "2024-01": { 
      gasoil: 468041.25, // Somme Gasoil RAHMA + FLORIDA : 226076.25 + 241965.00
      ssp: 423914.00,    // Somme SSP RAHMA + FLORIDA : 198764.00 + 225150.00 
      services: 4315.00  // Somme lubrifiants/accessoires : 1606.00 + 2709.00
    },
    "2023-12": { gasoil: 420000, ssp: 380000, services: 12000 },
    "2023-11": { gasoil: 395000, ssp: 360000, services: 9500 }
  };
  
  return baseAmounts[period as keyof typeof baseAmounts] || baseAmounts["2024-01"];
};

const getChargesDataRealistic = (period: string) => {
  const baseAmounts = {
    "2024-01": { 
      achats: 590000,     // Coût d'achat estimé des carburants vendus (65% du CA carburant)
      salaires: 42000,    // Salaires équipe
      maintenance: 6000,  // Maintenance + réparations
      electricite: 4200,  // Électricité stations
      autres: 3800       // Assurances, frais bancaires, etc.
    },
    "2023-12": { achats: 520000, salaires: 45000, maintenance: 4200, electricite: 3800, autres: 2800 },
    "2023-11": { achats: 490000, salaires: 42000, maintenance: 3800, electricite: 3500, autres: 2400 }
  };
  
  return baseAmounts[period as keyof typeof baseAmounts] || baseAmounts["2024-01"];
};

export const generateProfitLossData = (selectedPeriod: string): ProfitLossData => {
  const periodNames = {
    "2024-01": "Janvier 2024",
    "2023-12": "Décembre 2023",
    "2023-11": "Novembre 2023"
  };

  const amounts = getCarburantDataRealistic(selectedPeriod);
  const charges = getChargesDataRealistic(selectedPeriod);
  const totalProduits = amounts.gasoil + amounts.ssp + amounts.services;
  const totalCharges = charges.achats + charges.salaires + charges.maintenance + charges.electricite + charges.autres;

  // Rapports associés selon la période
  const rapportsAssocies = {
    "2024-01": ["rpt-500101159", "rpt-1101000158", "rpt-1101000160"],
    "2023-12": ["rpt-500101160", "rpt-1101000161"],
    "2023-11": ["rpt-500101158", "rpt-1101000157"]
  };

  return {
    period: periodNames[selectedPeriod as keyof typeof periodNames] || "Période inconnue",
    rapports_associes: rapportsAssocies[selectedPeriod as keyof typeof rapportsAssocies] || [],
    produits: [
      {
        poste: "Ventes Gasoil 10ppm",
        montant: amounts.gasoil,
        pourcentage: (amounts.gasoil / totalProduits) * 100,
        icon: "Fuel",
        details: [
          { 
            description: "Vente Gasoil - S/S HAY INARA", 
            montant: 129498.96, 
            date: "03/06/2025", 
            reference: "VTE-INARA-001",
            rapport_uuid: "rpt-1101000158"
          },
          { 
            description: "Vente Gasoil - S/S CALIFORNIE", 
            montant: 59833.01, 
            date: "03/06/2025", 
            reference: "VTE-CAL-001",
            rapport_uuid: "rpt-500101159"
          }
        ]
      },
      {
        poste: "Ventes Super Sans Plomb",
        montant: amounts.ssp,
        pourcentage: (amounts.ssp / totalProduits) * 100,
        icon: "Fuel",
        details: [
          { 
            description: "Vente SSP - S/S HAY INARA", 
            montant: 49424.62, 
            date: "03/06/2025", 
            reference: "VTE-INARA-002",
            rapport_uuid: "rpt-1101000158"
          },
          { 
            description: "Vente SSP - S/S CALIFORNIE", 
            montant: 22940.34, 
            date: "03/06/2025", 
            reference: "VTE-CAL-002",
            rapport_uuid: "rpt-500101159"
          }
        ]
      },
      {
        poste: "Lubrifiants & Services",
        montant: amounts.services,
        pourcentage: (amounts.services / totalProduits) * 100,
        icon: "DollarSign",
        details: [
          { 
            description: "Lubrifiants & Services - S/S HAY INARA", 
            montant: 633.9, 
            date: "03/06/2025", 
            reference: "LUB-INARA-001",
            rapport_uuid: "rpt-1101000158"
          },
          { 
            description: "Lubrifiants & Accessoires - S/S CALIFORNIE", 
            montant: 204.0, 
            date: "03/06/2025", 
            reference: "LUB-CAL-001",
            rapport_uuid: "rpt-500101159"
          }
        ]
      }
    ],
    charges: [
      {
        poste: "Achats Carburants",
        montant: charges.achats,
        pourcentage: (charges.achats / totalCharges) * 100,
        icon: "Fuel",
        details: [
          { 
            description: "Achat carburant - Livraison HAY INARA", 
            montant: Math.floor(charges.achats * 0.6), 
            date: "02/06/2025", 
            reference: "ACH-2024-001",
            rapport_uuid: "rpt-1101000158"
          },
          { 
            description: "Achat carburant - Livraison CALIFORNIE", 
            montant: Math.floor(charges.achats * 0.4), 
            date: "02/06/2025", 
            reference: "ACH-2024-002",
            rapport_uuid: "rpt-500101159"
          }
        ]
      },
      {
        poste: "Salaires et Charges",
        montant: charges.salaires,
        pourcentage: (charges.salaires / totalCharges) * 100,
        icon: "Users",
        details: [
          { 
            description: "Salaires équipe - " + periodNames[selectedPeriod as keyof typeof periodNames], 
            montant: charges.salaires, 
            date: "31/01/2024", 
            reference: "SAL-2024-01"
          }
        ]
      },
      {
        poste: "Maintenance",
        montant: charges.maintenance,
        pourcentage: (charges.maintenance / totalCharges) * 100,
        icon: "Wrench",
        details: [
          { 
            description: "Maintenance préventive - HAY INARA", 
            montant: Math.floor(charges.maintenance * 0.6), 
            date: "12/01/2024", 
            reference: "MNT-001",
            rapport_uuid: "rpt-1101000158"
          },
          { 
            description: "Réparations - CALIFORNIE", 
            montant: Math.floor(charges.maintenance * 0.4), 
            date: "18/01/2024", 
            reference: "REP-001",
            rapport_uuid: "rpt-500101159"
          }
        ]
      },
      {
        poste: "Électricité",
        montant: charges.electricite,
        pourcentage: (charges.electricite / totalCharges) * 100,
        icon: "Zap",
        details: [
          { 
            description: "Facture électricité - " + periodNames[selectedPeriod as keyof typeof periodNames]?.split(' ')[0], 
            montant: charges.electricite, 
            date: "05/01/2024", 
            reference: "ELEC-001"
          }
        ]
      },
      {
        poste: "Autres Charges",
        montant: charges.autres,
        pourcentage: (charges.autres / totalCharges) * 100,
        icon: "FileText",
        details: [
          { 
            description: "Frais bancaires", 
            montant: Math.floor(charges.autres * 0.55), 
            date: "03/01/2024", 
            reference: "BANQ-001"
          },
          { 
            description: "Assurance", 
            montant: Math.floor(charges.autres * 0.45), 
            date: "08/01/2024", 
            reference: "ASS-001"
          }
        ]
      }
    ]
  };
};
