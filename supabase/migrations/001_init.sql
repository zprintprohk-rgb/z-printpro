-- ============================================================================
-- 智印港 (Z-PrintPro) - Supabase 數據庫初始化腳本
-- 從 Prisma Schema 遷移到 Supabase PostgreSQL
-- ============================================================================

-- 啟用 UUID 擴展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 枚舉類型
-- ============================================================================

-- 訂單狀態枚舉
CREATE TYPE order_status AS ENUM (
  'PENDING',      -- 待付款
  'PAID',         -- 已付款
  'PROCESSING',   -- 處理中
  'SHIPPED',      -- 已發貨
  'DELIVERED',    -- 已送達
  'CANCELLED',    -- 已取消
  'REFUNDED'      -- 已退款
);

-- ============================================================================
-- 訂單表 (Orders)
-- ============================================================================

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- 用戶信息 (支持遊客購買)
  user_id UUID,                                    -- 註冊用戶ID (可選)
  email TEXT NOT NULL,                             -- 客戶郵箱 (必填)
  customer_name TEXT NOT NULL,                     -- 客戶姓名
  customer_phone TEXT NOT NULL,                    -- 客戶電話
  
  -- Stripe 支付信息
  stripe_payment_intent_id TEXT UNIQUE,            -- Stripe PaymentIntent ID
  stripe_customer_id TEXT,                         -- Stripe Customer ID
  
  -- 訂單狀態與金額
  status order_status DEFAULT 'PENDING',           -- 訂單狀態
  total_amount DECIMAL(10, 2) NOT NULL,            -- 訂單總額
  subtotal DECIMAL(10, 2) NOT NULL,                -- 小計
  shipping DECIMAL(10, 2) NOT NULL,                -- 運費
  discount DECIMAL(10, 2) DEFAULT 0,               -- 折扣
  currency TEXT DEFAULT 'HKD',                     -- 貨幣
  
  -- 配送信息 (JSON 格式)
  shipping_address JSONB,                          -- 配送地址
  
  -- 物流追踪
  tracking_number TEXT,                            -- 物流單號
  carrier TEXT,                                    -- 物流承運商
  shipped_at TIMESTAMPTZ,                          -- 發貨時間
  delivered_at TIMESTAMPTZ,                        -- 送達時間
  
  -- 訂單備註
  notes TEXT,                                      -- 客戶備註
  admin_notes TEXT,                                -- 管理員備註
  
  -- 時間戳
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 訂單表索引
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_stripe_payment_intent_id ON orders(stripe_payment_intent_id);

-- ============================================================================
-- 訂單項目表 (Order Items)
-- ============================================================================

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- 關聯訂單
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  
  -- 商品信息
  product_id TEXT,                                 -- 產品ID
  product_name TEXT NOT NULL,                      -- 商品名稱
  product_name_en TEXT,                            -- 商品英文名稱
  
  -- 規格信息
  size TEXT,                                       -- 尺寸規格
  specs JSONB,                                     -- 其他規格
  
  -- 價格與數量
  quantity INTEGER NOT NULL,                       -- 數量
  unit_price DECIMAL(10, 2) NOT NULL,              -- 單價
  total_price DECIMAL(10, 2) NOT NULL,             -- 總價
  
  -- 圖片
  image_uri TEXT,                                  -- 商品圖片URL
  
  -- AI 設計信息
  ai_design_data JSONB,                            -- AI 設計相關數據
  
  -- 上傳文件
  uploaded_files TEXT[],                           -- 上傳的文件URL列表
  
  -- 時間戳
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 訂單項目表索引
CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- ============================================================================
-- 管理員表 (Admins)
-- ============================================================================

CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,                      -- 郵箱
  password_hash TEXT NOT NULL,                     -- 哈希密碼
  name TEXT NOT NULL,                              -- 姓名
  role TEXT DEFAULT 'admin',                       -- 角色 (admin, super_admin)
  is_active BOOLEAN DEFAULT true,                  -- 是否啟用
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- Row Level Security (RLS) 策略
-- ============================================================================

-- 啟用 RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Orders RLS 策略
-- ============================================================================

-- 任何人都可以創建訂單 (用於支付流程)
CREATE POLICY "Allow insert for everyone" ON orders
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- 用戶可以查看自己的訂單 (通過郵箱匹配)
CREATE POLICY "Allow select by email" ON orders
  FOR SELECT TO anon, authenticated
  USING (true); -- 前端通過郵箱參數過濾

-- 只有服務端可以更新訂單 (通過 service role)
CREATE POLICY "Allow update for service role" ON orders
  FOR UPDATE TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- Order Items RLS 策略
-- ============================================================================

-- 任何人都可以創建訂單項目
CREATE POLICY "Allow insert for everyone" ON order_items
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- 任何人都可以查看訂單項目
CREATE POLICY "Allow select for everyone" ON order_items
  FOR SELECT TO anon, authenticated
  USING (true);

-- 只有服務端可以更新訂單項目
CREATE POLICY "Allow update for service role" ON order_items
  FOR UPDATE TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- Admins RLS 策略
-- ============================================================================

-- 只有服務端可以訪問管理員表
CREATE POLICY "Allow all for service role" ON admins
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- 觸發器：自動更新 updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admins_updated_at
  BEFORE UPDATE ON admins
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 初始數據：創建默認管理員
-- 密碼: admin123 (使用 bcrypt 哈希)
-- ============================================================================

INSERT INTO admins (email, password_hash, name, role)
VALUES (
  'admin@z-printpro.com',
  '$2a$10$YourBcryptHashHere', -- 請替換為實際的 bcrypt 哈希
  'Administrator',
  'super_admin'
)
ON CONFLICT (email) DO NOTHING;

-- ============================================================================
-- 完成
-- ============================================================================

COMMENT ON TABLE orders IS '訂單主表';
COMMENT ON TABLE order_items IS '訂單商品項目';
COMMENT ON TABLE admins IS '管理員賬戶';
