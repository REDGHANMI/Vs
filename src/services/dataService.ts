// Updated data service to use Supabase instead of mock data
import { 
  getSocietesFromSupabase, 
  getStationsFromSupabase, 
  getGerantsFromSupabase, 
  getNotificationsFromSupabase 
} from './supabaseDataService';

// Import mock data as fallback for features not yet migrated
import { mockSalaries } from '@/data/mockSalaries';

// Use Supabase services for main entities
export const getAllSocietesEnhanced = getSocietesFromSupabase;
export const getAllStationsConsolidees = getStationsFromSupabase;
export const getAllNotifications = getNotificationsFromSupabase;

// Keep mock data for features not yet migrated to Supabase
export const getAllSalaries = async () => {
  return mockSalaries;
};
