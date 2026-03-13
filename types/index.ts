// ============================================================================
// Z-PrintPro - 核心类型定义（极致 SEO + GEO 优化版）
// 适配：Next.js 14 App Router + Vercel Edge Network + 多语言子目录
// ============================================================================

// ----------------------------------------------------------------------------
// 基础类型
// ----------------------------------------------------------------------------
export type Locale = 'zh-hk' | 'en' | 'ja'; // 严格匹配子目录
export type Currency = 'HKD' | 'USD' | 'CNY' | 'JPY'; // 补充 CNY 解决 cartStore 错误
export type Region = 'HK' | 'JP' | 'Global' | 'US' | 'UK' | 'AU';
export type PaymentMethod = 'Alipay' | 'WeChat Pay' | 'FPS' | 'Credit Card' | 'PayPal' | 'Stripe' | 'LINE Pay' | 'Rakuten Pay';
export type ShippingCarrier = 'SF Express' | 'DHL' | 'FedEx' | 'Japan Post' | 'kerry' | 'yamato' | 'local';

// ----------------------------------------------------------------------------
// SEO/GEO 核心类型（极致 SEO + GEO 优化版）
// 适配：Next.js 14 App Router + AI 搜索引擎优化 + 多语言子目录
// ----------------------------------------------------------------------------

/**
 * GEO-Optimized Page Types
 * 
 * 每种页面类型映射到特定的：
 * - JSON-LD 结构化数据 Schema
 * - Open Graph 标签策略
 * - Robots 索引策略
 * - AI 搜索引擎优化权重
 */
export type SeoPageType = 
  // 核心商业页面
  | 'home'           // 首页 - Organization Schema + WebSite Schema
  | 'product'        // 产品页 - Product Schema + Offer Schema
  | 'category'       // 分类页 - CollectionPage Schema + BreadcrumbList
  | 'special-offers' // 促销页 - CollectionPage Schema + Offer Schema
  
  // 交易流程页面 (通常 noindex，但保留结构化数据)
  | 'cart'           // 购物车 - WebPage Schema (noindex)
  | 'checkout'       // 结账页 - CheckoutPage Schema (noindex, nofollow)
  | 'checkout-success' // 支付成功 - WebPage Schema (noindex)
  
  // 内容页面 (GEO 优化重点)
  | 'blog-post'      // 博客文章 - Article Schema + Person Schema
  | 'blog-list'      // 博客列表 - CollectionPage Schema
  | 'landing-page'   // 营销落地页 - WebPage Schema + FAQ Schema
  
  // 企业信息页面
  | 'about'          // 关于我们 - AboutPage Schema + Organization Schema
  | 'contact'        // 联系我们 - ContactPage Schema + LocalBusiness Schema
  | 'faq'            // 常见问题 - FAQPage Schema
  
  // 系统页面
  | 'error'          // 404/500 错误页 - WebPage Schema (noindex)
  | 'search'         // 搜索结果页 - SearchResultsPage Schema (noindex)
  
  // 功能页面
  | 'ai-studio'      // AI 工作室 - WebPage Schema + SoftwareApplication Schema
  | 'quote'          // 报价页面 - WebPage Schema + Service Schema
  ;

export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'profile';
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
  locale: Locale;
  alternates: Record<Locale, string>; // 多语言交替链接（SEO 关键）
}

export interface GEOCONFIG {
  region: 'hkg1' | 'tyo1' | 'iad1' | 'syd1'; // 香港/东京/华盛顿/悉尼
  currency: Currency;
  language: 'zh-HK' | 'en-US' | 'ja-JP';
  timezone: string;
}

// ----------------------------------------------------------------------------
// 价格/套餐类型（GEO 定价优化）
// ----------------------------------------------------------------------------
export interface PriceTier {
  size: 'S' | 'M' | 'L';
  dimensions: { width: number; height: number; unit: 'mm' | 'cm' | 'in' };
  name: Record<Locale, string>;
  priceHKD: number;
  priceUSD: number;
  priceJPY: number;
  description: Record<Locale, string>;
  features: string[];
  isPopular?: boolean;
}

export interface LocaleConfig {
  name: string;
  region: Region;
  currency: Currency;
  paymentMethods: PaymentMethod[];
  shipping: string;
}

export interface I18nConfig {
  locales: Locale[];
  defaultLocale: Locale;
  localePrefix: 'always' | 'as-needed' | 'never';
}

// ----------------------------------------------------------------------------
// 产品类型（SEO + B2B 优化）
// ----------------------------------------------------------------------------
export interface Product {
  id: string | number;
  name: string;
  nameZh?: string;
  nameEn?: string;
  nameJa?: string;
  slug: string;
  description?: string;
  descriptionZh?: string;
  descriptionJa?: string;
  shortDescription?: string;
  price: string | number;
  originalPrice?: string | number;
  currency?: string;
  minQty?: number;
  moq?: number;
  unit?: string;
  categorySlug: string;
  category?: string;
  categoryName?: string;
  categoryNameZh?: string;
  categoryNameJa?: string;
  image?: string;
  images?: string[];
  ogImage?: string;
  sku?: string;
  stock?: number;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  features?: string[];
  tags?: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, any>;
  geoRegion?: string;
  shippingRegions?: string[];
  url?: string; // 补充 url 字段（解决 JSON-LD 错误）
  [key: string]: any;
}

// ----------------------------------------------------------------------------
// 购物车类型
// ----------------------------------------------------------------------------
export interface CartItem {
  uniqueId: string;
  productId: string | number;
  productName: string;
  productNameZh?: string;
  productNameJa?: string;
  price: number;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  image?: string;
  size?: string;
  color?: string;
  options?: Record<string, string>;
  addedAt: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  currency: Currency;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
}

export type AddCartItemParams = Omit<CartItem, 'uniqueId' | 'quantity' | 'addedAt'>;

// ----------------------------------------------------------------------------
// 订单类型
// ----------------------------------------------------------------------------
export interface CustomerInfo {
  name: string;
  nameZh?: string;
  nameJa?: string;
  phone: string;
  email?: string;
  address: string;
  addressLine2?: string;
  city?: string;
  district?: string;
  country?: string;
  postalCode?: string;
  companyName?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productNameZh?: string;
  productNameJa?: string;
  sku?: string;
  quantity: number;
  price: number;
  unitPrice?: number;
  totalPrice: number;
  minQty?: number;
  unit?: string;
  image?: string;
  metadata?: Record<string, any>;
  [key: string]: any;
}

export interface Order {
  id: string;
  userId?: string;
  email: string;
  customerName: string;
  customerNameZh?: string;
  customerNameJa?: string;
  customerPhone: string;
  total: number;
  totalAmount: number;
  subtotal: number;
  shipping: number;
  discount?: number;
  tax?: number;
  currency: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentMethod?: PaymentMethod;
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
  stripePaymentIntentId?: string;
  stripeCustomerId?: string;
  shippingAddress: CustomerInfo | any;
  trackingNumber?: string;
  carrier?: ShippingCarrier;
  shippingMethod?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  notes?: string;
  adminNotes?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  [key: string]: any;
}

// 订单统计类型
export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  averageOrderValue: number;
  topProducts: {
    productId: string | number;
    productName: string;
    quantity: number;
  }[];
  revenueByMonth: {
    month: string;
    revenue: number;
  }[];
}

// ----------------------------------------------------------------------------
// 分类与内容类型
// ----------------------------------------------------------------------------
export interface Category {
  slug: string;
  name: string;
  nameZh?: string;
  nameJa?: string;
  description?: string;
  descriptionZh?: string;
  descriptionJa?: string;
  image?: string;
  ogImage?: string;
  count?: number;
  parentSlug?: string;
  sortOrder?: number;
  isActive?: boolean;
  metadata?: Record<string, any>;
  region?: 'HK' | 'JP' | 'GLOBAL';
  [key: string]: any;
}

export interface PageContent {
  slug: string;
  title: string;
  titleZh?: string;
  titleJa?: string;
  content: string;
  contentZh?: string;
  contentJa?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'profile';
  locale: Locale;
  lastModified?: string;
  [key: string]: any;
}

// ----------------------------------------------------------------------------
// API 与过滤类型
// ----------------------------------------------------------------------------
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
  message?: string;
  timestamp: string;
  region: string;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface SearchParams {
  q: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'relevance' | 'price_asc' | 'price_desc' | 'newest';
  page?: number;
  limit?: number;
  locale: Locale;
}

export interface ProductsFilter {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular';
  page?: number;
  limit?: number;
  locale?: Locale;
}

export type SortByOption = 'price' | 'name';
export const mapSortByToFilter = (sortBy: SortByOption, direction: 'asc' | 'desc' = 'asc'): ProductsFilter['sortBy'] => {
  if (sortBy === 'price') return direction === 'asc' ? 'price-asc' : 'price-desc';
  if (sortBy === 'name') return 'popular';
  return 'price-asc';
};

// ----------------------------------------------------------------------------
// 路由类型
// ----------------------------------------------------------------------------
export interface LocaleRouteParams {
  locale: Locale;
  slug?: string;
  category?: string;
  page?: string;
}

// ----------------------------------------------------------------------------
// Edge 配置类型
// ----------------------------------------------------------------------------
export interface EdgeConfig {
  runtime: 'edge' | 'nodejs';
  regions: string[];
  headers: Record<string, string>;
}

export default {};