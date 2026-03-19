/**
 * AI 新闻获取脚本
 * 功能：获取当天 AI 相关新闻并生成 Markdown 文件
 */

import fetch from 'node-fetch';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// 新闻源配置
const NEWS_SOURCES = [
  {
    name: 'Hacker News AI',
    url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
    type: 'hackernews'
  },
  {
    name: 'Reddit AI',
    url: 'https://www.reddit.com/r/artificial/hot.json?limit=25',
    type: 'reddit'
  }
];

// 获取当天日期
function getTodayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return {
    full: `${year}-${month}-${day}`,
    filename: `${year}${month}${day}`,
    display: `${year}年${month}月${day}日`
  };
}

// 从 Hacker News 获取新闻
async function fetchHackerNews() {
  try {
    const response = await fetch(NEWS_SOURCES[0].url);
    const storyIds = await response.json();
    const topIds = storyIds.slice(0, 10);
    
    const stories = await Promise.all(
      topIds.map(async (id) => {
        const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return storyRes.json();
      })
    );
    
    return stories
      .filter(story => story && story.title && story.url)
      .filter(story => {
        const aiKeywords = ['ai', 'artificial intelligence', 'machine learning', 'llm', 'gpt', 'transformer', 'neural'];
        const title = story.title.toLowerCase();
        return aiKeywords.some(keyword => title.includes(keyword));
      })
      .map(story => ({
        title: story.title,
        url: story.url,
        source: 'Hacker News',
        score: story.score || 0
      }));
  } catch (error) {
    console.error('Failed to fetch Hacker News:', error);
    return [];
  }
}

// 从 Reddit 获取新闻
async function fetchRedditNews() {
  try {
    const response = await fetch(NEWS_SOURCES[1].url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Luban AI News Bot/1.0)'
      }
    });
    const data = await response.json();
    
    if (!data.data || !data.data.children) {
      return [];
    }
    
    return data.data.children
      .map(post => post.data)
      .filter(post => {
        const aiKeywords = ['ai', 'artificial', 'intelligence', 'machine learning', 'llm', 'gpt'];
        const title = post.title.toLowerCase();
        return aiKeywords.some(keyword => title.includes(keyword));
      })
      .slice(0, 10)
      .map(post => ({
        title: post.title,
        url: post.url,
        source: 'Reddit r/artificial',
        score: post.ups || 0
      }));
  } catch (error) {
    console.error('Failed to fetch Reddit:', error);
    return [];
  }
}

// 生成 Markdown 新闻文件
function generateNewsMarkdown(date, news) {
  const sortedNews = news.sort((a, b) => b.score - a.score);
  
  let content = `---
title: AI 新闻 - ${date.display}
date: ${date.full}
---

# AI 新闻 - ${date.display}

> 每日 AI 行业新闻聚合，追踪最新技术动态

---

## 今日热点

`;

  sortedNews.forEach((item, index) => {
    content += `### ${index + 1}. ${item.title}\n\n`;
    content += `- **来源：** ${item.source}\n`;
    content += `- **热度：** ${item.score} 分\n`;
    content += `- **链接：** [阅读原文](${item.url})\n\n`;
    content += `---\n\n`;
  });

  content += `## 统计

- 今日共收录 **${sortedNews.length}** 条 AI 相关新闻
- 数据来源：Hacker News、Reddit

---

*本新闻由 [鲁班 AI 新闻](https://github.com/yyn0210/Hello-World) 自动采集生成*
`;

  return content;
}

// 更新归档页面
function updateArchivePage(newsDir) {
  const files = [];
  
  try {
    const entries = require('fs').readdirSync(newsDir);
    entries.forEach(entry => {
      if (entry.endsWith('.md') && entry !== 'archive.md') {
        const date = entry.replace('.md', '');
        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        const day = date.substring(6, 8);
        const displayDate = `${year}年${month}月${day}日`;
        files.push({
          filename: entry,
          date: displayDate,
          link: `/news/${entry.replace('.md', '')}`
        });
      }
    });
    
    files.sort((a, b) => b.filename.localeCompare(a.filename));
    
    let archiveContent = `---
title: 新闻归档
---

# 新闻归档

## 历史新闻

`;

    files.forEach(file => {
      archiveContent += `- [${file.date}](${file.link})\n`;
    });

    const archivePath = join(newsDir, 'archive.md');
    writeFileSync(archivePath, archiveContent);
    console.log('Archive page updated');
  } catch (error) {
    console.error('Failed to update archive:', error);
  }
}

// 主函数
async function main() {
  console.log('🤖 鲁班 AI 新闻获取开始...');
  
  const date = getTodayDate();
  const newsDir = join(process.cwd(), 'docs', 'news');
  
  // 确保目录存在
  if (!existsSync(newsDir)) {
    mkdirSync(newsDir, { recursive: true });
  }
  
  // 检查今日新闻是否已存在
  const todayFile = join(newsDir, `${date.filename}.md`);
  if (existsSync(todayFile)) {
    console.log(`✅ 今日新闻已存在：${date.full}`);
    return;
  }
  
  console.log(`📅 获取日期：${date.full}`);
  
  // 获取新闻
  console.log('📰 获取 Hacker News...');
  const hackerNews = await fetchHackerNews();
  console.log(`   获取到 ${hackerNews.length} 条`);
  
  console.log('📰 获取 Reddit...');
  const redditNews = await fetchRedditNews();
  console.log(`   获取到 ${redditNews.length} 条`);
  
  // 合并新闻
  const allNews = [...hackerNews, ...redditNews];
  console.log(`📊 总计：${allNews.length} 条新闻`);
  
  if (allNews.length === 0) {
    console.log('⚠️ 未获取到任何新闻');
    return;
  }
  
  // 生成 Markdown 文件
  const content = generateNewsMarkdown(date, allNews);
  writeFileSync(todayFile, content);
  console.log(`✅ 新闻文件已保存：${todayFile}`);
  
  // 更新归档页面
  updateArchivePage(newsDir);
  
  console.log('🎉 新闻获取完成！');
}

// 运行
main().catch(console.error);
