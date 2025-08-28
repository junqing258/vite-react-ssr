import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入翻译资源
import zhCN from '../locales/zh-CN/common.json';
import enUS from '../locales/en-US/common.json';

const resources = {
  'zh-CN': {
    common: zhCN,
  },
  'en-US': {
    common: enUS,
  },
};

/**
 * 创建服务端 i18n 实例
 */
export function createServerI18n(language: string = 'zh-CN') {
  const serverI18n = i18n.createInstance();
  
  serverI18n
    .use(initReactI18next)
    .init({
      lng: language,
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
      
      // 服务端不需要语言检测和后端加载
      react: {
        useSuspense: false, // 服务端不支持 Suspense
      },
    });
  
  return serverI18n;
}

export default createServerI18n;
