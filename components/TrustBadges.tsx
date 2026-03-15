'use client';

import { useTranslations } from 'next-intl';
import { Shield, CheckCircle, Clock, Truck, Star } from 'lucide-react';

export default function TrustBadges() {
  const t = useTranslations('trustBadges');

  const badges = [
    {
      icon: Shield,
      title: t('badges.0.title'),
      description: t('badges.0.description'),
      color: 'text-blue-600',
      bgLight: 'bg-blue-50',
    },
    {
      icon: CheckCircle,
      title: t('badges.1.title'),
      description: t('badges.1.description'),
      color: 'text-green-600',
      bgLight: 'bg-green-50',
    },
    {
      icon: Clock,
      title: t('badges.2.title'),
      description: t('badges.2.description'),
      color: 'text-orange-600',
      bgLight: 'bg-orange-50',
    },
    {
      icon: Truck,
      title: t('badges.3.title'),
      description: t('badges.3.description'),
      color: 'text-purple-600',
      bgLight: 'bg-purple-50',
    },
    {
      icon: Star,
      title: t('badges.4.title'),
      description: t('badges.4.description'),
      color: 'text-yellow-600',
      bgLight: 'bg-yellow-50',
    },
  ];

  return (
    <div className="trust-badges py-16">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className={`feature-card text-center ${badge.bgLight} transform hover:scale-105 transition-all duration-300`}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-white shadow-lg">
                  <Icon className={`w-8 h-8 ${badge.color}`} />
                </div>
                <h3 className="font-bold mb-2 text-gray-900 text-sm">
                  {badge.title}
                </h3>
                <p className="text-gray-600 text-xs">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}