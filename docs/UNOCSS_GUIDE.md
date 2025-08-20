# UnoCSS 使用指南

本项目已成功集成 UnoCSS，这是一个高性能且极具灵活性的即时原子化 CSS 引擎。

## 🚀 已完成的配置

### 1. 安装的包
- `unocss` - 核心包
- `@unocss/preset-uno` - 默认预设（类似 Tailwind CSS）
- `@unocss/preset-icons` - 图标支持
- `@unocss/preset-web-fonts` - Web 字体支持
- `@unocss/preset-typography` - 排版支持

### 2. 配置文件
- `uno.config.ts` - UnoCSS 主配置文件
- `vite.config.ts` - 已添加 UnoCSS 插件
- 已在 `entry-client.tsx` 和 `entry-server.tsx` 中导入 `virtual:uno.css`

### 3. 预设功能
- **默认预设**: 提供类似 Tailwind CSS 的工具类
- **图标预设**: 支持多种图标库（需要额外配置）
- **Web 字体**: 已配置 DM Sans, DM Serif Display, DM Mono 字体
- **排版预设**: 提供优美的排版样式

## 📝 使用示例

### 基础工具类
```tsx
// 布局
<div className="flex items-center justify-center">
<div className="grid grid-cols-3 gap-4">
<div className="w-full h-screen">

// 颜色
<div className="bg-blue-500 text-white">
<div className="border border-gray-300">

// 间距
<div className="p-4 m-2">
<div className="px-6 py-3">

// 圆角和阴影
<div className="rounded-lg shadow-md">
<div className="rounded-xl shadow-xl">
```

### 响应式设计
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
<div className="text-sm md:text-base lg:text-lg">
<div className="hidden md:block">
```

### 自定义快捷方式
配置文件中已定义了一些快捷方式：

```tsx
// 使用预定义的按钮样式
<button className="btn">Primary Button</button>

// 使用预定义的图标按钮样式
<button className="icon-btn">Icon Button</button>
```

### 悬停和状态
```tsx
<button className="bg-blue-500 hover:bg-blue-600 transition-colors">
<div className="opacity-75 hover:opacity-100">
<input className="focus:ring-2 focus:ring-blue-500">
```

### 动画
```tsx
<div className="animate-pulse">
<div className="animate-bounce">
<div className="animate-spin">
<div className="transition-transform hover:scale-110">
```

## 🎨 色彩系统

UnoCSS 提供了完整的色彩系统：

- `bg-{color}-{intensity}` - 背景色
- `text-{color}-{intensity}` - 文字色
- `border-{color}-{intensity}` - 边框色

颜色包括：red, blue, green, yellow, purple, pink, indigo, gray 等
强度从 50-950 (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950)

## 📱 响应式断点

- `sm:` - >= 640px
- `md:` - >= 768px  
- `lg:` - >= 1024px
- `xl:` - >= 1280px
- `2xl:` - >= 1536px

## 🔧 扩展配置

如需添加自定义样式，可以在 `uno.config.ts` 中配置：

```typescript
export default defineConfig({
  // 添加自定义规则
  rules: [
    ['custom-rule', { color: 'red' }]
  ],
  
  // 添加快捷方式
  shortcuts: [
    ['btn-large', 'px-8 py-4 text-lg font-bold rounded-lg']
  ],
  
  // 添加主题
  theme: {
    colors: {
      'brand': '#your-color'
    }
  }
})
```

## 📚 更多资源

- [UnoCSS 官方文档](https://unocss.dev/)
- [交互式文档](https://unocss.dev/interactive/)
- [预设列表](https://unocss.dev/presets/)
- [规则查找](https://unocss.dev/interactive/)

## 🧪 测试页面

访问 `/unocss` 路由查看 UnoCSS 的各种功能演示。

## 💡 最佳实践

1. **按需使用**: UnoCSS 会自动检测使用的类名并生成对应的 CSS
2. **组合优于重复**: 使用 shortcuts 定义常用的类名组合
3. **响应式优先**: 优先考虑移动端设计，然后使用响应式前缀适配大屏
4. **语义化命名**: 在组件中使用有意义的类名组合
5. **性能优化**: UnoCSS 的按需生成特性确保了最小的 CSS 文件大小
