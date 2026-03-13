# 智印港支付集成配置指南

## 概述

智印港 (Z-PrintPro) 集成了 **Stripe** 作为核心支付网关，支持多种支付方式：

- 💳 信用卡/借记卡 (Visa, MasterCard, Amex)
- 🔵 AlipayHK (支付寶香港)
- 🟢 WeChat Pay HK (微信支付香港)
- 🏦 FPS (轉數快) - 通过 Stripe

---

## 快速开始

### 1. 注册 Stripe 账号

1. 访问 [Stripe Dashboard](https://dashboard.stripe.com/register)
2. 完成账号注册和验证
3. 切换到测试模式 (Test Mode)

### 2. 获取 API 密钥

在 Stripe Dashboard 中：
- **Publishable Key**: `Developers` → `API keys` → `Publishable key`
- **Secret Key**: `Developers` → `API keys` → `Secret key` → `Reveal`

### 3. 配置环境变量

复制 `.env.example` 为 `.env.local`：

```bash
cp .env.example .env.local
```

填入你的 Stripe 密钥：

```env
# Stripe 配置
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxx
```

### 4. 安装依赖

```bash
npm install
```

### 5. 启动开发服务器

```bash
npm run dev
```

---

## 测试支付

### 测试卡号

| 卡号 | 品牌 | 结果 |
|------|------|------|
| `4242 4242 4242 4242` | Visa | 支付成功 |
| `4000 0000 0000 0002` | Visa | 支付失败 |
| `4000 0000 0000 3220` | Visa | 需要3D验证 |

使用任意未来日期作为有效期，任意3位数字作为CVC。

### 测试其他支付方式

在 Stripe Dashboard 中启用测试模式的支付方式。

---

## Webhook 配置 (可选)

用于接收支付状态更新：

### 本地开发

```bash
# 安装 Stripe CLI
brew install stripe/stripe-cli/stripe

# 登录
stripe login

# 转发 Webhook 到本地
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

复制输出的 `whsec_` 密钥到 `.env.local` 的 `STRIPE_WEBHOOK_SECRET`。

### 生产环境

1. 在 Stripe Dashboard 创建 Webhook Endpoint
2. URL: `https://your-domain.com/api/webhooks/stripe`
3. 选择事件：`payment_intent.succeeded`, `payment_intent.payment_failed`

---

## 生产部署

### 1. 创建 Stripe  live 账号

完成 Stripe 的商家验证流程。

### 2. 获取 Live API Keys

- 关闭 Test Mode
- 复制 Live Publishable Key 和 Secret Key

### 3. 更新环境变量

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_live_xxxxxxxxxxxxxxxx
```

### 4. 配置支付方式

在 Stripe Dashboard 中启用需要的支付方式：
- Settings → Payment methods
- 启用 Card, Alipay, WeChat Pay 等

---

## 文件结构

```
app/
├── api/
│   ├── create-payment-intent/
│   │   └── route.ts      # 创建 PaymentIntent
│   ├── verify-payment/
│   │   └── route.ts      # 验证支付状态
│   └── webhooks/
│       └── stripe/
│           └── route.ts  # Webhook 处理 (可选)
├── [locale]/
│   ├── checkout/
│   │   ├── page.tsx      # 结账页面 (Stripe Elements)
│   │   ├── success/
│   │   │   └── page.tsx  # 支付成功页
│   │   └── cancel/
│   │       └── page.tsx  # 支付取消页
lib/
├── stripe.ts             # Stripe 客户端配置
└── whatsappOrder.ts      # WhatsApp 兜底策略
components/
└── payment/
    └── StripePaymentForm.tsx  # 支付表单组件
```

---

## 安全注意事项

1. **永远不要**在客户端暴露 `STRIPE_SECRET_KEY`
2. **始终**在服务器端计算订单金额
3. **验证**所有来自 Stripe 的 Webhook 签名
4. **使用 HTTPS** 在生产环境

---

## WhatsApp 兜底策略

当 Stripe 支付系统故障时，系统会自动生成 WhatsApp 订单消息：

```typescript
import { generateWhatsAppOrderMessage } from '@/lib/whatsappOrder';

const message = generateWhatsAppOrderMessage({
  items: cartItems,
  customerInfo,
  orderId: 'ZPP-20240304-001',
  orderDate: new Date().toISOString(),
  locale: 'zh-HK'
});

// 生成 WhatsApp 链接
const whatsappLink = generateWhatsAppLink('+85212345678', message);
```

---

## 故障排除

### 支付页面不显示

检查浏览器控制台是否有 Stripe 加载错误。

### PaymentIntent 创建失败

- 确认 `STRIPE_SECRET_KEY` 正确
- 检查服务器日志

### Webhook 不工作

- 确认 `STRIPE_WEBHOOK_SECRET` 正确
- 检查 Webhook Endpoint URL 可访问

---

## 参考文档

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe React SDK](https://stripe.com/docs/stripe-js/react)
- [Stripe Testing](https://stripe.com/docs/testing)

---

**智印港技术团队**
