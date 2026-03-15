# 🚀 Cloudflare Pages 部署指南

## ✅ 配置完成概览

项目已完全配置为 Cloudflare Pages 部署，包含以下优化：

### 🎯 SEO + GEO 优化
- ✅ 完整的 hreflang 标签（zh-HK, en, ja）
- ✅ GEO meta 标签（geo.region, geo.placename, geo.position）
- ✅ Schema.org LocalBusiness 结构化数据
- ✅ OpenGraph 和 Twitter 卡片优化
- ✅ DC 元数据
- ✅ 焦点产品：宣传单张、纸袋印刷、贴纸印刷、包裝盒定制

### ⚡ 性能优化
- ✅ AVIF 和 WebP 图片格式支持
- ✅ 响应式图片尺寸优化
- ✅ 静态资源缓存策略
- ✅ DNS 预解析
- ✅ HSTS 安全配置

### 🔧 Cloudflare Pages 配置文件
- ✅ `public/_headers` - 安全 headers 和缓存策略
- ✅ `public/_redirects` - SEO 友好的 URL 重定向
- ✅ `next.config.js` - Cloudflare Pages 优化配置
- ✅ `package.json` - Cloudflare Pages 构建脚本

---

## 📋 部署步骤

### 方法 1：通过 GitHub通过自动部署（推荐）

1. **连接 Cloudflare Pages 到 GitHub**
   - 登录 Cloudflare Dashboard
   - 选择您的域名（或注册新域名）
   - 进入 "Workers & Pages"
   - 点击 "Create application" → "Connect to Git"

2. **选择仓库**
   - 选择 `zprintprohk-rgb/z-printpro` 仓库
   - Cloudflare 会自动检测 Next.js 项目

3. **配置构建设置**
   ```yaml
   Build command: npm run build
   Build output directory: .next
   Root directory: (留空)
   Node.js version: 18.17.0
   ```

4. **环境变量（可选）**
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.pages.dev
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

5. **保存并部署**
   - 点击 "Save and Deploy"
   - 等待构建完成（约 3-5 分钟）

---

### 方法 2：通过 Wrangler CLI 部署

1. **安装 Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **登录 Cloudflare**
   ```bash
   wrangler login
   ```

3. **构建项目**
   ```bash
   npm run build
   ```

4. **部署到 Cloudflare Pages**
   ```bash
   npx wrangler pages deploy .next
   ```

---

## 🔍 验证部署

### 1. 检查构建状态
访问 Cloudflare Pages Dashboard 查看构建日志

### 2. 验证 SEO 配置
```bash
curl -I https://your-domain.pages.dev/zh-hk
```

检查响应头：
- ✅ `X-DNS-Prefetch-Control: on`
- ✅ `Strict-Transport-Security`
- ✅ `Cache-Control`

### 3. 验证 GEO 标签
访问页面源代码，检查：
- ✅ `<meta name="geo.region" content="HK">`
- ✅ `<meta name="geo.placename" content="Hong Kong">`
- ✅ `<meta name="geo.position" content="22.3193;114.1694">`

### 4. 验证 hreflang
检查每个语言版本是否包含完整的 hreflang 标签
- ✅ zh-HK, en, ja, x-default

### 5. 验证 Schema.org
检查 JSON-LD 结构化数据：
- ✅ `@type: "LocalBusiness"`
- ✅ 包含香港地理坐标
- ✅ 包含客户评价信息

---

## 🌐 自定义域名（可选）

1. **购买或已有域名**
   - 可以从 Cloudflare 购买
   - 或使用已有域名

2. **添加域名到 Cloudflare Pages**
   - 在 Cloudflare Pages 项目设置中
   - 点击 "Custom domains"
   - 添加您的域名（如：z-printpro.com）

3. **配置 DNS**
   - Cloudflare 会自动配置 DNS 记录
   - 或手动添加 CNAME 记录

4. **更新环境变量**
   ```
   NEXT_PUBLIC_SITE_URL=https://z-printpro.com
   ```

5. **重新部署**
   - 推送新代码到 GitHub
   - 或手动触发部署

---

## 📊 性能监控

### Cloudflare Analytics
- 自动启用
- 查看 "Analytics" 标签页
- 监控：
  - 页面加载时间
  - 浏览器分布
  - 地理位置
  - 流量趋势

### PageSpeed Insights
```bash
# 使用 Google PageSpeed Insights 测试
npx lighthouse https://z-printpro.com/zh-hk --view
```

---

## 🔐 安全配置

### 1. 启用 HSTS
- 已在 `public/_headers` 中配置
- 强制 HTTPS 连接

### 2. 设置防火墙规则
- Cloudflare WAF
- 保护免受常见攻击

### 3. 启用 Bot Fight Mode
- 过滤恶意机器人
- 保护 SEO 排名

---

## 🔄 更新部署

### 自动部署
- 推送到 GitHub 分支（main）
- Cloudflare Pages 自动触发构建
- 约 3-5 分钟完成

### 手动部署
```bash
git push origin main
# 或
npm run pages:deploy
```

---

## 🐛 常见问题

### Q: 构建失败怎么办？
A: 检查：
1. Node.js 版本 >= 18.17.0
2. 依赖项已安装：`npm install`
3. 环境变量配置正确
4. 查看 Cloudflare 构建日志

### Q: 如何处理环境变量？
A: 
- 开发环境：`.env.local` 文件
- 生产环境：Cloudflare Pages 项目设置

### Q: 如何回滚部署？
A:
1. 在 Cloudflare Pages 查看部署历史
2. 点击特定部署旁边的 "..." 菜单
3. 选择 "Rollback to this deployment"

### Q: 如何优化加载速度？
A:
- ✅ 图片已优化（AVIF, WebP）
- ✅ 静态资源已缓存
- ✅ DNS 预解析已启用
- ✅ 使用 Cloudflare CDN 全球分发

---

## 📞 下一步

1. **部署到 Cloudflare Pages**
   - 按照"方法 1"完成部署

2. **配置自定义域名**
   - 绑定 z-printpro.com

3. **验证 SEO**
   - 使用 Google Search Console 提交 sitemap
   - 提交 robots.txt
   - 监控搜索排名

4. **设置分析**
   - Google Analytics 4
   - Cloudflare Analytics

5. **配置支付**
   - 设置 Stripe（香港账户）
   - 测试支付流程

---

## 🎉 成功指标

部署成功后，您应该看到：

- ✅ 网站可访问（https://your-domain.pages.dev）
- ✅ 所有语言版本正常工作
- ✅ SEO 标签完整
- ✅ 页面加载速度 < 2 秒
- ✅ 移动端响应式设计正常
- ✅ Schema.org 验证通过
- ✅ hreflang 标签完整

---

## 📞 需要帮助？

- Cloudflare Pages 文档：https://developers.cloudflare.com/pages/
- Next.js 文档：https://nextjs.org/docs
- 问题反馈：GitHub Issues

---

**祝部署成功！🚀**