#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src/locales');
const publicDir = path.join(__dirname, 'public/locales');

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  console.log('🔄 同步语言文件...');
  
  // 清空目标目录
  if (fs.existsSync(publicDir)) {
    fs.rmSync(publicDir, { recursive: true, force: true });
  }
  
  // 复制文件
  copyDirectory(srcDir, publicDir);
  
  console.log('✅ 语言文件同步完成！');
  console.log(`📁 源目录: ${srcDir}`);
  console.log(`📁 目标目录: ${publicDir}`);
} catch (error) {
  console.error('❌ 同步失败:', error.message);
  process.exit(1);
}
