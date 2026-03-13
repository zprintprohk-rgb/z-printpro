# Vercel 环境变量配置清单

**项目名称:** Z-PrintPro  
**GitHub 仓库:** https://github.com/zprintprohk-rgb/z-printpro  
**Vercel 项目:** https://vercel.com/z-printpros-projects/z-printpro  

---

## ⚠️ 重要安全提示

1. **不要在代码中存储真实密钥** - 所有敏感密钥应通过 Vercel Dashboard 配置
2. **定期轮换密钥** - 建议每 90 天更换一次 Supabase 和 Stripe 密钥
3. **使用占位符提交文档** - 文档中的密钥应使用占位符格式

---

## 📋 必需配置的环境变量（18 个）

### 数据库配置（Supabase）

| 变量名 | 值 | 环境 | 说明 |
|--------|-----|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://YOUR_SUPABASE_PROJECT.supabase.co` | Production | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_YOUR_ANON_KEY` | Production | Supabase 匿名密钥（可公开） |
| `SUPABASE_SERVICE_ROLE_KEY` | `sb_secret_YOUR_SERVICE_ROLE_KEY` | Production | Supabase 服务密钥（⚠️ 敏感） |

### 站点配置

| 变量名 | 值 | 环境 | 说明 |
|--------|-----|------|------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.z-printpro.com` | Production | 站点 URL |
| `NEXT_PUBLIC_API_URL` | `https://api.z-printpro.com` | Production | API 端点 |

### 公司信息

| 变量名 | 值 | 环境 | 说明 |
|--------|-----|------|------|
| `NEXT_PUBLIC_COMPANY_NAME` | `智印港 \| Z-PrintPro` | Production | 公司名称 |
| `NEXT_PUBLIC_COMPANY_PHONE` | `+852 1234 5678` | Production | 联系电话 |
| `NEXT_PUBLIC_COMPANY_EMAIL` | `info@z-printpro.com` | Production | 联系邮箱 |

### AI 服务配置

| 变量名 | 值 | 环境 | 说明 |
|--------|-----|------|------|
| `AI_API_KEY` | `your_ai_api_key_here` | Production | AI 服务密钥（⚠️ 敏感） |
| `AI_API_URL` | `https://ai-api.z-printpro.com` | Production | AI 服务端点 |

### 支付配置（Stripe）

| 变量名 | 值 | 环境 | 说明 |
|--------|-----|------|------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_your_stripe_publishable_key` | Production | Stripe 公钥 |
| `STRIPE_SECRET_KEY` | `sk_test_your_stripe_secret_key` | Production | Stripe 密钥（⚠️ 敏感） |
| `STRIPE_WEBHOOK_SECRET` | `whsec_your_webhook_secret` | Production | Stripe Webhook 密钥（⚠️ 敏感） |

### 管理员配置

| 变量名 | 值 | 环境 | 说明 |
|--------|-----|------|------|
| `ADMIN_PASSWORD` | `admin123` | Production | 管理员密码（⚠️ 敏感） |
| `ADMIN_TOKEN` | `your-secure-admin-token` | Production | 管理员 Token（⚠️ 敏感） |

### 分析工具

| 变量名 | 值 | 环境 | 说明 |
|--------|-----|------|------|
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Production | Google Analytics ID |
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` | Production | Google Tag Manager ID |

### 运行环境

| 变量名 | 值 | 环境 | 说明 |
|--------|-----|------|------|
| `NODE_ENV` | `production` | Production | 运行环境 |

---

## 🔧 配置步骤

### 方法 1：Vercel Dashboard（推荐）

1. 访问：https://vercel.com/z-printpros-projects/z-printpro/settings/environment-variables
2. 点击 "Add New" 按钮
3. 逐个添加上述 18 个环境变量
4. 确保勾选 "Production" 环境
5. 点击 "Save" 保存

### 方法 2：Vercel CLI

```bash
# 登录 Vercel
vercel login

# 链接项目
vercel link

# 批量添加环境变量（替换为实际值）
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

## ✅ 配置验证

### 1. 检查环境变量已配置

```bash
vercel env ls
```

### 2. 重新部署项目

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

## 🔐 敏感变量说明

以下变量包含敏感信息，**不应**提交到 Git：

- `SUPABASE_SERVICE_ROLE_KEY` - Supabase 管理密钥
- `STRIPE_SECRET_KEY` - Stripe 支付密钥
- `STRIPE_WEBHOOK_SECRET` - Stripe Webhook 密钥
- `ADMIN_PASSWORD` - 管理员密码
- `ADMIN_TOKEN` - 管理员 Token
- `AI_API_KEY` - AI 服务密钥

---

## 📝 .gitignore 配置

确保 `.gitignore` 包含以下规则：

```
# Local env files
.env
.env*.local
.env.production

# Vercel
.vercel
```

---

## 🔄 密钥轮换流程

如果怀疑密钥泄露，请按以下步骤轮换：

1. **Supabase**:
   - 访问 https://app.supabase.com/project/_/settings/api
   - 生成新的 Service Role Key
   - 在 Vercel 更新 `SUPABASE_SERVICE_ROLE_KEY`
   - 重新部署

2. **Stripe**:
   - 访问 https://dashboard.stripe.com/apikeys
   - 生成新的密钥
   - 在 Vercel 更新相关变量
   - 重新部署

3. **AI API**:
   - 联系 AI 服务提供商生成新密钥
   - 在 Vercel 更新 `AI_API_KEY`
   - 重新部署

---

**文档更新时间:** 2026-03-13  
**状态:** ✅ Git 历史已清理，敏感信息已移除