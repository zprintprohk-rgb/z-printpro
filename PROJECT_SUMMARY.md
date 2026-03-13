# Z-PrintPro 项目摘要

## 技术栈
- Next.js 14.2.35 (App Router)
- TypeScript
- Edge Runtime (hkg1, tyo1, sin1)
- 多语言：zh-hk, en, ja

## 9 大高利润品类
1. paper-bag (纸袋)
2. packaging-box (包装盒)
3. sticker (贴纸)
4. flyer (传单)
5. brochure (手册)
6. poster (海报)
7. envelope (信封)
8. large-format (大幅面印刷)
9. ai-digital-art (AI 数字艺术)

## 排除品类（业务红线）
- business-card (名片)
- name-card (名片)
- postcard (明信片)

## 路由结构
- / → 308 重定向到 /zh-hk
- /zh-hk → 香港中文首页
- /en → 全球英语首页
- /ja → 日本日文首页
- /[locale]/category/[slug] → 品类页面
- /[locale]/products/[slug] → 产品页面

## SEO 优化
- zh-hk: FAQ Schema + LocalBusiness
- en: Comparison Table + Offer Schema
- ja: HowTo Schema (5 步工艺)

## 构建输出
- Routes: 20+
- Middleware: 39.7 kB
- First Load JS: 87.4 kB