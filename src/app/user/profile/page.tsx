"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, ShieldCheck, Clock, Activity, MapPin, Server, Key, Search } from 'lucide-react';
import './profile-style.css';

export default function UserProfile() {
  const [userData, setUserData] = useState({
    username: "LOADING...",
    email: "loading@eplq.io",
    id: "USR-WAIT",
    status: "Active",
    joinDate: "Loading...",
    blurLevel: "High Anonymity (Radius 5km)",
  });

  const [loginHistory, setLoginHistory] = useState<any[]>([]);
  const [apiHistory, setApiHistory] = useState<any[]>([]); // Will hold real queries

  useEffect(() => {
    // 1. Load User Profile Data
    let activeEmail = "guest@eplq.io"; 
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("eplq_user_")) {
        activeEmail = key.replace("eplq_user_", "");
        break; 
      }
    }

    const extractedUsername = activeEmail.split('@')[0].toUpperCase();
    const randomId = `USR-${Math.floor(Math.random() * 9000) + 1000}-X7`;
    const today = new Date().toLocaleDateString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric' 
    });

    setUserData({
      username: extractedUsername,
      email: activeEmail,
      id: randomId,
      status: "Active",
      joinDate: today,
      blurLevel: "High Anonymity (Radius 5km)",
    });

    setLoginHistory([
      { 
        id: 1, 
        date: new Date().toLocaleString(), 
        ip: "Local Node", 
        device: navigator.userAgent.split(' ')[0] || "Unknown Device", 
        status: "Success" 
      }
    ]);

    // 2. Load Real Query History from LocalStorage
    const storedQueries = localStorage.getItem('eplq_user_queries');
    if (storedQueries) {
      setApiHistory(JSON.parse(storedQueries));
    }

  }, []);

  return (
    <div className="profile-container">
      <div className="profile-grid-bg"></div>

      <div className="profile-layout">
        
        {/* LEFT COLUMN: User Info & Security */}
        <div className="left-column">
          <div className="glass-card">
            <div className="card-header-flex">
              <div className="avatar-glow"><User size={32} /></div>
              <div>
                <h2 className="card-title">{userData.username}</h2>
                <p className="card-subtitle">{userData.id}</p>
              </div>
            </div>
            <div className="info-list">
              <div className="info-item">
                <span className="info-label">EMAIL ID</span>
                <span className="info-value">{userData.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">ACCOUNT STATUS</span>
                <span className="status-badge success">{userData.status}</span>
              </div>
              <div className="info-item">
                <span className="info-label">JOINED</span>
                <span className="info-value">{userData.joinDate}</span>
              </div>
              <div className="info-item">
                <span className="info-label">PRIVACY PROTOCOL</span>
                <span className="info-value highlight">{userData.blurLevel}</span>
              </div>
            </div>
            <button className="btn-outline-purple mt-4 w-full"><Key size={16}/> Manage API Keys</button>
          </div>

          <div className="glass-card mt-6">
            <h2 className="card-title flex-align"><Clock size={18}/> Access History</h2>
            <div className="history-list">
              {loginHistory.map((log) => (
                <div key={log.id} className="history-row">
                  <div>
                    <div className="history-ip">{log.ip}</div>
                    <div className="history-device">{log.device} • {log.date}</div>
                  </div>
                  <span className={`status-dot ${log.status === 'Success' ? 'dot-green' : 'dot-yellow'}`}></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: API & Query History */}
        <div className="right-column">
          <div className="glass-card full-height">
            <div className="card-header-flex justify-between border-bottom">
              <div>
                <h2 className="card-title flex-align"><Activity size={20}/> Location Query Ledger</h2>
                <p className="card-subtitle">Recent zero-knowledge API requests</p>
              </div>
              <Server size={24} color="#94a3b8" />
            </div>

            <div className="table-container">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>REQ ID</th>
                    <th>QUERY TYPE</th>
                    <th>TIMESTAMP</th>
                    <th>COORDINATES</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {apiHistory.length > 0 ? (
                    apiHistory.map((req) => (
                      <tr key={req.id}>
                        <td className="font-mono text-muted">{req.id}</td>
                        <td className="font-medium">{req.type}</td>
                        <td>{req.time}</td>
                        <td><span className="badge-blur"><MapPin size={12}/> {req.coords}</span></td>
                        <td>
                          <span className={`badge-status ${req.status.includes('200') ? 'bg-green' : 'bg-red'}`}>
                            {req.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    /* EMPTY STATE */
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                          <div style={{ padding: '1rem', backgroundColor: 'rgba(34, 211, 238, 0.1)', borderRadius: '50%' }}>
                            <Search size={32} color="#22d3ee" />
                          </div>
                          <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '300px' }}>
                            No queries initiated yet. Your spatial ledger is completely clean.
                          </p>
                          <Link href="/user/search" className="btn-outline-purple" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 'bold' }}>
                            <Search size={16} /> Initiate First Query
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="empty-state-footer">
              <p>End of recent query logs. Historical data is heavily encrypted.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}