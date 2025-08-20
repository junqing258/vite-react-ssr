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

  const [isSm, setIsSm] = useState(defaultWidth <= mobileBreakpoint);
  const [isMd, setIsMd] = useState(defaultWidth > mobileBreakpoint && defaultWidth <= tabletBreakpoint);
  const [isLg, setIsLg] = useState(defaultWidth > tabletBreakpoint);

  useEffect(() => {
    setIsSm(currentWidth <= mobileBreakpoint);
    setIsMd(currentWidth > mobileBreakpoint && currentWidth <= tabletBreakpoint);
    setIsLg(currentWidth > tabletBreakpoint);
  }, [currentWidth]);


  const isSmOrMd = (isSm || isMd)
  const isMdOrLg = (isMd || isLg);


  return {
    isSm,
    isMd,
    isLg,
    isSmOrMd,
    isMdOrLg,
    windowSize,
    currentWidth,
  };
}
