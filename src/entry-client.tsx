import "./index.css";
import "virtual:uno.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { detectDevice } from "./utils/deviceDetection";

const deviceInfo = detectDevice(window.navigator.userAgent);

const pageData = window.__INITIAL_DATA__ || {};
const initialLanguage = window.__INITIAL_LANGUAGE__ || "zh-CN";

// 设置客户端语言与服务端一致

// 从当前 URL 提取语言代码并计算 basename
function getBasename(): string {
  const pathname = window.location.pathname;
  const langMatch = pathname.match(/^\/([a-z]{2}-[A-Z]{2})/);

  if (langMatch) {
    return `/${langMatch[1]}`;
  }

  return "";
}

const basename = getBasename();

// 延迟水合，避免与初始渲染冲突
hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App
        pageData={pageData}
        deviceInfo={deviceInfo}
        initialLanguage={initialLanguage}
      />
    </BrowserRouter>
  </StrictMode>
);
