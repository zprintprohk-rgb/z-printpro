import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n';

interface Props {
  params: { locale: Locale };
}

export async function generateMetadata({ 
  params: { locale } 
}: Props): Promise<Metadata> {
  const isHK = locale === 'zh-hk';
  return {
    title: isHK ? '設計指南 | Z-PrintPro' : 'Design Guide | Z-PrintPro',
    description: isHK 
      ? '專業印刷設計指南，出血位、解析度、色彩模式教學。'
      : 'Professional printing design guide, bleed, resolution, color mode tutorials.',
  };
}

export default async function DesignGuidePage({ 
  params: { locale } 
}: Props) {
  setRequestLocale(locale);
  const isHK = locale === 'zh-hk';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">
          {isHK ? '設計指南' : 'Design Guide'}
        </h1>
        <p>{isHK ? '設計規範教學內容...' : 'Design specifications and tutorials...'}</p>
      </div>
    </div>
  );
}