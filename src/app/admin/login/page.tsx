"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { ShieldCheck, User, Key, Mail, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import './auth-style.css'; 

export default function AuthPage() {
  const router = useRouter();

  // State for toggling modes
  const [role, setRole] = useState<'admin' | 'user'>('admin');
  const [isRegister, setIsRegister] = useState(false); 

  // Form States
  const [email, setEmail] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [confirmKey, setConfirmKey] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Added Success State

  // Clear errors and inputs when switching modes or roles
  useEffect(() => {
    setError('');
    setSuccess('');
    setPrivateKey('');
    setConfirmKey('');
  }, [isRegister, role]);

  // --- REAL-TIME VALIDATION CHECKS ---
  const isEmailValid = email.includes('@') && email.includes('.');
  const isPrivateKeyValid = isRegister 
    ? (privateKey.length >= 8 && /[a-zA-Z]/.test(privateKey) && /\d/.test(privateKey) && /[!@#$%^&*(),.?":{}|<>]/.test(privateKey))
    : (privateKey.length >= 6); 
  const isConfirmKeyValid = isRegister && confirmKey.length > 0 && confirmKey === privateKey;

  // Validation & Routing Logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !privateKey) {
      setError('All fields are required.');
      return;
    }
    if (!isEmailValid) {
      setError('Please enter a valid email format.');
      return;
    }

    // ==========================================
    // REGISTER LOGIC (Redirects to Login State)
    // ==========================================
    if (isRegister) {
      if (!isPrivateKeyValid) {
        setError('Private Key must be at least 8 chars long and include a letter, a number, and a special character.');
        return;
      }
      if (!isConfirmKeyValid) {
        setError('Private Keys do not match.');
        return;
      }
      if (localStorage.getItem(`eplq_${role}_${email}`)) {
        setError('Identity already exists. Please login.');
        return;
      }
      
      // Save user to LocalStorage
      localStorage.setItem(`eplq_${role}_${email}`, privateKey);
      
      // CHANGED: Do NOT route. Instead, switch to login screen & show success.
      setIsRegister(false);
      setPrivateKey(''); // Clear the key for security
      setConfirmKey('');
      setSuccess('Identity securely registered. Please Authorize Session to continue.');
    } 
    
    // ==========================================
    // LOGIN LOGIC (Redirects to Dashboards)
    // ==========================================
    else {
      const storedKey = localStorage.getItem(`eplq_${role}_${email}`);

      if (!storedKey) {
        setError(`Identity not found on this node. Please Register a New ID.`);
        return;
      }
      if (storedKey !== privateKey) {
        setError('Invalid Private Key provided. Access Denied.');
        return;
      }

      // SUCCESSFUL LOGIN: Route to respective pages
      router.push(role === 'admin' ? '/admin/dashboard' : '/user/profile');
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-grid-bg"></div>

      <div className="auth-card">
        
        {/* Role Toggle */}
        <div className="role-switcher">
          <button 
            type="button"
            className={`role-btn ${role === 'admin' ? 'active-admin' : ''}`}
            onClick={() => setRole('admin')}
          >
            <ShieldCheck size={16} /> Admin
          </button>
          <button 
            type="button"
            className={`role-btn ${role === 'user' ? 'active-user' : ''}`}
            onClick={() => setRole('user')}
          >
            <User size={16} /> User
          </button>
        </div>

        {/* Dynamic Header */}
        <div className="card-header">
          <div className={`icon-glow ${role === 'admin' ? 'glow-blue' : 'glow-purple'}`}>
            {role === 'admin' ? <ShieldCheck size={32} /> : <User size={32} />}
          </div>
          <h1>{isRegister ? 'Create Credentials' : (role === 'admin' ? 'Command Gate' : 'User Access')}</h1>
          <p>{isRegister ? 'Register new secure identity' : 'Authorized Personnel Only'}</p>
        </div>

        {/* The Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          
          <div className="input-group">
            <label>ID / EMAIL</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                placeholder={role === 'admin' ? "admin@eplq.io" : "user@example.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isEmailValid && <CheckCircle size={18} className="valid-tick" />}
            </div>
          </div>

          <div className="input-group">
            <label>PRIVATE KEY</label>
            <div className="input-wrapper">
              <Key size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
              />
              {isPrivateKeyValid && <CheckCircle size={18} className="valid-tick" />}
            </div>
            {isRegister && (
              <span className="text-[10px] text-slate-500 mt-1 block px-2">
                Min 8 chars. Must contain letter, number & special symbol.
              </span>
            )}
          </div>

          {isRegister && (
            <div className="input-group slide-in">
              <label>CONFIRM PRIVATE KEY</label>
              <div className="input-wrapper">
                <Key size={18} className="input-icon" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={confirmKey}
                  onChange={(e) => setConfirmKey(e.target.value)}
                />
                {isConfirmKeyValid && <CheckCircle size={18} className="valid-tick" />}
              </div>
            </div>
          )}

          {/* Success Message Display */}
          {success && (
            <div className="success-msg">
              <CheckCircle size={16} /> {success}
            </div>
          )}

          {/* Error Message Display */}
          {error && (
            <div className="error-msg">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button 
            type="submit" 
            className={`submit-btn ${role === 'admin' ? 'btn-blue' : 'btn-purple'}`}
          >
            {isRegister ? 'Register Account' : 'Authorize Session'} <ArrowRight size={18} />
          </button>

        </form>

        <div className="auth-footer">
          <p>
            {isRegister ? "Already have an ID?" : "Need credential access?"}
            <button 
              type="button"
              className="toggle-link"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Login to Node" : "Register New ID"}
            </button>
          </p>
        </div>

      </div>

      <div className="bottom-nav">
        <Link href="/" className="nav-item">Home</Link>
        <span className="dot">•</span>
        <div className="nav-item active">Login</div>
      </div>

    </div>
  );
}