import React from 'react';
import { Helmet } from 'react-helmet';
import { useI18n } from '../hooks/useI18n';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  alternateLanguages?: Array<{
    lang: string;
    url: string;
  }>;
  noindex?: boolean;
  canonical?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image = '/og-image.png',
  url,
  type = 'website',
  siteName = 'Vite React SSR',
  locale,
  alternateLanguages = [],
  noindex = false,
  canonical,
}) => {
  const { currentLanguage, isZhCN } = useI18n();
  
  const currentLocale = locale || currentLanguage;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const fullTitle = title ? `${title} - ${siteName}` : siteName;
  
  // 构建 hreflang URLs
  const hreflangs = alternateLanguages.length > 0 
    ? alternateLanguages 
    : [
        { lang: 'zh-CN', url: currentUrl.replace(/\/(en-US|zh-CN)?/, '/zh-CN') },
        { lang: 'en-US', url: currentUrl.replace(/\/(en-US|zh-CN)?/, '/en-US') },
      ];
  
  return (
    <Helmet>
      {/* 基础 Meta 标签 */}
      <html lang={currentLanguage} />
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* SEO Meta 标签 */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta 标签 */}
      <meta property="og:title" content={title || siteName} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={currentLocale} />
      {currentUrl && <meta property="og:url" content={currentUrl} />}
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter Card Meta 标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteName} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
      
      {/* 多语言 hreflang 标签 */}
      {hreflangs.map(({ lang, url: hrefUrl }) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={hrefUrl}
        />
      ))}
      
      {/* x-default hreflang */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={hreflangs.find(h => h.lang === 'zh-CN')?.url || currentUrl}
      />
      
      {/* 语言特定的 Open Graph locale */}
      {alternateLanguages.length === 0 && (
        <>
          <meta property="og:locale:alternate" content={isZhCN ? 'en_US' : 'zh_CN'} />
        </>
      )}
      
      {/* JSON-LD 结构化数据 */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": siteName,
          "url": currentUrl,
          "description": description,
          "inLanguage": currentLanguage,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${currentUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
