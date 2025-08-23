import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  PageComponent,
  getInitialPropsContext,
  getInitialPropsResult,
} from "../types/ssr";
import { fetchData } from "../utils/fetchData";
import { usePageData } from "../App";

interface HomeProps {
  config?: {
    siteName: string;
    description: string;
    version: string;
    features: string[];
  };
  user?: {
    id: number;
    name: string;
    email: string;
    avatar: string;
  };
}

const Home: PageComponent<HomeProps> = () => {
  const pageData = usePageData() as { props: HomeProps };
  const { config, user } = pageData?.props || {};
  return (
    <div className="container mx-auto px-4 md:px-0">
      <Helmet>
        <title>首页 - Vite React SSR</title>
        <meta
          name="description"
          content="欢迎来到我们的首页，这是一个使用 Vite + React + React Router + UnoCSS 的应用"
        />
        <meta name="keywords" content="Vite, React, SSR, UnoCSS, TypeScript" />
        <meta property="og:title" content="首页 - Vite React SSR" />
        <meta
          property="og:description"
          content="欢迎来到我们的首页，这是一个使用 Vite + React + React Router + UnoCSS 的应用"
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/" />
      </Helmet>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          欢迎来到{config?.siteName || "首页"}
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          {config?.description ||
            "这是一个使用 Vite + React + React Router + UnoCSS 的应用"}
        </p>
        {config?.version && (
          <p className="text-sm text-gray-500 mb-8">版本: {config.version}</p>
        )}

        {user && (
          <div className="mb-8 p-4 bg-blue-50 rounded-lg max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2">欢迎回来!</h3>
            <div className="flex items-center justify-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="text-left">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {config?.features && (
          <div className="mb-8 p-4 bg-green-50 rounded-lg max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2">支持的特性:</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {config.features.map((feature: string) => (
                <span
                  key={feature}
                  className="px-2 py-1 bg-green-200 text-green-800 rounded text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="mt-8 space-x-4">
          <Link
            to="/about"
            className="mx-4 text-blue-600 hover:text-blue-800 underline"
          >
            关于我们
          </Link>
          <Link
            to="/contact"
            className="mx-4 text-blue-600 hover:text-blue-800 underline"
          >
            联系我们
          </Link>
        </div>

        <div className="mt-12 p-8 border border-gray-300 rounded-lg bg-gray-50 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            计数器示例
          </h2>
          <CounterExample />
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg max-w-lg mx-auto">
          <h3 className="text-xl font-bold mb-2">🎉 UnoCSS 已启用!</h3>
          <p className="text-sm opacity-90">
            您现在可以使用原子化CSS类名进行快速开发
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CounterExample: React.FC = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="space-y-4">
      <button onClick={() => setCount((count) => count + 1)} className="btn">
        count is {count}
      </button>
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => setCount(count - 1)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          -1
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          +1
        </button>
      </div>
    </div>
  );
};

// 添加getInitialProps静态方法
Home.getInitialProps = async (
  _context: getInitialPropsContext
): Promise<getInitialPropsResult<HomeProps>> => {
  try {
    // 并发获取数据
    const [config, user] = await Promise.all([
      fetchData("/api/config"),
      fetchData("/api/user"),
    ]);

    return {
      props: {
        config,
        user,
      },
      // 可选：设置重新验证时间（秒）
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in Home.getInitialProps:", error);

    // 发生错误时返回默认props
    return {
      props: {
        config: {
          siteName: "Vite React SSR",
          description: "一个使用 Vite + React + SSR 构建的现代化应用",
          version: "1.0.0",
          features: ["SSR", "HMR", "TypeScript", "UnoCSS"],
        },
      },
    };
  }
};

export default Home;
