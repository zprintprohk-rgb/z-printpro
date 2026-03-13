import { MetadataRoute } from 'next';
import { locales, localeToHreflang } from '@/i18n';
import { getAllProductSlugs, getAllCategories } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://z-printpro.com';
  const routes: MetadataRoute.Sitemap = [];
  
  // 首页 - 所有语言版本（最高优先级）
  for (const locale of locales) {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [localeToHreflang[l], `${baseUrl}/${l}`])
        )
      }
    });
  }
  
  // 产品页面（高优先级）
  const slugs = getAllProductSlugs();
  for (const slug of slugs) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}/products/${slug}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [
              localeToHreflang[l], 
              `${baseUrl}/${l}/products/${slug}/`
            ])
          )
        }
      });
    }
  }
  
  // 分类页面（中优先级）
  const categories = getAllCategories();
  for (const category of categories) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}/category/${category.slug}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [
              localeToHreflang[l], 
              `${baseUrl}/${l}/category/${category.slug}/`
            ])
          )
        }
      });
    }
  }
  
  // 静态页面
  const staticPages = ['about', 'contact', 'special-offers', 'ai-studio', 'design-guide'];
  for (const page of staticPages) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7
      });
    }
  }
  
  return routes;
}