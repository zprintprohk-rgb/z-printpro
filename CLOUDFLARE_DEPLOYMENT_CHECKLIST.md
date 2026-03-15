# 🚀 智印港 Cloudflare Pages 部署清单

## 📅 部署前准备

### 环境变量配置
```bash
# Cloudflare Pages 环境变量
NEXT_PUBLIC_SITE_URL=https://z-printpro.pages.dev
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_DEFAULT_LOCALE=zh-HK
```

### 构建配置
```toml
# wrangler.toml
name = "z-printpro"
compatibility_date = "2024-01-01"

[vars]
NEXT_PUBLIC_SITE_URL = "https://z-printpro.pages.dev"
```

---

## ✅ 部署前检查清单

### 代码质量
- [ ] TypeScript 编译无错误
- [ ] 所有测试通过
- [ ] 代码格式化完成
- [ ] 无 console.log 残留

### SEO 验证
- [ ] 结构化数据正确
- [ ] 元标签完整
- [ ] robots.txt 配置
- [ ] sitemap.xml 生成

### 性能优化
- [ ] 图片优化完成
- [ ] 代码分割配置
- [ ] 懒加载实现
- [ ] 缓存策略配置

### 安全检查
- [ ] 环境变量配置
- [ ] API 密钥安全
- [ ] CORS 配置
- [ ] HTTPS 强制

---

## 🚀 部署步骤

### 1. 构建应用
```bash
npm run build
```

### 2. 验证构建输出
- [ ] 检查 `.next` 目录
- [ ] 验证静态资源
- [ ] 确认路由配置

### 3. 部署到 Cloudflare Pages
```bash
# 方式 1：使用 wrangler
npm run pages:deploy

# 方式 2：使用 Cloudflare Dashboard
# 上传构建产物
```

### 4. 验证部署
- [ ] 访问 https://z-printpro.pages.dev
- [ ] 检查所有页面加载
- [ ] 测试多语言切换
- [ ] 验证结构化数据

---

## 🧪 部署后验证

### 功能测试
- [ ] 导航功能正常
- [ ] 产品页面加载
- [ ] 结账流程完整
- [ ] 购物车功能

### SEO 测试
- [ ] Google Rich Results Test 通过
- [ ] Schema.org Validator 通过
- [ ] 元标签正确显示
- [ ] robots.txt 可访问

### 性能测试
- [ ] Lighthouse 分数 > 90
- [ ] 首屏加载 < 2s
- [ ] 总体加载 < 3s
- [ ] Core Web Vitals 良好

### 响应式测试
- [ ] 桌面端 (1920x1080)
- [ ] 平板端 (768x1024)
- [ ] 移动端 (375x667)

---

## 📊 监控设置

### Google Search Console
- [ ] 添加站点
- [ ] 验证所有权
- [ ] 提交 sitemap
- [ ] 监控索引状态

### Google Analytics 4
- [ ] 配置 GA4
- [ ] 设置转化跟踪
- [ ] 配置自定义事件
- [ ] 验证数据接收

### Cloudflare Analytics
- [ ] 启用 Analytics
- [ ] 配置自定义仪表板
- [ ] 设置告警规则
- [ ] 监控性能指标

---

## 🔄 回滚计划

### 备份策略
- 保存上一个稳定版本
- 记录部署日志
- 准备回滚脚本

### 紧急回滚步骤
```bash
# 1. 停止部署
# 2. 恢复上一个版本
# 3. 验证功能正常
# 4. 通知团队
```

---

## 📞 联系信息

**技术支持：** support@z-printpro.com
**紧急联系：** +852 1234 5678

---

**最后更新：** 2026年3月15日
**版本：** 1.0.0
**状态：** 部署准备中