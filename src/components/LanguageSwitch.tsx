import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitch: React.FC = () => {
  const { i18n, t } = useTranslation('common');

  const languages = [
    { code: 'zh-CN', name: t('language.zh-CN') },
    { code: 'en-US', name: t('language.en-US') },
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="relative inline-block">
      <select
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="
          appearance-none bg-transparent border border-gray-300 dark:border-gray-600
          rounded px-3 py-1 pr-8 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          dark:text-white hover:border-gray-400 dark:hover:border-gray-500
          cursor-pointer
        "
        title={t('language.switch')}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="dark:bg-gray-800">
            {lang.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-3 h-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSwitch;
