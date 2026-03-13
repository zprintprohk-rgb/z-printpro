# 智印港部署指南 (Supabase + Netlify)

## 概述

本指南將幫助您將智印港 (Z-PrintPro) 部署到 **Netlify** 並連接 **Supabase** 數據庫。

**技術棧：**
- 前端: Next.js 14 (靜態導出)
- 數據庫: Supabase (PostgreSQL)
- 後端: Netlify Functions
- 支付: Stripe

---

## 1. Supabase 設置

### 1.1 創建 Supabase 項目

1. 訪問 [Supabase Dashboard](https://supabase.com/dashboard)
2. 點擊 **New Project**
3. 填寫項目信息：
   - Name: `z-printpro`
   - Database Password: 設置強密碼
   - Region: 選擇 `Southeast Asia (Singapore)` 或 `East Asia (Tokyo)`
4. 等待項目創建完成

### 1.2 運行數據庫遷移

1. 在 Supabase Dashboard 中，進入 **SQL Editor**
2. 點擊 **New Query**
3. 複製並粘貼 `supabase/migrations/001_init.sql` 的內容
4. 點擊 **Run**

### 1.3 獲取 API 密鑰

1. 進入 **Project Settings** → **API**
2. 複製以下信息：
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public**: `eyJ...` (用於前端)
   - **service_role secret**: `eyJ...` (僅用於 Netlify Functions)

⚠️ **重要**: `service_role` 密鑰具有完全數據庫訪問權限，**絕對不要**暴露到前端！

---

## 2. Stripe 設置

### 2.1 獲取 API 密鑰

1. 訪問 [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. 複製：
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...`

### 2.2 配置 Webhook

1. 進入 [Stripe Webhooks](https://dashboard.stripe.com/test/webhooks)
2. 點擊 **Add endpoint**
3. 配置：
   - **Endpoint URL**: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
   - **Events**: 選擇以下事件：
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `charge.refunded`
4. 複製 **Signing secret**: `whsec_...`

---

## 3. 本地開發設置

### 3.1 安裝依賴

```bash
npm install
```

### 3.2 配置環境變量

```bash
cp .env.example .env.local
```

編輯 `.env.local`，填入實際值：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Admin
ADMIN_PASSWORD=admin123
ADMIN_TOKEN=your-secure-random-token
```

### 3.3 本地測試 Stripe Webhook

```bash
# 安裝 Stripe CLI
brew install stripe/stripe-cli/stripe

# 登錄
stripe login

# 轉發 Webhook 到本地 Netlify Dev
stripe listen --forward-to http://localhost:8888/.netlify/functions/stripe-webhook
```

### 3.4 啟動開發服務器

```bash
# 使用 Netlify Dev (推薦，支持 Functions)
npm install -g netlify-cli
netlify dev

# 或僅啟動 Next.js
npm run dev
```

---

## 4. Netlify 部署

### 4.1 創建 Netlify 站點

1. 訪問 [Netlify Dashboard](https://app.netlify.com/)
2. 點擊 **Add new site** → **Import an existing project**
3. 連接您的 Git 倉庫

### 4.2 配置構建設置

| 設置 | 值 |
|------|-----|
| Build command | `npm run build` |
| Publish directory | `dist` |

### 4.3 配置環境變量

在 Netlify Dashboard → **Site settings** → **Environment variables** 中添加：

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
ADMIN_TOKEN
```

⚠️ **注意**: 不要添加 `NEXT_PUBLIC_` 前綴的變量到 Functions 環境，它們會自動暴露到前端。

### 4.4 部署

```bash
# 推送代碼到 Git，Netlify 會自動部署
git push origin main
```

---

## 5. 部署後配置

### 5.1 更新 Stripe Webhook URL

部署完成後，更新 Stripe Webhook Endpoint URL 為生產地址：
```
https://your-site.netlify.app/.netlify/functions/stripe-webhook
```

### 5.2 測試支付流程

1. 訪問生產站點
2. 添加商品到購物車
3. 使用 Stripe 測試卡號 `4242 4242 4242 4242` 完成支付
4. 檢查 Supabase 中是否創建了訂單

---

## 6. 項目結構

```
z-printpro/
├── app/                      # Next.js App Router
│   └── [locale]/
│       ├── admin/            # 管理員頁面
│       ├── account/          # 用戶頁面
│       └── ...
├── components/               # React 組件
├── lib/
│   └── supabase.ts          # Supabase 客戶端
├── netlify/
│   └── functions/           # Netlify Functions
│       ├── stripe-webhook.ts
│       ├── create-order.ts
│       └── update-shipping.ts
├── supabase/
│   └── migrations/          # 數據庫遷移
│       └── 001_init.sql
├── netlify.toml             # Netlify 配置
├── next.config.js           # Next.js 配置 (output: 'export')
└── .env.local               # 環境變量
```

---

## 7. 故障排除

### 構建失敗

```bash
# 檢查 TypeScript 錯誤
npm run type-check

# 本地構建測試
npm run build
```

### Functions 不工作

1. 檢查 Netlify Functions 日誌
2. 確認環境變量已正確設置
3. 檢查 `netlify.toml` 配置

### 數據庫連接失敗

1. 確認 Supabase URL 和密鑰正確
2. 檢查 Supabase 項目狀態
3. 確認 RLS 策略正確配置

---

## 8. 免費額度說明

| 服務 | 免費額度 |
|------|----------|
| Netlify | 100GB 帶寬/月，300 分鐘構建/月 |
| Supabase | 500MB 數據庫，2GB 帶寬/月 |
| Stripe | 無月費，按交易收費 (2.9% + $0.30) |

---

**智印港技術團隊**
