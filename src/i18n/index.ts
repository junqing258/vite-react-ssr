import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// 导入翻译资源
import zhCN from '../locales/zh-CN/common.json';
import enUS from '../locales/en-US/common.json';

// 判断是否为服务器端
const isServer = typeof window === 'undefined';

const resources = {
  'zh-CN': {
    common: zhCN,
  },
  'en-US': {
    common: enUS,
  },
};

// 配置 i18n
if (!isServer) {
  i18n
    .use(LanguageDetector)
    .use(Backend);
}

i18n
  // 传递 i18n 实例给 react-i18next
  .use(initReactI18next)
  // 初始化 i18next
  .init({
    resources,
    fallbackLng: 'zh-CN',
    debug: false,
    
    // 命名空间配置
    ns: ['common'],
    defaultNS: 'common',

    // 插值配置
    interpolation: {
      escapeValue: false, // React 已经处理了 XSS
    },

    // 语言检测选项（仅客户端）
    ...(isServer ? {} : {
      detection: {
        order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
        lookupCookie: 'i18next-lng',
        lookupLocalStorage: 'i18nextLng',
        caches: ['cookie', 'localStorage'],
        cookieOptions: {
          path: '/',
          sameSite: 'strict',
          secure: false, // 开发环境设为 false，生产环境应设为 true
          maxAge: 365 * 24 * 60 * 60, // 1年
        },
      },
    }),

    // 后端配置（仅客户端）
    ...(isServer ? {} : {
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
    }),
  });

export default i18n;
