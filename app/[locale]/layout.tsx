import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { locales, type Locale } from '@/i18n';
import { Metadata } from 'next';
import { Inter, Noto_Sans_HK } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const notoSansHK = Noto_Sans_HK({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-hk'
});

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateMetadata({ 
  params: { locale } 
}: Props): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://z-printpro.com';
  const isHK = locale === 'zh-hk';
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s | Z-PrintPro Hong Kong',
      default: isHK 
        ? '智印港 | 香港專業印刷公司 | 名片/傳單/紙袋/包裝盒 | 免費設計＋24小時出貨'
        : 'Z-PrintPro | Professional Printing Hong Kong | Business Cards/Flyers/Bags/Boxes | Free Design + 24H Delivery'
    },
    description: isHK
      ? '香港本地專業印刷公司，提供名片、傳單、紙袋、包裝盒、貼紙、海報等印刷服務。免費專業設計，24小時急速出貨，全港順豐免費送貨。'
      : 'Hong Kong local professional printing company offering business cards, flyers, paper bags, packaging boxes, stickers, posters. Free professional design, 24-hour express delivery, free SF Express shipping.',
    keywords: isHK 
      ? ['香港印刷公司', '名片印刷', '傳單印刷', '紙袋印刷', '包裝盒印刷', '即日印刷', '數碼印刷', '灣仔印刷', '中環印刷', '免費設計', '24小時出貨']
      : ['Hong Kong printing company', 'business card printing', 'flyer printing', 'paper bag printing', 'packaging printing', 'same day printing', 'digital printing', 'Wan Chai printing', 'Central printing', 'free design', '24h delivery'],
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'zh-HK': `${baseUrl}/zh-hk`,
        'en': `${baseUrl}/en`,
        'x-default': `${baseUrl}/zh-hk`
      }
    },
    openGraph: {
      type: 'website',
      locale: isHK ? 'zh_HK' : 'en_US',
      siteName: 'Z-PrintPro',
      url: `${baseUrl}/${locale}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      'geo.region': 'HK',
      'geo.placename': 'Hong Kong',
    }
  };
}

export default async function LocaleLayout({ 
  children, 
  params: { locale } 
}: Props) {
  if (!locales.includes(locale as Locale)) notFound();
  
  // 修复：使用 setRequestLocale 替代 unstable_setRequestLocale
  setRequestLocale(locale);
  
  const messages = await getMessages();
  const isHK = locale === 'zh-hk';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://z-printpro.com';

  return (
    <html 
      lang={isHK ? 'zh-HK' : 'en'} 
      className={`${inter.variable} ${notoSansHK.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'LocalBusiness',
                  '@id': `${baseUrl}/#localbusiness`,
                  name: 'Z-PrintPro',
                  alternateName: isHK ? ['智印港', 'Z-PrintPro Hong Kong'] : ['Z-PrintPro Hong Kong', '智印港'],
                  url: `${baseUrl}/${locale}`,
                  telephone: '+852-0000-0000',
                  email: 'info@z-printpro.com',
                  priceRange: '$$',
                  address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'HK',
                    addressLocality: 'Hong Kong',
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 22.3193,
                    longitude: 114.1694
                  },
                  areaServed: {
                    '@type': 'City',
                    name: 'Hong Kong'
                  },
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.9',
                    reviewCount: '328',
                    bestRating: '5'
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${isHK ? notoSansHK.className : inter.className} antialiased`} style={{ backgroundColor: 'hsl(210 20% 98%)' }}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}