import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  // 在服务器端渲染时安全处理 location
  let location;
  try {
    location = useLocation();
  } catch (error) {
    // 在服务器端创建一个默认的 location 对象
    location = { pathname: '/' };
  }

  const navStyle = {
    padding: '1rem 2rem',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #dee2e6',
    marginBottom: '2rem'
  };

  const navListStyle = {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '2rem',
    alignItems: 'center'
  };

  const linkStyle = (isActive: boolean) => ({
    textDecoration: 'none',
    color: isActive ? '#646cff' : '#333',
    fontWeight: isActive ? 'bold' : 'normal',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    backgroundColor: isActive ? '#f0f0ff' : 'transparent',
    transition: 'all 0.2s ease'
  });

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#646cff',
    textDecoration: 'none',
    marginRight: 'auto'
  };

  return (
    <nav style={navStyle}>
      <ul style={navListStyle}>
        <li>
          <Link to="/" style={logoStyle}>
            Vite + React
          </Link>
        </li>
        <li>
          <Link 
            to="/" 
            style={linkStyle(location.pathname === '/')}
          >
            首页
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            style={linkStyle(location.pathname === '/about')}
          >
            关于
          </Link>
        </li>
        <li>
          <Link 
            to="/contact" 
            style={linkStyle(location.pathname === '/contact')}
          >
            联系
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
