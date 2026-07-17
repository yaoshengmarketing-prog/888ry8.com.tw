import { defineCollection, z } from 'astro:content';

// 每一篇文章的「欄位規格」。少填必填欄位在 build 時會直接報錯，
// 所以 100、200、300 篇也不會亂 —— 每篇都被強制帶齊 SEO 需要的資料。
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),                 // Meta Title（也是 H1）
    description: z.string(),            // Meta Description
    category: z.enum([
      'platform',
      'account',
      'app',
      'promotions',
      'deposit-withdraw',
      'games',
      'security',
      'support',
    ]),
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),          // 發佈日期
    updatedDate: z.coerce.date().optional(),
    cover: z.string().optional(),      // 封面圖（放 /public/images/ 內的檔名或路徑）
    coverAlt: z.string().optional(),
    author: z.string().default('富88 編輯部'),
    draft: z.boolean().default(false), // true = 草稿，不會被發佈
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    // ===== 視覺區塊（第一批 4 種；frontmatter 驅動、build 自動渲染、不碰正文 Markdown）=====
    // 重點整理 TL;DR：開頭 3–5 條懶人包（幾乎所有文章）。
    keyPoints: z.array(z.string()).default([]),
    // 提示／警示框：type = tip / note / warning。
    callouts: z
      .array(z.object({ type: z.enum(['warning', 'tip', 'note']).default('note'), title: z.string().optional(), body: z.string().optional() }))
      .default([]),
    // 操作步驟：title=步驟標題、body=說明（相容舊 t/d 欄位）。
    steps: z
      .array(z.object({ title: z.string().optional(), body: z.string().optional(), t: z.string().optional(), d: z.string().optional() }))
      .default([]),
    // 查核清單：勾選式清單。
    checklist: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
