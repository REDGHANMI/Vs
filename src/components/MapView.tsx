
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Station } from "@/types/database";
import { useParameters } from "@/contexts/ParametersContext";

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
  const { mouvements } = useParameters();
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Function to get real data from movements
  const getStationDataFromMovements = (station: Station) => {
    const stationMouvements = mouvements.filter(m => m.station_id === station.id);
    const latestMouvement = stationMouvements[stationMouvements.length - 1];
    const previousMouvement = stationMouvements[stationMouvements.length - 2];

    if (!latestMouvement) {
      return {
        lastMovement: "Aucun mouvement",
        ca: 0,
        variation: 0
      };
    }

    // Calculate variation if we have previous data
    let variation = 0;
    if (previousMouvement && previousMouvement.montant > 0) {
      variation = ((latestMouvement.montant - previousMouvement.montant) / previousMouvement.montant) * 100;
    }

    return {
      lastMovement: latestMouvement.date_mouvement,
      ca: latestMouvement.montant,
      variation: Math.round(variation * 10) / 10
    };
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

    console.log('MapView: Updating markers for stations:', stations.length);

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    stations.forEach(station => {
      console.log('MapView: Creating marker for station:', {
        id: station.id,
        nom: station.nom,
        coords: [station.latitude, station.longitude],
        societe: station.societe?.nom
      });

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

      // Get real data from movements
      const stationData = getStationDataFromMovements(station);
      
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false,
        className: 'station-popup'
      }).setHTML(`
        <div class="w-64 p-3 text-sm bg-white rounded-lg shadow-lg border">
          <div class="flex items-center space-x-3 mb-3">
            <img 
              src="${getAvatarForManager(station.gerant?.nom_complet || 'Gérant inconnu')}" 
              class="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
              alt="Avatar gérant"
            />
            <div class="flex-1">
              <div class="font-bold text-gray-800 text-base">🏷 ${station.nom}</div>
              <div class="text-gray-600 text-sm">👤 ${station.gerant?.nom_complet || 'Gérant non assigné'}</div>
            </div>
          </div>
          
          <div class="mb-3 pb-2 border-b border-gray-100">
            <div class="text-gray-500 text-xs">📍 ${station.ville || 'Ville non renseignée'}</div>
            <div class="text-gray-500 text-xs">🏢 ${station.societe?.nom || 'Société inconnue'}</div>
            ${station.adresse_complete ? `<div class="text-gray-500 text-xs">📌 ${station.adresse_complete}</div>` : ''}
          </div>
          
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-gray-700">📊 Statut :</span>
              <span class="text-sm font-medium ${station.active ? 'text-green-600' : 'text-red-600'}">
                ${station.active ? '✅ Active' : '❌ Inactive'}
              </span>
            </div>
            ${station.date_mise_en_service ? `
            <div class="flex items-center justify-between">
              <span class="text-gray-700">📅 Mise en service :</span>
              <span class="text-sm">${new Date(station.date_mise_en_service).toLocaleDateString('fr-FR')}</span>
            </div>
            ` : ''}
          </div>
        </div>
      `);

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([station.longitude, station.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      markerElement.addEventListener("click", () => {
        console.log('MapView: Station clicked:', station.id);
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

    console.log('MapView: Created', markersRef.current.length, 'markers');
  }, [stations, selectedStationId, onStationSelect, selectedSociety, mouvements]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div 
        ref={mapContainer} 
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      <div className="absolute top-4 left-4 bg-white/90 shadow rounded px-4 py-2 text-xs text-gray-500 flex items-center gap-2 z-20">
        <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
        <span>Survolez les pins pour voir les détails • Cliquez pour ouvrir la fiche • Données Supabase</span>
      </div>
    </div>
  );
}
