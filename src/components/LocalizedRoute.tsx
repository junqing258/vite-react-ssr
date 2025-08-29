import React, { createContext, useContext, ReactNode } from 'react';

interface LocalizedRouteContextType {
  language: string;
  getLocalizedPath: (path: string) => string;
  switchLanguage: (newLanguage: string) => void;
}

const LocalizedRouteContext = createContext<LocalizedRouteContextType | null>(null);

interface LocalizedRouteProviderProps {
  language: string;
  children: ReactNode;
}

export const LocalizedRouteProvider: React.FC<LocalizedRouteProviderProps> = ({ 
  language: initialLanguage, 
  children 
}) => {
  // 从 URL 中检测当前语言
  const getCurrentLanguage = (): string => {
    const pathname = window.location?.pathname || '';
    const langMatch = pathname.match(/^\/([a-z]{2}-[A-Z]{2})/);
    return langMatch ? langMatch[1] : initialLanguage;
  };

  const currentLanguage = typeof window !== 'undefined' ? getCurrentLanguage() : initialLanguage;

  const getLocalizedPath = (path: string): string => {
    // 确保路径以 / 开头
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    
    // 为所有语言都加前缀以保持一致性
    return `/${currentLanguage}${cleanPath === '/' ? '' : cleanPath}`;
  };

  const switchLanguage = async (newLanguage: string) => {
    try {
      // 通过服务端 API 设置语言
      const response = await fetch('/api/language', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language: newLanguage }),
      });

      if (response.ok) {
        // 获取当前路径（去掉语言前缀）
        const currentPath = window.location.pathname;
        const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}-[A-Z]{2}/, '') || '/';
        
        // 生成新的本地化路径
        const newPath = `/${newLanguage}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
        
        // 跳转到新的语言路径
        window.location.href = newPath + window.location.search + window.location.hash;
      } else {
        console.error('Failed to set language on server');
      }
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  const contextValue: LocalizedRouteContextType = {
    language: currentLanguage,
    getLocalizedPath,
    switchLanguage,
  };

  return (
    <LocalizedRouteContext.Provider value={contextValue}>
      {children}
    </LocalizedRouteContext.Provider>
  );
};

export const useLocalizedRoute = (): LocalizedRouteContextType => {
  const context = useContext(LocalizedRouteContext);
  if (!context) {
    throw new Error('useLocalizedRoute must be used within a LocalizedRouteProvider');
  }
  return context;
};

// 本地化链接组件
interface LocalizedLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export const LocalizedLink: React.FC<LocalizedLinkProps> = ({ 
  to, 
  children, 
  className, 
  ...props 
}) => {
  const { getLocalizedPath } = useLocalizedRoute();
  const localizedPath = getLocalizedPath(to);

  return (
    <a href={localizedPath} className={className} {...props}>
      {children}
    </a>
  );
};
