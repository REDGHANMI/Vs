
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const seedInitialData = async () => {
  try {
    console.log('Starting database seeding...');

    // Check if we already have data
    const { data: existingSocietes } = await supabase
      .from('societes')
      .select('id')
      .limit(1);

    if (existingSocietes && existingSocietes.length > 0) {
      console.log('Database already has data, skipping seed');
      return;
    }

    // Create sample societe
    const { data: societe, error: societeError } = await supabase
      .from('societes')
      .insert([{
        nom: 'PETRO SERVICES MAROC',
        code: 'PSM001',
        description: 'Société de distribution de carburants au Maroc',
        adresse: '123 Boulevard Mohammed V',
        ville: 'Casablanca',
        code_postal: '20000',
        telephone: '+212 522 123 456',
        email: 'contact@petroservices.ma',
        couleur_theme: '#213385',
        forme_juridique: 'SARL',
        active: true
      }])
      .select()
      .single();

    if (societeError) {
      console.error('Error creating societe:', societeError);
      throw societeError;
    }

    console.log('Created societe:', societe.id);

    // Create sample gerants
    const { data: gerants, error: gerantsError } = await supabase
      .from('gerants')
      .insert([
        {
          nom_complet: 'Ahmed BENZAHRA',
          nom: 'BENZAHRA',
          prenom: 'Ahmed',
          est_responsable_station: true,
          poste: 'Gérant de station',
          type_contrat: 'cdi',
          telephone: '+212 661 123 456',
          email: 'ahmed.benzahra@petroservices.ma',
          actif: true,
          active: true
        },
        {
          nom_complet: 'Fatima ALAOUI',
          nom: 'ALAOUI',
          prenom: 'Fatima',
          est_responsable_station: true,
          poste: 'Gérante de station',
          type_contrat: 'cdi',
          telephone: '+212 661 789 456',
          email: 'fatima.alaoui@petroservices.ma',
          actif: true,
          active: true
        }
      ])
      .select();

    if (gerantsError) {
      console.error('Error creating gerants:', gerantsError);
      throw gerantsError;
    }

    console.log('Created gerants:', gerants.length);

    // Create sample stations
    const stations = [
      {
        nom: 'S/S RAHMA II',
        societe_id: societe.id,
        gerant_id: gerants[0].id,
        latitude: 33.517702,
        longitude: -7.757751,
        date_mise_en_service: '2018-12-28',
        code_station: '105',
        adresse_complete: 'Route de Rabat, Km 15',
        ville: 'Casablanca',
        region: 'Casablanca-Settat',
        nombre_pistons: 6,
        capacite_stockage_gasoil: 50000,
        capacite_stockage_ssp: 30000,
        statut_operationnel: 'operationnel',
        active: true
      },
      {
        nom: 'S/S FLORIDA',
        societe_id: societe.id,
        gerant_id: gerants[1].id,
        latitude: 33.52037761,
        longitude: -7.635028876,
        date_mise_en_service: '2020-03-14',
        code_station: '106',
        adresse_complete: 'Avenue Hassan II, Centre-ville',
        ville: 'Casablanca',
        region: 'Casablanca-Settat',
        nombre_pistons: 8,
        capacite_stockage_gasoil: 60000,
        capacite_stockage_ssp: 40000,
        statut_operationnel: 'operationnel',
        active: true
      }
    ];

    const { data: createdStations, error: stationsError } = await supabase
      .from('stations')
      .insert(stations)
      .select();

    if (stationsError) {
      console.error('Error creating stations:', stationsError);
      throw stationsError;
    }

    console.log('Created stations:', createdStations.length);

    // Update gerants with station references
    if (createdStations.length >= 2) {
      await supabase
        .from('gerants')
        .update({ station_uuid: createdStations[0].id })
        .eq('id', gerants[0].id);

      await supabase
        .from('gerants')
        .update({ station_uuid: createdStations[1].id })
        .eq('id', gerants[1].id);
    }

    console.log('Database seeding completed successfully!');
    toast.success('Données d\'exemple créées avec succès');
    
    return true;
  } catch (error) {
    console.error('Error seeding database:', error);
    toast.error('Erreur lors de la création des données d\'exemple');
    throw error;
  }
};
