import { useTranslation } from 'react-i18next';

/**
 * 自定义 i18n Hook，提供便捷的翻译功能
 */
export const useI18n = (namespace?: string) => {
  const { t, i18n } = useTranslation(namespace);

  return {
    t,
    i18n,
    currentLanguage: i18n.language,
    isZhCN: i18n.language === 'zh-CN',
    isEnUS: i18n.language === 'en-US',
    changeLanguage: (lng: string) => i18n.changeLanguage(lng),
  };
};

/**
 * 页面专用的 i18n Hook
 */
export const usePageI18n = (page: string) => {
  const common = useTranslation('common');
  const pageTranslation = useTranslation(page);

  return {
    t: pageTranslation.t,
    tCommon: common.t,
    i18n: pageTranslation.i18n,
    currentLanguage: pageTranslation.i18n.language,
    changeLanguage: (lng: string) => pageTranslation.i18n.changeLanguage(lng),
  };
};
