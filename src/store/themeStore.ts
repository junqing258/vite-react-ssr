import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ThemeStore } from '../types/store';

// 检测系统主题偏好
const getSystemTheme = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// 计算当前是否为深色主题
const calculateIsDark = (theme: 'light' | 'dark' | 'auto'): boolean => {
  switch (theme) {
    case 'dark':
      return true;
    case 'light':
      return false;
    case 'auto':
      return getSystemTheme();
    default:
      return false;
  }
};

// 避免水合冲突的安全DOM操作
const safeApplyTheme = (isDark: boolean) => {
  if (typeof window === 'undefined') return;

  // 使用双重 RAF 确保在渲染周期之外执行
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.toggle('dark', isDark);
    });
  });
};

// 主题 store
export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set, get) => {
        return ({
          theme: 'auto' as const,
          isDark: false, // 默认为 false，避免服务端和客户端不匹配

          setTheme: (theme) => {
            const isDark = calculateIsDark(theme);
            set({ theme, isDark }, false, 'setTheme');
            safeApplyTheme(isDark);
          },

          toggleTheme: () => {
            const { theme } = get();
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            get().setTheme(newTheme);
          },

          // 新增：安全的水合后初始化方法
          hydrateTheme: () => {
            const { theme } = get();
            const isDark = calculateIsDark(theme);
            set({ isDark }, false, 'hydrateTheme');
            safeApplyTheme(isDark);
          },
        })
      },
      {
        name: 'theme-storage',
        version: 1,
        partialize: (state) => {
          return ({ theme: state.theme })
        },
      }
    ),
    {
      name: 'theme-store',
    }
  )
);

// 延迟初始化系统主题监听器
let listenerInitialized = false;

export const initThemeListener = () => {
  if (typeof window === 'undefined' || listenerInitialized) return;

  listenerInitialized = true;

  // 延迟初始化，避免水合冲突
  setTimeout(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const store = useThemeStore.getState();
      if (store.theme === 'auto') {
        store.setTheme('auto');
      }
    });
  }, 200);
};
