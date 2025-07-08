# Pulse Point

## 项目简介
Pulse Point 是一个基于 React 的聚会真心话小游戏，支持题库、收藏、卡片展示等功能，界面美观，体验流畅。

---

## 目录结构说明

```
pulse-point/
├── public/
│   └── favicon.ico                  # 网站图标
├── src/
│   ├── assets/
│   │   └── background.css           # 全局背景和字体样式
│   ├── components/
│   │   ├── Button.jsx               # 自定义按钮组件
│   │   ├── Button.module.css        # 按钮样式
│   │   └── Card.jsx                 # 卡片组件 (用于收藏页)
│   │   └── Card.module.css          # 卡片样式
│   ├── data/
│   │   └── questions.json           # 内置题库
│   ├── hooks/
│   │   └── useFavorites.js          # 管理本地收藏的 Hook
│   ├── pages/
│   │   ├── FavoritesPage.jsx        # 收藏页
│   │   ├── FavoritesPage.module.css # 收藏页样式
│   │   ├── GamePage.jsx             # 游戏页
│   │   ├── GamePage.module.css      # 游戏页样式
│   │   ├── HomePage.jsx             # 首页
│   │   ├── HomePage.module.css      # 首页样式
│   │   └── ResultPage.jsx           # 结果页
│   │   └── ResultPage.module.css    # 结果页样式
│   ├── App.jsx                      # 主应用及路由配置
│   └── main.jsx                     # 应用入口
├── .gitignore                       # Git 忽略文件
├── index.html                       # HTML 模板
├── package.json                     # 项目依赖与脚本
├── vite.config.js                   # Vite 配置
└── README.md                        # 项目说明文档
```

---

## 主要功能
- 真心话题库随机抽取
- 收藏喜欢的问题
- 卡片式展示收藏内容
- 响应式美观界面

---

## 快速开始

1. 安装依赖
   ```bash
   npm install
   ```
2. 启动开发服务器
   ```bash
   npm run dev
   ```
3. 打开浏览器访问：
   ```
   http://localhost:5173
   ```

---

## 构建与部署

1. 构建生产包
   ```bash
   npm run build
   ```
2. 预览生产包
   ```bash
   npm run preview
   ```

---

## 依赖技术
- React 18
- Vite
- CSS Modules

---

## 目录说明
- `public/`：静态资源目录
- `src/assets/`：全局样式
- `src/components/`：可复用组件
- `src/data/`：题库数据
- `src/hooks/`：自定义 Hook
- `src/pages/`：页面组件
- `src/`：主应用入口与配置

---

## 联系方式
如有建议或问题，欢迎 issue 或 PR！ 