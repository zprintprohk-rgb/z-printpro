'use client';

import { useTranslations } from 'next-intl';
import { Clock, Zap } from 'lucide-react';

export default function UrgencyBanner() {
  const t = useTranslations('urgencyBanner');

  return (
    <div className="urgency-banner relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat animate-pulse" />
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Urgency Message */}
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full animate-bounce">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-1">
                {t('title')}
              </h3>
              <p className="text-sm text-white/90">
                {t('subtitle')}
              </p>
            </div>
          </div>

          {/* Center: Countdown Timer */}
          <div className="flex items-center gap-3 bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">
            <Clock className="w-5 h-5 text-white" />
            <div className="text-center">
              <div className="text-2xl font-bold">
                23:59:59
              </div>
              <div className="text-xs text-white/80">
                {t('countdown')}
              </div>
            </div>
          </div>

          {/* Right: CTA Button */}
          <button className="btn-cta shadow-2xl animate-pulse-fast">
            <span className="flex items-center">
              {t('cta')}
              <span className="ml-2">⚡</span>
            </span>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-white/90">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏢</span>
            <span>{t('trust.local')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">📦</span>
            <span>{t('trust.delivery')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🎨</span>
            <span>{t('trust.design')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <span>{t('trust.rating')}</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
    </div>
  );
}