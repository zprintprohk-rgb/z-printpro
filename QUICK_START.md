# 🚀 智印港 (Z-PrintPro) - 快速啟動指南

---

## 📦 項目概覽

| 項目 | 詳情 |
|------|------|
| **框架** | Next.js 14+ (App Router) |
| **語言** | TypeScript |
| **樣式** | Tailwind CSS |
| **i18n** | next-intl |
| **產品數據** | 126 個產品 |
| **語言支持** | 繁體中文 (zh-hk) + 英文 (en) |

---

## 🛠 環境要求

- **Node.js**: >= 18.17.0
- **npm**: >= 9.0.0

---

## 📥 安裝步驟

### 1. 進入項目目錄

```bash
cd z-printpro
```

### 2. 安裝依賴

```bash
npm install
```

這將安裝以下核心依賴：
- `next` ^14.2.0 - React 框架
- `react` ^18.2.0 - React 核心
- `next-intl` ^3.9.0 - 國際化
- `framer-motion` ^11.0.0 - 動畫
- `lucide-react` - 圖標
- `zustand` ^4.5.0 - 狀態管理
- `tailwindcss` ^3.4.1 - CSS 框架

### 3. 啟動開發服務器

```bash
npm run dev
```

### 4. 訪問網站

打開瀏覽器訪問：
- http://localhost:3000 (自動重定向到語言版本)
- http://localhost:3000/zh-hk/ (繁體中文)
- http://localhost:3000/en/ (英文)

---

## 📂 項目結構速覽

```
z-printpro/
├── app/[locale]/           # 多語言路由
│   ├── page.tsx            # 首頁
│   ├── layout.tsx          # 根佈局
│   ├── category/[slug]/    # 產品分類
│   ├── products/[slug]/    # 產品詳情
│   ├── ai-studio/          # AI 定制
│   └── special-offers/     # 包郵套餐
├── components/
│   └── seo/SeoHead.tsx     # 智能 SEO 組件
├── lib/
│   ├── constants.ts        # 全局常量
│   ├── products.ts         # 產品數據
│   └── utils.ts            # 工具函數
├── types/
│   └── index.ts            # TypeScript 類型
├── messages/
│   ├── zh-hk.json          # 繁體中文翻譯
│   └── en.json             # 英文翻譯
└── data/
    └── products-simplified.json  # 126個產品
```

---

## 🎯 核心功能

### 1. 智能 SEO 系統

```tsx
import { SeoHead } from '@/components/seo/SeoHead'

<SeoHead 
  pageType="product" 
  data={product}
  breadcrumbs={[...]}
/>
```

自動生成：
- ✅ Meta Title (50-60 字符)
- ✅ Meta Description (150-160 字符)
- ✅ Keywords (基於關鍵詞策略)
- ✅ Canonical URL
- ✅ Open Graph / Twitter Card
- ✅ JSON-LD 結構化數據

### 2. 包郵套餐 (香港專屬)

| 套餐 | 尺寸 | 價格 | 特點 |
|------|------|------|------|
| 小型 | 300×440mm | HK$68起 | 2小時急件 |
| 中型 | 350×500mm | HK$88起 | ⭐ 最受歡迎 |
| 大型 | 510×730mm | HK$128起 | 專人跟進 |

### 3. AI Studio 流程

1. **Upload** - 上傳照片
2. **Enhance** - AI 優化
3. **Customize** - 個性化設計
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

## 🌐 多語言切換

網站會自動檢測用戶語言：

1. **URL 前綴** (`/zh-hk/` 或 `/en/`)
2. **Cookie** (記錄用戶選擇)
3. **地理位置** (香港 IP 默認中文)
4. **瀏覽器語言**

---

## 📊 產品數據

產品數據來自 `data/products-simplified.json`，包含 126 個產品：

```json
{
  "id": "1523589",
  "slug": "large-format-banner-same-day",
  "name": "Large Format Banner Printing - Same Day Pickup",
  "nameZh": "噴繪廣告｜即日取｜6ft x 3ft...",
  "category": "Large Format Printing",
  "categorySlug": "large-format",
  "price": "HK$8",
  "minQty": 1,
  "metaTitle": "...",
  "metaDescription": "...",
  "image": "/images/products/..."
}
```

---

## 🎨 品牌色彩

| 顏色 | 色值 | 用途 |
|------|------|------|
| **主藍** | `#3b82f6` | 主要按鈕、鏈接 |
| **深藍** | `#1e40af` | 標題、強調 |
| **活力橙** | `#f97316` | CTA、特價標籤 |
| **成功綠** | `#22c55e` | 成功狀態 |

---

## 📝 下一步

1. **添加真實產品圖片**到 `public/images/products/`
2. **配置環境變數** (複製 `.env.example` 為 `.env.local`)
3. **集成支付系統** (Stripe / PayPal / 支付寶 / 微信)
4. **部署到 Vercel**

```bash
# 部署到 Vercel
npm i -g vercel
vercel
```

---

## 📞 支持

如有問題，請參考：
- `README.md` - 項目詳細說明
- `PROJECT_STRUCTURE.md` - 目錄結構
- `types/index.ts` - 類型定義

---

**Happy Coding! 🎉**
