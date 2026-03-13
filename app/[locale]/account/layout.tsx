import { Metadata } from 'next';

// SEO 安全：账户页面完全禁止爬虫（隐私保护最高级别）
export const metadata: Metadata = {
  title: 'My Account | Z-PrintPro Hong Kong',
  description: 'Manage your account and view order history.',
  robots: { 
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,   // 禁止显示片段
    notranslate: true, // 禁止翻译（保护隐私信息）
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-snippet': 0,
    }
  },
  // 防止搜索引擎显示描述
  openGraph: {
    title: 'Account',
    description: 'Private user account area',
  }
};

// Edge Network 优化
export const runtime = 'experimental-edge';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}