# 鲁班 AI 新闻 - 每日自动获取

自动从 Hacker News 和 Reddit 采集 AI/ML 相关新闻，每日生成 Markdown 报告并提交到 GitHub。

## 功能

- 📰 从 Hacker News 获取 Top 30 热门新闻
- 🤖 从 Reddit r/MachineLearning 获取热门帖子
- 🏷️ 自动过滤 AI/ML 相关关键词
- 📝 生成 Markdown 格式的日报
- 🚀 自动提交到 GitHub

## 安装

```bash
npm install
```

## 使用

### 手动运行
```bash
npm run fetch-news
```

### 定时任务
已配置 Cron，每天 0:00（北京时间）自动执行。

## 输出

新闻文件保存在 `news/` 目录：
```
news/
├── 2026-03-19.md
├── 2026-03-20.md
└── ...
```

## 配置

编辑 `config.json` 自定义：
- 新闻数量
- 过滤关键词
- 输出路径

## GitHub 提交

自动提交到：yyn0210/Hello-World/luban-ai-news/news/

---

**鲁班 AI 新闻** - 让 AI 资讯触手可及 📰🤖
