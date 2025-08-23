// 客户端数据水合工具
import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageDataForCSR } from './pageDataLoader';

// 全局窗口接口扩展
declare global {
  interface Window {
    __PAGE_DATA__?: any;
    __CLIENT_DATA_CACHE__?: Map<string, any>;
  }
}

// 初始化客户端数据缓存
if (typeof window !== 'undefined' && !window.__CLIENT_DATA_CACHE__) {
  window.__CLIENT_DATA_CACHE__ = new Map();
}

// 获取服务器端预加载的数据
export function getServerData() {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const data = window.__PAGE_DATA__;
    // 不立即清理全局变量，保留一次备用
    return data;
  } catch (error) {
    console.error('Error getting server data:', error);
    return null;
  }
}

// 清理服务器端数据
export function clearServerData() {
  if (typeof window !== 'undefined') {
    try {
      delete window.__PAGE_DATA__;
    } catch (error) {
      console.error('Error clearing server data:', error);
    }
  }
}

// 检查是否有预加载数据
export function hasServerData() {
  return typeof window !== 'undefined' && window.__PAGE_DATA__;
}

// 从缓存获取客户端数据
export function getCachedClientData(route: string) {
  if (typeof window === 'undefined' || !window.__CLIENT_DATA_CACHE__) {
    return null;
  }
  return window.__CLIENT_DATA_CACHE__.get(route) || null;
}

// 缓存客户端数据
export function setCachedClientData(route: string, data: any) {
  if (typeof window !== 'undefined' && window.__CLIENT_DATA_CACHE__) {
    window.__CLIENT_DATA_CACHE__.set(route, data);
  }
}

// 客户端获取页面数据的Hook
export function useClientPageData() {
  const location = useLocation();
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPageData = useCallback(async (pathname: string, force = false) => {
    // 检查缓存
    const cached = getCachedClientData(pathname);
    if (cached && !force) {
      setPageData(cached);
      return cached;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getPageDataForCSR(pathname);
      if (result) {
        const clientData = {
          props: result.props,
          revalidate: result.revalidate,
          route: pathname,
          clientGenerated: true
        };
        
        setPageData(clientData);
        setCachedClientData(pathname, clientData);
        return clientData;
      } else {
        setPageData(null);
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error fetching client page data:', err);
      setError(errorMessage);
      setPageData(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // 当路由变化时，尝试获取数据
    const pathname = location.pathname;
    
    // 首先检查是否有缓存的客户端数据
    const cached = getCachedClientData(pathname);
    if (cached) {
      setPageData(cached);
      return;
    }

    // 如果没有缓存，尝试获取数据
    fetchPageData(pathname);
  }, [location.pathname, fetchPageData]);

  return {
    pageData,
    loading,
    error,
    refetch: (force = false) => fetchPageData(location.pathname, force),
  };
}

// 创建页面数据提供者的初始状态
export function createInitialPageData() {
  const serverData = getServerData();

  if (serverData) {
    // 如果有服务器端数据，清理全局变量并返回
    clearServerData();
    return serverData;
  }


  
  // 如果没有服务器端数据，返回null，让客户端Hook处理
  return null;
}

// 智能数据获取Hook，优先使用服务端数据，回退到客户端获取
export function usePageDataWithFallback() {
  const [initialData] = useState(() => createInitialPageData());
  const clientDataResult = useClientPageData();

  // 如果有初始数据（来自服务端），优先使用
  if (initialData) {
    return {
      pageData: initialData,
      loading: false,
      error: null,
      isClientGenerated: false,
      refetch: clientDataResult.refetch,
    };
  }

  // 否则使用客户端获取的数据
  return {
    pageData: clientDataResult.pageData,
    loading: clientDataResult.loading,
    error: clientDataResult.error,
    isClientGenerated: true,
    refetch: clientDataResult.refetch,
  };
}
