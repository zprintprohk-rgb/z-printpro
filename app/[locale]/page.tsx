import { useTranslations } from 'next-intl'
import { SeoHead, generateProductMetadata } from '@/components/seo/SeoHead'
import { getAllCategories, getBestsellerProducts } from '@/lib/products'
import Link from 'next/link'

export default function HomePage() {
  const t = useTranslations()
  const categories = getAllCategories()
  const bestsellers = getBestsellerProducts(4)

  return (
    <>
      <SeoHead pageType="home" />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 lg:py-32">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-1 mb-6">
              {t('seo.homeTitle').split('|')[0]}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-primary-100">
              {t('seo.homeDescription')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/products" 
                className="btn-accent text-lg px-8 py-4"
              >
                {t('product.viewAll')}
              </Link>
              <Link 
                href="/ai-studio" 
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-700 text-lg px-8 py-4"
              >
                {t('nav.aiStudio')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-40 w-48 h-48 bg-accent-400 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">{t('product.categories')}</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('nav.products')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}/`}
                className="group bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <span className="text-2xl">🖨️</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.count} {t('product.items')}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="section">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-8 lg:p-12 text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-medium mb-4">
                  {t('common.learnMore')}
                </span>
                <h2 className="heading-2 mb-4">{t('specialOffers.title')}</h2>
                <p className="text-lg text-accent-100 mb-6 max-w-xl">
                  {t('specialOffers.subtitle')}
                </p>
                <Link 
                  href="/special-offers/" 
                  className="inline-block bg-white text-accent-600 font-semibold px-8 py-3 rounded-lg hover:bg-accent-50 transition-colors"
                >
                  {t('common.getStarted')} →
                </Link>
              </div>
              <div className="flex gap-4">
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold mb-1">300×440</div>
                  <div className="text-sm text-accent-100">mm</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold mb-1">350×500</div>
                  <div className="text-sm text-accent-100">mm ⭐</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold mb-1">510×730</div>
                  <div className="text-sm text-accent-100">mm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Studio Section */}
      <section className="section bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
                AI Powered
              </span>
              <h2 className="heading-2 mb-4">{t('aiStudio.title')}</h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('aiStudio.description')}
              </p>
              <ul className="space-y-3 mb-8">
                {['upscale', 'colorCorrection', 'backgroundRemoval', 'styleTransfer'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">✓</span>
                    <span>{t(`aiStudio.enhance.${feature}`)}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href="/ai-studio/" 
                className="btn-primary"
              >
                {t('common.getStarted')} →
              </Link>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-6">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                    <span className="text-6xl">🎨</span>
                  </div>
                  <div className="mt-4 flex justify-center gap-2">
                    {t('aiStudio.steps').split(',').map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-primary-500' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent-400 rounded-full opacity-20 blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-400 rounded-full opacity-20 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="heading-2">{t('product.bestseller')}</h2>
            <Link 
              href="/products" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              {t('common.viewAll')} →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}/`}
                className="group bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <span className="text-4xl">🖨️</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-primary-600 font-bold">
                    {product.price} {t('product.from')}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {t('product.minQuantity')}: {product.minQty}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section-sm border-t">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl mb-2">🚚</div>
              <h4 className="font-semibold">{t('shipping.freeShipping')}</h4>
              <p className="text-sm text-gray-500">{t('shipping.freeShippingThreshold')}</p>
            </div>
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-semibold">{t('product.fastDelivery')}</h4>
              <p className="text-sm text-gray-500">24H {t('product.sameDay')}</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🎨</div>
              <h4 className="font-semibold">{t('product.freeDesign')}</h4>
              <p className="text-sm text-gray-500">{t('common.learnMore')}</p>
            </div>
            <div>
              <div className="text-3xl mb-2">✓</div>
              <h4 className="font-semibold">ISO 9001</h4>
              <p className="text-sm text-gray-500">{t('product.quality')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{t('footer.about')}</h3>
              <p className="text-gray-400 text-sm">
                {t('seo.homeDescription')}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.products.title')}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {categories.slice(0, 5).map((cat) => (
                  <li key={cat.slug}>
                    <Link href={`/category/${cat.slug}/`} className="hover:text-white transition-colors">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.support.title')}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/faq/" className="hover:text-white transition-colors">{t('nav.faq')}</Link></li>
                <li><Link href="/shipping/" className="hover:text-white transition-colors">{t('nav.shipping')}</Link></li>
                <li><Link href="/payment/" className="hover:text-white transition-colors">{t('nav.payment')}</Link></li>
                <li><Link href="/design-guide/" className="hover:text-white transition-colors">{t('nav.designGuide')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.contact.title')}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>{t('footer.contact.phone')}: +852 1234 5678</li>
                <li>{t('footer.contact.email')}: info@z-printpro.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </div>
        </div>
      </footer>
    </>
  )
}