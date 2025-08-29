/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client-react" />

// 允许导入 JSON 文件
declare module "*.json" {
  const value: any;
  export default value;
}