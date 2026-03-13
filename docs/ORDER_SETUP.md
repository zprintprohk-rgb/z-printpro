# 智印港訂單管理系統配置指南

## 概述

本指南將幫助您設置智印港 (Z-PrintPro) 的訂單管理系統，包括數據庫配置、Webhook 設置和後台管理。

---

## 前置要求

- 已完成 [支付集成配置](./PAYMENT_SETUP.md)
- 已獲取 Stripe API Keys
- Node.js 18+ 環境

---

## 1. 數據庫設置

### 1.1 安裝 Prisma

```bash
# 安裝 Prisma CLI 和客戶端
npm install prisma --save-dev
npm install @prisma/client
```

### 1.2 配置數據庫連接

在 `.env.local` 中添加數據庫連接字符串：

```env
# PostgreSQL (推薦用於生產環境)
DATABASE_URL="postgresql://user:password@localhost:5432/zprintpro?schema=public"

# 或 SQLite (僅用於開發測試)
# DATABASE_URL="file:./dev.db"
```

### 1.3 運行數據庫遷移

```bash
# 初始化 Prisma
npx prisma init

# 生成 Prisma Client
npx prisma generate

# 運行數據庫遷移
npx prisma migrate dev --name init

# (可選) 打開 Prisma Studio 查看數據
npx prisma studio
```

---

## 2. Stripe Webhook 配置

### 2.1 獲取 Webhook Secret

1. 登錄 [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks)
2. 點擊 **Add endpoint**
3. 配置 Endpoint:
   - **Endpoint URL**: `https://your-domain.com/api/webhooks/stripe`
   - **Events to send**:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `charge.refunded`
4. 點擊創建的 Endpoint
5. 複製 **Signing secret** (格式: `whsec_...`)

### 2.2 本地開發 Webhook

使用 Stripe CLI 進行本地測試：

```bash
# 安裝 Stripe CLI (macOS)
brew install stripe/stripe-cli/stripe

# 登錄 Stripe
stripe login

# 轉發 Webhook 到本地
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

複製輸出的 Webhook signing secret 到 `.env.local`：

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxx
```

---

## 3. 環境變量配置

完整的 `.env.local` 配置：

```env
# ============================================================================
# 數據庫配置
# ============================================================================
DATABASE_URL="postgresql://user:password@localhost:5432/zprintpro?schema=public"

# ============================================================================
# Stripe 配置
# ============================================================================
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxx
```

---

## 4. 訂單管理功能

### 4.1 商家後台

訪問路徑: `/admin/orders`

功能：
- 📊 訂單統計儀表板
- 📋 訂單列表（支持狀態篩選）
- 🔍 訂單搜索
- 📦 物流單號錄入
- 🚚 發貨狀態更新

### 4.2 用戶訂單中心

訪問路徑: `/account/orders`

功能：
- 📧 郵箱查詢訂單（支持遊客模式）
- 📦 查看訂單詳情
- 🚚 物流追踪
- 📱 WhatsApp 客服聯繫

---

## 5. 數據模型

### Order (訂單)

| 字段 | 類型 | 說明 |
|------|------|------|
| id | String | 訂單唯一ID |
| email | String | 客戶郵箱 |
| customerName | String | 客戶姓名 |
| customerPhone | String | 客戶電話 |
| status | OrderStatus | 訂單狀態 |
| totalAmount | Decimal | 訂單總額 |
| stripePaymentIntentId | String | Stripe PaymentIntent ID |
| trackingNumber | String | 物流單號 |
| carrier | String | 物流承運商 |
| items | OrderItem[] | 訂單商品列表 |

### OrderItem (訂單項目)

| 字段 | 類型 | 說明 |
|------|------|------|
| id | String | 項目ID |
| orderId | String | 關聯訂單ID |
| productName | String | 商品名稱 |
| quantity | Int | 數量 |
| unitPrice | Decimal | 單價 |
| totalPrice | Decimal | 總價 |
| imageUri | String | 商品圖片 |

---

## 6. API 端點

### 訂單相關

| 端點 | 方法 | 說明 |
|------|------|------|
| `/api/webhooks/stripe` | POST | Stripe Webhook 處理 |
| `/api/admin/orders/shipping` | POST | 更新物流信息 |

### 頁面路由

| 路徑 | 說明 |
|------|------|
| `/admin/orders` | 商家訂單管理後台 |
| `/account/orders` | 用戶訂單中心 |
| `/account/orders?email=xxx` | 郵箱查詢訂單 |

---

## 7. 訂單狀態流程

```
PENDING (待付款)
    ↓
PAID (已付款) ←── Webhook: payment_intent.succeeded
    ↓
PROCESSING (處理中)
    ↓
SHIPPED (已發貨) ←── 管理員錄入物流單號
    ↓
DELIVERED (已送達)
```

---

## 8. 物流承運商

支持的物流承運商：

| 代碼 | 名稱 | 追踪鏈接 |
|------|------|----------|
| SF | 順豐速運 | ✅ |
| SFC | 順豐國際 | ✅ |
| DHL | DHL | ✅ |
| FEDEX | FedEx | ✅ |
| UPS | UPS | ✅ |
| TNT | TNT | ✅ |

---

## 9. 故障排除

### 數據庫連接失敗

```bash
# 檢查 PostgreSQL 服務狀態
sudo service postgresql status

# 創建數據庫
createdb zprintpro
```

### Webhook 不工作

1. 確認 `STRIPE_WEBHOOK_SECRET` 正確
2. 檢查 Endpoint URL 可訪問
3. 查看服務器日誌

### Prisma Client 錯誤

```bash
# 重新生成 Prisma Client
npx prisma generate

# 重置數據庫 (開發環境)
npx prisma migrate reset
```

---

## 10. 生產部署

### 10.1 數據庫遷移

```bash
# 生產環境遷移
npx prisma migrate deploy
```

### 10.2 Webhook 配置

1. 在 Stripe Dashboard 創建生產 Webhook Endpoint
2. URL: `https://your-domain.com/api/webhooks/stripe`
3. 複製生產 Webhook Secret

---

**智印港技術團隊**
