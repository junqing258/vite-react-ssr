import { Request } from 'express';

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
 * 服务端语言检测
 * 优先级：cookie > Accept-Language > 默认语言
 */
export function detectServerLanguage(req: Request): string {
  const supportedLanguages = ['zh-CN', 'en-US'];
  const defaultLanguage = 'zh-CN';
  
  // 1. 检查 cookie 中的语言设置
  const cookies = parseCookies(req.headers.cookie);
  const cookieLang = cookies['i18next-lng'];
  
  if (cookieLang && supportedLanguages.includes(cookieLang)) {
    return cookieLang;
  }
  
  // 2. 检查 Accept-Language 头部
  const acceptLanguages = parseAcceptLanguage(req.headers['accept-language']);
  
  for (const lang of acceptLanguages) {
    // 精确匹配
    if (supportedLanguages.includes(lang)) {
      return lang;
    }
    
    // 语言前缀匹配 (如 en 匹配 en-US)
    const matchedLang = supportedLanguages.find(supported => 
      supported.startsWith(lang.split('-')[0])
    );
    
    if (matchedLang) {
      return matchedLang;
    }
  }
  
  // 3. 返回默认语言
  return defaultLanguage;
}

/**
 * 设置语言 cookie 的响应头
 */
export function setLanguageCookie(language: string): string {
  const maxAge = 365 * 24 * 60 * 60; // 1年
  return `i18next-lng=${encodeURIComponent(language)}; Path=/; Max-Age=${maxAge}; SameSite=Strict`;
}
