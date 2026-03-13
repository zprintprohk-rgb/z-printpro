import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n';
import AIStudioClient from './AIStudioClient';

interface Props {
  params: { locale: Locale };
}

export async function generateMetadata({ 
  params: { locale } 
}: Props): Promise<Metadata> {
  const isHK = locale === 'zh-hk';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://z-printpro.com';
  
  return {
    title: isHK 
      ? 'AI 定制工作室 | 智能設計印刷 | 一鍵生成藝術品 | Z-PrintPro'
      : 'AI Studio | Smart Design Printing | One-Click Art Generation | Z-PrintPro',
    description: isHK
      ? '使用 AI 人工智能技術定制印刷品。上傳照片，AI 自動優化畫質、色彩校正、智能放大，一鍵生成專業設計。香港本地印刷，24小時出貨。'
      : 'Use AI technology to customize prints. Upload photos for auto-enhancement, color correction, upscaling. Hong Kong printing, 24h delivery.',
    keywords: isHK 
      ? ['AI 印刷', '人工智能設計', '照片優化', 'AI 定制', '智能印刷']
      : ['AI printing', 'artificial intelligence design', 'photo enhancement', 'AI customization'],
    alternates: {
      canonical: `${baseUrl}/${locale}/ai-studio/`,
      languages: {
        'zh-HK': `${baseUrl}/zh-hk/ai-studio/`,
        'en': `${baseUrl}/en/ai-studio/`,
      }
    },
    // 修复：使用 'article' 或 'website' 替代 'product'
    openGraph: {
      title: isHK ? 'AI 定制工作室 | Z-PrintPro' : 'AI Studio | Z-PrintPro',
      description: isHK ? 'AI 智能設計印刷，一鍵生成藝術品' : 'AI smart design printing, one-click art generation',
      type: 'article', // 修复：改为 article（或 website）
      images: [{
        url: `${baseUrl}/og-ai-studio.jpg`,
        width: 1200,
        height: 630,
        alt: isHK ? 'AI 定制工作室' : 'AI Studio'
      }],
      locale: isHK ? 'zh_HK' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: isHK ? 'AI 定制工作室' : 'AI Studio',
      description: isHK ? '使用 AI 定制專屬印刷品' : 'Use AI to customize your prints',
    },
    other: {
      'geo.region': 'HK',
      'geo.placename': 'Hong Kong',
    }
  };
}

export const runtime = 'experimental-edge';

export default async function AIStudioPage({ 
  params: { locale } 
}: Props) {
  setRequestLocale(locale);
  const isHK = locale === 'zh-hk';
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: isHK ? '智印港 AI 定制工作室' : 'Z-PrintPro AI Studio',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'HKD',
    },
    areaServed: {
      '@type': 'City',
      name: 'Hong Kong'
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AIStudioClient locale={locale} />
    </>
  );
}