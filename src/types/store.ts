// Zustand store 相关类型定义

// 用户状态类型


// 主题状态类型
export interface ThemeState {
  theme: 'light' | 'dark' | 'auto';
  isDark: boolean;
}

// 计数器状态类型（示例）
export interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// 用户 store 操作类型


// 主题 store 操作类型
export interface ThemeActions {
  setTheme: (theme: ThemeState['theme']) => void;
  toggleTheme: () => void;
  hydrateTheme: () => void;
}

// 完整的 store 类型
// export interface UserStore extends UserState, UserActions {}
export interface ThemeStore extends ThemeState, ThemeActions {}
export interface CounterStore extends CounterState {}

// 持久化配置类型
export interface PersistConfig {
  name: string;
  version?: number;
  partialize?: (state: any) => any;
}
