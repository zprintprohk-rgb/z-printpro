'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import Head from 'next/head'
import { 
  Package, 
  Truck, 
  Search,
  Filter,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react'

// ============================================================================
// 类型定义（内联，不从 @/lib/supabase 导入）
// ============================================================================
type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED'

interface OrderItem {
  id: string
  productName: string
  quantity: number
  totalPrice: number
}

interface Order {
  id: string
  status: OrderStatus
  createdAt: string
  totalAmount: number
  currency: string
  items: OrderItem[]
  customerName: string
  customerEmail: string
  customerPhone?: string
  trackingNumber?: string
  carrier?: string
}

interface OrderStats {
  total: number
  pending: number
  processing: number
  shipped: number
  completed: number
  cancelled: number
  totalRevenue: number
}

// ============================================================================
// 模拟数据服务
// ============================================================================
const getOrders = async (filters?: any): Promise<{ orders: Order[]; stats: OrderStats }> => {
  // TODO: 替换为实际 API
  return {
    orders: [],
    stats: {
      total: 0,
      pending: 0,
      processing: 0,
      shipped: 0,
      completed: 0,
      cancelled: 0,
      totalRevenue: 0
    }
  }
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
// 状态配置
// ============================================================================
const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string; icon: any }> = {
  PENDING: { label: '待付款', color: 'text-yellow-800', bg: 'bg-yellow-100', icon: Clock },
  PAID: { label: '已付款', color: 'text-blue-800', bg: 'bg-blue-100', icon: CheckCircle },
  PROCESSING: { label: '處理中', color: 'text-purple-800', bg: 'bg-purple-100', icon: Clock },
  SHIPPED: { label: '已發貨', color: 'text-indigo-800', bg: 'bg-indigo-100', icon: Truck },
  DELIVERED: { label: '已送達', color: 'text-green-800', bg: 'bg-green-100', icon: CheckCircle },
  CANCELLED: { label: '已取消', color: 'text-red-800', bg: 'bg-red-100', icon: XCircle },
  REFUNDED: { label: '已退款', color: 'text-gray-800', bg: 'bg-gray-100', icon: AlertCircle },
}

// ============================================================================
// 组件
// ============================================================================
function StatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status]
  const Icon = config.icon
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  )
}

function StatsCard({ title, value, icon: Icon, color }: { title: string; value: string | number; icon: any; color: string }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// 主页面
// ============================================================================
export default function AdminOrdersPage() {
  const router = useRouter()
  const locale = useLocale()
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<OrderStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const isHK = locale === 'zh-hk'

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const data = await getOrders()
      setOrders(data.orders)
      setStats(data.stats)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      await fetchOrders()
    } catch (error) {
      alert('Failed to update status')
    }
  }

  const filteredOrders = orders.filter(order => {
    if (selectedStatus !== 'all' && order.status !== selectedStatus) return false
    if (searchQuery && !order.customerName.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Head><title>Orders | Admin</title></Head>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Head>
        <title>Orders | Admin</title>
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and track all customer orders</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchOrders}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard 
              title="Total Orders" 
              value={stats.total} 
              icon={Package} 
              color="bg-blue-500" 
            />
            <StatsCard 
              title="Pending" 
              value={stats.pending} 
              icon={Clock} 
              color="bg-yellow-500" 
            />
            <StatsCard 
              title="Processing" 
              value={stats.processing} 
              icon={RefreshCw} 
              color="bg-purple-500" 
            />
            <StatsCard 
              title="Revenue" 
              value={formatAmount(stats.totalRevenue, 'HKD')} 
              icon={DollarSign} 
              color="bg-green-500" 
            />
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as OrderStatus | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              {Object.entries(statusConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={`/${locale}/admin/orders/${order.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                          #{order.id.slice(-8).toUpperCase()}
                        </Link>
                        <p className="text-sm text-gray-500">{order.items.length} items</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.customerEmail}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {formatAmount(order.totalAmount, order.currency)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Link
                          href={`/${locale}/admin/orders/${order.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}