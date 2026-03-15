'use client';

import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('Hero');

  return (
    <section className="hero-section relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat" />
      </div>

      <div className="hero-content container mx-auto px-4">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-slide-in">
            <span className="text-white font-medium text-sm">
              ⚡ {t('badge')}
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-title">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-white/90">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <button className="btn-cta">
              <span className="flex items-center">
                {t('cta.primary')}
                <span className="ml-2">→</span>
              </span>
            </button>
            <button className="btn-secondary">
              {t('cta.secondary')}
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex items-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏢</span>
              <span className="text-sm">{t('trust.location')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="text-sm">{t('trust.rating')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📦</span>
              <span className="text-sm">{t('trust.delivery')}</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Illustration */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/2 animate-fade-in">
          <div className="relative">
            <div className="w-96 h-96 bg-white/10 backdrop-blur-sm rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <img
              src="/hero-illustration.svg"
              alt={t('imageAlt')}
              className="relative z-10 w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}