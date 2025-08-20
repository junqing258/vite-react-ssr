import { useEffect, useState } from 'react';
import { DEFAULT_BREAKPOINTS } from '../types/device';
import { useWindowSize } from './useWindowSize';
import { useDevice } from '../components/DeviceContext';

export interface UseResponsiveOptions {
  // 自定义断点
  breakpoints?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  // 是否使用设备检测的默认宽度
  useDeviceDefaults?: boolean;
  // 是否启用窗口尺寸监听（默认启用）
  enableWindowSizeTracking?: boolean;
}

export function useResponsive() {
  const { deviceInfo } = useDevice();
  const { defaultWidth } = deviceInfo;
  const windowSize = useWindowSize(defaultWidth);

  // 确保断点值存在
  const mobileBreakpoint = DEFAULT_BREAKPOINTS.mobile;
  const tabletBreakpoint = DEFAULT_BREAKPOINTS.tablet;


  // 基于当前窗口尺寸的直接计算（用于实时响应）
  const currentWidth = windowSize.width;

  const [isMobile, setIsMobile] = useState(defaultWidth <= mobileBreakpoint);
  const [isTablet, setIsTablet] = useState(defaultWidth > mobileBreakpoint && defaultWidth <= tabletBreakpoint);
  const [isDesktop, setIsDesktop] = useState(defaultWidth > tabletBreakpoint);

  useEffect(() => {
    setIsMobile(currentWidth <= mobileBreakpoint);
    setIsTablet(currentWidth > mobileBreakpoint && currentWidth <= tabletBreakpoint);
    setIsDesktop(currentWidth > tabletBreakpoint);
  }, [currentWidth]);


  const isMobileOrTablet = (isMobile || isTablet)
  const isTabletOrDesktop = (isTablet || isDesktop);

  // 确定当前断点
  const currentBreakpoint = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

  return {
    isMobile,
    isTablet,
    isDesktop,
    isMobileOrTablet,
    isTabletOrDesktop,
    windowSize,
    currentBreakpoint,
    currentWidth,
  };
}
