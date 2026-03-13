# Vercel 环境变量配置模板

**项目名称:** z-printpro  
**项目 URL:** https://vercel.com/z-printpros-projects/z-printpro  
**生成时间:** 2026-03-13

---

## 📋 环境变量清单

以下变量**必须**在 Vercel Dashboard 中配置：

### 访问路径
https://vercel.com/z-printpros-projects/z-printpro/settings/environment-variables

---

## 🔑 生产环境 (Production) 变量

| 变量名 | 值 | 环境 | 说明 |
|--------|-----|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://YOUR_SUPABASE_PROJECT.supabase.co` | Production | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_YOUR_ANON_KEY` | Production | Supabase 匿名密钥 |
| `SUPABASE_SERVICE_ROLE_KEY` | `sb_secret_YOUR_SERVICE_ROLE_KEY` | Production | Supabase 服务密钥（仅服务端） |
| `NEXT_PUBLIC_SITE_URL` | `https://z-printpro.com` | Production | 站点 URL |
| `NEXT_PUBLIC_API_URL` | `https://api.z-printpro.com` | Production | API 端点 |
| `NEXT_PUBLIC_COMPANY_NAME` | `智印港 \| Z-PrintPro` | Production | 公司名称 |
| `NEXT_PUBLIC_COMPANY_PHONE` | `+852 1234 5678` | Production | 联系电话 |
| `NEXT_PUBLIC_COMPANY_EMAIL` | `info@z-printpro.com` | Production | 联系邮箱 |
| `AI_API_KEY` | `your_ai_api_key_here` | Production | AI 服务密钥 |
| `AI_API_URL` | `https://ai-api.z-printpro.com` | Production | AI 服务端点 |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_your_stripe_publishable_key` | Production | Stripe 公钥 |
| `STRIPE_SECRET_KEY` | `sk_test_your_stripe_secret_key` | Production | Stripe 密钥 |
| `STRIPE_WEBHOOK_SECRET` | `whsec_your_webhook_secret` | Production | Stripe Webhook 密钥 |
| `ADMIN_PASSWORD` | `admin123` | Production | 管理员密码 |
| `ADMIN_TOKEN` | `your-secure-admin-token` | Production | 管理员 Token |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Production | Google Analytics ID |
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` | Production | Google Tag Manager ID |
| `NODE_ENV` | `production` | Production | 运行环境 |

---

## 🧪 预览环境 (Preview) 变量

预览部署（Pull Request）使用与生产环境相同的配置，或者可以配置测试数据：

| 变量名 | 值 | 环境 | 说明 |
|--------|-----|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://YOUR_SUPABASE_PROJECT.supabase.co` | Preview | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_YOUR_ANON_KEY` | Preview | Supabase 匿名密钥 |
| `NEXT_PUBLIC_SITE_URL` | `https://z-printpro-git-branch.vercel.app` | Preview | 自动设置 |

---

## 🧪 开发环境 (Development) 变量

本地开发使用 `.env.local` 文件，无需在 Vercel 配置。

---

## ⚠️ 敏感变量说明

### 仅限服务端使用的变量
以下变量**不应**以 `NEXT_PUBLIC_` 开头，仅在服务端使用：

| 变量名 | 用途 | 安全级别 |
|--------|------|---------|
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 管理操作 | 🔴 高 |
| `STRIPE_SECRET_KEY` | Stripe 支付处理 | 🔴 高 |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook 验证 | 🔴 高 |
| `ADMIN_TOKEN` | 管理员认证 | 🔴 高 |
| `AI_API_KEY` | AI 服务认证 | 🟡 中 |

### 可公开访问的变量
以下变量以 `NEXT_PUBLIC_` 开头，会在客户端暴露：

| 变量名 | 用途 | 安全级别 |
|--------|------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase URL | 🟢 低 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名密钥 | 🟢 低 |
| `NEXT_PUBLIC_SITE_URL` | 站点 URL | 🟢 低 |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe 公钥 | 🟢 低 |
| `NEXT_PUBLIC_GA_ID` | Google Analytics | 🟢 低 |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager | 🟢 低 |

---

## 🚀 配置步骤

### 方法 1：Vercel Dashboard（推荐）

1. 访问 https://vercel.com/z-printpros-projects/z-printpro/settings/environment-variables
2. 点击 "Add New"
3. 输入变量名和值
4. 选择环境（Production/Preview/Development）
5. 点击 "Save"
6. 重复步骤 2-5 直到所有变量配置完成
7. 重新部署项目使环境变量生效

### 方法 2：Vercel CLI

```bash
# 登录 Vercel
vercel login

# 链接项目
vercel link

# 添加环境变量
vercel env add NEXT_PUBLIC_SUPABASE_URL https://YOUR_SUPABASE_PROJECT.supabase.co
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY sb_publishable_YOUR_ANON_KEY
# ... 继续添加其他变量

# 拉取环境变量到本地
vercel env pull
```

---

## 🔄 环境变量更新流程

1. 在 Vercel Dashboard 修改环境变量
2. 点击 "Save"
3. 重新部署项目：
   ```bash
   vercel --prod
   ```
4. 验证部署是否成功

---

## 📝 备注

1. **环境变量命名规范:**
   - 客户端变量必须以 `NEXT_PUBLIC_` 开头
   - 服务端变量不应包含 `NEXT_PUBLIC_`

2. **环境隔离:**
   - Production: 生产环境
   - Preview: Pull Request 预览
   - Development: 本地开发

3. **安全建议:**
   - 定期轮换敏感密钥
   - 不要在代码中硬编码密钥
   - 使用 Vercel Secrets 管理敏感信息

---

**模板生成完成** ✅