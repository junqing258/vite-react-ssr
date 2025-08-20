import { createContext, useContext, ReactNode } from 'react';
import { DeviceInfo } from '../types/device';

interface DeviceContextType {
  deviceInfo: DeviceInfo;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

interface DeviceProviderProps {
  children: ReactNode;
  deviceInfo: DeviceInfo;
}

export function DeviceProvider({ children, deviceInfo }: DeviceProviderProps) {
  return (
    <DeviceContext.Provider value={{ deviceInfo }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice(): DeviceContextType {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
}
