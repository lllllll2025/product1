# 聚会真心话大冒险

一个专为移动端设计的多人互动聚会游戏，支持触摸检测、振动反馈和PWA功能。

## 功能特点

- 🎮 **多人触摸检测** - 支持多人同时触摸屏幕进行游戏
- 📱 **移动端优化** - 专为手机和平板设计，支持触摸手势
- 🔔 **振动反馈** - 支持设备振动反馈，增强游戏体验
- 💾 **本地存储** - 收藏喜欢的题目到本地
- 🎨 **美观界面** - 现代化的渐变设计和流畅动画
- 📱 **PWA支持** - 可安装为桌面应用，支持离线使用
- 🌐 **一键部署** - 支持Netlify一键部署

## 游戏玩法

1. 选择游戏难度（清水/普通/刺激）
2. 至少2人将手指放在屏幕上
3. 系统会随机选择一个人
4. 被选中的人需要回答真心话或完成大冒险
5. 可以收藏喜欢的题目

## 技术栈

- React 18
- Vite
- Tailwind CSS
- Lucide React Icons
- PWA (Service Worker)

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 部署到Netlify

### 方法一：通过GitHub部署

1. 将代码推送到GitHub仓库
2. 登录 [Netlify](https://netlify.com)
3. 点击 "New site from Git"
4. 选择你的GitHub仓库
5. 构建命令：`npm run build`
6. 发布目录：`dist`
7. 点击 "Deploy site"

### 方法二：拖拽部署

1. 运行 `npm run build` 构建项目
2. 将 `dist` 文件夹拖拽到 Netlify 的部署区域

### 方法三：使用Netlify CLI

```bash
# 安装Netlify CLI
npm install -g netlify-cli

# 登录Netlify
netlify login

# 部署
netlify deploy --prod --dir=dist
```

## 移动端优化

- 防止双击缩放
- 禁用文本选择
- 优化触摸事件处理
- 支持安全区域适配
- 防止弹性滚动
- 振动反馈支持

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！

## 更新日志

### v1.0.0
- 初始版本发布
- 支持多人触摸检测
- 添加振动反馈
- 实现PWA功能
- 优化移动端体验 