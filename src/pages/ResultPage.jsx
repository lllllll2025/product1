import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ResultPage.module.css';
import Button from '../components/Button';
import { useFavorites } from '../hooks/useFavorites';
import questions from '../data/questions.json';

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { difficulty } = location.state || { difficulty: 'normal' };
  const { addFavorite, isFavorite } = useFavorites();

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const questionPool = useMemo(() => {
    const truthPool = questions.truth[difficulty] || [];
    const darePool = questions.dare[difficulty] || [];
    return [
      ...truthPool.map(q => ({ type: 'truth', text: q })),
      ...darePool.map(q => ({ type: 'dare', text: q }))
    ];
  }, [difficulty]);

  const getNewQuestion = () => {
    if (questionPool.length > 0) {
      const randomIndex = Math.floor(Math.random() * questionPool.length);
      const newQ = questionPool[randomIndex];
      setCurrentQuestion(newQ);
      setIsFavorited(isFavorite(newQ.text));
    }
  };

  useEffect(() => {
    getNewQuestion();
  }, [difficulty]); // 仅在难度变化时重新获取问题

  const handleFavoriteClick = () => {
    if (currentQuestion && !isFavorited) {
      addFavorite(currentQuestion);
      setIsFavorited(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }
  };
  
  if (!currentQuestion) {
    return <div className={styles.container}>正在加载题目...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.questionCard} ${styles[currentQuestion.type]}`}>
        <div className={styles.questionType}>
          {currentQuestion.type === 'truth' ? '真心话' : '大冒险'}
        </div>
        <p className={styles.questionText}>{currentQuestion.text}</p>
      </div>
      
      <div className={styles.actions}>
        <Button onClick={getNewQuestion} variant="secondary">换一个</Button>
        <Button onClick={handleFavoriteClick} disabled={isFavorited}>
          {isFavorited ? '已收藏' : '收藏 ❤️'}
        </Button>
        <Button onClick={() => navigate('/')}>返回首页</Button>
      </div>

      {showNotification && (
        <div className={styles.notification}>
          收藏成功！
        </div>
      )}
    </div>
  );
}

export default ResultPage; 