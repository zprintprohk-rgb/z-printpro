'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useCart } from '@/lib/CartContext'
import { Menu, X, ShoppingCart } from 'lucide-react'

// ============================================================================
// 智印港 (z-printpro.com) - 導航欄組件
// ============================================================================

export function Navbar() {
  const locale = useLocale()
  const t = useTranslations()
  const { cartCount } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/products', label: t('nav.products') },
    { href: '/ai-studio', label: t('nav.aiStudio'), highlight: true },
    { href: '/special-offers', label: t('nav.specialOffers'), highlight: true },
    { href: '/contact', label: t('nav.contact') },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href={`/${locale}/`} 
            className="flex items-center gap-2 text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            <span className="text-2xl">🖨️</span>
            <span className="hidden sm:inline">Z-PrintPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${item.highlight 
                    ? 'text-accent-600 hover:bg-accent-50' 
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Cart Icon */}
            <Link
              href={`/${locale}/checkout`}
              className="relative p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Language Switcher (Desktop) */}
            <div className="hidden sm:flex items-center gap-1 ml-2 pl-2 border-l border-gray-200">
              <Link
                href={`/zh-hk${typeof window !== 'undefined' ? window.location.pathname.replace(/^\/(zh-hk|en)/, '') : '/'}`}
                className={`px-2 py-1 text-sm rounded ${locale === 'zh-hk' ? 'bg-primary-100 text-primary-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
              >
                繁
              </Link>
              <Link
                href={`/en${typeof window !== 'undefined' ? window.location.pathname.replace(/^\/(zh-hk|en)/, '') : '/'}`}
                className={`px-2 py-1 text-sm rounded ${locale === 'en' ? 'bg-primary-100 text-primary-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
              >
                EN
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
                    ${item.highlight 
                      ? 'text-accent-600 bg-accent-50' 
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 px-4">
                <span className="text-sm text-gray-500">{t('common.language')}:</span>
                <Link
                  href={`/zh-hk${typeof window !== 'undefined' ? window.location.pathname.replace(/^\/(zh-hk|en)/, '') : '/'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-1 text-sm rounded ${locale === 'zh-hk' ? 'bg-primary-100 text-primary-700 font-medium' : 'text-gray-500'}`}
                >
                  繁體中文
                </Link>
                <Link
                  href={`/en${typeof window !== 'undefined' ? window.location.pathname.replace(/^\/(zh-hk|en)/, '') : '/'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-1 text-sm rounded ${locale === 'en' ? 'bg-primary-100 text-primary-700 font-medium' : 'text-gray-500'}`}
                >
                  English
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
