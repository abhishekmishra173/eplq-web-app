"use client";

import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/db";
import { decryptPOI, getDistanceFromLatLonInKm, POI } from "@/lib/privacy";
import { Search, Shield, MapPin, Lock, Terminal, Activity } from "lucide-react";

// Import the clean CSS file
import "./search.css";

export default function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("System Idle");
  const [results, setResults] = useState<POI[]>([]);
  
  // Hardcoded for demo - effectively "New York"
  const userLat = 40.785091;
  const userLng = -73.968285;
  const rangeKm = 5; 

  const handleSecureSearch = async () => {
    setLoading(true);
    setStatus(">> INITIALIZING HANDSHAKE...");
    
    try {
      // 1. Fetch
      setStatus(">> DOWNLOADING ENCRYPTED SHARDS...");
      const querySnapshot = await getDocs(collection(db, "secure_pois"));
      
      const decryptedResults: POI[] = [];

      // 2. Decrypt & Filter
      setStatus(">> DECRYPTING DATA STREAM...");
      
      querySnapshot.forEach((doc) => {
        const rawData = doc.data();
        const decrypted = decryptPOI({ id: doc.id, ...rawData });
        
        if (decrypted) {
            const dist = getDistanceFromLatLonInKm(userLat, userLng, decrypted.lat, decrypted.lng);
            if (dist <= rangeKm) {
                decryptedResults.push(decrypted);
            }
        }
      });

      setResults(decryptedResults);
      setStatus(`>> OPERATION COMPLETE. ${decryptedResults.length} RECORDS FOUND.`);

    } catch (error) {
      console.error(error);
      setStatus(">> CRITICAL ERROR: DECRYPTION FAILED.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="eplq-page">
      
      {/* Top Navigation Bar */}
      <header className="eplq-header">
        <div className="header-content">
            <div className="brand-logo">
                <Shield size={24} color="#38BDF8" />
                <span>
                    EPLQ <span style={{ color: "#0EA5E9" }}>Secure Node</span>
                </span>
            </div>
            
            <div className="secure-badge">
                <div className="status-dot"></div>
                AES-256 ACTIVE
            </div>
        </div>
      </header>

      <main className="eplq-container">
        
        {/* Search Command Center */}
        <section className="search-panel">
            <div className="search-inner">
                <div className="info-grid">
                    {/* Location Badge */}
                    <div className="info-card">
                        <MapPin size={20} color="#38BDF8" />
                        <div>
                            <div className="info-label">Target Coordinates</div>
                            <div className="info-value" style={{ color: "#E0F2FE" }}>
                                {userLat.toFixed(4)}, {userLng.toFixed(4)}
                            </div>
                        </div>
                    </div>
                    
                    {/* Range Badge */}
                    <div className="info-card">
                        <Activity size={20} color="#34D399" />
                        <div>
                            <div className="info-label">Scan Radius</div>
                            <div className="info-value" style={{ color: "#D1FAE5" }}>
                                {rangeKm} Kilometers
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Action Button */}
                <button 
                    onClick={handleSecureSearch}
                    disabled={loading}
                    className="eplq-btn"
                >
                    {loading ? <Lock className="animate-spin" size={20} /> : <Search size={20} />}
                    <span>{loading ? "PROCESSING..." : "INITIATE SECURE QUERY"}</span>
                </button>

                {/* Terminal Output */}
                <div className="terminal-box">
                    <Terminal size={16} style={{ marginRight: "0.5rem" }} />
                    <span>{status}<span className="animate-pulse">_</span></span>
                </div>
            </div>
        </section>

        {/* Results Grid */}
        <div style={{ marginTop: "2rem" }}>
            <h2 className="results-header">
                Decrypted Intelligence ({results.length})
            </h2>

            {results.map((poi) => (
                <div key={poi.id} className="result-card">
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
                            <h3 className="result-title">{poi.name}</h3>
                            <span className="result-tag">{poi.category}</span>
                        </div>
                        <p className="result-desc">{poi.description}</p>
                    </div>
                    
                    <div className="result-meta">
                        <Lock size={16} color="#10B981" style={{ marginLeft: "auto", marginBottom: "0.25rem" }} />
                        <div style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "#64748B" }}>
                            ID: {poi.id.substring(0, 6)}...
                        </div>
                    </div>
                </div>
            ))}

            {results.length === 0 && !loading && status.includes("COMPLETE") && (
                <div className="empty-state">
                    <p>No signals detected within range.</p>
                </div>
            )}
        </div>

      </main>
    </div>
  );
}