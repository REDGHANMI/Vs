
-- Étape 2: Insertion des stocks citernes pour les rapports créés
-- Utilisons une approche avec des variables temporaires pour éviter les subqueries multiples

WITH report_ids AS (
  SELECT uuid, doc_entry, ROW_NUMBER() OVER (PARTITION BY doc_entry ORDER BY created_at DESC) as rn
  FROM rapports_stations 
  WHERE doc_entry IN ('22400', '22401', '22402', '25714', '25715', '25716', '25717', '25718', '25719')
)
INSERT INTO stocks_citernes (
  rapport_uuid, produit, stock_debut, livraisons, ventes, stock_fin, 
  stock_theorique, ecart, capacite_max, pourcentage_remplissage,
  designation_produit, code_produit, jauge_initiale, jauge_finale
) 
SELECT rapport_uuid, produit, stock_debut, livraisons, ventes, stock_fin, 
       stock_theorique, ecart, capacite_max, pourcentage_remplissage,
       designation_produit, code_produit, jauge_initiale, jauge_finale
FROM (
  VALUES
  -- Stocks pour S/S RAHMA II - Rapport 22400
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22400' AND rn = 1), 'GASOIL', 8500, 0, 5420, 3080, 3080, 0, 30000, 10.27, 'GASOIL ORDINAIRE', 'GAZ001', 850, 308),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22400' AND rn = 1), 'SUPER', 4200, 0, 529, 3671, 3671, 0, 20000, 18.36, 'SUPER SANS PLOMB', 'SSP001', 420, 367),

  -- Stocks pour S/S RAHMA II - Rapport 22401
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22401' AND rn = 1), 'GASOIL', 3080, 15000, 5838, 12242, 12242, 0, 30000, 40.81, 'GASOIL ORDINAIRE', 'GAZ001', 308, 1224),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22401' AND rn = 1), 'SUPER', 3671, 0, 529, 3142, 3142, 0, 20000, 15.71, 'SUPER SANS PLOMB', 'SSP001', 367, 314),

  -- Stocks pour S/S RAHMA II - Rapport 22402
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22402' AND rn = 1), 'GASOIL', 12242, 0, 4761, 7481, 7481, 0, 30000, 24.94, 'GASOIL ORDINAIRE', 'GAZ001', 1224, 748),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22402' AND rn = 1), 'SUPER', 3142, 0, 529, 2613, 2613, 0, 20000, 13.07, 'SUPER SANS PLOMB', 'SSP001', 314, 261),

  -- Stocks pour S/S MIMOSA - Rapport 25714
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25714' AND rn = 1), 'GASOIL', 7200, 0, 4734, 2466, 2466, 0, 25000, 9.86, 'GASOIL ORDINAIRE', 'GAZ001', 720, 247),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25714' AND rn = 1), 'SUPER', 3800, 0, 529, 3271, 3271, 0, 18000, 18.17, 'SUPER SANS PLOMB', 'SSP001', 380, 327),

  -- Stocks pour S/S MIMOSA - Rapport 25715
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25715' AND rn = 1), 'GASOIL', 2466, 12000, 5166, 9300, 9300, 0, 25000, 37.20, 'GASOIL ORDINAIRE', 'GAZ001', 247, 930),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25715' AND rn = 1), 'SUPER', 3271, 0, 529, 2742, 2742, 0, 18000, 15.23, 'SUPER SANS PLOMB', 'SSP001', 327, 274),

  -- Stocks pour S/S MIMOSA - Rapport 25716
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25716' AND rn = 1), 'GASOIL', 9300, 0, 5099, 4201, 4201, 0, 25000, 16.80, 'GASOIL ORDINAIRE', 'GAZ001', 930, 420),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25716' AND rn = 1), 'SUPER', 2742, 0, 529, 2213, 2213, 0, 18000, 12.29, 'SUPER SANS PLOMB', 'SSP001', 274, 221),

  -- Stocks pour S/S HAY INARA - Rapport 25717
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25717' AND rn = 1), 'GASOIL', 15000, 0, 11857, 3143, 3143, 0, 60000, 5.24, 'GASOIL ORDINAIRE', 'GAZ001', 1500, 314),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25717' AND rn = 1), 'SUPER', 8000, 0, 529, 7471, 7471, 0, 35000, 21.35, 'SUPER SANS PLOMB', 'SSP001', 800, 747),

  -- Stocks pour S/S HAY INARA - Rapport 25718
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25718' AND rn = 1), 'GASOIL', 3143, 25000, 10593, 17550, 17550, 0, 60000, 29.25, 'GASOIL ORDINAIRE', 'GAZ001', 314, 1755),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25718' AND rn = 1), 'SUPER', 7471, 0, 529, 6942, 6942, 0, 35000, 19.83, 'SUPER SANS PLOMB', 'SSP001', 747, 694),

  -- Stocks pour S/S HAY INARA - Rapport 25719
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25719' AND rn = 1), 'GASOIL', 17550, 0, 9991, 7559, 7559, 0, 60000, 12.60, 'GASOIL ORDINAIRE', 'GAZ001', 1755, 756),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25719' AND rn = 1), 'SUPER', 6942, 0, 529, 6413, 6413, 0, 35000, 18.32, 'SUPER SANS PLOMB', 'SSP001', 694, 641)
) AS stocks_data(rapport_uuid, produit, stock_debut, livraisons, ventes, stock_fin, stock_theorique, ecart, capacite_max, pourcentage_remplissage, designation_produit, code_produit, jauge_initiale, jauge_finale);
