"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./client-map.css"; 
import L from "leaflet";
import { Loader2, Navigation, MapPin } from "lucide-react";

// --- Leaflet Icon Fix ---
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const userIcon = L.icon({
  iconUrl: iconUrl,
  iconRetinaUrl: iconRetinaUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// --- Helper to fly to location on load ---
function MapController({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      // Fly to the specific location immediately
      map.setView(coords, 15); 
    }
  }, [coords, map]);
  return null;
}

export default function ClientMap() {
  // 1. Set the default state to YOUR specific coordinates
  const [position, setPosition] = useState<[number, number]>([18.75419, 73.86168]);
  const [loading, setLoading] = useState(false); // Set to false since we have a default

  // Optional: You can keep this to update to real user location if permitted
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // Uncomment this line if you want to switch to the REAL user location
          // setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => console.warn("Using default secure node location.")
      );
    }
  }, []);

  return (
    <div className="client-map-wrapper">
      
      {/* --- LIVE COORDINATES OVERLAY --- */}
      <div className="coords-overlay">
        <div className="coords-header">
          <span className="coords-title">
             <div className="coords-pulse"></div>
             Live Coordinates
          </span>
          <Navigation size={14} className="text-cyan-500" />
        </div>
        
        <div className="coords-data">
          <div className="data-row">
            <span className="data-label">LATITUDE</span>
            <span className="data-value">{position[0].toFixed(5)}</span>
          </div>
          <div className="data-row">
            <span className="data-label">LONGITUDE</span>
            <span className="data-value">{position[1].toFixed(5)}</span>
          </div>
        </div>
      </div>

      {/* --- MAP CONTAINER --- */}
      <MapContainer
        center={position}
        zoom={14}
        // CRITICAL: Ensure z-index is 0 so overlay sits on top
        style={{ height: "100%", width: "100%", background: "#0f172a", zIndex: 0 }}
        zoomControl={false}
      >
        {/* Using standard OpenStreetMap tiles for better visibility, or stick to Dark Matter */}
        <TileLayer
          attribution='&copy; <a href="https://www.carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <Marker position={position} icon={userIcon}>
          <Popup className="custom-popup">
            <div className="text-center p-2">
              <strong className="text-cyan-400 block mb-1">Target Node</strong>
              <span className="text-xs text-slate-400">
                {position[0].toFixed(4)}, {position[1].toFixed(4)}
              </span>
            </div>
          </Popup>
        </Marker>
        
        <MapController coords={position} />
      </MapContainer>

      {loading && (
        <div className="map-loader">
          <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-3" />
          <span className="loader-text">ESTABLISHING CONNECTION...</span>
        </div>
      )}
    </div>
  );
}