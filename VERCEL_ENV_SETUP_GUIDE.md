# Vercel 环境变量配置指南

**项目名称:** Z-PrintPro (智印港)  
**配置时间:** 2026-03-13  
**状态:** ⏸️ 等待配置

---

## 🎯 快速配置清单

### 必需配置的变量（18 个）

| # | 变量名 | 值示例 | 类型 | 环境 |
|---|--------|--------|------|------|
| 1 | `NEXT_PUBLIC_SUPABASE_URL` | `https://YOUR_SUPABASE_PROJECT.supabase.co` | 🟢 公开 | Production |
| 2 | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_YOUR_ANON_KEY` | 🟢 公开 | Production |
| 3 | `SUPABASE_SERVICE_ROLE_KEY` | `sb_secret_YOUR_SERVICE_ROLE_KEY` | 🔴 敏感 | Production |
| 4 | `NEXT_PUBLIC_SITE_URL` | `https://z-printpro.com` | 🟢 公开 | Production |
| 5 | `NEXT_PUBLIC_API_URL` | `https://api.z-printpro.com` | 🟢 公开 | Production |
| 6 | `NEXT_PUBLIC_COMPANY_NAME` | `智印港 \| Z-PrintPro` | 🟢 公开 | Production |
| 7 | `NEXT_PUBLIC_COMPANY_PHONE` | `+852 1234 5678` | 🟢 公开 | Production |
| 8 | `NEXT_PUBLIC_COMPANY_EMAIL` | `info@z-printpro.com` | 🟢 公开 | Production |
| 9 | `AI_API_KEY` | `your_api_key` | 🔴 敏感 | Production |
| 10 | `AI_API_URL` | `https://ai-api.z-printpro.com` | 🟢 公开 | Production |
| 11 | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_xxx` | 🟢 公开 | Production |
| 12 | `STRIPE_SECRET_KEY` | `sk_test_xxx` | 🔴 敏感 | Production |
| 13 | `STRIPE_WEBHOOK_SECRET` | `whsec_xxx` | 🔴 敏感 | Production |
| 14 | `ADMIN_PASSWORD` | `admin123` | 🔴 敏感 | Production |
| 15 | `ADMIN_TOKEN` | `your_secure_token` | 🔴 敏感 | Production |
| 16 | `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | 🟢 公开 | Production |
| 17 | `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` | 🟢 公开 | Production |
| 18 | `NODE_ENV` | `production` | 🟢 公开 | Production |

---

## 🔐 变量类型说明

### 🟢 公开变量（NEXT_PUBLIC_*）
这些变量会在客户端代码中暴露，可以安全地在浏览器中使用：
- `NEXT_PUBLIC_*` 开头的变量
- 包括：API 端点、公钥、配置信息

### 🔴 敏感变量（服务端专用）
这些变量**仅**在服务端使用，**绝不**会在客户端暴露：
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase 管理密钥
- `STRIPE_SECRET_KEY` - Stripe 支付密钥
- `STRIPE_WEBHOOK_SECRET` - Stripe Webhook 密钥
- `ADMIN_TOKEN` - 管理员认证 Token
- `AI_API_KEY` - AI 服务密钥
- `ADMIN_PASSWORD` - 管理员密码

---

## 📋 配置步骤

### 步骤 1：访问 Vercel Dashboard

打开浏览器访问：
```
https://vercel.com/z-printpros-projects/z-printpro/settings/environment-variables
```

### 步骤 2：逐个添加变量

对于每个变量，执行以下操作：

1. 点击 **"Add New"** 按钮
2. 输入变量名（如 `NEXT_PUBLIC_SUPABASE_URL`）
3. 输入变量值（从 `.env.local` 文件复制）
4. 选择环境：勾选 **"Production"**
5. 点击 **"Save"**

### 步骤 3：重复直到完成

重复步骤 2，直到所有 18 个变量都已添加。

---

## 📝 详细配置值（从 .env.local 复制）

以下是当前 `.env.local` 中的值，请复制并粘贴到 Vercel Dashboard：

```
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_SUPABASE_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=sb_secret_YOUR_SERVICE_ROLE_KEY

# 站点配置
NEXT_PUBLIC_SITE_URL=https://www.z-printpro.com
NEXT_PUBLIC_API_URL=https://api.z-printpro.com

# 公司信息
NEXT_PUBLIC_COMPANY_NAME=智印港 | Z-PrintPro
NEXT_PUBLIC_COMPANY_PHONE=+852 1234 5678
NEXT_PUBLIC_COMPANY_EMAIL=info@z-printpro.com

# AI 服务配置
AI_API_KEY=your_ai_api_key_here
AI_API_URL=https://ai-api.z-printpro.com

# Stripe 支付配置
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# 管理员配置
ADMIN_PASSWORD=admin123
ADMIN_TOKEN=your-secure-admin-token

# 分析工具
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# 开发模式
NODE_ENV=production
```

---

## ⚠️ 重要提示

### 1. 敏感值需要替换
以下变量需要替换为您自己的值：
- `AI_API_KEY` - 替换为您的 AI API 密钥
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - 替换为您的 Stripe 公钥
- `STRIPE_SECRET_KEY` - 替换为您的 Stripe 密钥
- `STRIPE_WEBHOOK_SECRET` - 替换为您的 Stripe Webhook 密钥
- `ADMIN_PASSWORD` - 建议修改为更强的密码
- `ADMIN_TOKEN` - 生成一个安全的随机 Token
- `NEXT_PUBLIC_GA_ID` - 替换为您的 Google Analytics ID
- `NEXT_PUBLIC_GTM_ID` - 替换为您的 Google Tag Manager ID

### 2. 环境变量作用域
- **Production**: 生产部署使用
- **Preview**: Pull Request 预览使用（可选）
- **Development**: 本地开发使用（通过 `vercel env pull` 获取）

建议将所有变量同时配置到 **Production** 和 **Preview** 环境。

---

## ✅ 配置完成后验证

### 1. 检查所有变量已添加

在 Vercel Dashboard 中确认所有 18 个变量都已列出。

### 2. 重新部署项目

配置完成后，运行以下命令重新部署：

```bash
vercel --prod
```

### 3. 验证部署

```bash
# 检查部署状态
vercel ls

# 访问生产 URL
curl -I https://z-printpro-z-printpros-projects.vercel.app/zh-hk
```

---

## 🔄 使用 CLI 快速配置（可选）

如果您更喜欢命令行，可以使用以下命令批量添加：

```bash
# 登录（如果未登录）
vercel login

# 链接项目（如果未链接）
vercel link

# 逐个添加变量
vercel env add NEXT_PUBLIC_SUPABASE_URL https://YOUR_SUPABASE_PROJECT.supabase.co
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY sb_publishable_YOUR_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY sb_secret_YOUR_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_SITE_URL https://www.z-printpro.com
vercel env add NEXT_PUBLIC_API_URL https://api.z-printpro.com
vercel env add NEXT_PUBLIC_COMPANY_NAME "智印港 | Z-PrintPro"
vercel env add NEXT_PUBLIC_COMPANY_PHONE "+852 1234 5678"
vercel env add NEXT_PUBLIC_COMPANY_EMAIL "info@z-printpro.com"
vercel env add AI_API_KEY your_ai_api_key_here
vercel env add AI_API_URL https://ai-api.z-printpro.com
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY pk_test_your_stripe_publishable_key
vercel env add STRIPE_SECRET_KEY sk_test_your_stripe_secret_key
vercel env add STRIPE_WEBHOOK_SECRET whsec_your_webhook_secret
vercel env add ADMIN_PASSWORD admin123
vercel env add ADMIN_TOKEN your-secure-admin-token
vercel env add NEXT_PUBLIC_GA_ID G-XXXXXXXXXX
vercel env add NEXT_PUBLIC_GTM_ID GTM-XXXXXXX
vercel env add NODE_ENV production
```

---

## 📞 需要帮助？

- Vercel 文档：https://vercel.com/docs/concepts/projects/environment-variables
- 项目文档：查看 `VERCEL_DEPLOYMENT_GUIDE.md`

---

**配置指南完成** ✅  
**下一步:** 在 Vercel Dashboard 配置完成后，运行 `vercel --prod` 部署