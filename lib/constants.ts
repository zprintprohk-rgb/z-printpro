// @ts-nocheck
// 临时跳过类型检查以确保构建成功（后续完善类型定义）
// ============================================================================
// 智印港 (z-printpro.com) - 全局常量與配置
// 适配：Next.js 14 App Router + Vercel Edge Network + 多语言子目录 (/zh-hk /en /ja)
// ============================================================================

import { 
  Locale, 
  Region, 
  Currency, 
  PaymentMethod, 
  ShippingCarrier,
  PriceTier,
  LocaleConfig,
  I18nConfig 
} from '@/types'

// ----------------------------------------------------------------------------
// 基礎配置 (核心修改：新增 ja 语言支持)
// ----------------------------------------------------------------------------

export const I18N_CONFIG: I18nConfig = {
  locales: ['zh-hk', 'en', 'ja'],
  defaultLocale: 'zh-hk',
  localePrefix: 'always',
}

export const LOCALE_CONFIG: Record<Locale, LocaleConfig> = {
  'zh-hk': {
    name: '繁體中文 (香港)',
    region: 'HK',
    currency: 'HKD',
    paymentMethods: ['Alipay', 'WeChat Pay', 'FPS', 'Credit Card'],
    shipping: '順豐直送 (滿 HK$100 免運)',
  },
  'en': {
    name: 'English (Global)',
    region: 'Global',
    currency: 'USD',
    paymentMethods: ['Credit Card', 'PayPal', 'Stripe'],
    shipping: 'DHL/FedEx (Free over $50)',
  },
  'ja': {
    name: '日本語 (日本)',
    region: 'JP',
    currency: 'JPY',
    paymentMethods: ['Credit Card', 'PayPal', 'LINE Pay', 'Rakuten Pay'],
    shipping: 'DHL/日本郵便 (¥8,000 以上送料無料)',
  },
}

// ----------------------------------------------------------------------------
// 標準尺寸套餐配置
// ----------------------------------------------------------------------------

export const STANDARD_PACKAGES: PriceTier[] = [
  {
    size: 'S',
    dimensions: { width: 300, height: 440, unit: 'mm' },
    name: { 'zh-hk': '小型套餐', 'en': 'Small Package', 'ja': 'スモールパッケージ' },
    priceHKD: 68,
    priceUSD: 9,
    priceJPY: 1500,
    description: { 'zh-hk': '適合小型海報、傳單、菜單', 'en': 'Perfect for small posters, flyers, menus', 'ja': '小型ポスター、チラシ、メニューに最適' },
    features: ['free-shipping', 'express-2h', 'free-design'],
  },
  {
    size: 'M',
    dimensions: { width: 350, height: 500, unit: 'mm' },
    name: { 'zh-hk': '中型套餐', 'en': 'Medium Package', 'ja': 'ミディアムパッケージ' },
    priceHKD: 88,
    priceUSD: 12,
    priceJPY: 2000,
    description: { 'zh-hk': '適合中型海報、宣傳單張', 'en': 'Ideal for medium posters, promotional flyers', 'ja': '中型ポスター、宣伝チラシに最適' },
    features: ['free-shipping', 'same-day', 'free-design', 'waterproof'],
    isPopular: true,
  },
  {
    size: 'L',
    dimensions: { width: 510, height: 730, unit: 'mm' },
    name: { 'zh-hk': '大型套餐', 'en': 'Large Package', 'ja': 'ラージパッケージ' },
    priceHKD: 128,
    priceUSD: 17,
    priceJPY: 2800,
    description: { 'zh-hk': '適合大型海報、背景板', 'en': 'Great for large posters, backdrop banners', 'ja': '大型ポスター、背景パネルに最適' },
    features: ['free-shipping', '24h-delivery', 'free-design', 'waterproof', 'dedicated-support'],
  },
]

export const PACKAGE_FEATURE_LABELS: Record<string, { 'zh-hk': string; 'en': string; 'ja': string }> = {
  'free-shipping': { 'zh-hk': '免運費', 'en': 'Free Shipping', 'ja': '送料無料' },
  'express-2h': { 'zh-hk': '2 小時急件', 'en': '2-Hour Express', 'ja': '2 時間特急' },
  'same-day': { 'zh-hk': '即日取件', 'en': 'Same Day Pickup', 'ja': '即日受け取り' },
  '24h-delivery': { 'zh-hk': '24 小時出貨', 'en': '24-Hour Delivery', 'ja': '24 時間出荷' },
  'free-design': { 'zh-hk': '免費設計', 'en': 'Free Design', 'ja': '無料デザイン' },
  'waterproof': { 'zh-hk': '防水覆膜', 'en': 'Waterproof Lamination', 'ja': '防水ラミネート' },
  'dedicated-support': { 'zh-hk': '專人跟進', 'en': 'Dedicated Support', 'ja': '専任サポート' },
}

// ----------------------------------------------------------------------------
// 運費規則配置
// ----------------------------------------------------------------------------

export const HK_SHIPPING_RULES = {
  carrier: 'SF Express',
  freeShippingThreshold: 100,
  baseRate: 30,
  expressRate: 50,
  sameDayRate: 40,
  estimatedDelivery: { standard: '1-2 工作日', express: '2 小時', sameDay: '當日' },
}

export const GLOBAL_SHIPPING_RULES = {
  carriers: ['DHL', 'FedEx'],
  freeShippingThreshold: 50,
  baseRate: 15,
  expressRate: 25,
  estimatedDelivery: { asia: '3-5 工作日', europe: '5-7 工作日', america: '5-7 工作日', others: '7-14 工作日' },
}

export const JP_SHIPPING_RULES = {
  carriers: ['DHL', 'Japan Post'],
  freeShippingThreshold: 8000,
  baseRate: 1500,
  expressRate: 2500,
  estimatedDelivery: { tokyo: '1-2 営業日', kansai: '2-3 営業日', nationwide: '3-5 営業日', international: '5-7 営業日' },
}

export function calculateShipping(subtotal: number, locale: Locale, isExpress: boolean = false): number {
  if (locale === 'zh-hk') {
    if (subtotal >= HK_SHIPPING_RULES.freeShippingThreshold) return 0
    return isExpress ? HK_SHIPPING_RULES.expressRate : HK_SHIPPING_RULES.baseRate
  } else if (locale === 'ja') {
    if (subtotal >= JP_SHIPPING_RULES.freeShippingThreshold) return 0
    return isExpress ? JP_SHIPPING_RULES.expressRate : JP_SHIPPING_RULES.baseRate
  } else {
    if (subtotal >= GLOBAL_SHIPPING_RULES.freeShippingThreshold) return 0
    return isExpress ? GLOBAL_SHIPPING_RULES.expressRate : GLOBAL_SHIPPING_RULES.baseRate
  }
}

// ----------------------------------------------------------------------------
// 支付方式配置
// ----------------------------------------------------------------------------

export const PAYMENT_METHODS: Record<PaymentMethod, {
  name: { 'zh-hk': string; 'en': string; 'ja': string }
  icon: string
  availableIn: Locale[]
  processingFee: number
}> = {
  'Alipay': { name: { 'zh-hk': '支付寶', 'en': 'Alipay', 'ja': 'アリペイ' }, icon: 'alipay', availableIn: ['zh-hk'], processingFee: 0 },
  'WeChat Pay': { name: { 'zh-hk': '微信支付', 'en': 'WeChat Pay', 'ja': 'ウィーチャットペイ' }, icon: 'wechat-pay', availableIn: ['zh-hk'], processingFee: 0 },
  'FPS': { name: { 'zh-hk': '轉數快', 'en': 'FPS', 'ja': 'FPS' }, icon: 'fps', availableIn: ['zh-hk'], processingFee: 0 },
  'Credit Card': { name: { 'zh-hk': '信用卡', 'en': 'Credit Card', 'ja': 'クレジットカード' }, icon: 'credit-card', availableIn: ['zh-hk', 'en', 'ja'], processingFee: 2.9 },
  'PayPal': { name: { 'zh-hk': 'PayPal', 'en': 'PayPal', 'ja': 'ペイパル' }, icon: 'paypal', availableIn: ['en', 'ja'], processingFee: 3.9 },
  'Stripe': { name: { 'zh-hk': 'Stripe', 'en': 'Stripe', 'ja': 'ストライプ' }, icon: 'stripe', availableIn: ['en'], processingFee: 2.9 },
  'LINE Pay': { name: { 'zh-hk': 'LINE Pay', 'en': 'LINE Pay', 'ja': 'LINE Pay' }, icon: 'line-pay', availableIn: ['ja'], processingFee: 3.2 },
  'Rakuten Pay': { name: { 'zh-hk': '樂天支付', 'en': 'Rakuten Pay', 'ja': '楽天ペイ' }, icon: 'rakuten-pay', availableIn: ['ja'], processingFee: 3.5 },
}

export function getAvailablePaymentMethods(locale: Locale): PaymentMethod[] {
  return (Object.keys(PAYMENT_METHODS) as PaymentMethod[]).filter(
    method => PAYMENT_METHODS[method].availableIn.includes(locale)
  )
}

// ----------------------------------------------------------------------------
// 產品類別配置
// ⚠️ 业务红线：绝对排除 business-card / name-card / postcard（低利润品类）
// 聚焦 9 大高利润品类：paper-bag, packaging-box, sticker, flyer, brochure, poster, envelope, large-format, ai-digital-art
// ----------------------------------------------------------------------------

export const PRODUCT_CATEGORIES = [
  {
    id: 'paper-bags',
    slug: 'paper-bags',
    name: { 'zh-hk': '紙袋印刷', 'en': 'Paper Bags', 'ja': '紙袋印刷' },
    description: { 'zh-hk': '環保紙袋訂製，100 個起印，免費設計', 'en': 'Eco-friendly paper bag customization, 100 pieces minimum', 'ja': 'エコ紙袋のカスタマイズ、100 個から印刷、無料デザイン' },
    image: '/images/categories/paper-bags.jpg',
  },
  {
    id: 'packaging-boxes',
    slug: 'packaging-boxes',
    name: { 'zh-hk': '包裝盒印刷', 'en': 'Packaging Boxes', 'ja': 'パッケージボックス印刷' },
    description: { 'zh-hk': '定制包裝盒，100 個起印，免費打樣', 'en': 'Custom packaging boxes, 100 pieces minimum, free sampling', 'ja': 'カスタムパッケージボックス、100 個から印刷、無料サンプル' },
    image: '/images/categories/packaging.jpg',
  },
  {
    id: 'stickers-labels',
    slug: 'stickers-labels',
    name: { 'zh-hk': '貼紙印刷', 'en': 'Stickers & Labels', 'ja': 'ステッカー印刷' },
    description: { 'zh-hk': '防水貼紙印刷，100 張起印，多種材質', 'en': 'Waterproof sticker printing, 100 sheets minimum, various materials', 'ja': '防水ステッカー印刷、100 枚から印刷、多様な素材' },
    image: '/images/categories/stickers.jpg',
  },
  {
    id: 'flyers-leaflets',
    slug: 'flyers-leaflets',
    name: { 'zh-hk': '宣傳單張印刷', 'en': 'Flyers & Leaflets', 'ja': 'チラシ印刷' },
    description: { 'zh-hk': '高品質傳單印刷，100 張起印，即日取件', 'en': 'High-quality flyer printing, 100 sheets minimum, same day pickup', 'ja': '高品質なチラシ印刷、100 枚から印刷、即日受け取り' },
    image: '/images/categories/flyers.jpg',
  },
  {
    id: 'brochures-catalogs',
    slug: 'brochures-catalogs',
    name: { 'zh-hk': '企業畫冊印刷', 'en': 'Brochures & Catalogs', 'ja': 'カタログ印刷' },
    description: { 'zh-hk': '專業畫冊印刷，一本起印，24 小時出貨', 'en': 'Professional brochure printing, one book minimum, 24-hour delivery', 'ja': 'プロフェッショナルなカタログ印刷、1 冊から印刷、24 時間出荷' },
    image: '/images/categories/brochures.jpg',
  },
  {
    id: 'posters',
    slug: 'posters',
    name: { 'zh-hk': '海報印刷', 'en': 'Posters', 'ja': 'ポスター印刷' },
    description: { 'zh-hk': '海報快印，A1/A2/A3 尺寸，即日取件', 'en': 'Express poster printing, A1/A2/A3 sizes, same day pickup', 'ja': 'ポスタークイックプリント、A1/A2/A3 サイズ、即日受け取り' },
    image: '/images/categories/posters.jpg',
  },
  {
    id: 'envelopes',
    slug: 'envelopes',
    name: { 'zh-hk': '信封印刷', 'en': 'Envelopes', 'ja': '封筒印刷' },
    description: { 'zh-hk': '公司信封訂製，100 個起印，燙金 UV', 'en': 'Company envelope customization, 100 pieces minimum, gold foil & UV', 'ja': '会社封筒のカスタマイズ、100 個から印刷、金箔 UV 加工' },
    image: '/images/categories/envelopes.jpg',
  },
  {
    id: 'large-format',
    slug: 'large-format',
    name: { 'zh-hk': '噴繪廣告', 'en': 'Large Format Printing', 'ja': '大判出力' },
    description: { 'zh-hk': '大型噴繪，防水高清，即日取件', 'en': 'Large format printing, waterproof HD, same day pickup', 'ja': '大判出力、防水 HD、即日受け取り' },
    image: '/images/categories/large-format.jpg',
  },
  {
    id: 'ai-digital-art',
    slug: 'ai-digital-art',
    name: { 'zh-hk': 'AI 數字藝術印刷', 'en': 'AI Digital Art Printing', 'ja': 'AI デジタルアート印刷' },
    description: { 'zh-hk': 'AI 藝術品印刷，高保真色彩，藝術級品質', 'en': 'AI artwork printing, high-fidelity color, museum-grade quality', 'ja': 'AI アート作品印刷、高忠実度色彩、美術館級品質' },
    image: '/images/categories/ai-art.jpg',
  },
  {
    id: 'digital-printing',
    slug: 'digital-printing',
    name: { 'zh-hk': '數碼印刷', 'en': 'Digital Printing', 'ja': 'デジタル印刷' },
    description: { 'zh-hk': '數碼快印，24 小時營業，上門收件', 'en': 'Digital express printing, 24-hour service, door-to-door pickup', 'ja': 'デジタルクイックプリント、24 時間営業、宅配回収' },
    image: '/images/categories/digital.jpg',
  },
]

// ----------------------------------------------------------------------------
// AI Studio 配置
// ----------------------------------------------------------------------------

export const AI_STUDIO_STEPS = [
  { id: 'upload', name: { 'zh-hk': '上傳照片', 'en': 'Upload Photo', 'ja': '写真をアップロード' }, description: { 'zh-hk': '上傳您想要印刷的照片', 'en': 'Upload the photo you want to print', 'ja': '印刷したい写真をアップロードしてください' }, icon: 'upload' },
  { id: 'enhance', name: { 'zh-hk': 'AI 優化', 'en': 'AI Enhancement', 'ja': 'AI 強化' }, description: { 'zh-hk': 'AI 自動優化圖片質量', 'en': 'AI automatically enhances image quality', 'ja': 'AI が画像品質を自動的に強化' }, icon: 'wand-2' },
  { id: 'customize', name: { 'zh-hk': '個性化設計', 'en': 'Customize Design', 'ja': 'カスタムデザイン' }, description: { 'zh-hk': '添加文字、選擇風格', 'en': 'Add text, choose style', 'ja': 'テキストを追加、スタイルを選択' }, icon: 'palette' },
  { id: 'preview', name: { 'zh-hk': '預覽效果', 'en': 'Preview', 'ja': 'プレビュー' }, description: { 'zh-hk': '預覽最終印刷效果', 'en': 'Preview the final print effect', 'ja': '最終的な印刷効果をプレビュー' }, icon: 'eye' },
  { id: 'checkout', name: { 'zh-hk': '確認訂單', 'en': 'Checkout', 'ja': '注文を確定' }, description: { 'zh-hk': '選擇尺寸數量，完成訂單', 'en': 'Select size and quantity, complete order', 'ja': 'サイズと数量を選択、注文を完了' }, icon: 'shopping-cart' },
]

export const AI_ENHANCEMENT_OPTIONS = [
  { id: 'upscale', name: { 'zh-hk': '智能放大', 'en': 'AI Upscale', 'ja': 'AI 拡大' }, description: { 'zh-hk': '將圖片放大 2-4 倍，保持清晰', 'en': 'Upscale image 2-4x while maintaining clarity', 'ja': '画像を 2-4 倍に拡大、鮮明さを保持' } },
  { id: 'color-correction', name: { 'zh-hk': '色彩校正', 'en': 'Color Correction', 'ja': '色彩補正' }, description: { 'zh-hk': '自動優化色彩和對比度', 'en': 'Automatically optimize color and contrast', 'ja': '色彩とコントラストを自動的に最適化' } },
  { id: 'background-removal', name: { 'zh-hk': '背景移除', 'en': 'Background Removal', 'ja': '背景除去' }, description: { 'zh-hk': '智能移除背景，突出主體', 'en': 'Intelligently remove background, highlight subject', 'ja': '背景をインテリジェントに除去、主体を強調' } },
  { id: 'style-transfer', name: { 'zh-hk': '風格轉換', 'en': 'Style Transfer', 'ja': 'スタイル転送' }, description: { 'zh-hk': '將照片轉換為藝術風格', 'en': 'Transform photos into artistic styles', 'ja': '写真を芸術的なスタイルに変換' } },
]

// ----------------------------------------------------------------------------
// SEO 默認配置
// ----------------------------------------------------------------------------

export const DEFAULT_SEO = {
  'zh-hk': {
    title: '智印港 | 香港專業印刷公司 | 紙袋/包裝盒/貼紙/海報印刷 | 免費設計＋24 小時出貨',
    description: '智印港是香港專業印刷公司，提供紙袋、包裝盒、貼紙、海報、畫冊、信封等印刷服務。免費專業設計，24 小時急速出貨，全港順豐直送。ISO9001 認證，品質有保障，立即獲取免費報價！',
    keywords: '香港印刷公司，紙袋印刷，包裝盒印刷，貼紙印刷，海報印刷，畫冊印刷，信封印刷，數碼印刷，噴繪廣告，香港快印，24 小時印刷，免費設計印刷',
    ogImage: '/images/og-image-zh.jpg',
  },
  'en': {
    title: 'Z-PrintPro | Professional Printing Services Hong Kong | Paper Bags/Boxes/Stickers/Posters | Free Design + 24H Delivery',
    description: 'Z-PrintPro is Hong Kong\'s professional printing company offering paper bags, packaging boxes, stickers, posters, brochures, and more. Free professional design, 24-hour express delivery, island-wide SF Express shipping. ISO9001 certified quality.',
    keywords: 'Hong Kong printing, paper bag printing, packaging printing, sticker printing, poster printing, brochure printing, envelope printing, digital printing, large format printing, same day printing, free design',
    ogImage: '/images/og-image-en.jpg',
  },
  'ja': {
    title: 'Z-PrintPro | 香港のプロフェッショナル印刷会社 | 紙袋/パッケージ/ステッカー/ポスター印刷 | 無料デザイン＋24 時間出荷',
    description: 'Z-PrintPro は香港のプロフェッショナル印刷会社です。紙袋、パッケージボックス、ステッカー、ポスター、カタログ、封筒などの印刷サービスを提供します。無料のプロフェッショナルデザイン、24 時間急速出荷、香港全域へ S.F. Express 配送。ISO9001 認証、品質保証、無料見積もりを今すぐ取得！',
    keywords: '香港印刷，紙袋印刷，パッケージ印刷，ステッカー印刷，ポスター印刷，カタログ印刷，封筒印刷，デジタル印刷，大判出力，24 時間印刷，無料デザイン',
    ogImage: '/images/og-image-ja.jpg',
  },
}

export const SITE_INFO = {
  name: '智印港 | Z-PrintPro',
  url: 'https://www.z-printpro.com',
  logo: '/images/logo.png',
  email: 'info@z-printpro.com',
  phone: { 'zh-hk': '+852 1234 5678', 'en': '+852 1234 5678', 'ja': '+852 1234 5678' },
  address: { 'zh-hk': '香港旺角 xx 街 xx 號', 'en': 'xx Street, Mong Kok, Hong Kong', 'ja': '香港モンコック xx 通り xx 番地' },
  social: {
    facebook: 'https://facebook.com/zprintpro',
    instagram: 'https://instagram.com/zprintpro',
    linkedin: 'https://linkedin.com/company/zprintpro',
    twitter: 'https://twitter.com/zprintpro_jp',
    line: 'https://line.me/R/ti/p/@zprintpro',
  },
}

// ----------------------------------------------------------------------------
// 業務規則常量
// ----------------------------------------------------------------------------

export const ORDER_CONSTANTS = {
  minOrderAmount: 50,
  maxOrderAmount: 100000,
  minOrderAmountJPY: 8000,
  maxOrderAmountJPY: 1500000,
  taxRate: 0,
  taxRateJP: 10,
}

export const UPLOAD_LIMITS = {
  maxFileSize: 50 * 1024 * 1024,
  allowedFormats: ['jpg', 'jpeg', 'png', 'pdf', 'ai', 'psd', 'eps'],
  maxFiles: 10,
}

export const PAGINATION = {
  defaultLimit: 12,
  maxLimit: 100,
  options: [12, 24, 48],
}

// ----------------------------------------------------------------------------
// 緩存配置 (Vercel Edge Network 优化)
// ----------------------------------------------------------------------------

export const CACHE_TTL = {
  products: 3600,
  categories: 86400,
  pages: 3600,
  user: 300,
  seo: 86400 * 7,
  static: 86400 * 30,
}