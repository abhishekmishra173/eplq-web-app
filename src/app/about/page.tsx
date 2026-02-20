import React from 'react';
import styles from './about.module.css';

const AboutPage = () => {
  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <section className={styles.heroSection}>
          <span className={styles.badge}>Domain: Public Safety</span>
          <h1 className={styles.mainHeading}>Privacy-Preserving Spatial Intelligence</h1>
        </section>

        <section className={styles.bodySection}>
          <h2 className={styles.subHeading}>Mission & Function</h2>
          <div className={styles.problemStatement}>
            <p>
              EPLQ is an efficient and privacy-preserving location-based query solution designed for public safety. 
              The website acts as a secure node that allows users to perform spatial range queries to find Points of Interest (POIs) 
              within specific circular distances without ever revealing their actual coordinates to the cloud provider.
            </p>
          </div>

          <h2 className={styles.subHeading}>Core Security Mechanisms</h2>
          <div className={styles.cardGrid}>
            <div className={styles.featureItem}>
              <h3>Predicate-Only Encryption</h3>
              <p>
                This is the first system to implement predicate-only encryption for the inner product range. 
                It mathematically verifies if a user is within a specific area while keeping the data encrypted.
              </p>
            </div>
            <div className={styles.featureItem}>
              <h3>Privacy-Preserving Tree Index</h3>
              <p>
                To prevent high latency, EPLQ uses a specialized tree index structure. 
                This allows the system to search outsourced encrypted data in just a few seconds on a standard workstation.
              </p>
            </div>
            <div className={styles.featureItem}>
              <h3>Differential Privacy</h3>
              <p>
                The system employs noise injection to ensure privacy guarantees, making it particularly effective 
                for mobile users who require quick responses—roughly 0.9 seconds—without risking re-identification.
              </p>
            </div>
          </div>

          <h2 className={styles.subHeading}>System Architecture</h2>
          <p className={styles.description}>
            The platform is built on a modular architecture:
          </p>
          <ul className={styles.objectivesList}>
            <li><strong>Admin Module:</strong> Responsible for registering, logging in, and uploading the encrypted POI datasets.</li>
            <li><strong>User Module:</strong> Allows users to securely search and decrypt spatial data results.</li>
            <li><strong>Security Layer:</strong> Uses AES-256 encryption at the hardware level and JavaScript-based logging for every action.</li>
          </ul>

          {/* --- ADDED SHORTCUTS SECTION --- */}
          <h2 className={styles.subHeading}>Global Node Shortcuts</h2>
          <p className={styles.description}>
            Navigate the secure grid instantly using global keybinds. Hold <strong>Shift</strong> + the designated key:
          </p>
          <ul className={styles.objectivesList}>
            <li><strong>Shift + H:</strong> Home Dashboard</li>
            <li><strong>Shift + M:</strong> Map / Query Interface</li>
            <li><strong>Shift + P:</strong> Protocol Specs</li>
            <li><strong>Shift + U:</strong> User Identity Ledger</li>
            <li><strong>Shift + D:</strong> Admin Command Node</li>
            <li><strong>Shift + L:</strong> Login / Node Access</li>
            <li><strong>Shift + A:</strong> About EPLQ</li>
          </ul>

        </section>
      </div>
    </main>
  );
};

export default AboutPage;