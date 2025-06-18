import { supabase } from '@/integrations/supabase/client';
import { Societe, Station, Gerant, Notification } from '@/types/database';

// Service for fetching societes
export const getSocietesFromSupabase = async (): Promise<Societe[]> => {
  try {
    console.log('Fetching societes from Supabase...');
    const { data, error } = await supabase
      .from('societes')
      .select('*')
      .eq('active', true)
      .order('nom');

    if (error) {
      console.error('Error fetching societes:', error);
      throw error;
    }

    console.log('Successfully fetched societes:', data?.length || 0);
    console.log('Societes data:', data);
    return (data || []) as Societe[];
  } catch (error) {
    console.error('Exception in getSocietesFromSupabase:', error);
    return [];
  }
};

// Service for fetching stations with relations
export const getStationsFromSupabase = async (): Promise<Station[]> => {
  try {
    console.log('Fetching stations from Supabase...');
    const { data, error } = await supabase
      .from('stations')
      .select('*')
      .eq('active', true)
      .order('nom');

    if (error) {
      console.error('Error fetching stations:', error);
      throw error;
    }

    console.log('Successfully fetched stations:', data?.length || 0);
    console.log('Stations data:', data);
    
    // Transform the data to match our interface expectations
    const transformedData = (data || []).map(station => ({
      ...station,
      services_additionnels: Array.isArray(station.services_additionnels) 
        ? station.services_additionnels 
        : station.services_additionnels 
          ? [station.services_additionnels as string]
          : []
    })) as Station[];

    console.log('Transformed stations:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Exception in getStationsFromSupabase:', error);
    return [];
  }
};

// Service for fetching gerants
export const getGerantsFromSupabase = async (): Promise<Gerant[]> => {
  try {
    console.log('Fetching gerants from Supabase...');
    const { data, error } = await supabase
      .from('gerants')
      .select('*')
      .eq('active', true)
      .order('nom_complet');

    if (error) {
      console.error('Error fetching gerants:', error);
      throw error;
    }

    console.log('Successfully fetched gerants:', data?.length || 0);
    console.log('Gerants data:', data);
    
    // Transform the data to ensure type_contrat matches our enum
    const transformedData = (data || []).map(gerant => ({
      ...gerant,
      type_contrat: ['cdi', 'cdd', 'stage', 'freelance'].includes(gerant.type_contrat || '') 
        ? gerant.type_contrat as "cdi" | "cdd" | "stage" | "freelance"
        : undefined
    })) as Gerant[];

    console.log('Transformed gerants:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Exception in getGerantsFromSupabase:', error);
    return [];
  }
};

// Service for fetching notifications
export const getNotificationsFromSupabase = async (): Promise<Notification[]> => {
  try {
    console.log('Fetching notifications from Supabase...');
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }

    console.log('Successfully fetched notifications:', data?.length || 0);
    
    // Transform the data to ensure enum types match our interface
    const transformedData = (data || []).map(notification => ({
      ...notification,
      type: ['alert', 'info', 'warning', 'success'].includes(notification.type || '') 
        ? notification.type as "alert" | "info" | "warning" | "success"
        : 'info' as const,
      priority: ['low', 'medium', 'high', 'critical'].includes(notification.priority || '') 
        ? notification.priority as "low" | "medium" | "high" | "critical"
        : 'medium' as const,
      category: notification.category && ['system', 'business', 'maintenance', 'finance'].includes(notification.category) 
        ? notification.category as "system" | "business" | "maintenance" | "finance"
        : undefined
    })) as Notification[];

    return transformedData;
  } catch (error) {
    console.error('Exception in getNotificationsFromSupabase:', error);
    return [];
  }
};

// CRUD operations for Societes
export const createSociete = async (societe: Omit<Societe, 'id' | 'created_at'>): Promise<Societe> => {
  console.log('Creating societe:', societe.nom);
  const { data, error } = await supabase
    .from('societes')
    .insert([societe])
    .select()
    .single();

  if (error) {
    console.error('Error creating societe:', error);
    throw error;
  }

  console.log('Created societe:', data.id);
  return data as Societe;
};

export const updateSociete = async (id: string, updates: Partial<Societe>): Promise<Societe> => {
  console.log('Updating societe:', id);
  const { data, error } = await supabase
    .from('societes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating societe:', error);
    throw error;
  }

  console.log('Updated societe:', data.id);
  return data as Societe;
};

export const deleteSociete = async (id: string): Promise<void> => {
  console.log('Deleting societe:', id);
  const { error } = await supabase
    .from('societes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting societe:', error);
    throw error;
  }

  console.log('Deleted societe:', id);
};

// CRUD operations for Stations
export const createStation = async (station: Omit<Station, 'id' | 'created_at'>): Promise<Station> => {
  console.log('Creating station:', station.nom);
  
  // Transform services_additionnels for database storage
  const stationData = {
    ...station,
    services_additionnels: station.services_additionnels || []
  };

  const { data, error } = await supabase
    .from('stations')
    .insert([stationData])
    .select()
    .single();

  if (error) {
    console.error('Error creating station:', error);
    throw error;
  }

  console.log('Created station:', data.id);
  
  // Transform back for our interface
  const transformedData = {
    ...data,
    services_additionnels: Array.isArray(data.services_additionnels) 
      ? data.services_additionnels 
      : data.services_additionnels 
        ? [data.services_additionnels as string]
        : []
  } as Station;

  return transformedData;
};

export const updateStation = async (id: string, updates: Partial<Station>): Promise<Station> => {
  console.log('Updating station:', id);
  
  // Transform services_additionnels for database storage
  const updateData = {
    ...updates,
    services_additionnels: updates.services_additionnels || []
  };

  const { data, error } = await supabase
    .from('stations')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating station:', error);
    throw error;
  }

  console.log('Updated station:', data.id);
  
  // Transform back for our interface
  const transformedData = {
    ...data,
    services_additionnels: Array.isArray(data.services_additionnels) 
      ? data.services_additionnels 
      : data.services_additionnels 
        ? [data.services_additionnels as string]
        : []
  } as Station;

  return transformedData;
};

export const deleteStation = async (id: string): Promise<void> => {
  console.log('Deleting station:', id);
  const { error } = await supabase
    .from('stations')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting station:', error);
    throw error;
  }

  console.log('Deleted station:', id);
};

// CRUD operations for Gerants
export const createGerant = async (gerant: Omit<Gerant, 'id' | 'created_at'>): Promise<Gerant> => {
  console.log('Creating gerant:', gerant.nom_complet);
  const { data, error } = await supabase
    .from('gerants')
    .insert([gerant])
    .select()
    .single();

  if (error) {
    console.error('Error creating gerant:', error);
    throw error;
  }

  console.log('Created gerant:', data.id);
  
  // Transform the data to ensure type_contrat matches our enum
  const transformedData = {
    ...data,
    type_contrat: ['cdi', 'cdd', 'stage', 'freelance'].includes(data.type_contrat || '') 
      ? data.type_contrat as "cdi" | "cdd" | "stage" | "freelance"
      : undefined
  } as Gerant;

  return transformedData;
};

export const updateGerant = async (id: string, updates: Partial<Gerant>): Promise<Gerant> => {
  console.log('Updating gerant:', id);
  const { data, error } = await supabase
    .from('gerants')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating gerant:', error);
    throw error;
  }

  console.log('Updated gerant:', data.id);
  
  // Transform the data to ensure type_contrat matches our enum
  const transformedData = {
    ...data,
    type_contrat: ['cdi', 'cdd', 'stage', 'freelance'].includes(data.type_contrat || '') 
      ? data.type_contrat as "cdi" | "cdd" | "stage" | "freelance"
      : undefined
  } as Gerant;

  return transformedData;
};

export const deleteGerant = async (id: string): Promise<void> => {
  console.log('Deleting gerant:', id);
  const { error } = await supabase
    .from('gerants')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting gerant:', error);
    throw error;
  }

  console.log('Deleted gerant:', id);
};
