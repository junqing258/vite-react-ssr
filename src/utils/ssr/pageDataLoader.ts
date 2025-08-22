import { createSSRContext, executegetInitialProps } from './ssrHelpers';
import { PageComponent } from '../../types/ssr';
// @ts-ignore
import routes from "virtual:generated-pages-react";
import React from 'react';

// 页面路由到组件的映射
/* const pageRoutes: Record<string, () => Promise<{ default: PageComponent }>> = {
  '/': () => import('../../pages/Index'),
  '/about': () => import('../../pages/About'),
  '/contact': () => import('../../pages/Contact'),
  '/unocss': () => import('../../pages/UnoCSS'),
}; */

type RouteItem = {
  path: string;
  importName: string;
  element: React.ReactElement<any>;
};

const pageRoutes: Record<string, () => Promise<{ default: PageComponent }>> = (routes as RouteItem[]).reduce((acc, route) => {
  acc[normalizeName(route.path)] = (route.element.type as any)._payload?._result;
  return acc;
}, {} as Record<string, () => Promise<{ default: PageComponent }>>);


console.log('pageRoutes ====================\n', pageRoutes, '\n====================')


// 根据URL路径匹配页面组件
function matchRoute(pathname: string): string | null {
  pathname = normalizeName(pathname)
  // 精确匹配
  if (pageRoutes[pathname]) {
    return pathname;
  }

  return null;
}

// 服务器端数据预加载
export async function getPageDataForSSR(options: {
  url: string;
  userAgent: string;
  headers?: Record<string, string>;
}) {
  try {
    const urlObj = new URL(options.url, 'http://localhost');
    const pathname = urlObj.pathname;

    // 匹配路由
    const routeKey = matchRoute(pathname);
    if (!routeKey) {
      console.log(`No route found for ${pathname}`);
      return null;
    }
    console.log('routeKey ====================\n', pageRoutes[routeKey].toString(), '\n====================')

    // 动态导入页面组件
    const pageModule = await pageRoutes[routeKey]?.();
    const PageComponent = pageModule?.default;

    // 检查是否有getInitialProps方法
    if (!PageComponent?.getInitialProps) {
      console.log(`No getInitialProps found for ${routeKey}`);
      return null;
    }

    // 创建SSR上下文
    const context = createSSRContext(
      options.url,
      options.userAgent,
      options.headers || {}
    );

    // 执行getInitialProps
    const result = await executegetInitialProps(PageComponent, context);

    if (result) {
      // 检查重定向
      if (result.redirect) {
        return {
          redirect: result.redirect
        };
      }

      // 检查404
      if (result.notFound) {
        return {
          notFound: true
        };
      }

      // 返回数据
      return {
        props: result.props,
        revalidate: result.revalidate,
        route: routeKey
      };
    }

    return null;
  } catch (error) {
    console.error('Error in getPageDataForSSR:', error);
    return null;
  }
}

// 客户端数据获取（用于CSR）
export async function getPageDataForCSR(pathname: string) {
  try {
    const routeKey = matchRoute(pathname);
    if (!routeKey) {
      return null;
    }

    const pageModule = await pageRoutes[routeKey]();
    const PageComponent = pageModule.default;

    if (!PageComponent.getInitialProps) {
      return null;
    }

    // 创建简化的上下文（客户端）
    const context = createSSRContext(
      window.location.href,
      navigator.userAgent,
      {}
    );

    const result = await executegetInitialProps(PageComponent, context);
    return result;
  } catch (error) {
    console.error('Error in getPageDataForCSR:', error);
    return null;
  }
}



export function normalizeName(name: string) {
  if (!name.startsWith('/')) {
    name = '/' + name
  }
  return name.toLocaleLowerCase()
}
