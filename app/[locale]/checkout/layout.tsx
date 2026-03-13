import { Metadata } from 'next';

// SEO 安全：结账页面严格禁止索引（保护支付信息、个人数据）
export const metadata: Metadata = {
  title: 'Secure Checkout | Z-PrintPro Hong Kong',
  description: 'Secure payment processing for your printing order.',
  robots: { 
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,   // 禁止归档缓存
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-snippet': 0, // 禁止显示摘要
    }
  },
  // 安全头部指示
  other: {
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
  }
};

// Edge Network 优化
export const runtime = 'experimental-edge';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 安全提示：此页面包含支付信息，已禁止搜索引擎索引 */}
      <meta name="robots" content="noindex, nofollow, noarchive" />
      {children}
    </>
  );
}