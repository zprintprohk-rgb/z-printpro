/**
 * Netlify Function - Create Order
 * 創建新訂單（在創建 PaymentIntent 之前）
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

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // 設置 CORS 頭
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
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
    const body = JSON.parse(event.body || '{}');
    const {
      email,
      customerName,
      customerPhone,
      items,
      shippingAddress,
      subtotal,
      shipping,
      discount = 0,
      total,
      currency = 'HKD',
      notes,
    } = body;

    // 驗證必填字段
    if (!email || !customerName || !items || items.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields: email, customerName, items',
        }),
      };
    }

    // 創建訂單
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        email,
        customer_name: customerName,
        customer_phone: customerPhone || shippingAddress?.phone || '',
        status: 'PENDING',
        total_amount: total,
        subtotal,
        shipping,
        discount,
        currency,
        shipping_address: shippingAddress,
        notes,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error('Error creating order:', orderError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to create order' }),
      };
    }

    // 創建訂單項目
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      size: item.size,
      specs: item.specs || {},
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.totalPrice || item.unitPrice * item.quantity,
      image_uri: item.image,
      ai_design_data: item.aiDesign || {},
      uploaded_files: item.uploadedFiles || [],
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // 回滾訂單
      await supabase.from('orders').delete().eq('id', order.id);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to create order items' }),
      };
    }

    console.log(`Order created: ${order.id}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          orderId: order.id,
          status: order.status,
          totalAmount: order.total_amount,
          createdAt: order.created_at,
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
