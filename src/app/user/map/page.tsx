"use client";

import Link from "next/link";
import { ArrowLeft, Globe, Server, Activity, Lock, Cpu, Terminal } from "lucide-react";
import "./dashboard.css"; // Import the simple CSS file

export default function UserMapPage() {
  return (
    <main className="dashboard-wrapper">
      <div className="dashboard-content">
        
        {/* --- HEADER --- */}
        <header className="glass-header">
          <div className="header-title-group">
            <Link href="/" style={{ color: '#94a3b8' }}>
              <ArrowLeft size={24} />
            </Link>
            <div className="title-text">
              <h1>
                <Globe className="text-cyan spin-slow" size={28} /> 
                Global Neural Grid
              </h1>
              <p>Real-time geospatial telemetry & node synchronization</p>
            </div>
          </div>
          <div className="badge-active">
            ENCRYPTION ACTIVE
          </div>
        </header>

        {/* --- STATS SECTION --- */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon text-green"><Server size={24} /> <Activity size={16}/></div>
            <div className="stat-value">14/15</div>
            <div className="stat-label">Active Nodes</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon text-cyan"><Activity size={24} /></div>
            <div className="stat-value">12ms</div>
            <div className="stat-label">Network Latency</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon text-purple"><Lock size={24} /></div>
            <div className="stat-value">AES-256</div>
            <div className="stat-label">Encryption Level</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ color: '#f97316' }}><Cpu size={24} /></div>
            <div className="stat-value">42%</div>
            <div className="stat-label">System CPU Load</div>
          </div>
        </section>

        {/* --- TERMINAL SECTION --- */}
        <section className="terminal-window">
          <div className="terminal-header">
            <div className="mac-dots">
              <span className="dot-red"></span>
              <span className="dot-yel"></span>
              <span className="dot-grn"></span>
            </div>
            <span className="terminal-title">root@eplq-node-v4:~</span>
          </div>
          
          <div className="terminal-body">
            <p><span className="text-green">➜</span> <span className="text-slate">initializing secure_handshake...</span></p>
            <p><span className="text-cyan">[INFO]</span> <span className="text-slate">Loading geospatial shards from /var/secure/db</span></p>
            <p><span className="text-cyan">[INFO]</span> <span className="text-slate">Connecting to Sat-Link Alpha... </span><span className="text-green">SUCCESS</span></p>
            <p><span className="text-green">➜</span> <span className="text-slate">decrypting user_layer_v2.json</span></p>
            
            <div style={{ paddingLeft: '20px', borderLeft: '2px solid #1e293b', margin: '10px 0' }}>
              <p className="text-slate">... verif_key: 0x99283aF1</p>
              <p className="text-slate">... integrity_check: PASS</p>
              <p className="text-slate">... noise_injection: LAPLACE_DISTRIBUTION</p>
            </div>
            
            <p><span className="text-purple">[WARN]</span> <span className="text-slate">Traffic spike detected in Sector 7. Allocating more resources.</span></p>
            <p><span className="text-green">➜</span> <span style={{ borderRight: '8px solid #22c55e', paddingRight: '4px' }}>_</span></p>
          </div>
        </section>

      </div>
    </main>
  );
}