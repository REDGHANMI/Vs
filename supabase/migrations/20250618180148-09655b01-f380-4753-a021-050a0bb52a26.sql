
-- Insérer les rapports de stations avec les données enrichies (using proper UUIDs)
INSERT INTO public.rapports_stations (
  station_uuid, doc_entry, date_rapport, gerant_nom, 
  total_ca, total_tonnage, numero_rapport, heure_creation,
  total_vente_comptant, total_vente_credit, total_non_carburant, statut
) VALUES
-- Rapport pour S/S HAY INARA (première station disponible)
(
  (SELECT id FROM public.stations LIMIT 1),
  '22400',
  '2025-06-03T11:19:00Z',
  'Mr. ILYASS LAMZABI',
  162039.34,
  15389,
  '1101000158',
  '11:19',
  160858.44,
  8214,
  1180.90,
  'complet'
),
-- Rapport pour S/S CALIFORNIE (deuxième station disponible)
(
  (SELECT id FROM public.stations LIMIT 1 OFFSET 1),
  '25714',
  '2025-06-03T13:17:00Z',
  'YASSINE KHEIR',
  70767.32,
  6982,
  '500101159',
  '13:17',
  70563.52,
  5930,
  203.80,
  'complet'
),
-- Rapport HAY INARA jour suivant
(
  (SELECT id FROM public.stations LIMIT 1),
  '22401',
  '2025-06-04T10:45:00Z',
  'Mr. ILYASS LAMZABI',
  145789.22,
  14203,
  '1101000160',
  '10:45',
  146433.06,
  2963.76,
  950.40,
  'complet'
),
-- Rapport CALIFORNIE jour suivant
(
  (SELECT id FROM public.stations LIMIT 1 OFFSET 1),
  '25715',
  '2025-06-04T14:22:00Z',
  'YASSINE KHEIR',
  68945.18,
  6745,
  '500101160',
  '14:22',
  68945.18,
  0,
  156.25,
  'en_cours'
);

-- Insérer les stocks citernes (using generated UUIDs from the reports)
INSERT INTO public.stocks_citernes (
  rapport_uuid, produit, stock_debut, livraisons, ventes, stock_fin,
  stock_theorique, ecart, capacite_max, pourcentage_remplissage,
  code_produit, designation_produit, jauge_initiale, jauge_finale, variation
) 
SELECT 
  r.uuid as rapport_uuid,
  'SSP' as produit,
  17048 as stock_debut,
  5000 as livraisons,
  3126 as ventes,
  18922 as stock_fin,
  18922 as stock_theorique,
  0 as ecart,
  30000 as capacite_max,
  63.07 as pourcentage_remplissage,
  '008000-00' as code_produit,
  'SUPER S/PLOMB' as designation_produit,
  18988 as jauge_initiale,
  18988 as jauge_finale,
  66 as variation
FROM public.rapports_stations r 
WHERE r.numero_rapport = '1101000158'

UNION ALL

SELECT 
  r.uuid as rapport_uuid,
  'GASOIL 10ppm' as produit,
  31005 as stock_debut,
  28000 as livraisons,
  12263 as ventes,
  46742 as stock_fin,
  46742 as stock_theorique,
  0 as ecart,
  60000 as capacite_max,
  77.90 as pourcentage_remplissage,
  '008035-00' as code_produit,
  'GASOIL 10PPM' as designation_produit,
  46838 as jauge_initiale,
  46838 as jauge_finale,
  96 as variation
FROM public.rapports_stations r 
WHERE r.numero_rapport = '1101000158'

UNION ALL

SELECT 
  r.uuid as rapport_uuid,
  'SSP' as produit,
  9250 as stock_debut,
  0 as livraisons,
  1316 as ventes,
  7934 as stock_fin,
  7934 as stock_theorique,
  0 as ecart,
  20000 as capacite_max,
  39.67 as pourcentage_remplissage,
  '008000-00' as code_produit,
  'SUPER S/PLOMB' as designation_produit,
  7864 as jauge_initiale,
  7864 as jauge_finale,
  -70 as variation
FROM public.rapports_stations r 
WHERE r.numero_rapport = '500101159'

UNION ALL

SELECT 
  r.uuid as rapport_uuid,
  'GASOIL 10ppm' as produit,
  27265 as stock_debut,
  0 as livraisons,
  5666 as ventes,
  21599 as stock_fin,
  21599 as stock_theorique,
  0 as ecart,
  90000 as capacite_max,
  24.00 as pourcentage_remplissage,
  '008035-00' as code_produit,
  'GASOIL 10PPM' as designation_produit,
  21427 as jauge_initiale,
  21427 as jauge_finale,
  -172 as variation
FROM public.rapports_stations r 
WHERE r.numero_rapport = '500101159';

-- Insérer les ventes de produits
INSERT INTO public.ventes_produits (
  rapport_uuid, produit_code, produit_nom, quantite, prix_unitaire,
  valeur_totale, type_vente, famille_produit, categorie
) 
SELECT 
  r.uuid as rapport_uuid,
  '008000-00' as produit_code,
  'SUPER S/PLOMB' as produit_nom,
  3126.50 as quantite,
  12.65 as prix_unitaire,
  39550.23 as valeur_totale,
  'comptant' as type_vente,
  'carburant' as famille_produit,
  'carburant' as categorie
FROM public.rapports_stations r 
WHERE r.numero_rapport = '1101000158'

UNION ALL

SELECT 
  r.uuid as rapport_uuid,
  '008035-00' as produit_code,
  'GASOIL 10PPM' as produit_nom,
  12263.00 as quantite,
  10.56 as prix_unitaire,
  129473.28 as valeur_totale,
  'comptant' as type_vente,
  'carburant' as famille_produit,
  'carburant' as categorie
FROM public.rapports_stations r 
WHERE r.numero_rapport = '1101000158'

UNION ALL

SELECT 
  r.uuid as rapport_uuid,
  '008000-00' as produit_code,
  'SUPER S/PLOMB' as produit_nom,
  1316.21 as quantite,
  12.65 as prix_unitaire,
  16650.06 as valeur_totale,
  'comptant' as type_vente,
  'carburant' as famille_produit,
  'carburant' as categorie
FROM public.rapports_stations r 
WHERE r.numero_rapport = '500101159'

UNION ALL

SELECT 
  r.uuid as rapport_uuid,
  '008035-00' as produit_code,
  'GASOIL 10PPM' as produit_nom,
  5666.00 as quantite,
  10.56 as prix_unitaire,
  59832.96 as valeur_totale,
  'comptant' as type_vente,
  'carburant' as famille_produit,
  'carburant' as categorie
FROM public.rapports_stations r 
WHERE r.numero_rapport = '500101159';

-- Insérer les encaissements
INSERT INTO public.encaissements (
  rapport_uuid, type_paiement, montant, pourcentage, nb_transactions
) 
SELECT 
  r.uuid as rapport_uuid,
  'espece' as type_paiement,
  145635.33 as montant,
  89.85 as pourcentage,
  156 as nb_transactions
FROM public.rapports_stations r 
WHERE r.numero_rapport = '1101000158'

UNION ALL

SELECT 
  r.uuid as rapport_uuid,
  'carte' as type_paiement,
  14223.11 as montant,
  8.77 as pourcentage,
  45 as nb_transactions
FROM public.rapports_stations r 
WHERE r.numero_rapport = '1101000158'

UNION ALL

SELECT 
  r.uuid as rapport_uuid,
  'credit' as type_paiement,
  2180.90 as montant,
  1.35 as pourcentage,
  8 as nb_transactions
FROM public.rapports_stations r 
WHERE r.numero_rapport = '1101000158'

UNION ALL

SELECT 
  r.uuid as rapport_uuid,
  'espece' as type_paiement,
  63690.59 as montant,
  90.00 as pourcentage,
  98 as nb_transactions
FROM public.rapports_stations r 
WHERE r.numero_rapport = '500101159'

UNION ALL

SELECT 
  r.uuid as rapport_uuid,
  'carte' as type_paiement,
  7076.73 as montant,
  10.00 as pourcentage,
  23 as nb_transactions
FROM public.rapports_stations r 
WHERE r.numero_rapport = '500101159';

-- Créer des îlots pour les stations (fixing the generate_series issue)
INSERT INTO public.ilots (station_id, numero_ilot, nom_ilot, nombre_pistons) 
VALUES
-- Îlots pour la première station
((SELECT id FROM public.stations LIMIT 1), 1, 'ILOT 1', 4),
((SELECT id FROM public.stations LIMIT 1), 2, 'ILOT 2', 2),
-- Îlots pour la deuxième station
((SELECT id FROM public.stations LIMIT 1 OFFSET 1), 1, 'ILOT 1', 4),
((SELECT id FROM public.stations LIMIT 1 OFFSET 1), 2, 'ILOT 2', 2);

-- Créer des volucompteurs pour les îlots
INSERT INTO public.volucompteurs (
  code_volucompteur, ilot_id, station_id, produit_code, produit_nom, prix_unitaire, index_courant
)
SELECT 
  CASE 
    WHEN i.numero_ilot = 1 AND produits.produit_code = '008035-00' THEN '6G3501_' || COALESCE(s.code_station, '000')
    WHEN i.numero_ilot = 1 AND produits.produit_code = '008000-00' THEN '0SSP1_' || COALESCE(s.code_station, '000')
    WHEN i.numero_ilot = 2 AND produits.produit_code = '008035-00' THEN '6G3505_' || COALESCE(s.code_station, '000')
    ELSE '0SSP3_' || COALESCE(s.code_station, '000')
  END as code_volucompteur,
  i.id as ilot_id,
  i.station_id,
  produits.produit_code,
  produits.produit_nom,
  produits.prix_unitaire,
  CASE 
    WHEN produits.produit_code = '008035-00' THEN (RANDOM() * 100000 + 500000)::integer
    ELSE (RANDOM() * 50000 + 100000)::integer
  END as index_courant
FROM public.ilots i
JOIN public.stations s ON i.station_id = s.id
CROSS JOIN (
  VALUES 
    ('008035-00', 'GASOIL 10PPM', 10.56),
    ('008000-00', 'SUPER S/PLOMB', 12.65)
) AS produits(produit_code, produit_nom, prix_unitaire);

-- Créer quelques notifications pour les stations
INSERT INTO public.notifications (
  type, title, message, station_id, priority, category, is_read
)
SELECT 
  CASE (RANDOM() * 4)::integer
    WHEN 0 THEN 'alert'
    WHEN 1 THEN 'warning'
    WHEN 2 THEN 'info'
    ELSE 'success'
  END as type,
  CASE (RANDOM() * 3)::integer
    WHEN 0 THEN 'Stock bas détecté'
    WHEN 1 THEN 'Maintenance requise'
    ELSE 'Rapport complété'
  END as title,
  CASE (RANDOM() * 3)::integer
    WHEN 0 THEN 'Le niveau de stock SSP est inférieur à 20%'
    WHEN 1 THEN 'Vérification technique programmée'
    ELSE 'Rapport journalier soumis avec succès'
  END as message,
  s.id as station_id,
  CASE (RANDOM() * 4)::integer
    WHEN 0 THEN 'low'
    WHEN 1 THEN 'medium'
    WHEN 2 THEN 'high'
    ELSE 'critical'
  END as priority,
  CASE (RANDOM() * 4)::integer
    WHEN 0 THEN 'system'
    WHEN 1 THEN 'business'
    WHEN 2 THEN 'maintenance'
    ELSE 'finance'
  END as category,
  RANDOM() > 0.7 as is_read
FROM public.stations s
CROSS JOIN generate_series(1, 3)
LIMIT 10;

-- Créer quelques prix carburants historiques
INSERT INTO public.prix_carburants (
  date_prix, prix_gasoil, prix_ssp, societe_id,
  prix_gasoil_precedent, prix_ssp_precedent, variation_gasoil, variation_ssp
)
SELECT 
  CURRENT_DATE - (seq || ' days')::interval as date_prix,
  10.56 + (RANDOM() - 0.5) * 0.2 as prix_gasoil,
  12.65 + (RANDOM() - 0.5) * 0.3 as prix_ssp,
  s.id as societe_id,
  10.56 as prix_gasoil_precedent,
  12.65 as prix_ssp_precedent,
  (RANDOM() - 0.5) * 2 as variation_gasoil,
  (RANDOM() - 0.5) * 3 as variation_ssp
FROM public.societes s
CROSS JOIN generate_series(0, 30) seq
LIMIT 100;
