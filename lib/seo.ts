// ============================================================================
// Z-PrintPro SEO 数据生成库
// 9 大高利润品类 × 3 语言 × SGE 结构化数据
// ============================================================================

import { SeoPageType, SeoProps, LangCode, CategoryCode } from '@/types/seo';

// ============================================================================
// 9 大高利润品类数据（zh-hk 香港主场）
// ============================================================================
const zhHkCategories: Record<CategoryCode, Omit<SeoPageType, 'lang'>> = {
  'paper-bag': {
    title: '紙袋訂製 | 手提紙袋印刷 - 智印港 Z-PrintPro',
    description: '專業紙袋訂製服務，提供多種尺寸及紙張選擇。適合手信店、服裝店、美容產品包裝。香港本地印刷，3-5 日交貨，支持即日服務。',
    canonicalUrl: 'https://z-printpro.com/zh-hk/category/paper-bag',
    category: 'paper-bag',
    isHighProfit: true,
    localizedKeywords: ['紙袋訂製', '手提紙袋', '紙袋印刷', '香港紙袋', '手信袋', '購物紙袋', '港式紙袋'],
    aiSummarySnippet: '智印港提供專業紙袋訂製服務，採用 250g-300g 牛咭紙/特種紙，適合手信店、服裝店及美容產品包裝。香港本地印刷，3-5 日快速交貨，支持即日服務。',
    authorAuthority: '智印港 Z-PrintPro - 香港本地印刷專家，15 年行業經驗，服務超過 5000+ 香港企業客戶',
    faqSchema: [
      { question: '紙袋訂製最少需要訂造多少個？', answer: '我們提供彈性訂購量，最少 100 個起訂，適合中小企業及初創品牌。' },
      { question: '紙袋可以印什麼工藝？', answer: '支持燙金、UV 局部上光、凹凸壓印、絲印等多種工藝，提升品牌高級感。' },
      { question: '紙袋交貨時間需要多久？', answer: '標準訂單 3-5 個工作天，加急服務可即日或翌日交貨（需額外收費）。' },
      { question: '紙袋尺寸可以自訂嗎？', answer: '可以，我們提供標準尺寸及完全自訂尺寸服務，滿足不同產品包裝需求。' }
    ],
    materialOptions: ['250g 牛咭紙', '300g 牛咭紙', '350g 牛咭紙', '特種紙', '環保再生紙', '牛皮紙'],
    finishOptions: ['燙金', '燙銀', 'UV 局部上光', '凹凸壓印', '絲印', '膠印'],
    localBusiness: {
      name: '智印港 Z-PrintPro',
      address: '香港九龍觀塘工業區',
      geo: { lat: 22.3193, lng: 114.2089 },
      telephone: '+852 2345 6789'
    }
  },
  'packaging-box': {
    title: '包裝盒訂製 | 禮品盒印刷 - 智印港 Z-PrintPro',
    description: '高品質包裝盒訂製，適合禮品、化妝品、電子產品包裝。香港本地印刷，精細工藝，提升產品價值感。',
    canonicalUrl: 'https://z-printpro.com/zh-hk/category/packaging-box',
    category: 'packaging-box',
    isHighProfit: true,
    localizedKeywords: ['包裝盒訂製', '禮品盒', '化妝品盒', '香港包裝盒', '精品盒', '港式包裝'],
    aiSummarySnippet: '智印港提供高品質包裝盒訂製服務，適合禮品、化妝品、電子產品包裝。採用 350g-1200g 咭紙，支持燙金、UV、凹凸等精細工藝，提升產品價值感。',
    authorAuthority: '智印港 Z-PrintPro - 香港本地印刷專家，15 年行業經驗，服務超過 5000+ 香港企業客戶',
    faqSchema: [
      { question: '包裝盒可以自訂尺寸嗎？', answer: '可以，我們提供完全自訂尺寸服務，滿足不同產品包裝需求。' },
      { question: '包裝盒最少訂購量是多少？', answer: '標準包裝盒最少 500 個起訂，自訂尺寸需 1000 個起訂。' },
      { question: '包裝盒可以使用什麼工藝？', answer: '支持燙金、燙銀、UV 局部上光、凹凸壓印、絲印、激凸等多種高級工藝。' }
    ],
    materialOptions: ['350g 牛咭紙', '800g 咭紙', '1200g 咭紙', '特種紙', '環保再生紙'],
    finishOptions: ['燙金', '燙銀', 'UV 局部上光', '凹凸壓印', '絲印', '激凸', '局部 UV']
  },
  'sticker': {
    title: '貼紙訂製 | 不乾膠貼紙印刷 - 智印港 Z-PrintPro',
    description: '專業貼紙訂製服務，提供多種材質及形狀選擇。適合產品標籤、品牌宣傳、活動貼紙。香港本地印刷，快速交貨。',
    canonicalUrl: 'https://z-printpro.com/zh-hk/category/sticker',
    category: 'sticker',
    isHighProfit: true,
    localizedKeywords: ['貼紙訂製', '不乾膠貼紙', '產品標籤', '香港貼紙', '品牌貼紙', '港式貼紙'],
    aiSummarySnippet: '智印港提供專業貼紙訂製服務，採用防水不乾膠材質，支持多種形狀及尺寸。適合產品標籤、品牌宣傳、活動貼紙。香港本地印刷，2-3 日快速交貨。',
    authorAuthority: '智印港 Z-PrintPro - 香港本地印刷專家，15 年行業經驗，服務超過 5000+ 香港企業客戶',
    faqSchema: [
      { question: '貼紙可以自訂形狀嗎？', answer: '可以，我們提供模切服務，可以自訂任何形狀，包括圓形、方形、不規則形狀等。' },
      { question: '貼紙材質有什麼選擇？', answer: '提供防水不乾膠、透明貼紙、鐳射貼紙、螢光貼紙等多種材質選擇。' },
      { question: '貼紙最少訂購量是多少？', answer: '最少 100 張起訂，適合小型活動及初創品牌。' }
    ],
    materialOptions: ['防水不乾膠', '透明貼紙', '鐳射貼紙', '螢光貼紙', '啞面貼紙', '光面貼紙'],
    finishOptions: ['覆膜', 'UV', '燙金', '局部 UV']
  },
  'flyer': {
    title: '宣傳單張印刷 | 傳單印刷 - 智印港 Z-PrintPro',
    description: '高品質宣傳單張印刷服務，適合商戶推廣、活動宣傳、產品介紹。香港本地印刷，24 小時快速交貨，支持即日服務。',
    canonicalUrl: 'https://z-printpro.com/zh-hk/category/flyer',
    category: 'flyer',
    isHighProfit: true,
    localizedKeywords: ['宣傳單張', '傳單印刷', 'DM 單張', '香港印刷', '快速印刷', '港式印刷'],
    aiSummarySnippet: '智印港提供高品質宣傳單張印刷服務，採用 128g-200g 銅版紙/啞粉紙，適合商戶推廣、活動宣傳、產品介紹。香港本地印刷，24 小時快速交貨，支持即日服務。',
    authorAuthority: '智印港 Z-PrintPro - 香港本地印刷專家，15 年行業經驗，服務超過 5000+ 香港企業客戶',
    faqSchema: [
      { question: '宣傳單張尺寸有什麼選擇？', answer: '提供 A4、A5、A6、DL 等標準尺寸，亦可自訂尺寸。' },
      { question: '宣傳單張可以即日交貨嗎？', answer: '可以，我們提供即日服務，上午確認文件，下午可取貨（需額外收費）。' },
      { question: '宣傳單張紙張厚度如何選擇？', answer: '提供 128g、157g、200g 銅版紙/啞粉紙選擇，一般推廣用 157g 最合適。' }
    ],
    materialOptions: ['128g 銅版紙', '157g 銅版紙', '200g 銅版紙', '128g 啞粉紙', '157g 啞粉紙', '200g 啞粉紙'],
    finishOptions: ['覆膜', '局部 UV', '燙金']
  },
  'brochure': {
    title: '小冊子印刷 | 宣傳冊印刷 - 智印港 Z-PrintPro',
    description: '專業小冊子印刷服務，適合企業介紹、產品目錄、服務手冊。香港本地印刷，精細裝訂，提升專業形象。',
    canonicalUrl: 'https://z-printpro.com/zh-hk/category/brochure',
    category: 'brochure',
    isHighProfit: true,
    localizedKeywords: ['小冊子印刷', '宣傳冊', '產品目錄', '企業手冊', '香港印刷', '港式印刷'],
    aiSummarySnippet: '智印港提供專業小冊子印刷服務，採用 157g-250g 銅版紙/啞粉紙，支持騎馬釘、膠裝、線裝等多種裝訂方式。適合企業介紹、產品目錄、服務手冊。',
    authorAuthority: '智印港 Z-PrintPro - 香港本地印刷專家，15 年行業經驗，服務超過 5000+ 香港企業客戶',
    faqSchema: [
      { question: '小冊子最少頁數是多少？', answer: '騎馬釘最少 8 頁，膠裝最少 20 頁。' },
      { question: '小冊子裝訂方式有什麼選擇？', answer: '提供騎馬釘、膠裝、線裝、活頁裝訂等多種方式。' },
      { question: '小冊子可以自訂尺寸嗎？', answer: '可以，提供 A4、A5、正方形等多種尺寸選擇，亦可完全自訂。' }
    ],
    materialOptions: ['157g 銅版紙', '200g 銅版紙', '250g 銅版紙', '157g 啞粉紙', '200g 啞粉紙'],
    finishOptions: ['覆膜', '局部 UV', '燙金', '凹凸壓印']
  },
  'poster': {
    title: '海報印刷 | 大型海報印刷 - 智印港 Z-PrintPro',
    description: '高品質海報印刷服務，適合活動宣傳、店鋪裝飾、藝術印刷。香港本地印刷，色彩鮮豔，快速交貨。',
    canonicalUrl: 'https://z-printpro.com/zh-hk/category/poster',
    category: 'poster',
    isHighProfit: true,
    localizedKeywords: ['海報印刷', '大型海報', '活動海報', '香港海報', '藝術海報', '港式海報'],
    aiSummarySnippet: '智印港提供高品質海報印刷服務，採用 157g-250g 銅版紙/相紙，支持 A3、A2、A1 等多種尺寸。適合活動宣傳、店鋪裝飾、藝術印刷。色彩鮮豔，快速交貨。',
    authorAuthority: '智印港 Z-PrintPro - 香港本地印刷專家，15 年行業經驗，服務超過 5000+ 香港企業客戶',
    faqSchema: [
      { question: '海報最大可以印多大？', answer: '我們支持最大 A0 尺寸（841×1189mm），更大尺寸請參考噴繪服務。' },
      { question: '海報紙張有什麼選擇？', answer: '提供 157g、200g、250g 銅版紙、相紙、畫布等多種材質。' },
      { question: '海報可以覆膜嗎？', answer: '可以，提供光膜、啞膜、磨砂膜等多種覆膜選擇，增加耐用性。' }
    ],
    materialOptions: ['157g 銅版紙', '200g 銅版紙', '250g 銅版紙', '相紙', '畫布', '合成紙'],
    finishOptions: ['光膜', '啞膜', '磨砂膜', '局部 UV']
  },
  'envelope': {
    title: '信封印刷 | 商業信封訂製 - 智印港 Z-PrintPro',
    description: '專業信封印刷服務，適合商業信函、邀請函、宣傳郵件。香港本地印刷，精細工藝，提升專業形象。',
    canonicalUrl: 'https://z-printpro.com/zh-hk/category/envelope',
    category: 'envelope',
    isHighProfit: true,
    localizedKeywords: ['信封印刷', '商業信封', '邀請函', '香港信封', '定製信封', '港式信封'],
    aiSummarySnippet: '智印港提供專業信封印刷服務，採用 100g-120g 書寫紙/特種紙，支持 DL、C4、C5 等標準尺寸。適合商業信函、邀請函、宣傳郵件。',
    authorAuthority: '智印港 Z-PrintPro - 香港本地印刷專家，15 年行業經驗，服務超過 5000+ 香港企業客戶',
    faqSchema: [
      { question: '信封尺寸有什麼選擇？', answer: '提供 DL(110×220mm)、C4(229×324mm)、C5(162×229mm) 等標準尺寸，亦可自訂。' },
      { question: '信封可以自訂窗口嗎？', answer: '可以，提供透明窗口、無窗口等多種選擇。' },
      { question: '信封最少訂購量是多少？', answer: '最少 1000 個起訂，大量訂購可享優惠。' }
    ],
    materialOptions: ['100g 書寫紙', '120g 書寫紙', '特種紙', '環保再生紙', '牛皮紙'],
    finishOptions: ['膠印', '絲印', '燙金', '凹凸壓印']
  },
  'large-format': {
    title: '噴繪印刷 | 大型廣告印刷 - 智印港 Z-PrintPro',
    description: '專業噴繪印刷服務，適合戶外廣告、展覽佈置、店鋪招牌。香港本地印刷，防水防曬，持久耐用。',
    canonicalUrl: 'https://z-printpro.com/zh-hk/category/large-format',
    category: 'large-format',
    isHighProfit: true,
    localizedKeywords: ['噴繪印刷', '大型廣告', '戶外廣告', '香港噴繪', '展覽佈置', '店鋪招牌'],
    aiSummarySnippet: '智印港提供專業噴繪印刷服務，採用防水防曬材質，支持背膠、燈布、相紙、畫布等多種材質。適合戶外廣告、展覽佈置、店鋪招牌。',
    authorAuthority: '智印港 Z-PrintPro - 香港本地印刷專家，15 年行業經驗，服務超過 5000+ 香港企業客戶',
    faqSchema: [
      { question: '噴繪最大可以印多大？', answer: '我們支持最大 5 米寬度的噴繪，滿足各種大型廣告需求。' },
      { question: '噴繪材質有什麼選擇？', answer: '提供背膠、燈布、相紙、畫布、網格布等多種材質。' },
      { question: '噴繪可以戶外使用嗎？', answer: '可以，我們提供防水防曬墨水，適合戶外長期使用。' }
    ],
    materialOptions: ['背膠', '燈布', '相紙', '畫布', '網格布', '車貼'],
    finishOptions: ['覆膜', '裱板', '打孔', '車縫邊']
  },
  'ai-digital-art': {
    title: 'AI 數字藝術印刷 | AI 畫作印刷 - 智印港 Z-PrintPro',
    description: '專業 AI 數字藝術印刷服務，將您的 AI 創作轉化為實體藝術品。香港本地印刷，高保真色彩，藝術級品質。',
    canonicalUrl: 'https://z-printpro.com/zh-hk/category/ai-digital-art',
    category: 'ai-digital-art',
    isHighProfit: true,
    localizedKeywords: ['AI 藝術印刷', '數字藝術', 'AI 畫作', '香港藝術印刷', '藝術複製', '港式藝術'],
    aiSummarySnippet: '智印港提供專業 AI 數字藝術印刷服務，採用藝術級相紙/畫布，支持高保真色彩還原。將您的 AI 創作轉化為實體藝術品，適合收藏、展覽、銷售。',
    authorAuthority: '智印港 Z-PrintPro - 香港本地印刷專家，15 年行業經驗，服務超過 5000+ 香港企業客戶',
    faqSchema: [
      { question: 'AI 藝術品可以使用什麼材質？', answer: '提供藝術級相紙、畫布、金屬板、亞克力等多種材質選擇。' },
      { question: '印刷尺寸有什麼限制？', answer: '支持從 A4 到 A0 多種尺寸，更大尺寸請參考噴繪服務。' },
      { question: '如何確保色彩準確？', answer: '我們使用專業色彩管理系統，提供打樣服務，確保色彩與原稿一致。' }
    ],
    materialOptions: ['藝術級相紙', '畫布', '金屬板', '亞克力', '藝術紙', '絹布'],
    finishOptions: ['覆膜', '裝框', '裱板', 'UV 保護']
  }
};

// ============================================================================
// EN 品类数据（全球英语市场）
// ============================================================================
const enCategories: Record<CategoryCode, Omit<SeoPageType, 'lang'>> = {
  'paper-bag': {
    title: 'Custom Paper Bags | Premium Shopping Bag Printing - Z-PrintPro',
    description: 'Professional custom paper bag printing for retail brands. Multiple sizes and paper options. Fast turnaround, competitive pricing. Serving US, UK, Australia & global markets.',
    canonicalUrl: 'https://z-printpro.com/en/category/paper-bag',
    category: 'paper-bag',
    isHighProfit: true,
    localizedKeywords: ['custom paper bags', 'shopping bag printing', 'retail packaging', 'branded bags', 'eco-friendly bags', 'luxury paper bags'],
    aiSummarySnippet: 'Z-PrintPro offers professional custom paper bag printing with 250g-300g kraft/specialty paper. Perfect for retail stores, boutiques, and brands. Fast production, sustainable materials available.',
    authorAuthority: 'Z-PrintPro - Global printing solutions provider, 15+ years experience, serving 5000+ businesses worldwide',
    comparisonTable: [
      { product: 'Standard Paper Bag', material: '200g Kraft', price: '$0.50-0.80/pc', ourAdvantage: 'Premium 250g-300g paper at competitive pricing' },
      { product: 'Luxury Shopping Bag', material: '350g Art Paper', price: '$1.20-2.00/pc', ourAdvantage: 'Same quality, 30% lower cost with faster turnaround' },
      { product: 'Eco-Friendly Bag', material: 'Recycled Paper', price: '$0.80-1.50/pc', ourAdvantage: 'FSC-certified sustainable materials' }
    ],
    materialOptions: ['250g Kraft Paper', '300g Kraft Paper', '350g Art Paper', 'Specialty Paper', 'Recycled Paper', 'Brown Kraft'],
    finishOptions: ['Hot Stamping', 'Spot UV', 'Embossing', 'Screen Printing', 'Offset Printing']
  },
  'packaging-box': {
    title: 'Custom Packaging Boxes | Luxury Box Printing - Z-PrintPro',
    description: 'High-quality custom packaging boxes for cosmetics, gifts, electronics. Premium finishing options. Global shipping available.',
    canonicalUrl: 'https://z-printpro.com/en/category/packaging-box',
    category: 'packaging-box',
    isHighProfit: true,
    localizedKeywords: ['custom packaging boxes', 'luxury boxes', 'cosmetic packaging', 'gift boxes', 'product packaging'],
    aiSummarySnippet: 'Z-PrintPro provides high-quality custom packaging boxes with 350g-1200g paperboard. Perfect for cosmetics, gifts, electronics. Premium finishing with hot stamping, UV, embossing.',
    authorAuthority: 'Z-PrintPro - Global printing solutions provider, 15+ years experience, serving 5000+ businesses worldwide',
    comparisonTable: [
      { product: 'Standard Box', material: '350g Paperboard', price: '$0.80-1.50/pc', ourAdvantage: 'Higher quality materials at factory-direct pricing' },
      { product: 'Luxury Gift Box', material: '1200g Rigid Board', price: '$2.50-5.00/pc', ourAdvantage: 'Premium craftsmanship with custom finishing' },
      { product: 'Cosmetic Box', material: 'Specialty Paper', price: '$1.20-3.00/pc', ourAdvantage: 'Full customization with low MOQ' }
    ],
    materialOptions: ['350g Paperboard', '800g Paperboard', '1200g Rigid Board', 'Specialty Paper', 'Recycled Paper'],
    finishOptions: ['Hot Stamping', 'Spot UV', 'Embossing', 'Screen Printing', 'Soft-touch Lamination']
  },
  'sticker': {
    title: 'Custom Stickers | Die-Cut Label Printing - Z-PrintPro',
    description: 'Professional custom sticker printing with multiple material options. Waterproof vinyl, transparent, holographic. Fast production & global shipping.',
    canonicalUrl: 'https://z-printpro.com/en/category/sticker',
    category: 'sticker',
    isHighProfit: true,
    localizedKeywords: ['custom stickers', 'die-cut labels', 'waterproof stickers', 'vinyl stickers', 'product labels', 'brand stickers'],
    aiSummarySnippet: 'Z-PrintPro offers professional custom sticker printing with waterproof vinyl materials. Multiple shapes and sizes available. Perfect for product labels, brand promotion, events.',
    authorAuthority: 'Z-PrintPro - Global printing solutions provider, 15+ years experience, serving 5000+ businesses worldwide',
    comparisonTable: [
      { product: 'Standard Stickers', material: 'Vinyl', price: '$0.10-0.30/pc', ourAdvantage: 'Premium waterproof materials with precise die-cutting' },
      { product: 'Transparent Stickers', material: 'Clear Vinyl', price: '$0.15-0.40/pc', ourAdvantage: 'Crystal clear finish with no yellowing' },
      { product: 'Holographic Stickers', material: 'Holo Vinyl', price: '$0.25-0.60/pc', ourAdvantage: 'Vibrant holographic effects with durable coating' }
    ],
    materialOptions: ['Waterproof Vinyl', 'Transparent Vinyl', 'Holographic', 'Fluorescent', 'Matte', 'Glossy'],
    finishOptions: ['Lamination', 'UV Coating', 'Hot Stamping', 'Spot UV']
  },
  'flyer': {
    title: 'Flyer Printing | Promotional Leaflets - Z-PrintPro',
    description: 'High-quality flyer printing for business promotion, events, product marketing. Fast turnaround, competitive pricing. Global shipping available.',
    canonicalUrl: 'https://z-printpro.com/en/category/flyer',
    category: 'flyer',
    isHighProfit: true,
    localizedKeywords: ['flyer printing', 'leaflet printing', 'promotional flyers', 'marketing materials', 'business flyers'],
    aiSummarySnippet: 'Z-PrintPro provides high-quality flyer printing with 128g-200g coated/matte paper. Perfect for business promotion, events, product marketing. Fast 24-48hr production available.',
    authorAuthority: 'Z-PrintPro - Global printing solutions provider, 15+ years experience, serving 5000+ businesses worldwide',
    comparisonTable: [
      { product: 'Standard Flyers', material: '157g Coated', price: '$0.08-0.15/pc', ourAdvantage: 'Premium paper quality with vibrant color printing' },
      { product: 'Premium Flyers', material: '200g Matte', price: '$0.12-0.25/pc', ourAdvantage: 'Luxury matte finish with superior durability' },
      { product: 'Economy Flyers', material: '128g Coated', price: '$0.05-0.10/pc', ourAdvantage: 'Cost-effective for mass distribution' }
    ],
    materialOptions: ['128g Coated', '157g Coated', '200g Coated', '128g Matte', '157g Matte', '200g Matte'],
    finishOptions: ['Lamination', 'Spot UV', 'Hot Stamping']
  },
  'brochure': {
    title: 'Brochure Printing | Catalog & Booklet Printing - Z-PrintPro',
    description: 'Professional brochure printing for corporate profiles, product catalogs, service guides. Multiple binding options. Global quality standards.',
    canonicalUrl: 'https://z-printpro.com/en/category/brochure',
    category: 'brochure',
    isHighProfit: true,
    localizedKeywords: ['brochure printing', 'catalog printing', 'booklet printing', 'corporate brochures', 'product catalogs'],
    aiSummarySnippet: 'Z-PrintPro offers professional brochure printing with 157g-250g coated/matte paper. Multiple binding options including saddle stitch, perfect binding. Ideal for corporate profiles, product catalogs.',
    authorAuthority: 'Z-PrintPro - Global printing solutions provider, 15+ years experience, serving 5000+ businesses worldwide',
    comparisonTable: [
      { product: 'Standard Brochure', material: '157g Coated', price: '$0.50-1.00/pc', ourAdvantage: 'Professional quality with fast turnaround' },
      { product: 'Premium Catalog', material: '200g Matte', price: '$1.20-2.50/pc', ourAdvantage: 'Luxury finish with superior image reproduction' },
      { product: 'Corporate Booklet', material: '250g Coated', price: '$1.50-3.00/pc', ourAdvantage: 'High-end presentation for business professionals' }
    ],
    materialOptions: ['157g Coated', '200g Coated', '250g Coated', '157g Matte', '200g Matte'],
    finishOptions: ['Lamination', 'Spot UV', 'Hot Stamping', 'Embossing']
  },
  'poster': {
    title: 'Poster Printing | Large Format Posters - Z-PrintPro',
    description: 'High-quality poster printing for events, retail displays, art reproduction. Multiple sizes from A3 to A0. Vibrant colors, fast production.',
    canonicalUrl: 'https://z-printpro.com/en/category/poster',
    category: 'poster',
    isHighProfit: true,
    localizedKeywords: ['poster printing', 'large format posters', 'event posters', 'art prints', 'promotional posters'],
    aiSummarySnippet: 'Z-PrintPro provides high-quality poster printing with 157g-250g coated/photo paper. Sizes from A3 to A0 available. Perfect for events, retail displays, art reproduction.',
    authorAuthority: 'Z-PrintPro - Global printing solutions provider, 15+ years experience, serving 5000+ businesses worldwide',
    comparisonTable: [
      { product: 'Standard Poster', material: '157g Coated', price: '$1.50-3.00/pc', ourAdvantage: 'Vibrant colors with professional quality' },
      { product: 'Photo Poster', material: 'Photo Paper', price: '$3.00-6.00/pc', ourAdvantage: 'Gallery-quality reproduction' },
      { product: 'Canvas Print', material: 'Canvas', price: '$8.00-15.00/pc', ourAdvantage: 'Museum-grade art printing' }
    ],
    materialOptions: ['157g Coated', '200g Coated', '250g Coated', 'Photo Paper', 'Canvas', 'Synthetic Paper'],
    finishOptions: ['Glossy Lamination', 'Matte Lamination', 'Satin Lamination', 'Spot UV']
  },
  'envelope': {
    title: 'Custom Envelopes | Business Envelope Printing - Z-PrintPro',
    description: 'Professional envelope printing for business correspondence, invitations, direct mail. Standard sizes DL, C4, C5. Custom options available.',
    canonicalUrl: 'https://z-printpro.com/en/category/envelope',
    category: 'envelope',
    isHighProfit: true,
    localizedKeywords: ['custom envelopes', 'business envelopes', 'invitation envelopes', 'printed envelopes', 'corporate envelopes'],
    aiSummarySnippet: 'Z-PrintPro offers professional envelope printing with 100g-120g writing/specialty paper. DL, C4, C5 standard sizes available. Perfect for business correspondence, invitations.',
    authorAuthority: 'Z-PrintPro - Global printing solutions provider, 15+ years experience, serving 5000+ businesses worldwide',
    comparisonTable: [
      { product: 'Standard Envelopes', material: '100g Writing', price: '$0.15-0.30/pc', ourAdvantage: 'Professional quality with competitive pricing' },
      { product: 'Premium Envelopes', material: '120g Specialty', price: '$0.30-0.60/pc', ourAdvantage: 'Luxury paper with custom finishing' },
      { product: 'Window Envelopes', material: '100g Writing', price: '$0.20-0.40/pc', ourAdvantage: 'Clear window with precise alignment' }
    ],
    materialOptions: ['100g Writing Paper', '120g Writing Paper', 'Specialty Paper', 'Recycled Paper', 'Kraft Paper'],
    finishOptions: ['Offset Printing', 'Screen Printing', 'Hot Stamping', 'Embossing']
  },
  'large-format': {
    title: 'Large Format Printing | Banner & Signage - Z-PrintPro',
    description: 'Professional large format printing for outdoor advertising, exhibition displays, retail signage. Weatherproof materials. Global quality standards.',
    canonicalUrl: 'https://z-printpro.com/en/category/large-format',
    category: 'large-format',
    isHighProfit: true,
    localizedKeywords: ['large format printing', 'banner printing', 'outdoor advertising', 'exhibition graphics', 'retail signage'],
    aiSummarySnippet: 'Z-PrintPro provides professional large format printing with weatherproof materials. Backlit film, banner, photo paper, canvas available. Perfect for outdoor advertising, exhibitions.',
    authorAuthority: 'Z-PrintPro - Global printing solutions provider, 15+ years experience, serving 5000+ businesses worldwide',
    comparisonTable: [
      { product: 'Vinyl Banner', material: 'PVC Banner', price: '$8-15/sqm', ourAdvantage: 'Weatherproof with vibrant outdoor colors' },
      { product: 'Backlit Film', material: 'Backlit PET', price: '$15-25/sqm', ourAdvantage: 'High brightness for lightbox displays' },
      { product: 'Canvas Print', material: 'Canvas', price: '$20-35/sqm', ourAdvantage: 'Museum-quality art reproduction' }
    ],
    materialOptions: ['Self-adhesive Vinyl', 'PVC Banner', 'Photo Paper', 'Canvas', 'Mesh Banner', 'Car Vinyl'],
    finishOptions: ['Lamination', 'Mounting', 'Grommets', 'Hemmed Edges']
  },
  'ai-digital-art': {
    title: 'AI Digital Art Printing | AI Artwork Reproduction - Z-PrintPro',
    description: 'Professional AI digital art printing services. Transform your AI creations into physical artworks. Museum-quality printing, archival materials.',
    canonicalUrl: 'https://z-printpro.com/en/category/ai-digital-art',
    category: 'ai-digital-art',
    isHighProfit: true,
    localizedKeywords: ['AI art printing', 'digital art printing', 'AI artwork', 'giclee printing', 'art reproduction'],
    aiSummarySnippet: 'Z-PrintPro offers professional AI digital art printing with museum-grade photo paper/canvas. High-fidelity color reproduction. Transform your AI creations into collectible artworks.',
    authorAuthority: 'Z-PrintPro - Global printing solutions provider, 15+ years experience, serving 5000+ businesses worldwide',
    comparisonTable: [
      { product: 'Standard Art Print', material: 'Art Paper', price: '$5-15/pc', ourAdvantage: 'Gallery-quality at accessible pricing' },
      { product: 'Canvas Print', material: 'Canvas', price: '$15-40/pc', ourAdvantage: 'Museum-grade with archival inks' },
      { product: 'Metal Print', material: 'Aluminum', price: '$30-80/pc', ourAdvantage: 'Modern presentation with vibrant colors' }
    ],
    materialOptions: ['Museum-grade Photo Paper', 'Canvas', 'Metal Plate', 'Acrylic', 'Art Paper', 'Silk Fabric'],
    finishOptions: ['UV Protective Coating', 'Framing', 'Mounting', 'Varnish']
  }
};

// ============================================================================
// JA 品类数据（日本市场）
// ============================================================================
const jaCategories: Record<CategoryCode, Omit<SeoPageType, 'lang'>> = {
  'paper-bag': {
    title: '紙袋カスタム | ショッピングバッグ印刷 - Z-PrintPro',
    description: 'プロフェッショナルな紙袋カスタム印刷。多種類のサイズと用紙オプション。小ロット対応、短納期。日本全国配送対応。',
    canonicalUrl: 'https://z-printpro.com/ja/category/paper-bag',
    category: 'paper-bag',
    isHighProfit: true,
    localizedKeywords: ['紙袋', 'ショッピングバッグ', 'カスタムバッグ', '店舗用バッグ', 'ブランドバッグ'],
    aiSummarySnippet: 'Z-PrintPro は 250g-300g 上質紙/特殊紙を使用した紙袋カスタム印刷を提供。小売店、ブティック、ブランドに最適。小ロット対応、短納期。',
    authorAuthority: 'Z-PrintPro - 15 年以上の経験を持つグローバル印刷ソリューションプロバイダー、世界 5000+ 企業にサービス提供',
    processSteps: [
      { step: 1, title: 'デザイン', description: 'お客様のブランドロゴとデザインをお送りいただきます' },
      { step: 2, title: '印刷', description: '高品質オフセット印刷またはデジタル印刷' },
      { step: 3, title: '加工', description: '燙金、UV、凹凸压印などの表面加工' },
      { step: 4, title: '検品', description: '厳格な品質検査を実施' },
      { step: 5, title: '発送', description: '日本全国へ安全に配送' }
    ],
    materialOptions: ['250g 上質紙', '300g 上質紙', '350g 上質紙', '特殊紙', '再生紙', 'クラフト紙'],
    finishOptions: ['燙金', '銀箔', '部分 UV', '凹凸压印', 'シルク印刷', 'オフセット印刷']
  },
  'packaging-box': {
    title: '化粧箱カスタム | 高級ボックス印刷 - Z-PrintPro',
    description: '高品質な化粧箱カスタム印刷。化粧品、ギフト、電子製品に最適。高級感ある仕上げ、小ロット対応。',
    canonicalUrl: 'https://z-printpro.com/ja/category/packaging-box',
    category: 'packaging-box',
    isHighProfit: true,
    localizedKeywords: ['化粧箱', 'ギフトボックス', '化粧品パッケージ', '製品パッケージ', '高級ボックス'],
    aiSummarySnippet: 'Z-PrintPro は 350g-1200g 板紙を使用した高品質化粧箱を提供。化粧品、ギフト、電子製品に最適。燙金、UV、凹凸などの高級加工対応。',
    authorAuthority: 'Z-PrintPro - 15 年以上の経験を持つグローバル印刷ソリューションプロバイダー、世界 5000+ 企業にサービス提供',
    processSteps: [
      { step: 1, title: 'デザイン', description: 'お客様のブランドロゴとデザインをお送りいただきます' },
      { step: 2, title: '印刷', description: '高品質オフセット印刷またはデジタル印刷' },
      { step: 3, title: '加工', description: '燙金、UV、凹凸压印などの表面加工' },
      { step: 4, title: '検品', description: '厳格な品質検査を実施' },
      { step: 5, title: '発送', description: '日本全国へ安全に配送' }
    ],
    materialOptions: ['350g 板紙', '800g 板紙', '1200g 厚板', '特殊紙', '再生紙'],
    finishOptions: ['燙金', '銀箔', '部分 UV', '凹凸压印', 'シルク印刷', 'ソフトタッチラミネート']
  },
  'sticker': {
    title: 'ステッカーカスタム | シール印刷 - Z-PrintPro',
    description: 'プロフェッショナルなステッカー印刷。防水素材、透明、ホログラム対応。小ロット対応、短納期。',
    canonicalUrl: 'https://z-printpro.com/ja/category/sticker',
    category: 'sticker',
    isHighProfit: true,
    localizedKeywords: ['ステッカー', 'シール', 'ラベル', '防水ステッカー', '製品ラベル'],
    aiSummarySnippet: 'Z-PrintPro は防水ビニール素材を使用したステッカー印刷を提供。多種類の形状とサイズ対応。製品ラベル、ブランド宣伝、イベントに最適。',
    authorAuthority: 'Z-PrintPro - 15 年以上の経験を持つグローバル印刷ソリューションプロバイダー、世界 5000+ 企業にサービス提供',
    processSteps: [
      { step: 1, title: 'デザイン', description: 'お客様のブランドロゴとデザインをお送りいただきます' },
      { step: 2, title: '印刷', description: '高品質オフセット印刷またはデジタル印刷' },
      { step: 3, title: '加工', description: '燙金、UV、凹凸压印などの表面加工' },
      { step: 4, title: '検品', description: '厳格な品質検査を実施' },
      { step: 5, title: '発送', description: '日本全国へ安全に配送' }
    ],
    materialOptions: ['防水ビニール', '透明ビニール', 'ホログラム', '蛍光', 'マット', 'グロス'],
    finishOptions: ['ラミネート', 'UV コーティング', '燙金', '部分 UV']
  },
  'flyer': {
    title: 'チラシ印刷 | 宣伝用リーフレット - Z-PrintPro',
    description: '高品質チラシ印刷。店舗宣伝、イベント、製品マーケティングに最適。短納期、競争力のある価格。',
    canonicalUrl: 'https://z-printpro.com/ja/category/flyer',
    category: 'flyer',
    isHighProfit: true,
    localizedKeywords: ['チラシ', 'リーフレット', '宣伝用チラシ', 'マーケティング資料', '店舗用チラシ'],
    aiSummarySnippet: 'Z-PrintPro は 128g-200g 塗工紙/マット紙を使用した高品質チラシ印刷を提供。店舗宣伝、イベント、製品マーケティングに最適。24-48 時間短納期対応可能。',
    authorAuthority: 'Z-PrintPro - 15 年以上の経験を持つグローバル印刷ソリューションプロバイダー、世界 5000+ 企業にサービス提供',
    processSteps: [
      { step: 1, title: 'デザイン', description: 'お客様のブランドロゴとデザインをお送りいただきます' },
      { step: 2, title: '印刷', description: '高品質オフセット印刷またはデジタル印刷' },
      { step: 3, title: '加工', description: '燙金、UV、凹凸压印などの表面加工' },
      { step: 4, title: '検品', description: '厳格な品質検査を実施' },
      { step: 5, title: '発送', description: '日本全国へ安全に配送' }
    ],
    materialOptions: ['128g 塗工紙', '157g 塗工紙', '200g 塗工紙', '128g マット紙', '157g マット紙', '200g マット紙'],
    finishOptions: ['ラミネート', '部分 UV', '燙金']
  },
  'brochure': {
    title: 'カタログ印刷 | ブックレット印刷 - Z-PrintPro',
    description: 'プロフェッショナルなカタログ印刷。企業プロフィール、製品カタログ、サービスガイドに最適。多種類の製本方法対応。',
    canonicalUrl: 'https://z-printpro.com/ja/category/brochure',
    category: 'brochure',
    isHighProfit: true,
    localizedKeywords: ['カタログ', 'ブックレット', '企業カタログ', '製品カタログ', 'パンフレット'],
    aiSummarySnippet: 'Z-PrintPro は 157g-250g 塗工紙/マット紙を使用したカタログ印刷を提供。中綴じ、無線製本など多種類の製本方法対応。企業プロフィール、製品カタログに最適。',
    authorAuthority: 'Z-PrintPro - 15 年以上の経験を持つグローバル印刷ソリューションプロバイダー、世界 5000+ 企業にサービス提供',
    processSteps: [
      { step: 1, title: 'デザイン', description: 'お客様のブランドロゴとデザインをお送りいただきます' },
      { step: 2, title: '印刷', description: '高品質オフセット印刷またはデジタル印刷' },
      { step: 3, title: '加工', description: '燙金、UV、凹凸压印などの表面加工' },
      { step: 4, title: '検品', description: '厳格な品質検査を実施' },
      { step: 5, title: '発送', description: '日本全国へ安全に配送' }
    ],
    materialOptions: ['157g 塗工紙', '200g 塗工紙', '250g 塗工紙', '157g マット紙', '200g マット紙'],
    finishOptions: ['ラミネート', '部分 UV', '燙金', '凹凸压印']
  },
  'poster': {
    title: 'ポスター印刷 | 大型ポスター - Z-PrintPro',
    description: '高品質ポスター印刷。イベント、店舗ディスプレイ、アート複製に最適。A3 から A0 まで多種類のサイズ対応。',
    canonicalUrl: 'https://z-printpro.com/ja/category/poster',
    category: 'poster',
    isHighProfit: true,
    localizedKeywords: ['ポスター', '大型ポスター', 'イベントポスター', 'アートプリント', '宣伝ポスター'],
    aiSummarySnippet: 'Z-PrintPro は 157g-250g 塗工紙/写真用紙を使用した高品質ポスター印刷を提供。A3 から A0 までサイズ対応。イベント、店舗ディスプレイ、アート複製に最適。',
    authorAuthority: 'Z-PrintPro - 15 年以上の経験を持つグローバル印刷ソリューションプロバイダー、世界 5000+ 企業にサービス提供',
    processSteps: [
      { step: 1, title: 'デザイン', description: 'お客様のブランドロゴとデザインをお送りいただきます' },
      { step: 2, title: '印刷', description: '高品質オフセット印刷またはデジタル印刷' },
      { step: 3, title: '加工', description: '燙金、UV、凹凸压印などの表面加工' },
      { step: 4, title: '検品', description: '厳格な品質検査を実施' },
      { step: 5, title: '発送', description: '日本全国へ安全に配送' }
    ],
    materialOptions: ['157g 塗工紙', '200g 塗工紙', '250g 塗工紙', '写真用紙', 'キャンバス', '合成紙'],
    finishOptions: ['グロスラミネート', 'マットラミネート', 'サテンラミネート', '部分 UV']
  },
  'envelope': {
    title: '封筒カスタム | 業務用封筒印刷 - Z-PrintPro',
    description: 'プロフェッショナルな封筒印刷。業務用書簡、招待状、DM に最適。DL、C4、C5 標準サイズ対応。',
    canonicalUrl: 'https://z-printpro.com/ja/category/envelope',
    category: 'envelope',
    isHighProfit: true,
    localizedKeywords: ['封筒', '業務用封筒', '招待状', '印刷封筒', '企業用封筒'],
    aiSummarySnippet: 'Z-PrintPro は 100g-120g 上質紙/特殊紙を使用した封筒印刷を提供。DL、C4、C5 標準サイズ対応。業務用書簡、招待状、DM に最適。',
    authorAuthority: 'Z-PrintPro - 15 年以上の経験を持つグローバル印刷ソリューションプロバイダー、世界 5000+ 企業にサービス提供',
    processSteps: [
      { step: 1, title: 'デザイン', description: 'お客様のブランドロゴとデザインをお送りいただきます' },
      { step: 2, title: '印刷', description: '高品質オフセット印刷またはデジタル印刷' },
      { step: 3, title: '加工', description: '燙金、UV、凹凸压印などの表面加工' },
      { step: 4, title: '検品', description: '厳格な品質検査を実施' },
      { step: 5, title: '発送', description: '日本全国へ安全に配送' }
    ],
    materialOptions: ['100g 上質紙', '120g 上質紙', '特殊紙', '再生紙', 'クラフト紙'],
    finishOptions: ['オフセット印刷', 'シルク印刷', '燙金', '凹凸压印']
  },
  'large-format': {
    title: '大型印刷 | バナー・看板 - Z-PrintPro',
    description: 'プロフェッショナルな大型印刷。屋外広告、展示会ディスプレイ、店舗看板に最適。耐候性素材対応。',
    canonicalUrl: 'https://z-printpro.com/ja/category/large-format',
    category: 'large-format',
    isHighProfit: true,
    localizedKeywords: ['大型印刷', 'バナー', '屋外広告', '展示会グラフィック', '店舗看板'],
    aiSummarySnippet: 'Z-PrintPro は耐候性素材を使用した大型印刷を提供。バックライトフィルム、バナー、写真用紙、キャンバス対応。屋外広告、展示会ディスプレイに最適。',
    authorAuthority: 'Z-PrintPro - 15 年以上の経験を持つグローバル印刷ソリューションプロバイダー、世界 5000+ 企業にサービス提供',
    processSteps: [
      { step: 1, title: 'デザイン', description: 'お客様のブランドロゴとデザインをお送りいただきます' },
      { step: 2, title: '印刷', description: '高品質オフセット印刷またはデジタル印刷' },
      { step: 3, title: '加工', description: '燙金、UV、凹凸压印などの表面加工' },
      { step: 4, title: '検品', description: '厳格な品質検査を実施' },
      { step: 5, title: '発送', description: '日本全国へ安全に配送' }
    ],
    materialOptions: ['粘着ビニール', 'PVC バナー', '写真用紙', 'キャンバス', 'メッシュバナー', '車用ビニール'],
    finishOptions: ['ラミネート', 'マウント', 'ハトメ', 'ヘム加工']
  },
  'ai-digital-art': {
    title: 'AI デジタルアート印刷 | AI 作品複製 - Z-PrintPro',
    description: 'プロフェッショナルな AI デジタルアート印刷サービス。AI 創作を实体アートに転換。美術館品質印刷、アーカイブ素材。',
    canonicalUrl: 'https://z-printpro.com/ja/category/ai-digital-art',
    category: 'ai-digital-art',
    isHighProfit: true,
    localizedKeywords: ['AI アート印刷', 'デジタルアート印刷', 'AI 作品', 'ジクレ印刷', 'アート複製'],
    aiSummarySnippet: 'Z-PrintPro は美術館級写真用紙/キャンバスを使用した AI デジタルアート印刷を提供。高忠実度色彩再現。AI 創作をコレクション可能アート作品に転換。',
    authorAuthority: 'Z-PrintPro - 15 年以上の経験を持つグローバル印刷ソリューションプロバイダー、世界 5000+ 企業にサービス提供',
    processSteps: [
      { step: 1, title: 'デザイン', description: 'お客様の AI 創作データをお送りいただきます' },
      { step: 2, title: '印刷', description: '高品質ジクレ印刷またはデジタル印刷' },
      { step: 3, title: '加工', description: 'UV コーティング、額縁などの表面加工' },
      { step: 4, title: '検品', description: '厳格な品質検査を実施' },
      { step: 5, title: '発送', description: '日本全国へ安全に配送' }
    ],
    materialOptions: ['美術館級写真用紙', 'キャンバス', '金属プレート', 'アクリル', 'アート紙', 'シルクファブリック'],
    finishOptions: ['UV 保護コーティング', '額縁', 'マウント', 'ワニス']
  }
};

// ============================================================================
// 导出函数
// ============================================================================

/**
 * 获取指定语言和品类的 SEO 数据
 */
export function getCategorySeo(lang: LangCode, category: CategoryCode): SeoPageType {
  const categories = {
    'zh-hk': zhHkCategories,
    'en': enCategories,
    'ja': jaCategories
  };

  const baseData = categories[lang][category];
  
  return {
    ...baseData,
    lang
  };
}

/**
 * 获取所有高利润品类列表
 */
export function getHighProfitCategories(): CategoryCode[] {
  return [
    'paper-bag',
    'packaging-box',
    'sticker',
    'flyer',
    'brochure',
    'poster',
    'envelope',
    'large-format',
    'ai-digital-art'
  ];
}

/**
 * 获取支持的语言列表
 */
export function getSupportedLanguages(): LangCode[] {
  return ['zh-hk', 'en', 'ja'];
}

/**
 * 生成 JSON-LD 结构化数据（SGE 优化）
 */
export function generateJsonLd(pageData: SeoPageType): string {
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pageData.title,
    description: pageData.description,
    brand: {
      '@type': 'Brand',
      name: 'Z-PrintPro'
    }
  };

  // zh-hk: 添加 FAQ 和 LocalBusiness
  if (pageData.lang === 'zh-hk') {
    if (pageData.faqSchema) {
      jsonLd.hasMerchantReturnPolicy = {
        '@type': 'FAQPage',
        mainEntity: pageData.faqSchema.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      };
    }
    if (pageData.localBusiness) {
      jsonLd.location = {
        '@type': 'LocalBusiness',
        name: pageData.localBusiness.name,
        address: pageData.localBusiness.address,
        geo: pageData.localBusiness.geo,
        telephone: pageData.localBusiness.telephone
      };
    }
  }

  // en: 添加对比数据
  if (pageData.lang === 'en' && pageData.comparisonTable) {
    jsonLd.offers = pageData.comparisonTable.map((item) => ({
      '@type': 'Offer',
      name: item.product,
      description: item.ourAdvantage,
      priceCurrency: 'USD'
    }));
  }

  // ja: 添加工艺流程
  if (pageData.lang === 'ja' && pageData.processSteps) {
    jsonLd.hasOfferCatalog = {
      '@type': 'HowTo',
      name: '製造プロセス',
      step: pageData.processSteps.map((step) => ({
        '@type': 'HowToStep',
        position: step.step,
        name: step.title,
        text: step.description
      }))
    };
  }

  return JSON.stringify(jsonLd);
}

/**
 * 兼容旧组件的 getSeo 函数
 */
export function getSeo(page: 'home' | 'about'): SeoProps {
  const seoData: Record<'home' | 'about', SeoProps> = {
    home: {
      title: 'Z-PrintPro | Premium Printing Services for Global Businesses',
      description: 'Professional printing solutions for businesses worldwide. Fast, high-quality, and cost-effective. Serving Hong Kong, US, Japan & more.',
      keywords: [
        'premium printing', 
        'business printing services', 
        'high-quality printing',
        'online printing provider',
        'global printing solutions'
      ],
      hreflang: {
        'zh-HK': '/zh-hk',
        'en': '/en',
        'ja': '/ja',
      },
    },
    about: {
      title: 'About Z-PrintPro | Professional Printing Company',
      description: 'Learn about Z-PrintPro\'s commitment to quality printing services for businesses across Asia and the Americas.',
      keywords: ['about printing company', 'business printing services', 'premium printing'],
      hreflang: {
        'zh-HK': '/zh-hk/about',
        'en': '/en/about',
        'ja': '/ja/about',
      },
    }
  };

  return seoData[page];
}