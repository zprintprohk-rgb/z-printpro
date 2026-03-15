import React from 'react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  locale: string;
  items: BreadcrumbItem[];
  baseUrl?: string;
}

export function BreadcrumbSchema({ locale, items, baseUrl = 'https://z-printpro.com' }: BreadcrumbSchemaProps) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}/${locale}${item.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList, null, 2) }}
    />
  );
}

// Helper function to generate breadcrumbs for different page types
export function generateBreadcrumbs(locale: string, pageType: string, params?: Record<string, string>): BreadcrumbItem[] {
  const breadcrumbLabels = {
    'zh-HK': {
      home: '首頁',
      products: '產品服務',
      categories: '分類',
      cart: '購物車',
      checkout: '結賬',
      account: '我的賬戶',
      aiStudio: 'AI 定制',
      specialOffers: '包郵套餐',
      contact: '聯絡我們',
      faq: '常見問題',
      designGuide: '設計指南',
      shipping: '配送方式',
      payment: '付款方式'
    },
    'en': {
      home: 'Home',
      products: 'Products',
      categories: 'Categories',
      cart: 'Cart',
      checkout: 'Checkout',
      account: 'My Account',
      aiStudio: 'AI Studio',
      specialOffers: 'Special Offers',
      contact: 'Contact Us',
      faq: 'FAQ',
      designGuide: 'Design Guide',
      shipping: 'Shipping',
      payment: 'Payment'
    },
    'ja': {
      home: 'ホーム',
      products: '製品',
      categories: 'カテゴリー',
      cart: 'カート',
      checkout: 'チェックアウト',
      account: 'マイアカウント',
      aiStudio: 'AI スタジオ',
      specialOffers: '特別オファー',
      contact: 'お問い合わせ',
      faq: 'よくある質問',
      designGuide: 'デザインガイド',
      shipping: '配送方法',
      payment: '支払い方法'
    }
  };

  const labels = breadcrumbLabels[locale as keyof typeof breadcrumbLabels] || breadcrumbLabels['zh-HK'];

  const breadcrumbs: BreadcrumbItem[] = [
    { name: labels.home, url: '' }
  ];

  switch (pageType) {
    case 'home':
      break;
    
    case 'products':
      breadcrumbs.push({ name: labels.products, url: '/products' });
      break;
    
    case 'category':
      breadcrumbs.push({ name: labels.products, url: '/products' });
      breadcrumbs.push({ name: labels.categories, url: '/category' });
      if (params?.slug) {
        breadcrumbs.push({ name: params.slug, url: `/category/${params.slug}` });
      }
      break;
    
    case 'product':
      breadcrumbs.push({ name: labels.products, url: '/products' });
      if (params?.category) {
        breadcrumbs.push({ name: params.category, url: `/category/${params.category}` });
      }
      if (params?.slug) {
        breadcrumbs.push({ name: params.slug, url: `/products/${params.slug}` });
      }
      break;
    
    case 'cart':
      breadcrumbs.push({ name: labels.cart, url: '/cart' });
      break;
    
    case 'checkout':
      breadcrumbs.push({ name: labels.checkout, url: '/checkout' });
      break;
    
    case 'account':
      breadcrumbs.push({ name: labels.account, url: '/account' });
      break;
    
    case 'aiStudio':
      breadcrumbs.push({ name: labels.aiStudio, url: '/ai-studio' });
      break;
    
    case 'specialOffers':
      breadcrumbs.push({ name: labels.specialOffers, url: '/special-offers' });
      break;
    
    case 'contact':
      breadcrumbs.push({ name: labels.contact, url: '/contact' });
      break;
    
    case 'faq':
      breadcrumbs.push({ name: labels.faq, url: '/faq' });
      break;
    
    case 'designGuide':
      breadcrumbs.push({ name: labels.designGuide, url: '/design-guide' });
      break;
    
    case 'shipping':
      breadcrumbs.push({ name: labels.shipping, url: '/shipping' });
      break;
    
    case 'payment':
      breadcrumbs.push({ name: labels.payment, url: '/payment' });
      break;
    
    default:
      break;
  }

  return breadcrumbs;
}