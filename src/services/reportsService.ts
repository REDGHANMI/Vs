
import { supabase } from '@/integrations/supabase/client';

export interface RapportStation {
  uuid: string;
  station_uuid: string;
  date_rapport: string;
  numero_rapport: string | null;
  heure_creation: string | null;
  statut: string;
  total_ca: number;
  total_tonnage: number;
  total_vente_comptant: number | null;
  total_vente_credit: number | null;
  total_non_carburant: number | null;
  gerant_nom: string;
  doc_entry: string;
  created_at: string;
}

export const getRapportsForStation = async (stationId: string): Promise<RapportStation[]> => {
  try {
    console.log('Fetching reports for station:', stationId);
    const { data, error } = await supabase
      .from('rapports_stations')
      .select('*')
      .eq('station_uuid', stationId)
      .order('date_rapport', { ascending: false });

    if (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }

    console.log('Successfully fetched reports:', data?.length || 0, data);
    return (data || []) as RapportStation[];
  } catch (error) {
    console.error('Exception in getRapportsForStation:', error);
    return [];
  }
};

export const getVentesForReport = async (reportUuid: string) => {
  try {
    console.log('Fetching sales for report:', reportUuid);
    const { data, error } = await supabase
      .from('ventes_produits')
      .select('*')
      .eq('rapport_uuid', reportUuid)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sales:', error);
      throw error;
    }

    console.log('Successfully fetched sales:', data?.length || 0, data);
    return data || [];
  } catch (error) {
    console.error('Exception in getVentesForReport:', error);
    return [];
  }
};

export const getEncaissementsForReport = async (reportUuid: string) => {
  try {
    console.log('Fetching payments for report:', reportUuid);
    const { data, error } = await supabase
      .from('encaissements')
      .select('*')
      .eq('rapport_uuid', reportUuid)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }

    console.log('Successfully fetched payments:', data?.length || 0, data);
    return data || [];
  } catch (error) {
    console.error('Exception in getEncaissementsForReport:', error);
    return [];
  }
};

export const getStocksCiternesForReport = async (reportUuid: string) => {
  try {
    console.log('Fetching tank stocks for report:', reportUuid);
    const { data, error } = await supabase
      .from('stocks_citernes')
      .select('*')
      .eq('rapport_uuid', reportUuid)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tank stocks:', error);
      throw error;
    }

    console.log('Successfully fetched tank stocks:', data?.length || 0, data);
    return data || [];
  } catch (error) {
    console.error('Exception in getStocksCiternesForReport:', error);
    return [];
  }
};

export const getVolucompteursForReport = async (reportUuid: string) => {
  try {
    console.log('Fetching volucompteurs for report:', reportUuid);
    
    // Récupérer les lignes de volucompteur liées au rapport
    const { data: lignesData, error: lignesError } = await supabase
      .from('ventes_produits')
      .select(`
        *,
        volucompteurs:volucompteur_id (
          id,
          code_volucompteur,
          produit_nom,
          produit_code,
          prix_unitaire,
          ilots:ilot_id (
            id,
            nom_ilot,
            numero_ilot
          )
        )
      `)
      .eq('rapport_uuid', reportUuid)
      .not('volucompteur_id', 'is', null);

    if (lignesError) {
      console.error('Error fetching volucompteur lines:', lignesError);
      throw lignesError;
    }

    console.log('Successfully fetched volucompteur lines:', lignesData?.length || 0, lignesData);
    return lignesData || [];
  } catch (error) {
    console.error('Exception in getVolucompteursForReport:', error);
    return [];
  }
};
