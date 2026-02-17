'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Fingerprint, Lock, ShieldCheck, ArrowRight, User, Database } from 'lucide-react';
import './login.css';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState<'admin' | 'user'>('admin');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation of auth check based on type
    setTimeout(() => {
      if (loginType === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/search'); // Redirect users to search/dashboard
      }
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        
        {/* Toggle Switch */}
        <div className="login-toggle-container">
          <button 
            className={`toggle-btn ${loginType === 'admin' ? 'active' : ''}`}
            onClick={() => setLoginType('admin')}
          >
            <ShieldCheck size={16} /> Admin
          </button>
          <button 
            className={`toggle-btn ${loginType === 'user' ? 'active' : ''}`}
            onClick={() => setLoginType('user')}
          >
            <User size={16} /> User
          </button>
        </div>

        {/* Header Section */}
        <div className="login-header">
          <div className={`icon-box ${loginType === 'user' ? 'user-mode' : ''}`}>
            {loginType === 'admin' ? <Fingerprint size={32} /> : <Database size={32} />}
          </div>
          <h2 className="login-title">
            {loginType === 'admin' ? 'Command Gate' : 'User Access'}
          </h2>
          <p className="login-subtitle">
            {loginType === 'admin' 
              ? 'Authorized Personnel Only' 
              : 'Secure Query Interface'}
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">
              {loginType === 'admin' ? 'Admin ID' : 'User Email'}
            </label>
            <input 
              type="email" 
              required 
              className="security-input" 
              placeholder={loginType === 'admin' ? "admin@eplq.io" : "user@example.com"} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              {loginType === 'admin' ? 'Security Key' : 'Password'}
            </label>
            <div className="input-wrapper">
              <input 
                type="password" 
                required 
                className="security-input" 
                placeholder="••••••••" 
              />
              <Lock className="input-icon" size={18} />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className={`btn-login ${loginType === 'user' ? 'btn-user' : ''}`}
          >
            {loading 
              ? "Verifying Credentials..." 
              : (loginType === 'admin' ? "Authorize Session" : "Enter Grid")
            } 
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Footer Link */}
        <div className="login-footer">
          <button 
            onClick={() => router.push('/')}
            className="back-link"
          >
            <ShieldCheck size={14} /> Back to Public Node
          </button>
        </div>
      </div>
    </div>
  );
}