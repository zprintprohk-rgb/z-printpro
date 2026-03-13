# 智印港 (Z-PrintPro) - Next.js 14+ 項目

香港專業印刷平台 - 支持 AI 定制、多語言、智能 SEO

---

## 🚀 快速開始

### 1. 安裝依賴

```bash
cd z-printpro
npm install
```

### 2. 複製產品數據

將 `products-simplified.json` 複製到 `data/` 目錄：

```bash
cp /path/to/products-simplified.json data/
```

### 3. 啟動開發服務器

```bash
npm run dev
```

訪問 http://localhost:3000

### 4. 構建生產版本

```bash
npm run build
```

---

## 📁 目錄結構

```
z-printpro/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # i18n 路由
│   │   ├── layout.tsx            # 根佈局
│   │   ├── page.tsx              # 首頁
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # 產品分類頁
│   │   ├── products/
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # 產品詳情頁
│   │   ├── ai-studio/            # AI 定制模塊
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── upload/
│   │   │   ├── enhance/
│   │   │   ├── customize/
│   │   │   ├── preview/
│   │   │   └── checkout/
│   │   ├── special-offers/       # 包郵套餐頁 (HK專屬)
│   │   │   └── page.tsx
│   │   ├── (marketing)/          # 營銷頁面
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   └── case-studies/
│   │   ├── (support)/            # 支援頁面
│   │   │   ├── faq/
│   │   │   ├── shipping/
│   │   │   ├── payment/
│   │   │   └── design-guide/
│   │   ├── blog/
│   │   ├── account/              # 用戶中心 (需要登錄)
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── (legal)/              # 法律頁面
│   │       ├── privacy/
│   │       ├── terms/
│   │       └── cookie-policy/
│   └── api/                      # API 路由
│
├── components/                   # React 組件
│   ├── ui/                       # shadcn/ui 組件
│   ├── product/                  # 產品相關組件
│   ├── ai-studio/                # AI Studio 組件
│   ├── cart/                     # 購物車組件
│   ├── layout/                   # 佈局組件
│   └── seo/                      # SEO 組件
│       └── SeoHead.tsx
│
├── lib/                          # 工具函數和配置
│   ├── constants.ts              # 全局常量
│   ├── products.ts               # 產品數據處理
│   ├── utils.ts                  # 工具函數
│   └── i18n/                     # i18n 配置
│
├── types/                        # TypeScript 類型
│   └── index.ts
│
├── data/                         # 靜態數據
│   └── products-simplified.json
│
├── messages/                     # i18n 翻譯文件
│   ├── zh-hk.json                # 繁體中文
│   └── en.json                   # 英文
│
├── styles/                       # 全局樣式
│   └── globals.css
│
├── public/                       # 靜態資源
│   ├── images/
│   │   ├── products/
│   │   └── categories/
│   └── fonts/
│
├── i18n.ts                       # next-intl 配置
├── middleware.ts                 # Next.js 中間件
├── next.config.js                # Next.js 配置
├── tailwind.config.ts            # Tailwind CSS 配置
├── tsconfig.json                 # TypeScript 配置
└── package.json
```

---

## 🛠 技術棧

| 技術 | 版本 | 用途 |
|------|------|------|
| Next.js | 14+ | React 框架 |
| TypeScript | 5+ | 類型安全 |
| Tailwind CSS | 3.4+ | 樣式 |
| next-intl | 3.9+ | 國際化 |
| Framer Motion | 11+ | 動畫 |
| Lucide React | latest | 圖標 |
| Zustand | 4.5+ | 狀態管理 |

---

## 🌐 多語言支持

- **繁體中文 (zh-hk)**: 香港市場
- **英文 (en)**: 全球市場

語言自動檢測基於：
1. URL 前綴 (`/zh-hk/` 或 `/en/`)
2. Cookie 記錄
3. 地理位置 (香港 IP 默認中文)
4. 瀏覽器語言設置

---

## 🎯 SEO 功能

### 智能 SEO 組件

```tsx
import { SeoHead } from '@/components/seo/SeoHead'

// 產品頁
<SeoHead 
  pageType="product" 
  data={product}
  breadcrumbs={[
    { name: '產品', url: '/zh-hk/category/all/' },
    { name: product.category, url: `/zh-hk/category/${product.categorySlug}/` },
    { name: product.name, url: `/zh-hk/products/${product.slug}/` },
  ]}
/>

// 分類頁
<SeoHead 
  pageType="category" 
  data={{ title: categoryName, slug: categorySlug }}
/>

// AI Studio
<SeoHead pageType="ai-studio" />

// 包郵套餐
<SeoHead pageType="special-offers" />
```

### 自動生成

- Meta Title (50-60 字符)
- Meta Description (150-160 字符)
- Keywords (基於關鍵詞策略)
- Canonical URL
- Open Graph 標籤
- Twitter Card
- JSON-LD 結構化數據

---

## 📦 包郵套餐

三個固定尺寸，香港順豐直送免運費：

| 套餐 | 尺寸 | 價格 (HKD) | 特點 |
|------|------|-----------|------|
| 小型 | 300x440mm | HK$68起 | 2小時急件 |
| 中型 | 350x500mm | HK$88起 | ⭐ 最受歡迎 |
| 大型 | 510x730mm | HK$128起 | 專人跟進 |

---

## 🤖 AI Studio 流程

1. **Upload** - 上傳照片
2. **Enhance** - AI 優化 (放大/色彩校正/背景移除/風格轉換)
3. **Customize** - 個性化設計 (添加文字/選擇風格)
4. **Preview** - 預覽效果
5. **Checkout** - 確認訂單

---

## 🔧 常用命令

```bash
# 開發
npm run dev

# 構建
npm run build

# 類型檢查
npm run type-check

# 代碼檢查
npm run lint

# 分析包大小
npm run analyze
```

---

## 📄 許可證

MIT License - 智印港 (Z-PrintPro)
