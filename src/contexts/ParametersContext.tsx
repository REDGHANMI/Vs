import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  getAllSocietesEnhanced, 
  getAllStationsConsolidees, 
  getAllNotifications 
} from '@/services/dataService';
import { 
  createSociete, 
  updateSociete, 
  deleteSociete as deleteSocieteService,
  createStation,
  updateStation,
  deleteStation as deleteStationService,
  createGerant,
  updateGerant,
  deleteGerant as deleteGerantService,
  getGerantsFromSupabase
} from '@/services/supabaseDataService';
import { Societe, Station, Gerant, Notification } from '@/types/database';
import { mockMouvements } from '@/data/mockMouvements';

interface ParametersContextType {
  // Data
  societes: Societe[];
  stations: Station[];
  gerants: Gerant[];
  notifications: Notification[];
  mouvements: typeof mockMouvements;
  
  // Loading states
  loading: boolean;
  
  // CRUD operations for Societes
  createSociete: (societe: Omit<Societe, 'id' | 'created_at'>) => Promise<void>;
  updateSociete: (id: string, updates: Partial<Societe>) => Promise<void>;
  deleteSociete: (id: string) => Promise<void>;
  
  // CRUD operations for Stations
  createStation: (station: Omit<Station, 'id' | 'created_at'>) => Promise<void>;
  updateStation: (id: string, updates: Partial<Station>) => Promise<void>;
  deleteStation: (id: string) => Promise<void>;
  
  // CRUD operations for Gerants
  createGerant: (gerant: Omit<Gerant, 'id' | 'created_at'>) => Promise<void>;
  updateGerant: (id: string, updates: Partial<Gerant>) => Promise<void>;
  deleteGerant: (id: string) => Promise<void>;
  
  // Helper functions
  getSocieteById: (id: string) => Societe | undefined;
  getStationById: (id: string) => Station | undefined;
  getGerantById: (id: string) => Gerant | undefined;
  getStationsWithRelations: () => Station[];
  
  // Refresh data
  refreshData: () => Promise<void>;
}

const ParametersContext = createContext<ParametersContextType | undefined>(undefined);

export function ParametersProvider({ children }: { children: ReactNode }) {
  const [societes, setSocietes] = useState<Societe[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [gerants, setGerants] = useState<Gerant[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Keep mock movements for now as they're not migrated yet
  const mouvements = mockMouvements;

  const loadData = async () => {
    try {
      setLoading(true);
      console.log('ParametersContext: Starting data load...');
      
      const [societesData, stationsData, gerantsData, notificationsData] = await Promise.all([
        getAllSocietesEnhanced(),
        getAllStationsConsolidees(),
        getGerantsFromSupabase(),
        getAllNotifications()
      ]);

      console.log('ParametersContext: Raw data loaded:', {
        societes: societesData,
        stations: stationsData,
        gerants: gerantsData,
        notifications: notificationsData
      });

      // Ensure we have arrays
      const safeSocietes = Array.isArray(societesData) ? societesData : [];
      const safeStations = Array.isArray(stationsData) ? stationsData : [];
      const safeGerants = Array.isArray(gerantsData) ? gerantsData : [];
      const safeNotifications = Array.isArray(notificationsData) ? notificationsData : [];

      console.log('ParametersContext: Setting state with:', {
        societes: safeSocietes.length,
        stations: safeStations.length,
        gerants: safeGerants.length,
        notifications: safeNotifications.length
      });

      setSocietes(safeSocietes);
      setStations(safeStations);
      setGerants(safeGerants);
      setNotifications(safeNotifications);

    } catch (error) {
      console.error('ParametersContext: Error loading data:', error);
      // Set empty arrays on error to prevent undefined states
      setSocietes([]);
      setStations([]);
      setGerants([]);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Debug: Log state changes
  useEffect(() => {
    console.log('ParametersContext: State updated:', {
      societes: societes.length,
      stations: stations.length,
      gerants: gerants.length,
      loading
    });
  }, [societes, stations, gerants, loading]);

  // CRUD operations for Societes
  const handleCreateSociete = async (societeData: Omit<Societe, 'id' | 'created_at'>) => {
    try {
      const newSociete = await createSociete(societeData);
      setSocietes(prev => [...prev, newSociete]);
      console.log('ParametersContext: Created societe:', newSociete.id);
    } catch (error) {
      console.error('ParametersContext: Error creating societe:', error);
      throw error;
    }
  };

  const handleUpdateSociete = async (id: string, updates: Partial<Societe>) => {
    try {
      const updatedSociete = await updateSociete(id, updates);
      setSocietes(prev => prev.map(s => s.id === id ? updatedSociete : s));
      console.log('ParametersContext: Updated societe:', id);
    } catch (error) {
      console.error('ParametersContext: Error updating societe:', error);
      throw error;
    }
  };

  const handleDeleteSociete = async (id: string) => {
    try {
      await deleteSocieteService(id);
      setSocietes(prev => prev.filter(s => s.id !== id));
      console.log('ParametersContext: Deleted societe:', id);
    } catch (error) {
      console.error('ParametersContext: Error deleting societe:', error);
      throw error;
    }
  };

  // CRUD operations for Stations
  const handleCreateStation = async (stationData: Omit<Station, 'id' | 'created_at'>) => {
    try {
      const newStation = await createStation(stationData);
      setStations(prev => [...prev, newStation]);
      console.log('ParametersContext: Created station:', newStation.id);
    } catch (error) {
      console.error('ParametersContext: Error creating station:', error);
      throw error;
    }
  };

  const handleUpdateStation = async (id: string, updates: Partial<Station>) => {
    try {
      const updatedStation = await updateStation(id, updates);
      setStations(prev => prev.map(s => s.id === id ? updatedStation : s));
      console.log('ParametersContext: Updated station:', id);
    } catch (error) {
      console.error('ParametersContext: Error updating station:', error);
      throw error;
    }
  };

  const handleDeleteStation = async (id: string) => {
    try {
      await deleteStationService(id);
      setStations(prev => prev.filter(s => s.id !== id));
      console.log('ParametersContext: Deleted station:', id);
    } catch (error) {
      console.error('ParametersContext: Error deleting station:', error);
      throw error;
    }
  };

  // CRUD operations for Gerants
  const handleCreateGerant = async (gerantData: Omit<Gerant, 'id' | 'created_at'>) => {
    try {
      const newGerant = await createGerant(gerantData);
      setGerants(prev => [...prev, newGerant]);
      console.log('ParametersContext: Created gerant:', newGerant.id);
    } catch (error) {
      console.error('ParametersContext: Error creating gerant:', error);
      throw error;
    }
  };

  const handleUpdateGerant = async (id: string, updates: Partial<Gerant>) => {
    try {
      const updatedGerant = await updateGerant(id, updates);
      setGerants(prev => prev.map(g => g.id === id ? updatedGerant : g));
      console.log('ParametersContext: Updated gerant:', id);
    } catch (error) {
      console.error('ParametersContext: Error updating gerant:', error);
      throw error;
    }
  };

  const handleDeleteGerant = async (id: string) => {
    try {
      await deleteGerantService(id);
      setGerants(prev => prev.filter(g => g.id !== id));
      console.log('ParametersContext: Deleted gerant:', id);
    } catch (error) {
      console.error('ParametersContext: Error deleting gerant:', error);
      throw error;
    }
  };

  // Helper functions
  const getSocieteById = (id: string) => {
    const societe = societes.find(s => s.id === id);
    console.log('getSocieteById:', id, societe);
    return societe;
  };

  const getStationById = (id: string) => {
    const station = stations.find(s => s.id === id);
    console.log('getStationById:', id, station);
    return station;
  };

  const getGerantById = (id: string) => {
    const gerant = gerants.find(g => g.id === id);
    console.log('getGerantById:', id, gerant);
    return gerant;
  };

  const getStationsWithRelations = () => {
    console.log('getStationsWithRelations: Processing stations:', stations.length);
    
    const stationsWithRelations = stations.map(station => {
      const societe = getSocieteById(station.societe_id);
      const gerant = station.gerant_id ? getGerantById(station.gerant_id) : undefined;
      
      const enrichedStation = {
        ...station,
        societe,
        gerant
      };

      console.log('Enriched station:', {
        id: station.id,
        nom: station.nom,
        societe_id: station.societe_id,
        societe: societe?.nom,
        gerant_id: station.gerant_id,
        gerant: gerant?.nom_complet
      });

      return enrichedStation;
    });

    console.log('getStationsWithRelations: Returning', stationsWithRelations.length, 'stations');
    return stationsWithRelations;
  };

  const refreshData = async () => {
    console.log('ParametersContext: Refreshing data...');
    await loadData();
  };

  const value: ParametersContextType = {
    // Data
    societes,
    stations,
    gerants,
    notifications,
    mouvements,
    
    // Loading states
    loading,
    
    // CRUD operations
    createSociete: handleCreateSociete,
    updateSociete: handleUpdateSociete,
    deleteSociete: handleDeleteSociete,
    
    createStation: handleCreateStation,
    updateStation: handleUpdateStation,
    deleteStation: handleDeleteStation,
    
    createGerant: handleCreateGerant,
    updateGerant: handleUpdateGerant,
    deleteGerant: handleDeleteGerant,
    
    // Helper functions
    getSocieteById,
    getStationById,
    getGerantById,
    getStationsWithRelations,
    
    // Refresh
    refreshData
  };

  return (
    <ParametersContext.Provider value={value}>
      {children}
    </ParametersContext.Provider>
  );
}

export function useParameters() {
  const context = useContext(ParametersContext);
  if (context === undefined) {
    throw new Error('useParameters must be used within a ParametersProvider');
  }
  return context;
}
