import React, { useState, useEffect, useRef } from 'react';
import { Heart, Home, ArrowLeft, RefreshCw, Play, BookOpen, Trash2 } from 'lucide-react';

// 题库数据
const questionsData = {
  truth: {
    clean: [
      "你最怕什么动物？",
      "你小时候最尴尬的事情是什么？",
      "你最喜欢的卡通人物是谁？",
      "你觉得自己最可爱的地方是哪里？",
      "你最想去哪个国家旅行？",
      "你最不喜欢吃什么食物？",
      "你觉得自己像什么动物？",
      "你小时候的梦想是什么？",
      "你最怕看什么类型的电影？",
      "你觉得自己的超能力会是什么？"
    ],
    normal: [
      "你曾经暗恋过谁？",
      "你做过最后悔的事情是什么？",
      "你最想对某个人说什么话？",
      "你有什么不为人知的癖好？",
      "你最羡慕在座的哪个人？",
      "你觉得自己最大的缺点是什么？",
      "你谈过几次恋爱？",
      "你最害怕失去什么？",
      "你做过最疯狂的事情是什么？",
      "你最讨厌别人说你什么？"
    ],
    spicy: [
      "你有没有发过不该发的照片？",
      "你做过最羞耻的事情是什么？",
      "你最想和谁共度一夜？",
      "你偷偷喜欢过朋友的对象吗？",
      "你最不想让父母知道的事情是什么？",
      "你有没有在不合适的地方做过亲密行为？",
      "你最刺激的经历是什么？",
      "你会为了钱做什么疯狂的事？",
      "你最想尝试但不敢尝试的事情是什么？",
      "你有没有同时喜欢过两个人？"
    ]
  },
  dare: {
    clean: [
      "做十个俯卧撑",
      "学一种动物叫三声",
      "跳一段尴尬的舞蹈",
      "用屁股写自己的名字",
      "模仿一个卡通人物",
      "唱一首儿歌",
      "做一个搞笑的表情保持30秒",
      "用你的脚趾夹起一个东西",
      "模仿你妈妈说话的样子",
      "做一个超级英雄的动作"
    ],
    normal: [
      "给左边的人一个拥抱",
      "亲吻右边人的脸颊",
      "模仿你最讨厌的明星",
      "用最性感的声音说一句话",
      "做一个让人脸红的动作",
      "和异性对视30秒不能笑",
      "用你的舌头舔你的鼻子",
      "模仿你前任的一个习惯",
      "给你暗恋的人发一条暧昧短信",
      "表演一个浪漫的求婚场景"
    ],
    spicy: [
      "和异性拥抱一分钟",
      "模仿成人电影里的一个场景",
      "用最诱惑的方式吃一根香蕉",
      "脱掉一件衣服",
      "给某人来一个法式湿吻",
      "模仿你在床上的表情",
      "和异性玩真心话大冒险私人版",
      "用身体摆出一个暧昧的姿势",
      "描述你最疯狂的性幻想",
      "和某人在黑暗中独处五分钟"
    ]
  }
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [difficulty, setDifficulty] = useState('normal');
  const [touches, setTouches] = useState([]);
  const [selectedTouch, setSelectedTouch] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const gameAreaRef = useRef(null);

  // 从 localStorage 加载收藏
  useEffect(() => {
    const savedFavorites = localStorage.getItem('party-game-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // 检查振动支持
    if ('vibrate' in navigator) {
      setVibrationEnabled(true);
    }
  }, []);

  // 保存收藏到 localStorage
  const saveFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem('party-game-favorites', JSON.stringify(newFavorites));
  };

  // 振动反馈
  const vibrate = (pattern = 100) => {
    if (vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  // 处理触摸事件
  const handleTouchStart = (e) => {
    e.preventDefault();
    if (isAnimating) return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const newTouches = Array.from(e.touches).map((touch, index) => ({
      id: index,
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
      timestamp: Date.now()
    }));
    
    setTouches(newTouches);
    vibrate(50);
    
    if (newTouches.length >= 2) {
      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            selectRandomTouch(newTouches);
            return 0;
          }
          vibrate(50);
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    if (isAnimating) return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const remainingTouches = Array.from(e.touches).map((touch, index) => ({
      id: index,
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
      timestamp: Date.now()
    }));
    
    setTouches(remainingTouches);
    
    if (remainingTouches.length < 2) {
      setCountdown(0);
    }
  };

  // 随机选择一个触摸点
  const selectRandomTouch = (touchList) => {
    if (touchList.length === 0) return;
    
    setIsAnimating(true);
    vibrate([100, 50, 100]);
    
    const randomIndex = Math.floor(Math.random() * touchList.length);
    const selected = touchList[randomIndex];
    setSelectedTouch(selected);
    
    setTimeout(() => {
      generateQuestion();
      setCurrentPage('question');
      setIsAnimating(false);
      setTouches([]);
      setSelectedTouch(null);
    }, 2000);
  };

  // 生成问题
  const generateQuestion = () => {
    const categories = Object.keys(questionsData);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const questions = questionsData[randomCategory][difficulty];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    setCurrentQuestion({
      type: randomCategory,
      text: randomQuestion,
      difficulty: difficulty
    });
  };

  // 添加到收藏
  const addToFavorites = () => {
    if (currentQuestion && !favorites.find(fav => fav.text === currentQuestion.text)) {
      const newFavorites = [...favorites, currentQuestion];
      saveFavorites(newFavorites);
      vibrate(100);
    }
  };

  // 从收藏中删除
  const removeFromFavorites = (questionText) => {
    const newFavorites = favorites.filter(fav => fav.text !== questionText);
    saveFavorites(newFavorites);
    vibrate(100);
  };

  // 首页组件
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6 safe-area-inset">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-12">
          <div className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            真心话大冒险
          </div>
          <div className="text-lg text-gray-300">
            今晚谁会中招？放上手指试试看！
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <label className="block text-sm font-medium mb-3">选择游戏难度</label>
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white"
            >
              <option value="clean" className="text-black">清水 - 适合所有人</option>
              <option value="normal" className="text-black">普通 - 稍微刺激</option>
              <option value="spicy" className="text-black">刺激 - 大胆挑战</option>
            </select>
          </div>
          
          <button 
            onClick={() => {
              vibrate(100);
              setCurrentPage('game');
            }}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <Play size={20} />
            开始游戏
          </button>
          
          <button 
            onClick={() => {
              vibrate(100);
              setCurrentPage('favorites');
            }}
            className="w-full btn-secondary flex items-center justify-center gap-2"
          >
            <BookOpen size={20} />
            查看我的收藏 ({favorites.length})
          </button>
        </div>
      </div>
    </div>
  );

  // 游戏页面组件
  const GamePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overscroll-none">
      <div className="p-4 safe-area-inset">
        <button 
          onClick={() => {
            vibrate(100);
            setCurrentPage('home');
          }}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          返回
        </button>
      </div>
      
      <div 
        ref={gameAreaRef}
        className="relative h-screen w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">
              {touches.length < 2 
                ? "请至少2人将手指放在屏幕上" 
                : countdown > 0 
                  ? `${countdown}秒后选择...` 
                  : "正在选择..."
              }
            </div>
            <div className="text-gray-300">
              当前检测到 {touches.length} 个手指
            </div>
          </div>
        </div>
        
        {/* 显示触摸点 */}
        {touches.map((touch) => (
          <div
            key={touch.id}
            className="touch-point pulse-glow"
            style={{
              left: touch.x,
              top: touch.y,
            }}
          />
        ))}
        
        {/* 选中的触摸点 */}
        {selectedTouch && (
          <div
            className="selected-touch bounce-glow"
            style={{
              left: selectedTouch.x,
              top: selectedTouch.y,
            }}
          />
        )}
        
        {/* 粒子效果 */}
        {touches.map((touch) => (
          <div
            key={`particle-${touch.id}`}
            className="absolute pointer-events-none"
            style={{
              left: touch.x,
              top: touch.y,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                style={{
                  left: Math.cos(i * 45 * Math.PI / 180) * 30,
                  top: Math.sin(i * 45 * Math.PI / 180) * 30,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  // 问题页面组件
  const QuestionPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6 safe-area-inset">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <button 
            onClick={() => {
              vibrate(100);
              setCurrentPage('home');
            }}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            返回首页
          </button>
        </div>
        
        {currentQuestion && (
          <div className="card mb-8 animate-fade-in">
            <div className="text-center mb-6">
              <div className="text-sm text-gray-300 mb-2">
                {currentQuestion.type === 'truth' ? '真心话' : '大冒险'}
              </div>
              <div className="text-2xl font-bold">
                {currentQuestion.text}
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  vibrate(100);
                  generateQuestion();
                }}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <RefreshCw size={18} />
                换一个
              </button>
              
              <button 
                onClick={addToFavorites}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <Heart size={18} />
                收藏
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // 收藏页面组件
  const FavoritesPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6 safe-area-inset">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <button 
            onClick={() => {
              vibrate(100);
              setCurrentPage('home');
            }}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            返回首页
          </button>
        </div>
        
        <div className="text-2xl font-bold mb-6 text-center">
          我的收藏
        </div>
        
        {favorites.length === 0 ? (
          <div className="text-center text-gray-300 py-12">
            <div className="text-lg mb-4">你还没有收藏任何题目～</div>
            <div>快去玩一局吧！</div>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((question, index) => (
              <div key={index} className="card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm text-gray-300">
                    {question.type === 'truth' ? '真心话' : '大冒险'} - {question.difficulty}
                  </div>
                  <button
                    onClick={() => removeFromFavorites(question.text)}
                    className="text-red-400 hover:text-red-300 transition-colors active:scale-95"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="text-lg">
                  {question.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // 根据当前页面渲染对应组件
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'game':
        return <GamePage />;
      case 'question':
        return <QuestionPage />;
      case 'favorites':
        return <FavoritesPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="app overscroll-none">
      {renderCurrentPage()}
    </div>
  );
};

export default App; 