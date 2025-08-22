import { getInitialPropsContext, getInitialPropsResult, PageComponent } from '../../types/ssr';

// 解析URL参数
export function parseQuery(url: string): Record<string, string> {
  const urlObj = new URL(url, 'http://localhost');
  const query: Record<string, string> = {};
  
  urlObj.searchParams.forEach((value, key) => {
    query[key] = value;
  });
  
  return query;
}

// 解析路由参数（简单实现，可根据需要扩展）
export function parseParams(_pathname: string, _route: string): Record<string, string> {
  const params: Record<string, string> = {};
  
  // 这里可以实现更复杂的路由参数解析逻辑
  // 目前返回空对象，可根据实际路由需求扩展
  
  return params;
}

// 执行页面组件的getInitialProps方法
export async function executegetInitialProps(
  component: PageComponent,
  context: getInitialPropsContext
): Promise<getInitialPropsResult | null> {
  if (typeof component.getInitialProps === 'function') {
    try {
      const result = await component.getInitialProps(context);
      return result;
    } catch (error) {
      console.error('Error executing getInitialProps:', error);
      return null;
    }
  }
  return null;
}

// 创建SSR上下文
export function createSSRContext(url: string, userAgent: string, headers: Record<string, string>): getInitialPropsContext {
  const urlObj = new URL(url, 'http://localhost');
  
  return {
    params: parseParams(urlObj.pathname, urlObj.pathname),
    query: parseQuery(url),
    req: {
      url,
      userAgent,
      headers
    }
  };
}


