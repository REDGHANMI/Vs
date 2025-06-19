
-- Insérer des données de ventes pour les rapports existants
INSERT INTO ventes_produits (rapport_uuid, produit_nom, produit_code, quantite, prix_unitaire, valeur_totale, type_vente, famille_produit, categorie, client_nom) VALUES
-- Pour le rapport e3b064ef-3a5f-47fd-8455-0333f947ce79 (HAY INARA 04/06/2025)
('e3b064ef-3a5f-47fd-8455-0333f947ce79', 'Gasoil', 'GAZ', 8500, 14.20, 120700, 'comptant', 'carburant', 'carburant', NULL),
('e3b064ef-3a5f-47fd-8455-0333f947ce79', 'Super Sans Plomb', 'SSP', 4200, 15.80, 66360, 'comptant', 'carburant', 'carburant', NULL),
('e3b064ef-3a5f-47fd-8455-0333f947ce79', 'Gasoil Crédit', 'GAZ', 1500, 14.20, 21300, 'credit', 'carburant', 'carburant', 'SOCIETE ABC'),
('e3b064ef-3a5f-47fd-8455-0333f947ce79', 'Huile Moteur', 'HM001', 25, 120.00, 3000, 'comptant', 'non_carburant', 'lubrifiant', NULL),
('e3b064ef-3a5f-47fd-8455-0333f947ce79', 'Accessoires Auto', 'ACC001', 15, 80.00, 1200, 'comptant', 'non_carburant', 'accessoire', NULL),

-- Pour le rapport 6e334e3b-9e53-43e4-accb-166a8ea505f0 (HAY INARA 03/06/2025)
('6e334e3b-9e53-43e4-accb-166a8ea505f0', 'Gasoil', 'GAZ', 9200, 14.20, 130640, 'comptant', 'carburant', 'carburant', NULL),
('6e334e3b-9e53-43e4-accb-166a8ea505f0', 'Super Sans Plomb', 'SSP', 4800, 15.80, 75840, 'comptant', 'carburant', 'carburant', NULL),
('6e334e3b-9e53-43e4-accb-166a8ea505f0', 'Gasoil Crédit', 'GAZ', 1200, 14.20, 16960, 'credit', 'carburant', 'carburant', 'TRANSPORT SARL'),
('6e334e3b-9e53-43e4-accb-166a8ea505f0', 'Huile Moteur', 'HM001', 18, 120.00, 2160, 'comptant', 'non_carburant', 'lubrifiant', NULL);

-- Insérer des données d'encaissements
INSERT INTO encaissements (rapport_uuid, type_paiement, montant, pourcentage, nb_transactions) VALUES
-- Pour le rapport e3b064ef-3a5f-47fd-8455-0333f947ce79
('e3b064ef-3a5f-47fd-8455-0333f947ce79', 'espece', 89500.50, 61.4, 245),
('e3b064ef-3a5f-47fd-8455-0333f947ce79', 'carte', 56932.72, 39.1, 156),
('e3b064ef-3a5f-47fd-8455-0333f947ce79', 'credit', 21300.00, 14.6, 8),
('e3b064ef-3a5f-47fd-8455-0333f947ce79', 'cheque', 2400.00, 1.6, 3),

-- Pour le rapport 6e334e3b-9e53-43e4-accb-166a8ea505f0
('6e334e3b-9e53-43e4-accb-166a8ea505f0', 'espece', 102300.25, 63.1, 267),
('6e334e3b-9e53-43e4-accb-166a8ea505f0', 'carte', 58558.19, 36.1, 178),
('6e334e3b-9e53-43e4-accb-166a8ea505f0', 'credit', 16960.00, 10.5, 6),
('6e334e3b-9e53-43e4-accb-166a8ea505f0', 'cheque', 1800.00, 1.1, 2);

-- Insérer des données de stocks de citernes
INSERT INTO stocks_citernes (rapport_uuid, produit, designation_produit, code_produit, stock_debut, livraisons, ventes, stock_fin, stock_theorique, ecart, capacite_max, pourcentage_remplissage, jauge_initiale, jauge_finale, variation) VALUES
-- Pour le rapport e3b064ef-3a5f-47fd-8455-0333f947ce79
('e3b064ef-3a5f-47fd-8455-0333f947ce79', 'Gasoil', 'Gasoil Ordinaire', 'GAZ', 25000, 15000, 10000, 30000, 30200, -200, 50000, 60.0, 25000, 30000, 5000),
('e3b064ef-3a5f-47fd-8455-0333f947ce79', 'Super Sans Plomb', 'Super Sans Plomb 95', 'SSP', 18000, 8000, 4200, 21800, 21950, -150, 35000, 62.3, 18000, 21800, 3800),

-- Pour le rapport 6e334e3b-9e53-43e4-accb-166a8ea505f0
('6e334e3b-9e53-43e4-accb-166a8ea505f0', 'Gasoil', 'Gasoil Ordinaire', 'GAZ', 22000, 18000, 9200, 30800, 30900, -100, 50000, 61.6, 22000, 30800, 8800),
('6e334e3b-9e53-43e4-accb-166a8ea505f0', 'Super Sans Plomb', 'Super Sans Plomb 95', 'SSP', 16500, 12000, 4800, 23700, 23850, -150, 35000, 67.7, 16500, 23700, 7200);

-- Créer des îlots pour la station HAY INARA si ils n'existent pas
INSERT INTO ilots (station_id, numero_ilot, nom_ilot, nombre_pistons) 
SELECT '80f08cea-046e-4651-a515-b3af96dd6ebc', 1, 'Ilot 1', 4
WHERE NOT EXISTS (SELECT 1 FROM ilots WHERE station_id = '80f08cea-046e-4651-a515-b3af96dd6ebc' AND numero_ilot = 1);

INSERT INTO ilots (station_id, numero_ilot, nom_ilot, nombre_pistons) 
SELECT '80f08cea-046e-4651-a515-b3af96dd6ebc', 2, 'Ilot 2', 4
WHERE NOT EXISTS (SELECT 1 FROM ilots WHERE station_id = '80f08cea-046e-4651-a515-b3af96dd6ebc' AND numero_ilot = 2);

-- Créer des volucompteurs pour les îlots
WITH ilot_ids AS (
  SELECT id, numero_ilot FROM ilots WHERE station_id = '80f08cea-046e-4651-a515-b3af96dd6ebc'
)
INSERT INTO volucompteurs (station_id, ilot_id, code_volucompteur, produit_nom, produit_code, prix_unitaire, index_courant, statut)
SELECT 
  '80f08cea-046e-4651-a515-b3af96dd6ebc',
  i.id,
  'VC' || i.numero_ilot || '-GAZ',
  'Gasoil',
  'GAZ',
  14.20,
  125000,
  'operationnel'
FROM ilot_ids i
WHERE NOT EXISTS (
  SELECT 1 FROM volucompteurs 
  WHERE station_id = '80f08cea-046e-4651-a515-b3af96dd6ebc' 
  AND code_volucompteur = 'VC' || i.numero_ilot || '-GAZ'
);

WITH ilot_ids AS (
  SELECT id, numero_ilot FROM ilots WHERE station_id = '80f08cea-046e-4651-a515-b3af96dd6ebc'
)
INSERT INTO volucompteurs (station_id, ilot_id, code_volucompteur, produit_nom, produit_code, prix_unitaire, index_courant, statut)
SELECT 
  '80f08cea-046e-4651-a515-b3af96dd6ebc',
  i.id,
  'VC' || i.numero_ilot || '-SSP',
  'Super Sans Plomb',
  'SSP',
  15.80,
  89000,
  'operationnel'
FROM ilot_ids i
WHERE NOT EXISTS (
  SELECT 1 FROM volucompteurs 
  WHERE station_id = '80f08cea-046e-4651-a515-b3af96dd6ebc' 
  AND code_volucompteur = 'VC' || i.numero_ilot || '-SSP'
);

-- Lier quelques ventes aux volucompteurs pour l'onglet inventaire
UPDATE ventes_produits 
SET volucompteur_id = (
  SELECT id FROM volucompteurs 
  WHERE station_id = '80f08cea-046e-4651-a515-b3af96dd6ebc' 
  AND produit_code = 'GAZ' 
  LIMIT 1
)
WHERE rapport_uuid IN ('e3b064ef-3a5f-47fd-8455-0333f947ce79', '6e334e3b-9e53-43e4-accb-166a8ea505f0') 
AND produit_code = 'GAZ' 
AND famille_produit = 'carburant';

UPDATE ventes_produits 
SET volucompteur_id = (
  SELECT id FROM volucompteurs 
  WHERE station_id = '80f08cea-046e-4651-a515-b3af96dd6ebc' 
  AND produit_code = 'SSP' 
  LIMIT 1
)
WHERE rapport_uuid IN ('e3b064ef-3a5f-47fd-8455-0333f947ce79', '6e334e3b-9e53-43e4-accb-166a8ea505f0') 
AND produit_code = 'SSP' 
AND famille_produit = 'carburant';
