import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server'; // 修复：使用 setRequestLocale
import { getProductBySlug, getAllProductSlugs, getRelatedProducts } from '@/lib/products';
import type { Locale } from '@/i18n';

interface Props {
  params: {
    slug: string;
    locale: Locale;
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  
  if (!slugs || slugs.length === 0) {
    return [
      { locale: 'zh-hk' as const, slug: 'business-card-one-box' },
      { locale: 'en' as const, slug: 'business-card-one-box' }
    ];
  }
  
  const locales: Locale[] = ['zh-hk', 'en'];
  return locales.flatMap(locale => 
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ 
  params: { slug, locale }
}: Props): Promise<Metadata> {
  const product = getProductBySlug(slug);
  
  if (!product) {
    return {
      title: locale === 'zh-hk' ? '產品未找到 | Z-PrintPro' : 'Product Not Found | Z-PrintPro',
      robots: { index: false, follow: true },
    };
  }
  
  const isHK = locale === 'zh-hk';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://z-printpro.com';
  const productName = isHK ? product.nameZh : product.name;
  
  return {
    title: `${productName} | ${isHK ? '訂購' : 'Order'} | Z-PrintPro Hong Kong`,
    description: product.description || (isHK ? '專業印刷產品' : 'Professional printing product'),
    alternates: {
      canonical: `${baseUrl}/${locale}/products/${slug}/`,
    },
    openGraph: {
      title: `${productName} | Z-PrintPro`,
      type: 'website',
      images: product.image ? [{ url: product.image, width: 800, height: 800 }] : undefined,
    },
  };
}

export default async function ProductPage({ 
  params: { slug, locale }
}: Props) {
  // 修复：使用 setRequestLocale
  setRequestLocale(locale);
  
  const product = getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  const isHK = locale === 'zh-hk';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://z-printpro.com';
  const productName = isHK ? product.nameZh : product.name;
  const currentPrice = product.price ? String(product.price).replace(/[^0-9.]/g, '') : '0';
  const canonicalUrl = `${baseUrl}/${locale}/products/${slug}/`;
  
  const productSchema = {
    '@context': 'https://schema.org',
    '@graph': [
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
            name: product.category,
            item: `${baseUrl}/${locale}/category/${product.categorySlug}/`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: productName,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'Product',
        name: productName,
        image: product.image || `${baseUrl}/placeholder-product.jpg`,
        sku: (product as any).sku || `${product.categorySlug}-${slug}`,
        brand: { '@type': 'Brand', name: 'Z-PrintPro' },
        offers: {
          '@type': 'Offer',
          url: canonicalUrl,
          priceCurrency: 'HKD',
          price: currentPrice,
          availability: (product as any).stock !== 0 
            ? 'https://schema.org/InStock' 
            : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'LocalBusiness',
            name: 'Z-PrintPro',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'HK',
              addressLocality: 'Hong Kong',
            },
          },
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li><Link href={`/${locale}/`}>{isHK ? '首頁' : 'Home'}</Link></li>
              <span>/</span>
              <li><Link href={`/${locale}/category/${product.categorySlug}/`}>{product.category}</Link></li>
              <span>/</span>
              <li className="text-gray-900 font-medium">{productName}</li>
            </ol>
          </div>
        </nav>

        <article className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                {product.image ? (
                  <img src={product.image} alt={productName} className="w-full h-full object-cover" width={800} height={800} />
                ) : (
                  <span className="text-6xl">🖨️</span>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{product.category}</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {(product as any).stock !== 0 ? (isHK ? '有現貨' : 'In Stock') : (isHK ? '暫時缺貨' : 'Out of Stock')}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{productName}</h1>
              
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description || (isHK ? '暫無產品描述' : 'No product description')}
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="text-amber-800 font-medium text-lg mb-2">
                  {isHK ? '價格因規格而異' : 'Price varies by specifications'}
                </div>
                <p className="text-amber-700 text-2xl font-bold">
                  {product.price || (isHK ? '請諮詢' : 'Contact us')}
                </p>
              </div>
              
              <a
                href={`https://wa.me/85212345678?text=${encodeURIComponent(
                  isHK ? `您好，我想了解 ${productName} 的詳細報價` : `Hi, I'd like to get a quote for ${productName}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <span>💬</span>
                {isHK ? 'WhatsApp 即時詢價' : 'Get Quote via WhatsApp'}
              </a>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}