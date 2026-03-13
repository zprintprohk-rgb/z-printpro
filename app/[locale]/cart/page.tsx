'use client'

import React from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ShoppingCart, ArrowLeft, Package } from 'lucide-react'

export default function CartPage() {
  const locale = useLocale()
  const isHK = locale === 'zh-hk'

  // 简化版本，确保能正常渲染
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/${locale}/`} className="p-2 rounded-lg bg-white hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {isHK ? '購物車' : 'Shopping Cart'}
          </h1>
        </div>

        {/* Empty Cart */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isHK ? '購物車是空的' : 'Your Cart is Empty'}
          </h2>
          <p className="text-gray-600 mb-8">
            {isHK ? '快去選購心儀的產品吧！' : 'Start shopping for your favorite products!'}
          </p>
          <div className="space-y-3">
            <Link 
              href={`/${locale}/special-offers`} 
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {isHK ? '瀏覽包郵套餐' : 'Browse Free Shipping Packages'}
            </Link>
            <Link 
              href={`/${locale}/products`} 
              className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition-colors"
            >
              {isHK ? '查看所有產品' : 'View All Products'}
            </Link>
          </div>
        </div>

        {/* SEO 结构化数据 - 空购物车 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: isHK ? '購物車' : 'Shopping Cart',
              description: isHK ? '查看您的購物車' : 'View your shopping cart',
              url: typeof window !== 'undefined' ? window.location.href : ''
            })
          }}
        />
      </div>
    </div>
  )
}