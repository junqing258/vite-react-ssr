import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation('common');

  const changeLanguage = async (lng: string) => {
    try {
      // 先通过服务端 API 设置 cookie
      const response = await fetch('/api/language', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language: lng }),
      });

      if (response.ok) {
        // 服务端设置成功后，更新客户端
        // 设置 localStorage 作为备份
        localStorage.setItem('i18nextLng', lng);
        
        // 切换语言
        i18n.changeLanguage(lng);
      } else {
        console.error('Failed to set language on server');
        // 失败时回退到客户端设置
        fallbackLanguageChange(lng);
      }
    } catch (error) {
      console.error('Error setting language:', error);
      // 网络错误时回退到客户端设置
      fallbackLanguageChange(lng);
    }
  };

  const fallbackLanguageChange = (lng: string) => {
    // 客户端设置 cookie 作为回退方案
    const maxAge = 365 * 24 * 60 * 60; // 1年
    document.cookie = `i18next-lng=${encodeURIComponent(lng)}; Path=/; Max-Age=${maxAge}; SameSite=Strict`;
    
    // 设置 localStorage
    localStorage.setItem('i18nextLng', lng);
    
    // 切换语言
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">{t('common.language')}:</span>
      <button
        onClick={() => changeLanguage('zh-CN')}
        className={`px-3 py-1 text-sm rounded transition-colors ${
          i18n.language === 'zh-CN'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {t('common.chinese')}
      </button>
      <button
        onClick={() => changeLanguage('en-US')}
        className={`px-3 py-1 text-sm rounded transition-colors ${
          i18n.language === 'en-US'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {t('common.english')}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
