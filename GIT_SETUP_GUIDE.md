# 🔗 Git 远程仓库连接指南

**项目:** Z-PrintPro  
**时间:** 2026-03-13  
**状态:** 需要配置远程仓库

---

## 📊 当前状态

| 检查项 | 状态 | 详情 |
|--------|------|------|
| Git 仓库初始化 | ✅ | 已初始化，在 main 分支 |
| 代码提交 | ✅ | 最新提交：`d0512b0` |
| 远程仓库配置 | ❌ | 未配置 (`git remote -v` 为空) |
| Vercel 连接 | ❌ | 未连接 Git 仓库 |

---

## 🚀 步骤 1：创建 GitHub 仓库（如尚未创建）

### 选项 A：在 GitHub 网站创建

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name:** `z-printpro`
   - **Description:** Z-PrintPro - 智印港专业印刷平台
   - **Visibility:** Private（推荐）或 Public
   - **不要** 勾选 "Add a README file"
   - **不要** 勾选 "Add .gitignore"
   - **不要** 勾选 "Choose a license"
3. 点击 "Create repository"

### 选项 B：使用 GitHub CLI 创建

```bash
# 安装 GitHub CLI（如未安装）
# Windows: winget install GitHub.cli

# 登录 GitHub
gh auth login

# 创建仓库
gh repo create z-printpro --private --source=. --remote=origin --push
```

---

## 🔗 步骤 2：配置 Git 远程仓库

### 2.1 添加远程仓库

```bash
# 添加 GitHub 远程仓库（替换为你的用户名）
git remote add origin https://github.com/YOUR_USERNAME/z-printpro.git

# 验证远程仓库配置
git remote -v
```

**预期输出:**
```
origin  https://github.com/YOUR_USERNAME/z-printpro.git (fetch)
origin  https://github.com/YOUR_USERNAME/z-printpro.git (push)
```

### 2.2 推送到远程仓库

```bash
# 设置上游分支并推送
git branch -M main
git push -u origin main
```

---

## ⚙️ 步骤 3：连接 Vercel 到 Git 仓库

### 3.1 访问 Vercel Dashboard

1. 访问：https://vercel.com/z-printpros-projects
2. 找到 `z-printpro` 项目

### 3.2 连接 Git 仓库

1. 点击项目卡片
2. 进入 **Settings** → **Git**
3. 点击 **Connect Git Repository**
4. 选择你的仓库提供商（GitHub/GitLab/Bitbucket）
5. 选择 `z-printpro` 仓库
6. 点击 **Connect**

### 3.3 配置部署设置

连接后，配置以下设置：

| 设置 | 值 | 说明 |
|------|-----|------|
| **Root Directory** | `./` | 项目根目录 |
| **Build Command** | `npm run build` | 构建命令 |
| **Output Directory** | `.next` | 输出目录（Next.js 默认） |
| **Install Command** | `npm install` | 安装命令 |

### 3.4 配置环境变量

在 Vercel Dashboard → Settings → Environment Variables 中配置：

#### 生产环境（Production）

| 变量名 | 值 |
|--------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | 你的 Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 你的 Supabase 匿名密钥 |
| `NEXT_PUBLIC_SITE_URL` | `https://z-printpro.com` |
| `NEXT_PUBLIC_API_URL` | 你的 API 端点 |
| `NEXT_PUBLIC_COMPANY_NAME` | `智印港 Z-PrintPro` |
| `NEXT_PUBLIC_COMPANY_PHONE` | `+852 2345 6789` |
| `NEXT_PUBLIC_COMPANY_EMAIL` | `info@z-printpro.com` |
| `AI_API_URL` | 你的 AI 服务端点 |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe 公钥 |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager ID |
| `NODE_ENV` | `production` |

#### 敏感变量（仅服务器端）

| 变量名 | 说明 |
|--------|------|
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 服务密钥 |
| `STRIPE_SECRET_KEY` | Stripe 密钥 |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook 密钥 |
| `ADMIN_PASSWORD` | 管理员密码 |
| `ADMIN_TOKEN` | 管理员 Token |
| `AI_API_KEY` | AI 服务密钥 |

---

## 🔄 步骤 4：触发自动部署

### 4.1 推送代码触发部署

```bash
# 提交更改并推送
git add .
git commit -m "feat: 新功能描述"
git push origin main
```

### 4.2 查看部署状态

推送后，Vercel 将自动：
1. 检测到新的提交
2. 开始构建
3. 部署到生产环境

访问 Vercel Dashboard 查看部署进度。

---

## 📝 步骤 5：验证部署

### 5.1 检查部署日志

在 Vercel Dashboard 中：
1. 点击 **Deployments**
2. 点击最新的部署
3. 查看 **Build Logs**

### 5.2 验证生产 URL

部署成功后，访问：
- **生产 URL:** `https://z-printpro-gx5kt72h7-z-printpros-projects.vercel.app`
- **自定义域名:** `https://z-printpro.com`（如已配置）

### 5.3 测试多语言路由

- `/zh-hk` - 繁体中文
- `/en` - 英语
- `/ja` - 日语

---

## 🛠️ 常见问题排查

### 问题 1：无法连接 Git 仓库

**错误:** "Repository not found"

**解决方案:**
1. 确认仓库名称正确
2. 确认你有仓库访问权限
3. 检查 GitHub 授权设置

### 问题 2：部署失败

**错误:** "Build failed"

**解决方案:**
1. 查看构建日志
2. 检查 `package.json` 中的脚本
3. 确认依赖项正确安装

### 问题 3：环境变量未生效

**错误:** 页面显示配置错误

**解决方案:**
1. 在 Vercel Dashboard 重新配置环境变量
2. 确保变量名正确（区分大小写）
3. 重新部署项目

### 问题 4：Git 推送被拒绝

**错误:** "rejected" 或 "non-fast-forward"

**解决方案:**
```bash
# 拉取最新代码
git pull origin main

# 解决冲突后推送
git push origin main
```

---

## ✅ 检查清单

- [ ] 创建 GitHub 仓库
- [ ] 配置 Git 远程仓库 (`git remote add origin`)
- [ ] 推送代码到远程仓库 (`git push -u origin main`)
- [ ] 在 Vercel 连接 Git 仓库
- [ ] 配置环境变量
- [ ] 触发自动部署
- [ ] 验证生产 URL
- [ ] 测试多语言路由

---

## 📞 快速命令参考

```bash
# 查看远程仓库配置
git remote -v

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/z-printpro.git

# 推送代码
git push origin main

# 查看提交历史
git log --oneline

# 查看当前分支
git branch

# 拉取最新代码
git pull origin main
```

---

**文档生成时间:** 2026-03-13  
**文档状态:** ✅ 完成