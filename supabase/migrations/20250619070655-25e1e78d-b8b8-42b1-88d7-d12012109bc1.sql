
-- Étape 4: Insertion des ventes de produits pour les rapports créés (corrigée avec bonnes catégories)
WITH report_ids AS (
  SELECT uuid, doc_entry, ROW_NUMBER() OVER (PARTITION BY doc_entry ORDER BY created_at DESC) as rn
  FROM rapports_stations 
  WHERE doc_entry IN ('22400', '22401', '22402', '25714', '25715', '25716', '25717', '25718', '25719')
)
INSERT INTO ventes_produits (
  rapport_uuid, produit_code, produit_nom, famille_produit, categorie, 
  quantite, prix_unitaire, valeur_totale, type_vente, client_nom
) 
SELECT rapport_uuid, produit_code, produit_nom, famille_produit, categorie, 
       quantite, prix_unitaire, valeur_totale, type_vente, client_nom
FROM (
  VALUES
  -- Ventes pour S/S RAHMA II - Rapport 22400
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22400' AND rn = 1), 'GAZ001', 'GASOIL ORDINAIRE', 'carburant', 'carburant', 5420, 11.80, 63956.00, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22400' AND rn = 1), 'SSP001', 'SUPER SANS PLOMB', 'carburant', 'carburant', 529, 12.50, 6612.50, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22400' AND rn = 1), 'LUB001', 'HUILE MOTEUR 5W30', 'non_carburant', 'lubrifiant', 15, 85.00, 1275.00, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22400' AND rn = 1), 'ACC001', 'FILTRES À AIR', 'non_carburant', 'accessoire', 8, 45.50, 364.00, 'comptant', NULL),

  -- Ventes pour S/S RAHMA II - Rapport 22401
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22401' AND rn = 1), 'GAZ001', 'GASOIL ORDINAIRE', 'carburant', 'carburant', 5838, 11.80, 68888.40, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22401' AND rn = 1), 'SSP001', 'SUPER SANS PLOMB', 'carburant', 'carburant', 529, 12.50, 6612.50, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22401' AND rn = 1), 'LUB002', 'HUILE HYDRAULIQUE', 'non_carburant', 'lubrifiant', 12, 95.00, 1140.00, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22401' AND rn = 1), 'SRV001', 'LAVAGE AUTO', 'non_carburant', 'service', 6, 25.00, 150.00, 'comptant', NULL),

  -- Ventes pour S/S RAHMA II - Rapport 22402
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22402' AND rn = 1), 'GAZ001', 'GASOIL ORDINAIRE', 'carburant', 'carburant', 4761, 11.80, 56179.80, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22402' AND rn = 1), 'SSP001', 'SUPER SANS PLOMB', 'carburant', 'carburant', 529, 12.50, 6612.50, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22402' AND rn = 1), 'BTQ001', 'BOISSONS FRAÎCHES', 'non_carburant', 'accessoire', 25, 8.50, 212.50, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22402' AND rn = 1), 'ACC002', 'PNEUS 185/65R15', 'non_carburant', 'accessoire', 2, 420.00, 840.00, 'credit', 'GARAGE ATLAS'),

  -- Ventes pour S/S MIMOSA - Rapport 25714
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25714' AND rn = 1), 'GAZ001', 'GASOIL ORDINAIRE', 'carburant', 'carburant', 4734, 11.80, 55861.20, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25714' AND rn = 1), 'SSP001', 'SUPER SANS PLOMB', 'carburant', 'carburant', 529, 12.50, 6612.50, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25714' AND rn = 1), 'LUB003', 'HUILE 2 TEMPS', 'non_carburant', 'lubrifiant', 18, 65.00, 1170.00, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25714' AND rn = 1), 'BTQ002', 'SNACKS DIVERS', 'non_carburant', 'accessoire', 35, 12.00, 420.00, 'comptant', NULL),

  -- Ventes pour S/S MIMOSA - Rapport 25715
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25715' AND rn = 1), 'GAZ001', 'GASOIL ORDINAIRE', 'carburant', 'carburant', 5166, 11.80, 60958.80, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25715' AND rn = 1), 'SSP001', 'SUPER SANS PLOMB', 'carburant', 'carburant', 529, 12.50, 6612.50, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25715' AND rn = 1), 'SRV002', 'GONFLAGE PNEUS', 'non_carburant', 'service', 15, 5.00, 75.00, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25715' AND rn = 1), 'ACC003', 'BALAIS ESSUIE-GLACE', 'non_carburant', 'accessoire', 12, 45.00, 540.00, 'comptant', NULL),

  -- Ventes pour S/S MIMOSA - Rapport 25716
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25716' AND rn = 1), 'GAZ001', 'GASOIL ORDINAIRE', 'carburant', 'carburant', 5099, 11.80, 60168.20, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25716' AND rn = 1), 'SSP001', 'SUPER SANS PLOMB', 'carburant', 'carburant', 529, 12.50, 6612.50, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25716' AND rn = 1), 'LUB004', 'GRAISSE UNIVERSELLE', 'non_carburant', 'lubrifiant', 8, 35.00, 280.00, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25716' AND rn = 1), 'BTQ003', 'CAFÉ ET THÉ', 'non_carburant', 'accessoire', 45, 15.00, 675.00, 'comptant', NULL),

  -- Ventes pour S/S HAY INARA - Rapport 25717
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25717' AND rn = 1), 'GAZ001', 'GASOIL ORDINAIRE', 'carburant', 'carburant', 11857, 11.80, 139912.60, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25717' AND rn = 1), 'SSP001', 'SUPER SANS PLOMB', 'carburant', 'carburant', 529, 12.50, 6612.50, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25717' AND rn = 1), 'LUB005', 'HUILE DIESEL 15W40', 'non_carburant', 'lubrifiant', 25, 75.00, 1875.00, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25717' AND rn = 1), 'ACC004', 'BATTERIES 12V', 'non_carburant', 'accessoire', 4, 650.00, 2600.00, 'credit', 'ATELIER MÉCANIQUE'),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25717' AND rn = 1), 'SRV003', 'CONTRÔLE TECHNIQUE', 'non_carburant', 'service', 8, 120.00, 960.00, 'comptant', NULL),

  -- Ventes pour S/S HAY INARA - Rapport 25718
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25718' AND rn = 1), 'GAZ001', 'GASOIL ORDINAIRE', 'carburant', 'carburant', 10593, 11.80, 124997.40, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25718' AND rn = 1), 'SSP001', 'SUPER SANS PLOMB', 'carburant', 'carburant', 529, 12.50, 6612.50, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25718' AND rn = 1), 'BTQ004', 'TABAC ET CIGARETTES', 'non_carburant', 'accessoire', 65, 35.00, 2275.00, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25718' AND rn = 1), 'LUB006', 'ADDITIF CARBURANT', 'non_carburant', 'lubrifiant', 20, 25.00, 500.00, 'comptant', NULL),

  -- Ventes pour S/S HAY INARA - Rapport 25719
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25719' AND rn = 1), 'GAZ001', 'GASOIL ORDINAIRE', 'carburant', 'carburant', 9991, 11.80, 117893.80, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25719' AND rn = 1), 'SSP001', 'SUPER SANS PLOMB', 'carburant', 'carburant', 529, 12.50, 6612.50, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25719' AND rn = 1), 'ACC005', 'LAMPES LED H7', 'non_carburant', 'accessoire', 15, 85.00, 1275.00, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25719' AND rn = 1), 'SRV004', 'VIDANGE EXPRESS', 'non_carburant', 'service', 12, 180.00, 2160.00, 'comptant', NULL),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25719' AND rn = 1), 'BTQ005', 'PRODUITS ENTRETIEN', 'non_carburant', 'accessoire', 28, 22.50, 630.00, 'comptant', NULL)
) AS ventes_data(rapport_uuid, produit_code, produit_nom, famille_produit, categorie, quantite, prix_unitaire, valeur_totale, type_vente, client_nom);
