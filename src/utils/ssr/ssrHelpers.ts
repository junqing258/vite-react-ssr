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

// 模拟异步数据获取（示例）
export async function fetchData(endpoint: string): Promise<any> {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // 根据endpoint返回不同的模拟数据
  switch (endpoint) {
    case '/api/user':
      return {
        id: 1,
        name: '张三',
        email: 'zhangsan@example.com',
        avatar: 'https://avatars.githubusercontent.com/u/1?v=4'
      };
    
    case '/api/posts':
      return [
        {
          id: 1,
          title: 'React 18的新特性',
          content: 'React 18 引入了许多令人兴奋的新特性...',
          author: '张三',
          publishDate: '2024-01-15',
          tags: ['React', 'JavaScript', 'Frontend']
        },
        {
          id: 2,
          title: 'Vite与传统构建工具的对比',
          content: 'Vite是一个现代化的前端构建工具...',
          author: '李四',
          publishDate: '2024-01-10',
          tags: ['Vite', 'Build Tools', 'Performance']
        },
        {
          id: 3,
          title: 'TypeScript最佳实践',
          content: 'TypeScript为JavaScript开发带来了类型安全...',
          author: '王五',
          publishDate: '2024-01-05',
          tags: ['TypeScript', 'JavaScript', 'Best Practices']
        }
      ];
    
    case '/api/config':
      return {
        siteName: 'Vite React SSR',
        description: '一个使用 Vite + React + SSR 构建的现代化应用',
        version: '1.0.0',
        features: ['SSR', 'HMR', 'TypeScript', 'UnoCSS']
      };
    
    default:
      throw new Error(`Unknown endpoint: ${endpoint}`);
  }
}
