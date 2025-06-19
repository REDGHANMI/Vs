
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Station } from "@/types/database";
import { useParameters } from "@/contexts/ParametersContext";
import { mockRapportsStationsEnriched } from '@/data/mockRapportsStationsEnriched';
import { mockStocksCiterneEnriched } from '@/data/mockStocksCiterneEnriched';
import { mockPrixCarburantsEnriched } from '@/data/mockPrixCarburantsEnriched';

// Simple avatar generator
const getAvatarForManager = (name: string) => {
  const photos = [
    "photo-1582562124811-c09040d0a901", "photo-1618160702438-9b02ab6515c9", 
    "photo-1535268647677-300dbf3d78d1", "photo-1501286353178-1ec881214838"
  ];
  const idx = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % photos.length;
  return `https://images.unsplash.com/${photos[idx]}?auto=format&w=64&q=80`;
};

interface MapViewProps {
  stations: Station[];
  selectedStationId: string | null;
  onStationSelect: (stationId: string) => void;
  mapboxToken?: string;
  highlightedStations?: string[];
  selectedSociety?: string;
}

export default function MapView({ stations, selectedStationId, onStationSelect, mapboxToken, highlightedStations = [], selectedSociety = "all" }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Enhanced station-to-mock mapping with more stations covered
  const getStationToMockIdMapping = () => {
    const mapping: { [key: string]: string } = {};
    
    console.log('=== CRÉATION DU MAPPAGE STATIONS ÉTENDU ===');
    console.log('Stations disponibles:', stations.map(s => ({ id: s.id, nom: s.nom })));
    
    stations.forEach(station => {
      console.log('🔍 Traitement station:', station.nom, 'ID:', station.id);
      
      const cleanStationName = station.nom.trim().toUpperCase();
      
      // Extended mapping to cover more stations with mock data
      switch (cleanStationName) {
        case 'S/S HAY INARA':
          mapping[station.id] = 'sta_001';
          console.log('✅ Mappé HAY INARA:', station.id, '-> sta_001');
          break;
        case 'S/S CALIFORNIE':
        case 'S/S FLORIDA':
          mapping[station.id] = 'sta_002';
          console.log('✅ Mappé CALIFORNIE/FLORIDA:', station.id, '-> sta_002');
          break;
        case 'S/S HASSAN II':
        case 'S/S RAHMA II':
          mapping[station.id] = 'sta_003';
          console.log('✅ Mappé HASSAN II/RAHMA II:', station.id, '-> sta_003');
          break;
        // Add more mappings for better coverage
        case 'S/S AL FAJR':
        case 'S/S VILLE VERT':
          mapping[station.id] = 'sta_001';
          console.log('✅ Mappé AL FAJR/VILLE VERT:', station.id, '-> sta_001');
          break;
        case 'S/S ZENATA':
        case 'S/S MIMOSA':
          mapping[station.id] = 'sta_002';
          console.log('✅ Mappé ZENATA/MIMOSA:', station.id, '-> sta_002');
          break;
        case 'S/S AIN OUDA':
        case 'S/S WIFAK':
          mapping[station.id] = 'sta_003';
          console.log('✅ Mappé AIN OUDA/WIFAK:', station.id, '-> sta_003');
          break;
        default:
          // Assign random mock data for unmapped stations
          const mockIds = ['sta_001', 'sta_002', 'sta_003'];
          const randomMockId = mockIds[Math.abs(station.nom.length) % mockIds.length];
          mapping[station.id] = randomMockId;
          console.log('🎲 Attribution aléatoire pour', station.nom, ':', station.id, '->', randomMockId);
      }
    });

    console.log('=== MAPPAGE FINAL STATIONS ===', mapping);
    return mapping;
  };

  // Enhanced business data retrieval with better fallbacks
  const getStationBusinessData = (station: Station) => {
    console.log('=== RÉCUPÉRATION DONNÉES MÉTIER POUR LA STATION ===');
    console.log('🏢 Station:', station.nom, 'ID:', station.id);
    
    const stationMapping = getStationToMockIdMapping();
    const mockStationId = stationMapping[station.id];
    
    console.log('🔗 Mock station ID trouvé:', mockStationId);
    
    if (!mockStationId) {
      return {
        tankData: "Données indisponibles",
        fuelPrices: "Prix indisponibles", 
        reportDate: "Aucun rapport trouvé",
        hasRecentData: false
      };
    }

    // Get reports for this mock station
    const stationReports = mockRapportsStationsEnriched.filter(r => r.station_uuid === mockStationId);
    console.log('📊 Reports trouvés pour', station.nom, ':', stationReports.length);
    
    const latestReport = stationReports.sort((a, b) => new Date(b.date_rapport).getTime() - new Date(a.date_rapport).getTime())[0];
    console.log('📋 Dernier rapport sélectionné:', latestReport?.uuid, latestReport?.date_rapport);

    // Get tank data
    let tankData = "Données indisponibles";
    if (latestReport) {
      const reportStocks = mockStocksCiterneEnriched.filter(stock => stock.rapport_uuid === latestReport.uuid);
      console.log('🛢️ Stocks trouvés pour le rapport:', reportStocks.length);
      
      if (reportStocks.length > 0) {
        const totalStock = reportStocks.reduce((sum, stock) => sum + stock.stock_fin, 0);
        const totalCapacity = reportStocks.reduce((sum, stock) => sum + stock.capacite_max, 0);
        
        if (totalCapacity > 0) {
          const tankFillRate = Math.round((totalStock / totalCapacity) * 100 * 10) / 10;
          tankData = `Taux cuve: ${tankFillRate}%`;
          console.log('✅ Taux de remplissage calculé:', tankFillRate);
        }
      }
    }

    // Get fuel prices
    let fuelPrices = "Prix indisponibles";
    if (station.societe_id) {
      const societyPrices = mockPrixCarburantsEnriched
        .filter(p => p.societe_id === station.societe_id)
        .sort((a, b) => new Date(b.date_prix).getTime() - new Date(a.date_prix).getTime());
      
      console.log('⛽ Prix société trouvés:', societyPrices.length);
      
      const latestPrices = societyPrices[0];
      if (latestPrices) {
        fuelPrices = `Gasoil: ${latestPrices.prix_gasoil.toFixed(2)} MAD | SSP: ${latestPrices.prix_ssp.toFixed(2)} MAD`;
        console.log('💰 Derniers prix:', fuelPrices);
      }
    }

    // Format report date
    let reportDate = "Aucun rapport trouvé";
    if (latestReport) {
      reportDate = new Date(latestReport.date_rapport).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      console.log('📅 Date rapport formatée:', reportDate);
    }

    const businessData = {
      tankData,
      fuelPrices,
      reportDate,
      hasRecentData: !!latestReport
    };

    console.log('🎯 DONNÉES MÉTIER FINALES pour', station.nom, ':', businessData);
    return businessData;
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    if (mapboxToken && mapboxToken.startsWith('pk.')) {
      mapboxgl.accessToken = mapboxToken;
    } else {
      return;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-7.5, 33.6],
      zoom: 10
    });

    map.current.on('style.load', () => {
      const WORLD_VIEW = "MA";
      const adminLayers = [
        "admin-0-boundary",
        "admin-1-boundary", 
        "admin-0-boundary-disputed",
        "admin-1-boundary-bg",
        "admin-0-boundary-bg",
        "country-label",
      ];
      
      adminLayers.forEach((layer) => {
        if (map.current?.getLayer(layer)) {
          map.current.setFilter(layer, ["match", ["get", "worldview"], ["all", WORLD_VIEW], true, false]);
        }
      });
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  useEffect(() => {
    if (!map.current || !stations.length) return;

    console.log('=== MISE À JOUR DES MARQUEURS CARTE ===');
    console.log('MapView: Mise à jour des marqueurs pour les stations:', stations.length);

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Default station image
    const defaultStationImage = "https://images.unsplash.com/photo-1528744598421-b7b93e12df15?auto=format&fit=crop&w=400&q=80";

    stations.forEach(station => {
      console.log('🗺️ Traitement station pour marqueur:', station.nom);
      
      const markerElement = document.createElement("div");
      markerElement.className = "station-marker";
      
      const isSelected = selectedStationId === station.id;
      const isHighlighted = selectedSociety !== "all"
        ? station.societe_id === selectedSociety
        : false;
      const shouldFade = selectedSociety !== "all" && station.societe_id !== selectedSociety;

      // Get society logo or fallback
      const societyLogo = station.societe?.logo_url || "https://upload.wikimedia.org/wikipedia/en/7/7b/Petromin_Logo.png";
      const societyColor = station.societe?.couleur_theme || "#e74c3c";
      const stationImage = station.photo_url || defaultStationImage;

      markerElement.innerHTML = `
        <div class="relative cursor-pointer group">
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full transition-all duration-200 ring-2 ring-white shadow-lg
              ${isSelected ? 'ring-4 ring-blue-400' : ''}
              ${isHighlighted ? 'scale-110 ring-4 ring-red-500' : ''}
              ${shouldFade ? 'opacity-30 scale-90' : ''}"
              style="background-color: ${societyColor}">
              <img 
                src="${societyLogo}" 
                class="w-full h-full rounded-full object-cover bg-white p-1"
                alt="Logo société"
                onerror="this.src='https://upload.wikimedia.org/wikipedia/en/7/7b/Petromin_Logo.png'"
              />
            </div>
            <div class="mt-0.5 px-2 py-0.5 bg-white/95 rounded text-xs font-medium text-gray-800 shadow-sm whitespace-nowrap max-w-24 overflow-hidden text-ellipsis ${shouldFade ? 'opacity-50' : ''}">
              ${station.nom}
            </div>
          </div>
        </div>
      `;

      // Get business data for enhanced popup
      const businessData = getStationBusinessData(station);
      console.log('📊 Données métier pour popup:', station.nom, businessData);
      
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false,
        className: 'station-popup'
      }).setHTML(`
        <div class="w-80 p-4 text-sm bg-white rounded-lg shadow-xl border-2">
          <div class="flex items-center space-x-3 mb-4">
            <img 
              src="${stationImage}" 
              class="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              alt="Photo station"
              onerror="this.src='${defaultStationImage}'"
            />
            <div class="flex-1">
              <div class="font-bold text-gray-800 text-lg flex items-center gap-2">🏷 ${station.nom}</div>
              <div class="text-gray-600 text-sm">👤 ${station.gerant?.nom_complet || 'Gérant non assigné'}</div>
            </div>
          </div>
          
          <div class="space-y-3 mb-4 pb-3 border-b border-gray-100">
            <div class="flex items-center justify-between">
              <span class="text-gray-700 font-medium">📊 Statut :</span>
              <span class="text-sm font-semibold ${station.active ? 'text-green-600' : 'text-red-600'}">
                ${station.active ? '✅ Active' : '❌ Inactive'}
              </span>
            </div>
            <div class="text-gray-500 text-sm">📍 ${station.ville || 'Ville non renseignée'} • 🏢 ${station.societe?.nom || 'Société inconnue'}</div>
          </div>
          
          <div class="space-y-3">
            <div class="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div class="font-medium text-blue-800 mb-1">📊 État des Cuves</div>
              <div class="text-sm text-blue-700">${businessData.tankData}</div>
            </div>
            
            <div class="bg-green-50 p-3 rounded-lg border border-green-200">
              <div class="font-medium text-green-800 mb-1">⛽ Prix Carburants</div>
              <div class="text-sm text-green-700">${businessData.fuelPrices}</div>
            </div>
            
            <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div class="font-medium text-gray-800 mb-1">📅 Dernier Rapport</div>
              <div class="text-sm text-gray-700">${businessData.reportDate}</div>
            </div>
          </div>
        </div>
      `);

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([station.longitude, station.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      markerElement.addEventListener("click", () => {
        console.log('MapView: Station cliquée:', station.id);
        onStationSelect(station.id);
      });

      markerElement.addEventListener("mouseenter", () => {
        popup.addTo(map.current!);
      });

      markerElement.addEventListener("mouseleave", () => {
        popup.remove();
      });

      markersRef.current.push(marker);
    });

    console.log('MapView: Créé', markersRef.current.length, 'marqueurs');
  }, [stations, selectedStationId, onStationSelect, selectedSociety]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div 
        ref={mapContainer} 
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      <div className="absolute top-4 left-4 bg-white/95 shadow-lg rounded-lg px-4 py-3 text-sm text-gray-700 flex items-center gap-3 z-20 max-w-md">
        <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
        <span className="font-medium">Survolez une station pour voir le taux de cuve, les derniers prix carburants et la date du dernier rapport.</span>
      </div>
    </div>
  );
}
