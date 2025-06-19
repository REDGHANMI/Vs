
-- Étape 1: Insertion des rapports de stations de base
-- D'abord, créons la station HAY INARA si elle n'existe pas
INSERT INTO stations (nom, societe_id, gerant_id, latitude, longitude, date_mise_en_service, code_station, active, adresse_complete, ville, region, nombre_pistons, capacite_stockage_gasoil, capacite_stockage_ssp, statut_operationnel)
SELECT 'S/S HAY INARA', 
       s.id,
       g.id,
       33.5731, -7.5898, 
       '2023-01-01'::date, 
       'INARA001', 
       true, 
       'Hay Inara, Casablanca', 
       'Casablanca', 
       'Casablanca-Settat', 
       8, 60000, 35000, 
       'operationnel'
FROM (SELECT id FROM societes WHERE nom LIKE '%AFRIQUIA%' LIMIT 1) s,
     (SELECT id FROM gerants WHERE nom_complet LIKE '%ASKRI%' LIMIT 1) g
WHERE NOT EXISTS (SELECT 1 FROM stations WHERE nom = 'S/S HAY INARA');

-- Maintenant, insérons les rapports de stations
INSERT INTO rapports_stations (
  station_uuid, doc_entry, date_rapport, gerant_nom, 
  total_ca, total_tonnage, numero_rapport, heure_creation,
  total_vente_comptant, total_vente_credit, total_non_carburant, statut
) VALUES
-- S/S RAHMA II (3 rapports)
((SELECT id FROM stations WHERE nom = 'S/S RAHMA II' LIMIT 1), '22400', '2025-06-12 09:06:00+00'::timestamptz, 'Mr.BYDAT SAID', 64037.73, 5949, '1101000158', '906', 50228.73, 232.73, 361.8, 'complet'),
((SELECT id FROM stations WHERE nom = 'S/S RAHMA II' LIMIT 1), '22401', '2025-06-11 08:53:00+00'::timestamptz, 'Mr.BYDAT SAID', 71823.44, 6367, '1101000159', '853', 59574.44, 0, 1183.15, 'complet'),
((SELECT id FROM stations WHERE nom = 'S/S RAHMA II' LIMIT 1), '22402', '2025-06-10 08:53:00+00'::timestamptz, 'Mr.BYDAT SAID', 59396.6, 5290, '1101000160', '853', 52854.71, 41.63, 584.4, 'complet'),

-- S/S MIMOSA (3 rapports)  
((SELECT id FROM stations WHERE nom = 'S/S MIMOSA' LIMIT 1), '25714', '2025-06-12 09:10:00+00'::timestamptz, 'Mr.ASGHARF BRAHIM', 58210.05, 5263, '500101159', '910', 40577.05, 51.14, 491.1, 'complet'),
((SELECT id FROM stations WHERE nom = 'S/S MIMOSA' LIMIT 1), '25715', '2025-06-11 09:28:00+00'::timestamptz, 'Mr.ASGHARF BRAHIM', 61622.12, 5695, '500101160', '928', 47647.12, 132.20, 228.75, 'complet'),
((SELECT id FROM stations WHERE nom = 'S/S MIMOSA' LIMIT 1), '25716', '2025-06-10 09:24:00+00'::timestamptz, 'Mr.ASGHARF BRAHIM', 61050.44, 5628, '500101161', '924', 44260.44, 212.14, 1212.95, 'complet'),

-- S/S HAY INARA (3 rapports)
((SELECT id FROM stations WHERE nom = 'S/S HAY INARA' LIMIT 1), '25717', '2025-06-12 09:21:00+00'::timestamptz, 'Mr.ILYASS LAMZABI', 129209.71, 12386, '500101162', '921', 92943.71, 738.35, 689.65, 'complet'),
((SELECT id FROM stations WHERE nom = 'S/S HAY INARA' LIMIT 1), '25718', '2025-06-11 08:58:00+00'::timestamptz, 'Mr.ILYASS LAMZABI', 120712.97, 11122, '500101163', '858', 91844.97, 131.82, 330.65, 'complet'),
((SELECT id FROM stations WHERE nom = 'S/S HAY INARA' LIMIT 1), '25719', '2025-06-10 09:02:00+00'::timestamptz, 'Mr.ILYASS LAMZABI', 100826.85, 10520, '500101164', '902', 76141.85, 1420.45, 819.15, 'complet');
