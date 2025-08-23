import { useEffect, startTransition } from 'react';
import { useUserStore, useThemeStore } from '../store';
import { initThemeListener } from '../store/themeStore';
import { useHydration } from './useHydration';

// 用于初始化和管理全局状态的 Hook
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
};

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

// 用于处理用户状态同步的 Hook
export const useUserSync = () => {
  const { isLoggedIn, name, email } = useUserStore();

  useEffect(() => {
    // 在这里可以添加用户状态同步逻辑
    // 比如验证 token、同步服务器状态等
    if (isLoggedIn) {
      console.log('用户已登录:', { name, email });
    }
  }, [isLoggedIn, name, email]);

  return { isLoggedIn, name, email };
};
