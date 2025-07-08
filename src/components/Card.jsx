import React from 'react';
import styles from './Card.module.css';

const Card = ({ question, onRemove }) => {
  return (
    <div className={`${styles.card} ${styles[question.type]}`}>
      <div className={styles.typeLabel}>
        {question.type === 'truth' ? '真心话' : '大冒险'}
      </div>
      <p className={styles.text}>{question.text}</p>
      <button onClick={() => onRemove(question.text)} className={styles.deleteButton}>
        &times;
      </button>
    </div>
  );
};

export default Card; 