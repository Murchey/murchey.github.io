# Murchey 的个人博客

这是一个使用 Vue 3 + TypeScript、Inspira UI 组件和 Tailwind CSS v4 构建的个人博客网站。

## 项目特点

- 使用 Vue 3 Composition API + TypeScript
- 集成 Inspira UI 组件（极光背景、3D 卡片、聚光灯卡片、数字滚动等）
- 使用 Motion Vue 实现流畅动画
- 响应式设计，完美支持移动端
- 支持深色/浅色模式切换
- 使用 Lucide 图标库

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
├── public/                     # 静态资源
├── src/
│   ├── assets/
│   │   └── main.css           # 全局样式与 Tailwind CSS 配置
│   ├── components/
│   │   ├── inspira/           # Inspira UI 组件
│   │   │   ├── AuroraBackground.vue
│   │   │   ├── BentoGrid.vue
│   │   │   ├── BentoGridItem.vue
│   │   │   ├── BorderBeam.vue
│   │   │   ├── CardSpotlight.vue
│   │   │   ├── LetterPullup.vue
│   │   │   └── NumberTicker.vue
│   │   ├── Navbar.vue         # 导航栏
│   │   └── Footer.vue         # 页脚
│   ├── lib/
│   │   └── utils.ts           # 工具函数
│   ├── router/
│   │   └── index.ts           # 路由配置
│   ├── views/
│   │   ├── Home.vue           # 首页（极光背景 + 数字滚动）
│   │   ├── Projects.vue       # 项目展示页（聚光灯卡片 + 边框光束）
│   │   ├── About.vue          # 关于页面（技能进度条 + 工作经历）
│   │   └── Contact.vue        # 联系页面（表单 + 联系方式）
│   ├── App.vue                # 主组件
│   └── main.ts                # 入口文件
├── index.html                  # HTML 模板
├── package.json                # 项目配置
├── tsconfig.json               # TypeScript 配置
└── vite.config.ts              # Vite 配置
```

## 使用的 Inspira UI 组件

| 组件 | 说明 | 使用页面 |
|------|------|----------|
| AuroraBackground | 极光背景动画 | 首页 Hero 区域 |
| LetterPullup | 字符逐个上提动画 | 首页标题 |
| NumberTicker | 数字滚动动画 | 首页/关于页数据展示 |
| BentoGrid | 网格布局 | 首页功能展示 |
| CardSpotlight | 聚光灯卡片效果 | 项目页/关于页 |
| BorderBeam | 边框光束动画 | 首页 CTA/项目卡片 |

## 自定义配置

### 修改主题颜色

编辑 `src/assets/main.css` 文件中的 CSS 变量来修改主题颜色。

### 添加新页面

1. 在 `src/views/` 目录中创建新的 Vue 组件
2. 在 `src/router/index.ts` 中添加路由配置
3. 在 `src/components/Navbar.vue` 中添加导航链接

### 添加 Inspira UI 组件

访问 [Inspira UI 文档](https://inspira-ui.com/docs/en/components) 选择组件，通过注册表安装或手动复制代码到 `src/components/inspira/` 目录。

## 技术栈

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Inspira UI](https://inspira-ui.com/)
- [Motion Vue](https://motion.dev/docs/vue)
- [Lucide Icons](https://lucide.dev/)

## 许可证

MIT