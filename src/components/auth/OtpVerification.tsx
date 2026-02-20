"use client";
import React, { useState } from 'react';
import { Fingerprint, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

interface OtpVerificationProps {
  email: string;
  role: 'admin' | 'user';
  privateKey: string;
  generatedOTP: string;
  onSuccess: () => void;
  onBack: () => void;
}

export default function OtpVerification({ 
  email, 
  role, 
  privateKey, 
  generatedOTP, 
  onSuccess, 
  onBack 
}: OtpVerificationProps) {
  
  const [otpInput, setOtpInput] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otpInput === generatedOTP) {
      // OTP is correct. Save the user to local storage.
      localStorage.setItem(`eplq_${role}_${email}`, privateKey);
      
      // Trigger the success callback to return to the login screen
      onSuccess();
    } else {
      setError('Invalid Verification Code. Please check your email and try again.');
    }
  };

  return (
    <div className="auth-card">
      <div className="card-header">
        <div className={`icon-glow ${role === 'admin' ? 'glow-blue' : 'glow-purple'}`}>
          <Fingerprint size={32} />
        </div>
        <h1>Verify Identity</h1>
        <p>Enter the 6-digit code sent to {email}</p>
      </div>

      <form onSubmit={handleVerifyOTP} className="auth-form slide-in">
        <div className="input-group">
          <label>VERIFICATION CODE</label>
          <div className="input-wrapper" style={{ justifyContent: 'center' }}>
            <input 
              type="text" 
              maxLength={6}
              placeholder="000000"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))} // Only allow numbers
              style={{ textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}
            />
          </div>
        </div>

        {error && (
          <div className="error-msg">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <button type="submit" className={`submit-btn ${role === 'admin' ? 'btn-blue' : 'btn-purple'}`}>
          Verify & Complete Registration <CheckCircle size={18} />
        </button>

        <button 
          type="button" 
          className="toggle-link mt-4 flex items-center justify-center gap-2 mx-auto"
          onClick={onBack}
        >
          <ArrowLeft size={14} /> Back to Registration
        </button>
      </form>
    </div>
  );
}