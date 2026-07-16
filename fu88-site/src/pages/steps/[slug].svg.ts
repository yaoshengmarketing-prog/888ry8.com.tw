import { getCollection } from 'astro:content';
import { CATEGORIES, SITE } from '../../consts';

// 可分享的「操作步驟」步驟圖（build 時每篇生成一張 SVG，零依賴）。
// 只為「有填 steps 且非草稿」的文章產生：/steps/{slug}.svg
export async function getStaticPaths() {
  const posts = (await getCollection('blog')).filter((p) => !p.data.draft && (p.data.steps?.length ?? 0) > 0);
  return posts.map((post) => ({ params: { slug: post.slug }, props: { post } }));
}

const ACCENT: Record<string, string> = {
  'platform-guide': '#c1954e',
  'register-account': '#6fa8c9',
  'app-mobile': '#7cb890',
  'promotions': '#d98a5a',
  'deposit-withdraw': '#b98fd0',
  'game-guide': '#d06b74',
  'security': '#5fb0a8',
  'customer-service': '#cbb26a',
};

const esc = (s: string) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const clip = (s: string, n: number) => ([...s].length > n ? [...s].slice(0, n - 1).join('') + '…' : s);

export async function GET({ props }: any) {
  const d = props.post.data;
  const accent = ACCENT[d.category] ?? '#c1954e';
  const catName = CATEGORIES[d.category] ?? '';
  const host = new URL(SITE.url).host;
  const steps = d.steps as { t: string; d?: string }[];

  const W = 1080;
  const HEADER = 220;
  const ROW = 116;
  const FOOTER = 76;
  const H = HEADER + steps.length * ROW + FOOTER;
  const FF = 'PingFang TC, Microsoft JhengHei, Noto Sans TC, system-ui, sans-serif';

  const rows = steps
    .map((s, i) => {
      const cy = HEADER + i * ROW + 34;
      const line =
        i < steps.length - 1
          ? `<line x1="104" y1="${cy + 34}" x2="104" y2="${HEADER + (i + 1) * ROW + 34 - 34}" stroke="#dbb37e" stroke-opacity="0.45" stroke-width="3"/>`
          : '';
      return `
    ${line}
    <circle cx="104" cy="${cy}" r="32" fill="url(#stepGold)"/>
    <text x="104" y="${cy + 11}" text-anchor="middle" font-size="30" font-weight="900" fill="#3a2b12" font-family="${FF}">${i + 1}</text>
    <text x="164" y="${cy - 2}" font-size="34" font-weight="800" fill="#f4ead2" font-family="${FF}">${esc(clip(s.t, 26))}</text>
    ${s.d ? `<text x="164" y="${cy + 30}" font-size="22" fill="#c7b58e" font-family="${FF}">${esc(clip(s.d, 34))}</text>` : ''}`;
    })
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(d.title)} 操作步驟">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2b2013"/>
      <stop offset="1" stop-color="#40301c"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.05" r="0.9">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.5"/>
      <stop offset="0.55" stop-color="${accent}" stop-opacity="0.1"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="stepGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e6cd97"/>
      <stop offset="1" stop-color="#c1954e"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="0" width="${W}" height="6" fill="${accent}"/>
  <rect x="64" y="52" width="10" height="46" rx="3" fill="${accent}"/>
  <text x="90" y="86" font-size="30" font-weight="700" fill="#efe3cb" font-family="${FF}" letter-spacing="2">操作步驟${catName ? ' · ' + esc(catName) : ''}</text>
  <text x="64" y="158" font-size="46" font-weight="900" fill="#f8efd9" font-family="${FF}">${esc(clip(d.title, 20))}</text>
  ${rows}
  <text x="64" y="${H - 30}" font-size="30" font-weight="900" fill="#e6cd97" font-family="${FF}">${esc(SITE.brand)} <tspan font-size="22" fill="#cdb383">娛樂城</tspan></text>
  <text x="${W - 64}" y="${H - 30}" text-anchor="end" font-size="22" fill="#b49a68" font-family="${FF}">${esc(host)}</text>
</svg>`;

  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
