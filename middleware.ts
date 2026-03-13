import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

// 核心：多语言中间件（适配 Edge + GEO）
export default createMiddleware({
  locales: ['zh-hk', 'en', 'ja'], // 严格匹配子目录
  defaultLocale: 'zh-hk', // 香港为主场
  localePrefix: 'always', // 强制所有路由带语言子目录（SEO 规范）
  localeDetection: false, // 关闭自动检测（避免 GEO 冲突）
});

// Edge 配置（GEO 节点优化）
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ],
  // Next.js 14 Edge Runtime（香港+东京+新加坡节点）
  runtime: 'experimental-edge',
  regions: ['hkg1', 'hnd1', 'sin1'] // 覆盖香港（主场）、日本、东南亚
};