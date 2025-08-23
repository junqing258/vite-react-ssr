import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useCounterStore } from "../store";
import { useUserContext } from "../hooks/useStore";

const Home: React.FC = () => {
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
        <h1 className="text-4xl font-bold mb-4 text-gray-800">欢迎来到首页</h1>
        <p className="text-lg text-gray-600 mb-8">
          这是一个使用 Vite + React + React Router + UnoCSS 的应用
        </p>
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
          <Link
            to="/zustand-demo"
            className="mx-4 text-purple-600 hover:text-purple-800 underline font-medium"
          >
            Zustand 示例
          </Link>
        </div>

        <div className="mt-12 p-8 border border-gray-300 rounded-lg bg-gray-50 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Zustand 计数器示例
          </h2>
          <CounterExample />
        </div>

        <div className="mt-8 p-8 border border-gray-200 rounded-lg bg-white max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            用户状态示例
          </h2>
          <UserStatusExample />
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
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="space-y-4">
      <div className="text-3xl font-bold text-blue-600">{count}</div>
      <div className="flex justify-center space-x-2">
        <button
          onClick={decrement}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          -1
        </button>
        <button
          onClick={reset}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={increment}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          +1
        </button>
      </div>
      <p className="text-sm text-gray-600">这个计数器使用 Zustand 状态管理</p>
    </div>
  );
};

const UserStatusExample: React.FC = () => {
  const { id: userId, name, email, login, logout } = useUserContext((s) => s);

  const handleLogin = () => {
    login({
      id: "1",
      name: "演示用户",
      email: "demo@example.com",
      isLoggedIn: true,
    });
  };

  return (
    <div className="space-y-4">
      {userId ? (
        <div>
          <p className="text-green-600 font-medium">✓ 已登录</p>
          <p className="text-gray-600">欢迎，{name}!</p>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            退出登录
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-600">未登录状态</p>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            登录
          </button>
        </div>
      )}
      <p className="text-sm text-gray-600">用户状态会自动持久化到本地存储</p>
    </div>
  );
};

export default Home;
