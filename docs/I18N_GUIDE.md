# 国际化 (i18n) 使用指南

本项目已集成 `react-i18next` 国际化解决方案，支持中英双语切换。

## 🚀 功能特性

- ✅ 支持中文 (`zh-CN`) 和英文 (`en-US`)
- ✅ 自动语言检测
- ✅ 本地存储持久化
- ✅ 服务端渲染 (SSR) 支持
- ✅ TypeScript 类型安全
- ✅ 响应式语言切换组件
- ✅ 命名空间组织

## 📁 文件结构

```
src/
├── locales/                 # 语言资源文件
│   ├── zh-CN/
│   │   ├── common.json     # 通用翻译
│   │   ├── home.json       # 首页翻译
│   │   ├── about.json      # 关于页面翻译
│   │   └── contact.json    # 联系页面翻译
│   └── en-US/
│       ├── common.json
│       ├── home.json
│       ├── about.json
│       └── contact.json
├── components/
│   └── LanguageSwitch.tsx  # 语言切换组件
├── hooks/
│   └── useI18n.ts          # i18n Hooks
├── store/
│   └── languageStore.ts    # 语言状态管理
└── i18n.ts                 # i18n 配置文件

public/
└── locales/                # 运行时语言资源（自动同步）
    ├── zh-CN/
    └── en-US/
```

## 🔧 使用方法

### 基础使用

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('common');
  
  return (
    <div>
      <h1>{t('navigation.home')}</h1>
      <p>{t('user.welcome', { name: 'John' })}</p>
    </div>
  );
}
```

### 使用自定义 Hooks

```tsx
import { useI18n, usePageI18n } from '../hooks/useI18n';

// 通用 Hook
function MyComponent() {
  const { t, currentLanguage, changeLanguage } = useI18n();
  
  return (
    <div>
      <p>当前语言: {currentLanguage}</p>
      <button onClick={() => changeLanguage('en-US')}>
        Switch to English
      </button>
    </div>
  );
}

// 页面专用 Hook
function HomePage() {
  const { t, tCommon } = usePageI18n('home');
  
  return (
    <div>
      <h1>{t('heading')}</h1>
      <button>{tCommon('common.save')}</button>
    </div>
  );
}
```

### 语言切换组件

```tsx
import LanguageSwitch from './components/LanguageSwitch';

function App() {
  return (
    <div>
      <LanguageSwitch />
    </div>
  );
}
```

## 📝 添加新语言

### 1. 创建语言文件

在 `src/locales/` 目录下创建新的语言文件夹，例如 `ja-JP`：

```bash
mkdir src/locales/ja-JP
cp src/locales/zh-CN/*.json src/locales/ja-JP/
```

### 2. 翻译内容

编辑 `src/locales/ja-JP/` 下的 JSON 文件，翻译相应内容。

### 3. 复制到 public 目录

```bash
cp -r src/locales/ja-JP public/locales/
```

### 4. 更新语言切换组件

在 `src/components/LanguageSwitch.tsx` 中添加新语言选项：

```tsx
const languages = [
  { code: 'zh-CN', name: t('language.zh-CN') },
  { code: 'en-US', name: t('language.en-US') },
  { code: 'ja-JP', name: '日本語' }, // 新增
];
```

## 🎯 命名空间

本项目使用命名空间来组织翻译资源：

- `common`: 通用翻译（导航、按钮、状态等）
- `home`: 首页专用翻译
- `about`: 关于页面翻译
- `contact`: 联系页面翻译

### 添加新命名空间

1. 在每个语言文件夹下创建新的 JSON 文件
2. 更新 `src/i18n.ts` 中的 `ns` 数组
3. 重新构建和复制文件到 public 目录

## 📋 SEO 和 Meta 标签

使用 React Helmet 结合 i18n 实现多语言 SEO：

```tsx
import { Helmet } from 'react-helmet';
import { usePageI18n } from '../hooks/useI18n';

function MyPage() {
  const { t } = usePageI18n('home');
  
  return (
    <>
      <Helmet>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <meta name="keywords" content={t('keywords')} />
      </Helmet>
      {/* 页面内容 */}
    </>
  );
}
```

## 🔄 同步开发和生产环境

在开发过程中，语言文件的变更需要同步到 public 目录：

```bash
# 手动同步
cp -r src/locales/* public/locales/

# 或者可以创建 npm script
npm run sync-locales
```

## 📊 状态管理集成

项目集成了 Zustand 语言状态管理：

```tsx
import { useLanguageStore } from '../store/languageStore';

function MyComponent() {
  const { language, setLanguage } = useLanguageStore();
  
  return (
    <div>
      <p>当前语言: {language}</p>
      <button onClick={() => setLanguage('en-US')}>
        Switch to English
      </button>
    </div>
  );
}
```

## 🌟 最佳实践

1. **键名命名**: 使用有意义的嵌套键名，如 `navigation.home` 而不是 `nav_home`
2. **占位符**: 使用插值语法 `{{variable}}` 处理动态内容
3. **命名空间**: 按页面或功能模块组织翻译资源
4. **类型安全**: 结合 TypeScript 定义翻译键类型
5. **SEO友好**: 为每个页面提供多语言 meta 标签

## 🚦 调试和测试

- 在 i18n 配置中设置 `debug: true` 查看加载日志
- 使用浏览器开发工具检查网络请求中的语言文件加载
- 测试语言切换和本地存储持久化
- 验证服务端渲染时的语言设置

## 📚 相关资源

- [react-i18next 官方文档](https://react.i18next.com/)
- [i18next 官方文档](https://www.i18next.com/)
- [Vite 国际化指南](https://vitejs.dev/guide/features.html#glob-import)
