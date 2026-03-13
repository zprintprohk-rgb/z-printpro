# 架構修正總結 (Architecture Pivot)

## 變更概述

為了支持 **Next.js 靜態導出 + Netlify 免費托管**，我們將技術棧從：

```
Prisma + app/api + Node.js 服務器
```

遷移到：

```
Supabase + Netlify Functions + 靜態導出
```

---

## 主要變更

### 1. 數據庫 (Prisma → Supabase)

| 項目 | 之前 | 之後 |
|------|------|------|
| ORM | Prisma | Supabase JS SDK |
| 數據庫 | 自托管 PostgreSQL | Supabase 托管 PostgreSQL |
| 連接 | `DATABASE_URL` | `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` |
| 遷移 | `npx prisma migrate` | SQL 腳本 |

**文件變更：**
- ❌ 刪除: `prisma/schema.prisma`
- ❌ 刪除: `lib/db.ts`
- ❌ 刪除: `lib/orders.ts`
- ✅ 新增: `supabase/migrations/001_init.sql`
- ✅ 新增: `lib/supabase.ts`

### 2. 後端邏輯 (app/api → Netlify Functions)

| 項目 | 之前 | 之後 |
|------|------|------|
| API 路由 | `app/api/.../route.ts` | `netlify/functions/...ts` |
| 運行環境 | Next.js 服務器 | Netlify Functions (Node.js) |
| 認證 | Session/Cookies | localStorage Token |

**文件變更：**
- ❌ 刪除: `app/api/` 目錄
- ✅ 新增: `netlify/functions/stripe-webhook.ts`
- ✅ 新增: `netlify/functions/create-order.ts`
- ✅ 新增: `netlify/functions/update-shipping.ts`
- ✅ 新增: `netlify.toml`

### 3. 前端數據獲取 (SSR → Client Side)

| 項目 | 之前 | 之後 |
|------|------|------|
| 數據獲取 | Server Component + `async/await` | Client Component + `useEffect` |
| 渲染模式 | SSR | 靜態 HTML + 客戶端 Hydration |

**文件變更：**
- 📝 修改: `app/[locale]/admin/orders/page.tsx` (添加 'use client', useEffect)
- 📝 修改: `app/[locale]/admin/orders/[id]/page.tsx` (添加 'use client', useEffect)
- 📝 修改: `app/[locale]/account/orders/page.tsx` (添加 'use client', useEffect)
- 📝 修改: `app/[locale]/account/orders/[id]/page.tsx` (添加 'use client', useEffect)
- 📝 修改: `app/[locale]/admin/login/page.tsx` (改為 localStorage Token)

---

## 新文件結構

```
z-printpro/
├── app/                          # Next.js App Router (靜態導出)
│   └── [locale]/
│       ├── admin/
│       │   ├── login/page.tsx    # 管理員登錄 (Client)
│       │   └── orders/
│       │       ├── page.tsx      # 訂單列表 (Client)
│       │       └── [id]/page.tsx # 訂單詳情 (Client)
│       ├── account/orders/
│       │   ├── page.tsx          # 用戶訂單列表 (Client)
│       │   └── [id]/page.tsx     # 用戶訂單詳情 (Client)
│       └── ...
├── components/                   # React 組件
├── lib/
│   ├── supabase.ts              # Supabase 客戶端工具
│   └── ...
├── netlify/
│   └── functions/               # Netlify Functions
│       ├── stripe-webhook.ts    # Stripe Webhook 處理
│       ├── create-order.ts      # 創建訂單
│       └── update-shipping.ts   # 更新物流
├── supabase/
│   └── migrations/              # 數據庫遷移
│       └── 001_init.sql         # 初始化 SQL
├── netlify.toml                 # Netlify 配置
├── next.config.js               # Next.js 配置 (output: 'export')
└── .env.example                 # 環境變量模板
```

---

## 環境變量變更

### 移除的變量

```env
# ❌ 移除
DATABASE_URL
```

### 新增的變量

```env
# ✅ 新增
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_TOKEN=your-secure-admin-token
```

---

## 部署流程

### 1. Supabase 設置

```bash
# 1. 創建 Supabase 項目
# 訪問 https://supabase.com/dashboard

# 2. 運行 SQL 遷移
# 在 SQL Editor 中運行 supabase/migrations/001_init.sql

# 3. 獲取 API 密鑰
# Project Settings → API
```

### 2. Stripe 設置

```bash
# 1. 獲取 API 密鑰
# https://dashboard.stripe.com/test/apikeys

# 2. 配置 Webhook
# Endpoint: https://your-site.netlify.app/.netlify/functions/stripe-webhook
```

### 3. Netlify 部署

```bash
# 1. 推送代碼到 Git
git push origin main

# 2. 在 Netlify Dashboard 配置環境變量

# 3. 自動部署
```

---

## 優勢

1. **免費托管**: Netlify + Supabase 免費層足夠小項目使用
2. **靜態導出**: 更快的頁面加載速度
3. **CDN 分發**: 全球邊緣節點加速
4. **無服務器維護**: 無需管理服務器
5. **自動擴展**: 按需擴展 Functions

---

## 注意事項

1. **API 路由**: 所有 `app/api` 路由已遷移到 `netlify/functions`
2. **數據獲取**: 前端頁面使用 `useEffect` 獲取數據，會有短暫的 loading 狀態
3. **SEO**: 靜態導出對 SEO 友好，但動態數據需要等客戶端加載
4. **安全性**: `SUPABASE_SERVICE_ROLE_KEY` 只能在 Netlify Functions 中使用

---

**智印港技術團隊**
