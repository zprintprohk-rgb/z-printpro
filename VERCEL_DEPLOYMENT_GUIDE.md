# Vercel 一键部署完整指南

**项目名称:** Z-PrintPro (智印港)  
**文档版本:** 1.0  
**生成时间:** 2026-03-13

---

## 🎯 部署目标

将 Next.js + Vercel 项目部署到 Vercel 生产环境，实现：
- ✅ 多语言支持（zh-HK, en, ja）
- ✅ Edge Network 全球加速
- ✅ SEO 优化（hreflang, JSON-LD）
- ✅ 自动化 CI/CD

---

## 📋 前置条件

### 必需
- [ ] Node.js >= 18.17.0
- [ ] npm >= 9.0.0
- [ ] Git 已安装
- [ ] Vercel 账户（免费或付费）

### 可选
- [ ] 自定义域名
- [ ] Google Analytics 账户
- [ ] Stripe 账户
- [ ] Supabase 项目

---

## 🚀 快速部署（5 分钟）

### 步骤 1：安装 Vercel CLI

```bash
npm install -g vercel
```

验证安装：
```bash
vercel --version
# 输出：Vercel CLI x.x.x
```

### 步骤 2：登录 Vercel

```bash
vercel login
```

选择登录方式：
- GitHub（推荐）
- GitLab
- Bitbucket
- Email

### 步骤 3：链接项目

```bash
vercel link
```

首次运行会提示：
1. 选择 "Create New Project"
2. 输入项目名称：`z-printpro`
3. 选择团队（如果有）：`z-printpros-projects`
4. 确认链接

### 步骤 4：配置环境变量

**方法 A：Vercel Dashboard（推荐）**

1. 访问：https://vercel.com/z-printpros-projects/z-printpro/settings/environment-variables
2. 点击 "Add New"
3. 添加以下变量（参考 `VERCEL_ENV_TEMPLATE.md`）：

| 变量名 | 值 | 环境 |
|--------|-----|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://YOUR_SUPABASE_PROJECT.supabase.co` | Production |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_YOUR_ANON_KEY` | Production |
| `SUPABASE_SERVICE_ROLE_KEY` | `sb_secret_YOUR_SERVICE_ROLE_KEY` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://z-printpro.com` | Production |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_xxx` | Production |
| `STRIPE_SECRET_KEY` | `sk_test_xxx` | Production |
| `STRIPE_WEBHOOK_SECRET` | `whsec_xxx` | Production |
| `AI_API_KEY` | `your_key` | Production |
| `ADMIN_PASSWORD` | `admin123` | Production |
| `ADMIN_TOKEN` | `your_token` | Production |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Production |
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` | Production |

**方法 B：Vercel CLI**

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL https://YOUR_SUPABASE_PROJECT.supabase.co
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY sb_publishable_YOUR_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY sb_secret_YOUR_SERVICE_ROLE_KEY
# ... 继续添加其他变量
```

### 步骤 5：部署到生产环境

```bash
vercel --prod
```

部署过程：
1. 上传文件到 Vercel
2. 自动构建（`npm run build`）
3. 部署到 Edge Network
4. 生成生产 URL

部署成功后输出：
```
✅  Production: https://z-printpro-xxxx.vercel.app
🔗  Aliased: https://z-printpro-z-printpros-projects.vercel.app
```

---

## 🔍 部署验证

### 检查部署状态

```bash
vercel ls
```

输出示例：
```
Name       URL                                         State    Updated
z-printpro https://z-printpro-z-printpros-projects...  READY    1m ago
```

### 访问测试

```bash
# 测试首页重定向
curl -I https://z-printpro-z-printpros-projects.vercel.app/
# 预期：307 重定向到 /zh-hk

# 测试香港页面
curl -I https://z-printpro-z-printpros-projects.vercel.app/zh-hk
# 预期：200 OK

# 测试英语页面
curl -I https://z-printpro-z-printpros-projects.vercel.app/en
# 预期：200 OK

# 测试日语页面
curl -I https://z-printpro-z-printpros-projects.vercel.app/ja
# 预期：200 OK
```

### SEO 验证

```bash
# 提取 title
curl https://z-printpro-z-printpros-projects.vercel.app/zh-hk | grep -o '<title>[^<]*</title>'

# 提取 description
curl https://z-printpro-z-printpros-projects.vercel.app/zh-hk | grep -o 'meta name="description"[^>]*>'

# 提取 hreflang
curl https://z-printpro-z-printpros-projects.vercel.app/zh-hk | grep -o 'hreflang="[^"]*"'

# 提取 JSON-LD
curl https://z-printpro-z-printpros-projects.vercel.app/zh-hk | grep -o '<script type="application/ld+json">[^<]*</script>'
```

---

## 🌐 自定义域名配置（可选）

### 步骤 1：在 Vercel 添加域名

1. 访问：https://vercel.com/z-printpros-projects/z-printpro/settings/domains
2. 点击 "Add Domain"
3. 输入域名：`z-printpro.com`
4. 点击 "Add"

### 步骤 2：配置 DNS

在域名注册商处添加以下记录：

| 类型 | 名称 | 值 | TTL |
|------|------|-----|-----|
| A | @ | `76.76.21.21` | 3600 |
| CNAME | www | `cname.vercel-dns.com` | 3600 |

### 步骤 3：等待 DNS 传播

通常 5-30 分钟生效，最长 48 小时。

验证：
```bash
nslookup z-printpro.com
# 应返回 Vercel IP
```

### 步骤 4：强制 HTTPS

在 Vercel Dashboard 启用：
- Settings → SSL → Force HTTPS

---

## 🔄 持续部署（CI/CD）

### Git 集成

Vercel 自动与 GitHub/GitLab/Bitbucket 集成：

1. 推送代码到 `main` 分支：
   ```bash
   git add .
   git commit -m "feat: 新功能"
   git push origin main
   ```

2. Vercel 自动：
   - 检测代码变更
   - 触发构建
   - 部署到预览环境
   - 合并到 main 后部署到生产

### 手动触发部署

```bash
# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod

# 查看部署日志
vercel logs
```

---

## 🛠️ 故障排查

### 构建失败

**错误：** `Error: next build failed`

**解决：**
```bash
# 本地测试构建
npm run build

# 查看详细错误
npm run build 2>&1 | tee build.log
```

### 环境变量未生效

**症状：** 页面显示 "Missing environment variable"

**解决：**
1. 检查 Vercel Dashboard 环境变量是否配置
2. 确认环境变量作用域（Production/Preview）
3. 重新部署：`vercel --prod --force`

### 路由 404

**症状：** 访问 `/zh-hk` 返回 404

**解决：**
1. 检查 `middleware.ts` 配置
2. 检查 `i18n.ts` locales 配置
3. 清除 Vercel 缓存：`vercel --prod`

### Edge Runtime 错误

**错误：** `Runtime error in Edge Function`

**解决：**
1. 检查 `regions` 配置是否有效
2. 避免在 Middleware 中使用 Node.js API
3. 简化 Middleware 逻辑

---

## 📊 监控与分析

### Vercel Analytics

1. 访问：https://vercel.com/z-printpros-projects/z-printpro/analytics
2. 查看：
   - 页面浏览量
   - 访问量
   - 平均加载时间
   - 地理分布

### Google Analytics

在 `app/[locale]/layout.tsx` 中已配置 GA4：

```tsx
// NEXT_PUBLIC_GA_ID 环境变量
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
/>
```

验证：
```bash
curl https://z-printpro.com/zh-hk | grep "G-"
```

### Google Search Console

1. 访问：https://search.google.com/search-console
2. 添加属性：`https://z-printpro.com`
3. 验证所有权（通过 DNS 或 HTML 文件）
4. 提交 sitemap：`https://z-printpro.com/sitemap.xml`

---

## 📝 部署检查清单

### 部署前
- [ ] `npm run build` 本地通过
- [ ] 所有代码已提交到 Git
- [ ] 环境变量已配置
- [ ] 域名已绑定（如使用）

### 部署后
- [ ] 生产 URL 可访问
- [ ] 所有语言路由正常
- [ ] 图片加载正常
- [ ] 表单提交正常
- [ ] 支付流程正常（如适用）
- [ ] Google Analytics 数据正常
- [ ] Search Console 已提交

---

## 🔗 相关文档

- [VERCEL_ENV_TEMPLATE.md](./VERCEL_ENV_TEMPLATE.md) - 环境变量模板
- [DEPLOYMENT_FINAL_CHECKLIST.md](./DEPLOYMENT_FINAL_CHECKLIST.md) - 部署前检查清单
- [SEO_VERIFICATION.md](./SEO_VERIFICATION.md) - SEO 验证报告
- [DIAGNOSTIC_REPORT.md](./DIAGNOSTIC_REPORT.md) - 故障诊断报告

---

## 📞 支持

- Vercel 文档：https://vercel.com/docs
- Next.js 文档：https://nextjs.org/docs
- 项目问题：查看 `DIAGNOSTIC_REPORT.md`

---

**部署指南完成** ✅  
**状态:** 准备部署