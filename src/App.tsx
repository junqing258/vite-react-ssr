import "./App.scss";
import routes from "virtual:generated-pages-react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useThemeInit } from "./hooks/useStore";
import { createContext } from "react";

// 创建页面数据上下文
export const PageContext = createContext<Record<string, any> | null>(null);

interface AppProps {
  pageData?: any;
}

function App({ pageData }: AppProps) {
  // 初始化主题
  useThemeInit();

  return (
    <PageContext.Provider value={pageData}>
      <Navigation />
      <div>{useRoutes(routes)}</div>
    </PageContext.Provider>
  );
}

export default App;
