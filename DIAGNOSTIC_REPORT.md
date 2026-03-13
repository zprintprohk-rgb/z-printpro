# Z-PrintPro 项目故障诊断报告

**生成时间:** 2026-03-13  
**诊断工具:** Next.js + Vercel 健康检测  
**项目版本:** Next.js 14.2.35

---

## 执行摘要

| 检测项目 | 状态 | 详情 |
|---------|------|------|
| 1. 环境变量一致性 | ❌ **严重** | `.env.local` 仅包含 `VERCEL_OIDC_TOKEN`，缺失所有业务变量 |
| 2. Middleware 分析 | ⚠️ 警告 | 代码结构正常，但依赖缺失的环境变量 |
| 3. 本地构建测试 | ✅ 通过 | 构建成功，无类型错误 |
| 4. 本地服务器测试 | ❌ 失败 | 服务器启动后无法连接（可能崩溃） |
| 5. 依赖配置审计 | ✅ 通过 | 版本匹配，配置正确 |

---

## 1. 🔍 环境变量一致性检查

### 当前 `.env.local` 状态
```
VERCEL_OIDC_TOKEN=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIs...
```

### 缺失的关键环境变量清单

| 变量名 | 用途 | 严重性 |
|--------|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 数据库连接 | 🔴 致命 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 前端认证 | 🔴 致命 |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 后端服务密钥 | 🔴 致命 |
| `NEXT_PUBLIC_SITE_URL` | 站点 URL 配置 | 🟡 高 |
| `NEXT_PUBLIC_API_URL` | API 端点配置 | 🟡 高 |
| `NEXT_PUBLIC_COMPANY_NAME` | 公司名称（SEO） | 🟢 中 |
| `NEXT_PUBLIC_COMPANY_PHONE` | 联系电话 | 🟢 中 |
| `NEXT_PUBLIC_COMPANY_EMAIL` | 联系邮箱 | 🟢 中 |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe 支付 | 🟡 高 |
| `STRIPE_SECRET_KEY` | Stripe 密钥 | 🟡 高 |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook | 🟡 高 |
| `ADMIN_PASSWORD` | 管理员密码 | 🟢 中 |
| `ADMIN_TOKEN` | 管理员 Token | 🟢 中 |
| `AI_API_KEY` | AI 服务密钥 | 🟢 中 |
| `AI_API_URL` | AI 服务端点 | 🟢 中 |
| `NEXT_PUBLIC_GA_ID` | Google Analytics | 🟢 低 |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager | 🟢 低 |
| `NODE_ENV` | 运行环境 | 🟡 高 |

### 根本原因
Vercel 部署时拉取的环境变量覆盖了本地 `.env.local`，但 Vercel 项目设置中可能未正确配置所有必需的环境变量。

---

## 2. 🛑 Middleware 逻辑静态分析

### 文件：`middleware.ts`

```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales: ['zh-hk', 'en', 'ja'],
  defaultLocale: 'zh-hk',
  localePrefix: 'always',
  localeDetection: false,
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ],
  runtime: 'experimental-edge',
  regions: ['hkg1', 'hnd1', 'sin1']
};
```

### 分析结果

| 检查点 | 状态 | 说明 |
|--------|------|------|
| 硬编码区域限制 | ✅ 正常 | `regions` 配置有效（hkg1, hnd1, sin1） |
| 异常处理 | ✅ 正常 | 使用 next-intl 官方中间件，内部已处理 |
| matcher 配置 | ✅ 正常 | 正确排除静态资源和 API 路由 |
| 同步阻塞操作 | ✅ 正常 | 无阻塞操作 |

### 潜在问题
Middleware 本身无问题，但如果依赖的环境变量（如通过 `i18n.ts` 间接依赖）缺失，可能导致运行时错误。

---

## 3. 🏗️ 本地生产环境模拟构建

### 构建输出摘要

```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages (3/3)
✓ Collecting build traces
✓ Finalizing page optimization

Route (app)                       Size     First Load JS
┌ ƒ /                             155 B    87.5 kB
├ ƒ /[locale]                     662 B    121 kB
├ ƒ /[locale]/checkout            12.6 kB  133 kB
└ ƒ /sitemap.xml                  0 B      0 B

Middleware: 39.7 kB
```

### 构建状态
- ✅ TypeScript 类型检查通过
- ✅ 无编译错误
- ⚠️ 警告：Edge Runtime 禁用静态生成（预期行为）

---

## 4. 🧪 本地生产服务器试运行

### 测试结果
- ❌ **服务器启动失败**
- 错误：`curl: 无法连接到远程服务器`
- 可能原因：服务器启动后立即崩溃（缺少环境变量）

---

## 5. 📦 依赖与配置审计

### package.json 版本检查

| 依赖 | 版本 | 状态 |
|------|------|------|
| next | ^14.2.23 | ✅ 匹配 |
| react | ^18.3.1 | ✅ 匹配 |
| react-dom | ^18.3.1 | ✅ 匹配 |
| next-intl | ^3.26.5 | ✅ 匹配 |
| @supabase/ssr | ^0.9.0 | ✅ 匹配 |

### next.config.js 检查

| 配置项 | 值 | 状态 |
|--------|-----|------|
| output | 'standalone' | ✅ 正确（Docker 优化） |
| experimental.optimizeCss | true | ✅ 正确 |
| images.remotePatterns | *.supabase.co | ✅ 正确 |

---

## 📝 根本原因推测 (Top 3)

### 1. 🔴 环境变量缺失（最可能）
**可能性：90%**

Vercel 部署时，项目从 Vercel 拉取了环境变量，但只包含 `VERCEL_OIDC_TOKEN`。所有业务关键变量（Supabase、Stripe、站点配置）都缺失，导致：
- 页面渲染时访问未定义的环境变量
- Supabase 客户端初始化失败
- 服务器组件崩溃

### 2. 🟡 Vercel 项目环境变量未配置
**可能性：70%**

Vercel Dashboard 中可能未正确配置生产环境变量。需要检查：
- Settings → Environment Variables
- 确认所有 `.env.example` 中的变量都已添加

### 3. 🟠 Edge Runtime 区域限制
**可能性：30%**

虽然 `regions` 配置已修复为有效值（hkg1, hnd1, sin1），但如果 Vercel 账户计划不支持多区域部署，可能导致请求路由问题。

---

## 🔧 修复建议

### 方案 A：在 Vercel Dashboard 配置环境变量（推荐）

1. 访问 https://vercel.com/z-printpros-projects/z-printpro/settings/environment-variables
2. 添加以下环境变量（生产环境）：

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_SUPABASE_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=sb_secret_YOUR_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL=https://www.z-printpro.com
NEXT_PUBLIC_API_URL=https://api.z-printpro.com
NEXT_PUBLIC_COMPANY_NAME=智印港 | Z-PrintPro
NEXT_PUBLIC_COMPANY_PHONE=+852 1234 5678
NEXT_PUBLIC_COMPANY_EMAIL=info@z-printpro.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
ADMIN_PASSWORD=admin123
ADMIN_TOKEN=your-secure-admin-token
AI_API_KEY=your_ai_api_key_here
AI_API_URL=https://ai-api.z-printpro.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NODE_ENV=production
```

3. 重新部署：`vercel --prod`

### 方案 B：本地修复 .env.local 并重新部署

1. 恢复 `.env.local` 文件到之前的完整版本
2. 使用 `vercel env pull` 拉取后，手动补充缺失的变量
3. 重新部署：`vercel --prod`

### 方案 C：临时禁用 Middleware 测试

如果上述方案无效，可临时禁用 Middleware 排查：

```typescript
// middleware.ts - 临时测试
export function middleware() {
  return NextResponse.next();
}
```

---

## 📋 下一步行动指令

### 立即执行（按顺序）

1. **检查 Vercel 环境变量**
   ```bash
   vercel env ls
   ```

2. **从备份恢复 .env.local**
   - 如果有备份，恢复完整的 `.env.local`
   - 或手动复制 `.env.example` 为 `.env.local` 并填入实际值

3. **本地测试服务器**
   ```bash
   npm run build && npm run start
   ```
   确认本地能正常运行后，再部署到 Vercel

4. **重新部署到 Vercel**
   ```bash
   vercel --prod
   ```

5. **验证部署**
   ```bash
   curl -I https://z-printpro-z-printpros-projects.vercel.app/zh-hk
   ```

---

## 附录：完整环境变量清单

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_SUPABASE_PROJECT.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sb_publishable_YOUR_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="sb_secret_YOUR_SERVICE_ROLE_KEY"

# 站點配置
NEXT_PUBLIC_SITE_URL=https://www.z-printpro.com
NEXT_PUBLIC_API_URL=https://api.z-printpro.com

# 公司信息
NEXT_PUBLIC_COMPANY_NAME=智印港 | Z-PrintPro
NEXT_PUBLIC_COMPANY_PHONE=+852 1234 5678
NEXT_PUBLIC_COMPANY_EMAIL=info@z-printpro.com

# AI 服務配置
AI_API_KEY=your_ai_api_key_here
AI_API_URL=https://ai-api.z-printpro.com

# Stripe 支付配置
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# 管理員配置
ADMIN_PASSWORD=admin123
ADMIN_TOKEN=your-secure-admin-token

# 分析工具
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# 開發模式
NODE_ENV=production
```

---

**报告结束**