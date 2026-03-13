# 🔐 密钥轮换安全指南

**生成时间:** 2026-03-13  
**紧急程度:** ⚠️ **高** - 建议立即执行

---

## ⚠️ 为什么需要轮换密钥？

在之前的 Git 提交历史中，以下敏感密钥曾被提交到仓库：
- `SUPABASE_SERVICE_ROLE_KEY=sb_secret_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`（已移除）
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`（已移除）

虽然这些密钥已被从当前提交中移除，但**Git 历史可能已被克隆或缓存**，因此强烈建议立即轮换。

---

## 📋 步骤 1：打开 Supabase API 设置页面

已自动在浏览器中打开：
```
https://app.supabase.com/project/hxabtjekvbozhrfsiidm/settings/api
```

如果页面未打开，请手动访问上述 URL。

---

## 📋 步骤 2：轮换 Supabase 密钥

### 2.1 轮换 Service Role Key（必须）

1. 在 Supabase Dashboard 中，进入 **Settings** → **API**
2. 找到 **Project service role key** 部分
3. 点击 **Regenerate** 按钮
4. 确认操作（可能需要输入密码或 2FA 验证码）
5. **复制新生成的密钥** - 这是您的新 `SUPABASE_SERVICE_ROLE_KEY`

### 2.2 轮换 Anon Key（可选但推荐）

1. 在同一页面，找到 **Project API keys** 部分
2. 点击 **anon/public** 密钥旁的 **Reveal** 查看当前密钥
3. 如需轮换，点击 **Regenerate**
4. **复制新生成的密钥** - 这是您的新 `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2.3 记录新密钥

将新密钥保存到安全位置：
```
# 新密钥（请替换为实际值）
SUPABASE_SERVICE_ROLE_KEY=sb_secret_NEW_YOUR_NEW_KEY_HERE
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_NEW_YOUR_NEW_KEY_HERE
```

---

## 📋 步骤 3：更新本地 .env.local 文件

1. 在项目根目录创建或编辑 `.env.local` 文件
2. 填入新的 Supabase 密钥：

```bash
# Supabase 配置（使用新轮换的密钥）
NEXT_PUBLIC_SUPABASE_URL=https://hxabtjekvbozhrfsiidm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_你的新密钥
SUPABASE_SERVICE_ROLE_KEY=sb_secret_你的新密钥
```

3. 保存文件

---

## 📋 步骤 4：在 Vercel 更新环境变量

### 方法 A：Vercel Dashboard（推荐）

1. 访问：https://vercel.com/z-printpros-projects/z-printpro/settings/environment-variables
2. 找到以下变量并点击编辑：
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. 填入新密钥
4. 点击 **Save**
5. 重新部署项目（点击 **Redeploy** 或运行 `vercel --prod`）

### 方法 B：Vercel CLI

```bash
# 登录 Vercel
vercel login

# 更新环境变量
vercel env set SUPABASE_SERVICE_ROLE_KEY sb_secret_你的新密钥
vercel env set NEXT_PUBLIC_SUPABASE_ANON_KEY sb_publishable_你的新密钥

# 重新部署
vercel --prod
```

---

## 📋 步骤 5：验证部署

部署完成后，验证应用是否正常工作：

```bash
# 测试首页
curl -I https://z-printpro-z-printpros-projects.vercel.app/zh-hk

# 预期：200 OK
```

访问以下 URL 测试功能：
- 首页：`https://z-printpro-z-printpros-projects.vercel.app/zh-hk`
- 产品列表：`https://z-printpro-z-printpros-projects.vercel.app/zh-hk/products`
- 购物车：`https://z-printpro-z-printpros-projects.vercel.app/zh-hk/cart`

---

## 📋 步骤 6：更新 .env.example（可选）

`.env.example` 文件已包含占位符格式，无需更新。

---

## 🔒 其他建议轮换的密钥

如果您曾在代码中使用过以下密钥，也建议轮换：

| 密钥 | 轮换地址 |
|------|----------|
| Stripe Secret Key | https://dashboard.stripe.com/apikeys |
| Stripe Webhook Secret | https://dashboard.stripe.com/webhooks |
| AI API Key | 联系 AI 服务提供商 |
| Admin Password | 修改本地配置和 Vercel 环境变量 |
| Admin Token | 修改本地配置和 Vercel 环境变量 |

---

## ✅ 检查清单

- [ ] 已打开 Supabase API 设置页面
- [ ] 已生成新的 Service Role Key
- [ ] 已生成新的 Anon Key（推荐）
- [ ] 已更新本地 `.env.local` 文件
- [ ] 已在 Vercel Dashboard 更新环境变量
- [ ] 已重新部署项目
- [ ] 已验证部署正常工作

---

## 📞 需要帮助？

- Supabase 文档：https://supabase.com/docs/guides/database/api-keys
- Vercel 文档：https://vercel.com/docs/concepts/projects/environment-variables
- 项目问题：查看 `DEPLOYMENT_COMPLETE_REPORT.md`

---

**安全指南完成** 🔒  
**状态:** 等待执行密钥轮换