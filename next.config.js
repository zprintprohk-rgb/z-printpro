const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'], // SEO：图片格式优化
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      }
    ],
  },
  compress: true,
  poweredByHeader: false, // SEO：隐藏技术栈
  experimental: {
    optimizeCss: true, // 需要 critters 包（CSS 内联优化）
    scrollRestoration: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' }, // SEO：DNS 预解析
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }, // HSTS 安全
          { key: 'Accept-CH', value: 'DPR, Width, Viewport-Width' },
          // SEO：Edge 缓存策略（提升加载速度）
          { key: 'Cache-Control', value: 'public, s-maxage=60, stale-while-revalidate=120' },
          { key: 'X-Vercel-Region', value: '%vercel_region%' }, // GEO：标记 Edge 节点
        ]
      }
    ];
  },
  async redirects() {
    return [
      { source: '/product/:slug', destination: '/zh-hk/products/:slug', permanent: true },
      { source: '/', destination: '/zh-hk', permanent: true }, // 香港为主场
      { source: '/:locale((?!zh-hk|en|ja).*)', destination: '/zh-hk', permanent: true }, // 非法语言重定向
    ];
  }
};

module.exports = withNextIntl(nextConfig);