import React from "react";
import { Link } from "react-router-dom";
import { useCounterStore } from "../store";
import { useUserContext } from "../hooks/useStore";
import { usePageI18n } from "../hooks/useI18n";
import SEOHead from "../components/SEOHead";
import { getAlternateUrls } from "../utils/i18nRouting";

const Home: React.FC = () => {
  const { t, tCommon, currentLanguage } = usePageI18n('home');
  
  // 生成多语言 URL
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const alternateUrls = getAlternateUrls(currentPath, typeof window !== 'undefined' ? window.location.origin : '');
  
  return (
    <div className="container mx-auto px-4 md:px-0">
      <SEOHead
        title={t('title')}
        description={t('description')}
        keywords={t('keywords')}
        locale={currentLanguage}
        alternateLanguages={alternateUrls}
        canonical={typeof window !== 'undefined' ? window.location.href : undefined}
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">{t('heading')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {t('subtitle')}
        </p>
        <div className="mt-8 space-x-4">
          <Link
            to="/about"
            className="mx-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            {tCommon('navigation.about')}
          </Link>
          <Link
            to="/contact"
            className="mx-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            {tCommon('navigation.contact')}
          </Link>
          <Link
            to="/zustand-demo"
            className="mx-4 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 underline font-medium"
          >
            Zustand 示例
          </Link>
        </div>

        <div className="mt-12 p-8 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            {t('counter.title')}
          </h2>
          <CounterExample />
        </div>

        <div className="mt-8 p-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
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
  const { t } = usePageI18n('home');

  return (
    <div className="space-y-4">
      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{count}</div>
      <div className="flex justify-center space-x-2">
        <button
          onClick={decrement}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          {t('counter.decrement')}
        </button>
        <button
          onClick={reset}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          {t('counter.reset')}
        </button>
        <button
          onClick={increment}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          {t('counter.increment')}
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">这个计数器使用 Zustand 状态管理</p>
    </div>
  );
};

const UserStatusExample: React.FC = () => {
  const { id: userId, name, login, logout } = useUserContext((s) => s);
  const { tCommon } = usePageI18n('home');

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
          <p className="text-green-600 dark:text-green-400 font-medium">✓ 已登录</p>
          <p className="text-gray-600 dark:text-gray-400">{tCommon('user.welcome', { name })}</p>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            {tCommon('user.logout')}
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 dark:text-gray-400">未登录状态</p>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {tCommon('user.login')}
          </button>
        </div>
      )}
      <p className="text-sm text-gray-600 dark:text-gray-400">用户状态会自动持久化到本地存储</p>
    </div>
  );
};

export default Home;
