/**
 * 服务端语言检测和重定向中间件
 */
import { Request, Response, NextFunction } from 'express';
import { 
  getLanguageFromPath, 
  removeLanguageFromPath, 
  addLanguageToPath, 
  DEFAULT_LANGUAGE, 
  SUPPORTED_LANGUAGES
} from '../utils/i18nRouting.js';

/**
 * 从请求头中检测用户首选语言
 */
function detectLanguageFromRequest(req: Request): string {
  const acceptLanguage = req.headers['accept-language'];
  
  if (!acceptLanguage) {
    return DEFAULT_LANGUAGE;
  }
  
  // 解析 Accept-Language 头
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, quality = '1'] = lang.trim().split(';q=');
      return {
        code: code.toLowerCase(),
        quality: parseFloat(quality)
      };
    })
    .sort((a, b) => b.quality - a.quality);
  
  // 查找支持的语言
  for (const lang of languages) {
    const langCode = lang.code;
    
    // 精确匹配
    if (SUPPORTED_LANGUAGES.includes(langCode as any)) {
      return langCode;
    }
    
    // 语言前缀匹配 (如 zh 匹配 zh-CN)
    const supportedLang = SUPPORTED_LANGUAGES.find(supported => 
      supported.toLowerCase().startsWith(langCode.split('-')[0])
    );
    
    if (supportedLang) {
      return supportedLang;
    }
  }
  
  return DEFAULT_LANGUAGE;
}

/**
 * 语言路由中间件
 */
export function languageMiddleware(req: Request, res: Response, next: NextFunction) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  
  // 跳过静态资源和 API 路由
  if (
    pathname.startsWith('/locales/') ||
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') // 文件扩展名
  ) {
    return next();
  }
  
  const urlLanguage = getLanguageFromPath(pathname);
  const cleanPath = removeLanguageFromPath(pathname);
  
  // 如果 URL 中已有有效的语言前缀
  if (SUPPORTED_LANGUAGES.includes(urlLanguage as any) && pathname.startsWith(`/${urlLanguage}`)) {
    // 存储当前语言到请求对象
    req.language = urlLanguage;
    req.cleanPath = cleanPath;
    return next();
  }
  
  // 检测用户首选语言
  const detectedLanguage = detectLanguageFromRequest(req);
  
  // 如果是默认语言且 URL 没有语言前缀，直接继续
  if (detectedLanguage === DEFAULT_LANGUAGE && !pathname.startsWith(`/${DEFAULT_LANGUAGE}`)) {
    req.language = DEFAULT_LANGUAGE;
    req.cleanPath = pathname;
    return next();
  }
  
  // 重定向到带语言前缀的 URL
  const redirectUrl = addLanguageToPath(cleanPath, detectedLanguage as any);
  const fullRedirectUrl = redirectUrl + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
  
  res.redirect(302, fullRedirectUrl);
}

/**
 * 扩展 Request 接口以包含语言信息
 */
declare global {
  namespace Express {
    interface Request {
      language?: string;
      cleanPath?: string;
    }
  }
}
