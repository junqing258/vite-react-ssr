import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  PageComponent,
  getInitialPropsContext,
  getInitialPropsResult,
} from "../types/ssr";
import { fetchData } from "../utils/fetchData";
import { usePageData } from "../App";

interface AboutProps {
  posts?: Array<{
    id: number;
    title: string;
    content: string;
    author: string;
    publishDate: string;
    tags: string[];
  }>;
}

const About: PageComponent<AboutProps> = () => {
  const pageData = usePageData();
  const { posts } = pageData?.props || {};
  return (
    <>
      <Helmet>
        <title>关于我们 - Vite React SSR</title>
        <meta
          name="description"
          content="了解我们的技术栈：Vite、React 18、React Router、TypeScript 和 Express 服务器端渲染"
        />
        <meta
          name="keywords"
          content="关于我们, Vite, React, TypeScript, Express, SSR"
        />
        <meta property="og:title" content="关于我们 - Vite React SSR" />
        <meta
          property="og:description"
          content="了解我们的技术栈：Vite、React 18、React Router、TypeScript 和 Express 服务器端渲染"
        />
        <link rel="canonical" href="/about" />
      </Helmet>
      <div className="container mx-auto px-4 md:px-0">
        <h1>关于我们</h1>
        <p>
          这是一个基于 Vite、React 和 React Router 构建的现代化单页应用程序。
          该项目展示了如何使用这些技术栈来创建快速、可扩展的 Web 应用。
        </p>

        <h2>技术栈</h2>
        <ul>
          <li>
            <strong>Vite</strong> - 快速的构建工具和开发服务器
          </li>
          <li>
            <strong>React 18</strong> - 用户界面构建库
          </li>
          <li>
            <strong>React Router</strong> - 客户端路由解决方案
          </li>
          <li>
            <strong>TypeScript</strong> - 类型安全的 JavaScript
          </li>
          <li>
            <strong>Express</strong> - 服务器端渲染支持
          </li>
        </ul>

        <h2>特性</h2>
        <ul>
          <li>服务器端渲染 (SSR)</li>
          <li>客户端水合 (Client Hydration)</li>
          <li>动态路由加载</li>
          <li>热模块替换 (HMR)</li>
          <li>TypeScript 支持</li>
        </ul>

        {posts && posts.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h2>最新文章</h2>
            <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
              {posts.map((post: any) => (
                <div
                  key={post.id}
                  style={{
                    padding: "1rem",
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
                    {post.title}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 0.5rem 0",
                      color: "#666",
                      fontSize: "0.9rem",
                      lineHeight: "1.4",
                    }}
                  >
                    {post.content.substring(0, 100)}...
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "0.8rem",
                      color: "#888",
                    }}
                  >
                    <span>作者: {post.author}</span>
                    <span>{post.publishDate}</span>
                  </div>
                  <div style={{ marginTop: "0.5rem" }}>
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        style={{
                          display: "inline-block",
                          padding: "2px 6px",
                          margin: "0 4px 4px 0",
                          backgroundColor: "#646cff",
                          color: "white",
                          borderRadius: "4px",
                          fontSize: "0.7rem",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: "2rem" }}>
          <Link to="/" style={{ color: "#646cff", textDecoration: "none" }}>
            ← 返回首页
          </Link>
        </div>
      </div>
    </>
  );
};

// 添加getInitialProps静态方法
About.getInitialProps = async (
  _context: getInitialPropsContext
): Promise<getInitialPropsResult<AboutProps>> => {
  try {
    // 获取文章数据
    const posts = await fetchData("/api/posts");

    return {
      props: {
        posts,
      },
      // 每30分钟重新验证一次
      revalidate: 1800,
    };
  } catch (error) {
    console.error("Error in About.getInitialProps:", error);

    // 发生错误时返回空的props
    return {
      props: {},
    };
  }
};

export default About;
