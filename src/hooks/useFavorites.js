import { useState, useCallback, useEffect } from 'react';

const FAVORITES_KEY = 'pulsepoint_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // 从 localStorage 加载收藏
  useEffect(() => {
    try {
      const items = window.localStorage.getItem(FAVORITES_KEY);
      setFavorites(items ? JSON.parse(items) : []);
    } catch (error) {
      console.error("Error loading favorites from localStorage", error);
      setFavorites([]);
    }
  }, []);

  // 保存收藏到 localStorage
  const saveFavorites = (items) => {
    try {
      setFavorites(items);
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving favorites to localStorage", error);
    }
  };

  // 添加收藏
  const addFavorite = useCallback((question) => {
    if (!favorites.find(fav => fav.text === question.text)) {
      const newFavorites = [...favorites, question];
      saveFavorites(newFavorites);
      return true; // 表示添加成功
    }
    return false; // 表示已存在
  }, [favorites]);

  // 删除收藏
  const removeFavorite = useCallback((questionText) => {
    const newFavorites = favorites.filter(fav => fav.text !== questionText);
    saveFavorites(newFavorites);
  }, [favorites]);

  // 检查是否已收藏
  const isFavorite = useCallback((questionText) => {
    return favorites.some(fav => fav.text === questionText);
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}; 