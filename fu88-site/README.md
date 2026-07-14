# YOU888 娛樂城 —— 首頁 ＋ 自動生成部落格（Astro）

這個專案把你原本的 YOU888 首頁，和一個「新增一篇文章就自動生成列表／分類／sitemap」的部落格，
放在**同一個網站、同一個網域**。技術用 Astro（靜態網站產生器），SEO 頂、速度快、免費。

## 網址結構
- 首頁：`/`
- 部落格列表：`/blog/`
- 單篇文章：`/post/{slug}/`
- 分類頁：`/blog/categories/{分類}/`
- 網站地圖：`/sitemap.xml`　RSS：`/rss.xml`

分類 slug：`platform-guide`(平台指南)、`promotions`(優惠活動)、`game-guide`(遊戲玩法)、`deposit-withdraw`(存款與出金)、`security`(安全查核)。

## 怎麼「發一篇文章」（這就是自動發文的核心）
1. 在 `src/content/blog/` 新增一個 `.md` 檔（檔名就是網址 slug）。
2. 檔案最上面填「欄位」（標題、描述、分類、日期、封面、tags、faq…），下面用 Markdown 寫正文。
3. 部署後，**文章頁、列表、分類頁、sitemap、RSS 全部自動更新**——你不用手動維護清單。
   - 快速建草稿：`npm run new "文章標題" game-guide`
   - `draft: true` 的文章不會被發佈。

> 200、300 篇都不會亂：每篇都被 schema 強制帶齊 SEO 欄位，列表／分類／分頁由系統自動生成。

## 本機預覽 / 建置
```bash
npm install
npm run dev      # 本機預覽 http://localhost:4321
npm run build    # 產生靜態網站到 dist/
```

## 部署到 Netlify（同一個網域 you888.netlify.app）
方式 A（推薦，之後最省事）：把這個資料夾推到 GitHub → 在 Netlify 連這個 repo，
Build command 填 `npm run build`、Publish directory 填 `dist`，之後你每次 push 就自動上線。

方式 B：本機 `npm run build` 後，把 `dist/` 直接拖到 Netlify 部署。

## SEO 內建
- 每篇文章自動輸出 Meta Title/Description、canonical、Open Graph
- JSON-LD：BlogPosting ＋ 麵包屑 ＋ FAQPage
- 自動 sitemap.xml、RSS、robots.txt
