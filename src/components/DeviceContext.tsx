import { createContext, useContext } from "react";
import { DeviceInfo } from "../types/device";

interface DeviceContextType {
  deviceInfo: DeviceInfo;
}

export const DeviceContext = createContext<DeviceContextType | undefined>(
  undefined
);

export function useDevice(): DeviceContextType {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
}
