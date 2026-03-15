[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# 智印港 Cloudflare Pages 部署脚本 (PowerShell 版本)
# 使用方式：.\scripts\deploy.ps1

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  智印港 Cloudflare Pages 部署脚本" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# 检查 Node.js
Write-Host "[1/6] 检查查环境..." -ForegroundColor Yellow
$nodeVersion = node --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Node.js 未安装" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Node.js: $nodeVersion" -ForegroundColor Green

# 检查 npm
$npmVersion = npm --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] npm 未安装" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] npm: $npmVersion" -ForegroundColor Green

# 检查 Wrangler
$wranglerVersion = wrangler --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARN] Wrangler 未安装，正在安装..." -ForegroundColor Yellow
    npm install -g wrangler
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Wrangler 安装失败" -ForegroundColor Red
        exit 1
    }
    $wranglerVersion = wrangler --version 2>&1
}
Write-Host "[OK] Wrangler: $wranglerVersion" -ForegroundColor Green
Write-Host ""

# 类型检查
Write-Host "[2/6] 类型检查..." -ForegroundColor Yellow
npx tsc --noEmit
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] TypeScript 检查失败" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] TypeScript 检查通过" -ForegroundColor Green
Write-Host ""

# 生产构建
Write-Host "[3/6] 生产构建..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] 构建失败" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] 构建成功" -ForegroundColor Green
Write-Host ""

# 检查构建输出
Write-Host "[4/6] 验证构建输出..." -ForegroundColor Yellow
if (-not (Test-Path ".next")) {
    Write-Host "[ERROR] .next 目录不存在" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] 构建输出目录存在" -ForegroundColor Green
Write-Host ""

# 登录 Cloudflare
Write-Host "[5/6] 检查 Cloudflare 登录状态..." -ForegroundColor Yellow
$whoami = wrangler whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARN] 未登录 Cloudflare，请登录..." -ForegroundColor Yellow
    wrangler login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Cloudflare 登录失败" -ForegroundColor Red
        exit 1
    }
    $whoami = wrangler whoami 2>&1
}
Write-Host "[OK] Cloudflare 登录成功" -ForegroundColor Green
Write-Host ""

# 部署到 Cloudflare Pages
Write-Host "[6/6] 部署到 Cloudflare Pages..." -ForegroundColor Yellow
Write-Host "项目名称: z-printpro" -ForegroundColor Cyan
Write-Host "部署目录: .next" -ForegroundColor Cyan
Write-Host ""

wrangler pages deploy .next --project-name=z-printpro
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] 部署失败" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] 部署成功!" -ForegroundColor Green
Write-Host ""

# 完成信息
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  部署完成!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "访问地址:" -ForegroundColor Cyan
Write-Host "  https://z-printpro.pages.dev"
Write-Host ""
Write-Host "查看部署状态:" -ForegroundColor Cyan
Write-Host "  https://dash.cloudflare.com/?to=/:accountaccount/pages/view/z-printpro"
Write-Host ""
Write-Host "SEO 验证:" -ForegroundColor Cyan
Write-Host "  https://search.google.com/test/rich-results"
Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan