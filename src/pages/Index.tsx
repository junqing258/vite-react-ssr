import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
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

export default Home;
