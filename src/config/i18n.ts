/**
 * 多语言和 hreflang 配置
 */

export interface LanguageConfig {
  code: string;           // 内部使用的语言代码
  hreflang: string;       // hreflang 标签中使用的语言代码
  label: string;          // 显示名称
  isDefault?: boolean;    // 是否为默认语言
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    code: 'zh-CN',
    hreflang: 'zh-CN',
    label: '中文',
    isDefault: true
  },
  {
    code: 'en-US',
    hreflang: 'en-US',
    label: 'English'
  }
];

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.find(lang => lang.isDefault) || SUPPORTED_LANGUAGES[0];

/**
 * 站点配置
 */
export const SITE_CONFIG = {
  // 在生产环境中应该设置为你的实际域名
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.com' 
    : 'http://localhost:5173',
  
  // 站点名称
  siteName: 'Vite React SSR',
  
  // 默认描述
  defaultDescription: 'A modern React SSR application with internationalization support'
};

/**
 * 获取语言配置通过代码
 */
export function getLanguageByCode(code: string): LanguageConfig | undefined {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
}

/**
 * 获取默认语言
 */
export function getDefaultLanguage(): LanguageConfig {
  return DEFAULT_LANGUAGE;
}

/**
 * 检查是否为支持的语言
 */
export function isSupportedLanguage(code: string): boolean {
  return SUPPORTED_LANGUAGES.some(lang => lang.code === code);
}
