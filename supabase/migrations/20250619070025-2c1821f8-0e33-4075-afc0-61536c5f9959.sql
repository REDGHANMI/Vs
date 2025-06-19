
-- Étape 3: Insertion des encaissements pour les rapports créés
WITH report_ids AS (
  SELECT uuid, doc_entry, ROW_NUMBER() OVER (PARTITION BY doc_entry ORDER BY created_at DESC) as rn
  FROM rapports_stations 
  WHERE doc_entry IN ('22400', '22401', '22402', '25714', '25715', '25716', '25717', '25718', '25719')
)
INSERT INTO encaissements (
  rapport_uuid, type_paiement, montant, pourcentage, nb_transactions
) 
SELECT rapport_uuid, type_paiement, montant, pourcentage, nb_transactions
FROM (
  VALUES
  -- Encaissements pour S/S RAHMA II - Rapport 22400
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22400' AND rn = 1), 'espece', 32018.87, 50.0, 45),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22400' AND rn = 1), 'carte', 25615.09, 40.0, 32),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22400' AND rn = 1), 'credit', 6403.77, 10.0, 8),

  -- Encaissements pour S/S RAHMA II - Rapport 22401
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22401' AND rn = 1), 'espece', 35911.72, 50.0, 48),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22401' AND rn = 1), 'carte', 28729.38, 40.0, 35),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22401' AND rn = 1), 'credit', 7182.34, 10.0, 9),

  -- Encaissements pour S/S RAHMA II - Rapport 22402
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22402' AND rn = 1), 'espece', 29698.30, 50.0, 42),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22402' AND rn = 1), 'carte', 23758.64, 40.0, 28),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '22402' AND rn = 1), 'credit', 5939.66, 10.0, 7),

  -- Encaissements pour S/S MIMOSA - Rapport 25714
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25714' AND rn = 1), 'espece', 29105.03, 50.0, 38),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25714' AND rn = 1), 'carte', 23284.02, 40.0, 25),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25714' AND rn = 1), 'credit', 5821.00, 10.0, 6),

  -- Encaissements pour S/S MIMOSA - Rapport 25715
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25715' AND rn = 1), 'espece', 30811.06, 50.0, 41),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25715' AND rn = 1), 'carte', 24648.85, 40.0, 29),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25715' AND rn = 1), 'credit', 6162.21, 10.0, 8),

  -- Encaissements pour S/S MIMOSA - Rapport 25716
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25716' AND rn = 1), 'espece', 30525.22, 50.0, 39),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25716' AND rn = 1), 'carte', 24420.18, 40.0, 27),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25716' AND rn = 1), 'credit', 6105.04, 10.0, 7),

  -- Encaissements pour S/S HAY INARA - Rapport 25717
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25717' AND rn = 1), 'espece', 64604.86, 50.0, 62),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25717' AND rn = 1), 'carte', 51683.88, 40.0, 48),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25717' AND rn = 1), 'credit', 12920.97, 10.0, 15),

  -- Encaissements pour S/S HAY INARA - Rapport 25718
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25718' AND rn = 1), 'espece', 60356.49, 50.0, 58),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25718' AND rn = 1), 'carte', 48285.19, 40.0, 44),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25718' AND rn = 1), 'credit', 12071.29, 10.0, 13),

  -- Encaissements pour S/S HAY INARA - Rapport 25719
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25719' AND rn = 1), 'espece', 50413.43, 50.0, 55),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25719' AND rn = 1), 'carte', 40330.74, 40.0, 41),
  ((SELECT uuid FROM report_ids WHERE doc_entry = '25719' AND rn = 1), 'credit', 10082.68, 10.0, 12)
) AS encaissements_data(rapport_uuid, type_paiement, montant, pourcentage, nb_transactions);
