import { Request } from "express";
import { fetchData } from "../mock/fetchData"


export async function pageDataLoader({ pathWithoutLang }: { pathWithoutLang: string, req: Request }) {
  const pathname = pathWithoutLang;

  console.log('pageDataLoader pathname:', pathname);
  const user = await fetchData('/api/user'); // 示例异步数据获取

  // 根据 URL 加载页面数据
  switch (pathname) {
    case '/':
      return { title: '首页', content: '欢迎来到首页', user };
    case '/about':
      return { title: '关于我们', content: '这是关于我们的页面', user };
    case '/contact':
      return { title: '联系我们', content: '这是联系我们的页面', user };
    case '/zustand-demo':
      return { title: 'Zustand 示例', content: '这是 Zustand 示例页面' };
    default:
      return { title: '404', content: '页面未找到' };
  }
}