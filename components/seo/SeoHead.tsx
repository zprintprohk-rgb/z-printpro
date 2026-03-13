// ============================================================================
// 智印港 (z-printpro.com) - SEO 頭部組件（最終完整修復版）
// ============================================================================

'use client'

import React from 'react'
import Head from 'next/head'
import { useLocale } from 'next-intl'
import { SeoPageType, Product, Locale, SeoData } from '@/types'
import { DEFAULT_SEO, SITE_INFO } from '@/lib/constants'

// ============================================================================
// SEO 關鍵詞策略 (基於 keyword_strategy_hk_global.md)
// ============================================================================

const KEYWORD_STRATEGY: Record<Locale, Record<string, string[]>> = {
  'zh-hk': {
    'business-cards': [
      '名片印刷 香港 平價', '名片印刷 即日取 旺角', '燙金名片 香港 免費設計',
      '透明名片 PVC 香港', '名片印刷 包郵 順豐', '咭片印刷 一盒起印',
      '名片快印 24小時出貨', '圓角名片 啞膠 香港'
    ],
    'flyers-leaflets': [
      '傳單印刷 香港 急件', 'A4傳單 雙面印刷 平價', '宣傳單張 免費設計 包郵',
      '招生傳單 印刷 即日取', '餐飲傳單 防水 覆膜', '三折頁印刷 香港 公司'
    ],
    'paper-bags': [
      '紙袋訂做 香港 100個起', '環保紙袋 印刷 FSC認證', '手提袋訂製 免費設計',
      '禮品袋印刷 燙金 絲帶', '牛皮紙袋 訂做 平價', '婚禮紙袋 定制 香港'
    ],
    'stickers-labels': [
      '貼紙印刷 香港 防水', '透明貼紙 不殘膠 香港', '圓形貼紙 批量印刷 平價',
      '食品標籤 貼紙 防水', '包裝貼紙 定制 LOGO', 'QR Code貼紙 印刷'
    ],
    'packaging-boxes': [
      '包裝盒訂做 香港 100個起', '彩盒印刷 燙金 UV', '環保包裝盒 FSC認證',
      '禮盒定制 香港 免費打樣', '瓦楞紙盒 訂做 食品級', '化妝品包裝盒 磁吸盒'
    ],
    'brochures-catalogs': [
      '畫冊印刷 香港 24小時', '騎馬釘小冊子 印刷 平價', '精裝畫冊 硬殼 燙金',
      '產品目錄印刷 免費設計', '公司簡介 畫冊印刷', '膠裝書刊 印刷 香港'
    ],
    'envelopes': [
      '信封印刷 香港 公司抬頭', '燙金信封 C6 C5 尺寸', '婚禮信封 喜帖信封 定制',
      '環保信封 再生紙 香港', '可變數據信封 批量地址', '學校信封 成績單 印刷'
    ],
    'posters': [
      '海報印刷 香港 即日取', 'A1海報 快印 旺角', '寫真海報 防水背膠',
      '學生海報 印刷 平價', '活動海報 設計+印刷', '婚禮海報 迎賓牌 定制'
    ],
    'digital-printing': [
      '數碼印刷 香港 24小時', '文件快印 即日取 平價', '論文印刷 裝訂 學生',
      '書本印刷 膠裝 騎馬釘', '證書印刷 燙金邊框', '彩色影印 A3 A4 大量'
    ],
    'large-format': [
      '噴繪廣告 香港 即日取', 'Banner印刷 防水 戶外', '易拉架 印刷 套餐 平價',
      '燈箱布 噴繪 透光', '背景板噴繪 婚禮 展覽', '橫額印刷 店舖開業'
    ],
    'ai-studio': [
      'AI 定制畫 香港', 'AI 照片優化 印刷', 'AI 藝術打印 牆畫',
      '智能修圖 海報印刷', 'AI 畫風轉換 定制', '人工智能 照片放大 印刷'
    ],
    'special-offers': [
      '海報印刷 包郵 香港', '印刷 免運費 順豐', '平價印刷 包送貨',
      '固定尺寸印刷 免運費', '印刷套餐 包郵優惠'
    ],
  },
  'en': {
    'business-cards': [
      'custom business cards online', 'business card printing free shipping',
      'premium business cards fast delivery', 'gold foil business cards custom',
      'clear PVC business cards online', 'business cards same day printing'
    ],
    'flyers-leaflets': [
      'flyer printing online free shipping', 'custom flyer design and printing',
      'same day flyer printing service', 'bulk flyer printing cheap',
      'A4 flyer double sided printing', 'waterproof flyers laminated'
    ],
    'paper-bags': [
      'custom paper bags with logo', 'eco friendly paper bags wholesale',
      'kraft paper bags custom printing', 'gift bags bulk order cheap',
      'reusable shopping bags custom', 'wedding favor bags personalized'
    ],
    'stickers-labels': [
      'custom stickers online free shipping', 'waterproof stickers outdoor use',
      'clear transparent stickers custom', 'product label printing food grade',
      'die cut stickers custom shape', 'QR code stickers printable'
    ],
    'packaging-boxes': [
      'custom packaging boxes with logo', 'eco friendly packaging boxes FSC',
      'gift boxes custom printing wholesale', 'corrugated boxes custom size',
      'cosmetic packaging boxes magnetic', 'small batch packaging boxes 50pcs'
    ],
    'brochures-catalogs': [
      'brochure printing online fast', 'saddle stitch booklet printing',
      'hardcover catalog printing custom', 'cheap booklet printing bulk',
      'product catalog design print', 'annual report printing service'
    ],
    'envelopes': [
      'custom envelopes with logo print', 'gold foil envelopes wedding',
      'eco friendly envelopes recycled', 'variable data envelope printing',
      'C6 C5 envelope custom size', 'invitation envelopes personalized'
    ],
    'posters': [
      'poster printing online same day', 'custom poster printing free shipping',
      'A1 A2 poster printing large format', 'photo poster printing high quality',
      'academic poster printing conference', 'waterproof poster outdoor use'
    ],
    'digital-printing': [
      'digital printing service online', 'document printing fast turnaround',
      'thesis printing binding service', 'certificate printing gold foil',
      'color copies bulk order cheap', 'book printing on demand'
    ],
    'large-format': [
      'banner printing custom size', 'outdoor banner waterproof UV',
      'roll up banner printing package', 'backdrop printing event trade show',
      'backlit film printing lightbox', 'vinyl banner cheap bulk'
    ],
    'ai-studio': [
      'AI art printing custom canvas', 'AI photo enhancement print',
      'custom AI wall art print', 'AI generated art poster',
      'photo to painting AI print', 'AI image upscaling print'
    ],
    'special-offers': [
      'poster printing free shipping', 'printing package deal',
      'bulk printing discount', 'fixed size printing free shipping'
    ],
  },
  // ============================================================================
  // 新增：日语关键词策略（日本 GEO 优化）
  // 适配 /ja 子目录，本地化日语关键词，提升日本市场 SEO 效果
  // ============================================================================
  'ja': {
    'business-cards': [
      '香港 名刺印刷 格安', '香港 名刺印刷 即日受け取り', '香港 金箔名刺 デザイン無料',
      '香港 透明名刺 PVC', '香港 名刺印刷 送料無料', '香港 名刺 1箱から印刷',
      '香港 名刺 24時間出荷', '香港 ラウンドコーナー名刺'
    ],
    'flyers-leaflets': [
      '香港 チラシ印刷 特急', '香港 A4チラシ 両面印刷 格安', '香港 宣伝チラシ デザイン無料',
      '香港 入学案内チラシ 即日受け取り', '香港 飲食店チラシ 防水ラミネート', '香港 三つ折りチラシ 印刷'
    ],
    'paper-bags': [
      '香港 紙袋 オーダーメイド 100個から', '香港 エコ紙袋 FSC認証', '香港 手提げ袋 デザイン無料',
      '香港 ギフトバッグ 箔押し リボン', '香港 クラフト紙袋 格安', '香港 結婚式紙袋 カスタム'
    ],
    'stickers-labels': [
      '香港 ステッカー印刷 防水', '香港 透明ステッカー 糊残りなし', '香港 円形ステッカー 大量印刷',
      '香港 食品ラベル 防水', '香港 パッケージステッカー ロゴ', '香港 QRコードステッカー 印刷'
    ],
    'packaging-boxes': [
      '香港 パッケージボックス オーダーメイド 100個から', '香港 カラーボックス 箔押し UV', '香港 エコパッケージ FSC認証',
      '香港 ギフトボックス 無料サンプル', '香港 段ボール箱 食品グレード', '香港 化粧品パッケージ マグネット'
    ],
    'brochures-catalogs': [
      '香港 カタログ印刷 24時間', '香港 中綴じ冊子 格安', '香港 ハードカバーカタログ 箔押し',
      '香港 製品カタログ デザイン無料', '香港 会社案内 カタログ印刷', '香港 無線綴じ書籍 印刷'
    ],
    'envelopes': [
      '香港 封筒印刷 会社ロゴ', '香港 箔押し封筒 C6 C5', '香港 結婚式封筒 招待状 カスタム',
      '香港 エコ封筒 再生紙', '香港 可変データ封筒 住所印刷', '香港 学校封筒 成績表 印刷'
    ],
    'posters': [
      '香港 ポスター印刷 即日受け取り', '香港 A1ポスター クイックプリント', '香港 写真ポスター 防水粘着',
      '香港 学生ポスター 格安', '香港 イベントポスター デザイン+印刷', '香港 結婚式ポスター ウェルカムボード'
    ],
    'digital-printing': [
      '香港 デジタル印刷 24時間', '香港 ドキュメント印刷 即日受け取り', '香港 論文印刷 製本',
      '香港 ブック印刷 無線綴じ 中綴じ', '香港 証明書印刷 箔押し', '香港 カラーコピー A3 A4 大量'
    ],
    'large-format': [
      '香港 大判出力 即日受け取り', '香港 バナー印刷 防水 屋外', '香港 ロールアップバナー パッケージ',
      '香港 ライトボックスフィルム 透過印刷', '香港 背景パネル 結婚式 展示会', '香港 横断幕 店舗オープン'
    ],
    'ai-studio': [
      '香港 AIアートプリント カスタムキャンバス', '香港 AI写真強化 プリント',
      '香港 カスタムAIウォールアート', '香港 AI生成アートポスター',
      '香港 写真から絵画 AIプリント', '香港 AI画像拡大 プリント'
    ],
    'special-offers': [
      '香港 ポスター印刷 送料無料', '香港 印刷パッケージ お得',
      '香港 大量印刷 割引', '香港 固定サイズ印刷 送料無料'
    ],
  }
}

// ============================================================================
// 類型守衛函數（修復 TypeScript 類型推斷問題）
// ============================================================================

// 檢查是否為 Product 類型
function isProduct(data: any): data is Product {
  return data && typeof data === 'object' && 'id' in data && 'slug' in data && 'name' in data
}

// 檢查是否為分類數據類型
function isCategoryData(data: any): data is { title: string; slug: string; description?: string } {
  return data && typeof data === 'object' && typeof data.slug === 'string'
}

// ============================================================================
// SEO 數據生成函數
// ============================================================================

interface GenerateSeoDataParams {
  pageType: SeoPageType
  locale: Locale
  data?: Product | { title?: string; description?: string; slug?: string; category?: string }
  customTitle?: string
  customDescription?: string
}

/**
 * 生成 SEO 數據
 */
function generateSeoData({ pageType, locale, data, customTitle, customDescription }: GenerateSeoDataParams): SeoData {
  const defaultSeo = DEFAULT_SEO[locale]
  const isHK = locale === 'zh-hk'
  const isJP = locale === 'ja'

  // 產品頁 SEO（使用類型守衛）
  if (pageType === 'product' && isProduct(data)) {
    const product = data
    const keywords = KEYWORD_STRATEGY[locale][product.categorySlug] || []
    
    return {
      title: customTitle || product.metaTitle || `${product.name} | ${isHK ? '智印港' : isJP ? 'Z-PrintPro' : 'Z-PrintPro'}`,
      description: customDescription || product.metaDescription || product.description || '',
      keywords: [...keywords, ...(defaultSeo.keywords.split(', '))].slice(0, 10),
      canonical: `${SITE_INFO.url}/${locale}/products/${product.slug}/`,
      ogImage: product.image,
      ogType: 'product',
    }
  }

  // 分類頁 SEO（修復：使用類型守衛）
  if (pageType === 'category' && isCategoryData(data)) {
    const categorySlug = data.slug || ''
    const categoryName = data.title || categorySlug
    const keywords = KEYWORD_STRATEGY[locale][categorySlug] || []
    
    return {
      title: customTitle || `${categoryName} | ${isHK ? '智印港' : isJP ? 'Z-PrintPro' : 'Z-PrintPro'}`,
      description: customDescription || (isHK 
        ? `專業${categoryName}服務，100個起印，免費設計，24小時出貨，全港順豐直送。`
        : isJP
        ? `プロフェッショナルな${categoryName}サービス。最小100枚、無料デザイン、24時間出荷。`
        : `Professional ${categoryName} services. Minimum 100 pieces, free design, 24-hour delivery.`),
      keywords: [...keywords, ...(defaultSeo.keywords.split(', '))].slice(0, 10),
      canonical: `${SITE_INFO.url}/${locale}/category/${categorySlug}/`,
      ogType: 'website',
    }
  }

  // AI Studio SEO
  if (pageType === 'ai-studio') {
    const keywords = KEYWORD_STRATEGY[locale]['ai-studio'] || []
    
    return {
      title: customTitle || (isHK 
        ? 'AI 定制工作室 | 智能照片優化印刷 | 智印港'
        : isJP
        ? 'AIスタジオ | スマート写真強化プリント | Z-PrintPro'
        : 'AI Studio | Smart Photo Enhancement Printing | Z-PrintPro'),
      description: customDescription || (isHK
        ? '使用 AI 技術將您的照片變成藝術品。智能優化、風格轉換、一鍵定制專屬印刷品。'
        : isJP
        ? 'AI技術で写真をアートに変身。スマート強化、スタイル変換、ワンクリックでオリジナル印刷品を作成。'
        : 'Transform your photos into art with AI. Smart enhancement, style transfer, one-click custom printing.'),
      keywords: [...keywords, 'AI printing', 'custom canvas', 'photo enhancement'],
      canonical: `${SITE_INFO.url}/${locale}/ai-studio/`,
      ogType: 'website',
    }
  }

  // 包郵套餐頁 SEO
  if (pageType === 'special-offers') {
    const keywords = KEYWORD_STRATEGY[locale]['special-offers'] || []
    
    return {
      title: customTitle || (isHK
        ? '包郵套餐專區 | 固定尺寸免運費 | 智印港'
        : isJP
        ? '送料無料パッケージ | 固定サイズお得 | Z-PrintPro'
        : 'Free Shipping Packages | Fixed Size Deals | Z-PrintPro'),
      description: customDescription || (isHK
        ? '智印港包郵套餐，固定三個尺寸任選，全港順豐直送免運費。小型300x440mm、中型350x500mm、大型510x730mm。'
        : isJP
        ? 'Z-PrintPro送料無料パッケージ。3つの固定サイズから選べ、香港全域へS.F. Express無料配送。小型300x440mm、中型350x500mm、大型510x730mm。'
        : 'Z-PrintPro free shipping packages. Three fixed sizes with free delivery. Small 300x440mm, Medium 350x500mm, Large 510x730mm.'),
      keywords: [...keywords, 'free shipping', 'package deal'],
      canonical: `${SITE_INFO.url}/${locale}/special-offers/`,
      ogType: 'website',
    }
  }

  // 首頁 SEO
  if (pageType === 'home') {
    return {
      title: defaultSeo.title,
      description: defaultSeo.description,
      keywords: defaultSeo.keywords.split(', '),
      canonical: `${SITE_INFO.url}/${locale}/`,
      ogImage: defaultSeo.ogImage,
      ogType: 'website',
    }
  }

  // 默認 SEO
  return {
    title: customTitle || defaultSeo.title,
    description: customDescription || defaultSeo.description,
    keywords: defaultSeo.keywords.split(', '),
    canonical: `${SITE_INFO.url}/${locale}/`,
    ogType: 'website',
  }
}

/**
 * 生成產品結構化數據 (JSON-LD)
 */
function generateProductJsonLd(product: Product, locale: Locale): Record<string, unknown> {
  const isHK = locale === 'zh-hk'
  const isJP = locale === 'ja'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: isHK ? product.nameZh : isJP ? product.nameJa : product.name,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: SITE_INFO.name,
    },
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: isHK ? 'HKD' : isJP ? 'JPY' : 'USD',
      price: extractPrice(String(product.price)),
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: SITE_INFO.name,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '100',
    },
  }
}

/**
 * 生成麵包屑結構化數據
 */
function generateBreadcrumbJsonLd(items: { name: string; url: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * 提取價格數字
 */
function extractPrice(priceString: string): string {
  const match = priceString.match(/[\d,.]+/)
  return match ? match[0].replace(',', '') : '0'
}

// ============================================================================
// JSON-LD 結構化數據生成函數（GEO 優化版）
// ============================================================================

/**
 * 生成組織結構化數據 - 用於首頁
 */
function generateOrganizationJsonLd(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_INFO.name,
    url: SITE_INFO.url,
    logo: `${SITE_INFO.url}${SITE_INFO.logo}`,
    sameAs: [
      SITE_INFO.social.facebook,
      SITE_INFO.social.instagram,
    ].filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_INFO.phone[locale],
      contactType: 'customer service',
      areaServed: 'HK',
      availableLanguage: ['Chinese', 'English', 'Japanese'],
    },
  }
}

/**
 * 生成本地商家結構化數據 - 用於聯絡頁
 */
function generateLocalBusinessJsonLd(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_INFO.name,
    image: `${SITE_INFO.url}${SITE_INFO.logo}`,
    '@id': SITE_INFO.url,
    url: SITE_INFO.url,
    telephone: SITE_INFO.phone[locale],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_INFO.address[locale],
      addressLocality: locale === 'zh-hk' ? '香港' : locale === 'ja' ? '香港' : 'Hong Kong',
      addressRegion: 'HK',
      addressCountry: 'HK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.3193,
      longitude: 114.1694,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '18:00',
      },
    ],
  }
}

/**
 * 生成 WebSite 結構化數據 - 用於首頁
 */
function generateWebSiteJsonLd(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_INFO.name,
    url: `${SITE_INFO.url}/${locale}/`,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_INFO.url}/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * 生成結賬頁結構化數據 - 用於結賬流程
 */
function generateCheckoutPageJsonLd(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CheckoutPage',
    name: locale === 'zh-hk' ? '結賬' : locale === 'ja' ? 'チェックアウト' : 'Checkout',
    url: `${SITE_INFO.url}/${locale}/checkout/`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_INFO.name,
      url: SITE_INFO.url,
    },
  }
}

// ============================================================================
// SeoHead 組件（GEO 優化版）
// ============================================================================

interface SeoHeadProps {
  pageType: SeoPageType
  data?: Product | { title?: string; description?: string; slug?: string; category?: string }
  customTitle?: string
  customDescription?: string
  breadcrumbs?: { name: string; url: string }[]
  noIndex?: boolean
  children?: React.ReactNode
}

/**
 * SeoHead 組件
 * 
 * GEO 優化特性：
 * 1. 根據 pageType 自動注入對應的 JSON-LD 結構化數據
 * 2. 動態生成 hreflang 多語言標籤
 * 3. 智能 Robots 控制（交易頁面自動 noindex）
 * 4. Open Graph 標籤與 pageType 嚴格對應
 */
export function SeoHead({
  pageType,
  data,
  customTitle,
  customDescription,
  breadcrumbs,
  noIndex: forceNoIndex = false,
  children,
}: SeoHeadProps) {
  const locale = useLocale() as Locale
  const seoData = generateSeoData({ pageType, locale, data, customTitle, customDescription })
  
  // 生成結構化數據（GEO 優化）
  const structuredData: Record<string, unknown>[] = []
  
  // 產品頁 - Product Schema
  if (pageType === 'product' && isProduct(data)) {
    structuredData.push(generateProductJsonLd(data, locale))
  }
  
  // 首頁 - Organization + WebSite Schema
  if (pageType === 'home') {
    structuredData.push(generateOrganizationJsonLd(locale))
    structuredData.push(generateWebSiteJsonLd(locale))
  }
  
  // 聯絡頁 - LocalBusiness Schema
  if (pageType === 'contact') {
    structuredData.push(generateLocalBusinessJsonLd(locale))
  }
  
  // 結賬頁 - CheckoutPage Schema
  if (pageType === 'checkout') {
    structuredData.push(generateCheckoutPageJsonLd(locale))
  }
  
  // 麵包屑導航 - BreadcrumbList Schema（所有頁面都適用）
  if (breadcrumbs && breadcrumbs.length > 0) {
    structuredData.push(generateBreadcrumbJsonLd(breadcrumbs))
  }
  
  // 決定 Robots 策略
  // 1. 強制 noIndex 優先
  // 2. seoData 中的 noindex 設置
  // 3. 交易相關頁面默認 noindex
  const shouldNoIndex = forceNoIndex || seoData.noindex || 
    ['checkout', 'checkout-success', 'cart', 'error', 'search'].includes(pageType)
  const shouldNoFollow = seoData.nofollow || pageType === 'checkout'

  return (
    <Head>
      {/* 基本 Meta 標籤 */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      {seoData.keywords && seoData.keywords.length > 0 && (
        <meta name="keywords" content={seoData.keywords.join(', ')} />
      )}
      
      {/* Canonical URL */}
      {seoData.canonical && (
        <link rel="canonical" href={seoData.canonical} />
      )}
      
      {/* Robots - GEO 優化：智能控制索引 */}
      {shouldNoIndex ? (
        <meta name="robots" content={`${shouldNoIndex ? 'noindex' : 'index'}, ${shouldNoFollow ? 'nofollow' : 'nofollow'}`} />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Open Graph - 與 pageType 嚴格對應 */}
      <meta property="og:type" content={seoData.ogType || 'website'} />
      <meta property="og:title" content={seoData.ogTitle || seoData.title} />
      <meta property="og:description" content={seoData.ogDescription || seoData.description} />
      <meta property="og:url" content={seoData.canonical} />
      <meta property="og:site_name" content={SITE_INFO.name} />
      <meta property="og:locale" content={locale === 'zh-hk' ? 'zh_HK' : locale === 'ja' ? 'ja_JP' : 'en_US'} />
      {seoData.ogImage && (
        <>
          <meta property="og:image" content={seoData.ogImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      {seoData.ogImage && (
        <meta name="twitter:image" content={seoData.ogImage} />
      )}
      
      {/* 多語言替代鏈接 - hreflang（GEO 國際化核心） */}
      {seoData.canonical && (
        <>
          <link rel="alternate" hrefLang="zh-HK" href={seoData.canonical.replace(`/${locale}/`, '/zh-hk/')} />
          <link rel="alternate" hrefLang="en" href={seoData.canonical.replace(`/${locale}/`, '/en/')} />
          <link rel="alternate" hrefLang="ja" href={seoData.canonical.replace(`/${locale}/`, '/ja/')} />
          <link rel="alternate" hrefLang="x-default" href={seoData.canonical.replace(`/${locale}/`, '/en/')} />
        </>
      )}
      
      {/* 結構化數據 JSON-LD（GEO 優化核心） */}
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      
      {/* 額外的子元素 */}
      {children}
    </Head>
  )
}

// ============================================================================
// 便捷導出函數
// ============================================================================

/**
 * 生成產品頁 SEO 數據 (用於 Server Components)
 */
export function generateProductMetadata(product: Product, locale: Locale) {
  const isHK = locale === 'zh-hk'
  const isJP = locale === 'ja'
  const keywords = KEYWORD_STRATEGY[locale][product.categorySlug] || []
  
  return {
    title: product.metaTitle || `${product.name} | ${isHK ? '智印港' : isJP ? 'Z-PrintPro' : 'Z-PrintPro'}`,
    description: product.metaDescription || product.description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: `${SITE_INFO.url}/${locale}/products/${product.slug}/`,
      languages: {
        'zh-HK': `/zh-hk/products/${product.slug}/`,
        'en': `/en/products/${product.slug}/`,
        'ja': `/ja/products/${product.slug}/`,
      },
    },
    openGraph: {
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.description,
      images: [product.image],
      type: 'product',
      locale: isHK ? 'zh_HK' : isJP ? 'ja_JP' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.description,
      images: [product.image],
    },
  }
}

/**
 * 生成分類頁 SEO 數據 (用於 Server Components)
 */
export function generateCategoryMetadata(categorySlug: string, categoryName: string, locale: Locale) {
  const isHK = locale === 'zh-hk'
  const isJP = locale === 'ja'
  const keywords = KEYWORD_STRATEGY[locale][categorySlug] || []
  
  return {
    title: `${categoryName} | ${isHK ? '智印港' : isJP ? 'Z-PrintPro' : 'Z-PrintPro'}`,
    description: isHK 
      ? `專業${categoryName}服務，100個起印，免費設計，24小時出貨，全港順豐直送。`
      : isJP
      ? `プロフェッショナルな${categoryName}サービス。最小100枚、無料デザイン、24時間出荷。`
      : `Professional ${categoryName} services. Minimum 100 pieces, free design, 24-hour delivery.`,
    keywords: keywords.join(', '),
    alternates: {
      canonical: `${SITE_INFO.url}/${locale}/category/${categorySlug}/`,
      languages: {
        'zh-HK': `/zh-hk/category/${categorySlug}/`,
        'en': `/en/category/${categorySlug}/`,
        'ja': `/ja/category/${categorySlug}/`,
      },
    },
    openGraph: {
      title: categoryName,
      description: isHK 
        ? `專業${categoryName}服務，100個起印，免費設計，24小時出貨。`
        : isJP
        ? `プロフェッショナルな${categoryName}サービス。最小100枚、無料デザイン、24時間出荷。`
        : `Professional ${categoryName} services. Minimum 100 pieces, free design.`,
      type: 'website',
      locale: isHK ? 'zh_HK' : isJP ? 'ja_JP' : 'en_US',
    },
  }
}

export default SeoHead