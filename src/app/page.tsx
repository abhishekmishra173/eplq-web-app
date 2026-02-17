"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
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

// 1. Dynamic Map Import (Prevents SSR Errors)
const EncryptionMap = dynamic(() => import("@/components/ui/EncryptionMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex flex-col items-center justify-center bg-[#050a14] text-blue-500/50">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <span className="text-xs font-mono tracking-widest uppercase animate-pulse">
        Initializing Secure Grid...
      </span>
    </div>
  ),
});

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#0B0F14]">
      
      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-glow"></div>
        
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
        
        <div className="hero-actions">
          <Link href="/user/search" className="btn-primary text-lg px-8 py-4">
            <Search size={20} className="mr-2" /> 
            Initiate Query
          </Link>
          <Link href="/protocol" className="btn-secondary px-8 py-4">
            View Protocol
          </Link>
        </div>
      </section>

      {/* --- LIVE MAP SECTION --- */}
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
                Visualizing active EPLQ nodes across the network. Your current position is encrypted locally using AES-256 before rendering.
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

            {/* Right Side: Visual Map */}
            <div className="map-visual">
              <div className="map-visual-box">
                <div className="map-grid-overlay"></div>
                {/* Dynamic Map Component */}
                <div className="absolute inset-0 z-10">
                    <EncryptionMap />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CARDS GRID (Compact & Swipable) --- */}
      <section className="relative z-20">
        <div className="cards-grid">
          <Card 
            icon={<Zap size={24} color="#3DF2E0" />}
            title="Laplace Privacy"
            desc="Noise injection ensures 0% re-identification risk by mathematically blurring precise coordinates."
            link="/protocol"
            btnText="Learn More"
          />
          <Card 
            icon={<Lock size={24} color="#34d399" />}
            title="Encrypted Vault"
            desc="All datasets are AES-256 encrypted at the hardware level before leaving your perimeter."
            link="/user/search"
            btnText="View Vault"
          />
          <Card 
            icon={<Server size={24} color="#E445FF" />}
            title="Admin Node"
            desc="Manage ε budgets, rotate keys, and coordinate active datasets in real-time."
            link="/admin/login"
            btnText="Access Console"
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

function Card({ icon, title, desc, link, btnText }: any) {
  return (
    <div className="eplq-card-small group">
      <div className="card-icon-box-small">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mt-4">{title}</h3>
      <p className="text-sm text-slate-400 flex-grow mt-2 mb-8 leading-relaxed">
        {desc}
      </p>
      
      <div className="mt-auto">
        {/* Swipe-Left Animation Button */}
        <Link href={link} className="btn-swipe w-full transition-transform">
          <span>{btnText}</span>
          <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
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