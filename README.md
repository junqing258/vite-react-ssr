# vite-react-ssr

一个基于 Vite + React 18 构建的现代化企业级服务端渲染（SSR）应用模板，支持国际化、响应式设计和 SEO 优化。

## ✨ 特性

- 🚀 **高性能 SSR** - 基于 Vite 的流式渲染，显著提升首屏加载速度
- 🌍 **完整国际化支持** - 服务端语言检测 + 客户端动态切换，SEO 友好
- 🎨 **智能主题系统** - 支持亮色、暗色、自动三种模式，持久化用户偏好
- 📱 **响应式设计** - 结合 react-responsive 实现设备适配
- ⚡ **原子化 CSS** - 集成 UnoCSS，实现极速样式开发
- 🛠️ **开发体验优化** - Vite HMR + TypeScript + ESLint 完整开发环境
- 📊 **现代化状态管理** - Zustand + persist 实现轻量级、类型安全的状态管理
- 🗂️ **自动路由生成** - 基于文件系统的路由机制

## 🏗️ 技术栈

### 前端核心

- **React 18** - 使用最新的并发特性和流式渲染
- **TypeScript** - 类型安全的开发体验
- **Vite** - 极速的构建工具和开发服务器
- **React Router v7** - 现代化的路由管理

### 状态管理

- **Zustand** - 轻量级状态管理库
- **zustand/middleware/persist** - 状态持久化

### 样式方案

- **UnoCSS** - 即时按需的原子化 CSS 引擎
- **Sass** - CSS 预处理器支持

### 国际化

- **i18next** - 功能强大的国际化框架
- **react-i18next** - React 集成
- **languagedetector** - 语言检测

### 服务端

- **Express** - Node.js Web 框架
- **mobile-detect** - 移动设备检测

### 工具链

- **vite-plugin-pages** - 自动路由生成
- **react-helmet** - 头部信息管理
- **react-responsive** - 响应式组件

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 7 (推荐) 或 npm

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

```

### 开发模式

```bash
# 启动开发服务器
npm run dev

# 或使用 pnpm
pnpm dev
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 📁 项目结构

```
vite-react-ssr/
├── public/                    # 静态资源目录
├── scripts/                  # 构建脚本
│   └── sync-locales.sh      # 多语言资源同步脚本
├── src/
│   ├── components/          # 可复用 UI 组件
│   │   ├── CommonContexts.tsx    # 公共上下文提供者
│   │   ├── DeviceContext.tsx     # 设备检测上下文
│   │   ├── HreflangTags.tsx      # SEO 多语言标签
│   │   ├── LanguageSwitcher.tsx  # 语言切换器
│   │   ├── LocalizedRoute.tsx    # 本地化路由组件
│   │   ├── Navigation.tsx        # 导航组件
│   │   ├── SafeSuspense.tsx      # 安全的 Suspense 组件
│   │   └── UserStatus.tsx        # 用户状态组件
│   ├── config/              # 配置文件
│   │   └── i18n.ts          # 国际化配置
│   ├── hooks/               # 自定义 Hook
│   │   ├── useHydration.ts  # 水合状态 Hook
│   │   ├── useI18n.ts       # 国际化 Hook
│   │   ├── useResponsive.ts # 响应式 Hook
│   │   ├── useStore.ts      # 状态管理 Hook
│   │   └── useWindowSize.ts # 窗口尺寸 Hook
│   ├── i18n/               # 国际化配置
│   │   └── index.ts        # i18n 实例配置
│   ├── locales/            # 客户端多语言资源
│   │   ├── en-US/
│   │   └── zh-CN/
│   ├── mock/               # 模拟数据
│   │   └── fetchData.ts    # 数据获取模拟
│   ├── pages/              # 页面组件
│   │   ├── About.tsx       # 关于页面
│   │   ├── Contact.tsx     # 联系页面
│   │   ├── Index.tsx       # 首页
│   │   └── UnoCSS.tsx      # UnoCSS 演示页面
│   ├── server/             # 服务端逻辑
│   │   ├── languageDetector.ts # 语言检测器
│   │   └── pageDataLoader.ts   # 页面数据加载器
│   ├── store/              # 状态管理
│   │   ├── counterStore.ts # 计数器状态
│   │   ├── index.ts        # 状态管理入口
│   │   ├── themeStore.ts   # 主题状态
│   │   ├── userStore.ts    # 用户状态
│   │   └── utils.ts        # 状态工具函数
│   ├── types/              # 类型定义
│   │   ├── device.ts       # 设备类型
│   │   ├── global.d.ts     # 全局类型声明
│   │   ├── ssr.ts          # SSR 相关类型
│   │   └── store.ts        # 状态类型
│   ├── utils/              # 工具函数
│   │   ├── ssr/            # SSR 相关工具
│   │   ├── deviceDetection.ts # 设备检测
│   │   └── fetchData.ts    # 数据获取工具
│   ├── App.tsx             # 应用主组件
│   ├── entry-client.tsx    # 客户端入口
│   ├── entry-server.tsx    # 服务端入口
│   └── index.css           # 全局样式
├── index.html              # HTML 模板
├── server.js               # Express 服务器
├── vite.config.ts          # Vite 配置
├── uno.config.ts           # UnoCSS 配置
└── tsconfig.json           # TypeScript 配置
```

## 🌍 国际化系统

项目实现了完整的服务端渲染国际化支持：

### 语言检测优先级

1. URL 路径前缀 (`/zh-CN/`, `/en-US/`)
2. Cookie 中的语言偏好
3. Accept-Language 请求头
4. 默认语言 (zh-CN)

### 支持的语言

- 🇨🇳 中文 (zh-CN) - 默认语言
- 🇺🇸 英文 (en-US)

### 多语言资源管理

- **客户端资源**: `src/locales/` - 运行时按需加载
- **服务端资源**: `public/locales/` - 编译时内联
- **同步脚本**: `scripts/sync-locales.sh` - 确保资源一致性

## 🎨 主题系统

支持三种主题模式：

- **Light** - 浅色主题
- **Dark** - 深色主题
- **Auto** - 跟随系统设置

主题设置会自动持久化到 localStorage，并在 SSR 水合时安全恢复。

## 🚀 SSR 架构

### 核心特性

- **流式渲染** - 使用 `renderToPipeableStream` 提升 TTFB
- **数据预加载** - 服务端提前获取页面数据
- **安全水合** - 延迟水合避免客户端/服务端不一致
- **语言同步** - 确保服务端和客户端语言状态一致

### 性能优化

- 静态资源压缩 (gzip)
- 关键资源内联
- 智能代码分割
- CDN 友好的构建输出

## 📱 响应式设计

集成 react-responsive 实现设备适配：

```typescript
const isMobile = useResponsive({ maxWidth: 768 });
const isTablet = useResponsive({ minWidth: 769, maxWidth: 1024 });
const isDesktop = useResponsive({ minWidth: 1025 });
```

## 🛠️ 开发指南

### 添加新页面

在 `src/pages/` 目录下创建 `.tsx` 文件，路由将自动生成：

```tsx
// src/pages/NewPage.tsx
import { useTranslation } from "react-i18next";

export default function NewPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("newPage.title")}</h1>
    </div>
  );
}
```

### 添加多语言内容

1. 在 `src/locales/zh-CN/common.json` 添加中文文案
2. 在 `src/locales/en-US/common.json` 添加英文文案
3. 运行 `npm run sync:locales` 同步到服务端

### 创建新的状态管理

```typescript
// src/store/newStore.ts
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface NewState {
  value: string;
  setValue: (value: string) => void;
}

export const useNewStore = create<NewState>()(
  devtools(
    persist(
      (set) => ({
        value: "",
        setValue: (value) => set({ value }),
      }),
      { name: "new-storage" }
    )
  )
);
```

## 📜 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产版本
- `npm run sync:locales` - 同步多语言资源

## 🔗 相关链接

- [Vite 官方文档](https://vitejs.dev/)
- [React 官方文档](https://react.dev/)
- [Zustand 文档](https://github.com/pmndrs/zustand)
- [UnoCSS 文档](https://unocss.dev/)
- [i18next 文档](https://www.i18next.com/)
