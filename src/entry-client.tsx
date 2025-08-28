import "./index.css";
import "virtual:uno.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DeviceProvider } from "./components/DeviceContext";
import { detectDevice } from "./utils/deviceDetection";
import i18n from "./i18n";

const deviceInfo = detectDevice(window.navigator.userAgent);

const pageData = window.__INITIAL_DATA__ || {};
const initialLanguage = window.__INITIAL_LANGUAGE__ || 'zh-CN';

// 设置客户端语言与服务端一致
if (i18n.language !== initialLanguage) {
  i18n.changeLanguage(initialLanguage);
}

// 延迟水合，避免与初始渲染冲突
hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <BrowserRouter>
      <DeviceProvider deviceInfo={deviceInfo}>
        <App pageData={pageData} />
      </DeviceProvider>
    </BrowserRouter>
  </StrictMode>
);
