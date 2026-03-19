import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '鲁班 AI 新闻',
  description: '每日 AI 行业新闻聚合',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '新闻归档', link: '/news/archive' }
    ],
    sidebar: [
      {
        text: '最新文章',
        items: []
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yyn0210/Hello-World' }
    ]
  }
})
