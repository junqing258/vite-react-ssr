import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedRoute } from './LocalizedRoute';
import { SUPPORTED_LANGUAGES } from '../config/i18n';

const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation('common');
  const { language, switchLanguage } = useLocalizedRoute();

  const handleChangeLanguage = async (lng: string) => {
    await switchLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">{t('common.language')}:</span>
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChangeLanguage(lang.code)}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            language === lang.code
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
