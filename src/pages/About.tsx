import React from "react";
import { Link } from "react-router-dom";
import UserStatus from "../components/UserStatus";
import { usePageI18n } from "../hooks/useI18n";
import SEOHead from "../components/SEOHead";
import { getAlternateUrls } from "../utils/i18nRouting";

const About: React.FC = () => {
  const { t, tCommon, currentLanguage } = usePageI18n('about');

  // 生成多语言 URL
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/about';
  const alternateUrls = getAlternateUrls(currentPath, typeof window !== 'undefined' ? window.location.origin : '');

  return (
    <>
      <SEOHead
        title={t('title')}
        description={t('description')}
        locale={currentLanguage}
        alternateLanguages={alternateUrls}
        canonical={typeof window !== 'undefined' ? window.location.href : undefined}
      />
      <div className="container mx-auto px-4 md:px-0">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">{t('heading')}</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {t('content.intro')}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('content.mission')}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('content.technology')}
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">技术栈</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-8">
            <li>
              <strong>Vite</strong> - 快速的构建工具和开发服务器
            </li>
            <li>
              <strong>React 18</strong> - 用户界面构建库
            </li>
            <li>
              <strong>React Router</strong> - 客户端路由解决方案
            </li>
            <li>
              <strong>TypeScript</strong> - 类型安全的 JavaScript
            </li>
            <li>
              <strong>Express</strong> - 服务器端渲染支持
            </li>
            <li>
              <strong>i18next</strong> - 国际化支持
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">特性</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-8">
            <li>服务器端渲染 (SSR)</li>
            <li>客户端水合 (Client Hydration)</li>
            <li>动态路由加载</li>
            <li>热模块替换 (HMR)</li>
            <li>TypeScript 支持</li>
            <li>国际化 (i18n) 支持</li>
            <li>深色模式支持</li>
            <li>响应式设计</li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <UserStatus />
        </div>

        <div className="mt-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            ← {tCommon('common.back')}
          </Link>
        </div>
      </div>
    </>
  );
};

export default About;
