/**
 * Netlify Function - Update Order Shipping
 * 管理員更新訂單物流信息
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

// 初始化 Supabase Admin Client
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// 管理員 Token (簡單驗證，生產環境建議使用 JWT)
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'your-secure-admin-token';

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // 設置 CORS 頭
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // 處理預檢請求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // 只處理 POST 請求
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // 驗證管理員 Token
    const authHeader = event.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');

    if (token !== ADMIN_TOKEN) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Unauthorized' }),
      };
    }

    // 解析請求體
    const body = JSON.parse(event.body || '{}');
    const { orderId, trackingNumber, carrier } = body;

    // 驗證必填字段
    if (!orderId || !trackingNumber || !carrier) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields: orderId, trackingNumber, carrier',
        }),
      };
    }

    // 更新訂單物流信息
    const { data: order, error } = await supabase
      .from('orders')
      .update({
        tracking_number: trackingNumber,
        carrier: carrier.toUpperCase(),
        status: 'SHIPPED',
        shipped_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)
      .select(`
        id,
        tracking_number,
        carrier,
        status,
        shipped_at,
        email,
        customer_name
      `)
      .single();

    if (error) {
      console.error('Error updating shipping:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to update shipping info' }),
      };
    }

    if (!order) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Order not found' }),
      };
    }

    // TODO: 發送發貨通知郵件
    // await sendShippingNotificationEmail(order);

    console.log(`Shipping updated for order ${orderId}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          orderId: order.id,
          trackingNumber: order.tracking_number,
          carrier: order.carrier,
          status: order.status,
          shippedAt: order.shipped_at,
        },
      }),
    };
  } catch (error: any) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Internal server error',
      }),
    };
  }
};
