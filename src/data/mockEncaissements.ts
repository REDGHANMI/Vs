
export interface Encaissement {
  rapport_uuid: string;
  type_paiement: "espece" | "carte" | "credit" | "cheque";
  montant: number;
  pourcentage: number;
  nb_transactions?: number;
}

export const mockEncaissements: Encaissement[] = [
  // Rapport INARA (rpt-1101000158)
  {
    rapport_uuid: "rpt-1101000158",
    type_paiement: "espece",
    montant: 89245.67,
    pourcentage: 55.08,
    nb_transactions: 234
  },
  {
    rapport_uuid: "rpt-1101000158",
    type_paiement: "carte",
    montant: 61426.33,
    pourcentage: 37.91,
    nb_transactions: 186
  },
  {
    rapport_uuid: "rpt-1101000158",
    type_paiement: "credit",
    montant: 11367.34,
    pourcentage: 7.01,
    nb_transactions: 15
  },

  // Rapport CALIFORNIE (rpt-500101159)
  {
    rapport_uuid: "rpt-500101159",
    type_paiement: "espece",
    montant: 42156.78,
    pourcentage: 59.56,
    nb_transactions: 145
  },
  {
    rapport_uuid: "rpt-500101159",
    type_paiement: "carte",
    montant: 23370.54,
    pourcentage: 33.02,
    nb_transactions: 98
  },
  {
    rapport_uuid: "rpt-500101159",
    type_paiement: "credit",
    montant: 5240.00,
    pourcentage: 7.40,
    nb_transactions: 8
  },

  // Rapport HASSAN II (rpt-1101000161)
  {
    rapport_uuid: "rpt-1101000161",
    type_paiement: "espece",
    montant: 54367.89,
    pourcentage: 60.78,
    nb_transactions: 167
  },
  {
    rapport_uuid: "rpt-1101000161",
    type_paiement: "carte",
    montant: 28960.12,
    pourcentage: 32.37,
    nb_transactions: 89
  },
  {
    rapport_uuid: "rpt-1101000161",
    type_paiement: "credit",
    montant: 6128.76,
    pourcentage: 6.85,
    nb_transactions: 12
  },

  // Rapport ANFA (rpt-1101000162)
  {
    rapport_uuid: "rpt-1101000162",
    type_paiement: "espece",
    montant: 76234.56,
    pourcentage: 56.65,
    nb_transactions: 203
  },
  {
    rapport_uuid: "rpt-1101000162",
    type_paiement: "carte",
    montant: 52550.06,
    pourcentage: 39.05,
    nb_transactions: 156
  },
  {
    rapport_uuid: "rpt-1101000162",
    type_paiement: "credit",
    montant: 5783.27,
    pourcentage: 4.30,
    nb_transactions: 9
  }
];
