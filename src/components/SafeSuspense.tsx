import { Suspense, ReactNode, startTransition, useEffect, useState } from 'react';

interface SafeSuspenseProps {
  fallback: ReactNode;
  children: ReactNode;
}

/**
 * 一个在水合过程中更安全的 Suspense 组件
 * 通过延迟渲染来避免水合冲突
 */
export const SafeSuspense = ({ fallback, children }: SafeSuspenseProps) => {
  const [isReadyToSuspend, setIsReadyToSuspend] = useState(false);

  useEffect(() => {
    // 在水合完成后才启用 Suspense
    const timer = setTimeout(() => {
      startTransition(() => {
        setIsReadyToSuspend(true);
      });
    }, 150); // 给水合过程更多时间

    return () => clearTimeout(timer);
  }, []);

  // 在水合期间，直接渲染 children 而不使用 Suspense
  if (!isReadyToSuspend) {
    return <>{children}</>;
  }

  return <Suspense fallback={fallback}>{children}</Suspense>;
};
