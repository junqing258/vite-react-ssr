import { useState, useEffect } from 'react';

export interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(defaultWidth: number): WindowSize {
  // 初始化状态，在服务端返回默认值
  const [windowSize, setWindowSize] = useState<WindowSize>(() => {
    if (typeof window === 'undefined') {
      // 服务端默认尺寸
      return { width: defaultWidth || 1200, height: 800 };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    // 仅在客户端执行
    if (typeof window === 'undefined') {
      return;
    }

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // 立即获取当前尺寸（处理水合时的差异）
    handleResize();

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);

    // 清理事件监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}
