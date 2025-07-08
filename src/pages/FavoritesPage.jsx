import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import styles from './FavoritesPage.module.css';
import Button from '../components/Button';
import Card from '../components/Card';

function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>我的收藏</h1>
      
      <div className={styles.listContainer}>
        {favorites.length > 0 ? (
          favorites.map((q, index) => (
            <Card key={index} question={q} onRemove={removeFavorite} />
          ))
        ) : (
          <p className={styles.emptyMessage}>
            你还没有收藏任何题目～<br/>快去玩一局吧！
          </p>
        )}
      </div>
      
      <div className={styles.footer}>
        <Button onClick={() => navigate('/')} variant="secondary">返回首页</Button>
      </div>
    </div>
  );
}

export default FavoritesPage; 