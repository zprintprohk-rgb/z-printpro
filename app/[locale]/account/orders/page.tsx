'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import Head from 'next/head'
import { 
  Package, 
  Truck, 
  Search,
  ExternalLink,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight
} from 'lucide-react'

// ============================================================================
// 类型定义
// ============================================================================
type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED'

interface OrderItem {
  id: string
  productName: string
  size?: string
  quantity: number
  totalPrice: number
  imageUri?: string
}

interface Order {
  id: string
  status: OrderStatus
  createdAt: string
  totalAmount: number
  currency: string
  items: OrderItem[]
  trackingNumber?: string
  carrier?: string
  shippedAt?: string
}

// ============================================================================
// 模拟数据服务（请替换为实际的 supabase 导入）
// ============================================================================
const getOrdersByEmail = async (email: string): Promise<Order[]> => {
  // 这里替换为实际的 API 调用
  return []
}

const getTrackingUrl = (carrier: string, trackingNumber: string): string => {
  const urls: Record<string, string> = {
    'SF': `https://www.sf-express.com/cn/en/dynamic_function/waybill/#search/bill-number/${trackingNumber}`,
    'UPS': `https://www.ups.com/track?tracknum=${trackingNumber}`,
    'FEDEX': `https://www.fedex.com/apps/fedextrack/?tracknumbers=${trackingNumber}`,
    'DHL': `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`,
  }
  return urls[carrier] || '#'
}

const formatAmount = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('zh-HK', {
    style: 'currency',
    currency: currency || 'HKD',
  }).format(amount)
}

// ============================================================================
// 狀態標籤組件
// ============================================================================
function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    PAID: 'bg-blue-100 text-blue-800 border-blue-200',
    PROCESSING: 'bg-purple-100 text-purple-800 border-purple-200',
    SHIPPED: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    DELIVERED: 'bg-green-100 text-green-800 border-green-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200',
    REFUNDED: 'bg-gray-100 text-gray-800 border-gray-200',
  }

  const labels: Record<OrderStatus, string> = {
    PENDING: '待付款',
    PAID: '已付款',
    PROCESSING: '處理中',
    SHIPPED: '已發貨',
    DELIVERED: '已送達',
    CANCELLED: '已取消',
    REFUNDED: '已退款',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

// ============================================================================
// 訂單卡片組件
// ============================================================================
function OrderCard({ order }: { order: Order }) {
  const trackingUrl = order.trackingNumber && order.carrier
    ? getTrackingUrl(order.carrier, order.trackingNumber)
    : null

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* 訂單頭部 */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <div>
            <span className="text-sm text-gray-500">訂單號</span>
            <p className="font-medium text-gray-900">#{order.id.slice(-8).toUpperCase()}</p>
          </div>
          <div className="h-8 w-px bg-gray-300" />
          <div>
            <span className="text-sm text-gray-500">下單日期</span>
            <p className="font-medium text-gray-900">
              {new Date(order.createdAt).toLocaleDateString('zh-HK')}
            </p>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* 商品列表 */}
      <div className="px-6 py-4">
        {order.items.map((item, index) => (
          <div 
            key={item.id} 
            className={`flex items-start space-x-4 ${index > 0 ? 'mt-4 pt-4 border-t border-gray-100' : ''}`}
          >
            {item.imageUri ? (
              <img
                src={item.imageUri}
                alt={item.productName}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.productName}</h4>
              {item.size && <p className="text-sm text-gray-500 mt-1">規格: {item.size}</p>}
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">數量: {item.quantity}</span>
                <span className="font-medium text-gray-900">
                  {formatAmount(item.totalPrice, order.currency)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 訂單底部 */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-sm text-gray-500">訂單總額</span>
            <p className="text-xl font-bold text-gray-900">
              {formatAmount(order.totalAmount, order.currency)}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {order.status === 'SHIPPED' && trackingUrl && (
              <a
                href={trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Truck className="w-4 h-4 mr-2" />
                追蹤包裹
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            )}
            
            <Link
              href={`/account/orders/${order.id}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              查看詳情
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {order.trackingNumber && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-sm">
              <Truck className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">物流單號:</span>
              <span className="font-medium text-gray-900">{order.trackingNumber}</span>
              {order.carrier && <span className="text-gray-500">({order.carrier})</span>}
              {order.shippedAt && (
                <span className="text-gray-500 ml-2">
                  發貨時間: {new Date(order.shippedAt).toLocaleDateString('zh-HK')}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// 郵箱查詢表單
// ============================================================================
function EmailSearchForm({ onSearch }: { onSearch: (email: string) => void }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      onSearch(email)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">查詢您的訂單</h2>
        <p className="text-gray-600 mb-6">輸入下單時使用的郵箱地址，即可查看所有訂單</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            查詢訂單
          </button>
        </form>
      </div>
    </div>
  )
}

// ============================================================================
// 主頁面組件
// ============================================================================
export default function AccountOrdersPage() {
  const searchParams = useSearchParams()
  const locale = useLocale()
  const [email, setEmail] = useState<string>('')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
      handleSearch(emailParam)
    }
  }, [searchParams])

  const handleSearch = async (searchEmail: string) => {
    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const data = await getOrdersByEmail(searchEmail)
      setOrders(data)
      window.history.replaceState({}, '', `?email=${encodeURIComponent(searchEmail)}`)
    } catch (err: any) {
      setError(err.message || '獲取訂單失敗')
    } finally {
      setLoading(false)
    }
  }

  if (!email && !hasSearched) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Head>
          <title>訂單查詢 | Z-PrintPro</title>
        </Head>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmailSearchForm onSearch={handleSearch} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Head>
        <title>我的訂單 | Z-PrintPro</title>
      </Head>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">我的訂單</h1>
          <p className="text-gray-600 mt-1">
            郵箱: {email}
            <button
              onClick={() => {
                setEmail('')
                setOrders([])
                setHasSearched(false)
                window.history.replaceState({}, '', '/account/orders')
              }}
              className="ml-2 text-sm text-blue-600 hover:underline"
            >
              更換郵箱
            </button>
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">加載中...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">暫無訂單</h3>
            <p className="text-gray-600 mb-6">該郵箱暫無訂單記錄，請確認郵箱地址是否正確</p>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              開始購物
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-2">需要幫助?</h3>
          <p className="text-blue-700 text-sm mb-4">如果您對訂單有任何疑問，請通過以下方式聯繫我們:</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="mailto:support@z-printpro.com" className="flex items-center text-blue-700 hover:text-blue-900">
              <Mail className="w-4 h-4 mr-1" />
              support@z-printpro.com
            </a>
            <a href="tel:+85212345678" className="flex items-center text-blue-700 hover:text-blue-900">
              <Phone className="w-4 h-4 mr-1" />
              +852 1234 5678
            </a>
            <a href="https://wa.me/85212345678" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-700 hover:text-blue-900">
              <MessageCircle className="w-4 h-4 mr-1" />
              WhatsApp 客服
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}