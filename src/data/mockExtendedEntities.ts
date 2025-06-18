// NOTE : Toutes les entités mock sont centralisées ici. Ne pas recréer de fichiers mock séparés.

import { Article, FamilleArticle, IndiceCarburant, CategorieDepense } from '@/types/database-extended';
import { TypeCharge, MouvementDepense, ExpenseAnalytics } from '@/types/expense';
import { Station } from '@/types/database';

// 🏢 STATIONS CONSOLIDÉES (intégration de mockStationsNew.ts)
export const mockStationsConsolidees: Station[] = [
  {
    id: "sta_0054545",
    nom: "S/S RAHMA II", 
    societe_id: "soc_001",
    gerant_id: "ger_001",
    latitude: 33.517702,
    longitude: -7.757751148,
    date_mise_en_service: "2018-12-28",
    code_station: "105",
    active: true,
    created_at: "2018-12-28T00:00:00Z"
  },
  {
    id: "sta_002",
    nom: "S/S FLORIDA",
    societe_id: "soc_001", 
    gerant_id: "ger_002",
    latitude: 33.52037761,
    longitude: -7.635028876,
    date_mise_en_service: "2020-03-14",
    code_station: "106", 
    active: true,
    created_at: "2020-03-14T00:00:00Z"
  },
  {
    id: "sta_003",
    nom: "S/S AIN OUDA",
    societe_id: "soc_001",
    gerant_id: "ger_003", 
    latitude: 33.80042592,
    longitude: -6.836538525,
    date_mise_en_service: "2021-10-08",
    code_station: "107",
    active: true,
    created_at: "2021-10-08T00:00:00Z"
  },
  {
    id: "sta_004", 
    nom: "S/S AL HIDAYA",
    societe_id: "soc_001",
    gerant_id: "ger_004",
    latitude: 33.38754995,
    longitude: -7.793554946,
    date_mise_en_service: "2017-07-10", 
    code_station: "102",
    active: true,
    created_at: "2017-07-10T00:00:00Z"
  },
  {
    id: "sta_005",
    nom: "S/S MIMOSA",
    societe_id: "soc_001",
    gerant_id: "ger_005",
    latitude: 33.61429652,
    longitude: -7.531767111,
    date_mise_en_service: "2023-09-26",
    code_station: "108", 
    active: true,
    created_at: "2023-09-26T00:00:00Z"
  },
  {
    id: "sta_006",
    nom: "S/S ZENATA",
    societe_id: "soc_001",
    gerant_id: "ger_006",
    latitude: 33.66339951,
    longitude: -7.435516092,
    date_mise_en_service: "2018-12-03",
    code_station: "103",
    active: true,
    created_at: "2018-12-03T00:00:00Z"
  },
  {
    id: "sta_007",
    nom: "S/S AL FAJR", 
    societe_id: "soc_001",
    gerant_id: "ger_007",
    latitude: 33.67001598,
    longitude: -7.252036098,
    date_mise_en_service: "2015-07-23",
    code_station: "101",
    active: true,
    created_at: "2015-07-23T00:00:00Z"
  },
  {
    id: "sta_008",
    nom: "S/S WIFAK",
    societe_id: "soc_003", 
    gerant_id: "ger_008",
    latitude: 33.603112,
    longitude: -7.596321,
    code_station: "501",
    active: true,
    created_at: "2020-01-01T00:00:00Z"
  }
];

export const mockFamillesArticles: FamilleArticle[] = [
  {
    id: "fam_001",
    nom: "Lubrifiants Moteur",
    code_famille: "LUB_MOT",
    description: "Huiles et lubrifiants pour moteurs",
    active: true,
    created_at: "2024-01-15T10:00:00Z",
    couleur_theme: "#FF6B35",
    icone: "Wrench",
    taux_tva_defaut: 20,
    compte_comptable: "3140001"
  },
  {
    id: "fam_002",
    nom: "Produits d'Entretien",
    code_famille: "ENT",
    description: "Produits de nettoyage et d'entretien",
    active: true,
    created_at: "2024-01-10T14:30:00Z",
    couleur_theme: "#4ECDC4",
    icone: "Sparkles",
    taux_tva_defaut: 20,
    compte_comptable: "3140002"
  },
  {
    id: "fam_003",
    nom: "Accessoires Auto",
    code_famille: "ACC_AUTO",
    description: "Accessoires et pièces automobiles",
    active: true,
    created_at: "2024-01-05T09:15:00Z",
    couleur_theme: "#45B7D1",
    icone: "Car",
    taux_tva_defaut: 20,
    compte_comptable: "3140003"
  }
];

export const mockArticles: Article[] = [
  {
    id: "art_001",
    nom: "Huile Moteur 5W40",
    code_article: "HM_5W40_001",
    famille_article_id: "fam_001",
    prix_unitaire: 85.50,
    unite_mesure: "litre",
    description: "Huile moteur synthétique 5W40 haute performance",
    active: true,
    created_at: "2024-01-15T11:00:00Z",
    prix_achat: 62.30,
    marge_beneficiaire: 37.24,
    stock_minimum: 50,
    stock_actuel: 245,
    fournisseur_principal: "Total Maroc",
    code_barre: "3760234567890"
  },
  {
    id: "art_002",
    nom: "Liquide Lave-Glace",
    code_article: "LG_001",
    famille_article_id: "fam_002",
    prix_unitaire: 12.00,
    unite_mesure: "litre",
    description: "Liquide lave-glace concentré",
    active: true,
    created_at: "2024-01-12T16:20:00Z",
    prix_achat: 8.40,
    marge_beneficiaire: 42.86,
    stock_minimum: 100,
    stock_actuel: 180,
    fournisseur_principal: "ChemClean",
    code_barre: "3760234567891"
  },
  {
    id: "art_003",
    nom: "Filtre à Air",
    code_article: "FA_UNIV_001",
    famille_article_id: "fam_003",
    prix_unitaire: 35.00,
    unite_mesure: "pièce",
    description: "Filtre à air universel pour véhicules légers",
    active: true,
    created_at: "2024-01-08T13:45:00Z",
    prix_achat: 22.50,
    marge_beneficiaire: 55.56,
    stock_minimum: 25,
    stock_actuel: 67,
    fournisseur_principal: "AutoParts Maroc",
    code_barre: "3760234567892"
  }
];

export const mockIndicesCarburants: IndiceCarburant[] = [
  {
    id: "ind_001",
    nom: "Indice Gasoil Casablanca",
    type_carburant: "gasoil",
    valeur_indice: 14.25,
    date_application: "2024-01-15",
    source: "Ministère de l'Énergie",
    active: true,
    created_at: "2024-01-15T08:00:00Z",
    valeur_precedente: 14.18,
    variation_pourcentage: 0.49,
    frequence_mise_a_jour: "hebdomadaire",
    methode_calcul: "Prix Platts + taxes + marge distribution",
    commentaires: "Légère hausse due à l'augmentation des cours internationaux"
  },
  {
    id: "ind_002",
    nom: "Indice SSP Rabat",
    type_carburant: "ssp",
    valeur_indice: 15.80,
    date_application: "2024-01-15",
    source: "Ministère de l'Énergie",
    active: true,
    created_at: "2024-01-15T08:00:00Z",
    valeur_precedente: 15.75,
    variation_pourcentage: 0.32,
    frequence_mise_a_jour: "hebdomadaire",
    methode_calcul: "Prix Platts + taxes + marge distribution",
    commentaires: "Stabilité relative des prix"
  },
  {
    id: "ind_003",
    nom: "Indice Mixte National",
    type_carburant: "mixte",
    valeur_indice: 15.02,
    date_application: "2024-01-15",
    source: "Ministère de l'Énergie",
    active: true,
    created_at: "2024-01-15T08:00:00Z",
    valeur_precedente: 14.96,
    variation_pourcentage: 0.40,
    frequence_mise_a_jour: "quotidien",
    methode_calcul: "Moyenne pondérée Gasoil/SSP",
    commentaires: "Indice composite basé sur la consommation nationale"
  }
];

export const mockCategoriesDepenses: CategorieDepense[] = [
  {
    id: "cat_001",
    nom: "Maintenance Équipements",
    code_categorie: "MAINT_EQ",
    type_depense: "variable",
    compte_comptable: "6152001",
    description: "Frais de maintenance et réparation des équipements",
    active: true,
    created_at: "2024-01-10T09:00:00Z",
    budget_mensuel: 8500,
    seuil_alerte: 7000,
    responsable: "Chef de maintenance",
    autorisation_requise: true,
    niveau_autorisation: "manager"
  },
  {
    id: "cat_002",
    nom: "Salaires et Charges",
    code_categorie: "SAL_CHAR",
    type_depense: "fixe",
    compte_comptable: "6411001",
    description: "Salaires du personnel et charges sociales",
    active: true,
    created_at: "2024-01-05T08:30:00Z",
    budget_mensuel: 45000,
    seuil_alerte: 48000,
    responsable: "Responsable RH",
    autorisation_requise: true,
    niveau_autorisation: "direction"
  },
  {
    id: "cat_003",
    nom: "Marketing et Publicité",
    code_categorie: "MARK_PUB",
    type_depense: "variable",
    compte_comptable: "6231001",
    description: "Frais de marketing, publicité et communication",
    active: true,
    created_at: "2024-01-08T11:15:00Z",
    budget_mensuel: 3200,
    seuil_alerte: 4000,
    responsable: "Responsable Commercial",
    autorisation_requise: false,
    niveau_autorisation: "gerant"
  },
  {
    id: "cat_004",
    nom: "Assurances",
    code_categorie: "ASSUR",
    type_depense: "fixe",
    compte_comptable: "6162001",
    description: "Primes d'assurance diverses",
    active: false,
    created_at: "2024-01-03T14:20:00Z",
    budget_mensuel: 2800,
    seuil_alerte: 3000,
    responsable: "Gestionnaire",
    autorisation_requise: true,
    niveau_autorisation: "direction"
  }
];

export const mockTypesCharges: TypeCharge[] = [
  {
    id: "tc_001",
    nom: "Charges Opérationnelles",
    code: "OP",
    type: "charge",
    compte_comptable: "600000",
    description: "Charges liées à l'exploitation courante",
    active: true,
    created_at: "2024-01-01T00:00:00Z",
    couleur_theme: "#FF6B35"
  },
  {
    id: "tc_002",
    nom: "Produits de Vente",
    code: "PV",
    type: "produit",
    compte_comptable: "700000",
    description: "Revenus générés par les ventes",
    active: true,
    created_at: "2024-01-01T00:00:00Z",
    couleur_theme: "#4ECDC4"
  },
  {
    id: "tc_003",
    nom: "Charges Exceptionnelles",
    code: "EX",
    type: "charge",
    compte_comptable: "670000",
    description: "Charges non récurrentes",
    active: true,
    created_at: "2024-01-01T00:00:00Z",
    couleur_theme: "#E74C3C"
  }
];

// 💰 MOUVEMENTS DÉPENSES CONSOLIDÉS (intégration des données détaillées)
export const mockMouvementsDepenses: MouvementDepense[] = [
  // Mouvements existants
  {
    id: "mov_001",
    type: "depense",
    categorie_id: "cat_001",
    description: "Réparation compresseur station A",
    montant: 2500,
    date_mouvement: "2024-01-15",
    station_id: "sta_001",
    societe_id: "soc_001",
    mode_paiement: "virement",
    numero_piece: "FAC-2024-001",
    created_by: "user_001",
    created_at: "2024-01-15T10:30:00Z"
  },
  {
    id: "mov_002",
    type: "recette",
    categorie_id: "cat_002",
    description: "Vente carburant - Semaine 3",
    montant: 15000,
    date_mouvement: "2024-01-20",
    station_id: "sta_001",
    societe_id: "soc_001",
    mode_paiement: "espece",
    created_by: "user_001",
    created_at: "2024-01-20T16:45:00Z"
  },
  
  // 🆕 NOUVEAUX MOUVEMENTS basés sur les rapports détaillés CALIFORNIE/INARA
  // S/S RAHMA II (ex-CALIFORNIE) - Rapport du 15/01/2024
  {
    id: "mov_rahma_001",
    type: "recette",
    categorie_id: "cat_002",
    description: "Ventes carburant comptant - SSP",
    montant: 198764.00,
    date_mouvement: "2024-01-15",
    station_id: "sta_001", // S/S RAHMA II
    societe_id: "soc_001",
    mode_paiement: "espece",
    numero_piece: "VTE-RAHMA-150124-001",
    created_by: "ger_001",
    created_at: "2024-01-15T18:30:00Z"
  },
  {
    id: "mov_rahma_002",
    type: "recette",
    categorie_id: "cat_002",
    description: "Ventes carburant comptant - Gasoil 10ppm",
    montant: 226076.25,
    date_mouvement: "2024-01-15",
    station_id: "sta_001",
    societe_id: "soc_001",
    mode_paiement: "espece",
    numero_piece: "VTE-RAHMA-150124-002",
    created_by: "ger_001",
    created_at: "2024-01-15T18:35:00Z"
  },
  {
    id: "mov_rahma_003",
    type: "recette",
    categorie_id: "cat_002",
    description: "Ventes carburant crédit - Transport Al Maghrib SARL",
    montant: 39500.00,
    date_mouvement: "2024-01-15",
    station_id: "sta_001",
    societe_id: "soc_001",
    mode_paiement: "virement",
    numero_piece: "VTE-CREDIT-150124-001",
    created_by: "ger_001",
    created_at: "2024-01-15T19:00:00Z"
  },
  {
    id: "mov_rahma_004",
    type: "recette",
    categorie_id: "cat_002",
    description: "Ventes lubrifiants et accessoires",
    montant: 1606.00, // 1026 + 300 + 280
    date_mouvement: "2024-01-15",
    station_id: "sta_001",
    societe_id: "soc_001",
    mode_paiement: "espece",
    numero_piece: "VTE-LUB-150124-001",
    created_by: "ger_001",
    created_at: "2024-01-15T19:15:00Z"
  },
  
  // S/S FLORIDA (ex-INARA) - Rapport du 15/01/2024
  {
    id: "mov_florida_001",
    type: "recette",
    categorie_id: "cat_002",
    description: "Ventes carburant comptant - SSP",
    montant: 225150.00,
    date_mouvement: "2024-01-15",
    station_id: "sta_002", // S/S FLORIDA
    societe_id: "soc_001",
    mode_paiement: "espece",
    numero_piece: "VTE-FLORIDA-150124-001",
    created_by: "ger_002",
    created_at: "2024-01-15T18:30:00Z"
  },
  {
    id: "mov_florida_002",
    type: "recette",
    categorie_id: "cat_002",
    description: "Ventes carburant comptant - Gasoil 10ppm",
    montant: 241965.00,
    date_mouvement: "2024-01-15",
    station_id: "sta_002",
    societe_id: "soc_001",
    mode_paiement: "espece",
    numero_piece: "VTE-FLORIDA-150124-002",
    created_by: "ger_002",
    created_at: "2024-01-15T18:35:00Z"
  },
  {
    id: "mov_florida_003",
    type: "recette",
    categorie_id: "cat_002",
    description: "Ventes lubrifiants et accessoires premium",
    montant: 2709.00, // 1539 + 270 + 900
    date_mouvement: "2024-01-15",
    station_id: "sta_002",
    societe_id: "soc_001",
    mode_paiement: "espece",
    numero_piece: "VTE-LUB-FLORIDA-150124-001",
    created_by: "ger_002",
    created_at: "2024-01-15T19:15:00Z"
  },
  
  // Mouvements existants conservés
  {
    id: "mov_003",
    type: "depense",
    categorie_id: "cat_003",
    description: "Campagne publicitaire locale",
    montant: 800,
    date_mouvement: "2024-01-18",
    station_id: "sta_002",
    societe_id: "soc_001",
    mode_paiement: "cheque",
    numero_piece: "CHQ-2024-045",
    created_by: "user_002",
    created_at: "2024-01-18T14:20:00Z"
  },
  {
    id: "mov_004",
    type: "depense",
    categorie_id: "cat_002",
    description: "Salaires équipe janvier",
    montant: 35000,
    date_mouvement: "2024-01-31",
    station_id: "sta_001",
    societe_id: "soc_001",
    mode_paiement: "virement",
    numero_piece: "PAY-2024-001",
    created_by: "user_003",
    created_at: "2024-01-31T09:00:00Z"
  },
  {
    id: "mov_005",
    type: "recette",
    categorie_id: "cat_002",
    description: "Vente produits boutique",
    montant: 3200,
    date_mouvement: "2024-01-25",
    station_id: "sta_002",
    societe_id: "soc_001",
    mode_paiement: "carte",
    created_by: "user_002",
    created_at: "2024-01-25T18:30:00Z"
  }
];

export const generateExpenseAnalytics = (): ExpenseAnalytics => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const depenses = mockMouvementsDepenses.filter(m => m.type === "depense");
  const recettes = mockMouvementsDepenses.filter(m => m.type === "recette");
  
  const totalDepenses = depenses.reduce((sum, m) => sum + m.montant, 0);
  const totalRecettes = recettes.reduce((sum, m) => sum + m.montant, 0);
  
  // Generate category breakdown
  const repartitionParCategorie = mockCategoriesDepenses
    .filter(cat => cat.active)
    .map(categorie => {
      const montantCategorie = depenses
        .filter(d => d.categorie_id === categorie.id)
        .reduce((sum, d) => sum + d.montant, 0);
      
      return {
        categorie: categorie.nom,
        montant: montantCategorie,
        pourcentage: totalDepenses > 0 ? (montantCategorie / totalDepenses) * 100 : 0,
        couleur: "#FF6B35"
      };
    })
    .filter(item => item.montant > 0);

  // Generate monthly evolution (last 3 months) - données réalistes basées sur les rapports
  const evolutionMensuelle = [
    {
      mois: "Nov 2023",
      depenses: 45000,
      recettes: 620000,
      resultat: 575000
    },
    {
      mois: "Déc 2023",
      depenses: 48000,
      recettes: 680000,
      resultat: 632000
    },
    {
      mois: "Jan 2024",
      depenses: totalDepenses,
      recettes: totalRecettes,
      resultat: totalRecettes - totalDepenses
    }
  ];

  // Top expenses
  const topDepenses = depenses
    .sort((a, b) => b.montant - a.montant)
    .slice(0, 5)
    .map(depense => ({
      description: depense.description,
      montant: depense.montant,
      categorie: mockCategoriesDepenses.find(c => c.id === depense.categorie_id)?.nom || "N/A",
      date: depense.date_mouvement
    }));

  return {
    total_depenses_mois: totalDepenses,
    total_recettes_mois: totalRecettes,
    resultat_net: totalRecettes - totalDepenses,
    repartition_par_categorie: repartitionParCategorie,
    evolution_mensuelle: evolutionMensuelle,
    top_depenses: topDepenses
  };
};
