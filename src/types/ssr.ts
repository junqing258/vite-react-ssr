// SSR相关类型定义

// 上下文对象，包含请求信息
export interface getInitialPropsContext {
  params?: Record<string, string>;
  query?: Record<string, string>;
  req?: {
    url: string;
    userAgent: string;
    headers: Record<string, string>;
  };
}

// getInitialProps的返回类型
export interface getInitialPropsResult<T = any> {
  props: T;
  // 可选的重新验证时间（秒）
  revalidate?: number;
  // 可选的重定向
  redirect?: {
    destination: string;
    permanent?: boolean;
  };
  // 可选的404状态
  notFound?: boolean;
}

// 页面组件的类型，包含getInitialProps静态方法
export interface PageComponent<P = any> extends React.FC<P> {
  getInitialProps?: (context: getInitialPropsContext) => Promise<getInitialPropsResult<P>> | getInitialPropsResult<P>;
}

// 预加载的数据存储接口
export interface PreloadedData {
  [pagePath: string]: any;
}
