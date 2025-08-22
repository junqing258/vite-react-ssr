import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { PageComponent, getInitialPropsContext, getInitialPropsResult } from "../types/ssr";
import { usePageData } from "../App";

interface ClientOnlyProps {
  clientData?: {
    timestamp: string;
    source: 'server' | 'client';
    randomValue: number;
  };
}

// 这个页面有getInitialProps，但服务端会故意跳过，用于测试客户端回退逻辑
const ClientOnly: PageComponent<ClientOnlyProps> = () => {
  const pageData = usePageData() as { props: ClientOnlyProps; clientGenerated?: boolean };
  const { clientData } = pageData?.props || {};
  const [clientTime, setClientTime] = React.useState<string>('');

  React.useEffect(() => {
    setClientTime(new Date().toLocaleString());
  }, []);

  return (
    <>
      <Helmet>
        <title>客户端渲染 - Vite React SSR</title>
        <meta
          name="description"
          content="这是一个纯客户端渲染的页面，没有服务端数据预加载"
        />
        <link rel="canonical" href="/client-only" />
      </Helmet>
      <div className="container mx-auto px-4 md:px-0">
        <h1 className="text-3xl font-bold mb-6">客户端渲染页面</h1>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">⚠️ 注意</h2>
          <p className="text-gray-700">
            这个页面实现了 getInitialProps 方法，但服务端故意跳过预加载，
            用于演示客户端回退逻辑。
          </p>
        </div>

        {clientData && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">✅ 数据加载成功</h2>
            <div className="text-sm text-gray-700">
              <p><strong>数据来源:</strong> {clientData.source}</p>
              <p><strong>生成时间:</strong> {clientData.timestamp}</p>
              <p><strong>随机值:</strong> {clientData.randomValue}</p>
              <p><strong>是否客户端生成:</strong> {pageData?.clientGenerated ? '是' : '否'}</p>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">页面信息</h3>
            <ul className="space-y-2">
              <li><strong>渲染方式:</strong> {clientData ? '客户端数据回退' : '纯客户端渲染'}</li>
              <li><strong>数据状态:</strong> {clientData ? '已加载' : '未加载'}</li>
              <li><strong>页面加载时间:</strong> {clientTime}</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">特点</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ 快速的首次加载（无需等待数据）</li>
              <li>✅ 适合不需要SEO的内部页面</li>
              <li>❌ 不利于SEO优化</li>
              <li>❌ 首次渲染可能有布局跳动</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">对比其他页面</h3>
          <p className="text-gray-600 mb-4">
            访问其他页面来对比服务端预加载和客户端渲染的区别：
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              首页（有SSR数据）
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              关于页面（有SSR数据）
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              联系页面（有SSR数据）
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
            ← 返回首页
          </Link>
        </div>
      </div>
    </>
  );
};

// 添加getInitialProps方法
ClientOnly.getInitialProps = async (_context: getInitialPropsContext): Promise<getInitialPropsResult<ClientOnlyProps>> => {
  // 模拟数据获取延迟
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    props: {
      clientData: {
        timestamp: new Date().toISOString(),
        source: 'client',
        randomValue: Math.floor(Math.random() * 1000),
      },
    },
  };
};

export default ClientOnly;
