'use client';

import { useTranslations } from 'next-intl';
import { Rotate3d, ZoomIn, Eye } from 'lucide-react';
import { useState } from 'react';

export default function ProductPreview() {
  const t = useTranslations('productPreview');
  const [rotation, setRotation] = useState(0);

  return (
    <div className="product-preview bg-white py-20">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* 3D Preview Area */}
          <div className="product-card p-8 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="relative">
              
              {/* 3D Rotation Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => setRotation((r) => r + 90)}
                  className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:scale-110 transition-transform"
                  title={t('controls.rotate')}
                  disabled
                >
                  <Rotate3d className="w-5 h-5 text-brand-blue" />
                </button>
                <button
                  className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:scale-110 transition-transform"
                  title={t('controls.zoom')}
                  disabled
                >
                  <ZoomIn className="w-5 h-5 text-brand-blue" />
                </button>
                <button
                  className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:scale-110 transition-transform"
                  title={t('controls.preview')}
                  disabled
                >
                  <Eye className="w-5 h-5 text-brand-blue" />
                </button>
              </div>

              {/* Placeholder for 3D Preview */}
              <div className="aspect-square bg-white rounded-lg shadow-lg flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-32 h-32 bg-brand-blue/10 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse-slow">
                    <Rotate3d className="w-16 h-16 text-brand-blue" />
                  </div>
                  <p className="text-gray-500 text-sm">
                    {t('placeholder')}
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    {t('hint')}
                  </p>
                </div>
              </div>

              {/* Rotation Angle Display */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium text-gray-700">
                {t('angle')}: {rotation}°
              </div>
            </div>

            {/* View Options */}
            <div className="mt-6 flex justify-center gap-4">
              {['Front', 'Back', 'Left', 'Right', 'Top', 'Bottom'].map((view) => (
                <button
                  key={view}
                  className="px-4 py-2 bg-white rounded-lg text-sm font-medium hover:bg-brand-blue hover:text-white transition shadow-sm"
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            
            {/* Title */}
            <div>
              <h3 className="text-3xl font-bold mb-3 text-gray-900">
                {t('product.name')}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-brand-blue">
                  {t('product.price')}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {t('product.originalPrice')}
                </span>
                <span className="bg-urgency-red text-white text-xs font-bold px-2 py-1 rounded">
                  {t('product.discount')}
                </span>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-900">
                {t('features.title')}
              </h4>
              <ul className="space-y-2">
                {[
                  t('features.list.0'),
                  t('features.list.1'),
                  t('features.list.2'),
                  t('features.list.3'),
                  t('features.list.4'),
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 rounded-full mt-2 bg-brand-blue flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Dimensions */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-900">
                {t('dimensions.title')}
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-brand-blue">
                    {t('dimensions.width')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {t('dimensions.widthLabel')}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-brand-blue">
                    {t('dimensions.height')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {t('dimensions.heightLabel')}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-brand-blue">
                    {t('dimensions.depth')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {t('dimensions.depthLabel')}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-cta flex-1">
                {t('cta.primary')}
              </button>
              <button className="btn-secondary flex-1">
                {t('cta.secondary')}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}