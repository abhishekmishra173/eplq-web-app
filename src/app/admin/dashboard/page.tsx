"use client";

import React, { useState } from "react";
import {
  UploadCloud,
  Key,
  Settings,
  Activity,
  ShieldCheck,
  Lock,
  RefreshCcw,
  Fingerprint,
  LogOut,
  FileText,
} from "lucide-react";
import Link from "next/link";
import "./dashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    "audit" | "upload" | "keys" | "config"
  >("audit");

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <p className="nav-section-title">Monitor</p>
          <SidebarItem
            icon={<Activity size={18} />}
            label="Security Audit"
            active={activeTab === "audit"}
            onClick={() => setActiveTab("audit")}
          />

          <p className="nav-section-title">Management</p>
          <SidebarItem
            icon={<UploadCloud size={18} />}
            label="Dataset Upload"
            active={activeTab === "upload"}
            onClick={() => setActiveTab("upload")}
          />
          <SidebarItem
            icon={<Key size={18} />}
            label="Access Keys"
            active={activeTab === "keys"}
            onClick={() => setActiveTab("keys")}
          />
          <SidebarItem
            icon={<Settings size={18} />}
            label="Privacy Params"
            active={activeTab === "config"}
            onClick={() => setActiveTab("config")}
          />
        </nav>

        <div className="sidebar-footer">
          <Link href="/admin/login" className="sign-out-btn">
            <LogOut size={18} />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="main-content">
        <header className="page-header">
          <h1 className="page-title">
            {activeTab === "audit" && "Security Overview"}
            {activeTab === "upload" && "Data Ingestion"}
            {activeTab === "keys" && "Credential Manager"}
            {activeTab === "config" && "Protocol Settings"}
          </h1>
          <p className="page-desc">
            System status and privacy enforcement metrics.
          </p>
        </header>

        {/* Dynamic Content Rendering */}
        <div>
          {activeTab === "audit" && <SecurityAuditView />}
          {activeTab === "upload" && <UploadView />}
          {activeTab === "config" && <ConfigView />}
          {activeTab === "keys" && (
            <div className="upload-zone">
              <Key className="upload-icon" size={48} />
              <h3 className="upload-title">Key Management</h3>
              <p className="upload-desc">
                Rotate encryption keys for connected nodes.
              </p>
              <button className="btn-primary" disabled>
                Feature Locked (Demo)
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// --- Sub-components ---

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`nav-item ${active ? "active" : ""}`}>
      {icon}
      <span className="nav-label">{label}</span>
    </button>
  );
}

function SecurityAuditView() {
  return (
    <div>
      <div className="dashboard-grid">
        <StatusCard
          title="Privacy Level"
          value="ε = 1.2"
          icon={<ShieldCheck color="#10B981" />}
        />
        <StatusCard
          title="Encrypted Streams"
          value="14 Active"
          icon={<Lock color="#38BDF8" />}
        />
        <StatusCard
          title="Leakage Risk"
          value="0.02%"
          icon={<Fingerprint color="#A78BFA" />}
        />
      </div>

      <div className="glass-panel audit-table-container">
        <div className="audit-header">
          <h3 className="table-title">Audit Log</h3>
          <RefreshCcw size={14} color="#64748B" style={{ cursor: "pointer" }} />
        </div>
        <table className="audit-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Operation</th>
              <th>Node</th>
              <th className="table-header-right">Result</th>
            </tr>
          </thead>
          <tbody>
            <AuditRow
              time="14:22:01"
              action="Spatial BLUR"
              origin="node_09"
              result="Success"
            />
            <AuditRow
              time="14:15:55"
              action="Key Rotation"
              origin="sys_admin"
              result="Success"
            />
            <AuditRow
              time="13:50:12"
              action="Schema Access"
              origin="external_untrusted"
              result="Blocked"
              isWarning
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusCard({ title, value, icon }: any) {
  return (
    <div className="stat-card">
      <div className="icon-container">{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{title}</div>
    </div>
  );
}

function AuditRow({ time, action, origin, result, isWarning }: any) {
  return (
    <tr>
      <td className="audit-time">{time}</td>
      <td className="audit-action">{action}</td>
      <td className="audit-origin">{origin}</td>
      <td className={`audit-result ${isWarning ? "warning" : ""}`}>{result}</td>
    </tr>
  );
}

function UploadView() {
  const [formData, setFormData] = useState({
    name: "",
    lat: "",
    lng: "",
    category: "General",
    description: "",
  });
  const [status, setStatus] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Encrypting & Uploading...");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          lat: parseFloat(formData.lat),
          lng: parseFloat(formData.lng),
        }),
      });

      if (res.ok) {
        setStatus("Success: Data Encrypted & Stored.");
        setFormData({
          name: "",
          lat: "",
          lng: "",
          category: "General",
          description: "",
        });
      } else {
        setStatus("Error: Upload Failed.");
      }
    } catch (err) {
      setStatus("Error: Network Failure.");
    }
  };

  return (
    <div className="glass-panel panel-form">
      <h3 className="table-title form-title">New Secure POI</h3>
      <form onSubmit={handleUpload}>
        <input
          className="form-input"
          placeholder="Location Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <div className="form-row">
          <input
            className="form-input"
            placeholder="Latitude (e.g. 40.78)"
            type="number"
            step="any"
            value={formData.lat}
            onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
            required
          />
          <input
            className="form-input"
            placeholder="Longitude (e.g. -73.96)"
            type="number"
            step="any"
            value={formData.lng}
            onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
            required
          />
        </div>
        <select
          className="form-input"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          aria-label="POI Category"
        >
          <option value="General">General</option>
          <option value="Health">Health</option>
          <option value="Safety">Safety</option>
          <option value="Military">Military</option>
        </select>
        <textarea
          className="form-input"
          placeholder="Description (Will be encrypted)"
          rows={3}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>

        <button type="submit" className="btn-primary btn-full-width">
          <UploadCloud
            size={16}
            style={{ display: "inline", marginRight: "8px" }}
          />
          Encrypt & Upload
        </button>
        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );
}

function ConfigView() {
  return (
    <div className="glass-panel panel-form">
      <h3 className="table-title form-title">Differential Privacy Controls</h3>
      <div>
        <label className="stat-label label-block">Privacy Budget (ε)</label>
        <input type="range" className="range-input" />
        <button className="btn-primary btn-full-width">
          Update Global Protocol
        </button>
      </div>
    </div>
  );
}
