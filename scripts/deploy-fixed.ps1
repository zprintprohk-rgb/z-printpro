# Z-PrintPro Cloudflare Pages Deployment Script
# Usage: .\scripts\deploy-fixed.ps1
# Encoding: UTF-8 with BOM

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Z-PrintPro Deployment Script" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking environment..." -ForegroundColor Cyan
$nodeVersion = node --version
Write-Host "[OK] Node.js: $nodeVersion" -ForegroundColor Green

# Check npm
$npmVersion = npm --version
Write-Host "[OK] npm: $npmVersion" -ForegroundColor Green

# Check Wrangler
Write-Host ""
Write-Host "Checking Wrangler..." -ForegroundColor Cyan
$wranglerVersion = wrangler --version 2>&1
Write-Host "[OK] Wrangler: $wranglerVersion" -ForegroundColor Green

# Clean webpack cache
Write-Host ""
Write-Host "Cleaning webpack cache..." -ForegroundColor Cyan
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "[OK] Cache cleaned" -ForegroundColor Green
} else {
    Write-Host "[OK] No cache to clean" -ForegroundColor Green
}

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install
Write-Host "[OK] Dependencies installed" -ForegroundColor Green

# Type check
Write-Host ""
Write-Host "Running TypeScript check..." -ForegroundColor Cyan
npx tsc --noEmit
Write-Host "[OK] TypeScript check passed" -ForegroundColor Green

# Production build
Write-Host ""
Write-Host "Building production..." -ForegroundColor Cyan
npm run build
Write-Host "[OK] Build successful" -ForegroundColor Green

# Check build output
Write-Host ""
Write-Host "Checking build output..." -ForegroundColor Cyan
if (Test-Path ".next") {
    Write-Host "[OK] .next directory exists" -ForegroundColor Green
} else {
    Write-Host "[ERROR] .next directory not found" -ForegroundColor Red
    exit 1
}

# Remove cache before deployment
Write-Host ""
Write-Host "Removing build cache..." -ForegroundColor Cyan
if (Test-Path ".next/cache") {
    Remove-Item -Recurse -Force .next/cache
    Write-Host "[OK] Cache removed" -ForegroundColor Green
} else {
    Write-Host "[OK] No cache to remove" -ForegroundColor Green
}

# Deploy to Cloudflare Pages
Write-Host ""
Write-Host "Deploying to Cloudflare Pages..." -ForegroundColor Cyan
Write-Host "Project: z-printpro" -ForegroundColor Cyan
Write-Host ""

wrangler pages deploy .next --project-name=z-printpro

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "====================================" -ForegroundColor Cyan
    Write-Host "  DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
    Write-Host "====================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Live URL: https://z-printpro.pages.dev" -ForegroundColor White
    Write-Host ""
    Write-Host "Dashboard: https://dash.cloudflare.com/?to=/:account/pages/view/z-printpro" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "[ERROR] Deployment failed" -ForegroundColor Red
    exit 1
}