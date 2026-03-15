import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');

  const quickLinks = [
    { href: '/products', label: t('links.products') },
    { href: '/ai-studio', label: t('links.aiStudio') },
    { href: '/special-offers', label: t('links.specialOffers') },
    { href: '/contact', label: t('links.contact') },
  ];

  const services = [
    { href: '#', label: t('services.flyers') },
    { href: '#', label: t('services.bags') },
    { href: '#', label: t('services.stickers') },
    { href: '#', label: t('services.boxes') },
  ];

  const support = [
    { href: '#', label: t('support.faq') },
    { href: '#', label: t('support.shipping') },
    { href: '#', label: t('support.payment') },
    { href: '#', label: t('support.returns') },
  ];

  return (
    <footer className="bg-brand-dark text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">智</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">
                智印港
              </span>
            </div>
            
            <p className="text-sm leading-relaxed">
              {t('description')}
            </p>

            <div className="space-y-3 pt-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 text-brand-blue" />
                <span className="text-sm">{t('contact.address')}</span>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 mt-0.5 text-brand-blue" />
                <span className="text-sm">{t('contact.phone')}</span>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 mt-0.5 text-brand-blue" />
                <span className="text-sm">{t('contact.email')}</span>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 mt-0.5 text-brand-blue" />
                <span className="text-sm">{t('contact.hours')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {t('headings.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-brand-blue transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {t('headings.services')}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <a
                    href={service.href}
                    className="text-sm hover:text-brand-blue transition-colors"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {t('headings.support')}
            </h3>
            <ul className="space-y-3">
              {support.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm hover:text-brand-blue transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              © 2024 智印港. {t('bottom.copyright')}
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="hover:text-brand-blue transition-colors">
                {t('bottom.privacy')}
              </a>
              <a href="#" className="hover:text-brand-blue transition-colors">
                {t('bottom.terms')}
              </a>
              <a href="#" className="hover:text-brand-blue transition-colors">
                {t('bottom.cookies')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-brand-dark/50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🏢</span>
              <span className="text-sm">香港本地印刷</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📦</span>
              <span className="text-sm">SF Express 配送</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎨</span>
              <span className="text-sm">免费设计服务</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⭐</span>
              <span className="text-sm">4.8/5.0 评分</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}