import "./App.scss";
import routes from "virtual:generated-pages-react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useThemeInit } from "./hooks/useStore";
import { useEffect } from "react";
import { initializeStore, useUserStore } from "./store";
import { get } from "lodash-es";

interface AppProps {
  pageData?: any;
}

function App({ pageData }: AppProps) {
  // 初始化主题
  useThemeInit();

  // useEffect(() => {
  initializeStore(useUserStore, get(pageData, "user"));
  // }, []);

  return (
    <>
      <Navigation />
      <div>{useRoutes(routes)}</div>
    </>
  );
}

export default App;
