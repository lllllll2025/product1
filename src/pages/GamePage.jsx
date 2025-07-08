import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as PIXI from 'pixi.js';
import styles from './GamePage.module.css';

// Particle texture for performance
const particleTexture = new PIXI.Graphics()
  .beginFill(0xffffff)
  .drawCircle(0, 0, 5)
  .endFill()
  .generateCanvasTexture();

function GamePage() {
  const canvasRef = useRef(null);
  const appRef = useRef(null);
  const touchesRef = useRef(new Map());
  const particlesRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { difficulty } = location.state || { difficulty: 'normal' };
  
  const [message, setMessage] = useState('请至少两位玩家将手指放在屏幕上...');
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    // PIXI App Initialization
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x0a0a1a,
      antialias: true,
      resizeTo: window,
    });
    appRef.current = app;
    canvasRef.current.appendChild(app.view);
    
    // Game Loop
    let timerId = null;
    const gameLoop = () => {
      // Animate particles
      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.01;
        if (p.alpha <= 0) {
          app.stage.removeChild(p);
          particlesRef.current.splice(i, 1);
        }
      });

      // Start selection logic
      if (touchesRef.current.size >= 2 && !isSelecting && !timerId) {
        setMessage('保持住！即将开始选择...');
        timerId = setTimeout(() => {
          setIsSelecting(true);
          startSelection();
        }, 3000); // 3 seconds to start
      } else if (touchesRef.current.size < 2 && timerId) {
        clearTimeout(timerId);
        timerId = null;
        setMessage('人数不够哦，请至少两位玩家加入！');
      }
    };
    app.ticker.add(gameLoop);
    
    // Touch Events
    app.view.addEventListener('touchstart', handleTouchStart);
    app.view.addEventListener('touchend', handleTouchEnd);
    app.view.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      app.view.removeEventListener('touchstart', handleTouchStart);
      app.view.removeEventListener('touchend', handleTouchEnd);
      app.view.removeEventListener('touchcancel', handleTouchEnd);
      app.destroy(true, { children: true, texture: true, baseTexture: true });
    };
  }, [isSelecting]);

  const handleTouchStart = (e) => {
    e.preventDefault();
    if (isSelecting) return;
    for (const touch of e.changedTouches) {
      if (!touchesRef.current.has(touch.identifier)) {
        const touchPoint = { id: touch.identifier, x: touch.clientX, y: touch.clientY, emitter: null };
        const emitter = setInterval(() => createParticle(touchPoint.x, touchPoint.y), 50);
        touchPoint.emitter = emitter;
        touchesRef.current.set(touch.identifier, touchPoint);
      }
    }
  };
  
  const handleTouchEnd = (e) => {
    e.preventDefault();
    if (isSelecting) return;
    for (const touch of e.changedTouches) {
      if (touchesRef.current.has(touch.identifier)) {
        const touchPoint = touchesRef.current.get(touch.identifier);
        clearInterval(touchPoint.emitter);
        touchesRef.current.delete(touch.identifier);
      }
    }
  };

  const createParticle = (x, y) => {
    const particle = new PIXI.Sprite(particleTexture);
    particle.x = x;
    particle.y = y;
    particle.anchor.set(0.5);
    particle.tint = Math.random() * 0xFFFFFF;
    particle.vx = (Math.random() - 0.5) * 5;
    particle.vy = (Math.random() - 0.5) * 5;
    particle.alpha = 1;
    particlesRef.current.push(particle);
    appRef.current.stage.addChild(particle);
  };
  
  const startSelection = () => {
    // Stop all emitters
    touchesRef.current.forEach(touch => clearInterval(touch.emitter));
    
    const players = Array.from(touchesRef.current.values());
    const winner = players[Math.floor(Math.random() * players.length)];
    
    setMessage('选中的是...');
    
    // Converge animation
    const targetX = winner.x;
    const targetY = winner.y;
    
    appRef.current.ticker.add(() => {
      particlesRef.current.forEach(p => {
        p.vx += (targetX - p.x) * 0.001;
        p.vy += (targetY - p.y) * 0.001;
      });
    });

    setTimeout(() => {
        setMessage('就是你！');
        // Final explosion at winner
        for (let i = 0; i < 100; i++) {
          createParticle(targetX, targetY);
        }
    }, 2000);

    setTimeout(() => {
        navigate('/result', { state: { difficulty } });
    }, 4000);
  };

  return (
    <div className={styles.container}>
      <div ref={canvasRef} className={styles.canvasContainer} />
      <div className={styles.overlay}>
        <h1 className={`${styles.message} ${isSelecting ? styles.selecting : ''}`}>
          {message}
        </h1>
      </div>
    </div>
  );
}

export default GamePage; 