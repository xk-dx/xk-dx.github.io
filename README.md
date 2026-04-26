# 启动指南

## 首次运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 日常启动

```bash
npm run dev
```

访问 http://localhost:3000

## 关闭服务

在终端按 `Ctrl + C`

如果端口被占用：

```bash
taskkill /F /IM node.exe
```

## 添加博客文章

在 `content/blog/` 下创建 `.md` 文件，格式：

```markdown
---
title: 文章标题
date: 2026.04.24
tags: [标签1, 标签2]
---

正文内容...
```

保存后刷新页面即可看到新文章。
