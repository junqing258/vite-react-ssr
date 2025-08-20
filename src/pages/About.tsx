import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>关于我们</h1>
      <p>
        这是一个基于 Vite、React 和 React Router 构建的现代化单页应用程序。
        该项目展示了如何使用这些技术栈来创建快速、可扩展的 Web 应用。
      </p>
      
      <h2>技术栈</h2>
      <ul>
        <li><strong>Vite</strong> - 快速的构建工具和开发服务器</li>
        <li><strong>React 18</strong> - 用户界面构建库</li>
        <li><strong>React Router</strong> - 客户端路由解决方案</li>
        <li><strong>TypeScript</strong> - 类型安全的 JavaScript</li>
        <li><strong>Express</strong> - 服务器端渲染支持</li>
      </ul>

      <h2>特性</h2>
      <ul>
        <li>服务器端渲染 (SSR)</li>
        <li>客户端水合 (Client Hydration)</li>
        <li>动态路由加载</li>
        <li>热模块替换 (HMR)</li>
        <li>TypeScript 支持</li>
      </ul>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/" style={{ color: '#646cff', textDecoration: 'none' }}>
          ← 返回首页
        </Link>
      </div>
    </div>
  );
};

export default About;
