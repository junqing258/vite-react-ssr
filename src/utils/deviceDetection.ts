import MobileDetect from 'mobile-detect';
import { DeviceInfo, DEFAULT_BREAKPOINTS } from '../types/device';

export function detectDevice(userAgent: string): DeviceInfo {
  const md = new MobileDetect(userAgent);

  const isMobile = md.mobile() !== null;
  const isTablet = md.tablet() !== null;
  const isDesktop = !isMobile && !isTablet;

  let deviceType: 'mobile' | 'tablet' | 'desktop';
  let defaultWidth: number;

  if (isTablet) {
    deviceType = 'tablet';
    defaultWidth = DEFAULT_BREAKPOINTS.tablet;
  } else if (isMobile) {
    deviceType = 'mobile';
    defaultWidth = DEFAULT_BREAKPOINTS.mobile;
  } else {
    deviceType = 'desktop';
    defaultWidth = DEFAULT_BREAKPOINTS.desktop;
  }

  return {
    isMobile,
    isTablet,
    isDesktop,
    userAgent,
    deviceType,
    defaultWidth,
  };
}

