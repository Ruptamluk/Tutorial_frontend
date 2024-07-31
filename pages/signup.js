// pages/Signup.js
import { useState } from 'react';
import styles from '../styles/Signup.module.css';
import axios from 'axios';
import Link from 'next/link';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', { username, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/instagram-logo.png" alt="Instagram" />
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.formTitle}>Sign Up</h2>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input
            type="text"
            id="username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Sign Up</button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
      <div className={styles.loginLink}>
        <p>Already have an account?</p>
        <Link href="/signin">Log In</Link>
      </div>
    </div>
  );
}
