
-- First, let's insert societes and get their IDs
INSERT INTO societes (nom, code, description, adresse, ville, code_postal, telephone, email, site_web, couleur_theme, date_creation, capital_social, forme_juridique, numero_rc, numero_ice, numero_if, numero_cnss, numero_patente, logo_url, active, created_at) 
VALUES
('MEDMA GESTION', 'MEDMA_GEST', 'Société spécialisée dans la gestion et l''exploitation de stations-service', 'Boulevard Hassan II, Résidence Al Maghrib', 'Casablanca', '20000', '+212 5 22 12 34 56', 'contact@medmagestion.ma', 'https://www.medmagestion.ma', '#213385', '2018-01-01'::date, 5000000, 'SARL', '123456', '002345678000045', '12345678', '1234567', '12345678', 'https://static.wixstatic.com/media/7704cc_ebd95eeecbde404783d3cbe40e1dbcf1~mv2.png', true, '2018-01-01T00:00:00Z'::timestamptz),
('MEDMA ENERGY', 'MEDMA_NRG', 'Filiale énergétique du groupe MEDMA, spécialisée dans les carburants', 'Zone Industrielle Ain Sebaa', 'Casablanca', '20250', '+212 5 22 34 56 78', 'info@medmaenergy.ma', 'https://www.medmaenergy.ma', '#72b845', '2019-01-01'::date, 8000000, 'SA', '234567', '002345679000046', '23456789', '2345678', '23456789', 'https://static.wixstatic.com/media/7704cc_8ebc3a2673e74a30bc1724ac5e3fbb0e~mv2.png', true, '2019-01-01T00:00:00Z'::timestamptz),
('MAHATAT WIFAK', 'AL_WIFAK', 'Société de distribution et commercialisation de carburants', 'Avenue Mohammed V, Centre Ville', 'Rabat', '10000', '+212 5 37 12 34 56', 'contact@alwifak.ma', NULL, '#054869', '2020-01-01'::date, 3000000, 'SARL AU', '345678', '002345680000047', '34567890', '3456789', '34567890', 'https://static.wixstatic.com/media/7704cc_241d0c0a0be34d008aa67c39c25bdbe4~mv2.png', true, '2020-01-01T00:00:00Z'::timestamptz);

-- Insert gerants
INSERT INTO gerants (nom_complet, nom, prenom, est_responsable_station, poste, type_contrat, telephone, email, actif, active, date_embauche, created_at, cin, date_naissance, adresse, ville, situation_familiale, nombre_enfants, niveau_education, experience_precedente, salaire_base, prime_mensuelle, photo_url, commentaires) 
VALUES
('BYDAT SAID', 'BYDAT', 'SAID', true, 'Gérant', 'cdi', '+212 6 12 34 56 78', 'bydat.said@medma.ma', true, true, '2018-12-30'::date, '2018-12-28T00:00:00Z'::timestamptz, 'AB123456', '1985-03-15'::date, 'Rue Al Jahid, Hay Riad', 'Rabat', 'marie', 2, 'Bac+3 Gestion Commerciale', '5 ans chez Shell Maroc', 8500, 1500, 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop&crop=face', 'Gérant expérimenté, excellent relationnel client'),
('AHANCHAOU TAWFIK', 'AHANCHAOU', 'TAWFIK', false, 'Gérant', 'cdi', '+212 6 87 65 43 21', 'ahanchaou.tawfik@medma.ma', true, true, '2020-03-14'::date, '2020-03-14T00:00:00Z'::timestamptz, 'CD456789', '1990-07-22'::date, 'Boulevard Zerktouni, Maarif', 'Casablanca', 'celibataire', 0, 'Bac+2 Commerce', '3 ans chez Total Maroc', 7500, 1200, 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop&crop=face', 'Très motivé, bon potentiel d''évolution'),
('ASKRI YOUSSEF', 'ASKRI', 'YOUSSEF', true, 'Gérant', 'cdi', '+212 6 11 22 33 44', 'askri.youssef@medma.ma', true, true, '2021-10-08'::date, '2021-10-08T00:00:00Z'::timestamptz, 'EF789012', '1988-12-10'::date, 'Quartier Industriel, Ain Sebaa', 'Casablanca', 'marie', 1, 'Bac+4 Management', 'Nouveau diplômé', 6800, 1000, 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=400&fit=crop&crop=face', 'Formation initiale en cours, très prometteur'),
('LAZRAK RADOUANE', 'LAZRAK', 'RADOUANE', true, 'Gérant Senior', 'cdi', '+212 6 22 33 44 55', 'lazrak.radouane@medma.ma', true, true, '2017-07-10'::date, '2017-07-10T00:00:00Z'::timestamptz, 'GH012345', '1982-05-18'::date, 'Avenue Hassan II, Centre', 'Mohammedia', 'marie', 3, 'Bac Technique', '8 ans chez Afriquia', 9200, 1800, 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=400&h=400&fit=crop&crop=face', 'Gérant senior, mentor pour nouveaux gérants'),
('ASGHARF BRAHIM', 'ASGHARF', 'BRAHIM', true, 'Gérant', 'cdi', '+212 6 33 44 55 66', 'asgharf.brahim@medma.ma', true, true, '2023-09-26'::date, '2023-09-26T00:00:00Z'::timestamptz, 'IJ345678', '1993-01-25'::date, 'Résidence Al Firdaus, Hay Hassani', 'Casablanca', 'celibataire', 0, 'Bac+5 MBA', '2 ans chez Vivo Energy', 8000, 1300, 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=400&h=400&fit=crop&crop=face', 'Profil cadre, orienté digitalisation');

-- Insert stations using subqueries to get IDs
INSERT INTO stations (nom, societe_id, gerant_id, latitude, longitude, date_mise_en_service, code_station, adresse_complete, ville, region, nombre_pistons, capacite_stockage_gasoil, capacite_stockage_ssp, statut_operationnel, active, created_at)
VALUES 
('S/S HAY INARA', 
 (SELECT id FROM societes WHERE code = 'MEDMA_GEST'), 
 (SELECT id FROM gerants WHERE nom_complet = 'BYDAT SAID'), 
 33.517702, -7.757751, '2018-12-28'::date, '105', 'Route de Rabat, Km 15', 'Casablanca', 'Casablanca-Settat', 22, 60000, 30000, 'operationnel', true, '2018-12-28T00:00:00Z'::timestamptz),

('S/S CALIFORNIE', 
 (SELECT id FROM societes WHERE code = 'MEDMA_GEST'), 
 (SELECT id FROM gerants WHERE nom_complet = 'AHANCHAOU TAWFIK'), 
 33.52037761, -7.635028876, '2020-03-14'::date, '106', 'Avenue Hassan II, Centre-ville', 'Casablanca', 'Casablanca-Settat', 24, 90000, 20000, 'operationnel', true, '2020-03-14T00:00:00Z'::timestamptz),

('S/S HASSAN II', 
 (SELECT id FROM societes WHERE code = 'MEDMA_GEST'), 
 (SELECT id FROM gerants WHERE nom_complet = 'ASKRI YOUSSEF'), 
 33.80042592, -6.836538525, '2021-10-08'::date, '107', 'Avenue Hassan II', 'Rabat', 'Rabat-Salé-Kénitra', 18, 50000, 25000, 'operationnel', true, '2021-10-08T00:00:00Z'::timestamptz),

('S/S ANFA', 
 (SELECT id FROM societes WHERE code = 'MEDMA_GEST'), 
 (SELECT id FROM gerants WHERE nom_complet = 'LAZRAK RADOUANE'), 
 33.38754995, -7.793554946, '2017-07-10'::date, '102', 'Boulevard Anfa', 'Casablanca', 'Casablanca-Settat', 16, 45000, 22000, 'operationnel', true, '2017-07-10T00:00:00Z'::timestamptz),

('S/S MAARIF', 
 (SELECT id FROM societes WHERE code = 'MEDMA_GEST'), 
 (SELECT id FROM gerants WHERE nom_complet = 'ASGHARF BRAHIM'), 
 33.61429652, -7.531767111, '2023-09-26'::date, '108', 'Avenue Maarif', 'Casablanca', 'Casablanca-Settat', 12, 40000, 18000, 'operationnel', true, '2023-09-26T00:00:00Z'::timestamptz);

-- Update gerants with their station references
UPDATE gerants 
SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S HAY INARA')
WHERE nom_complet = 'BYDAT SAID';

UPDATE gerants 
SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S CALIFORNIE')
WHERE nom_complet = 'AHANCHAOU TAWFIK';

UPDATE gerants 
SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S HASSAN II')
WHERE nom_complet = 'ASKRI YOUSSEF';

UPDATE gerants 
SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S ANFA')
WHERE nom_complet = 'LAZRAK RADOUANE';

UPDATE gerants 
SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S MAARIF')
WHERE nom_complet = 'ASGHARF BRAHIM';

-- Insert familles_articles
INSERT INTO familles_articles (nom, code_famille, description, couleur_theme, icone, compte_comptable, taux_tva_defaut, active, created_at) 
VALUES
('Carburants', 'CARB', 'Produits pétroliers et carburants', '#FF6B35', 'Fuel', '70110', 20, true, now()),
('Lubrifiants', 'LUBR', 'Huiles et lubrifiants automobiles', '#4ECDC4', 'Droplets', '70120', 20, true, now()),
('Accessoires Auto', 'AUTO', 'Accessoires et pièces automobiles', '#45B7D1', 'Wrench', '70130', 20, true, now()),
('Services', 'SERV', 'Services de lavage et entretien', '#96CEB4', 'Settings', '70600', 20, true, now());

-- Insert articles
INSERT INTO articles (code_article, nom, famille_article_id, unite_mesure, prix_unitaire, prix_achat, marge_beneficiaire, stock_minimum, stock_actuel, description, fournisseur_principal, code_barre, active, created_at)
VALUES 
('008035-00', 'GASOIL 10PPM', (SELECT id FROM familles_articles WHERE code_famille = 'CARB'), 'litre', 10.56, 9.20, 14.78, 5000, 25000, 'Gasoil avec 10ppm de soufre', 'Shell Maroc', '3456789012345', true, now()),
('008000-00', 'SUPER S/PLOMB', (SELECT id FROM familles_articles WHERE code_famille = 'CARB'), 'litre', 12.66, 11.10, 14.05, 3000, 15000, 'Super sans plomb 95', 'Total Maroc', '2345678901234', true, now()),
('LUB_001', 'ULTRA-7 20W50', (SELECT id FROM familles_articles WHERE code_famille = 'LUBR'), 'litre', 41.60, 32.00, 30.00, 50, 120, 'Huile moteur 20W50', 'Mobil', '4567890123456', true, now()),
('LUB_002', 'AT ULTRA D 15W30', (SELECT id FROM familles_articles WHERE code_famille = 'LUBR'), 'litre', 75.20, 58.00, 29.66, 30, 85, 'Huile moteur diesel 15W30', 'Castrol', '5678901234567', true, now()),
('ACC_001', 'Liquide lave-glace', (SELECT id FROM familles_articles WHERE code_famille = 'AUTO'), 'litre', 4.00, 2.50, 60.00, 100, 250, 'Liquide lave-glace concentré', 'Auto Plus', '6789012345678', true, now());

-- Insert categories_depenses
INSERT INTO categories_depenses (nom, code_categorie, type_depense, description, compte_comptable, responsable, niveau_autorisation, budget_mensuel, seuil_alerte, autorisation_requise, active, created_at) 
VALUES
('Achats Carburants', 'ACH_CARB', 'variable', 'Achats de carburants pour revente', '6011', 'Directeur Commercial', 'direction', 500000, 450000, true, true, now()),
('Salaires et Charges', 'SAL_CHG', 'fixe', 'Salaires équipe et charges sociales', '6411', 'DRH', 'direction', 50000, 45000, true, true, now()),
('Maintenance', 'MAINT', 'variable', 'Maintenance préventive et réparations', '6125', 'Chef Technique', 'manager', 8000, 7000, false, true, now()),
('Électricité', 'ELEC', 'fixe', 'Factures électricité', '6061', 'Gestionnaire Site', 'gerant', 5000, 4500, false, true, now()),
('Autres Charges', 'AUTRE', 'variable', 'Frais bancaires, assurances, etc.', '6180', 'Comptable', 'manager', 4000, 3500, false, true, now());

-- Insert types_charges
INSERT INTO types_charges (nom, code, type, description, compte_comptable, couleur_theme, active, created_at) 
VALUES
('Achat marchandises', 'ACH_MARCH', 'charge', 'Achats de carburants et produits pour revente', '601', '#FF6B35', true, now()),
('Charges de personnel', 'CHG_PERS', 'charge', 'Salaires, charges sociales et avantages', '641', '#4ECDC4', true, now()),
('Entretien et réparations', 'ENT_REP', 'charge', 'Maintenance, réparations et entretien', '615', '#45B7D1', true, now()),
('Services extérieurs', 'SERV_EXT', 'charge', 'Électricité, eau, téléphone, assurances', '606', '#96CEB4', true, now()),
('Autres charges', 'AUT_CHG', 'charge', 'Frais bancaires, taxes, divers', '618', '#FFEAA7', true, now());

-- Insert indices_carburants
INSERT INTO indices_carburants (nom, type_carburant, valeur_indice, date_application, valeur_precedente, variation_pourcentage, source, methode_calcul, frequence_mise_a_jour, commentaires, active, created_at) 
VALUES
('Indice Gasoil Platts', 'gasoil', 650.25, '2025-01-15'::date, 645.80, 0.69, 'Platts', 'Moyenne FOB Med Basis', 'quotidien', 'Indice de référence international', true, now()),
('Indice Essence Platts', 'ssp', 720.50, '2025-01-15'::date, 715.30, 0.73, 'Platts', 'Moyenne FOB Med Basis', 'quotidien', 'Indice essence sans plomb', true, now()),
('Indice Brent', 'mixte', 82.45, '2025-01-15'::date, 81.20, 1.54, 'ICE', 'Prix spot London', 'quotidien', 'Pétrole brut de référence', true, now());

-- Insert prix_carburants
INSERT INTO prix_carburants (date_prix, prix_gasoil, prix_ssp, societe_id, prix_gasoil_precedent, prix_ssp_precedent, variation_gasoil, variation_ssp, motif_changement, applique_par, date_application, created_at) 
VALUES
('2025-01-15'::date, 10.56, 12.66, (SELECT id FROM societes WHERE code = 'MEDMA_GEST'), 10.42, 12.50, 1.34, 1.28, 'Hausse indice Platts', 'Direction', '2025-01-15'::date, now());

-- Insert some sample notifications
INSERT INTO notifications (type, title, message, station_id, societe_id, priority, category, is_read, created_at)
VALUES
('info', 'Nouvelle station créée', 'La station S/S HAY INARA a été créée avec succès', 
 (SELECT id FROM stations WHERE nom = 'S/S HAY INARA'), 
 (SELECT id FROM societes WHERE code = 'MEDMA_GEST'), 
 'medium', 'system', false, now()),
('warning', 'Stock faible', 'Le stock de gasoil de la station S/S CALIFORNIE est en dessous du seuil minimum', 
 (SELECT id FROM stations WHERE nom = 'S/S CALIFORNIE'), 
 (SELECT id FROM societes WHERE code = 'MEDMA_GEST'), 
 'high', 'business', false, now()),
('success', 'Rapport mensuel', 'Le rapport mensuel de janvier a été généré avec succès', 
 NULL, 
 (SELECT id FROM societes WHERE code = 'MEDMA_GEST'), 
 'low', 'business', true, now());
