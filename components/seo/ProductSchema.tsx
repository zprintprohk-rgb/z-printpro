import React from 'react';

interface ProductSchemaProps {
  locale: string;
  product: {
    name: string;
    description: string;
    image?: string;
    price?: number;
    currency?: string;
    availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
    category?: string;
    brand?: string;
    sku?: string;
    reviews?: {
      ratingValue: number;
      reviewCount: number;
    };
  };
}

export function ProductSchema({ locale, product }: ProductSchemaProps) {
  const defaultProduct = {
    ...product,
    image: product.image || 'https://z-printpro.com/product-default.jpg',
    price: product.price || 0,
    currency: product.currency || 'HKD',
    availability: product.availability || 'InStock',
    brand: product.brand || 'Z-PrintPro',
    reviews: product.reviews || { ratingValue: 4.8, reviewCount: 0 }
  };

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": defaultProduct.name,
    "description": defaultProduct.description,
    "image": defaultProduct.image,
    "sku": defaultProduct.sku,
    "brand": {
      "@type": "Brand",
      "name": defaultProduct.brand
    },
    "offers": {
      "@type": "Offer",
      "url": `https://z-printpro.com/${locale}/products/${defaultProduct.sku}`,
      "priceCurrency": defaultProduct.currency,
      "price": defaultProduct.price,
      "priceValidUntil": "2026-12-31",
      "availability": `https://schema.org/${defaultProduct.availability}`,
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": defaultProduct.brand
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": defaultProduct.currency
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "HK"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "businessDays": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ]
          },
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 1,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          }
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": defaultProduct.reviews.ratingValue,
      "reviewCount": defaultProduct.reviews.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    },
    "category": defaultProduct.category,
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": locale === 'zh-HK' ? '服務地區' : locale === 'en' ? 'Service Area' : 'サービスエリア',
        "value": locale === 'zh-HK' ? '香港全境' : locale === 'en' ? 'Hong Kong' : '香港'
      },
      {
        "@type": "PropertyValue",
        "name": locale === 'zh-HK' ? '配送方式' : locale === 'en' ? 'Delivery Method' : '配送方法',
        "value": locale === 'zh-HK' ? '順豐速運' : locale === 'en' ? 'SF Express' : 'SF Express'
      },
      {
        "@type": "PropertyValue",
        "name": locale === 'zh-HK' ? '保固期' : locale === 'en' ? 'Warranty' : '保証期間',
        "value": locale === 'zh-HK' ? '印刷品質保證' : locale === 'en' ? 'Print Quality Guaranteed' : '印刷品質保証'
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}