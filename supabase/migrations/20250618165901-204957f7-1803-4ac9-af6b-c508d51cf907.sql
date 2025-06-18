
-- =====================================
-- TABLES PRINCIPALES (ENTITÉS DE BASE)
-- =====================================

-- Table des sociétés
CREATE TABLE public.societes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  adresse TEXT,
  ville TEXT,
  code_postal TEXT,
  telephone TEXT,
  email TEXT,
  site_web TEXT,
  logo_url TEXT,
  couleur_theme TEXT DEFAULT '#213385',
  date_creation DATE,
  capital_social DECIMAL(15,2),
  forme_juridique TEXT,
  numero_rc TEXT,
  numero_ice TEXT,
  numero_if TEXT,
  numero_cnss TEXT,
  numero_patente TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des gérants/employés
CREATE TABLE public.gerants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom_complet TEXT NOT NULL,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  station_uuid UUID,
  est_responsable_station BOOLEAN NOT NULL DEFAULT false,
  poste TEXT NOT NULL,
  type_contrat TEXT CHECK (type_contrat IN ('cdi', 'cdd', 'stage', 'freelance')),
  telephone TEXT,
  email TEXT,
  cin TEXT,
  date_naissance DATE,
  adresse TEXT,
  ville TEXT,
  situation_familiale TEXT CHECK (situation_familiale IN ('celibataire', 'marie', 'divorce', 'veuf')),
  nombre_enfants INTEGER DEFAULT 0,
  niveau_education TEXT,
  experience_precedente TEXT,
  salaire_base DECIMAL(10,2),
  prime_mensuelle DECIMAL(10,2),
  date_embauche DATE,
  date_fin_contrat DATE,
  photo_url TEXT,
  commentaires TEXT,
  actif BOOLEAN NOT NULL DEFAULT true,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des stations
CREATE TABLE public.stations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  societe_id UUID NOT NULL REFERENCES public.societes(id) ON DELETE CASCADE,
  gerant_id UUID REFERENCES public.gerants(id),
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  date_mise_en_service DATE,
  code_station TEXT,
  adresse_complete TEXT,
  ville TEXT,
  region TEXT,
  code_postal TEXT,
  superficie DECIMAL(8,2),
  nombre_pistons INTEGER,
  capacite_stockage_gasoil DECIMAL(10,2),
  capacite_stockage_ssp DECIMAL(10,2),
  services_additionnels JSONB,
  horaires_ouverture JSONB,
  photo_url TEXT,
  statut_operationnel TEXT CHECK (statut_operationnel IN ('operationnel', 'maintenance', 'ferme', 'construction')) DEFAULT 'operationnel',
  derniere_inspection DATE,
  certification_environnementale BOOLEAN DEFAULT false,
  commentaires TEXT,
  contact_urgence TEXT,
  date_ouverture DATE,
  statut TEXT CHECK (statut IN ('operationnel', 'maintenance', 'ferme', 'construction')) DEFAULT 'operationnel',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ajouter la contrainte FK après création de la table stations
ALTER TABLE public.gerants ADD CONSTRAINT fk_gerants_station 
  FOREIGN KEY (station_uuid) REFERENCES public.stations(id);

-- =====================================
-- TABLES PRODUITS ET ARTICLES
-- =====================================

-- Table des familles d'articles
CREATE TABLE public.familles_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  code_famille TEXT NOT NULL UNIQUE,
  description TEXT,
  couleur_theme TEXT,
  icone TEXT,
  taux_tva_defaut DECIMAL(5,2),
  compte_comptable TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des articles
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  code_article TEXT NOT NULL UNIQUE,
  famille_article_id UUID NOT NULL REFERENCES public.familles_articles(id),
  prix_unitaire DECIMAL(10,2) NOT NULL,
  unite_mesure TEXT NOT NULL,
  description TEXT,
  prix_achat DECIMAL(10,2),
  marge_beneficiaire DECIMAL(5,2),
  stock_minimum INTEGER,
  stock_actuel INTEGER,
  fournisseur_principal TEXT,
  code_barre TEXT,
  photo_url TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des indices carburants
CREATE TABLE public.indices_carburants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  type_carburant TEXT CHECK (type_carburant IN ('gasoil', 'ssp', 'mixte')) NOT NULL,
  valeur_indice DECIMAL(8,4) NOT NULL,
  date_application DATE NOT NULL,
  source TEXT NOT NULL,
  valeur_precedente DECIMAL(8,4),
  variation_pourcentage DECIMAL(5,2),
  frequence_mise_a_jour TEXT CHECK (frequence_mise_a_jour IN ('quotidien', 'hebdomadaire', 'mensuel')),
  methode_calcul TEXT,
  commentaires TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des prix carburants
CREATE TABLE public.prix_carburants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date_prix DATE NOT NULL,
  prix_gasoil DECIMAL(8,4) NOT NULL,
  prix_ssp DECIMAL(8,4) NOT NULL,
  societe_id UUID NOT NULL REFERENCES public.societes(id),
  prix_gasoil_precedent DECIMAL(8,4),
  prix_ssp_precedent DECIMAL(8,4),
  variation_gasoil DECIMAL(5,2),
  variation_ssp DECIMAL(5,2),
  motif_changement TEXT,
  applique_par TEXT,
  date_application DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================
-- TABLES CHARGES ET DÉPENSES
-- =====================================

-- Table des catégories de dépenses
CREATE TABLE public.categories_depenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  code_categorie TEXT NOT NULL UNIQUE,
  type_depense TEXT CHECK (type_depense IN ('fixe', 'variable', 'exceptionnelle')) NOT NULL,
  compte_comptable TEXT,
  description TEXT,
  budget_mensuel DECIMAL(12,2),
  seuil_alerte DECIMAL(12,2),
  responsable TEXT,
  autorisation_requise BOOLEAN DEFAULT false,
  niveau_autorisation TEXT CHECK (niveau_autorisation IN ('gerant', 'manager', 'direction')),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des types de charges
CREATE TABLE public.types_charges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  type TEXT CHECK (type IN ('charge', 'produit')) NOT NULL,
  compte_comptable TEXT,
  description TEXT,
  couleur_theme TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des mouvements de dépenses
CREATE TABLE public.mouvements_depenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT CHECK (type IN ('depense', 'recette')) NOT NULL,
  categorie_id UUID NOT NULL REFERENCES public.categories_depenses(id),
  description TEXT NOT NULL,
  montant DECIMAL(12,2) NOT NULL,
  date_mouvement DATE NOT NULL,
  station_id UUID REFERENCES public.stations(id),
  societe_id UUID NOT NULL REFERENCES public.societes(id),
  mode_paiement TEXT CHECK (mode_paiement IN ('espece', 'cheque', 'virement', 'carte')),
  numero_piece TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================
-- TABLES INFRASTRUCTURE STATIONS
-- =====================================

-- Table des îlots
CREATE TABLE public.ilots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  station_id UUID NOT NULL REFERENCES public.stations(id) ON DELETE CASCADE,
  numero_ilot INTEGER NOT NULL,
  nom_ilot TEXT,
  nombre_pistons INTEGER NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(station_id, numero_ilot)
);

-- Table des volucompteurs
CREATE TABLE public.volucompteurs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code_volucompteur TEXT NOT NULL UNIQUE,
  ilot_id UUID NOT NULL REFERENCES public.ilots(id) ON DELETE CASCADE,
  station_id UUID NOT NULL REFERENCES public.stations(id) ON DELETE CASCADE,
  produit_code TEXT NOT NULL,
  produit_nom TEXT NOT NULL,
  prix_unitaire DECIMAL(8,4) NOT NULL,
  index_courant INTEGER,
  statut TEXT CHECK (statut IN ('operationnel', 'maintenance', 'anomalie')) DEFAULT 'operationnel',
  date_maj TIMESTAMP WITH TIME ZONE,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================
-- TABLES RAPPORTS ET TRANSACTIONS
-- =====================================

-- Table des rapports de stations
CREATE TABLE public.rapports_stations (
  uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  station_uuid UUID NOT NULL REFERENCES public.stations(id) ON DELETE CASCADE,
  doc_entry TEXT NOT NULL,
  date_rapport TIMESTAMP WITH TIME ZONE NOT NULL,
  gerant_nom TEXT NOT NULL,
  total_ca DECIMAL(12,2) NOT NULL,
  total_tonnage DECIMAL(10,2) NOT NULL,
  numero_rapport TEXT,
  heure_creation TEXT,
  total_vente_comptant DECIMAL(12,2),
  total_vente_credit DECIMAL(12,2),
  total_non_carburant DECIMAL(12,2),
  statut TEXT CHECK (statut IN ('complet', 'manquant', 'en_cours')) NOT NULL DEFAULT 'en_cours',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des stocks citernes
CREATE TABLE public.stocks_citernes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rapport_uuid UUID NOT NULL REFERENCES public.rapports_stations(uuid) ON DELETE CASCADE,
  produit TEXT NOT NULL,
  stock_debut DECIMAL(10,2) NOT NULL,
  livraisons DECIMAL(10,2) NOT NULL DEFAULT 0,
  ventes DECIMAL(10,2) NOT NULL,
  stock_fin DECIMAL(10,2) NOT NULL,
  stock_theorique DECIMAL(10,2) NOT NULL,
  ecart DECIMAL(10,2) NOT NULL DEFAULT 0,
  capacite_max DECIMAL(10,2) NOT NULL,
  pourcentage_remplissage DECIMAL(5,2),
  code_produit TEXT,
  designation_produit TEXT,
  jauge_initiale DECIMAL(10,2),
  jauge_finale DECIMAL(10,2),
  variation DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des ventes de produits
CREATE TABLE public.ventes_produits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rapport_uuid UUID NOT NULL REFERENCES public.rapports_stations(uuid) ON DELETE CASCADE,
  volucompteur_id UUID REFERENCES public.volucompteurs(id),
  produit_code TEXT NOT NULL,
  produit_nom TEXT NOT NULL,
  quantite DECIMAL(10,3) NOT NULL,
  prix_unitaire DECIMAL(8,4) NOT NULL,
  valeur_totale DECIMAL(12,2) NOT NULL,
  type_vente TEXT CHECK (type_vente IN ('comptant', 'credit')) NOT NULL,
  client_nom TEXT,
  famille_produit TEXT CHECK (famille_produit IN ('carburant', 'non_carburant')) NOT NULL,
  categorie TEXT CHECK (categorie IN ('carburant', 'lubrifiant', 'service', 'accessoire')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des encaissements
CREATE TABLE public.encaissements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rapport_uuid UUID NOT NULL REFERENCES public.rapports_stations(uuid) ON DELETE CASCADE,
  type_paiement TEXT CHECK (type_paiement IN ('espece', 'carte', 'credit', 'cheque')) NOT NULL,
  montant DECIMAL(12,2) NOT NULL,
  pourcentage DECIMAL(5,2) NOT NULL,
  nb_transactions INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================
-- TABLES SYSTÈME ET NOTIFICATIONS
-- =====================================

-- Table des utilisateurs
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom_complet TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telephone TEXT,
  role TEXT CHECK (role IN ('admin', 'gestionnaire', 'operateur', 'consultant')) NOT NULL,
  societe_id UUID REFERENCES public.societes(id),
  avatar_url TEXT,
  date_naissance DATE,
  adresse TEXT,
  permissions JSONB,
  preferences JSONB,
  date_derniere_modification TIMESTAMP WITH TIME ZONE,
  modifie_par UUID REFERENCES public.users(id),
  active BOOLEAN NOT NULL DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des notifications
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT CHECK (type IN ('alert', 'info', 'warning', 'success')) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  station_id UUID REFERENCES public.stations(id),
  societe_id UUID REFERENCES public.societes(id),
  user_id UUID REFERENCES public.users(id),
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'critical')) NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  action_url TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  category TEXT CHECK (category IN ('system', 'business', 'maintenance', 'finance')),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des documents
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  station_uuid UUID NOT NULL REFERENCES public.stations(id) ON DELETE CASCADE,
  nom_fichier TEXT NOT NULL,
  type_document TEXT CHECK (type_document IN ('contrat', 'autorisation', 'certificat', 'plan_securite', 'autre')) NOT NULL,
  date_upload TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  url_fichier TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================
-- INDEXES POUR PERFORMANCES
-- =====================================

-- Index sur les tables principales
CREATE INDEX idx_stations_societe ON public.stations(societe_id);
CREATE INDEX idx_stations_gerant ON public.stations(gerant_id);
CREATE INDEX idx_gerants_station ON public.gerants(station_uuid);
CREATE INDEX idx_rapports_station ON public.rapports_stations(station_uuid);
CREATE INDEX idx_rapports_date ON public.rapports_stations(date_rapport);
CREATE INDEX idx_ventes_rapport ON public.ventes_produits(rapport_uuid);
CREATE INDEX idx_stocks_rapport ON public.stocks_citernes(rapport_uuid);
CREATE INDEX idx_encaissements_rapport ON public.encaissements(rapport_uuid);
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_station ON public.notifications(station_id);
CREATE INDEX idx_mouvements_station ON public.mouvements_depenses(station_id);
CREATE INDEX idx_mouvements_date ON public.mouvements_depenses(date_mouvement);
CREATE INDEX idx_prix_carburants_date ON public.prix_carburants(date_prix);
CREATE INDEX idx_prix_carburants_societe ON public.prix_carburants(societe_id);

-- =====================================
-- POLITIQUES RLS (ROW LEVEL SECURITY)
-- =====================================

-- Activer RLS sur toutes les tables
ALTER TABLE public.societes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gerants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.familles_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.indices_carburants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prix_carburants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories_depenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.types_charges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mouvements_depenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ilots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volucompteurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rapports_stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stocks_citernes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ventes_produits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.encaissements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Politiques RLS de base (lecture publique pour développement)
-- Note: À adapter selon vos besoins de sécurité
CREATE POLICY "Enable read access for all users" ON public.societes FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.gerants FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.stations FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.familles_articles FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.indices_carburants FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.prix_carburants FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.categories_depenses FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.types_charges FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.mouvements_depenses FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.ilots FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.volucompteurs FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.rapports_stations FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.stocks_citernes FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.ventes_produits FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.encaissements FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.documents FOR SELECT USING (true);

-- Politiques d'écriture pour développement (à restreindre en production)
CREATE POLICY "Enable insert for all users" ON public.societes FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.societes FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.societes FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON public.gerants FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.gerants FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.gerants FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON public.stations FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.stations FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.stations FOR DELETE USING (true);

-- Répéter pour les autres tables importantes...
CREATE POLICY "Enable all for all users" ON public.rapports_stations FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON public.ventes_produits FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON public.stocks_citernes FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON public.encaissements FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON public.mouvements_depenses FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON public.notifications FOR ALL USING (true);
