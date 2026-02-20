"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Home, FileText, LogIn, Globe, Info } from "lucide-react"; // <-- Added Info icon
import "./navbar.css";

export default function Navbar() {
  const pathname = usePathname();

  // --- VISIBILITY LOGIC ---
  if (
    pathname === "/user/profile" || 
    pathname === "/admin/dashboard" ||
    pathname === "/user/map" 
  ) {
    return null; 
  }

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* --- TOP HEADER --- */}
      <header className="global-top-nav">
        <div className="nav-container">
          
          {/* Logo / Brand */}
          <Link href="/" className="brand-logo">
            <div className="brand-icon-box">
              <ShieldCheck size={20} className="text-cyan-400" />
            </div>
            <div className="brand-text">
              <span className="brand-title">EPLQ</span>
              <span className="brand-subtitle">SECURE NODE</span>
            </div>
          </Link>

        </div>
      </header>

      {/* --- FLOATING BOTTOM DOCK --- */}
      <div className="floating-dock-wrapper">
        <nav className="floating-dock">
          
          <Link href="/" className={`dock-item ${isActive("/") ? "active" : ""}`}>
            <Home size={20} className="dock-icon" />
            <span className="dock-label">Home</span>
            {isActive("/") && <span className="active-dot"></span>}
          </Link>

          <Link href="/user/map" className={`dock-item ${isActive("/user/map") ? "active" : ""}`}>
            <Globe size={20} className="dock-icon" />
            <span className="dock-label">Map</span>
            {isActive("/user/map") && <span className="active-dot"></span>}
          </Link>

          <Link href="/protocol" className={`dock-item ${isActive("/protocol") ? "active" : ""}`}>
            <FileText size={20} className="dock-icon" />
            <span className="dock-label">Protocol</span>
            {isActive("/protocol") && <span className="active-dot"></span>}
          </Link>

          {/* --- NEW ABOUT LINK --- */}
          <Link href="/about" className={`dock-item ${isActive("/about") ? "active" : ""}`}>
            <Info size={20} className="dock-icon" />
            <span className="dock-label">About</span>
            {isActive("/about") && <span className="active-dot"></span>}
          </Link>

          <Link href="/admin/login" className={`dock-item ${isActive("/admin/login") ? "active" : ""}`}>
            <LogIn size={20} className="dock-icon" />
            <span className="dock-label">Login</span>
            {isActive("/admin/login") && <span className="active-dot"></span>}
          </Link>

        </nav>
      </div>
    </>
  );
}