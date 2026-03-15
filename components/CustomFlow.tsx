'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Upload, Palette, Package } from 'lucide-react';

export default function CustomFlow() {
  const t = useTranslations('customFlow');

  const steps = [
    {
      icon: Upload,
      title: t('steps.0.title'),
      description: t('steps.0.description'),
      color: 'bg-blue-500',
      bgLight: 'bg-blue-50',
    },
    {
      icon: Palette,
      title: t('steps.1.title'),
      description: t('steps.1.description'),
      color: 'bg-orange-500',
      bgLight: 'bg-orange-50',
    },
    {
      icon: Package,
      title: t('steps.2.title'),
      description: t('steps.2.description'),
      color: 'bg-green-500',
      bgLight: 'bg-green-50',
    },
  ];

  return (
    <div className="custom-flow bg-brand-light py-20">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div
                key={index}
                className={`feature-card relative ${step.bgLight} transform hover:scale-105 transition-all duration-300`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${step.color} shadow-lg mb-6`}>
  +++++++ REPLACE
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {step.description}
                </p>

                {!isLast && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:flex">
                    <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-brand-blue" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-card text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            {t('cta.title')}
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-cta">
              {t('cta.primary')}
            </button>
            <button className="btn-secondary">
              {t('cta.secondary')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}