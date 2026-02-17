"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- Icon Setup ---
const iconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
const iconRetinaUrl =
  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png";
const shadowUrl =
  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png";

const customIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

// --- Interface ---
interface LocationManagerProps {
  onLocationFound: (lat: string, lng: string) => void;
}

// --- Internal Component: Handles Logic & Marker Only ---
// This component ONLY returns Leaflet elements (Marker), no <div>s.
function LocationManager({ onLocationFound }: LocationManagerProps) {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 13);
      // Pass data up to the parent component
      onLocationFound(e.latlng.lat.toFixed(5), e.latlng.lng.toFixed(5));
    });
  }, [map, onLocationFound]);

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup className="text-black font-mono text-xs">
        <strong>🔒 SECURE NODE FOUND</strong>
      </Popup>
    </Marker>
  );
}

// --- Main Component ---
export default function EncryptionMap() {
  const [coords, setCoords] = useState<{ lat: string; lng: string } | null>(
    null,
  );

  return (
    <div className="h-full w-full bg-[#050a14] relative group">
      {/* 1. The Map Container */}
      <MapContainer
        center={[51.505, -0.09]}
        zoom={3}
        scrollWheelZoom={false}
        style={{
          height: "100%",
          width: "100%",
          background: "#050a14",
          zIndex: 0,
        }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Secure Dark Node">
            <TileLayer
              attribution="&copy; CARTO"
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Light Mode">
            <TileLayer
              attribution="&copy; CARTO"
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Detailed Street Map">
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Logic Component inside MapContainer */}
        <LocationManager
          onLocationFound={(lat, lng) => setCoords({ lat, lng })}
        />
      </MapContainer>

      {/* 2. The HUD Overlay (Outside MapContainer to prevent crashes) */}
      {coords && (
        <div className="absolute bottom-5 left-5 z-[400] pointer-events-none">
          <div className="bg-[#0f172a]/90 border border-blue-500/50 p-4 rounded-lg text-blue-400 font-mono text-xs shadow-[0_0_15px_rgba(59,130,246,0.4)] backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2 border-b border-blue-500/30 pb-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-bold tracking-widest text-white">
                LIVE COORDINATES
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] sm:text-xs">
              <span className="text-gray-400">LATITUDE</span>
              <span className="text-white font-bold">{coords.lat}</span>
              <span className="text-gray-400">LONGITUDE</span>
              <span className="text-white font-bold">{coords.lng}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
