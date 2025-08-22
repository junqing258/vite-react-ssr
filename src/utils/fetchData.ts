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