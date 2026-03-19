# 鲁班 AI 新闻

每日 AI 行业新闻聚合，自动追踪最新 AI 技术动态。

## 功能特性

- 📅 **每日更新** - 每天 0 点自动获取当天 AI 新闻
- 🤖 **多源采集** - 从 Hacker News、Reddit 等源获取
- 📝 **自动生成** - 自动生成 Markdown 格式新闻
- 📦 **VitePress** - 基于 VitePress 的静态网站
- 🚀 **GitHub Pages** - 可部署到 GitHub Pages

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run docs:dev
```

### 构建

```bash
npm run docs:build
```

### 获取新闻

```bash
npm run fetch-news
```

## 目录结构

```
luban-ai-news/
├── docs/
│   ├── .vitepress/
│   │   └── config.js
│   ├── news/
│   │   ├── archive.md
│   │   └── YYYYMMDD.md
│   └── index.md
├── scripts/
│   └── fetch-news.js
├── package.json
└── README.md
```

## 定时任务

项目配置了每天 0 点自动执行新闻获取：

```bash
# crontab 配置
0 0 * * * cd /path/to/luban-ai-news && npm run fetch-news
```

## 部署到 GitHub Pages

1. 构建项目：
```bash
npm run docs:build
```

2. 推送 `docs/.vitepress/dist` 目录到 GitHub Pages 分支

## 技术栈

- [VitePress](https://vitepress.dev/) - Vue 驱动的静态网站生成器
- Node.js - 运行环境
- node-fetch - HTTP 请求

## License

MIT
