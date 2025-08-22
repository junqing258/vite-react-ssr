import "./index.css";
import "virtual:uno.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DeviceProvider } from "./components/DeviceContext";
import { detectDevice } from "./utils/deviceDetection";
import { createInitialPageData } from "./utils/ssr/clientDataHydration";

const deviceInfo = detectDevice(window.navigator.userAgent);
const initialPageData = createInitialPageData();

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <BrowserRouter>
      <DeviceProvider deviceInfo={deviceInfo}>
        <App pageData={initialPageData} />
      </DeviceProvider>
    </BrowserRouter>
  </StrictMode>
);
