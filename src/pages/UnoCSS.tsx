import React from 'react';

const UnoCSS: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-0">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          UnoCSS 演示页面
        </h1>
        <p className="text-xl text-gray-600">
          展示 UnoCSS 原子化 CSS 的强大功能
        </p>
      </div>

      {/* 色彩系统 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">色彩系统</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-red-500 h-24 rounded-lg flex items-center justify-center text-white font-bold">Red</div>
          <div className="bg-blue-500 h-24 rounded-lg flex items-center justify-center text-white font-bold">Blue</div>
          <div className="bg-green-500 h-24 rounded-lg flex items-center justify-center text-white font-bold">Green</div>
          <div className="bg-yellow-500 h-24 rounded-lg flex items-center justify-center text-white font-bold">Yellow</div>
          <div className="bg-purple-500 h-24 rounded-lg flex items-center justify-center text-white font-bold">Purple</div>
          <div className="bg-pink-500 h-24 rounded-lg flex items-center justify-center text-white font-bold">Pink</div>
          <div className="bg-indigo-500 h-24 rounded-lg flex items-center justify-center text-white font-bold">Indigo</div>
          <div className="bg-gray-500 h-24 rounded-lg flex items-center justify-center text-white font-bold">Gray</div>
        </div>
      </section>

      {/* 按钮样式 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">按钮样式</h2>
        <div className="flex flex-wrap gap-4">
          <button className="btn">
            Primary Button
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
            Secondary Button
          </button>
          <button className="px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
            Outline Button
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all transform hover:scale-105">
            Gradient Button
          </button>
        </div>
      </section>

      {/* 卡片布局 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">卡片布局</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">快速开发</h3>
            <p className="text-gray-600">使用原子化CSS类名快速构建现代化界面</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">高性能</h3>
            <p className="text-gray-600">按需生成CSS，减少文件大小，提升加载速度</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-purple-500 rounded"></div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">可定制</h3>
            <p className="text-gray-600">灵活的配置选项，支持自定义主题和规则</p>
          </div>
        </div>
      </section>

      {/* 响应式布局 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">响应式布局</h2>
        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-500 text-white p-4 rounded text-center">
              <p className="font-bold">移动端</p>
              <p className="text-sm">1列</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded text-center">
              <p className="font-bold">平板</p>
              <p className="text-sm">2列</p>
            </div>
            <div className="bg-purple-500 text-white p-4 rounded text-center">
              <p className="font-bold">桌面</p>
              <p className="text-sm">4列</p>
            </div>
            <div className="bg-orange-500 text-white p-4 rounded text-center">
              <p className="font-bold">自适应</p>
              <p className="text-sm">弹性</p>
            </div>
          </div>
        </div>
      </section>

      {/* 动画效果 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">动画效果</h2>
        <div className="flex flex-wrap gap-4">
          <div className="w-16 h-16 bg-red-500 rounded-lg animate-pulse"></div>
          <div className="w-16 h-16 bg-blue-500 rounded-lg animate-bounce"></div>
          <div className="w-16 h-16 bg-green-500 rounded-lg animate-spin"></div>
          <div className="w-16 h-16 bg-yellow-500 rounded-lg hover:rotate-45 transition-transform cursor-pointer"></div>
          <div className="w-16 h-16 bg-purple-500 rounded-lg hover:scale-110 transition-transform cursor-pointer"></div>
          <div className="w-16 h-16 bg-pink-500 rounded-lg hover:skew-x-12 transition-transform cursor-pointer"></div>
        </div>
      </section>

      {/* CSS Reset 演示 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">CSS Reset 效果</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-600 mb-4">
            UnoCSS 已启用 Tailwind 风格的 CSS reset，确保跨浏览器的一致性。
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded border">
              <h3 className="font-bold mb-3 text-gray-700">原生HTML元素</h3>
              <div className="space-y-2">
                <h1 className="text-2xl">标题 H1</h1>
                <h2 className="text-xl">标题 H2</h2>
                <p>这是一个段落文本。Reset确保了默认margin和padding的一致性。</p>
                <ul className="pl-4">
                  <li>列表项 1</li>
                  <li>列表项 2</li>
                </ul>
                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                  原生按钮
                </button>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded border">
              <h3 className="font-bold mb-3 text-gray-700">Reset 特性</h3>
              <div className="text-sm space-y-2">
                <div>✅ 统一的 box-sizing: border-box</div>
                <div>✅ 移除默认的 margin 和 padding</div>
                <div>✅ 重置边框和轮廓样式</div>
                <div>✅ 设置合理的字体堆栈</div>
                <div>✅ 防止字体大小调整</div>
                <div>✅ 改善行高和字体渲染</div>
                <div>✅ 统一表单元素样式</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white p-4 rounded border font-mono text-sm">
            <div className="text-gray-500 mb-2">// 当前配置:</div>
            <div>reset: 'tailwind'</div>
            <div className="text-gray-500 mt-2">// 其他可选项:</div>
            <div>reset: 'normalize' // Normalize.css</div>
            <div>reset: 'eric-meyer' // Eric Meyer Reset</div>
            <div>reset: 'antfu' // Anthony Fu 的 reset</div>
          </div>
        </div>
      </section>

      {/* 图标演示 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">图标（需要配置图标集）</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-600 mb-4">
            UnoCSS 支持各种图标库，如 Heroicons、Tabler Icons 等。配置后可以使用：
          </p>
          <div className="bg-white p-4 rounded border font-mono text-sm">
            <div className="text-gray-500">// 例如使用 Heroicons</div>
            <div>&lt;div className="i-heroicons-home text-2xl"&gt;&lt;/div&gt;</div>
            <div>&lt;div className="i-heroicons-user text-2xl"&gt;&lt;/div&gt;</div>
            <div>&lt;div className="i-heroicons-cog text-2xl"&gt;&lt;/div&gt;</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UnoCSS;
