import './footer.css';
import Link from "next/link";
import { ShieldCheck, Mail, Globe, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="trust-footer">
      <div className="container-center">
        <div className="footer-grid">
          
          {/* Column 1: Brand Info */}
          <div className="footer-col brand-info">
            <div className="footer-logo flex items-center gap-2 mb-4">
              <div className="nav-icon-box bg-sky-600 p-2 rounded-lg">
                <ShieldCheck size={18} color="white" />
              </div>
              <span className="font-bold text-xl text-white">EPLQ Protocol</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Securing global location intelligence through enterprise-grade Differential Privacy and AES-256 GCM encryption.
            </p>
          </div>

          {/* Column 2: Platform Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-list space-y-3">
              <li><Link href="/">Home Overview</Link></li>
              <li><Link href="/about">How it Works</Link></li>
              <li><Link href="/user/search">Query Engine</Link></li>
            </ul>
          </div>

          {/* Column 3: Security & Legal */}
          <div className="footer-col">
            <h4 className="footer-heading">Security</h4>
            <ul className="footer-list space-y-3">
              <li><Link href="/admin/login">Admin Portal</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Trust Metrics */}
          <div className="footer-col">
            <h4 className="footer-heading">Connect</h4>
            <ul className="footer-list space-y-3 text-slate-300">
              <li className="flex items-center gap-2"><Mail size={14} /> mishra.abhishek0703@gmail.com</li>
              <li className="flex items-center gap-2"><Lock size={14} /> Verified Node</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-xs">
          © {new Date().getFullYear()} EPLQ Secure Systems. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}