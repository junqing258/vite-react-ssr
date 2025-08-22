# getInitialProps 使用指南

本项目已实现类似 Next.js 的 `getInitialProps` 功能，支持在服务器端渲染时预加载数据，并且具备客户端智能回退机制。

## 基本概念

`getInitialProps` 是一个静态方法，可以附加到页面组件上，用于在服务器端渲染时预先获取数据。这样可以提升首屏加载性能，改善 SEO，并提供更好的用户体验。

## 🆕 客户端智能回退

本项目的一个重要特性是**客户端智能回退机制**：

- **服务端优先**：如果服务端成功预加载了数据，客户端将直接使用这些数据
- **客户端回退**：如果服务端数据为空（网络问题、服务器错误、或故意跳过），客户端会自动调用页面的 `getInitialProps` 方法获取数据
- **缓存机制**：客户端获取的数据会被缓存，避免重复请求
- **优雅处理**：提供加载状态和错误处理，确保用户体验

这种机制保证了应用的健壮性，即使在服务端出现问题时，用户仍然能够看到完整的页面内容。

## 类型定义

```typescript
import { PageComponent, getInitialPropsContext, getInitialPropsResult } from "../types/ssr";

interface MyPageProps {
  data?: any;
}

const MyPage: PageComponent<MyPageProps> = () => {
  const pageData = usePageData();
  const { data } = pageData?.props || {};
  
  return <div>{/* 使用预加载的数据 */}</div>;
};

MyPage.getInitialProps = async (context: getInitialPropsContext): Promise<getInitialPropsResult<MyPageProps>> => {
  // 在这里获取数据
  return {
    props: {
      data: await fetchSomeData(),
    },
    revalidate: 60, // 可选：重新验证时间（秒）
  };
};
```

## 基本用法

### 1. 定义页面组件和Props类型

```typescript
import { PageComponent, getInitialPropsContext, getInitialPropsResult } from "../types/ssr";
import { usePageData } from "../App";

interface HomeProps {
  posts?: Post[];
  user?: User;
}

const Home: PageComponent<HomeProps> = () => {
  const pageData = usePageData();
  const { posts, user } = pageData?.props || {};
  
  return (
    <div>
      <h1>欢迎 {user?.name}</h1>
      {posts?.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
};
```

### 2. 添加 getInitialProps 方法

```typescript
Home.getInitialProps = async (context: getInitialPropsContext): Promise<getInitialPropsResult<HomeProps>> => {
  try {
    // 并发获取多个数据源
    const [posts, user] = await Promise.all([
      fetchData('/api/posts'),
      fetchData('/api/user')
    ]);

    return {
      props: {
        posts,
        user,
      },
      revalidate: 300, // 5分钟后重新验证
    };
  } catch (error) {
    console.error('Error in getInitialProps:', error);
    
    // 错误处理：返回默认数据或空数据
    return {
      props: {
        posts: [],
      },
    };
  }
};
```

## 上下文对象

`getInitialPropsContext` 包含以下信息：

```typescript
interface getInitialPropsContext {
  params?: Record<string, string>;    // 路由参数
  query?: Record<string, string>;     // 查询参数
  req?: {
    url: string;                      // 请求URL
    userAgent: string;               // 用户代理
    headers: Record<string, string>; // 请求头
  };
}
```

### 使用上下文信息

```typescript
MyPage.getInitialProps = async (context: getInitialPropsContext) => {
  const { req, query } = context;
  
  // 根据用户代理提供不同数据
  const isMobile = req?.userAgent.includes('Mobile');
  
  // 根据查询参数获取数据
  const category = query?.category || 'default';
  
  const data = await fetchData(`/api/content?category=${category}&mobile=${isMobile}`);
  
  return {
    props: { data },
  };
};
```

## 返回值选项

### 1. 基本数据返回

```typescript
return {
  props: {
    data: await fetchData(),
  },
};
```

### 2. 重新验证

```typescript
return {
  props: { data },
  revalidate: 3600, // 1小时后重新验证
};
```

### 3. 重定向

```typescript
return {
  redirect: {
    destination: '/login',
    permanent: false, // 临时重定向 (302)
  },
};
```

### 4. 404 页面

```typescript
return {
  notFound: true,
};
```

## 数据获取工具

项目提供了 `fetchData` 工具函数来模拟 API 调用：

```typescript
import { fetchData } from "../utils/ssrHelpers";

// 支持的端点
const config = await fetchData('/api/config');
const user = await fetchData('/api/user');
const posts = await fetchData('/api/posts');
```

## 客户端访问数据

### 基本用法
在页面组件中，使用 `usePageData` Hook 来访问预加载的数据：

```typescript
import { usePageData } from "../App";

const MyPage = () => {
  const pageData = usePageData();
  const { props } = pageData || {};
  
  // 安全地访问数据
  const data = props?.data;
  
  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
};
```

### 🆕 智能回退Hook
如果需要更精细的控制，可以直接使用智能回退Hook：

```typescript
import { usePageDataWithFallback } from "../utils/ssr-data/clientDataHydration";

const MyPage = () => {
  const { pageData, loading, error, isClientGenerated, refetch } = usePageDataWithFallback();
  
  if (loading && !pageData) {
    return <div>正在加载数据...</div>;
  }
  
  if (error && !pageData) {
    return (
      <div>
        <p>加载失败: {error}</p>
        <button onClick={() => refetch(true)}>重试</button>
      </div>
    );
  }
  
  return (
    <div>
      <p>数据来源: {isClientGenerated ? '客户端' : '服务端'}</p>
      <pre>{JSON.stringify(pageData, null, 2)}</pre>
    </div>
  );
};
```

### 🆕 客户端数据获取Hook
对于需要手动控制数据获取的场景：

```typescript
import { useClientPageData } from "../utils/ssr-data/clientDataHydration";

const MyPage = () => {
  const { pageData, loading, error, refetch } = useClientPageData();
  
  return (
    <div>
      <button onClick={() => refetch(true)}>刷新数据</button>
      {loading && <p>加载中...</p>}
      {error && <p>错误: {error}</p>}
      {pageData && <pre>{JSON.stringify(pageData, null, 2)}</pre>}
    </div>
  );
};
```

## 最佳实践

### 1. 错误处理

总是包含 try-catch 块来处理数据获取失败：

```typescript
MyPage.getInitialProps = async (context) => {
  try {
    const data = await fetchData('/api/data');
    return { props: { data } };
  } catch (error) {
    console.error('Error:', error);
    return {
      props: {
        data: null,
        error: 'Failed to load data',
      },
    };
  }
};
```

### 2. 并发数据获取

当需要多个数据源时，使用 `Promise.all` 进行并发请求：

```typescript
const [user, posts, config] = await Promise.all([
  fetchData('/api/user'),
  fetchData('/api/posts'),
  fetchData('/api/config'),
]);
```

### 3. 条件数据获取

根据上下文条件决定是否获取某些数据：

```typescript
MyPage.getInitialProps = async (context) => {
  const baseData = await fetchData('/api/base');
  
  let extraData = null;
  if (context.query?.includeExtra === 'true') {
    extraData = await fetchData('/api/extra');
  }
  
  return {
    props: {
      baseData,
      extraData,
    },
  };
};
```

### 4. 数据转换

在返回之前处理和转换数据：

```typescript
MyPage.getInitialProps = async (context) => {
  const rawData = await fetchData('/api/raw');
  
  // 转换数据格式
  const processedData = rawData.map(item => ({
    id: item.id,
    title: item.name.toUpperCase(),
    summary: item.description.substring(0, 100),
  }));
  
  return {
    props: {
      data: processedData,
    },
  };
};
```

## 现有示例

项目中已经为以下页面实现了 `getInitialProps`：

1. **首页 (`/`)**: 获取配置信息和用户数据（服务端预加载）
2. **关于页面 (`/about`)**: 获取文章列表（服务端预加载）
3. **联系页面 (`/contact`)**: 获取联系信息（服务端预加载）
4. **🆕 客户端页面 (`/client-only`)**: 客户端回退示例（故意跳过服务端预加载）

可以参考这些页面的实现来学习如何使用 `getInitialProps`。特别是 `/client-only` 页面，展示了当服务端数据为空时，客户端如何自动调用 `getInitialProps` 获取数据。

## 调试

启动开发服务器后，可以通过以下方式调试：

1. 查看服务器端控制台输出
2. 检查浏览器中的 `window.__PAGE_DATA__` 对象
3. 使用浏览器开发工具查看网络请求

```javascript
// 在浏览器控制台中检查预加载数据
console.log(window.__PAGE_DATA__);
```

## 注意事项

1. **执行环境**：`getInitialProps` 可以在服务器端和客户端执行（回退时）
2. **纯函数**：该方法应该是纯函数，不应有副作用
3. **数据序列化**：返回的数据会被序列化为 JSON，因此不能包含函数或循环引用
4. **性能影响**：数据会注入到 HTML 中，注意数据大小对页面加载性能的影响
5. **开发环境**：在开发环境中，每次请求都会执行 `getInitialProps`
6. **🆕 客户端缓存**：客户端获取的数据会被缓存，避免重复请求
7. **🆕 错误恢复**：当服务端预加载失败时，客户端会自动尝试获取数据
8. **🆕 状态管理**：使用提供的 Hook 可以获取加载状态、错误信息和数据来源

## 🆕 客户端回退机制工作原理

1. **服务端渲染阶段**：
   - 服务器尝试执行页面的 `getInitialProps`
   - 如果成功，数据被注入到 HTML 的 `window.__PAGE_DATA__` 中
   - 如果失败或被跳过，HTML 中不会包含预加载数据

2. **客户端水合阶段**：
   - 客户端首先检查 `window.__PAGE_DATA__` 是否存在
   - 如果存在，直接使用服务端数据
   - 如果不存在，自动调用页面的 `getInitialProps` 获取数据

3. **路由切换**：
   - 客户端路由切换时，检查目标页面的缓存
   - 如果有缓存，直接使用
   - 如果没有缓存，调用 `getInitialProps` 获取数据

这种机制确保了应用的高可用性和良好的用户体验。
