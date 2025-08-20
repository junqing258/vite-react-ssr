import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>关于我们 - Vite React SSR</title>
        <meta name="description" content="了解我们的技术栈：Vite、React 18、React Router、TypeScript 和 Express 服务器端渲染" />
        <meta name="keywords" content="关于我们, Vite, React, TypeScript, Express, SSR" />
        <meta property="og:title" content="关于我们 - Vite React SSR" />
        <meta property="og:description" content="了解我们的技术栈：Vite、React 18、React Router、TypeScript 和 Express 服务器端渲染" />
        <link rel="canonical" href="/about" />
      </Helmet>
      <div>
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

      <div style={{ marginTop: "2rem" }}>
        <Link to="/" style={{ color: "#646cff", textDecoration: "none" }}>
          ← 返回首页
        </Link>
      </div>
      </div>
    </>
  );
};

export default About;
