import "./App.scss";
import routes from "virtual:generated-pages-react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useThemeInit } from "./hooks/useStore";
import { useRef } from "react";
import { createUserStore } from "./store/userStore";
import { get } from "lodash-es";
import { PageContext, UserContext } from "./components/Contexts";

// 创建页面数据上下文

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
        <Navigation />
        <div>{useRoutes(routes)}</div>
      </UserContext.Provider>
    </PageContext.Provider>
  );
}

export default App;
