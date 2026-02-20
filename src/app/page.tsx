"use client";

import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Search, 
  Zap, 
  ArrowRight, 
  Globe, 
  Server, 
  Activity,
  FileKey
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#0B0F14] relative">
      
      {/* --- HERO SECTION --- */}
      <section className="hero-section relative overflow-hidden">
        {/* EARTH NETWORK ANIMATION */}
        <div className="earth-network-container">
          <div className="earth-globe"></div>
          <div className="network-grid"></div>
          <div className="glowing-nodes">
            <span></span><span></span><span></span>
          </div>
        </div>
        
        <div className="relative z-10">
          <div className="hero-badge">
            <ShieldCheck size={14} />
            <span>Military-Grade Privacy v2.4 Active</span>
          </div>

          <h1 className="hero-title">
            {/* A. Fly-Up Animation for Top Line */}
            <span className="fly-in-text">
              Secure Geo-Spatial
            </span> 
            <br />
            {/* B. Typewriter Animation for Bottom Line */}
            <span className="hero-gradient-text typewriter">
              Intelligence Grid
            </span>
          </h1>

          <p className="hero-desc">
            Query sensitive location datasets with mathematical privacy guarantees. 
            Zero-knowledge architecture ensures your data remains invisible to the host.
          </p>
          
          {/* HERO BUTTONS REMOVED FROM HERE */}

        </div>
      </section>

      {/* --- LIVE NODE SECTION --- */}
      <section className="map-section">
        <div className="container-center">
          <div className="map-container">
            
            {/* Left Side: Stats */}
            <div className="map-text">
              <div className="section-label">
                <Activity size={16} className="animate-pulse" />
                Live Node Status
              </div>
              <h2 className="section-title">Global Encryption Grid</h2>
              <p className="section-desc">
                Visualizing active EPLQ nodes across the network. Data processing is fully decentralized and anonymized.
              </p>
              
              <div className="space-y-4">
                <StatRow label="Active Nodes" value="14" color="#3DF2E0" />
                <StatRow label="Queries / Sec" value="842" color="#3DF2E0" />
                <StatRow label="Encrypted Shards" value="1.2M" color="#E445FF" />
              </div>

              {/* System Operational Badge */}
              <div className="mt-8 pt-6 border-t border-slate-800/50">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-500 tracking-wider">SYSTEM OPERATIONAL</span>
                </div>
              </div>
            </div>

            {/* Right Side: Abstract Visual Grid */}
            <div className="map-visual">
              <div className="map-visual-box relative overflow-hidden bg-[#050a14] border border-slate-800 rounded-xl h-full min-h-[350px] flex items-center justify-center">
                <div className="map-grid-overlay absolute inset-0 opacity-30 bg-[linear-gradient(rgba(61,242,224,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(61,242,224,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                
                {/* Center Radar/Globe Effect */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="absolute w-[200px] h-[200px] border border-cyan-500/20 rounded-full"></div>
                  <div className="absolute w-[300px] h-[300px] border border-cyan-500/10 rounded-full border-dashed animate-[spin_20s_linear_infinite]"></div>
                  
                  <div className="relative flex h-24 w-24 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-20 duration-1000"></span>
                    <div className="bg-slate-900/80 p-4 rounded-full border border-cyan-500/50 shadow-[0_0_30px_rgba(61,242,224,0.3)]">
                      <Globe size={40} className="text-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CARDS GRID --- */}
      <section className="relative z-20">
        <div className="cards-grid">
          <Card 
            icon={<Zap size={24} color="#3DF2E0" />}
            title="Laplace Privacy"
            desc="Noise injection ensures 0% re-identification risk by mathematically blurring precise coordinates."
          />
          <Card 
            icon={<Lock size={24} color="#34d399" />}
            title="Encrypted Vault"
            desc="All datasets are AES-256 encrypted at the hardware level before leaving your perimeter."
          />
          <Card 
            icon={<Server size={24} color="#E445FF" />}
            title="Admin Node"
            desc="Manage ε budgets, rotate keys, and coordinate active datasets in real-time."
          />
        </div>
      </section>

      {/* --- WORKFLOW SECTION --- */}
      <section className="workflow-section">
        <div className="container-center">
          <div className="text-center mb-16">
            <h2 className="section-title">The EPLQ Workflow</h2>
            <p className="section-desc">How privacy is preserved from upload to query.</p>
          </div>
          
          <div className="workflow-grid">
            <Step number="01" title="Encrypt" desc="Data is encrypted locally using AES-256." icon={<FileKey />} />
            <Step number="02" title="Upload" desc="Encrypted shards are sent to the cloud." icon={<Zap />} />
            <Step number="03" title="Query" desc="User searches. Only matching shards returned." icon={<Search />} />
            <Step number="04" title="Decrypt" desc="Browser decrypts data using private key." icon={<Lock />} />
          </div>
        </div>
      </section>

    </div>
  );
}

// --- SUB-COMPONENTS ---

function Card({ icon, title, desc }: any) {
  return (
    <div className="eplq-card-small group">
      <div className="card-icon-box-small">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mt-4">{title}</h3>
      <p className="text-sm text-slate-400 flex-grow mt-2 mb-8 leading-relaxed">
        {desc}
      </p>
      {/* CARD BUTTONS REMOVED FROM HERE */}
    </div>
  );
}

function StatRow({ label, value, color }: any) {
  return (
    <div className="stat-row border-b border-slate-800/50 pb-2 mb-4">
      <span className="text-slate-500 font-medium">{label}</span>
      <span className="font-mono font-bold" style={{ color: color }}>{value}</span>
    </div>
  );
}

function Step({ number, title, desc, icon }: any) {
  return (
    <div className="step-card group">
      <div className="step-number">{number}</div>
      <div className="step-content">
        <div className="step-icon-wrapper group-hover:scale-110 transition-transform duration-300">
            <div className="step-icon">{icon}</div>
        </div>
        <h4 className="text-white font-bold mb-1">{title}</h4>
        <p className="text-sm text-slate-400">{desc}</p>
      </div>
    </div>
  );
}