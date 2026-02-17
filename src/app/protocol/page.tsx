import styles from './protocol.module.css';

export default function ProtocolPage() {
  return (
    <main className={styles.mainWrapper}>
      
      <section className={styles.heroSection}>
        <div className={styles.badge}>Security Investigation Verified [cite: 10]</div>
        <h1 className={styles.title}>EPLQ Protocol</h1>
        <p className={styles.subtitle}>
          Efficient Privacy-Preserving Location-Based Query Protocol for spatial range queries[cite: 7, 11].
        </p>
      </section>

      <section className={styles.contentGrid}>
        <div className={styles.glassCard}>
          <h2 className={styles.cardTitle}>Predicate-Only Encryption</h2>
          <p className={styles.cardText}>
            We utilize the first predicate-only encryption system for the inner product range[cite: 8]. 
            This identifies if a position is within a specific circular area in a privacy-preserving manner[cite: 8].
          </p>
        </div>

        <div className={styles.glassCard}>
          <h2 className={styles.cardTitle}>Tree Index Architecture</h2>
          <p className={styles.cardText}>
            A privacy-preserving tree index structure is designed to significantly improve query latency[cite: 9].
          </p>
        </div>

        <div className={styles.glassCardFull}>
          <h2 className={styles.cardTitle}>Performance Standards</h2>
          <div className={styles.metricsContainer}>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>User Query Generation</span>
              <span className={styles.metricValue}>~0.9 Seconds [cite: 12]</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>Cloud Search Time</span>
              <span className={styles.metricValue}>A few seconds [cite: 13]</span>
            </div>
          </div>
          <p className={styles.cardText}>
            Extensive experiments demonstrate that EPLQ is particularly effective when querying outsourced encrypted data[cite: 11].
          </p>
        </div>
      </section>
    </main>
  );
}