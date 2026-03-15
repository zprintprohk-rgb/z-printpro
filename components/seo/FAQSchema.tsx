import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  locale: string;
  faqs: FAQItem[];
}

export function FAQSchema({ locale, faqs }: FAQSchemaProps) {
  const defaultFAQs = faqs.length > 0 ? faqs : getDefaultFAQs(locale);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": defaultFAQs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

function getDefaultFAQs(locale: string): FAQItem[] {
  const faqContent = {
    'zh-HK': [
      {
        question: '宣傳單張最低起印量是多少？',
        answer: '我們的宣傳單張最低起印量為 100 張，提供多種尺寸選擇（A4、A5、A6 等）。'
      },
      {
        question: '宣傳單張印刷需要多長時間？',
        answer: '標準訂單通常需要 1-2 個工作日完成，急單可提供 24 小時加急服務。'
      },
      {
        question: '你們提供什麼類型的紙張？',
        answer: '我們提供多種紙張選擇，包括光面紙、啞面紙、藝術紙、再生紙等，滿足不同需求。'
      },
      {
        question: '可以提供設計服務嗎？',
        answer: '是的，我們提供專業設計服務。如果您已有設計稿，也可以直接上傳印刷。'
      },
      {
        question: '配送方式有哪些？',
        answer: '我們與順豐速運合作，提供香港全境配送服務。訂單滿 HK$100 可享受免費配送。'
      },
      {
        question: '如何確保印刷品質？',
        answer: '我們使用先進的印刷設備和嚴格的品質控制流程，確保每一份印刷品都達到專業標準。'
      },
      {
        question: '是否提供樣品確認？',
        answer: '是的，對於大型訂單，我們可以提供數碼樣品確認，確保印刷效果符合您的預期。'
      },
      {
        question: '付款方式有哪些？',
        answer: '我們接受多種付款方式，包括信用卡、PayPal、支付寶、微信支付和銀行轉賬。'
      }
    ],
    'en': [
      {
        question: 'What is the minimum order quantity for flyers?',
        answer: 'Our minimum order quantity for flyers is 100 copies. We offer various size options including A4, A5, A6, etc.'
      },
      {
        question: 'How long does flyer printing take?',
        answer: 'Standard orders typically take 1-2 business days. Urgent orders can be completed within 24 hours.'
      },
      {
        question: 'What types of paper do you offer?',
        answer: 'We offer various paper options including glossy paper, matte paper, art paper, recycled paper, and more to meet different needs.'
      },
      {
        question: 'Do you provide design services?',
        answer: 'Yes, we provide professional design services. You can also upload your own design files for printing.'
      },
      {
        question: 'What delivery methods are available?',
        answer: 'We partner with SF Express to provide delivery services across Hong Kong. Free shipping is available for orders over HK$100.'
      },
      {
        question: 'How do you ensure print quality?',
        answer: 'We use advanced printing equipment and strict quality control processes to ensure every print job meets professional standards.'
      },
      {
        question: 'Do you provide proof samples?',
        answer: 'Yes, for large orders we can provide digital proof samples to ensure the printing results meet your expectations.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept various payment methods including credit cards, PayPal, Alipay, WeChat Pay, and bank transfer.'
      }
    ],
    'ja': [
      {
        question: 'チラシの最低発注部数は？',
        answer: 'チラシの最低発注部数は100部です。A4、A5、A6など、様々なサイズをご提供しています。'
      },
      {
        question: 'チラシ印刷にはどのくらい時間がかかりますか？',
        answer: '標準的な注文は通常1〜2営業日で完了します。緊急注文は24時間以内で対応可能です。'
      },
      {
        question: 'どのような紙の種類を提供していますか？',
        answer: '光沢紙、マット紙、アート紙、再生紙など、様々な紙の種類をご提供しており、ニーズに合わせて選べます。'
      },
      {
        question: 'デザインサービスを提供していますか？',
        answer: 'はい、プロフェッショナルなデザインサービスをご提供しています。ご自身のデザインファイルをアップロードして印刷も可能です。'
      },
      {
        question: 'どのような配送方法がありますか？',
        answer: 'SFエクスプレスと提携し、香港全土への配送サービスを提供しています。HK$100以上のご注文で送料無料がございます。'
      },
      {
        question: '印刷品質をどのように保証していますか？',
        answer: '先進的な印刷設備と厳格な品質管理プロセスを使用し、すべての印刷物がプロフェッショナルな基準を満たすことを保証します。'
      },
      {
        question: 'プルーフサンプルを提供していますか？',
        answer: 'はい、大量注文の場合、印刷結果が期待通りであることを確認するためにデジタルプルーフサンプルを提供できます。'
      },
      {
        question: 'どのような支払い方法を受け付けていますか？',
        answer: 'クレジットカード、PayPal、Alipay、WeChat Pay、銀行振込など、様々な支払い方法を受け付けています。'
      }
    ]
  };

  return faqContent[locale as keyof typeof faqContent] || faqContent['zh-HK'];
}