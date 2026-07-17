// 一鍵新增一篇文章草稿：  npm run new "文章標題" 分類slug
// 例：  npm run new "真人百家樂新手攻略" games
// 這就是「自動發文」的最小單位——產生一個 .md，之後 build 就會自動生成文章頁與列表。
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const [title, category = 'platform'] = process.argv.slice(2);
if (!title) { console.error('用法: npm run new "標題" 分類slug'); process.exit(1); }

const slug = title
  .toLowerCase()
  .replace(/[^\w一-鿿]+/g, '-')
  .replace(/^-+|-+$/g, '') || 'post-' + Date.now();

const today = new Date().toISOString().slice(0, 10);
const md = `---
title: "${title}"
description: "（請填 Meta Description，120 字內，含主關鍵字）"
category: "${category}"
tags: []
pubDate: ${today}
cover: "/images/banner-01.webp"
coverAlt: "${title}"
draft: true
faq: []
---

（在這裡寫正文，用 Markdown。H2 用 ## 、H3 用 ### 。）
`;

const dir = path.resolve('src/content/blog');
await mkdir(dir, { recursive: true });
const file = path.join(dir, `${slug}.md`);
await writeFile(file, md, 'utf8');
console.log('已建立草稿：', file);
