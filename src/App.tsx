import "./App.scss";
import routes from "virtual:generated-pages-react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import HreflangTags from "./components/HreflangTags";
import { useThemeInit } from "./hooks/useStore";
import { useRef } from "react";
import { createUserStore } from "./store/userStore";
import { get } from "lodash-es";
import { PageContext, UserContext } from "./components/CommonContexts";
import { I18nextProvider } from "react-i18next";
import { LocalizedRouteProvider } from "./components/LocalizedRoute";
import { DeviceContext } from "./components/DeviceContext";
import { setupI18n } from "./i18n";
import { DeviceInfo } from "./types/device";

const langRoutes = routes.map((route) => ({
  ...route,
  path: `/:lang${route.path}`,
}));

interface AppProps {
  pageData?: any;
  initialLanguage: string;
  deviceInfo: DeviceInfo;
}

function App({ pageData, deviceInfo, initialLanguage }: AppProps) {
  // 初始化主题
  useThemeInit();
  const userStore = useRef(createUserStore(get(pageData, "user"))).current;

  const i18nInstance = setupI18n(initialLanguage);

  return (
    <I18nextProvider i18n={i18nInstance}>
      <LocalizedRouteProvider language={initialLanguage}>
        <DeviceContext.Provider value={{ deviceInfo }}>
          <PageContext.Provider value={pageData}>
            <UserContext.Provider value={userStore}>
              <HreflangTags />
              <Navigation />
              <main>{useRoutes([...routes, ...langRoutes])}</main>
            </UserContext.Provider>
          </PageContext.Provider>
        </DeviceContext.Provider>
      </LocalizedRouteProvider>
    </I18nextProvider>
  );
}

export default App;
