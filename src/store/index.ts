// Store 统一导出文件
export { useCounterStore } from './counterStore';
export { useThemeStore } from './themeStore';

// Store 工具函数导出
export * from './utils';

// Store 类型导出
export type {
  ThemeState,
  CounterState,
  ThemeActions,
  ThemeStore,
  CounterStore,
  PersistConfig,
} from '../types/store';
