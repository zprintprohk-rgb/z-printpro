import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { locales, type Locale } from '@/i18n';
import { Metadata } from 'next';
import { Inter, Noto_Sans_HK } from 'next/font/google';
import '@/styles/globals.css';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { ProductSchema } from '@/components/seo/ProductSchema';

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
  const isEn = locale === 'en';
  const isJa = locale === 'ja';
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s | Z-PrintPro Hong Kong',
      default: isHK 
        ? '智印港 | 香港專業印刷公司 | 宣傳單｜紙袋印刷｜貼紙印刷｜包裝盒定制 | 免費設計＋24小時出貨'
        : isJa
        ? 'Z-PrintPro | 香港プロ印刷会社 | 宣伝票｜紙袋印刷｜ステッカー印刷｜梱包印刷 | 無料設計＋24時間出荷'
        : 'Z-PrintPro | Hong Kong Printing | Flyers｜Paper Bags｜Stickers｜Custom Boxes | Free Design + 24H Delivery'
    },
    description: isHK
      ? '香港本地專業印刷公司，專注於宣傳單張、紙袋印刷、貼紙印刷、包裝盒定制。免費專業設計，24小時急速出貨，全港順豐免費送貨。智印港提供高品質印刷服務，滿足您的商業印刷需求。'
      : isJa
        ? '香港のローカルプロ印刷会社。チラシ印刷、紙袋印刷、ステッカー印刷、梱包印刷に特化。無料でプロな設計、24時間急速出荷、全香港SF Express送料無料。'
        : 'Hong Kong local professional printing company specializing in flyers, paper bags, stickers, and custom packaging boxes. Free professional design, 24-hour express delivery, free SF Express shipping across Hong Kong.',
    keywords: isHK
      ? ['香港印刷公司', '宣傳單印刷', '紙袋印刷', '貼紙印刷', '包裝盒定制', '即日印刷', '數碼印刷', '灣仔印刷', '中環印刷', '免費設計', '24小時出貨', '智印港', '香港印刷服務']
      : isJa
        ? ['香港印刷会社', 'チラシ印刷', '紙袋印刷', 'ステッカー印刷', '梱包印刷', '即日印刷', 'デジタル印刷', '灣仔印刷', '中環印刷', '無料設計', '24時間出荷', 'Z-PrintPro', '香港印刷サービス']
        : ['Hong Kong printing company', 'flyer printing', 'paper bag printing', 'sticker printing', 'custom boxes', 'same day printing', 'digital printing', 'Wan Chai printing', 'Central printing', 'free design', '24h delivery', 'Z-PrintPro', 'Hong Kong printing services'],
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'zh-HK': `${baseUrl}/zh-hk`,
        'en': `${baseUrl}/en`,
        'ja': `${baseUrl}/ja`,
        'x-default': `${baseUrl}/zh-hk`
      }
    },
    openGraph: {
      type: 'website',
      locale: isHK ? 'zh_HK' : (isJa ? 'ja_JP' : 'en_US'),
      siteName: isHK ? '智印港' : 'Z-PrintPro',
      url: `${baseUrl}/${locale}`,
      title: isHK 
        ? '智印港 | 香港專業印刷公司'
        : isJa
        ? 'Z-PrintPro | 香港プロ印刷会社'
        : 'Z-PrintPro | Hong Kong Professional Printing',
      description: isHK
        ? '香港本地專業印刷公司，專注於宣傳單張、紙袋印刷、貼紙印刷、包裝盒定制。免費專業設計，24小時急速出貨。'
        : isJa
        ? '香港のローカルプロ印刷会社。チラシ印刷、紙袋印刷、ステッカー印刷、梱包印刷に特化。'
        : 'Hong Kong local professional printing company specializing in flyers, paper bags, stickers, and custom packaging boxes.',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: isHK ? '智印港 Logo' : 'Z-PrintPro Logo',
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: isHK 
        ? '智印港 | 香港專業印刷公司'
        : isJa
        ? 'Z-PrintPro | 香港プロ印刷会社'
        : 'Z-PrintPro | Hong Kong Professional Printing',
      description: isHK
        ? '香港本地專業印刷公司，專注於宣傳單張、紙袋印刷、貼紙印刷、包裝盒定制。免費專業設計，24小時急速出貨。'
        : isJa
        ? '香港のローカルプロ印刷会社。チラシ印刷、紙袋印刷、ステッカー印刷、梱包印刷に特化。'
        : 'Hong Kong local professional printing company specializing in flyers, paper bags, stickers, and custom packaging boxes.',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: isHK ? '智印港 Logo' : 'Z-PrintPro Logo',
        }
      ]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    other: {
      'geo.region': 'HK',
      'geo.placename': 'Hong Kong',
      'geo.position': '22.3193;114.1694',
      'ICBM': 'Hong Kong',
      'DC.Title': isHK ? '智印港 - 香港專業印刷公司' : 'Z-PrintPro - Hong Kong Professional Printing',
      'DC.Description': isHK
        ? '香港本地專業印刷公司，專注於宣傳單張、紙袋印刷、貼紙印刷、包裝盒定制。免費專業設計，24小時急速出貨。'
        : 'Hong Kong local professional printing company specializing in flyers, paper bags, stickers, and custom packaging boxes.',
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
  const isJa = locale === 'ja';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://z-printpro.com';

  return (
    <html 
      lang={isHK ? 'zh-HK' : (isJa ? 'ja' : 'en')} 
      className={`${inter.variable} ${notoSansHK.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* LocalBusiness Schema - Integrated from components/seo/LocalBusinessSchema */}
        <LocalBusinessSchema locale={locale} />
        
        {/* Breadcrumb Schema - Will be added in individual pages */}
        {/* <BreadcrumbSchema locale={locale} items={[...]} /> */}
        
        {/* FAQ Schema - Will be added in FAQ page */}
        {/* <FAQSchema locale={locale} faqs={[...]} /> */}
        
        {/* Product Schema - Will be added in product pages */}
        {/* <ProductSchema locale={locale} product={...} /> */}
      </head>
      <body className={`${isHK ? notoSansHK.className : inter.className} antialiased`} style={{ backgroundColor: 'hsl(210 20% 98%)' }}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}