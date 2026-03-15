'use client';

import { useTranslations } from 'next-intl';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  onAddToCart?: () => void;
}

export default function ProductCard({
  title,
  price,
  originalPrice,
  discount,
  image,
  rating = 4.8,
  reviews = 256,
  badge,
  onAddToCart,
}: ProductCardProps) {
  const t = useTranslations('productCard');

  return (
    <div className="product-card group">
      
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 left-4 bg-urgency-red text-white text-xs font-bold px-3 py-1 rounded-full z-10 animate-pulse">
          {badge}
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Quick Add Button */}
        <button
          onClick={onAddToCart}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
          title={t('addToCart')}
        >
          <ShoppingCart className="w-5 h-5 text-brand-blue" />
        </button>

        {/* Discount Badge */}
        {discount && originalPrice && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-center">
            <span className="text-xs text-gray-500 line-through">
              {originalPrice}
            </span>
            <span className="block text-sm font-bold text-urgency-red">
              {discount} OFF
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 text-gray-900 line-clamp-2 group-hover:text-brand-blue transition-colors">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? 'text-yellow-500 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {rating} ({reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-brand-blue">
              HKD {price}
            </span>
            {originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                HKD {originalPrice}
              </span>
            )}
          </div>

          {/* CTA Button */}
          <button
            onClick={onAddToCart}
            className="btn-sm btn-cta animate-pulse-fast group-hover:animate-pulse"
          >
            <div className="flex items-center gap-1">
              <span className="hidden sm:inline">{t('buyNow')}</span>
              <Zap className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

    </div>
  );
}