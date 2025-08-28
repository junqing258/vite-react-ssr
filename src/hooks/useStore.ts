import { useEffect, startTransition, useContext } from 'react';
import { useThemeStore } from '../store';
import { initThemeListener } from '../store/themeStore';
import { useHydration } from './useHydration';
import { useStore } from 'zustand';
import { UserContext } from '../contexts/CommonContexts';
import { UserProps } from '../store/userStore';


/* // 用于初始化和管理全局状态的 Hook
export const useGlobalStore = () => {
  const { isLoggedIn, name } = useUserStore();
  const { theme, isDark } = useThemeStore();

  return {
    user: {
      isLoggedIn,
      name,
    },
    theme: {
      theme,
      isDark,
    },
  };
}; */

export function useUserContext<T>(selector: (state: UserProps) => T): T {
  const store = useContext(UserContext)
  if (!store) throw new Error('Missing UserContext.Provider in the tree')
  return useStore(store, selector)
}



// 用于处理主题初始化的 Hook（SSR 友好）
export const useThemeInit = () => {
  const { hydrateTheme, theme, isDark } = useThemeStore();
  const isHydrated = useHydration();

  useEffect(() => {
    // 只在客户端且水合完成后执行初始化
    if (typeof window !== 'undefined' && isHydrated) {
      // 使用 startTransition 确保不会阻塞水合
      startTransition(() => {
        // 延迟初始化，给水合过程更多时间完成
        setTimeout(() => {
          hydrateTheme();
          initThemeListener();
        }, 50);
      });
    }
  }, [isHydrated, hydrateTheme]);

  return { theme, isDark };
};

