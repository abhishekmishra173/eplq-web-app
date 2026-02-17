"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, User, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import './auth-style.css'; 

export default function AuthPage() {
  // State for toggling modes
  const [role, setRole] = useState<'admin' | 'user'>('admin');
  const [isRegister, setIsRegister] = useState(false); // Toggle between Login/Register

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Validation Logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!email || !password) {
      setError('All fields are required.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Register Specific Validation
    if (isRegister) {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      alert(`Registration Successful for ${role.toUpperCase()}: ${email}`);
    } else {
      // Login Specific Logic
      alert(`Login Attempt for ${role.toUpperCase()}: ${email}`);
    }
  };

  return (
    <div className="auth-container">
      
      {/* Dynamic Background Grid */}
      <div className="auth-grid-bg"></div>

      {/* --- REMOVED THE TOP LEFT LOGO HERE --- */}
      {/* The global Navbar will handle the branding now */}

      {/* --- MAIN AUTH CARD --- */}
      <div className="auth-card">
        
        {/* 1. Role Toggle (Admin / User) */}
        <div className="role-switcher">
          <button 
            className={`role-btn ${role === 'admin' ? 'active-admin' : ''}`}
            onClick={() => setRole('admin')}
          >
            <ShieldCheck size={16} /> Admin
          </button>
          <button 
            className={`role-btn ${role === 'user' ? 'active-user' : ''}`}
            onClick={() => setRole('user')}
          >
            <User size={16} /> User
          </button>
        </div>

        {/* 2. Dynamic Header */}
        <div className="card-header">
          <div className={`icon-glow ${role === 'admin' ? 'glow-blue' : 'glow-purple'}`}>
            {role === 'admin' ? <ShieldCheck size={32} /> : <User size={32} />}
          </div>
          <h1>{isRegister ? 'Create Credentials' : (role === 'admin' ? 'Command Gate' : 'User Access')}</h1>
          <p>{isRegister ? 'Register new secure identity' : 'Authorized Personnel Only'}</p>
        </div>

        {/* 3. The Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          
          {/* Email Input */}
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
            </div>
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label>SECURITY KEY</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Confirm Password (Only shows in Register Mode) */}
          {isRegister && (
            <div className="input-group slide-in">
              <label>CONFIRM KEY</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Error Message Display */}
          {error && (
            <div className="error-msg">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`submit-btn ${role === 'admin' ? 'btn-blue' : 'btn-purple'}`}
          >
            {isRegister ? 'Register Account' : 'Authorize Session'} <ArrowRight size={18} />
          </button>

        </form>

        {/* 4. Toggle between Login/Register */}
        <div className="auth-footer">
          <p>
            {isRegister ? "Already have an ID?" : "Need credential access?"}
            <button 
              className="toggle-link"
              onClick={() => {
                setIsRegister(!isRegister);
                setError(''); // Clear errors on switch
              }}
            >
              {isRegister ? "Login to Node" : "Register New ID"}
            </button>
          </p>
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <Link href="/" className="nav-item">Home</Link>
        <span className="dot">•</span>
        <div className="nav-item active">Login</div>
      </div>

    </div>
  );
}