export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          active: boolean
          code_article: string
          code_barre: string | null
          created_at: string
          description: string | null
          famille_article_id: string
          fournisseur_principal: string | null
          id: string
          marge_beneficiaire: number | null
          nom: string
          photo_url: string | null
          prix_achat: number | null
          prix_unitaire: number
          stock_actuel: number | null
          stock_minimum: number | null
          unite_mesure: string
        }
        Insert: {
          active?: boolean
          code_article: string
          code_barre?: string | null
          created_at?: string
          description?: string | null
          famille_article_id: string
          fournisseur_principal?: string | null
          id?: string
          marge_beneficiaire?: number | null
          nom: string
          photo_url?: string | null
          prix_achat?: number | null
          prix_unitaire: number
          stock_actuel?: number | null
          stock_minimum?: number | null
          unite_mesure: string
        }
        Update: {
          active?: boolean
          code_article?: string
          code_barre?: string | null
          created_at?: string
          description?: string | null
          famille_article_id?: string
          fournisseur_principal?: string | null
          id?: string
          marge_beneficiaire?: number | null
          nom?: string
          photo_url?: string | null
          prix_achat?: number | null
          prix_unitaire?: number
          stock_actuel?: number | null
          stock_minimum?: number | null
          unite_mesure?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_famille_article_id_fkey"
            columns: ["famille_article_id"]
            isOneToOne: false
            referencedRelation: "familles_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories_depenses: {
        Row: {
          active: boolean
          autorisation_requise: boolean | null
          budget_mensuel: number | null
          code_categorie: string
          compte_comptable: string | null
          created_at: string
          description: string | null
          id: string
          niveau_autorisation: string | null
          nom: string
          responsable: string | null
          seuil_alerte: number | null
          type_depense: string
        }
        Insert: {
          active?: boolean
          autorisation_requise?: boolean | null
          budget_mensuel?: number | null
          code_categorie: string
          compte_comptable?: string | null
          created_at?: string
          description?: string | null
          id?: string
          niveau_autorisation?: string | null
          nom: string
          responsable?: string | null
          seuil_alerte?: number | null
          type_depense: string
        }
        Update: {
          active?: boolean
          autorisation_requise?: boolean | null
          budget_mensuel?: number | null
          code_categorie?: string
          compte_comptable?: string | null
          created_at?: string
          description?: string | null
          id?: string
          niveau_autorisation?: string | null
          nom?: string
          responsable?: string | null
          seuil_alerte?: number | null
          type_depense?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          date_upload: string
          id: string
          nom_fichier: string
          station_uuid: string
          type_document: string
          url_fichier: string
        }
        Insert: {
          created_at?: string
          date_upload?: string
          id?: string
          nom_fichier: string
          station_uuid: string
          type_document: string
          url_fichier: string
        }
        Update: {
          created_at?: string
          date_upload?: string
          id?: string
          nom_fichier?: string
          station_uuid?: string
          type_document?: string
          url_fichier?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_station_uuid_fkey"
            columns: ["station_uuid"]
            isOneToOne: false
            referencedRelation: "stations"
            referencedColumns: ["id"]
          },
        ]
      }
      encaissements: {
        Row: {
          created_at: string
          id: string
          montant: number
          nb_transactions: number | null
          pourcentage: number
          rapport_uuid: string
          type_paiement: string
        }
        Insert: {
          created_at?: string
          id?: string
          montant: number
          nb_transactions?: number | null
          pourcentage: number
          rapport_uuid: string
          type_paiement: string
        }
        Update: {
          created_at?: string
          id?: string
          montant?: number
          nb_transactions?: number | null
          pourcentage?: number
          rapport_uuid?: string
          type_paiement?: string
        }
        Relationships: [
          {
            foreignKeyName: "encaissements_rapport_uuid_fkey"
            columns: ["rapport_uuid"]
            isOneToOne: false
            referencedRelation: "rapports_stations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      familles_articles: {
        Row: {
          active: boolean
          code_famille: string
          compte_comptable: string | null
          couleur_theme: string | null
          created_at: string
          description: string | null
          icone: string | null
          id: string
          nom: string
          taux_tva_defaut: number | null
        }
        Insert: {
          active?: boolean
          code_famille: string
          compte_comptable?: string | null
          couleur_theme?: string | null
          created_at?: string
          description?: string | null
          icone?: string | null
          id?: string
          nom: string
          taux_tva_defaut?: number | null
        }
        Update: {
          active?: boolean
          code_famille?: string
          compte_comptable?: string | null
          couleur_theme?: string | null
          created_at?: string
          description?: string | null
          icone?: string | null
          id?: string
          nom?: string
          taux_tva_defaut?: number | null
        }
        Relationships: []
      }
      gerants: {
        Row: {
          actif: boolean
          active: boolean
          adresse: string | null
          cin: string | null
          commentaires: string | null
          created_at: string
          date_embauche: string | null
          date_fin_contrat: string | null
          date_naissance: string | null
          email: string | null
          est_responsable_station: boolean
          experience_precedente: string | null
          id: string
          niveau_education: string | null
          nom: string
          nom_complet: string
          nombre_enfants: number | null
          photo_url: string | null
          poste: string
          prenom: string
          prime_mensuelle: number | null
          salaire_base: number | null
          situation_familiale: string | null
          station_uuid: string | null
          telephone: string | null
          type_contrat: string | null
          ville: string | null
        }
        Insert: {
          actif?: boolean
          active?: boolean
          adresse?: string | null
          cin?: string | null
          commentaires?: string | null
          created_at?: string
          date_embauche?: string | null
          date_fin_contrat?: string | null
          date_naissance?: string | null
          email?: string | null
          est_responsable_station?: boolean
          experience_precedente?: string | null
          id?: string
          niveau_education?: string | null
          nom: string
          nom_complet: string
          nombre_enfants?: number | null
          photo_url?: string | null
          poste: string
          prenom: string
          prime_mensuelle?: number | null
          salaire_base?: number | null
          situation_familiale?: string | null
          station_uuid?: string | null
          telephone?: string | null
          type_contrat?: string | null
          ville?: string | null
        }
        Update: {
          actif?: boolean
          active?: boolean
          adresse?: string | null
          cin?: string | null
          commentaires?: string | null
          created_at?: string
          date_embauche?: string | null
          date_fin_contrat?: string | null
          date_naissance?: string | null
          email?: string | null
          est_responsable_station?: boolean
          experience_precedente?: string | null
          id?: string
          niveau_education?: string | null
          nom?: string
          nom_complet?: string
          nombre_enfants?: number | null
          photo_url?: string | null
          poste?: string
          prenom?: string
          prime_mensuelle?: number | null
          salaire_base?: number | null
          situation_familiale?: string | null
          station_uuid?: string | null
          telephone?: string | null
          type_contrat?: string | null
          ville?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_gerants_station"
            columns: ["station_uuid"]
            isOneToOne: false
            referencedRelation: "stations"
            referencedColumns: ["id"]
          },
        ]
      }
      ilots: {
        Row: {
          active: boolean
          created_at: string
          id: string
          nom_ilot: string | null
          nombre_pistons: number
          numero_ilot: number
          station_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          nom_ilot?: string | null
          nombre_pistons: number
          numero_ilot: number
          station_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          nom_ilot?: string | null
          nombre_pistons?: number
          numero_ilot?: number
          station_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ilots_station_id_fkey"
            columns: ["station_id"]
            isOneToOne: false
            referencedRelation: "stations"
            referencedColumns: ["id"]
          },
        ]
      }
      indices_carburants: {
        Row: {
          active: boolean
          commentaires: string | null
          created_at: string
          date_application: string
          frequence_mise_a_jour: string | null
          id: string
          methode_calcul: string | null
          nom: string
          source: string
          type_carburant: string
          valeur_indice: number
          valeur_precedente: number | null
          variation_pourcentage: number | null
        }
        Insert: {
          active?: boolean
          commentaires?: string | null
          created_at?: string
          date_application: string
          frequence_mise_a_jour?: string | null
          id?: string
          methode_calcul?: string | null
          nom: string
          source: string
          type_carburant: string
          valeur_indice: number
          valeur_precedente?: number | null
          variation_pourcentage?: number | null
        }
        Update: {
          active?: boolean
          commentaires?: string | null
          created_at?: string
          date_application?: string
          frequence_mise_a_jour?: string | null
          id?: string
          methode_calcul?: string | null
          nom?: string
          source?: string
          type_carburant?: string
          valeur_indice?: number
          valeur_precedente?: number | null
          variation_pourcentage?: number | null
        }
        Relationships: []
      }
      mouvements_depenses: {
        Row: {
          categorie_id: string
          created_at: string
          created_by: string | null
          date_mouvement: string
          description: string
          id: string
          mode_paiement: string | null
          montant: number
          numero_piece: string | null
          societe_id: string
          station_id: string | null
          type: string
        }
        Insert: {
          categorie_id: string
          created_at?: string
          created_by?: string | null
          date_mouvement: string
          description: string
          id?: string
          mode_paiement?: string | null
          montant: number
          numero_piece?: string | null
          societe_id: string
          station_id?: string | null
          type: string
        }
        Update: {
          categorie_id?: string
          created_at?: string
          created_by?: string | null
          date_mouvement?: string
          description?: string
          id?: string
          mode_paiement?: string | null
          montant?: number
          numero_piece?: string | null
          societe_id?: string
          station_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "mouvements_depenses_categorie_id_fkey"
            columns: ["categorie_id"]
            isOneToOne: false
            referencedRelation: "categories_depenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mouvements_depenses_societe_id_fkey"
            columns: ["societe_id"]
            isOneToOne: false
            referencedRelation: "societes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mouvements_depenses_station_id_fkey"
            columns: ["station_id"]
            isOneToOne: false
            referencedRelation: "stations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          category: string | null
          created_at: string
          expires_at: string | null
          id: string
          is_read: boolean
          message: string
          metadata: Json | null
          priority: string
          societe_id: string | null
          station_id: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          category?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean
          message: string
          metadata?: Json | null
          priority: string
          societe_id?: string | null
          station_id?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          category?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean
          message?: string
          metadata?: Json | null
          priority?: string
          societe_id?: string | null
          station_id?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_societe_id_fkey"
            columns: ["societe_id"]
            isOneToOne: false
            referencedRelation: "societes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_station_id_fkey"
            columns: ["station_id"]
            isOneToOne: false
            referencedRelation: "stations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      prix_carburants: {
        Row: {
          applique_par: string | null
          created_at: string
          date_application: string | null
          date_prix: string
          id: string
          motif_changement: string | null
          prix_gasoil: number
          prix_gasoil_precedent: number | null
          prix_ssp: number
          prix_ssp_precedent: number | null
          societe_id: string
          variation_gasoil: number | null
          variation_ssp: number | null
        }
        Insert: {
          applique_par?: string | null
          created_at?: string
          date_application?: string | null
          date_prix: string
          id?: string
          motif_changement?: string | null
          prix_gasoil: number
          prix_gasoil_precedent?: number | null
          prix_ssp: number
          prix_ssp_precedent?: number | null
          societe_id: string
          variation_gasoil?: number | null
          variation_ssp?: number | null
        }
        Update: {
          applique_par?: string | null
          created_at?: string
          date_application?: string | null
          date_prix?: string
          id?: string
          motif_changement?: string | null
          prix_gasoil?: number
          prix_gasoil_precedent?: number | null
          prix_ssp?: number
          prix_ssp_precedent?: number | null
          societe_id?: string
          variation_gasoil?: number | null
          variation_ssp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prix_carburants_societe_id_fkey"
            columns: ["societe_id"]
            isOneToOne: false
            referencedRelation: "societes"
            referencedColumns: ["id"]
          },
        ]
      }
      rapports_stations: {
        Row: {
          created_at: string
          date_rapport: string
          doc_entry: string
          gerant_nom: string
          heure_creation: string | null
          numero_rapport: string | null
          station_uuid: string
          statut: string
          total_ca: number
          total_non_carburant: number | null
          total_tonnage: number
          total_vente_comptant: number | null
          total_vente_credit: number | null
          uuid: string
        }
        Insert: {
          created_at?: string
          date_rapport: string
          doc_entry: string
          gerant_nom: string
          heure_creation?: string | null
          numero_rapport?: string | null
          station_uuid: string
          statut?: string
          total_ca: number
          total_non_carburant?: number | null
          total_tonnage: number
          total_vente_comptant?: number | null
          total_vente_credit?: number | null
          uuid?: string
        }
        Update: {
          created_at?: string
          date_rapport?: string
          doc_entry?: string
          gerant_nom?: string
          heure_creation?: string | null
          numero_rapport?: string | null
          station_uuid?: string
          statut?: string
          total_ca?: number
          total_non_carburant?: number | null
          total_tonnage?: number
          total_vente_comptant?: number | null
          total_vente_credit?: number | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "rapports_stations_station_uuid_fkey"
            columns: ["station_uuid"]
            isOneToOne: false
            referencedRelation: "stations"
            referencedColumns: ["id"]
          },
        ]
      }
      societes: {
        Row: {
          active: boolean
          adresse: string | null
          capital_social: number | null
          code: string
          code_postal: string | null
          couleur_theme: string | null
          created_at: string
          date_creation: string | null
          description: string | null
          email: string | null
          forme_juridique: string | null
          id: string
          logo_url: string | null
          nom: string
          numero_cnss: string | null
          numero_ice: string | null
          numero_if: string | null
          numero_patente: string | null
          numero_rc: string | null
          site_web: string | null
          telephone: string | null
          ville: string | null
        }
        Insert: {
          active?: boolean
          adresse?: string | null
          capital_social?: number | null
          code: string
          code_postal?: string | null
          couleur_theme?: string | null
          created_at?: string
          date_creation?: string | null
          description?: string | null
          email?: string | null
          forme_juridique?: string | null
          id?: string
          logo_url?: string | null
          nom: string
          numero_cnss?: string | null
          numero_ice?: string | null
          numero_if?: string | null
          numero_patente?: string | null
          numero_rc?: string | null
          site_web?: string | null
          telephone?: string | null
          ville?: string | null
        }
        Update: {
          active?: boolean
          adresse?: string | null
          capital_social?: number | null
          code?: string
          code_postal?: string | null
          couleur_theme?: string | null
          created_at?: string
          date_creation?: string | null
          description?: string | null
          email?: string | null
          forme_juridique?: string | null
          id?: string
          logo_url?: string | null
          nom?: string
          numero_cnss?: string | null
          numero_ice?: string | null
          numero_if?: string | null
          numero_patente?: string | null
          numero_rc?: string | null
          site_web?: string | null
          telephone?: string | null
          ville?: string | null
        }
        Relationships: []
      }
      stations: {
        Row: {
          active: boolean
          adresse_complete: string | null
          capacite_stockage_gasoil: number | null
          capacite_stockage_ssp: number | null
          certification_environnementale: boolean | null
          code_postal: string | null
          code_station: string | null
          commentaires: string | null
          contact_urgence: string | null
          created_at: string
          date_mise_en_service: string | null
          date_ouverture: string | null
          derniere_inspection: string | null
          gerant_id: string | null
          horaires_ouverture: Json | null
          id: string
          latitude: number
          longitude: number
          nom: string
          nombre_pistons: number | null
          photo_url: string | null
          region: string | null
          services_additionnels: Json | null
          societe_id: string
          statut: string | null
          statut_operationnel: string | null
          superficie: number | null
          ville: string | null
        }
        Insert: {
          active?: boolean
          adresse_complete?: string | null
          capacite_stockage_gasoil?: number | null
          capacite_stockage_ssp?: number | null
          certification_environnementale?: boolean | null
          code_postal?: string | null
          code_station?: string | null
          commentaires?: string | null
          contact_urgence?: string | null
          created_at?: string
          date_mise_en_service?: string | null
          date_ouverture?: string | null
          derniere_inspection?: string | null
          gerant_id?: string | null
          horaires_ouverture?: Json | null
          id?: string
          latitude: number
          longitude: number
          nom: string
          nombre_pistons?: number | null
          photo_url?: string | null
          region?: string | null
          services_additionnels?: Json | null
          societe_id: string
          statut?: string | null
          statut_operationnel?: string | null
          superficie?: number | null
          ville?: string | null
        }
        Update: {
          active?: boolean
          adresse_complete?: string | null
          capacite_stockage_gasoil?: number | null
          capacite_stockage_ssp?: number | null
          certification_environnementale?: boolean | null
          code_postal?: string | null
          code_station?: string | null
          commentaires?: string | null
          contact_urgence?: string | null
          created_at?: string
          date_mise_en_service?: string | null
          date_ouverture?: string | null
          derniere_inspection?: string | null
          gerant_id?: string | null
          horaires_ouverture?: Json | null
          id?: string
          latitude?: number
          longitude?: number
          nom?: string
          nombre_pistons?: number | null
          photo_url?: string | null
          region?: string | null
          services_additionnels?: Json | null
          societe_id?: string
          statut?: string | null
          statut_operationnel?: string | null
          superficie?: number | null
          ville?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stations_gerant_id_fkey"
            columns: ["gerant_id"]
            isOneToOne: false
            referencedRelation: "gerants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stations_societe_id_fkey"
            columns: ["societe_id"]
            isOneToOne: false
            referencedRelation: "societes"
            referencedColumns: ["id"]
          },
        ]
      }
      stocks_citernes: {
        Row: {
          capacite_max: number
          code_produit: string | null
          created_at: string
          designation_produit: string | null
          ecart: number
          id: string
          jauge_finale: number | null
          jauge_initiale: number | null
          livraisons: number
          pourcentage_remplissage: number | null
          produit: string
          rapport_uuid: string
          stock_debut: number
          stock_fin: number
          stock_theorique: number
          variation: number | null
          ventes: number
        }
        Insert: {
          capacite_max: number
          code_produit?: string | null
          created_at?: string
          designation_produit?: string | null
          ecart?: number
          id?: string
          jauge_finale?: number | null
          jauge_initiale?: number | null
          livraisons?: number
          pourcentage_remplissage?: number | null
          produit: string
          rapport_uuid: string
          stock_debut: number
          stock_fin: number
          stock_theorique: number
          variation?: number | null
          ventes: number
        }
        Update: {
          capacite_max?: number
          code_produit?: string | null
          created_at?: string
          designation_produit?: string | null
          ecart?: number
          id?: string
          jauge_finale?: number | null
          jauge_initiale?: number | null
          livraisons?: number
          pourcentage_remplissage?: number | null
          produit?: string
          rapport_uuid?: string
          stock_debut?: number
          stock_fin?: number
          stock_theorique?: number
          variation?: number | null
          ventes?: number
        }
        Relationships: [
          {
            foreignKeyName: "stocks_citernes_rapport_uuid_fkey"
            columns: ["rapport_uuid"]
            isOneToOne: false
            referencedRelation: "rapports_stations"
            referencedColumns: ["uuid"]
          },
        ]
      }
      types_charges: {
        Row: {
          active: boolean
          code: string
          compte_comptable: string | null
          couleur_theme: string | null
          created_at: string
          description: string | null
          id: string
          nom: string
          type: string
        }
        Insert: {
          active?: boolean
          code: string
          compte_comptable?: string | null
          couleur_theme?: string | null
          created_at?: string
          description?: string | null
          id?: string
          nom: string
          type: string
        }
        Update: {
          active?: boolean
          code?: string
          compte_comptable?: string | null
          couleur_theme?: string | null
          created_at?: string
          description?: string | null
          id?: string
          nom?: string
          type?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          active: boolean
          adresse: string | null
          avatar_url: string | null
          created_at: string
          date_derniere_modification: string | null
          date_naissance: string | null
          email: string
          id: string
          last_login: string | null
          modifie_par: string | null
          nom_complet: string
          permissions: Json | null
          preferences: Json | null
          role: string
          societe_id: string | null
          telephone: string | null
        }
        Insert: {
          active?: boolean
          adresse?: string | null
          avatar_url?: string | null
          created_at?: string
          date_derniere_modification?: string | null
          date_naissance?: string | null
          email: string
          id?: string
          last_login?: string | null
          modifie_par?: string | null
          nom_complet: string
          permissions?: Json | null
          preferences?: Json | null
          role: string
          societe_id?: string | null
          telephone?: string | null
        }
        Update: {
          active?: boolean
          adresse?: string | null
          avatar_url?: string | null
          created_at?: string
          date_derniere_modification?: string | null
          date_naissance?: string | null
          email?: string
          id?: string
          last_login?: string | null
          modifie_par?: string | null
          nom_complet?: string
          permissions?: Json | null
          preferences?: Json | null
          role?: string
          societe_id?: string | null
          telephone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_modifie_par_fkey"
            columns: ["modifie_par"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_societe_id_fkey"
            columns: ["societe_id"]
            isOneToOne: false
            referencedRelation: "societes"
            referencedColumns: ["id"]
          },
        ]
      }
      ventes_produits: {
        Row: {
          categorie: string
          client_nom: string | null
          created_at: string
          famille_produit: string
          id: string
          prix_unitaire: number
          produit_code: string
          produit_nom: string
          quantite: number
          rapport_uuid: string
          type_vente: string
          valeur_totale: number
          volucompteur_id: string | null
        }
        Insert: {
          categorie: string
          client_nom?: string | null
          created_at?: string
          famille_produit: string
          id?: string
          prix_unitaire: number
          produit_code: string
          produit_nom: string
          quantite: number
          rapport_uuid: string
          type_vente: string
          valeur_totale: number
          volucompteur_id?: string | null
        }
        Update: {
          categorie?: string
          client_nom?: string | null
          created_at?: string
          famille_produit?: string
          id?: string
          prix_unitaire?: number
          produit_code?: string
          produit_nom?: string
          quantite?: number
          rapport_uuid?: string
          type_vente?: string
          valeur_totale?: number
          volucompteur_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ventes_produits_rapport_uuid_fkey"
            columns: ["rapport_uuid"]
            isOneToOne: false
            referencedRelation: "rapports_stations"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "ventes_produits_volucompteur_id_fkey"
            columns: ["volucompteur_id"]
            isOneToOne: false
            referencedRelation: "volucompteurs"
            referencedColumns: ["id"]
          },
        ]
      }
      volucompteurs: {
        Row: {
          active: boolean
          code_volucompteur: string
          created_at: string
          date_maj: string | null
          id: string
          ilot_id: string
          index_courant: number | null
          prix_unitaire: number
          produit_code: string
          produit_nom: string
          station_id: string
          statut: string | null
        }
        Insert: {
          active?: boolean
          code_volucompteur: string
          created_at?: string
          date_maj?: string | null
          id?: string
          ilot_id: string
          index_courant?: number | null
          prix_unitaire: number
          produit_code: string
          produit_nom: string
          station_id: string
          statut?: string | null
        }
        Update: {
          active?: boolean
          code_volucompteur?: string
          created_at?: string
          date_maj?: string | null
          id?: string
          ilot_id?: string
          index_courant?: number | null
          prix_unitaire?: number
          produit_code?: string
          produit_nom?: string
          station_id?: string
          statut?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "volucompteurs_ilot_id_fkey"
            columns: ["ilot_id"]
            isOneToOne: false
            referencedRelation: "ilots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volucompteurs_station_id_fkey"
            columns: ["station_id"]
            isOneToOne: false
            referencedRelation: "stations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
