import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const isServer = typeof window === 'undefined';

const i18nInstance = i18n.use(Backend);

// 只在浏览器环境下使用语言检测
if (!isServer) {
  i18nInstance.use(LanguageDetector);
}

i18nInstance.use(initReactI18next)
  .init({
    lng: 'zh-CN', // 默认语言
    fallbackLng: 'zh-CN',
    debug: process.env.NODE_ENV === 'development',
    
    // 命名空间配置
    defaultNS: 'common',
    ns: ['common', 'home', 'about', 'contact'],
    
    interpolation: {
      escapeValue: false, // React 已经防止 XSS
    },
    
    // 浏览器语言检测配置
    detection: {
      order: ['path', 'localStorage', 'navigator', 'htmlTag'],
      lookupFromPathIndex: 0,
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    // HTTP后端配置
    backend: {
      loadPath: (lng: string, ns: string) => {
        // 将 zh-CN 映射到 zh 目录，en-US 映射到 en 目录
        const mappedLng = lng === 'zh-CN' ? 'zh' : lng === 'en-US' ? 'en' : lng;
        return `/locales/${mappedLng}/${ns}.json`;
      },
    },

    // 服务端渲染配置
    react: {
      useSuspense: !isServer,
    },
  });

export default i18n;
