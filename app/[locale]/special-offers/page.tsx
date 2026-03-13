import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Locale } from '@/i18n';

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
      ? '包郵套餐專區 | 全港免運費 | 海報傳單印刷優惠 | Z-PrintPro'
      : 'Free Shipping Packages | HK Wide Delivery | Poster & Flyer Deals | Z-PrintPro',
    description: isHK
      ? '香港印刷包郵套餐：小型300x440mm僅HK$99、中型350x500mm僅HK$199、大型510x730mm僅HK$399。全港順豐免費送貨，24小時出貨。'
      : 'Hong Kong printing free shipping packages: Small 300x440mm HK$99, Medium 350x500mm HK$199, Large 510x730mm HK$399. Free SF Express delivery, 24h production.',
    keywords: isHK
      ? ['包郵印刷', '免運費', '香港印刷優惠', '海報印刷套餐']
      : ['free shipping printing', 'Hong Kong printing deal', 'poster package'],
    alternates: {
      canonical: `${baseUrl}/${locale}/special-offers/`,
      languages: {
        'zh-HK': `${baseUrl}/zh-hk/special-offers/`,
        'en': `${baseUrl}/en/special-offers/`,
      }
    },
    // 修复：使用 'website' 替代无效的 'product.group'
    openGraph: {
      title: isHK ? '包郵套餐專區 | 全港免運費 | Z-PrintPro' : 'Free Shipping Packages | Z-PrintPro',
      description: isHK ? '固定三個尺寸，全港順豐直送免運費！' : 'Three fixed sizes with free SF Express delivery!',
      type: 'website', // 修复：改为 website
      images: [{
        url: `${baseUrl}/og-special-offers.jpg`,
        width: 1200,
        height: 630,
        alt: isHK ? '包郵套餐' : 'Free Shipping Packages'
      }],
      locale: isHK ? 'zh_HK' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: isHK ? '包郵套餐專區' : 'Free Shipping Packages',
    },
    other: {
      'geo.region': 'HK',
      'geo.placename': 'Hong Kong',
    }
  };
}

export const runtime = 'experimental-edge';

export default async function SpecialOffersPage({ 
  params: { locale } 
}: Props) {
  setRequestLocale(locale);
  const isHK = locale === 'zh-hk';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://z-printpro.com';

  const packages = [
    {
      id: 'small',
      name: isHK ? '小型套餐' : 'Small Package',
      size: '300 x 440 mm',
      price: 'HK$ 99',
      description: isHK ? '適合小型海報、傳單、菜單' : 'Perfect for small posters, flyers, menus',
      popular: false
    },
    {
      id: 'medium',
      name: isHK ? '中型套餐' : 'Medium Package',
      size: '350 x 500 mm',
      price: 'HK$ 199',
      description: isHK ? '適合中型海報、宣傳單張' : 'Ideal for medium posters, promotional flyers',
      popular: true
    },
    {
      id: 'large',
      name: isHK ? '大型套餐' : 'Large Package',
      size: '510 x 730 mm',
      price: 'HK$ 399',
      description: isHK ? '適合大型海報、背景板' : 'Great for large posters, backdrop banners',
      popular: false
    }
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isHK ? '包郵套餐' : 'Free Shipping Packages',
    itemListElement: packages.map((pkg, index) => ({
      '@type': 'Product',
      position: index + 1,
      name: pkg.name,
      description: pkg.description,
      offers: {
        '@type': 'Offer',
        price: pkg.price.replace(/[^0-9]/g, ''),
        priceCurrency: 'HKD',
        availability: 'https://schema.org/InStock',
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {isHK ? '包郵套餐專區' : 'Free Shipping Packages'}
            </h1>
            <p className="text-xl text-gray-600">
              {isHK ? '固定三個尺寸，全港順豐直送免運費！' : 'Three fixed sizes with free SF Express delivery across Hong Kong!'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden ${pkg.popular ? 'ring-4 ring-blue-500' : ''}`}>
                {pkg.popular && (
                  <div className="bg-blue-500 text-white text-center py-2 font-semibold">
                    {isHK ? '最受歡迎' : 'Most Popular'}
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-4">{pkg.price}</div>
                  <div className="text-gray-600 mb-4">{pkg.size}</div>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  <ul className="space-y-2 mb-8 text-sm text-gray-600">
                    <li>✓ {isHK ? '全港免運費' : 'Free shipping HK wide'}</li>
                    <li>✓ {isHK ? '快速送達' : 'Fast delivery'}</li>
                    <li>✓ {isHK ? '免費設計' : 'Free design'}</li>
                    <li>✓ {isHK ? '防水覆膜' : 'Waterproof lamination'}</li>
                  </ul>
                  <Link
                    href={`https://wa.me/85212345678?text=${encodeURIComponent(
                      isHK ? `我想了解${pkg.name}的詳情` : `I'm interested in the ${pkg.name}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-500 hover:bg-green-600 text-white text-center font-semibold py-3 rounded-xl transition-colors"
                  >
                    {isHK ? 'WhatsApp 查詢' : 'Inquire via WhatsApp'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}