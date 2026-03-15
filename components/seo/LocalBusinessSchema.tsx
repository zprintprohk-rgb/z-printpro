import React from 'react';

interface LocalBusinessSchemaProps {
  locale: string;
}

export function LocalBusinessSchema({ locale }: LocalBusinessSchemaProps) {
  const content = {
    'zh-HK': {
      name: '智印港 Z-PrintPro',
      description: '香港專業宣傳單張印刷服務，24 小時極速交付，最低 100 張起印',
      serviceArea: '香港全境',
      serviceName: '宣傳單張印刷',
      serviceDescription: '24 小時香港交付，最低 100 張起印'
    },
    'en': {
      name: 'Z-PrintPro',
      description: 'Professional flyer printing service in Hong Kong, 24-hour delivery, minimum 100 copies',
      serviceArea: 'Hong Kong',
      serviceName: 'Flyer Printing',
      serviceDescription: '24-hour Hong Kong delivery, minimum 100 copies'
    },
    'ja': {
      name: 'Z-PrintPro',
      description: '香港のプロフェッショナルなチラシ印刷サービス、24 時間配送、最低 100 部から',
      serviceArea: '香港',
      serviceName: 'チラシ印刷',
      serviceDescription: '24 時間香港配送、最低 100 部から'
    }
  };

  const currentContent = content[locale as keyof typeof content] || content['zh-HK'];

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": currentContent.name,
    "description": currentContent.description,
    "areaServed": {
      "@type": "City",
      "name": currentContent.serviceArea
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "HK",
      "addressLocality": "Hong Kong"
    },
    "priceRange": "$$",
    "openingHours": "Mo-Su 00:00-23:59",
    "telephone": "+852-1234-5678",
    "email": "info@z-printpro.com",
    "url": "https://z-printpro.com",
    "image": "https://z-printpro.com/og-image.jpg",
    "sameAs": [
      "https://www.facebook.com/zprintpro",
      "https://www.instagram.com/zprintpro"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "256",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": locale === 'zh-HK' ? '印刷服務目錄' : locale === 'en' ? 'Printing Services Catalog' : '印刷サービスカタログ',
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": currentContent.serviceName,
            "description": currentContent.serviceDescription,
            "areaServed": {
              "@type": "City",
              "name": currentContent.serviceArea
            },
            "availableOffer": {
              "@type": "Offer",
              "priceCurrency": "HKD",
              "price": "32",
              "availability": "https://schema.org/InStock",
              "url": "https://z-printpro.com/zh-hk/products/flyers"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'zh-HK' ? '紙袋印刷' : locale === 'en' ? 'Paper Bag Printing' : '紙袋印刷',
            "description": locale === 'zh-HK' ? '環保紙袋印刷，多種尺寸選擇' : locale === 'en' ? 'Eco-friendly paper bag printing, multiple sizes available' : '環境に優しい紙袋印刷、複数サイズ利用可能',
            "availableOffer": {
              "@type": "Offer",
              "priceCurrency": "HKD",
              "price": "199",
              "availability": "https://schema.org/InStock",
              "url": "https://z-printpro.com/zh-hk/products/paper-bags"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'zh-HK' ? '貼紙印刷' : locale === 'en' ? 'Sticker Printing' : 'ステッカー印刷',
            "description": locale === 'zh-HK' ? '高精度貼紙印刷，多種材質選擇' : locale === 'en' ? 'High-precision sticker printing, multiple materials available' : '高精度ステッカー印刷、複数素材利用可能',
            "availableOffer": {
              "@type": "Offer",
              "priceCurrency": "HKD",
              "price": "89",
              "availability": "https://schema.org/InStock",
              "url": "https://z-printpro.com/zh-hk/products/stickers"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'zh-HK' ? '包裝盒印刷' : locale === 'en' ? 'Packaging Box Printing' : '梱包箱印刷',
            "description": locale === 'zh-HK' ? '定制包裝盒印刷，增強品牌形象' : locale === 'en' ? 'Custom packaging box printing, enhance brand image' : 'カスタム梱包箱印刷、ブランドイメージ強化',
            "availableOffer": {
              "@type": "Offer",
              "priceCurrency": "HKD",
              "price": "299",
              "availability": "https://schema.org/InStock",
              "url": "https://z-printpro.com/zh-hk/products/packaging-boxes"
            }
          }
        }
      ]
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.3193,
      "longitude": 114.1694
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}