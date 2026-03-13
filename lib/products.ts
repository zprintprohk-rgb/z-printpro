// ============================================================================
// 智印港 (z-printpro.com) - 產品數據處理
// 适配：Next.js 14 App Router + Vercel Edge Network + 多语言子目录(/zh-hk /en /ja)
// 优化目标：极致 SEO + GEO (AI 搜索优化)
// ============================================================================

import { Product, ProductsFilter, ApiResponse, Locale, SEOMetadata, GEOCONFIG } from '@/types';
import productsData from '@/data/products-simplified.json';

// 类型断言（确保数据类型安全）
const allProducts = productsData as Product[];

// GEO 配置映射（SEO 核心）
const GEO_CONFIG: Record<Locale, GEOCONFIG> = {
  'zh-hk': {
    region: 'hkg1',
    currency: 'HKD',
    language: 'zh-HK',
    timezone: 'Asia/Hong_Kong'
  },
  'en': {
    region: 'iad1',
    currency: 'USD',
    language: 'en-US',
    timezone: 'UTC'
  },
  'ja': {
    region: 'tyo1',
    currency: 'JPY',
    language: 'ja-JP',
    timezone: 'Asia/Tokyo'
  }
};

// ============================================================================
// 基礎查詢函數（GEO + 多语言 SEO 优化）
// ============================================================================
export function getAllProducts(): Product[] {
  return allProducts;
}

export function getProductCount(): number {
  return allProducts.length;
}

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find(product => product.slug === slug);
}

// 修复：兼容 id 为 string/number 类型
export function getProductById(id: string | number): Product | undefined {
  return allProducts.find(product => String(product.id) === String(id));
}

export function getAllProductSlugs(): string[] {
  return allProducts.map(product => product.slug);
}

// ============================================================================
// SEO 元数据生成（核心优化：修复第76行字段拼写+模板语法）
// ============================================================================
export function getProductSEOMetadata(product: Product, locale: Locale): SEOMetadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://z-printpro.com';
  
  // ✅ 修复：添加兜底值，确保 title 永远为 string
  const title = (locale === 'zh-hk' ? product.nameZh || product.name :
                locale === 'ja' ? product.nameJa || product.name :
                product.name || product.nameZh || product.nameJa) || '智印港 - 专业印刷服务';
  
  // ✅ 修复：description 兜底
  const description = (locale === 'zh-hk' ? product.descriptionZh || product.description || '' :
                      locale === 'ja' ? product.descriptionJa || product.description || '' :
                      product.description || product.descriptionZh || product.descriptionJa || '') || '智印港提供高品质印刷服务，覆盖香港、日本及全球市场';

  return {
    title: `${title} | 智印港 ${locale === 'zh-hk' ? '(香港)' : locale === 'ja' ? '(日本)' : '(Global)'}`,
    description: description.substring(0, 160),
    keywords: product.metaKeywords ? product.metaKeywords.split(',').map(k => k.trim()) : ['印刷服务', '香港印刷', '日本印刷'],
    ogTitle: title, // ✅ 已兜底，确保非 undefined
    ogDescription: description.substring(0, 200),
    ogImage: product.ogImage || product.image || `${baseUrl}/og-default.jpg`,
    canonical: `${baseUrl}/${locale}/products/${product.slug}`,
    locale: locale,
    alternates: {
      'zh-hk': `${baseUrl}/zh-hk/products/${product.slug}`,
      'en': `${baseUrl}/en/products/${product.slug}`,
      'ja': `${baseUrl}/ja/products/${product.slug}`
    }
  };
}

// ============================================================================
// 分類相關函數（SEO 导航优化 + 多语言子目录适配）
// ============================================================================
export function getAllCategories(): { slug: string; name: string; count: number }[] {
  const categories = new Map<string, { slug: string; name: string; count: number }>();
  
  allProducts.forEach(product => {
    const existing = categories.get(product.categorySlug);
    if (existing) {
      existing.count++;
    } else {
      // 多语言分类名优先级（SEO 核心）
      const categoryName = product.category || product.categoryName || product.categorySlug;
      categories.set(product.categorySlug, {
        slug: product.categorySlug,
        name: categoryName,
        count: 1,
      });
    }
  });
  
  return Array.from(categories.values());
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return allProducts.filter(product => product.categorySlug === categorySlug);
}

export function getCategoryProductCount(categorySlug: string): number {
  return getProductsByCategory(categorySlug).length;
}

export function getCategoryInfo(categorySlug: string): { slug: string; name: string; count: number } | undefined {
  const products = getProductsByCategory(categorySlug);
  if (products.length === 0) return undefined;
  
  const categoryName = products[0].category || products[0].categoryName || categorySlug;
  return {
    slug: categorySlug,
    name: categoryName,
    count: products.length,
  };
}

// ============================================================================
// 篩選和排序函數（Edge Runtime 优化 + 类型错误修复）
// ============================================================================
export function filterProducts(filter: ProductsFilter): Product[] {
  let filtered = [...allProducts];
  
  // 按類別篩選
  if (filter.category) {
    filtered = filtered.filter(p => p.categorySlug === filter.category);
  }
  
  // 按價格範圍篩選（GEO 多币种适配）
  if (filter.minPrice !== undefined) {
    filtered = filtered.filter(p => extractPrice(p.price) >= filter.minPrice!);
  }
  if (filter.maxPrice !== undefined) {
    filtered = filtered.filter(p => extractPrice(p.price) <= filter.maxPrice!);
  }
  
  // 按關鍵詞搜索（多语言 SEO 优化：覆盖 zh-hk/en/ja）
  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    filtered = filtered.filter(p => {
      const name = p.name || '';
      const nameZh = p.nameZh || '';
      const nameJa = p.nameJa || '';
      const desc = p.description || '';
      const descZh = p.descriptionZh || '';
      const descJa = p.descriptionJa || '';
      const cat = p.category || p.categorySlug || '';
      
      return name.toLowerCase().includes(searchLower) ||
             nameZh.toLowerCase().includes(searchLower) ||
             nameJa.toLowerCase().includes(searchLower) ||
             desc.toLowerCase().includes(searchLower) ||
             descZh.toLowerCase().includes(searchLower) ||
             descJa.toLowerCase().includes(searchLower) ||
             cat.toLowerCase().includes(searchLower);
    });
  }
  
  // 排序（严格匹配 ProductsFilter 接口 + 修复 parseInt 类型错误）
  if (filter.sortBy) {
    filtered.sort((a, b) => {
      let comparison = 0;
      const sortBy = filter.sortBy as NonNullable<ProductsFilter['sortBy']>;
      
      switch (sortBy) {
        case 'price-asc':
          comparison = extractPrice(a.price) - extractPrice(b.price);
          break;
        case 'price-desc':
          comparison = extractPrice(b.price) - extractPrice(a.price);
          break;
        case 'newest':
          // 核心修复：先转字符串再 parseInt
          comparison = (parseInt(String(b.id)) || 0) - (parseInt(String(a.id)) || 0);
          break;
        case 'popular':
          // 核心修复：先转字符串再 parseInt
          comparison = (parseInt(String(a.id)) || 0) - (parseInt(String(b.id)) || 0);
          break;
        default:
          // 多语言排序优先级（香港主场优先繁体中文）
          if (filter.locale === 'zh-hk' && a.nameZh && b.nameZh) {
            comparison = a.nameZh.localeCompare(b.nameZh, 'zh-HK');
          } else if (filter.locale === 'ja' && a.nameJa && b.nameJa) {
            comparison = a.nameJa.localeCompare(b.nameJa, 'ja-JP');
          } else {
            comparison = (a.name || '').localeCompare(b.name || '', 'en-US');
          }
      }
      
      return comparison;
    });
  }
  
  return filtered;
}

// ============================================================================
// 分頁函數（Edge 缓存优化 + GEO 节点适配）
// ============================================================================
export function getProductsWithPagination(
  page: number = 1,
  limit: number = 12,
  filter?: ProductsFilter
): { products: Product[]; total: number; totalPages: number } {
  const filtered = filter ? filterProducts(filter) : getAllProducts();
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const products = filtered.slice(start, start + limit);
  
  return { products, total, totalPages };
}

// ============================================================================
// 相關產品函數（推荐算法 SEO 优化 + 多语言适配）
// ============================================================================
export function getRelatedProducts(productSlug: string, limit: number = 4): Product[] {
  const product = getProductBySlug(productSlug);
  if (!product) return [];
  
  const sameCategory = allProducts.filter(p => p.categorySlug === product.categorySlug && p.slug !== productSlug);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  
  const otherProducts = allProducts.filter(p => p.categorySlug !== product.categorySlug && p.slug !== productSlug);
  return [...sameCategory, ...otherProducts].slice(0, limit);
}

// GEO 优化：按地区优先级排序热销产品
export function getBestsellerProducts(limit: number = 8, locale: Locale = 'zh-hk'): Product[] {
  const sorted = [...allProducts].sort((a, b) => {
    if (locale === 'zh-hk') {
      return (b.nameZh || '').localeCompare(a.nameZh || '', 'zh-HK');
    } else if (locale === 'ja') {
      return (b.nameJa || '').localeCompare(a.nameJa || '', 'ja-JP');
    } else {
      return (b.name || '').localeCompare(a.name || '', 'en-US');
    }
  });
  return sorted.slice(0, limit);
}

// 修复：新品排序逻辑
export function getNewArrivalProducts(limit: number = 8): Product[] {
  return [...allProducts]
    .sort((a, b) => (parseInt(String(b.id)) || 0) - (parseInt(String(a.id)) || 0))
    .slice(0, limit);
}

// ============================================================================
// 價格處理工具（多币种支持 + GEO 本地化）
// ============================================================================
export function extractPrice(priceInput: string | number): number {
  if (typeof priceInput === 'number') return priceInput;
  const numStr = priceInput.replace(/[^\d.]/g, '');
  return parseFloat(numStr) || 0;
}

// GEO 优化：按地区返回本地化价格范围
export function getPriceRange(locale: Locale = 'zh-hk'): { min: number; max: number; currency: string } {
  const prices = allProducts.map(p => extractPrice(p.price));
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    currency: GEO_CONFIG[locale].currency
  };
}

// ============================================================================
// 搜索建議函數（AI 搜索优化 + 多语言子目录适配）
// ============================================================================
export function getSearchSuggestions(query: string, limit: number = 5, locale: Locale = 'zh-hk'): string[] {
  if (!query || query.length < 2) return [];
  
  const queryLower = query.toLowerCase();
  const suggestions = new Set<string>();
  
  allProducts.forEach(product => {
    // 按语言优先级返回搜索建议
    const name = locale === 'zh-hk' ? product.nameZh || product.name :
                 locale === 'ja' ? product.nameJa || product.name :
                 product.name || product.nameZh || product.nameJa;
                 
    const cat = product.category || product.categorySlug || '';
    
    if (name?.toLowerCase().includes(queryLower)) suggestions.add(name);
    if (cat.toLowerCase().includes(queryLower)) suggestions.add(cat);
  });
  
  return Array.from(suggestions).slice(0, limit);
}

// ============================================================================
// API 響應包裝函數（Edge Network 适配 + GEO 节点优化）
// ============================================================================
export function createSuccessResponse<T>(
  data: T,
  meta?: { page?: number; limit?: number; total?: number }
): ApiResponse<T> {
  return {
    success: true,
    data,
    page: meta?.page,
    limit: meta?.limit,
    total: meta?.total,
    timestamp: new Date().toISOString(),
    region: process.env.VERCEL_REGION || 'hkg1' // 优先香港节点
  };
}

export function createErrorResponse(code: string, message: string): ApiResponse<never> {
  return {
    success: false,
    error: { code, message },
    timestamp: new Date().toISOString(),
    region: process.env.VERCEL_REGION || 'hkg1'
  };
}