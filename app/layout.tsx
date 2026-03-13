// ============================================================================
// Z-PrintPro - 根布局（全局 Edge 配置 + SEO 基础）
// Next.js 14 App Router + Vercel Edge Network 混合渲染方案
// ============================================================================

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '智印港 Z-PrintPro - 香港專業印刷服務',
    template: '%s | 智印港 Z-PrintPro'
  },
  description: '香港專業印刷服務，提供高質素海報、宣傳單張、貼紙、紙袋等印刷品，24 小時快速交貨',
  // 关键：全局 SEO 标签（提升 AI 搜索抓取）
  keywords: '香港印刷，名片印刷，傳單印刷，包裝盒印刷，日本印刷，Hong Kong printing, Japan printing',
  alternates: {
    canonical: 'https://z-printpro.com/zh-hk',
    languages: {
      'zh-HK': 'https://z-printpro.com/zh-hk',
      'en': 'https://z-printpro.com/en',
      'ja': 'https://z-printpro.com/ja',
    },
  },
  // Open Graph 基础配置
  openGraph: {
    title: '智印港 Z-PrintPro - 香港專業印刷服務',
    description: '香港專業印刷服務，提供高質素海報、宣傳單張、貼紙、紙袋等印刷品，24 小時快速交貨',
    type: 'website',
    locale: 'zh-HK',
    siteName: 'Z-PrintPro',
  },
  // Twitter 卡片配置
  twitter: {
    card: 'summary_large_image',
    title: '智印港 Z-PrintPro - 香港專業印刷服務',
    description: '香港專業印刷服務，提供高質素海報、宣傳單張、貼紙、紙袋等印刷品，24 小時快速交貨',
  },
};

// 关键：全局启用 Edge Runtime（所有页面继承）
export const runtime = 'edge';
// 关键：优先香港节点（主场优化）
export const preferredRegion = 'hkg1';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-HK"> {/* 默认香港繁体 */}
      <body>{children}</body>
    </html>
  );
}
