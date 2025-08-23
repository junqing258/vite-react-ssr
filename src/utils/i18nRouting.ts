/**
 * 多语言 URL 路由工具
 */

export const SUPPORTED_LANGUAGES = ['zh-CN', 'en-US'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'zh-CN';

/**
 * 从 URL 路径中提取语言代码
 */
export function getLanguageFromPath(pathname: string): SupportedLanguage {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (SUPPORTED_LANGUAGES.includes(firstSegment as SupportedLanguage)) {
    return firstSegment as SupportedLanguage;
  }
  
  return DEFAULT_LANGUAGE;
}

/**
 * 从 URL 路径中移除语言前缀
 */
export function removeLanguageFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (SUPPORTED_LANGUAGES.includes(firstSegment as SupportedLanguage)) {
    return '/' + segments.slice(1).join('/');
  }
  
  return pathname;
}

/**
 * 为路径添加语言前缀
 */
export function addLanguageToPath(pathname: string, language: SupportedLanguage): string {
  const cleanPath = removeLanguageFromPath(pathname);
  
  if (language === DEFAULT_LANGUAGE) {
    return cleanPath || '/';
  }
  
  return `/${language}${cleanPath === '/' ? '' : cleanPath}`;
}

/**
 * 获取当前页面的所有语言版本 URL
 */
export function getAlternateUrls(pathname: string, baseUrl: string = ''): Array<{
  lang: SupportedLanguage;
  url: string;
}> {
  const cleanPath = removeLanguageFromPath(pathname);
  
  return SUPPORTED_LANGUAGES.map(lang => ({
    lang,
    url: `${baseUrl}${addLanguageToPath(cleanPath, lang)}`,
  }));
}

/**
 * 检查是否为默认语言
 */
export function isDefaultLanguage(language: string): boolean {
  return language === DEFAULT_LANGUAGE;
}

/**
 * 获取语言显示名称
 */
export function getLanguageDisplayName(language: SupportedLanguage): string {
  const names = {
    'zh-CN': '中文',
    'en-US': 'English',
  };
  
  return names[language] || language;
}

/**
 * 生成 sitemap URL 条目
 */
export function generateSitemapUrls(
  paths: string[], 
  baseUrl: string,
  lastmod?: string
): Array<{
  url: string;
  alternates: Array<{
    lang: SupportedLanguage;
    url: string;
  }>;
  lastmod?: string;
}> {
  return paths.map(path => {
    const cleanPath = removeLanguageFromPath(path);
    const alternates = getAlternateUrls(cleanPath, baseUrl);
    
    return {
      url: `${baseUrl}${addLanguageToPath(cleanPath, DEFAULT_LANGUAGE)}`,
      alternates,
      lastmod,
    };
  });
}
