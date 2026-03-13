// app/[locale]/category/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { getProductsByCategory, getAllCategories, getCategoryInfo } from '@/lib/products'

// ✅ ISR：每 60 秒重新验证（SEO 新鲜度 vs 性能平衡）
export const revalidate = 60

// ✅ 静态生成所有分类（构建时生成，SEO 抓取速度极快）
export async function generateStaticParams() {
  const categories = getAllCategories()
  
  if (!categories || categories.length === 0) {
    return [
      { locale: 'zh-hk', slug: 'business-cards' },
      { locale: 'en', slug: 'business-cards' }
    ]
  }
  
  const locales = ['zh-hk', 'en']
  return locales.flatMap(locale => 
    categories.map((cat) => ({ locale, slug: cat.slug }))
  )
}

// ✅ 极致 SEO Metadata（包含 hreflang 和地理位置）
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string; locale: string } 
}): Promise<Metadata> {
  const categoryInfo = getCategoryInfo(params.slug)
  
  if (!categoryInfo) {
    return {
      title: 'Category Not Found | Z-PrintPro',
      robots: { index: false }
    }
  }
  
  const isHK = params.locale === 'zh-hk'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://z-printpro.com'
  const canonicalUrl = `${baseUrl}/${params.locale}/category/${params.slug}/`
  
  const title = isHK 
    ? `${categoryInfo.name} | 香港專業印刷 | Z-PrintPro`
    : `${categoryInfo.name} | Professional Printing Hong Kong | Z-PrintPro`
    
  const description = isHK
    ? `智印港專業提供${categoryInfo.name}印刷服務，共${categoryInfo.count}款產品。即日報價，免費送貨，適合香港企業。`
    : `Professional ${categoryInfo.name} printing services in Hong Kong. ${categoryInfo.count} products with same-day quotes and free delivery.`

  return {
    title,
    description,
    keywords: [
      categoryInfo.name,
      '印刷',
      'Printing',
      'Hong Kong',
      '香港',
      '即日交貨',
      'Same day delivery',
      '企業印刷',
      'Business printing'
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'zh-HK': `${baseUrl}/zh-hk/category/${params.slug}/`,
        'zh-CN': `${baseUrl}/zh-cn/category/${params.slug}/`,
        'en': `${baseUrl}/en/category/${params.slug}/`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Z-PrintPro',
      locale: isHK ? 'zh_HK' : 'en_US',
      images: [{
        url: `${baseUrl}/og-category-${params.slug}.jpg`, // 建议准备分类 OG 图
        width: 1200,
        height: 630,
        alt: categoryInfo.name,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    // GEO 本地 SEO 标签
    other: {
      'geo.region': 'HK',
      'geo.placename': 'Hong Kong',
      'ICBM': '22.3193, 114.1694', // 香港坐标
    },
  }
}

export default async function CategoryPage({ 
  params 
}: { 
  params: { slug: string; locale: string } 
}) {
  const { slug, locale } = params
  
  const categoryInfo = getCategoryInfo(slug)
  const products = getProductsByCategory(slug)
  
  if (!categoryInfo) {
    notFound()
  }

  const isHK = locale === 'zh-hk'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://z-printpro.com'
  
  // ✅ Schema.org 结构化数据（GEO 关键：让 Google AI 理解内容层级）
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. 面包屑导航（BreadcrumbList）- 对 SEO 导航至关重要
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isHK ? '首頁' : 'Home',
            item: `${baseUrl}/${locale}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isHK ? '產品分類' : 'Products',
            item: `${baseUrl}/${locale}/products/`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: categoryInfo.name,
            item: `${baseUrl}/${locale}/category/${slug}/`,
          },
        ],
      },
      // 2. 集合页面（CollectionPage）+ 项目列表（ItemList）
      {
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/${locale}/category/${slug}/`,
        url: `${baseUrl}/${locale}/category/${slug}/`,
        name: categoryInfo.name,
        description: isHK 
          ? `${categoryInfo.name}印刷產品列表`
          : `${categoryInfo.name} printing products`,
        inLanguage: locale === 'zh-hk' ? 'zh-Hant-HK' : 'en-HK',
        isPartOf: {
          '@type': 'WebSite',
          name: 'Z-PrintPro',
          url: `${baseUrl}/${locale}/`,
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: products.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Product',
              name: isHK ? product.nameZh : product.name,
              url: `${baseUrl}/${locale}/products/${product.slug}/`,
              image: product.image || `${baseUrl}/placeholder.jpg`,
              offers: {
                '@type': 'Offer',
                priceCurrency: 'HKD',
                availability: 'https://schema.org/InStock',
                url: `${baseUrl}/${locale}/products/${product.slug}/`,
              },
            },
          })),
        },
      },
      // 3. 本地商家信息（对 Hong Kong 本地 SEO 极其重要）
      {
        '@type': 'LocalBusiness',
        '@id': `${baseUrl}/#business`,
        name: 'Z-PrintPro',
        image: `${baseUrl}/logo.png`,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'HK',
          addressLocality: 'Hong Kong',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 22.3193,
          longitude: 114.1694,
        },
        url: baseUrl,
        telephone: '+852-0000-0000',
        priceRange: '$$',
        areaServed: 'Hong Kong',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: categoryInfo.name,
          itemListElement: products.map(p => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: isHK ? p.nameZh : p.name,
            },
          })),
        },
      },
    ],
  }

  return (
    <>
      {/* ✅ JSON-LD 注入（放在 head 供搜索引擎抓取） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* 面包屑导航（带 Schema 标记） */}
        <nav className="bg-white border-b" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center gap-2 text-sm text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href={`/${locale}/`} className="hover:text-blue-600" itemProp="item">
                  <span itemProp="name">{isHK ? '首頁' : 'Home'}</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <span>/</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href={`/${locale}/products/`} className="hover:text-blue-600" itemProp="item">
                  <span itemProp="name">{isHK ? '產品' : 'Products'}</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <span>/</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className="text-gray-900 font-medium" itemProp="name">{categoryInfo.name}</span>
                <meta itemProp="position" content="3" />
                <meta itemProp="item" content={`${baseUrl}/${locale}/category/${slug}/`} />
              </li>
            </ol>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          {/* H1 标题优化 */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {categoryInfo.name}
              <span className="block text-lg font-normal text-gray-600 mt-2">
                {isHK 
                  ? `香港專業${categoryInfo.name}印刷服務` 
                  : `Professional ${categoryInfo.name} Printing in Hong Kong`}
              </span>
            </h1>
            <p className="text-gray-600">
              {isHK 
                ? `共 ${categoryInfo.count} 個產品 • 即日報價 • 免費送貨` 
                : `${categoryInfo.count} products • Same-day quotes • Free delivery`}
            </p>
          </header>
          
          {/* 产品网格（带 Schema itemList 标记） */}
          {products.length > 0 ? (
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              itemScope 
              itemType="https://schema.org/ItemList"
            >
              {products.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/${locale}/products/${product.slug}/`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  itemProp="itemListElement" 
                  itemScope 
                  itemType="https://schema.org/ListItem"
                >
                  <meta itemProp="position" content={`${index + 1}`} />
                  <div itemProp="item" itemScope itemType="https://schema.org/Product">
                    {/* 产品图片（SEO 优化：添加 width/height） */}
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-colors">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={isHK ? `${product.nameZh} - ${categoryInfo.name}印刷` : `${product.name} - ${categoryInfo.name} Printing`}
                          className="w-full h-full object-cover"
                          width={400}
                          height={400}
                          loading={index < 4 ? "eager" : "lazy"} // 首屏图片优先加载
                          itemProp="image"
                        />
                      ) : (
                        <span className="text-5xl" role="img" aria-label="printer">🖨️</span>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">
                        {product.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 mt-1 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2" itemProp="name">
                        {isHK ? product.nameZh || product.name : product.name}
                      </h3>
                      <div className="flex items-center justify-between" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                        <meta itemProp="priceCurrency" content="HKD" />
                        <span className="text-blue-600 font-bold" itemProp="price">
                          {product.price || (isHK ? '請諮詢' : 'Contact us')}
                        </span>
                        <link itemProp="availability" href="https://schema.org/InStock" />
                        <span className="text-xs text-gray-500">
                          {isHK ? `最少 ${product.minQty} 件` : `Min ${product.minQty} pcs`}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <div className="text-6xl mb-4" role="img" aria-label="package">📦</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {isHK ? '此分類暫無產品' : 'No products in this category'}
              </h2>
            </div>
          )}
        </div>

        {/* CTA 区域 */}
        <div className="container mx-auto px-4 pb-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {isHK ? '找不到想要的產品？' : 'Can\'t find what you need?'}
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {isHK 
                ? '聯繫我們的香港客服團隊，提供定制化解決方案。'
                : 'Contact our Hong Kong support team for customized solutions.'}
            </p>
            <Link
              href={`/${locale}/contact/`}
              className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              {isHK ? '立即諮詢' : 'Get Quote Now'}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}