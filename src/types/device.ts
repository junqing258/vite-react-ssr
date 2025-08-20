export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  userAgent: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  defaultWidth: number;
}

export interface ResponsiveConfig {
  mobile: number;
  tablet: number;
  desktop: number;
}

export const DEFAULT_BREAKPOINTS: ResponsiveConfig = {
  mobile: 375,
  tablet: 768,
  desktop: 1200,
};
