# 🚀 智印港 Z-PrintPro - Cloudflare Pages 完整部署指南

## 📅 部署准备完成时间
**2026年3月15日**

---

## ✅ 前置条件检查

在开始部署之前，请确保以下条件已满足：

### 已完成的任务
- ✅ Cloudflare Pages 基础配置
- ✅ 多语言架构（/zh-hk, /en, /ja）
- ✅ 5 个 GEO 结构化数据组件
- ✅ Tailwind 主题配置
- ✅ 8 个核心设计组件
- ✅ 3 个多语言翻译文件
- ✅ 部署准备文档

### 需要准备的资源
- [ ] Cloudflare 账户
- [ ] Supabase 项目（可选，推荐）
- [ ] GitHub 仓库（可选，用于自动部署）
- [ ] 域名（可选，自定义域名）

---

## 📋 部署方法选择

### 方法 1：手动部署（推荐新手）
**优点：** 完全控制，适合理解部署流程
**缺点：** 需要手动执行每步
**预计时间：** 30 分钟

### 方法 2：使用部署脚本（推荐）
**优点：** 一键部署，自动化流程
**缺点：** 需要配置环境变量
**预计时间：** 15 分钟

### 方法 3：GitHub Actions 自动部署（推荐团队）
**优点：** 自动部署，版本控制，CI/CD
**缺点：** 需要 GitHub 仓库配置
**预计时间：** 首次配置 20 分钟，后续自动

---

## 🎯 方法 1：手动部署详细步骤

### 步骤 1：安装 Wrangler CLI

```bash
# 全局安装 Wrangler
npm install -g wrangler

# 验证安装
wrangler --version
```

### 步骤 2：登录 Cloudflare

```bash
# 登录 Cloudflare 账户
wrangler login

# 这将打开浏览器进行授权
# 授权成功后返回终端
```

### 步骤 3：验证登录

```bash
# 查看当前登录的账户
wrangler whoami
```

### 步骤 4：类型检查

```bash
# 运行 TypeScript 类型检查
npx tsc --noEmit
```

**预期输出：** 无错误或警告

### 步骤 5：生产构建

```bash
# 清理之前的构建
rm -rf .next

# 运行生产构建
npm run build
```

**预期输出：**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

### 步骤 6：部署到 Cloudflare Pages

```bash
# 部署到 Cloudflare Pages
wrangler pages deploy .next --project-name=z-printpro
```

**预期输出：**
```
✨ Deployment complete!

Your deployment is now live at:
https://z-printpro.pages.dev

View deployment details:
https://dash.cloudflare.com/your-account/pages/view/z-printpro
```

### 步骤 7：配置环境变量

在 Cloudflare Dashboard 中设置环境变量：

1. 访问：https://dash.cloudflare.com
2. 导航到：Pages → z-printpro → Settings → Environment variables
3. 添加以下变量：

| 变量名 | 值 |
|--------|-----|
| `NEXT_PUBLIC_SITE_URL` | `https://z-printpro.pages.dev` |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | `zh-HK` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key` |

---

## 🎯 方法 2：使用部署脚本

### 步骤 1：准备环境变量

```bash
# 复制环境变量示例
cp .env.example .env.local

# 编辑 .env.local，填写实际值
# 至少需要：
# - CLOUDFLARE_API_TOKEN
# - CLOUDFLARE_ACCOUNT_ID
```

### 步骤 2：获取 Cloudflare API Token

1. 访问：https://dash.cloudflare.com/profile/api-tokens
2. 点击 "Create Token"
3. 权限选择：`Account` → `Cloudflare Pages` → `Edit`
4. 创建后复制 Token

### 步骤 3：获取 Account ID

1. 访问：https://dash.cloudflare.com
2. 在右侧边栏找到 "Account ID"
3. 复制 Account ID

### 步骤 4：编辑 .env.local

```bash
# 使用你获取的值编辑 .env.local
nano .env.local
```

填写：
```
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
```

### 步骤 5：运行部署脚本

```bash
# 赋予执行权限
chmod +x scripts/deploy.sh

# 运行部署脚本
./scripts/deploy.sh
```

脚本将自动执行：
1. TypeScript 类型检查
2. 依赖检查
3. 构建缓存清理
4. 生产构建
5. 部署到 Cloudflare Pages

---

## 🎯 方法 3：GitHub Actions 自动部署

### 步骤 1：创建 GitHub 仓库

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 创建初始提交
git commit -m "Initial commit: Complete optimization solution"

# 添加远程仓库
git remote add origin https://github.com/your-username/z-printpro.git

# 推送到 GitHub
git push -u origin main
```

### 步骤 2：配置 GitHub Secrets

1. 访问：https://github.com/your-username/z-printpro/settings/secrets/actions
2. 添加以下 Secrets：

| Secret 名称 | 值 | 说明 |
|-------------|------|------|
| `CLOUDFLARE_API_TOKEN` | 你的 API Token | Cloudflare API 访问令牌 |
| `CCLDFLARE_ACCOUNT_ID` | 你的 Account ID | Cloudflare 账户 ID |
| `NEXT_PUBLIC_SITE_URL` | `https://z-printpro.pages.dev` | 网站 URL |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | `zh-HK` | 默认语言 |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase URL | 可选 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Key | 可选 |

### 步骤 3：触发自动部署

```bash
# 推送任何代码到 main 分支将自动触发部署
git add .
git commit -m "Trigger deployment"
git push origin main
```

### 步骤 4：监控部署进度

1. 访问：https://github.com/your-username/z-printpro/actions
2. 查看 "Deploy to Cloudflare Pages" 工作流状态
3. 部署完成后，访问：https://z-printpro.pages.dev

---

## ✅ 部署后验证清单

### 1. 基本功能验证

访问以下 URL 并验证：

| URL | 验证项 | 状态 |
|------|---------|------|
| `https`://z-printpro.pages.dev/zh-hk | 繁体中文首页 | ⏳ |
| `https://z-printpro.pages.dev/en` | 英文首页 | ⏳ |
| `https://z-printpro.pages.dev/ja` | 日文首页 | ⏳ |

### 2. 结构化数据验证

使用 [Google Rich Results Test](https://search.google.com/test/rich-results)：

1. 输入：`https://z-printpro.pages.dev/zh-hk`
2. 验证以下 Schema：
   - ✅ LocalBusiness
   - ✅ Product
   - ✅ FAQPage
   - ✅ BreadcrumbList

### 3. Hreflang 标签验证

查看页面源代码，验证：

```html
<!-- 应该看到 -->
<link rel="alternate" hreflang="zh-HK" href="https://z-printpro.pages.dev/zh-hk" />
<link rel="alternate" hreflang="en" href="https://z-printpro.pages.dev/en" />
<link rel="alternate" hreflang="ja" href="https://z-printpro.pages.dev/ja" />
<link rel="alternate" hreflang="x-default" href="https://z-printpro.pages.dev/zh-hk" />
```

### 4. 性能验证

使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse)：

访问：`chrome://lighthouse`

**预期分数：**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: 100

---

## 🌐 自定义域名配置（可选）

### 步骤 1：在 Cloudflare Dashboard 添加域名

1. 访问：https://dash.cloudflare.com/your-account/pages/view/z-printpro
2. 点击 "Custom domains"
3. 添加你的域名（例如：`z-printpro.com`）

### 步骤 2：更新 DNS 记录

根据 Cloudflare 提供的说明更新 DNS 记录。

### 步骤 3：更新环境变量

更新 `NEXT_PUBLIC_SITE_URL` 为你的自定义域名。

### 步骤 4：重新部署

```bash
# 使用部署脚本
./scripts/deploy.sh
```

---

## 📊 监控和维护

### Cloudflare Analytics

访问：https://dash.cloudflare.com/your-account/pages/analytics/z-printpro

监控指标：
- 访问量
- 带宽使用
- 请求成功率
- 错误率
- 地理分布

### Google Search Console

1. 提交网站：https://search.google.com/search-console
2. 验证所有权
3. 提交 sitemap：`https://z-printpro.pages.dev/sitemap.xml`
4. 监控：
   - 索引状态
   - 搜索表现
   - 覆盖率
   - 移动友好性

---

## 🐛 常见问题解决

### 问题 1：部署失败 - "Project not found"

**解决方案：**
```bash
# 先创建项目
wrangler pages project create z-printpro

# 然后部署
wrangler pages deploy .next --project-name=z-printpro
```

### 问题 2：构建失败 - TypeScript 错误

**解决方案：**
```bash
# 查看详细错误
npx tsc --noEmit

# 修复错误后重新构建
npm run build
```

### 问题 3：环境变量未生效

**解决方案：**
1. 在 Cloudflare Dashboard 检查环境变量
2. 确保变量名完全匹配（区分大小写）
3. 重新部署
4. 清除浏览器缓存

### 问题 4：多语言切换不工作

**解决方案：**
1. 检查 `middleware.ts` 配置
2. 验证 `i18n.ts` 配置
3. 确保翻译文件存在
4. 检查浏览器控制台错误

---

## 📈 部署优化建议

### 1. 启用 Cloudflare 缓存

在 `wrangler.toml` 中已配置：
```toml
[build.environment_variables]
NODE_VERSION = "18"
```

### 2. 优化图片

```bash
# 使用 Next.js Image 优化
# 在组件中使用：
import Image from 'next/image'

<Image
  src="/images/product.jpg"
  alt="Product"
  width={800}
  height={600}
  priority
/>
```

### 3. 启用压缩

在 `next.config.js` 中已配置：
```javascript
module.exports = {
  compress: true,
  // ...
}
```

---

## 🎉 部署完成！

### 下一步行动

1. **立即验证**
   - 访问所有语言版本
   - 测试所有功能
   - 验证结构化数据

2. **SEO 优化**
   - 提交到 Google Search Console
   - 验证结构化数据
   - 监控搜索表现

3. **性能监控**
   - 设置 Cloudflare Analytics
   - 配置 Google Analytics
   - 定期检查 Lighthouse 分数

4. **持续改进**
   - 监控用户反馈
   - 优化核心页面
   - 添加新功能

---

## 📞 联系和支持

**技术支持：** support@z-printpro.com
**紧急联系：** +852 1234 5678
**Cloudflare 文档：** https://developers.cloudflare.com/pages
**Next.js 文档：** https://nextjs.org/docs

---

**部署指南版本：** 1.0
**最后更新：** 2026年3月15日
**项目名称：** 智印港 Z-PrintPro
**状态：** ✅ 生产就绪