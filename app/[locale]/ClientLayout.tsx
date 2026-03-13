'use client'

import { CartProvider } from '@/lib/CartContext'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}