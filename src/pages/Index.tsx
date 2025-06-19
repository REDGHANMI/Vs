
import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import KpiHeader from "@/components/KpiHeader";
import MapView from "@/components/MapView";
import StationSlidePanel from "@/components/StationSlidePanel";
import SocietyManager from "@/components/SocietyManager";
import AlertsPanel from "@/components/AlertsPanel";
import { useParameters } from "@/contexts/ParametersContext";
import { Station } from "@/types/database";

export default function Index() {
  const { loading, societes, stations, gerants } = useParameters();
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [selectedSociety, setSelectedSociety] = useState<string>("all");
  const [mapboxToken, setMapboxToken] = useState<string>("pk.eyJ1IjoibGF6cmFrYXBwIiwiYSI6ImNtYnduajVlNTB1eGIya3M4MHMycmhpMHQifQ.p98qwbrJCwnx4t5DZ3S2RQ");
  const [highlightedStations, setHighlightedStations] = useState<string[]>([]);

  // Debug: Log data state
  useEffect(() => {
    console.log('Index: Data state updated:', {
      loading,
      societes: societes.length,
      stations: stations.length,
      gerants: gerants.length
    });
  }, [loading, societes, stations, gerants]);

  // Get stations with relations - process data locally
  const allStations: Station[] = stations.map(station => {
    const societe = societes.find(s => s.id === station.societe_id);
    const gerant = station.gerant_id ? gerants.find(g => g.id === station.gerant_id) : undefined;
    
    return {
      ...station,
      societe,
      gerant
    };
  });

  console.log('Index: Processed stations:', allStations.length);
  
  const selectedStation = selectedStationId 
    ? allStations.find(s => s.id === selectedStationId)
    : null;

  // Filtrer les stations pour les KPIs selon la société sélectionnée
  const filteredStationsForKPI = selectedSociety === "all" 
    ? allStations 
    : allStations.filter(s => s.societe_id === selectedSociety);

  // La carte montre toujours toutes les stations
  const stationsForMap = allStations;

  console.log('Index: Rendering with data:', {
    total: allStations.length,
    filtered: filteredStationsForKPI.length,
    selectedSociety,
    loading
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  // Show a message if no data is available
  if (!loading && allStations.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Aucune donnée disponible</h2>
          <p className="text-gray-600">Les données n'ont pas pu être chargées depuis la base de données.</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <SidebarInset className="flex-1 flex flex-col">
          {/* KPI Header */}
          <KpiHeader 
            stations={filteredStationsForKPI}
            selectedSociety={selectedSociety}
            onSocietyChange={setSelectedSociety}
            onHighlightStations={setHighlightedStations}
          />

          {/* Society Manager */}
          <SocietyManager 
            selectedSociety={selectedSociety}
            onSocietyChange={setSelectedSociety}
          />

          {/* Main Layout */}
          <div className="flex-1 flex">
            {/* Map View */}
            <div className="flex-1 relative">
              <MapView 
                stations={stationsForMap}
                selectedStationId={selectedStationId}
                onStationSelect={setSelectedStationId}
                mapboxToken={mapboxToken}
                highlightedStations={highlightedStations}
                selectedSociety={selectedSociety}
              />
              
              {/* Alerts Panel Overlay */}
              <AlertsPanel 
                stations={filteredStationsForKPI}
                onStationSelect={setSelectedStationId}
                onHighlightStations={setHighlightedStations}
              />
            </div>

            {/* Station Panel */}
            <StationSlidePanel 
              stationId={selectedStationId}
              onClose={() => setSelectedStationId(null)}
            />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
