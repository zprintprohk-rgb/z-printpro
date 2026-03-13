// i18n/routing.ts
import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  // 支持的所有语言
  locales: ['zh-hk', 'zh-cn', 'en'],
  
  // 默认语言
  defaultLocale: 'zh-hk',
  
  // URL 前缀策略：as-needed 表示默认语言无前缀
  localePrefix: 'as-needed',
  
  // 自动检测语言
  localeDetection: true,
})

// 创建导航组件
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)