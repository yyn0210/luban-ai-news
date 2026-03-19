# 鲁班 AI 新闻 - 每日自动获取任务

## 任务描述

每天 0 点（北京时间）自动获取当天 AI 相关新闻，生成 Markdown 文件并提交到 GitHub 仓库。

## 执行流程

### 1. 获取新闻

运行新闻获取脚本：
```bash
cd /root/hiclaw-fs/shared/projects/luban-ai-news
npm install  # 首次运行需要
npm run fetch-news
```

### 2. 检查生成结果

脚本会自动：
- 从 Hacker News 获取 AI 相关新闻
- 从 Reddit r/artificial 获取 AI 新闻
- 过滤与 AI 相关的内容（关键词：ai, artificial intelligence, machine learning, llm, gpt 等）
- 生成 Markdown 文件到 `docs/news/YYYYMMDD.md`
- 更新归档页面 `docs/news/archive.md`

### 3. 提交到 GitHub

```bash
cd /root/hiclaw-fs/shared/projects/luban-ai-news
git add -A
git commit -m "chore: 添加 $(date +%Y-%m-%d) AI 新闻"
git push origin main
```

## 定时任务

已配置 Cron 任务：
- **Cron ID:** `c4aef863-8f94-4a10-bbbf-9eb97a5bc7c7`
- **执行时间:** 每天 0:00 (Asia/Shanghai)
- **触发方式:** Gateway cron → systemEvent

## 注意事项

1. 如果当日新闻文件已存在，脚本会自动跳过
2. 如果未获取到任何新闻，不会生成文件
3. 提交前检查 git 状态，确保没有冲突

## 手动触发

如需手动执行新闻获取：
```bash
cd /root/hiclaw-fs/shared/projects/luban-ai-news
npm run fetch-news
```

## 访问地址

- GitHub: https://github.com/yyn0210/Hello-World/tree/main/luban-ai-news
- GitHub Pages: （部署后）https://yyn0210.github.io/Hello-World/luban-ai-news/
