import { defineCollection, z } from 'astro:content';

// 每一篇文章的「欄位規格」。少填必填欄位在 build 時會直接報錯，
// 所以 100、200、300 篇也不會亂 —— 每篇都被強制帶齊 SEO 需要的資料。
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),                 // Meta Title（也是 H1）
    description: z.string(),            // Meta Description
    category: z.enum([
      'platform-guide',
      'register-account',
      'app-mobile',
      'promotions',
      'deposit-withdraw',
      'game-guide',
      'security',
      'customer-service',
    ]),
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),          // 發佈日期
    updatedDate: z.coerce.date().optional(),
    cover: z.string().optional(),      // 封面圖（放 /public/images/ 內的檔名或路徑）
    coverAlt: z.string().optional(),
    author: z.string().default('富88 編輯部'),
    draft: z.boolean().default(false), // true = 草稿，不會被發佈
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { blog };
