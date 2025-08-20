import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>欢迎来到首页</h1>
      <p>这是一个使用 Vite + React + React Router 的应用</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/about" style={{ margin: '0 1rem', color: '#646cff' }}>
          关于我们
        </Link>
        <Link to="/contact" style={{ margin: '0 1rem', color: '#646cff' }}>
          联系我们
        </Link>
      </div>
      
      <div style={{ marginTop: '3rem', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>计数器示例</h2>
        <CounterExample />
      </div>
    </div>
  );
};

const CounterExample: React.FC = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <button 
        onClick={() => setCount((count) => count + 1)}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          backgroundColor: '#646cff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        count is {count}
      </button>
    </div>
  );
};

export default Home;
