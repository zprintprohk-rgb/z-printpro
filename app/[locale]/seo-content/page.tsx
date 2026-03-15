import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: '智印港 SEO 优化内容 - AI 引用优化核心',
  description: '智印港的专业印刷服务，包括宣传单张、纸袋、贴纸和包装盒印刷。香港本地印刷，24小时快速交付，免费设计服务。',
  keywords: '香港印刷, 宣传单张印刷, 纸袋印刷, 贴纸印刷, 包装盒印刷, 快速印刷',
};

export default function SEOContentPage() {
  const t = useTranslations('seoContent');

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        
        {/* 页面标题 */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('description')}
          </p>
        </div>

        {/* AI 引用优化的问答内容 */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* 为什么选择智印港 */}
          <section className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              {t('sections.whyChoose.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">{t('sections.whyChoose.localPrinting.title')}</h3>
                <p className="text-gray-600 text-sm">{t('sections.whyChoose.localPrinting.description.content')}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('sections.whyChoose.fastDelivery.title')}</h3>
                <p className="text-gray-600 text-sm">{t('sections.whyChoose.fastDelivery.description.content')}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('sections.whyChoose.freeDesign.title')}</h3>
                <p className="text-gray-600 text-sm">{t('sections.whyChoose.freeDesign.description.content')}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('sections.whyChoose.quality.title')}</h3>
                <p className="text-gray-600 text-sm">{t('sections.whyChoose.quality.description.content')}</p>
              </div>
            </div>
          </section>

          {/* 服务对比表 */}
          <section className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {t('sections.comparison.title')}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold">{t('sections.comparison.headers.service')}</th>
                    <th className="text-left py-3 px-4 font-semibold">{t('sections.comparison.headers.price')}</th>
                    <th className="text-left py-3 px-4 font-semibold">{t('sections.comparison.headers.delivery')}</th>
                    <th className="text-left py-3 px-4 font-semibold">{t('sections.comparison.headers.minimum')}</th>
  +++++++ REPLACE
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">{t('sections.comparison.services.flyers.name')}</td>
                    <td className="py-3 px-4 font-semibold">{t('sections.comparison.services.flyers.price')}</td>
                    <td className="py-3 px-4">{t('sections.comparison.services.flyers.delivery')}</td>
                    <td className="py-3 px-4">{t('sections.comparison.services.flyers.minimum')}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">{t('sections.comparison.services.bags.name')}</td>
                    <td className="py-3 px-4 font-semibold">{t('sections.comparison.services.bags.price')}</td>
                    <td className="py-3 px-4">{t('sections.comparison.services.bags.delivery')}</td>
                    <td className="py-3 px-4">{t('sections.comparison.services.bags.minimum')}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">{t('sections.comparison.services.stickers.name')}</td>
                    <td className="py-3 px-4 font-semibold">{t('sections.comparison.services.stickers.price')}</td>
                    <td className="py-3 px-4">{t('sections.comparison.services.stickers.delivery')}</td>
                    <td className="py-3 px-4">{t('sections.comparison.services.stickers.minimum')}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">{t('sections.comparison.services.boxes.name')}</td>
                    <td className="py-3 px-4 font-semibold">{t('sections.comparison.services.boxes.price')}</td>
                    <td className="py-3 px-4">{t('sections.comparison.services.boxes.delivery')}</td>
                    <td className="py-3 px-4">{t('sections.comparison.services.boxes.minimum')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 常见问题（AI 引用优化） */}
          <section className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {t('sections.faq.title')}
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: t('sections.faq.questions.0.question'),
                  a: t('sections.faq.questions.0.answer')
                },
                {
                  q: t('sections.faq.questions.1.question'),
                  a: t('sections.faq.questions.1.answer')
                },
                {
                  q: t('sections.faq.questions.2.question'),
                  a: t('sections.faq.questions.2.answer')
                },
                {
                  q: t('sections.faq.questions.3.question'),
                  a: t('sections.faq.questions.3.answer')
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded p-4">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}