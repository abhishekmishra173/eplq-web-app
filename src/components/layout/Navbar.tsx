'use client';
import './navbar.css';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Search, Home, FileText, UserPlus, LogIn, Globe } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  
  // Logic to determine current page state
  const isLoginPage = pathname === '/admin/login';
  const isRegisterPage = pathname === '/register';
  // Show "Admin Session" only if inside /admin but NOT on the login page
  const isAdminDashboard = pathname.startsWith('/admin') && !isLoginPage;

  return (
    <>
      {/* --- TOP HEADER (Logo + Search) --- */}
      <header className="trust-navbar">
        <div className="container-navbar">
          
          {/* 1. Logo Section */}
          <Link href="/" className="nav-logo-link">
            <div className="nav-icon-box">
              <ShieldCheck size={20} color="#0B0F14" />
            </div>
            <div className="nav-brand-group">
              <span className="nav-brand-text">EPLQ</span>
              <span className="nav-badge">Secure Node</span>
            </div>
          </Link>

          {/* 2. Call to Action (Search / Admin Badge) */}
          <div className="nav-cta-group">
            {isAdminDashboard ? (
              <div className="nav-badge-admin">
                Admin Session
              </div>
            ) : (!isLoginPage && !isRegisterPage) ? (
              // Show Search only if NOT on auth pages
              <Link href="/user/search" className="nav-cta-btn">
                <Search size={16} />
                <span className="hidden sm:inline">Start Search</span>
              </Link>
            ) : null}
          </div>

        </div>
      </header>

      {/* --- FLOATING BOTTOM DOCK (Navigation Links) --- */}
      <nav className="nav-floating-dock">
        <Link href="/" className={`dock-item ${pathname === '/' ? 'active' : ''}`}>
          <Home size={20} />
          <span className="dock-label">Home</span>
        </Link>
        
        <Link href="/user/map" className={`dock-item ${pathname === '/user/map' ? 'active' : ''}`}>
          <Globe size={20} />
          <span className="dock-label">Map</span>
        </Link>
        
        <Link href="/protocol" className={`dock-item ${pathname === '/protocol' ? 'active' : ''}`}>
          <FileText size={20} />
          <span className="dock-label">Protocol</span>
        </Link>

        {/* ADDED: Join / Register Link */}
        <Link href="/register" className={`dock-item ${pathname === '/register' ? 'active' : ''}`}>
          <UserPlus size={20} />
          <span className="dock-label">Join</span>
        </Link>
        
        <Link href="/admin/login" className={`dock-item ${pathname === '/admin/login' ? 'active' : ''}`}>
          <LogIn size={20} />
          <span className="dock-label">Login</span>
        </Link>
      </nav>
    </>
  );
}