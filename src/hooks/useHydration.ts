import { useEffect, useState, useRef } from 'react';

/**
 * 用于检测客户端水合状态的 Hook
 * 在 SSR 应用中用于避免水合不匹配问题
 */
export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // 清除之前的定时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 延迟更长时间确保水合完全完成
    timeoutRef.current = setTimeout(() => {
      setIsHydrated(true);
    }, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return isHydrated;
};

/**
 * 用于在水合完成后安全执行客户端操作的 Hook
 * @param callback 需要在水合完成后执行的回调函数
 * @param deps 依赖数组
 */
export const useClientEffect = (callback: () => void, deps: React.DependencyList = []) => {
  const isHydrated = useHydration();

  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      const timer = setTimeout(callback, 0);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated, ...deps]);
};
