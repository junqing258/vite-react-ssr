
import { fetchData } from "../mock/fetchData"

type Params = {
  url: string;
  cookie: string;
};



export async function pageDataLoader({ url, cookie }: Params) {
  const pathname = url.split('?')[0];

  console.log('pageDataLoader pathname:', pathname);

  // 根据 URL 加载页面数据
  switch (pathname) {
    case '/':
      return { title: '首页', content: '欢迎来到首页' };
    case '/about':
      const user = await fetchData('/api/user'); // 示例异步数据获取
      return { title: '关于我们', content: '这是关于我们的页面', user };
    case '/contact':
      return { title: '联系我们', content: '这是联系我们的页面' };
    case '/zustand-demo':
      return { title: 'Zustand 示例', content: '这是 Zustand 示例页面' };
    default:
      return { title: '404', content: '页面未找到' };
  }
}