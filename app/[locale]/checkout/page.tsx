'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useCart } from '@/lib/CartContext'
import { SeoHead } from '@/components/seo/SeoHead'
import { generateWhatsAppOrderMessage } from '@/lib/whatsappOrder'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { 
  ShoppingCart, Trash2, Minus, Plus, ArrowLeft, 
  MessageCircle, Package, Truck, Check, Loader2, 
  CreditCard, MapPin, User, Phone, Mail, AlertCircle
} from 'lucide-react'

// ============================================================================
// 智印港 (z-printpro.com) - 結賬頁面 (Stripe 集成版)
// ============================================================================

// 初始化 Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

// 支付表單組件
function CheckoutForm({ 
  clientSecret, 
  orderId, 
  totalAmount,
  customerInfo,
  onSuccess,
  onError 
}: { 
  clientSecret: string
  orderId: string
  totalAmount: number
  customerInfo: any
  onSuccess: () => void
  onError: (error: string) => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const locale = useLocale()
  const isHK = locale === 'zh-hk'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/${locale}/checkout/success`,
          payment_method_data: {
            billing_details: {
              name: customerInfo.name,
              email: customerInfo.email,
              phone: customerInfo.phone,
              address: {
                line1: customerInfo.address,
                city: customerInfo.city,
                country: customerInfo.country,
              },
            },
          },
        },
        redirect: 'if_required',
      })

      if (error) {
        setErrorMessage(error.message || (isHK ? '支付失敗，請重試' : 'Payment failed, please try again'))
        onError(error.message || 'Payment failed')
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess()
      }
    } catch (error: any) {
      setErrorMessage(error.message || (isHK ? '發生錯誤，請重試' : 'An error occurred'))
      onError(error.message)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Stripe Payment Element */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary-600" />
          {isHK ? '支付方式' : 'Payment Method'}
        </h3>
        <PaymentElement 
          options={{
            layout: 'tabs',
            defaultValues: {
              billingDetails: {
                name: customerInfo.name,
                email: customerInfo.email,
                phone: customerInfo.phone,
              },
            },
          }}
        />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {isHK ? '處理中...' : 'Processing...'}
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            {isHK ? `支付 HK$${totalAmount}` : `Pay HK$${totalAmount}`}
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        {isHK ? '🔒 安全加密支付，由 Stripe 提供' : '🔒 Secure payment powered by Stripe'}
      </p>
    </form>
  )
}

// 主頁面組件
export default function CheckoutPage() {
  const locale = useLocale()
  const t = useTranslations()
  const router = useRouter()
  const { items, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart()
  
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  
  // 客戶信息表單
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Hong Kong',
    country: 'HK',
  })

  const isHK = locale === 'zh-hk'

  // 計算運費
  const shippingCost = customerInfo.country === 'HK' ? 0 : Math.max(15, Math.round(cartTotal * 0.1))
  const finalTotal = cartTotal + shippingCost

  // 創建 PaymentIntent
  const createPaymentIntent = async () => {
    // 驗證表單
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.email || !customerInfo.address) {
      alert(isHK ? '請填寫所有必填字段' : 'Please fill in all required fields')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          currency: 'hkd',
          customerInfo,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment')
      }

      setClientSecret(data.clientSecret)
      setOrderId(data.orderId)
      setShowPaymentForm(true)

    } catch (error: any) {
      alert(error.message || (isHK ? '創建支付失敗' : 'Failed to create payment'))
    } finally {
      setIsLoading(false)
    }
  }

  // WhatsApp 下單
  const handleWhatsAppCheckout = () => {
   const message = generateWhatsAppOrderMessage({
  items,
  total: cartTotal,  // 改为 subtotal（如果类型定义是 subtotal）
  shipping: shippingCost,
  customerInfo,
  locale: locale as 'zh-hk' | 'en',
  })
    
    window.open(`https://wa.me/ ${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '85212345678'}?text=${encodeURIComponent(message)}`, '_blank')
  }

  // 支付成功處理
  const handlePaymentSuccess = () => {
    clearCart()
    router.push(`/${locale}/checkout/success?order_id=${orderId}`)
  }

  // 空購物車
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom max-w-md">
          <SeoHead pageType="checkout" />
          
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {isHK ? '購物車是空的' : 'Your Cart is Empty'}
            </h1>
            <p className="text-gray-600 mb-8">
              {isHK ? '快去選購心儀的產品吧！' : 'Start shopping for your favorite products!'}
            </p>
            <Link href={`/${locale}/special-offers`} className="btn-primary w-full py-3 block">
              {isHK ? '瀏覽包郵套餐' : 'Browse Free Shipping Packages'}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <SeoHead pageType="checkout" />
      
      <div className="min-h-screen bg-gray-50 py-8 lg:py-12">
        <div className="container-custom">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href={`/${locale}/`} className="p-2 rounded-lg bg-white hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {isHK ? '結賬' : 'Checkout'}
            </h1>
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              {items.length} {isHK ? '件商品' : 'items'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Cart & Customer Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    {isHK ? '訂單商品' : 'Order Items'}
                  </h2>
                </div>
                
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.uniqueId} className="p-4 flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-8 h-8 text-gray-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-gray-900 text-sm">{item.productName}</h3>
                            {item.size && <p className="text-xs text-gray-500">{item.size}</p>}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.uniqueId)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}
                              className="w-7 h-7 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}
                              className="w-7 h-7 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="font-semibold text-primary-600">HK${item.totalPrice}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Info Form */}
              {!showPaymentForm && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary-600" />
                    {isHK ? '聯繫信息' : 'Contact Information'}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isHK ? '姓名 *' : 'Name *'}
                      </label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={isHK ? '請輸入您的姓名' : 'Enter your name'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isHK ? '電話 *' : 'Phone *'}
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="+852 1234 5678"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isHK ? '電郵 *' : 'Email *'}
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isHK ? '送貨地址 *' : 'Shipping Address *'}
                      </label>
                      <textarea
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={isHK ? '請輸入詳細地址' : 'Enter your address'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isHK ? '城市' : 'City'}
                      </label>
                      <input
                        type="text"
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isHK ? '國家/地區' : 'Country/Region'}
                      </label>
                      <select
                        value={customerInfo.country}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, country: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="HK">Hong Kong</option>
                        <option value="CN">China</option>
                        <option value="US">United States</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="CA">Canada</option>
                        <option value="JP">Japan</option>
                        <option value="SG">Singapore</option>
                        <option value="OTHER">{isHK ? '其他' : 'Other'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Continue to Payment Button */}
                  <button
                    onClick={createPaymentIntent}
                    disabled={isLoading}
                    className="w-full btn-primary py-4 mt-6 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {isHK ? '處理中...' : 'Processing...'}
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        {isHK ? '繼續支付' : 'Continue to Payment'}
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Stripe Payment Form */}
              {showPaymentForm && clientSecret && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary-600" />
                      {isHK ? '安全支付' : 'Secure Payment'}
                    </h2>
                    <button
                      onClick={() => setShowPaymentForm(false)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      {isHK ? '返回' : 'Back'}
                    </button>
                  </div>

                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm
                      clientSecret={clientSecret}
                      orderId={orderId || ''}
                      totalAmount={finalTotal}
                      customerInfo={customerInfo}
                      onSuccess={handlePaymentSuccess}
                      onError={(error) => console.error('Payment error:', error)}
                    />
                  </Elements>
                </div>
              )}

              {/* WhatsApp Fallback */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-800 mb-1">
                      {isHK ? '不想在線支付？' : 'Prefer not to pay online?'}
                    </h3>
                    <p className="text-green-700 text-sm mb-3">
                      {isHK 
                        ? '您可以通過 WhatsApp 下單，支持 FPS/轉數快付款'
                        : 'Order via WhatsApp and pay with FPS/bank transfer'}
                    </p>
                    <button
                      onClick={handleWhatsAppCheckout}
                      className="text-green-700 font-medium text-sm hover:underline flex items-center gap-1"
                    >
                      {isHK ? '通過 WhatsApp 下單' : 'Order via WhatsApp'}
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {isHK ? '訂單摘要' : 'Order Summary'}
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{isHK ? '小計' : 'Subtotal'}</span>
                    <span>HK${cartTotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{isHK ? '運費' : 'Shipping'}</span>
                    <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                      {shippingCost === 0 
                        ? (isHK ? '免費' : 'Free') 
                        : `HK$${shippingCost}`
                      }
                    </span>
                  </div>

                  {shippingCost === 0 && (
                    <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 p-2 rounded">
                      <Truck className="w-4 h-4" />
                      {isHK ? '香港地區免運費' : 'Free shipping to Hong Kong'}
                    </div>
                  )}

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>{isHK ? '總計' : 'Total'}</span>
                      <span className="text-primary-600">HK${finalTotal.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {isHK ? '包含所有稅費' : 'Includes all taxes'}
                    </p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Check className="w-4 h-4 text-green-500" />
                    {isHK ? 'Stripe 安全支付' : 'Stripe Secure Payment'}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Check className="w-4 h-4 text-green-500" />
                    {isHK ? '支持信用卡/支付寶/微信' : 'Credit Card/Alipay/WeChat'}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Check className="w-4 h-4 text-green-500" />
                    {isHK ? '24小時出貨' : '24H Delivery'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 