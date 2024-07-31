import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Tutorials.module.css';

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [subject, setSubject] = useState('math');

  useEffect(() => {
    axios.get(`/api/tutorials/${subject}`)
      .then(response => {
        setTutorials(response.data.tutorials);
      })
      .catch(error => {
        console.error('Error fetching tutorials:', error);
      });
  }, [subject]);

  const downloadTutorial = (filename) => {
    window.location.href = `/api/tutorials/download/${subject}/${filename}`;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.tutorialsHeader}>{subject.toUpperCase()} Tutorials</h1>
      <div className={styles.tutorials}>
        {tutorials.map(tutorial => (
          <div key={tutorial} className={styles.tutorial}>
            <span>{tutorial}</span>
            <button 
              className={styles.tutorialButton} 
              onClick={() => downloadTutorial(tutorial)}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
