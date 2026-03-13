# 🚀 Z-PrintPro 最终部署行动指南

**生成时间:** 2026-03-13 下午 8:19  
**项目状态:** 代码已准备就绪，需要完成 GitHub 和 Vercel 配置

---

## 📊 当前状态总结

| 任务 | 状态 | 说明 |
|------|------|------|
| ✅ next.config.js 配置 | 完成 | 已更新部署优化配置 |
| ✅ 代码提交 | 完成 | 提交 ID: `d0512b0` |
| ✅ 配置文档 | 完成 | 已生成完整文档 |
| ❌ GitHub 仓库 | 待办 | 仓库不存在 |
| ❌ Git 推送 | 待办 | 需先创建仓库 |
| ❌ Vercel 连接 | 待办 | 需先连接 Git |
| ❌ 环境变量 | 待办 | 需在 Vercel 配置 |

---

## 🔴 需要您立即完成的操作

### 步骤 1：创建 GitHub 仓库（必须）

**请按照以下步骤操作：**

1. **访问 GitHub 创建页面**
   - 打开：https://github.com/new

2. **填写仓库信息**
   ```
   Repository name: z-printpro
   Description: Z-PrintPro - 智印港专业印刷平台
   Visibility: Private（推荐）或 Public
   ```

3. **重要：不要勾选以下选项**
   - ❌ 不要勾选 "Add a README file"
   - ❌ 不要勾选 "Add .gitignore"
   - ❌ 不要勾选 "Choose a license"

4. **点击 "Create repository"**

5. **复制仓库 URL**（创建成功后页面上会显示）
   ```
   https://github.com/YOUR_USERNAME/z-printpro.git
   ```

---

### 步骤 2：配置 Git 远程仓库（复制命令执行）

创建仓库后，在终端执行以下命令：

```powershell
# 添加远程仓库（替换为你的用户名）
git remote add origin https://github.com/YOUR_USERNAME/z-printpro.git

# 推送到 GitHub
git push -u origin main
```

---

### 步骤 3：连接 Vercel 到 Git 仓库

1. **访问 Vercel Dashboard**
   - 打开：https://vercel.com/z-printpros-projects

2. **连接 Git 仓库**
   - 点击项目或 "Connect Git Repository"
   - 选择 GitHub
   - 选择 `z-printpro` 仓库
   - 点击 "Connect"

3. **配置部署设置**
   ```
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

---

### 步骤 4：配置 Vercel 环境变量

在 Vercel Dashboard → Settings → Environment Variables 中添加：

#### 公开变量（12 个）

| 变量名 | 值示例 |
|--------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJxxx...` |
| `NEXT_PUBLIC_SITE_URL` | `https://z-printpro.com` |
| `NEXT_PUBLIC_API_URL` | 你的 API 端点 |
| `NEXT_PUBLIC_COMPANY_NAME` | `智印港 Z-PrintPro` |
| `NEXT_PUBLIC_COMPANY_PHONE` | `+852 2345 6789` |
| `NEXT_PUBLIC_COMPANY_EMAIL` | `info@z-printpro.com` |
| `AI_API_URL` | 你的 AI 服务端点 |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_xxx...` |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXX` |
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` |
| `NODE_ENV` | `production` |

#### 敏感变量（6 个）

| 变量名 | 说明 |
|--------|------|
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 服务密钥 |
| `STRIPE_SECRET_KEY` | Stripe 密钥 |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook 密钥 |
| `ADMIN_PASSWORD` | 管理员密码 |
| `ADMIN_TOKEN` | 管理员 Token |
| `AI_API_KEY` | AI 服务密钥 |

---

### 步骤 5：触发自动部署

推送代码后，Vercel 将自动：
1. 检测到新提交
2. 开始构建
3. 部署到生产环境

**查看部署状态：**
- 访问：https://vercel.com/z-printpros-projects/z-printpro/deployments

---

## 📋 快速命令参考

```powershell
# 查看远程仓库配置
git remote -v

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/z-printpro.git

# 推送代码
git push -u origin main

# 查看提交历史
git log --oneline

# 查看当前状态
git status
```

---

## ✅ 部署检查清单

完成以下所有步骤后，部署才算完成：

- [ ] **步骤 1:** 在 GitHub 创建 `z-printpro` 仓库
- [ ] **步骤 2:** 执行 `git remote add origin` 和 `git push`
- [ ] **步骤 3:** 在 Vercel 连接 Git 仓库
- [ ] **步骤 4:** 配置 18 个环境变量
- [ ] **步骤 5:** 等待部署完成（约 1-2 分钟）
- [ ] **验证:** 访问生产 URL 测试

---

## 🎯 预期结果

部署成功后，您将拥有：

1. **生产 URL:** `https://z-printpro-gx5kt72h7-z-printpros-projects.vercel.app`
2. **多语言支持:** `/zh-hk`, `/en`, `/ja`
3. **自动部署:** 每次推送到 `main` 分支自动部署
4. **SEO 优化:** hreflang, canonical, JSON-LD 完整配置
5. **环境变量:** 18 个变量已配置

---

## 📞 需要帮助？

如有问题，请检查：

1. **GitHub 仓库是否存在** - 访问 https://github.com/YOUR_USERNAME/z-printpro
2. **Git 推送是否成功** - 执行 `git log` 查看提交
3. **Vercel 连接是否成功** - 访问 Vercel Dashboard 查看
4. **环境变量是否配置** - 在 Vercel Settings → Environment Variables 检查

---

**文档状态:** ✅ 完成  
**下一步:** 请立即执行步骤 1 - 创建 GitHub 仓库