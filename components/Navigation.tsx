'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ShoppingCart, User } from 'lucide-react';

export default function Navigation() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/products', label: t('nav.products') },
    { href: '/ai-studio', label: t('nav.aiStudio') },
    { href: '/special-offers', label: t('nav.specialOffers') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === `/${locale}` || pathname === '/';
    }
    return pathname.includes(href);
  };

  const changeLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href={`/${locale}`} className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">智</span>
              </div>
              <span className="font-heading font-bold text-xl text-brand-blue hidden sm:block">
                智印港
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`/${locale}${item.href}`}
                className={`nav-link ${isActive(item.href) ? 'nav-link-active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="hidden lg:flex items-center space-x-2">
              <button
                onClick={() => changeLocale('zh-hk')}
                className={`text-sm font-medium transition-colors ${
                  locale === 'zh-hk' ? 'text-brand-blue font-bold' : 'text-gray-600 hover:text-brand-blue'
                }`}
              >
                繁
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => changeLocale('en')}
                className={`text-sm font-medium transition-colors ${
                  locale === 'en' ? 'text-brand-blue font-bold' : 'text-gray-600 hover:text-brand-blue'
                }`}
              >
                EN
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => changeLocale('ja')}
                className={`text-sm font-medium transition-colors ${
                  locale === 'ja' ? 'text-brand-blue font-bold' : 'text-gray-600 hover:text-brand-blue'
                }`}
              >
                日本語
              </button>
            </div>

            {/* Cart */}
            <a
              href={`/${locale}/cart`}
              className="relative p-2 text-gray-600 hover:text-brand-blue transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </a>

            {/* User Account */}
            <a
              href={`/${locale}/account`}
              className="hidden sm:block p-2 text-gray-600 hover:text-brand-blue transition-colors"
            >
              <User className="w-6 h-6" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-brand-blue transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`/${locale}${item.href}`}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-lg font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-brand-blue font-bold'
                    : 'text-gray-700 hover:text-brand-blue'
                }`}
              >
                {item.label}
              </a>
            ))}
            
            {/* Mobile Language Switcher */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-around">
                <button
                  onClick={() => {
                    changeLocale('zh-hk');
                    setIsMenuOpen(false);
                  }}
                  className={`text-sm font-medium ${
                    locale === 'zh-hk' ? 'text-brand-blue font-bold' : 'text-gray-600'
                  }`}
                >
                  繁
                </button>
                <button
                  onClick={() => {
                    changeLocale('en');
                    setIsMenuOpen(false);
                  }}
                  className={`text-sm font-medium ${
                    locale === 'en' ? 'text-brand-blue font-bold' : 'text-gray-600'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => {
                    changeLocale('ja');
                    setIsMenuOpen(false);
                  }}
                  className={`text-sm font-medium ${
                    locale === 'ja' ? 'text-brand-blue font-bold' : 'text-gray-600'
                  }`}
                >
                  日本語
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}