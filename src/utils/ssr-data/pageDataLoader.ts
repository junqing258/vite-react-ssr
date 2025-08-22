import { createSSRContext, executegetInitialProps } from './ssrHelpers';
import { PageComponent } from '../../types/ssr';

// 页面路由到组件的映射
const pageRoutes: Record<string, () => Promise<{ default: PageComponent }>> = {
  '/': () => import('../../pages/Index'),
  '/about': () => import('../../pages/About'),
  '/contact': () => import('../../pages/Contact'),
  '/unocss': () => import('../../pages/UnoCSS'),
  '/client-only': () => import('../../pages/ClientOnly'),
};

// 根据URL路径匹配页面组件
function matchRoute(pathname: string): string | null {
  // 精确匹配
  if (pageRoutes[pathname]) {
    return pathname;
  }
  
  // 这里可以添加更复杂的路由匹配逻辑
  // 比如动态路由、通配符等
  
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
    
    // 动态导入页面组件
    const pageModule = await pageRoutes[routeKey]();
    const PageComponent = pageModule.default;
    
    // 检查是否有getInitialProps方法
    if (!PageComponent.getInitialProps) {
      console.log(`No getInitialProps found for ${routeKey}`);
      return null;
    }

    // 特殊处理：对于/client-only路由，故意跳过服务端预加载，测试客户端回退
    if (routeKey === '/client-only') {
      console.log('Skipping SSR for /client-only route to test client fallback');
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
