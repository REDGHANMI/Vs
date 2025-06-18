
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

interface MapCoordinateSelectorProps {
  latitude: number;
  longitude: number;
  onCoordinateChange: (lat: number, lng: number) => void;
}

// Token Mapbox par défaut
const DEFAULT_MAPBOX_TOKEN = "pk.eyJ1IjoibGF6cmFrYXBwIiwiYSI6ImNtYnduajVlNTB1eGIya3M4MHMycmhpMHQifQ.p98qwbrJCwnx4t5DZ3S2RQ";

// Coordonnées par défaut pour Casablanca
const CASABLANCA_COORDS = {
  latitude: 33.5731,
  longitude: -7.5898
};

export default function MapCoordinateSelector({ 
  latitude, 
  longitude, 
  onCoordinateChange
}: MapCoordinateSelectorProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current) return;

    console.log("MapCoordinateSelector: Initialisation de la carte", { latitude, longitude });

    mapboxgl.accessToken = DEFAULT_MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [longitude, latitude],
      zoom: 12
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Create initial marker
    const markerElement = document.createElement("div");
    markerElement.innerHTML = `
      <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
        </svg>
      </div>
    `;

    marker.current = new mapboxgl.Marker(markerElement, { draggable: true })
      .setLngLat([longitude, latitude])
      .addTo(map.current);

    // Handle marker drag
    marker.current.on('dragend', () => {
      if (marker.current) {
        const lngLat = marker.current.getLngLat();
        console.log("MapCoordinateSelector: Marker déplacé", { lat: lngLat.lat, lng: lngLat.lng });
        onCoordinateChange(lngLat.lat, lngLat.lng);
      }
    });

    // Handle map click
    map.current.on('click', (e) => {
      if (marker.current) {
        marker.current.setLngLat([e.lngLat.lng, e.lngLat.lat]);
        console.log("MapCoordinateSelector: Clic sur la carte", { lat: e.lngLat.lat, lng: e.lngLat.lng });
        onCoordinateChange(e.lngLat.lat, e.lngLat.lng);
      }
    });

    map.current.on('load', () => {
      console.log("MapCoordinateSelector: Carte chargée");
      setIsMapReady(true);
    });
  };

  useEffect(() => {
    initializeMap();

    return () => {
      console.log("MapCoordinateSelector: Nettoyage de la carte");
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (marker.current && isMapReady) {
      console.log("MapCoordinateSelector: Mise à jour des coordonnées", { latitude, longitude });
      marker.current.setLngLat([longitude, latitude]);
      if (map.current) {
        map.current.setCenter([longitude, latitude]);
      }
    }
  }, [latitude, longitude, isMapReady]);

  return (
    <div className="space-y-2">
      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="font-medium">Instructions:</span>
        </div>
        <ul className="mt-1 text-xs space-y-1">
          <li>• Cliquez sur la carte pour placer le marqueur</li>
          <li>• Glissez le marqueur pour ajuster la position</li>
          <li>• Utilisez les contrôles pour zoomer et naviguer</li>
        </ul>
      </div>
      <div 
        ref={mapContainer} 
        className="w-full h-64 rounded-lg border border-gray-300 overflow-hidden"
      />
      <div className="text-xs text-gray-500 text-center">
        Coordonnées: {latitude.toFixed(6)}, {longitude.toFixed(6)}
      </div>
    </div>
  );
}
