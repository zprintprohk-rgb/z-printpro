'use client'

import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { SeoHead } from '@/components/seo/SeoHead'
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'

// ============================================================================
// 智印港 (z-printpro.com) - 聯絡我們頁面
// ============================================================================

export default function ContactPage() {
  const locale = useLocale()
  const t = useTranslations()
  const isHK = locale === 'zh-hk'

  return (
    <>
      <SeoHead pageType="contact" />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 lg:py-24">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {isHK ? '聯絡我們' : 'Contact Us'}
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              {isHK 
                ? '有任何問題？我們隨時為您服務'
                : 'Have questions? We are here to help'}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="container-custom py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone */}
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {isHK ? '電話' : 'Phone'}
              </h3>
              <a href="tel:+85212345678" className="text-primary-600 hover:underline">
                +852 1234 5678
              </a>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                WhatsApp
              </h3>
              <a 
                href="https://wa.me/85212345678 " 
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                +852 1234 5678
              </a>
            </div>

            {/* Email */}
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {isHK ? '電郵' : 'Email'}
              </h3>
              <a href="mailto:info@z-printpro.com" className="text-primary-600 hover:underline">
                info@z-printpro.com
              </a>
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {isHK ? '地址' : 'Address'}
              </h3>
              <p className="text-gray-600 text-sm">
                {isHK ? '香港旺角' : 'Mong Kok, Hong Kong'}
              </p>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="container-custom pb-12 lg:pb-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-bold text-gray-900">
                {isHK ? '營業時間' : 'Business Hours'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">{isHK ? '星期一至五' : 'Monday - Friday'}</span>
                <span className="font-medium">09:00 - 21:00</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">{isHK ? '星期六' : 'Saturday'}</span>
                <span className="font-medium">10:00 - 18:00</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">{isHK ? '星期日' : 'Sunday'}</span>
                <span className="font-medium text-amber-600">{isHK ? '休息' : 'Closed'}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">{isHK ? '公眾假期' : 'Public Holidays'}</span>
                <span className="font-medium text-amber-600">{isHK ? '休息' : 'Closed'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="container-custom pb-12 lg:pb-16">
          <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {isHK ? '立即獲取報價' : 'Get a Quote Now'}
            </h2>
            <p className="text-accent-100 mb-6 max-w-xl mx-auto">
              {isHK 
                ? '通過 WhatsApp 發送您的需求，我們會盡快回覆'
                : 'Send us your requirements via WhatsApp and we will reply soon'}
            </p>
            <a
              href="https://wa.me/85212345678 "
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-accent-600 font-semibold px-8 py-3 rounded-xl hover:bg-accent-50 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {isHK ? 'WhatsApp 聯繫' : 'Contact via WhatsApp'}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}  