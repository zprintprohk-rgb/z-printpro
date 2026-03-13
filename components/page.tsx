// ============================================================================
// 智印港 (z-printpro.com) - 產品分類頁       app/[locale]/category/[slug]/page.tsx
// ============================================================================

import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getProductsByCategory, getAllCategories, getCategoryInfo } from '@/lib/products'
import { SeoHead, generateCategoryMetadata } from '@/components/seo/SeoHead'
import { ArrowLeft, Package } from 'lucide-react'

interface CategoryPageProps {
  params: {
    slug: string
    locale: string
  }
}

// 修复点1：generateStaticParams 必须返回 locale + slug 组合（核心解决404）
export async function generateStaticParams() {
  const categories = getAllCategories()
  const locales = ['zh-hk', 'en'] // 你的网站支持的语言
  
  // 生成 语言 + 分类slug 的组合，这是Next.js匹配本地化动态路由的关键
  return locales.flatMap(locale => 
    categories.map((cat) => ({ 
      locale, // 必须包含locale参数
      slug: cat.slug 
    }))
  )
}

// 修复点2：完善metadata生成逻辑（避免空返回）
export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug, locale } = params
  const categoryInfo = getCategoryInfo(slug)
  
  if (!categoryInfo) {
    return {
      title: '分类不存在 | 智印港',
      description: '该产品分类不存在'
    }
  }
  
  return generateCategoryMetadata(slug, categoryInfo.name, locale as 'zh-hk' | 'en')
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug, locale } = params
  // 修复点3：getTranslations必须传入locale参数（否则翻译失效）
  const t = await getTranslations({ locale })
  
  const categoryInfo = getCategoryInfo(slug)
  const products = getProductsByCategory(slug)
  
  if (!categoryInfo) {
    notFound()
  }

  return (
    <div className="container-custom py-12">
      {/* 返回链接 - 修复点4：使用本地化路径 */}
      <Link 
        href={`/${locale}/category/`} // 改为返回分类列表页，而非首页
        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6"
      >
        <ArrowLeft size={20} />
        {t('common.back')}
      </Link>
      
      {/* 分类标题 */}
      <div className="mb-8">
        <h1 className="heading-1 mb-2">{categoryInfo.name}</h1>
        <p className="text-gray-600">{(categoryInfo as any).description}</p>
      </div>
      
      {/* 产品列表 - 修复点5：产品链接添加本地化前缀 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/${locale}/products/${product.slug}/`} // 补充locale前缀
            className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
          >
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              <span className="text-4xl">🖨️</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-primary-600 font-bold">
                {product.price} {t('product.from')}
              </p>
              <p className="text-sm text-gray-500">
                {t('product.minQuantity')}: {product.minQty}
              </p>
            </div>
          </Link>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">{t('product.noProducts')}</p>
        </div>
      )}
    </div>
  )
}