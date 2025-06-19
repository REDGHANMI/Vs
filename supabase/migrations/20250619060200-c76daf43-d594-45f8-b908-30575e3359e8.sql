
-- Insertion des gérants dans la table gerants
INSERT INTO gerants (id, nom_complet, nom, prenom, telephone, email, poste, type_contrat, date_embauche, est_responsable_station, actif, active, cin, adresse, ville, situation_familiale, niveau_education, salaire_base) VALUES
-- Gérants de PETRO SERVICES MAROC (679ea3c5-c350-4bbc-87f6-f20f1371995b)
(gen_random_uuid(), 'HASSAN DAHBI', 'DAHBI', 'Hassan', '+212 661 234 567', 'hassan.dahbi@petroservices.ma', 'Gérant de station', 'cdi', '2022-11-01', true, true, true, 'BK123456', 'Quartier Al Massira, Settat', 'Settat', 'marie', 'Baccalauréat', 8500),
(gen_random_uuid(), 'MOSTAFA AMARIR', 'AMARIR', 'Mostafa', '+212 662 345 678', 'mostafa.amarir@petroservices.ma', 'Gérant de station', 'cdi', '2022-10-15', true, true, true, 'BK234567', 'Hay Mohammadi, Casablanca', 'Casablanca', 'marie', 'Licence', 9000),
(gen_random_uuid(), 'ABDELAZIZ AZZAOUI', 'AZZAOUI', 'Abdelaziz', '+212 663 456 789', 'abdelaziz.azzaoui@petroservices.ma', 'Gérant de station', 'cdi', '2023-01-10', true, true, true, 'BK345678', 'Quartier Industriel, Casablanca', 'Casablanca', 'marie', 'Baccalauréat', 8800),
(gen_random_uuid(), 'MOUNAIM M''RABTE', 'M''RABTE', 'Mounaim', '+212 664 567 890', 'mounaim.mrabte@petroservices.ma', 'Gérant de station', 'cdi', '2020-05-15', true, true, true, 'BK456789', 'Douar Ouled Slama, Casablanca', 'Casablanca', 'celibataire', 'DUT', 8200),
(gen_random_uuid(), 'OMAR ZAZ', 'ZAZ', 'Omar', '+212 665 678 901', 'omar.zaz@petroservices.ma', 'Gérant de station', 'cdi', '2023-01-15', true, true, true, 'BK567890', 'Centre Azemmour', 'Azemmour', 'marie', 'Baccalauréat', 8300),
(gen_random_uuid(), 'YASSINE GHIRITI', 'GHIRITI', 'Yassine', '+212 666 789 012', 'yassine.ghiriti@petroservices.ma', 'Gérant de station', 'cdi', '2019-02-20', true, true, true, 'BK678901', 'Hay Al Fath, Casablanca', 'Casablanca', 'marie', 'Licence', 8600),
(gen_random_uuid(), 'BENZAINEB JALAL', 'BENZAINEB', 'Jalal', '+212 667 890 123', 'jalal.benzaineb@petroservices.ma', 'Gérant de station', 'cdi', '2020-09-10', true, true, true, 'BK789012', 'Bd Sebta, Mohammedia', 'Mohammedia', 'marie', 'Baccalauréat', 8400),
(gen_random_uuid(), 'ZAKARIA MOUNADAM', 'MOUNADAM', 'Zakaria', '+212 668 901 234', 'zakaria.mounadam@petroservices.ma', 'Gérant de station', 'cdi', '2023-01-05', true, true, true, 'BK890123', 'Bernoussi, Casablanca', 'Casablanca', 'celibataire', 'BTS', 8100),
(gen_random_uuid(), 'ELMOUDAD MUSTAPHA', 'ELMOUDAD', 'Mustapha', '+212 669 012 345', 'mustapha.elmoudad@petroservices.ma', 'Gérant de station', 'cdi', '2023-04-20', true, true, true, 'BK901234', 'Bernoussi Azhar, Casablanca', 'Casablanca', 'marie', 'Baccalauréat', 8300),
(gen_random_uuid(), 'MOHAMED IHARRAFEN', 'IHARRAFEN', 'Mohamed', '+212 670 123 456', 'mohamed.iharrafen@petroservices.ma', 'Gérant de station', 'cdi', '2024-02-10', true, true, true, 'BK012345', 'Centre Berrechid', 'Berrechid', 'marie', 'Licence', 8700),
(gen_random_uuid(), 'ISSAM BAHMADI', 'BAHMADI', 'Issam', '+212 671 234 567', 'issam.bahmadi@petroservices.ma', 'Gérant de station', 'cdi', '2022-11-20', true, true, true, 'BK123456', 'Birjdid, Casablanca', 'Casablanca', 'marie', 'DUT', 8200),
(gen_random_uuid(), 'HAFID MOKHLIS', 'MOKHLIS', 'Hafid', '+212 672 345 678', 'hafid.mokhlis@petroservices.ma', 'Gérant de station', 'cdi', '2024-03-01', true, true, true, 'BK234567', 'Chahda, Casablanca', 'Casablanca', 'marie', 'Baccalauréat', 8500),
(gen_random_uuid(), 'DEHAYNI BAKR', 'DEHAYNI', 'Bakr', '+212 673 456 789', 'bakr.dehayni@petroservices.ma', 'Gérant de station', 'cdi', '2022-10-15', true, true, true, 'BK345678', 'Chaibate, Casablanca', 'Casablanca', 'marie', 'Licence', 8800),
(gen_random_uuid(), 'RACHID HADDOUCH', 'HADDOUCH', 'Rachid', '+212 674 567 890', 'rachid.haddouch@petroservices.ma', 'Gérant de station', 'cdi', '2019-02-15', true, true, true, 'BK456789', 'Dar Bouazza, Casablanca', 'Casablanca', 'marie', 'BTS', 8400),
(gen_random_uuid(), 'NOUREDDIN FADILE', 'FADILE', 'Noureddin', '+212 675 678 901', 'noureddin.fadile@petroservices.ma', 'Gérant de station', 'cdi', '2022-10-20', true, true, true, 'BK567890', 'Deroua, Casablanca', 'Deroua', 'marie', 'Baccalauréat', 8300),
(gen_random_uuid(), 'YASSINE KHEIR', 'KHEIR', 'Yassine', '+212 676 789 012', 'yassine.kheir@petroservices.ma', 'Gérant de station', 'cdi', '2019-07-20', true, true, true, 'BK678901', 'Ghandi, Casablanca', 'Casablanca', 'celibataire', 'Licence', 8600),
(gen_random_uuid(), 'HASSAN HARIS', 'HARIS', 'Hassan', '+212 677 890 123', 'hassan.haris@petroservices.ma', 'Gérant de station', 'cdi', '2022-10-10', true, true, true, 'BK789012', 'Hay Al Hana, Casablanca', 'Casablanca', 'marie', 'Baccalauréat', 8400),
(gen_random_uuid(), 'CHIHABEDDINE HACHHOUCH', 'HACHHOUCH', 'Chihabeddine', '+212 678 901 234', 'chihabeddine.hachhouch@petroservices.ma', 'Gérant de station', 'cdi', '2019-10-20', true, true, true, 'BK890123', 'Hay Hassani, Casablanca', 'Casablanca', 'marie', 'Master', 9200),
(gen_random_uuid(), 'HAMZA EL HAMADANI', 'EL HAMADANI', 'Hamza', '+212 679 012 345', 'hamza.elhamadani@petroservices.ma', 'Gérant de station', 'cdi', '2023-01-20', true, true, true, 'BK901234', 'Mansouria, Casablanca', 'Casablanca', 'marie', 'Licence', 8700),
(gen_random_uuid(), 'ALI AIT ABID', 'AIT ABID', 'Ali', '+212 680 123 456', 'ali.aitabid@petroservices.ma', 'Gérant de station', 'cdi', '2024-02-15', true, true, true, 'BK012345', 'Ouled Saleh, Casablanca', 'Casablanca', 'marie', 'Baccalauréat', 8500),
(gen_random_uuid(), 'ABDESSAMAD LAKHOUILI', 'LAKHOUILI', 'Abdessamad', '+212 681 234 567', 'abdessamad.lakhouili@petroservices.ma', 'Gérant de station', 'cdi', '2022-10-01', true, true, true, 'BK123457', 'Settat Centre', 'Settat', 'marie', 'DUT', 8300),
(gen_random_uuid(), 'YOUSSEF BALAMAN', 'BALAMAN', 'Youssef', '+212 682 345 678', 'youssef.balaman@petroservices.ma', 'Gérant de station', 'cdi', '2024-04-20', true, true, true, 'BK234568', 'Sidi Bennour', 'Sidi Bennour', 'marie', 'Licence', 8600),
(gen_random_uuid(), 'RACHID BOULHOUS', 'BOULHOUS', 'Rachid', '+212 683 456 789', 'rachid.boulhous@petroservices.ma', 'Gérant de station', 'cdi', '2019-02-15', true, true, true, 'BK345679', 'Sidi Moumen, Casablanca', 'Casablanca', 'marie', 'Baccalauréat', 8400),
(gen_random_uuid(), 'YOUNESS EL OUAZANI', 'EL OUAZANI', 'Youness', '+212 684 567 890', 'youness.elouazani@petroservices.ma', 'Gérant de station', 'cdi', '2022-11-20', true, true, true, 'BK456780', 'Yousofia, Casablanca', 'Casablanca', 'celibataire', 'BTS', 8200),
(gen_random_uuid(), 'MOHAMED ERROUTBI', 'ERROUTBI', 'Mohamed', '+212 685 678 901', 'mohamed.erroutbi@petroservices.ma', 'Gérant de station', 'cdi', '2019-11-15', true, true, true, 'BK567891', 'Zoubir, Casablanca', 'Casablanca', 'marie', 'Licence', 8500),

-- Gérants de AFRIQUIA GAZ (78cd99c2-3fa6-478c-8c70-fa895bc1c213)
(gen_random_uuid(), 'Mr.ASKRI YOUSSEF', 'ASKRI', 'Youssef', '+212 686 789 012', 'youssef.askri@afriquia.ma', 'Gérant de station', 'cdi', '2021-07-15', true, true, true, 'BK678902', 'Ain Aouda, Rabat', 'Rabat', 'marie', 'Ingénieur', 9500),
(gen_random_uuid(), 'Mr.BOUCHFICH MOHAMMED', 'BOUCHFICH', 'Mohammed', '+212 687 890 123', 'mohammed.bouchfich@afriquia.ma', 'Gérant de station', 'cdi', '2015-06-01', true, true, true, 'BK789013', 'Al Fajr, Casablanca', 'Casablanca', 'marie', 'Master', 9800),
(gen_random_uuid(), 'Mr.LAZRAK RADOUANE', 'LAZRAK', 'Radouane', '+212 688 901 234', 'radouane.lazrak@afriquia.ma', 'Gérant de station', 'cdi', '2017-05-15', true, true, true, 'BK890124', 'Al Hidaya, Casablanca', 'Casablanca', 'marie', 'Licence', 9200),
(gen_random_uuid(), 'Mr.AHANCHAOU TAWFIK', 'AHANCHAOU', 'Tawfik', '+212 689 012 345', 'tawfik.ahanchaou@afriquia.ma', 'Gérant de station', 'cdi', '2020-01-20', true, true, true, 'BK901235', 'Florida, Casablanca', 'Casablanca', 'marie', 'Ingénieur', 10200),
(gen_random_uuid(), 'Mr.ASGHARF BRAHIM', 'ASGHARF', 'Brahim', '+212 690 123 456', 'brahim.asgharf@afriquia.ma', 'Gérant de station', 'cdi', '2023-08-10', true, true, true, 'BK012346', 'Mimosa, Casablanca', 'Casablanca', 'marie', 'Master', 9600),
(gen_random_uuid(), 'Mr.BYDAT SAID', 'BYDAT', 'Said', '+212 691 234 567', 'said.bydat@afriquia.ma', 'Gérant de station', 'cdi', '2018-11-15', true, true, true, 'BK123458', 'Rahma II, Casablanca', 'Casablanca', 'marie', 'Licence', 9400),
(gen_random_uuid(), 'Mr.SABILE YOUSSEF', 'SABILE', 'Youssef', '+212 692 345 678', 'youssef.sabile@afriquia.ma', 'Gérant de station', 'cdi', '2018-10-20', true, true, true, 'BK234569', 'Zenata, Casablanca', 'Casablanca', 'marie', 'Ingénieur', 9700),

-- Gérant de STATION WIFAK (0e9056e2-ecd4-404c-97e1-45b535e0d14b)
(gen_random_uuid(), 'Mr. MOHAMMED AMZIL', 'AMZIL', 'Mohammed', '+212 693 456 789', 'mohammed.amzil@wifak.ma', 'Gérant de station', 'cdi', '2020-01-01', true, true, true, 'BK345680', 'Wifak, Casablanca', 'Casablanca', 'marie', 'Licence', 8800);

-- Insertion des stations dans la table stations
INSERT INTO stations (id, nom, societe_id, gerant_id, latitude, longitude, date_mise_en_service, code_station, active, adresse_complete, ville, region, nombre_pistons, capacite_stockage_gasoil, capacite_stockage_ssp, statut_operationnel) VALUES
-- Stations PETRO SERVICES MAROC
(gen_random_uuid(), 'S/S SETTAT', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'HASSAN DAHBI'), 33.0000, -7.6167, '2023-01-10', 'SET001', true, 'Route Principale Settat', 'Settat', 'Casablanca-Settat', 6, 50000, 30000, 'operationnel'),
(gen_random_uuid(), 'S/S VILLE VERT', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'MOSTAFA AMARIR'), 33.5731, -7.5898, '2022-12-20', 'VVE001', true, 'Boulevard Mohammed V, Ville Verte', 'Casablanca', 'Casablanca-Settat', 8, 60000, 35000, 'operationnel'),
(gen_random_uuid(), 'S/S ABIR', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'ABDELAZIZ AZZAOUI'), 33.5890, -7.6100, '2023-03-16', 'ABI001', true, 'Zone Industrielle Ain Sebaa', 'Casablanca', 'Casablanca-Settat', 6, 45000, 25000, 'operationnel'),
(gen_random_uuid(), 'S/S ATTACHAROUK', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'MOUNAIM M''RABTE'), 33.5200, -7.6500, '2020-06-24', 'ATT001', true, 'Quartier Attacharouk', 'Casablanca', 'Casablanca-Settat', 4, 40000, 20000, 'operationnel'),
(gen_random_uuid(), 'S/S AZEMMOUR', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'OMAR ZAZ'), 33.2833, -8.3417, '2023-03-01', 'AZE001', true, 'Centre d''Azemmour, Route Principale', 'Azemmour', 'Casablanca-Settat', 4, 35000, 20000, 'operationnel'),
(gen_random_uuid(), 'S/S BACHKOU', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'YASSINE GHIRITI'), 33.5500, -7.6200, '2019-04-10', 'BAC001', true, 'Quartier Bachkou', 'Casablanca', 'Casablanca-Settat', 6, 50000, 30000, 'operationnel'),
(gen_random_uuid(), 'S/S BD SEBTA MOHAMMEDIA', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'BENZAINEB JALAL'), 33.6878, -7.3737, '2020-10-12', 'MOH001', true, 'Boulevard Sebta, Mohammedia', 'Mohammedia', 'Casablanca-Settat', 8, 55000, 35000, 'operationnel'),
(gen_random_uuid(), 'S/S BERNOUSSI', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'ZAKARIA MOUNADAM'), 33.6100, -7.5300, '2023-02-23', 'BER001', true, 'Quartier Bernoussi', 'Casablanca', 'Casablanca-Settat', 6, 45000, 25000, 'operationnel'),
(gen_random_uuid(), 'S/S BERNOUSSI AZHAR', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'ELMOUDAD MUSTAPHA'), 33.6150, -7.5280, '2023-06-02', 'BAZ001', true, 'Bernoussi Azhar, Avenue Principale', 'Casablanca', 'Casablanca-Settat', 4, 40000, 22000, 'operationnel'),
(gen_random_uuid(), 'S/S BERRECHID', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'MOHAMED IHARRAFEN'), 33.2833, -7.5833, '2024-03-23', 'BRC001', true, 'Centre Berrechid, Route Casablanca', 'Berrechid', 'Casablanca-Settat', 6, 50000, 30000, 'operationnel'),
(gen_random_uuid(), 'S/S BIRJDID', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'ISSAM BAHMADI'), 33.5600, -7.6400, '2023-01-07', 'BIR001', true, 'Quartier Birjdid', 'Casablanca', 'Casablanca-Settat', 4, 35000, 20000, 'operationnel'),
(gen_random_uuid(), 'S/S CHAHDA', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'HAFID MOKHLIS'), 33.5800, -7.6100, '2024-04-15', 'CHA001', true, 'Quartier Chahda', 'Casablanca', 'Casablanca-Settat', 6, 45000, 25000, 'operationnel'),
(gen_random_uuid(), 'S/S CHAIBATE', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'DEHAYNI BAKR'), 33.5700, -7.6300, '2022-12-21', 'CHB001', true, 'Quartier Chaibate', 'Casablanca', 'Casablanca-Settat', 8, 60000, 35000, 'operationnel'),
(gen_random_uuid(), 'S/S DAR-16', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'RACHID HADDOUCH'), 33.5300, -7.7500, '2019-04-08', 'DAR001', true, 'Dar Bouazza, Km 16', 'Casablanca', 'Casablanca-Settat', 6, 50000, 30000, 'operationnel'),
(gen_random_uuid(), 'S/S DEROUA', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'NOUREDDIN FADILE'), 33.4167, -7.6833, '2022-12-22', 'DER001', true, 'Centre Deroua', 'Deroua', 'Casablanca-Settat', 4, 40000, 22000, 'operationnel'),
(gen_random_uuid(), 'S/S GHANDI', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'YASSINE KHEIR'), 33.5900, -7.6000, '2019-09-27', 'GHA001', true, 'Quartier Ghandi', 'Casablanca', 'Casablanca-Settat', 6, 45000, 25000, 'operationnel'),
(gen_random_uuid(), 'S/S HAY AL HANA', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'HASSAN HARIS'), 33.5650, -7.6250, '2022-12-19', 'HAH001', true, 'Hay Al Hana', 'Casablanca', 'Casablanca-Settat', 4, 35000, 20000, 'operationnel'),
(gen_random_uuid(), 'S/S HAY HASSANI', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'CHIHABEDDINE HACHHOUCH'), 33.5400, -7.6600, '2019-12-05', 'HAH002', true, 'Hay Hassani', 'Casablanca', 'Casablanca-Settat', 8, 60000, 40000, 'operationnel'),
(gen_random_uuid(), 'S/S MANSOURIA', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'HAMZA EL HAMADANI'), 33.5750, -7.6150, '2023-03-01', 'MAN001', true, 'Quartier Mansouria', 'Casablanca', 'Casablanca-Settat', 6, 50000, 30000, 'operationnel'),
(gen_random_uuid(), 'S/S OULED SALEH', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'ALI AIT ABID'), 33.5550, -7.6350, '2024-03-23', 'OUL001', true, 'Ouled Saleh', 'Casablanca', 'Casablanca-Settat', 4, 40000, 22000, 'operationnel'),
(gen_random_uuid(), 'S/S PANORAMIQUE', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'YASSINE KHEIR'), 33.5850, -7.6050, '2019-04-10', 'PAN001', true, 'Route Panoramique', 'Casablanca', 'Casablanca-Settat', 6, 45000, 25000, 'operationnel'),
(gen_random_uuid(), 'S/S SETTAT 2', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'ABDESSAMAD LAKHOUILI'), 33.0050, -7.6200, '2022-12-19', 'SET002', true, 'Settat Route de Marrakech', 'Settat', 'Casablanca-Settat', 6, 50000, 30000, 'operationnel'),
(gen_random_uuid(), 'S/S SIDI BENNOUR', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'YOUSSEF BALAMAN'), 32.6500, -8.4333, '2024-06-04', 'SBE001', true, 'Centre Sidi Bennour', 'Sidi Bennour', 'Casablanca-Settat', 4, 35000, 20000, 'operationnel'),
(gen_random_uuid(), 'S/S SIDI MESSAOUD', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'YASSINE KHEIR'), 33.5450, -7.6450, '2020-06-18', 'SME001', true, 'Sidi Messaoud', 'Casablanca', 'Casablanca-Settat', 4, 40000, 22000, 'operationnel'),
(gen_random_uuid(), 'S/S SIDI MOUMEN', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'RACHID BOULHOUS'), 33.6200, -7.5100, '2019-04-22', 'SMO001', true, 'Sidi Moumen', 'Casablanca', 'Casablanca-Settat', 6, 45000, 25000, 'operationnel'),
(gen_random_uuid(), 'S/S SOUALEM', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'ISSAM BAHMADI'), 33.5500, -7.6500, '2020-01-07', 'SOU001', true, 'Soualem', 'Casablanca', 'Casablanca-Settat', 4, 35000, 20000, 'operationnel'),
(gen_random_uuid(), 'S/S YOUSOFIA', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'YOUNESS EL OUAZANI'), 33.5350,  -7.6550, '2023-01-07', 'YOU001', true, 'Yousofia', 'Casablanca', 'Casablanca-Settat', 6, 45000, 25000, 'operationnel'),
(gen_random_uuid(), 'S/S ZOUBIR', '679ea3c5-c350-4bbc-87f6-f20f1371995b', (SELECT id FROM gerants WHERE nom_complet = 'MOHAMED ERROUTBI'), 33.5600, -7.6200, '2020-01-10', 'ZOU001', true, 'Quartier Zoubir', 'Casablanca', 'Casablanca-Settat', 6, 50000, 30000, 'operationnel'),

-- Stations AFRIQUIA GAZ
(gen_random_uuid(), 'S/S AIN OUDA', '78cd99c2-3fa6-478c-8c70-fa895bc1c213', (SELECT id FROM gerants WHERE nom_complet = 'Mr.ASKRI YOUSSEF'), 33.8004259, -6.8365385, '2021-10-08', 'AIN001', true, 'Ain Aouda, Route Principale', 'Rabat', 'Rabat-Salé-Kénitra', 8, 70000, 45000, 'operationnel'),
(gen_random_uuid(), 'S/S AL FAJR', '78cd99c2-3fa6-478c-8c70-fa895bc1c213', (SELECT id FROM gerants WHERE nom_complet = 'Mr.BOUCHFICH MOHAMMED'), 33.6700160, -7.2520361, '2015-07-23', 'ALF001', true, 'Al Fajr, Casablanca', 'Casablanca', 'Casablanca-Settat', 10, 80000, 50000, 'operationnel'),
(gen_random_uuid(), 'S/S AL HIDAYA', '78cd99c2-3fa6-478c-8c70-fa895bc1c213', (SELECT id FROM gerants WHERE nom_complet = 'Mr.LAZRAK RADOUANE'), 33.3875500, -7.7935549, '2017-07-10', 'ALH001', true, 'Al Hidaya, Casablanca', 'Casablanca', 'Casablanca-Settat', 8, 65000, 40000, 'operationnel'),
(gen_random_uuid(), 'S/S FLORIDA', '78cd99c2-3fa6-478c-8c70-fa895bc1c213', (SELECT id FROM gerants WHERE nom_complet = 'Mr.AHANCHAOU TAWFIK'), 33.5203776, -7.6350289, '2020-03-14', 'FLO001', true, 'Florida, Casablanca', 'Casablanca', 'Casablanca-Settat', 12, 90000, 55000, 'operationnel'),
(gen_random_uuid(), 'S/S LA FERME', '78cd99c2-3fa6-478c-8c70-fa895bc1c213', (SELECT id FROM gerants WHERE nom_complet = 'Mr.ASKRI YOUSSEF'), 33.5649104, -7.0441940, '2018-12-06', 'LAF001', true, 'La Ferme, Casablanca', 'Casablanca', 'Casablanca-Settat', 8, 70000, 45000, 'operationnel'),
(gen_random_uuid(), 'S/S MIMOSA', '78cd99c2-3fa6-478c-8c70-fa895bc1c213', (SELECT id FROM gerants WHERE nom_complet = 'Mr.ASGHARF BRAHIM'), 33.6142965, -7.5317671, '2023-09-26', 'MIM001', true, 'Mimosa, Casablanca', 'Casablanca', 'Casablanca-Settat', 10, 75000, 45000, 'operationnel'),
(gen_random_uuid(), 'S/S MOSTAKBAL', '78cd99c2-3fa6-478c-8c70-fa895bc1c213', (SELECT id FROM gerants WHERE nom_complet = 'Mr.AHANCHAOU TAWFIK'), 33.5224131, -7.6521978, '2023-09-27', 'MOS001', true, 'Mostakbal, Casablanca', 'Casablanca', 'Casablanca-Settat', 8, 65000, 40000, 'operationnel'),
(gen_random_uuid(), 'S/S RAHMA II', '78cd99c2-3fa6-478c-8c70-fa895bc1c213', (SELECT id FROM gerants WHERE nom_complet = 'Mr.BYDAT SAID'), 33.517702, -7.7577511, '2018-12-28', 'RAH001', true, 'Rahma II, Route de Rabat Km 15', 'Casablanca', 'Casablanca-Settat', 10, 80000, 50000, 'operationnel'),
(gen_random_uuid(), 'S/S ZENATA', '78cd99c2-3fa6-478c-8c70-fa895bc1c213', (SELECT id FROM gerants WHERE nom_complet = 'Mr.SABILE YOUSSEF'), 33.6634000, -7.4355161, '2018-12-03', 'ZEN001', true, 'Zenata, Casablanca', 'Casablanca', 'Casablanca-Settat', 8, 70000, 45000, 'operationnel'),

-- Station WIFAK
(gen_random_uuid(), 'S/S WIFAK', '0e9056e2-ecd4-404c-97e1-45b535e0d14b', (SELECT id FROM gerants WHERE nom_complet = 'Mr. MOHAMMED AMZIL'), 33.5731, -7.5898, '2020-06-01', 'WIF001', true, 'Wifak, Casablanca', 'Casablanca', 'Casablanca-Settat', 6, 50000, 30000, 'operationnel');

-- Mise à jour des gérants avec leur station assignée
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S SETTAT') WHERE nom_complet = 'HASSAN DAHBI';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S VILLE VERT') WHERE nom_complet = 'MOSTAFA AMARIR';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S ABIR') WHERE nom_complet = 'ABDELAZIZ AZZAOUI';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S ATTACHAROUK') WHERE nom_complet = 'MOUNAIM M''RABTE';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S AZEMMOUR') WHERE nom_complet = 'OMAR ZAZ';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S BACHKOU') WHERE nom_complet = 'YASSINE GHIRITI';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S BD SEBTA MOHAMMEDIA') WHERE nom_complet = 'BENZAINEB JALAL';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S BERNOUSSI') WHERE nom_complet = 'ZAKARIA MOUNADAM';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S BERNOUSSI AZHAR') WHERE nom_complet = 'ELMOUDAD MUSTAPHA';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S BERRECHID') WHERE nom_complet = 'MOHAMED IHARRAFEN';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S BIRJDID') WHERE nom_complet = 'ISSAM BAHMADI';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S CHAHDA') WHERE nom_complet = 'HAFID MOKHLIS';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S CHAIBATE') WHERE nom_complet = 'DEHAYNI BAKR';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S DAR-16') WHERE nom_complet = 'RACHID HADDOUCH';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S DEROUA') WHERE nom_complet = 'NOUREDDIN FADILE';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S GHANDI') WHERE nom_complet = 'YASSINE KHEIR';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S HAY AL HANA') WHERE nom_complet = 'HASSAN HARIS';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S HAY HASSANI') WHERE nom_complet = 'CHIHABEDDINE HACHHOUCH';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S MANSOURIA') WHERE nom_complet = 'HAMZA EL HAMADANI';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S OULED SALEH') WHERE nom_complet = 'ALI AIT ABID';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S PANORAMIQUE') WHERE nom_complet = 'YASSINE KHEIR';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S SETTAT 2') WHERE nom_complet = 'ABDESSAMAD LAKHOUILI';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S SIDI BENNOUR') WHERE nom_complet = 'YOUSSEF BALAMAN';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S SIDI MESSAOUD') WHERE nom_complet = 'YASSINE KHEIR';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S SIDI MOUMEN') WHERE nom_complet = 'RACHID BOULHOUS';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S SOUALEM') WHERE nom_complet = 'ISSAM BAHMADI';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S YOUSOFIA') WHERE nom_complet = 'YOUNESS EL OUAZANI';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S ZOUBIR') WHERE nom_complet = 'MOHAMED ERROUTBI';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S AIN OUDA') WHERE nom_complet = 'Mr.ASKRI YOUSSEF';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S AL FAJR') WHERE nom_complet = 'Mr.BOUCHFICH MOHAMMED';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S AL HIDAYA') WHERE nom_complet = 'Mr.LAZRAK RADOUANE';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S FLORIDA') WHERE nom_complet = 'Mr.AHANCHAOU TAWFIK';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S LA FERME') WHERE nom_complet = 'Mr.ASKRI YOUSSEF';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S MIMOSA') WHERE nom_complet = 'Mr.ASGHARF BRAHIM';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S MOSTAKBAL') WHERE nom_complet = 'Mr.AHANCHAOU TAWFIK';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S RAHMA II') WHERE nom_complet = 'Mr.BYDAT SAID';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S ZENATA') WHERE nom_complet = 'Mr.SABILE YOUSSEF';
UPDATE gerants SET station_uuid = (SELECT id FROM stations WHERE nom = 'S/S WIFAK') WHERE nom_complet = 'Mr. MOHAMMED AMZIL';
