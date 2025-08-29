import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useI18nInit = (language?: string) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  return i18n;
};
