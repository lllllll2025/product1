import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import Button from '../components/Button';

function HomePage() {
  const [difficulty, setDifficulty] = useState('normal');
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game', { state: { difficulty } });
  };
  
  const handleViewFavorites = () => {
    navigate('/favorites');
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>PulsePoint</h1>
        <h2>指尖脉冲</h2>
      </div>
      <p className={styles.tagline}>今晚谁会中招？放上手指试试看！</p>
      
      <div className={styles.controls}>
        <div className={styles.selectWrapper}>
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            className={styles.difficultySelector}
          >
            <option value="clean">😇 清水局</option>
            <option value="normal">😈 普通局</option>
            <option value="spicy">🌶️ 刺激局</option>
          </select>
        </div>
        
        <Button onClick={handleStartGame}>开始游戏</Button>
        <Button onClick={handleViewFavorites} variant="secondary">我的收藏</Button>
      </div>
    </div>
  );
}

export default HomePage; 