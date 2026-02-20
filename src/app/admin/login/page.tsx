"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { ShieldCheck, User, Key, Mail, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import OtpVerification from '@/components/auth/OtpVerification';
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
  const [success, setSuccess] = useState(''); 
  const [isSending, setIsSending] = useState(false); // <-- ADDED: Prevents API spam

  // OTP Verification States
  const [showOTP, setShowOTP] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState('');

  // Clear errors and inputs when switching modes
  useEffect(() => {
    setError('');
    setSuccess('');
    setPrivateKey('');
    setConfirmKey('');
    setShowOTP(false);
  }, [isRegister, role]);

  const isEmailValid = email.includes('@') && email.includes('.');
  const isPrivateKeyValid = isRegister 
    ? (privateKey.length >= 8 && /[a-zA-Z]/.test(privateKey) && /\d/.test(privateKey) && /[!@#$%^&*(),.?":{}|<>]/.test(privateKey))
    : (privateKey.length >= 6); 
  const isConfirmKeyValid = isRegister && confirmKey.length > 0 && confirmKey === privateKey;

  // Made this async to handle the API call
  const handleSubmit = async (e: React.FormEvent) => {
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
      
      // Generate a 6-digit OTP
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOTP(generatedCode);
      
      // --- SMTP API INTEGRATION ---
      setIsSending(true); // Lock the UI
      
      try {
        const response = await fetch('/api/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: generatedCode }),
        });

        const data = await response.json();

        if (response.ok) {
          setShowOTP(true); // Only switch to OTP mode if email actually sent
        } else {
          setError(data.error || 'Failed to dispatch email. Check node connection.');
        }
      } catch (err) {
        setError('Network error. Failed to reach SMTP server.');
      } finally {
        setIsSending(false); // Unlock the UI
      }
      
    } else {
      // Login Logic
      const storedKey = localStorage.getItem(`eplq_${role}_${email}`);

      if (!storedKey) {
        setError(`Identity not found on this node. Please Register a New ID.`);
        return;
      }
      if (storedKey !== privateKey) {
        setError('Invalid Private Key provided. Access Denied.');
        return;
      }

      router.push(role === 'admin' ? '/admin/dashboard' : '/user/profile');
    }
  }

  // Called when OTP component successfully verifies
  const handleOtpSuccess = () => {
    setShowOTP(false);
    setIsRegister(false);
    setPrivateKey(''); 
    setConfirmKey('');
    setSuccess('Identity securely verified and registered. Please Authorize Session to continue.');
  };

  return (
    <div className="auth-container">
      <div className="auth-grid-bg"></div>

      {showOTP ? (
        // --- RENDER SEPARATE OTP COMPONENT ---
        <OtpVerification 
          email={email}
          role={role}
          privateKey={privateKey}
          generatedOTP={generatedOTP}
          onSuccess={handleOtpSuccess}
          onBack={() => setShowOTP(false)}
        />
      ) : (
        // --- RENDER MAIN AUTH CARD ---
        <div className="auth-card">
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

          <div className="card-header">
            <div className={`icon-glow ${role === 'admin' ? 'glow-blue' : 'glow-purple'}`}>
              {role === 'admin' ? <ShieldCheck size={32} /> : <User size={32} />}
            </div>
            <h1>{isRegister ? 'Create Credentials' : (role === 'admin' ? 'Command Gate' : 'User Access')}</h1>
            <p>{isRegister ? 'Register new secure identity' : 'Authorized Personnel Only'}</p>
          </div>

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

            {success && (
              <div className="success-msg">
                <CheckCircle size={16} /> {success}
              </div>
            )}
            {error && (
              <div className="error-msg">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {/* --- BUTTON DISABLED STATE ADDED --- */}
            <button 
              type="submit" 
              disabled={isSending}
              className={`submit-btn ${role === 'admin' ? 'btn-blue' : 'btn-purple'} ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSending ? 'Dispatching Protocol...' : (isRegister ? 'Proceed to Verification' : 'Authorize Session')} 
              {!isSending && <ArrowRight size={18} />}
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
      )}

      <div className="bottom-nav">
        <Link href="/" className="nav-item">Home</Link>
        <span className="dot">•</span>
        <div className="nav-item active">Login</div>
      </div>
    </div>
  );
}