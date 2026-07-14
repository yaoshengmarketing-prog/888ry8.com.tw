import { defineConfig } from 'astro/config';

// 正式網域：之後接上自訂網域就改這裡（例如 https://888ry8.com.tw）
export default defineConfig({
  site: 'https://888ry8.com.tw',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
