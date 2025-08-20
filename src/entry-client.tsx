import "./index.css";
import "virtual:uno.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DeviceProvider } from "./components/DeviceContext";
import { detectDevice } from "./utils/deviceDetection";

const deviceInfo = detectDevice(window.navigator.userAgent);

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <BrowserRouter>
      <DeviceProvider deviceInfo={deviceInfo}>
        <App />
      </DeviceProvider>
    </BrowserRouter>
  </StrictMode>
);
