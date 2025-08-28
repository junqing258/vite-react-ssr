import { Request } from 'express';
import { SUPPORTED_LANGUAGES, getDefaultLanguage } from '../config/i18n';

const supportedLanguageCodes = SUPPORTED_LANGUAGES.map(lang => lang.code);
const defaultLanguageCode = getDefaultLanguage().code;

/**
 * 从请求中解析 cookie
 */
export function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  if (!cookieHeader) return {};
  
  const cookies: Record<string, string> = {};
  cookieHeader.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });
  
  return cookies;
}

/**
 * 从 Accept-Language 头部解析语言偏好
 */
export function parseAcceptLanguage(acceptLanguage: string | undefined): string[] {
  if (!acceptLanguage) return [];
  
  return acceptLanguage
    .split(',')
    .map(lang => {
      const [language, quality] = lang.trim().split(';q=');
      return {
        language: language.trim(),
        quality: quality ? parseFloat(quality) : 1.0
      };
    })
    .sort((a, b) => b.quality - a.quality)
    .map(item => item.language);
}

/**
 * 从 URL 路径中提取语言代码
 */
export function extractLanguageFromPath(pathname: string): { language: string | null; pathWithoutLang: string } {
  // 匹配 /zh-CN/ 或 /en-US/ 开头的路径
  const match = pathname.match(/^\/([a-z]{2}-[A-Z]{2})(\/.*)?$/);
  
  if (match) {
    const [, langCode, remainingPath] = match;
    if (supportedLanguageCodes.includes(langCode)) {
      return {
        language: langCode,
        pathWithoutLang: remainingPath || '/'
      };
    }
  }
  
  return {
    language: null,
    pathWithoutLang: pathname
  };
}

/**
 * 服务端语言检测
 * 优先级：URL路径 > cookie > Accept-Language > 默认语言
 */
export function detectServerLanguage(req: Request): { language: string; pathWithoutLang: string } {
  // 1. 检查 URL 路径中的语言代码
  const { language: pathLanguage, pathWithoutLang } = extractLanguageFromPath(req.path);

  if (pathLanguage) {
    return { language: pathLanguage, pathWithoutLang };
  }

  // 2. 检查 cookie 中的语言设置
  const cookies = parseCookies(req.headers.cookie);
  const cookieLang = cookies['i18next-lng'];

  if (cookieLang && supportedLanguageCodes.includes(cookieLang)) {
    return { language: cookieLang, pathWithoutLang };
  }

  // 3. 检查 Accept-Language 头部
  const acceptLanguages = parseAcceptLanguage(req.headers['accept-language']);

  for (const lang of acceptLanguages) {
    // 精确匹配
    if (supportedLanguageCodes.includes(lang)) {
      return { language: lang, pathWithoutLang };
    }

    // 语言前缀匹配 (如 en 匹配 en-US)
    const matchedLang = supportedLanguageCodes.find(supported => 
      supported.startsWith(lang.split('-')[0])
    );

    if (matchedLang) {
      return { language: matchedLang, pathWithoutLang };
    }
  }

  // 4. 返回默认语言
  return { language: defaultLanguageCode, pathWithoutLang };
}

/**
 * 设置语言 cookie 的响应头
 */
export function setLanguageCookie(language: string): string {
  const maxAge = 365 * 24 * 60 * 60; // 1年
  return `i18next-lng=${encodeURIComponent(language)}; Path=/; Max-Age=${maxAge}; SameSite=Strict`;
}

/**
 * 生成带语言前缀的 URL
 */
export function getLocalizedPath(language: string, path: string): string {
  // 确保路径以 / 开头
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // 如果是默认语言，可以选择不加前缀（根据需求决定）
  // 这里我们为所有语言都加前缀以保持一致性
  return `/${language}${cleanPath === '/' ? '' : cleanPath}`;
}

/**
 * 检查是否需要重定向到带语言前缀的 URL
 */
export function shouldRedirectToLocalizedUrl(req: Request): { shouldRedirect: boolean; redirectUrl?: string } {
  const { language: pathLanguage } = extractLanguageFromPath(req.path);
  
  // 如果 URL 已经包含语言前缀，不需要重定向
  if (pathLanguage) {
    return { shouldRedirect: false };
  }
  
  // 检测用户语言
  const { language } = detectServerLanguage(req);
  
  // 生成带语言前缀的 URL
  const redirectUrl = getLocalizedPath(language, req.path);
  
  return {
    shouldRedirect: true,
    redirectUrl: redirectUrl + (req.url?.includes('?') ? req.url.substring(req.url.indexOf('?')) : '')
  };
}
