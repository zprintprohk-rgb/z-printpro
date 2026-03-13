# 智印港 (Z-PrintPro) - 項目目錄結構

```
z-printpro/
│
├── 📁 app/                          # Next.js App Router (核心)
│   │
│   └── 📁 [locale]/                 # i18n 語言路由 (zh-hk / en)
│       │
│       ├── 📄 layout.tsx            # 根佈局 (語言切換、全局樣式)
│       ├── 📄 page.tsx              # 首頁 (Hero + 分類 + 熱銷 + AI Studio)
│       │
│       ├── 📁 category/             # 產品分類頁
│       │   └── 📁 [slug]/
│       │       └── 📄 page.tsx      # 動態分類頁 (SSG)
│       │
│       ├── 📁 products/             # 產品詳情頁
│       │   └── 📁 [slug]/
│       │       ├── 📄 page.tsx      # 動態產品頁 (SSG + ISR)
│       │       └── 📄 generateStaticParams.ts
│       │
│       ├── 📁 ai-studio/            # AI 定制模塊 (獨立體驗)
│       │   ├── 📄 layout.tsx        # AI Studio 專用佈局
│       │   ├── 📄 page.tsx          # AI Studio 入口
│       │   ├── 📁 upload/           # 上傳照片
│       │   ├── 📁 enhance/          # AI 優化
│       │   ├── 📁 customize/        # 個性化設計
│       │   ├── 📁 preview/          # 預覽效果
│       │   └── 📁 checkout/         # 確認訂單
│       │
│       ├── 📁 special-offers/       # 包郵套餐頁 (HK專屬)
│       │   └── 📄 page.tsx          # 三尺寸套餐展示
│       │
│       ├── 📁 (marketing)/          # 營銷頁面分組
│       │   ├── 📁 about/
│       │   ├── 📁 contact/
│       │   └── 📁 case-studies/
│       │
│       ├── 📁 (support)/            # 支援頁面分組
│       │   ├── 📁 faq/
│       │   ├── 📁 shipping/
│       │   ├── 📁 payment/
│       │   └── 📁 design-guide/
│       │
│       ├── 📁 blog/                 # 博客系統
│       │   ├── 📄 page.tsx
│       │   └── 📁 [slug]/
│       │
│       ├── 📁 account/              # 用戶中心 (需要登錄)
│       │   ├── 📄 layout.tsx        # 保護路由佈局
│       │   ├── 📄 page.tsx
│       │   ├── 📁 orders/
│       │   ├── 📁 addresses/
│       │   └── 📁 saved-designs/
│       │
│       ├── 📁 cart/                 # 購物車
│       │   └── 📄 page.tsx
│       │
│       ├── 📁 checkout/             # 結賬
│       │   └── 📄 page.tsx
│       │
│       └── 📁 (legal)/              # 法律頁面分組
│           ├── 📁 privacy/
│           ├── 📁 terms/
│           └── 📁 cookie-policy/
│
├── 📁 components/                   # React 組件
│   │
│   ├── 📁 ui/                       # shadcn/ui 基礎組件
│   │   ├── 📄 button.tsx
│   │   ├── 📄 card.tsx
│   │   ├── 📄 input.tsx
│   │   └── 📄 ...
│   │
│   ├── 📁 product/                  # 產品相關組件
│   │   ├── 📄 ProductCard.tsx
│   │   ├── 📄 ProductGrid.tsx
│   │   ├── 📄 ProductGallery.tsx
│   │   ├── 📄 PricingCalculator.tsx
│   │   └── 📄 ...
│   │
│   ├── 📁 ai-studio/                # AI Studio 專用組件
│   │   ├── 📄 ImageUploader.tsx
│   │   ├── 📄 AIEnhancer.tsx
│   │   ├── 📄 StyleSelector.tsx
│   │   └── 📄 ...
│   │
│   ├── 📁 cart/                     # 購物車組件
│   │   ├── 📄 CartItem.tsx
│   │   └── 📄 CartSummary.tsx
│   │
│   ├── 📁 layout/                   # 佈局組件
│   │   ├── 📄 Header.tsx
│   │   ├── 📄 Footer.tsx
│   │   ├── 📄 Navigation.tsx
│   │   └── 📄 LanguageSwitcher.tsx
│   │
│   └── 📁 seo/                      # SEO 組件 ⭐
│       └── 📄 SeoHead.tsx           # 智能 SEO 組件
│
├── 📁 lib/                          # 工具函數和配置
│   │
│   ├── 📄 constants.ts              # 全局常量 ⭐
│   │                                  # - 三尺寸套餐價格
│   │                                  # - 運費規則
│   │                                  # - 支付方式
│   │
│   ├── 📄 products.ts               # 產品數據處理
│   │                                  # - getAllProducts()
│   │                                  # - getProductBySlug()
│   │                                  # - filterProducts()
│   │
│   ├── 📄 utils.ts                  # 通用工具函數
│   │                                  # - cn() 類名合併
│   │                                  # - formatPrice()
│   │                                  # - debounce()
│   │
│   └── 📁 i18n/                     # i18n 配置 (可選)
│       ├── 📄 config.ts
│       └── 📄 utils.ts
│
├── 📁 types/                        # TypeScript 類型定義 ⭐
│   └── 📄 index.ts                  # 所有類型接口
│                                      # - Product
│                                      # - PriceTier
│                                      # - SiteMapNode
│                                      # - CartItem
│                                      # - Order
│
├── 📁 data/                         # 靜態數據
│   └── 📄 products-simplified.json  # 產品數據 (126個產品)
│
├── 📁 messages/                     # i18n 翻譯文件 ⭐
│   │
│   ├── 📄 zh-hk.json                # 繁體中文 (香港)
│   │                                  # - nav 導航
│   │                                  # - product 產品
│   │                                  # - cart 購物車
│   │                                  # - aiStudio AI工作室
│   │
│   └── 📄 en.json                   # 英文 (全球)
│
├── 📁 styles/                       # 全局樣式
│   └── 📄 globals.css               # Tailwind + 自定義樣式
│
├── 📁 hooks/                        # 自定義 Hooks
│   ├── 📄 useCart.ts
│   ├── 📄 useAIStudio.ts
│   └── 📄 useLocale.ts
│
├── 📁 public/                       # 靜態資源
│   │
│   ├── 📁 images/
│   │   ├── 📁 products/             # 產品圖片
│   │   ├── 📁 categories/           # 分類圖片
│   │   ├── 📄 logo.png
│   │   ├── 📄 og-image-zh.jpg
│   │   └── 📄 og-image-en.jpg
│   │
│   └── 📁 fonts/
│
├── 📄 i18n.ts                       # next-intl 配置 ⭐
│                                      # - locales: ['zh-hk', 'en']
│                                      # - defaultLocale: 'zh-hk'
│
├── 📄 middleware.ts                 # Next.js 中間件 ⭐
│                                      # - 語言自動檢測
│                                      # - 地理位置判斷
│                                      # - Cookie 記錄
│
├── 📄 next.config.js                # Next.js 配置
│                                      # - output: 'export'
│                                      # - i18n 配置
│                                      # - 重寫/重定向規則
│
├── 📄 tailwind.config.ts            # Tailwind CSS 配置 ⭐
│                                      # - 品牌色 (專業藍 + 活力橙)
│                                      # - 自定義字號/間距
│                                      # - 動畫配置
│
├── 📄 tsconfig.json                 # TypeScript 配置
│                                      # - 路徑別名 @/*
│                                      # - 嚴格模式
│
├── 📄 postcss.config.js             # PostCSS 配置
│
├── 📄 package.json                  # 項目依賴
│
├── 📄 next-env.d.ts                 # Next.js 類型聲明
│
├── 📄 tailwindcss-animate.js        # Tailwind 動畫插件
│
├── 📄 .env.example                  # 環境變數模板
│
├── 📄 .gitignore                    # Git 忽略規則
│
├── 📄 README.md                     # 項目說明
│
└── 📄 PROJECT_STRUCTURE.md          # 本文件


================================================================================
                              關鍵路徑說明
================================================================================

🌐 多語言路由
-------------
/zh-hk/     → 繁體中文 (香港市場)
/en/        → 英文 (全球市場)

自動檢測順序：
1. URL 前綴
2. Cookie (NEXT_LOCALE)
3. 地理位置 (香港 IP → zh-hk)
4. 瀏覽器語言

🎯 特殊頁面
-----------
/zh-hk/special-offers/     → 包郵套餐 (香港專屬)
/ai-studio/                → AI 定制 (多語言)

📦 產品頁面
-----------
/category/[slug]/          → 分類頁
/products/[slug]/          → 產品詳情頁

🛒 購物流程
-----------
/cart/                     → 購物車
/checkout/                 → 結賬
/account/orders/           → 訂單歷史


================================================================================
                              啟動命令
================================================================================

# 1. 安裝依賴
npm install

# 2. 啟動開發服務器
npm run dev

# 3. 訪問
http://localhost:3000

# 4. 構建生產版本
npm run build

# 5. 類型檢查
npm run type-check
