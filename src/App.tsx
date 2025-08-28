import "./App.scss";
import "./i18n"; // 初始化 i18n
import routes from "virtual:generated-pages-react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import HreflangTags from "./components/HreflangTags";
import { useThemeInit } from "./hooks/useStore";
import { useRef } from "react";
import { createUserStore } from "./store/userStore";
import { get } from "lodash-es";
import { PageContext, UserContext } from "./components/Contexts";

const langRoutes = routes.map((route) => ({
  ...route,
  path: `/:lang${route.path}`,
}));

interface AppProps {
  pageData?: any;
}

function App({ pageData }: AppProps) {
  // 初始化主题
  useThemeInit();
  const userStore = useRef(createUserStore(get(pageData, "user"))).current;

  return (
    <PageContext.Provider value={pageData}>
      <UserContext.Provider value={userStore}>
        <HreflangTags />
        <Navigation />
        <div>{useRoutes([...routes, ...langRoutes])}</div>
      </UserContext.Provider>
    </PageContext.Provider>
  );
}

export default App;
