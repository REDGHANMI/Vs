
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

const DEFAULT_TOKEN = ""; // Vide par défaut, utilisateur doit renseigner le token
const DEFAULT_CENTER: [number, number] = [2.3522, 48.8566]; // Paris

// Exemple de stations fictives avec coordonnées 
const stations = [
  { id: 1, name: "Station Gasoil 1", coords: [2.35, 48.86], ca: "120 k€", status: "Ouverte" },
  { id: 2, name: "Station Gasoil 2", coords: [2.36, 48.855], ca: "94 k€", status: "Ouverte" },
  { id: 3, name: "Station Gasoil 3", coords: [2.33, 48.853], ca: "60 k€", status: "Fermée" },
];

const styles = {
  popup: "text-sm font-semibold",
  pinContainer: "flex flex-col items-center justify-center",
};

export default function InteractiveMapCard() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState(DEFAULT_TOKEN);

  // Pour éviter la redondance à chaque render
  const [tokenInput, setTokenInput] = useState(DEFAULT_TOKEN);

  useEffect(() => {
    if (!token || !mapContainer.current) return;

    mapboxgl.accessToken = token;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: DEFAULT_CENTER,
      zoom: 12.3,
    });

    // Ajoute les pins pour chaque station
    stations.forEach((station) => {
      // Création d'un container React pour l'icône pin
      const pinNode = document.createElement("div");
      pinNode.className = styles.pinContainer;
      pinNode.innerHTML = `<svg width="34" height="34" fill="none" stroke="red" stroke-width="2" viewBox="0 0 24 24">
        <path d="M12 21C12 21 4 13.5 4 8A8 8 0 1 1 20 8c0 5.5-8 13-8 13z"/>
        <circle cx="12" cy="8" r="2"/>
      </svg>`;

      // Popup info de la station
      const popup = new mapboxgl.Popup({ offset: 22 })
        .setHTML(
          `<div class="${styles.popup}">
            <div>${station.name}</div>
            <div>CA: <strong>${station.ca}</strong></div>
            <div>Status: <span class="${station.status === "Ouverte" ? "text-green-600" : "text-red-500"}">${station.status}</span></div>
          </div>`
        );

      new mapboxgl.Marker(pinNode)
        .setLngLat(station.coords as [number, number])
        .setPopup(popup)
        .addTo(map.current!);
    });

    map.current.scrollZoom.disable();

    // Nettoyage
    return () => {
      map.current && map.current.remove();
    };
  }, [token]);

  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden min-h-[370px] relative">
      {!token ? (
        <div className="flex flex-col gap-4 items-center justify-center p-10 h-full">
          <p className="text-red-500 text-center font-semibold">
            Veuillez saisir votre Mapbox public token.<br />
            Pour l'obtenir, inscrivez-vous sur <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">mapbox.com</a> et copiez un token public.
          </p>
          <input
            type="password"
            className="border px-3 py-2 rounded w-96 max-w-full"
            placeholder="MAPBOX_PUBLIC_ACCESS_TOKEN"
            value={tokenInput}
            onChange={e => setTokenInput(e.target.value)}
          />
          <button
            onClick={() => setToken(tokenInput)}
            className="bg-red-500 text-white font-semibold px-6 py-2 rounded hover:bg-red-600 transition"
          >
            Valider le token
          </button>
        </div>
      ) : (
        <div ref={mapContainer} className="relative w-full h-[370px] rounded-lg z-0" />
      )}
      <div className="absolute top-4 left-4 bg-white/95 rounded-lg shadow px-3 py-1 z-10 text-gray-700 text-sm font-semibold flex items-center gap-2">
        <MapPin className="text-red-500" size={18} /> Stations Gasoil
      </div>
    </div>
  );
}
