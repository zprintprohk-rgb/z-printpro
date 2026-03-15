#!/bin/bash

# 智印港 Cloudflare Pages 部署脚本
# 使用方式：./scripts/deploy.sh

set -e

echo "===================================="
echo "  智印港 Cloudflareflare Pages 部署脚本"
echo "===================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查 Node.js
echo "📋 检查环境..."
if ! command -v node &> /dev/null; then
    echo -e " ${RED}❌ Node.js 未安装${NC}"
    exit 1
fi
echo -e " ${GREEN}✅ Node.js: $(node --version)${NC}"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo -e " ${RED}❌ npm 未安装${NC}"
    exit 1
fi
echo -e " ${GREEN}✅ npm: $(npm --version)${NC}"

# 检查 Wrangler
if ! command -v wrangler &> /dev/null; then
    echo -e " ${YELLOW}⚠️  Wrangler 未安装，正在安装...${NC}"
    npm install -g wrangler
fi
echo -e " ${GREEN}✅ Wrangler: $(wrangler --version)${NC}"
echo ""

# 安装依赖
echo "📦 安装依赖..."
npm ci --production
echo -e " ${GREEN}✅ 依赖安装完成${NC}"
echo ""

# 类型检查
echo "🔍 类型检查..."
if npx tsc --noEmit; then
    echo -e " ${GREEN}✅ TypeScript 检查通过${NC}"
else
    echo -e " ${RED}❌ TypeScript 检查失败${NC}"
    exit 1
fi
echo ""

# 生产构建
echo "🔨 生产构建..."
if npm run build; then
    echo -e " ${GREEN}✅ 构建成功${NC}"
else
    echo -e " ${RED}❌ 构建失败${NC}"
    exit 1
fi
echo ""

# 检查构建输出
if [ ! -d ".next" ]; then
    echo -e " ${RED}❌ .next 目录不存在${NC}"
    exit 1
fi
echo -e " ${GREEN}✅ 构建输出目录存在${NC}"
echo ""

# 登录 Cloudflare
echo "🔐 检查 Cloudflare 登录状态..."
if ! wrangler whoami &> /dev/null; then
    echo -e " ${YELLOW}⚠️  未登录 Cloudflare，请登录...${NC}"
    wrangler login
fi
echo -e " ${GREEN}✅ Cloudflare 登录成功${NC}"
echo ""

# 部署到 Cloudflare Pages
echo "📤 部署到 Cloudflare Pages..."
if wrangler pages deploy .next --project-name=z-printpro; then
    echo -e " ${GREEN}✅ 部署成功！${NC}"
else
    echo -e " ${RED}❌ 部署失败${NC}"
    exit 1
fi
echo ""

# 完成信息
echo "===================================="
echo -e " ${GREEN}  🎉 部署完成！${NC}"
echo "===================================="
echo ""
echo "🌐 访问地址:"
echo "   https://z-printpro.pages.dev"
echo ""
echo "📊 查看部署状态:"
echo "   https://dash.cloudflare.com/?to=/:account/pages/view/z-printpro"
echo ""
echo "🔍 SEO 验证:"
echo "   https://search.google.com/test/rich-results"
echo ""
echo "===================================="