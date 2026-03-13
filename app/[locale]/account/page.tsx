'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

// ============================================================================
// 智印港 - 賬戶中心主頁（最終修復版）
// ============================================================================

export default function AccountPage() {
  const router = useRouter()
  const locale = useLocale()

  useEffect(() => {
    // 設置頁面標題
    document.title = '賬戶中心 | Z-PrintPro'
    
    // 自動重定向到訂單頁面
    const timer = setTimeout(() => {
      router.replace(`/${locale}/account/orders`)
    }, 100)
    return () => clearTimeout(timer)
  }, [router, locale])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">正在進入賬戶中心...</p>
      </div>
    </div>
  )
}