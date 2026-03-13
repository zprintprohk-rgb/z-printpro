import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// 添加日语支持：/zh-hk（香港主场）、/en（全球英语）、/ja（日本）
export const locales = ['zh-hk', 'en', 'ja'] as const;
export const defaultLocale = 'zh-hk' as const;
export type Locale = (typeof locales)[number];

// Hreflang 映射（SEO 关键）
export const localeToHreflang: Record<Locale, string> = {
  'zh-hk': 'zh-HK',
  'en': 'en',
  'ja': 'ja-JP'
};

// 语言标签映射（HTML lang 属性）
export const localeToLanguage: Record<Locale, string> = {
  'zh-hk': 'zh-HK',
  'en': 'en',
  'ja': 'ja'
};

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'Asia/Hong_Kong', // 香港时区
    locale: locale,
  };
});
