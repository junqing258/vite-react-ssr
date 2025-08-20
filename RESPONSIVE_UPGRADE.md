# useResponsive 屏幕尺寸响应升级

## 📊 升级内容

已成功为 `useResponsive` Hook 添加屏幕尺寸改变响应功能，现在支持实时监听窗口尺寸变化并动态更新布局。

### 🆕 新增功能

1. **窗口尺寸监听**
   - 新增 `useWindowSize` Hook，实时追踪窗口尺寸变化
   - 支持服务端渲染，避免水合不匹配
   - 自动清理事件监听器，防止内存泄漏

2. **增强的 useResponsive Hook**
   - 集成窗口尺寸监听功能
   - 提供两种响应式方案：媒体查询 + 窗口尺寸
   - 支持自定义配置和开关控制

3. **实时响应演示**
   - 新增 `WindowResizeDemo` 组件展示实时尺寸变化
   - 响应式网格布局随窗口变化
   - 尺寸变化历史记录

## 🔧 API 升级

### useResponsive Hook 新增返回值

```typescript
const {
  // 原有功能
  isMobile, isTablet, isDesktop,
  currentBreakpoint, deviceInfo,
  
  // 新增功能
  windowSize,        // 当前窗口尺寸 { width, height }
  currentWidth,      // 用于比较的当前宽度
  queries,           // 媒体查询结果
  byWidth            // 基于窗口宽度的计算结果
} = useResponsive();
```

### 新增配置选项

```typescript
useResponsive({
  enableWindowSizeTracking: true,  // 启用窗口尺寸追踪（默认 true）
  useDeviceDefaults: true,         // 使用设备默认值（默认 true）
  breakpoints: {                   // 自定义断点
    mobile: 375,
    tablet: 768,
    desktop: 1200
  }
});
```

## 📱 使用示例

### 基础用法

```typescript
import { useResponsive } from './hooks/useResponsive';

function MyComponent() {
  const { isMobile, windowSize, currentBreakpoint } = useResponsive();
  
  return (
    <div>
      <p>当前断点: {currentBreakpoint}</p>
      <p>窗口尺寸: {windowSize.width} × {windowSize.height}</p>
      {isMobile && <p>移动设备布局</p>}
    </div>
  );
}
```

### 响应式网格

```typescript
function ResponsiveGrid() {
  const { isMobile, isTablet } = useResponsive();
  
  const columns = isMobile ? 1 : isTablet ? 2 : 3;
  
  return (
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: \`repeat(\${columns}, 1fr)\`
    }}>
      {/* 网格内容 */}
    </div>
  );
}
```

### 高级配置

```typescript
function CustomResponsive() {
  const responsive = useResponsive({
    breakpoints: { mobile: 480, tablet: 1024, desktop: 1440 },
    enableWindowSizeTracking: true,
    useDeviceDefaults: false
  });
  
  return (
    <div>
      <p>自定义断点: {responsive.currentBreakpoint}</p>
      <p>窗口追踪: {responsive.windowSize.width}px</p>
    </div>
  );
}
```

## 🎯 核心特性

### 1. 实时响应
- 窗口尺寸变化时立即更新布局
- 支持平滑过渡和动画效果
- 无需手动刷新页面

### 2. 双重检测
- 媒体查询：基于 CSS 媒体查询的响应式检测
- 窗口尺寸：基于 JavaScript 的实时尺寸检测
- 可选择使用其中一种或两种结合

### 3. SSR 兼容
- 服务端默认值避免水合不匹配
- 客户端激活后自动更新为真实值
- 确保首屏渲染正确

### 4. 性能优化
- 使用 debounce 避免过度重新渲染
- 智能缓存避免重复计算
- 事件监听器自动清理

## 📄 文件结构

```
src/
├── hooks/
│   ├── useResponsive.ts      # 增强的响应式 Hook
│   └── useWindowSize.ts      # 新增窗口尺寸监听 Hook
├── components/
│   ├── DeviceContext.tsx     # 设备上下文（已移动）
│   ├── ResponsiveDemo.tsx    # 响应式演示组件
│   ├── WindowResizeDemo.tsx  # 窗口尺寸响应演示
│   └── ResponsiveExample.tsx # 使用示例组件
└── pages/
    └── Responsive.tsx        # 响应式演示页面
```

## 🚀 演示页面

- 首页：`/` - 基础响应式演示
- 响应式页面：`/responsive` - 完整功能演示
- 包含实时窗口尺寸显示、响应式状态对比、使用示例等

## 🔍 测试方法

1. 打开浏览器开发者工具
2. 切换设备模拟器（移动/平板/桌面）
3. 手动调整窗口大小
4. 观察布局实时变化和状态更新

布局会根据窗口尺寸实时调整，断点切换平滑流畅，完全符合现代响应式设计需求。
