'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import Head from 'next/head'
import { 
  Package, 
  Truck, 
  ArrowLeft,
  Save,
  Edit3,
  Phone,
  Mail,
  User,
  MapPin,
  Calendar,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'

// ============================================================================
// 类型定义（内联，不从 @/lib/supabase 导入）
// ============================================================================
type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED'

interface OrderItem {
  id: string
  productName: string
  size?: string
  quantity: number
  unitPrice: number
  totalPrice: number
  imageUri?: string
}

interface Order {
  id: string
  status: OrderStatus
  createdAt: string
  updatedAt?: string
  totalAmount: number
  currency: string
  items: OrderItem[]
  trackingNumber?: string
  carrier?: string
  shippedAt?: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  shippingAddress: string
  shippingCity?: string
  shippingCountry?: string
  notes?: string
}

// ============================================================================
// 模拟 API 函数（不从 @/lib/supabase 导入任何类型）
// ============================================================================
const getOrderById = async (id: string): Promise<Order | null> => {
  console.log('Fetching order:', id)
  return null
}

const updateShippingInfo = async (orderId: string, data: { trackingNumber: string; carrier: string }): Promise<void> => {
  console.log('Updating shipping:', orderId, data)
}

const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
  console.log('Updating status:', orderId, status)
}

const formatAmount = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('zh-HK', {
    style: 'currency',
    currency: currency || 'HKD',
  }).format(amount)
}

// ============================================================================
// 配置
// ============================================================================
const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  PENDING: { label: '待付款', color: 'text-yellow-800', bg: 'bg-yellow-100' },
  PAID: { label: '已付款', color: 'text-blue-800', bg: 'bg-blue-100' },
  PROCESSING: { label: '處理中', color: 'text-purple-800', bg: 'bg-purple-100' },
  SHIPPED: { label: '已發貨', color: 'text-indigo-800', bg: 'bg-indigo-100' },
  DELIVERED: { label: '已送達', color: 'text-green-800', bg: 'bg-green-100' },
  CANCELLED: { label: '已取消', color: 'text-red-800', bg: 'bg-red-100' },
  REFUNDED: { label: '已退款', color: 'text-gray-800', bg: 'bg-gray-100' },
}

const carriers = [
  { value: 'SF', label: '順豐速運' },
  { value: 'UPS', label: 'UPS' },
  { value: 'FEDEX', label: 'FedEx' },
  { value: 'DHL', label: 'DHL' },
]

// ============================================================================
// 主组件
// ============================================================================
export default function AdminOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const locale = useLocale()
  const orderId = params.id as string
  
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  
  const [editForm, setEditForm] = useState({
    trackingNumber: '',
    carrier: '',
    status: '' as OrderStatus,
    notes: '',
  })

  const isHK = locale === 'zh-hk'

  useEffect(() => {
    fetchOrder()
  }, [orderId])

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(orderId)
      if (data) {
        setOrder(data)
        setEditForm({
          trackingNumber: data.trackingNumber || '',
          carrier: data.carrier || '',
          status: data.status,
          notes: data.notes || '',
        })
      } else {
        setError(isHK ? '訂單不存在' : 'Order not found')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch order')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!order) return
    setSaving(true)
    try {
      if (editForm.trackingNumber && editForm.carrier) {
        await updateShippingInfo(orderId, {
          trackingNumber: editForm.trackingNumber,
          carrier: editForm.carrier,
        })
      }
      if (editForm.status !== order.status) {
        await updateOrderStatus(orderId, editForm.status)
      }
      await fetchOrder()
      setIsEditing(false)
      alert(isHK ? '保存成功' : 'Saved successfully')
    } catch (err: any) {
      alert(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const getTrackingUrl = (carrier: string, trackingNumber: string): string => {
    const urls: Record<string, string> = {
      'SF': `https://www.sf-express.com/hk_tc/dynamic_function/waybill/#search/bill-number/${trackingNumber}`,
      'UPS': `https://www.ups.com/track?tracknum=${trackingNumber}`,
      'FEDEX': `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`,
      'DHL': `https://www.dhl.com/hk-zh/home/tracking/tracking-parcel.html?submit=1&tracking-id=${trackingNumber}`,
    }
    return urls[carrier] || '#'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Head><title>Loading... | Admin</title></Head>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Head><title>Error | Admin</title></Head>
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Link href={`/${locale}/admin/orders`} className="text-blue-600 hover:underline">
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const statusInfo = statusConfig[order.status]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Head>
        <title>Order #{order.id.slice(-8)} | Admin</title>
      </Head>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/admin/orders`} className="p-2 bg-white rounded-lg shadow hover:bg-gray-50">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Order #{order.id.slice(-8).toUpperCase()}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(order.createdAt).toLocaleString(isHK ? 'zh-HK' : 'en-US')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isEditing ? <><Save className="w-4 h-4" /> Save</> : <><Edit3 className="w-4 h-4" /> Edit</>}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Items ({order.items.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <div key={item.id} className="p-6 flex gap-4">
                    {item.imageUri ? (
                      <img src={item.imageUri} alt="" className="w-20 h-20 object-cover rounded-lg border" />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.productName}</h3>
                      {item.size && <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-500">${item.unitPrice} x {item.quantity}</span>
                        <span className="font-medium">{formatAmount(item.totalPrice, order.currency)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="text-xl font-bold text-blue-600">{formatAmount(order.totalAmount, order.currency)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{order.customerEmail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{order.customerPhone || '-'}</p>
                  </div>
                </div>
                <div className="col-span-2 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Shipping Address</p>
                    <p className="font-medium">{order.shippingAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Shipping Information
              </h2>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value as OrderStatus })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      {Object.entries(statusConfig).map(([key, config]) => (
                        <option key={key} value={key}>{config.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Carrier</label>
                    <select
                      value={editForm.carrier}
                      onChange={(e) => setEditForm({ ...editForm, carrier: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="">Select Carrier</option>
                      {carriers.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                    <input
                      type="text"
                      value={editForm.trackingNumber}
                      onChange={(e) => setEditForm({ ...editForm, trackingNumber: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="Enter tracking number"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Carrier</p>
                    <p className="font-medium">{order.carrier || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Tracking Number</p>
                    <p className="font-medium">{order.trackingNumber || '-'}</p>
                  </div>
                  {order.trackingNumber && order.carrier && (
                    <a
                      href={getTrackingUrl(order.carrier, order.trackingNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Track Shipment <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                  {order.shippedAt && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      Shipped: {new Date(order.shippedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Order Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Order Placed</p>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                {order.status !== 'PENDING' && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Payment Confirmed</p>
                      <p className="text-sm text-gray-500">Status: {statusConfig[order.status].label}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}