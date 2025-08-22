import "./App.scss";
// @ts-ignore
import routes from "virtual:generated-pages-react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { Suspense, createContext, useContext } from "react";
import { usePageDataWithFallback } from "./utils/ssr-data/clientDataHydration";

// 创建页面数据上下文
export const PageDataContext = createContext<any>(null);

// 自定义Hook用于访问页面数据
export const usePageData = () => {
  return useContext(PageDataContext);
};

interface AppProps {
  pageData?: any;
}

// 智能数据管理组件
function AppWithDataFallback({ initialPageData }: { initialPageData?: any }) {
  const { pageData, loading, error, isClientGenerated } = usePageDataWithFallback();
  
  // 使用初始数据或从Hook获取的数据
  const finalPageData = initialPageData || pageData;

  if (loading && !finalPageData) {
    return (
      <>
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <p>正在加载数据...</p>
        </div>
      </>
    );
  }

  if (error && !finalPageData) {
    return (
      <>
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-red-500">加载数据失败: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            重试
          </button>
        </div>
      </>
    );
  }

  return (
    <PageDataContext.Provider value={finalPageData}>
      <Navigation />
      <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
      {/* 开发环境显示数据来源 */}
      {process.env.NODE_ENV === 'development' && finalPageData && (
        <div className="fixed bottom-4 right-4 text-xs bg-gray-800 text-white px-2 py-1 rounded">
          数据来源: {isClientGenerated ? '客户端' : '服务端'}
        </div>
      )}
    </PageDataContext.Provider>
  );
}

function App({ pageData }: AppProps) {
  // 如果有初始页面数据（从服务端或客户端入口传入），直接使用传统方式
  if (pageData) {
    return (
      <PageDataContext.Provider value={pageData}>
        <Navigation />
        <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
      </PageDataContext.Provider>
    );
  }

  // 否则使用智能回退方式
  return <AppWithDataFallback initialPageData={pageData} />;
}

export default App;
