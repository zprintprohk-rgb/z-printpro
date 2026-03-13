// ============================================================================
// 智印港 (z-printpro.com) - 產品詳情頁客戶端組件
// ============================================================================

'use client'

import React from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { SeoHead } from '@/components/seo/SeoHead'
import { MessageCircle, ShoppingBag, ArrowRight, Check, Package, Truck, Palette } from 'lucide-react'

interface ProductDetailClientProps {
  product: any
  relatedProducts: any[]
  locale: string
}

export default function ProductDetailClient({ 
  product, 
  relatedProducts,
  locale 
}: ProductDetailClientProps) {
  const t = useTranslations()
  const currentLocale = useLocale()
  const isHK = locale === 'zh-hk'
  
  // 生成 WhatsApp 消息
  const whatsappMessage = encodeURIComponent(
    isHK
      ? `您好，我想了解 ${product.nameZh} 的詳細報價。`
      : `Hi, I'd like to get a quote for ${product.name}.`
  )
  
  const whatsappLink = `https://wa.me/85212345678?text=${whatsappMessage}`

  return (
    <>
      <SeoHead 
        pageType="product" 
        data={product}
        breadcrumbs={[
          { name: isHK ? '產品' : 'Products', url: `/${locale}/products/` },
          { name: product.category, url: `/${locale}/category/${product.categorySlug}/` },
          { name: product.name, url: `/${locale}/products/${product.slug}/` },
        ]}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container-custom py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link href={`/${locale}/`} className="hover:text-primary-600">
                {isHK ? '首頁' : 'Home'}
              </Link>
              <span>/</span>
              <Link href={`/${locale}/category/${product.categorySlug}/`} className="hover:text-primary-600">
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-8 lg:py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left: Product Image */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                      <span className="text-6xl">🖨️</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {isHK ? '產品圖片' : 'Product Image'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Product Info */}
              <div className="space-y-6">
                {/* Category Badge */}
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {isHK ? '有現貨' : 'In Stock'}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  {isHK ? product.nameZh : product.name}
                </h1>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Price Info */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-amber-700 mb-2">
                    <Package className="w-5 h-5" />
                    <span className="font-medium">
                      {isHK ? '價格因規格而異' : 'Price varies by specifications'}
                    </span>
                  </div>
                  <p className="text-amber-600 text-sm">
                    {isHK 
                      ? '請聯繫我們獲取準確報價，我們會根據您的具體需求提供最佳方案。'
                      : 'Contact us for an accurate quote. We will provide the best solution based on your specific needs.'}
                  </p>
                </div>

                {/* Min Quantity */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span>{isHK ? '最少訂購量' : 'Min Order'}: <strong className="text-gray-900">{product.minQty}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    <span>{isHK ? '參考價格' : 'Reference Price'}: <strong className="text-gray-900">{product.price}</strong></span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {isHK ? 'WhatsApp 詢價' : 'Quote via WhatsApp'}
                  </a>
                  
                  <Link
                    href={`/${locale}/special-offers`}
                    className="flex-1 btn-primary py-4 px-6 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {isHK ? '查看包郵套餐' : 'View Free Shipping Packages'}
                  </Link>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { icon: Palette, text: isHK ? '免費設計' : 'Free Design' },
                    { icon: Truck, text: isHK ? '快速送達' : 'Fast Delivery' },
                    { icon: Check, text: isHK ? '品質保證' : 'Quality Guarantee' },
                    { icon: Package, text: isHK ? '批量優惠' : 'Bulk Discount' },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <feature.icon className="w-4 h-4 text-primary-500" />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Specifications */}
        <section className="py-8 lg:py-12 bg-white">
          <div className="container-custom">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              {isHK ? '產品規格' : 'Product Specifications'}
            </h2>
            
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <table className="w-full">
                <tbody>
                  {[
                    { label: isHK ? '產品名稱' : 'Product Name', value: isHK ? product.nameZh : product.name },
                    { label: isHK ? '產品類別' : 'Category', value: product.category },
                    { label: isHK ? '最少訂購量' : 'Minimum Order', value: product.minQty.toString() },
                    { label: isHK ? '參考價格' : 'Reference Price', value: product.price },
                    { label: isHK ? '生產週期' : 'Production Time', value: isHK ? '1-3 工作日' : '1-3 Business Days' },
                    { label: isHK ? '送貨方式' : 'Delivery', value: isHK ? '順豐速運' : 'SF Express' },
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-gray-200 last:border-b-0">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 w-1/3 bg-gray-100">
                        {row.label}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-8 lg:py-12">
            <div className="container-custom">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  {isHK ? '相關產品' : 'Related Products'}
                </h2>
                <Link 
                  href={`/${locale}/category/${product.categorySlug}/`}
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                  {isHK ? '查看全部' : 'View All'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/${locale}/products/${relatedProduct.slug}/`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      <span className="text-4xl">🖨️</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-2 text-sm">
                        {isHK ? relatedProduct.nameZh : relatedProduct.name}
                      </h3>
                      <p className="text-primary-600 font-semibold text-sm">
                        {relatedProduct.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-primary-600 to-primary-800">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {isHK ? '需要定制報價？' : 'Need a Custom Quote?'}
            </h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              {isHK 
                ? '我們的專業團隊隨時為您服務，提供個性化的印刷解決方案。'
                : 'Our professional team is ready to serve you with personalized printing solutions.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-700 font-semibold py-3 px-8 rounded-xl hover:bg-primary-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                {isHK ? 'WhatsApp 聯繫' : 'Contact via WhatsApp'}
              </a>
              <Link
                href={`/${locale}/contact`}
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
              >
                {isHK ? '其他聯繫方式' : 'Other Contact Methods'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}