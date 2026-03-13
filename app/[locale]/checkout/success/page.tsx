'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useCart } from '@/lib/CartContext'
import { SeoHead } from '@/components/seo/SeoHead'
import { Check, Package, Truck, Clock, ShoppingBag, MessageCircle } from 'lucide-react'

// ============================================================================
// 智印港 (z-printpro.com) - 支付成功頁面
// ============================================================================

export default function CheckoutSuccessPage() {
  const locale = useLocale()
  const t = useTranslations()
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const orderId = searchParams.get('order_id') || searchParams.get('payment_intent')?.slice(-8).toUpperCase()
  const paymentIntentId = searchParams.get('payment_intent')

  const isHK = locale === 'zh-hk'

  useEffect(() => {
    // 清空購物車
    clearCart()

    // 可選：驗證支付狀態
    const verifyPayment = async () => {
      if (!paymentIntentId) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/verify-payment?payment_intent=${paymentIntentId}`)
        const data = await response.json()
        
        if (data.success) {
          setIsVerified(true)
        }
      } catch (error) {
        console.error('Payment verification failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    verifyPayment()
  }, [paymentIntentId, clearCart])

  return (
    <>
      <SeoHead pageType="checkout-success" />
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="container-custom max-w-lg">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in">
              <Check className="w-12 h-12 text-green-600" />
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {isHK ? '支付成功！' : 'Payment Successful!'}
            </h1>

            {/* Description */}
            <p className="text-gray-600 mb-6">
              {isHK 
                ? '感謝您的訂購，我們已收到您的付款。'
                : 'Thank you for your order. We have received your payment.'}
            </p>

            {/* Order Info */}
            {orderId && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-500 mb-1">
                  {isHK ? '訂單編號' : 'Order ID'}
                </p>
                <p className="text-lg font-mono font-semibold text-gray-900">
                  {orderId}
                </p>
              </div>
            )}

            {/* Next Steps */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-left bg-blue-50 p-3 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900 text-sm">
                    {isHK ? '訂單處理中' : 'Order Processing'}
                  </p>
                  <p className="text-blue-700 text-xs">
                    {isHK ? '我們會在 24 小時內確認並開始製作' : 'We will confirm and start production within 24 hours'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left bg-green-50 p-3 rounded-lg">
                <Truck className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900 text-sm">
                    {isHK ? '預計發送' : 'Estimated Shipping'}
                  </p>
                  <p className="text-green-700 text-xs">
                    {isHK ? '1-3 個工作日內發貨' : 'Ship within 1-3 business days'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left bg-purple-50 p-3 rounded-lg">
                <Package className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-purple-900 text-sm">
                    {isHK ? '順豐速運' : 'SF Express'}
                  </p>
                  <p className="text-purple-700 text-xs">
                    {isHK ? '香港地區 1-2 天送達' : '1-2 days delivery in Hong Kong'}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Notice */}
            <p className="text-sm text-gray-500 mb-8">
              {isHK 
                ? '確認郵件已發送至您的郵箱，請查收。'
                : 'A confirmation email has been sent to your inbox.'}
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href={`/${locale}/`}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                {isHK ? '繼續購物' : 'Continue Shopping'}
              </Link>

              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '85212345678'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl border-2 border-green-500 text-green-600 font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                {isHK ? 'WhatsApp 查詢訂單' : 'Query Order via WhatsApp'}
              </a>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-gray-400 mt-6">
              {isHK 
                ? '如有任何問題，請隨時聯繫我們的客服團隊。'
                : 'If you have any questions, please contact our support team.'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
