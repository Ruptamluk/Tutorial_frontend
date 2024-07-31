import React from 'react';
import Link from 'next/link';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.dashboardHeader}>Student Dashboard</h1>
      <div className={styles.links}>
        <Link href="/tutorials" className={styles.link}>Download Tutorials</Link>
        <Link href="/exam" className={styles.link}>Take Exam</Link>
        <Link href="/performance" className={styles.link}>View Performance</Link>
      </div>
    </div>
  );
};

export default Dashboard;
