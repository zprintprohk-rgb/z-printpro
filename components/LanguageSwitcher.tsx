// components/LanguageSwitcher.tsx
'use client'

import { usePathname } from '@/i18n/routing'
import { Link } from '@/i18n/routing'

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname()
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px',
      padding: '10px 20px',
      backgroundColor: '#f3f4f6',
      borderBottom: '1px solid #e5e7eb',
      justifyContent: 'flex-end'
    }}>
      <span style={{ color: '#6b7280', fontSize: '14px' }}>語言 / Language:</span>
      
      <Link 
        href={pathname} 
        locale="zh-hk"
        style={{ 
          fontWeight: currentLocale === 'zh-hk' ? 'bold' : 'normal',
          color: currentLocale === 'zh-hk' ? '#2563eb' : '#374151',
          textDecoration: 'none',
          padding: '4px 12px',
          borderRadius: '4px',
          backgroundColor: currentLocale === 'zh-hk' ? '#dbeafe' : 'transparent'
        }}
      >
        繁體中文
      </Link>
      
      <span style={{ color: '#9ca3af' }}>|</span>
      
      <Link 
        href={pathname} 
        locale="en"
        style={{ 
          fontWeight: currentLocale === 'en' ? 'bold' : 'normal',
          color: currentLocale === 'en' ? '#2563eb' : '#374151',
          textDecoration: 'none',
          padding: '4px 12px',
          borderRadius: '4px',
          backgroundColor: currentLocale === 'en' ? '#dbeafe' : 'transparent'
        }}
      >
        English
      </Link>
    </div>
  )
}