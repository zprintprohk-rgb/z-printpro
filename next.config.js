const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages 优化配置
  images: {
    formats: ['image/avif', 'image/webp'], // SEO：图片格式优化
    remotePatterns: [
      { protocol: 'https', hostname: '**' }, // 允许所有 HTTPS 图片
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // 性能优化：响应式图片尺寸
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // 性能优化：缩略图尺寸
    minimumCacheTTL: 60, // 图片缓存时间（秒）
    dangerouslyAllowSVG: true, // 允许 SVG 图片
    contentDispositionType: 'inline', // 图片内联
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false, // SEO：隐藏技术栈
  staticPageGenerationTimeout: 300, // 静态页面生成超时时间（秒）
  experimental: {
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
          // SEO：Cloudflare 缓存策略（提升加载速度）
          { key: 'Cache-Control', value: 'public, s-maxage=60, stale-while-revalidate=120' },
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
