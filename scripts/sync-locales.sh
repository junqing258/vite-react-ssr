#!/bin/bash

# 同步翻译文件到 public 目录

echo "同步翻译文件..."

# 创建目录
mkdir -p public/locales/zh-CN
mkdir -p public/locales/en-US

# 复制文件
cp src/locales/zh-CN/common.json public/locales/zh-CN/common.json
cp src/locales/en-US/common.json public/locales/en-US/common.json

echo "翻译文件同步完成！"
