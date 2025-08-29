import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useLocalizedRoute } from './LocalizedRoute';
import { SUPPORTED_LANGUAGES, SITE_CONFIG, getDefaultLanguage } from '../config/i18n';

interface HreflangTagsProps {
  baseUrl?: string;
}

const HreflangTags: React.FC<HreflangTagsProps> = ({ 
  baseUrl = SITE_CONFIG.baseUrl
}) => {
  const location = useLocation();
  const { language } = useLocalizedRoute();
  
  // 获取当前页面的路径（去掉语言前缀）
  const getCurrentPath = (): string => {
    const pathname = location.pathname;
    // 移除语言前缀
    const pathWithoutLang = pathname.replace(/^\/[a-z]{2}-[A-Z]{2}/, '') || '/';
    return pathWithoutLang;
  };

  const currentPath = getCurrentPath();
  const defaultLanguage = getDefaultLanguage();

  // 生成所有语言版本的 URL
  const generateLanguageUrls = () => {
    return SUPPORTED_LANGUAGES.map(lang => ({
      hreflang: lang.hreflang,
      href: `${baseUrl}/${lang.code}${currentPath === '/' ? '' : currentPath}`
    }));
  };

  const languageUrls = generateLanguageUrls();

  return (
    <Helmet>
      {/* 为每种支持的语言添加 hreflang 标签 */}
      {languageUrls.map(({ hreflang, href }) => (
        <link
          key={hreflang}
          rel="alternate"
          hrefLang={hreflang}
          href={href}
        />
      ))}
      
      {/* x-default 指向默认语言版本 */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}/${defaultLanguage.code}${currentPath === '/' ? '' : currentPath}`}
      />
      
      {/* canonical URL 指向当前语言版本 */}
      <link
        rel="canonical"
        href={`${baseUrl}/${language}${currentPath === '/' ? '' : currentPath}`}
      />
    </Helmet>
  );
};

export default HreflangTags;
