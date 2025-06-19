
import { supabase } from '@/integrations/supabase/client';

export interface RapportStation {
  uuid: string;
  station_uuid: string;
  doc_entry: string;
  date_rapport: string;
  gerant_nom: string;
  total_ca: number;
  total_tonnage: number;
  numero_rapport: string | null;
  heure_creation: string | null;
  total_vente_comptant: number | null;
  total_vente_credit: number | null;
  total_non_carburant: number | null;
  statut: "complet" | "manquant" | "en_cours";
  created_at: string;
}

export const getRapportsForStation = async (stationId: string): Promise<RapportStation[]> => {
  try {
    console.log('📊 Fetching reports for station:', stationId);
    
    const { data, error } = await supabase
      .from('rapports_stations')
      .select('*')
      .eq('station_uuid', stationId)
      .order('date_rapport', { ascending: false });

    if (error) {
      console.error('❌ Error fetching reports:', error);
      throw error;
    }

    console.log('✅ Successfully fetched reports:', data?.length || 0);
    return (data || []) as RapportStation[];
  } catch (error) {
    console.error('💥 Exception in getRapportsForStation:', error);
    return [];
  }
};

export const getAllRapports = async (): Promise<RapportStation[]> => {
  try {
    console.log('📊 Fetching all reports...');
    
    const { data, error } = await supabase
      .from('rapports_stations')
      .select('*')
      .order('date_rapport', { ascending: false });

    if (error) {
      console.error('❌ Error fetching all reports:', error);
      throw error;
    }

    console.log('✅ Successfully fetched all reports:', data?.length || 0);
    return (data || []) as RapportStation[];
  } catch (error) {
    console.error('💥 Exception in getAllRapports:', error);
    return [];
  }
};

export const getVolucompteursForReport = async (reportUuid: string) => {
  try {
    console.log('📊 Fetching volucompteurs for report:', reportUuid);
    
    const { data, error } = await supabase
      .from('ventes_produits')
      .select(`
        *,
        volucompteurs(
          *,
          ilots(*)
        )
      `)
      .eq('rapport_uuid', reportUuid);

    if (error) {
      console.error('❌ Error fetching volucompteurs:', error);
      throw error;
    }

    console.log('✅ Successfully fetched volucompteurs:', data?.length || 0);
    return data || [];
  } catch (error) {
    console.error('💥 Exception in getVolucompteursForReport:', error);
    return [];
  }
};

export const getEncaissementsForReport = async (reportUuid: string) => {
  try {
    console.log('📊 Fetching encaissements for report:', reportUuid);
    
    const { data, error } = await supabase
      .from('encaissements')
      .select('*')
      .eq('rapport_uuid', reportUuid)
      .order('montant', { ascending: false });

    if (error) {
      console.error('❌ Error fetching encaissements:', error);
      throw error;
    }

    console.log('✅ Successfully fetched encaissements:', data?.length || 0);
    return data || [];
  } catch (error) {
    console.error('💥 Exception in getEncaissementsForReport:', error);
    return [];
  }
};

export const getVentesForReport = async (reportUuid: string) => {
  try {
    console.log('📊 Fetching ventes for report:', reportUuid);
    
    const { data, error } = await supabase
      .from('ventes_produits')
      .select('*')
      .eq('rapport_uuid', reportUuid)
      .order('valeur_totale', { ascending: false });

    if (error) {
      console.error('❌ Error fetching ventes:', error);
      throw error;
    }

    console.log('✅ Successfully fetched ventes:', data?.length || 0);
    return data || [];
  } catch (error) {
    console.error('💥 Exception in getVentesForReport:', error);
    return [];
  }
};

export const getStocksCiternesForReport = async (reportUuid: string) => {
  try {
    console.log('📊 Fetching stocks citernes for report:', reportUuid);
    
    const { data, error } = await supabase
      .from('stocks_citernes')
      .select('*')
      .eq('rapport_uuid', reportUuid)
      .order('produit', { ascending: true });

    if (error) {
      console.error('❌ Error fetching stocks citernes:', error);
      throw error;
    }

    console.log('✅ Successfully fetched stocks citernes:', data?.length || 0);
    return data || [];
  } catch (error) {
    console.error('💥 Exception in getStocksCiternesForReport:', error);
    return [];
  }
};
