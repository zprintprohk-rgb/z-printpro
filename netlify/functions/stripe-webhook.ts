/**
 * Netlify Function - Stripe Webhook Handler
 * 處理 Stripe 支付事件並更新 Supabase 訂單
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// 初始化 Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',  // 修复：改为 2023-10-16
});

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

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // 只處理 POST 請求
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // 獲取原始請求體和簽名
    const payload = event.body || '';
    const signature = event.headers['stripe-signature'] || '';

    // 驗證 Stripe 簽名
    let stripeEvent: Stripe.Event;
    try {
      stripeEvent = stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      );
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid signature' }),
      };
    }

    console.log(`Processing Stripe event: ${stripeEvent.type}`);

    // 處理不同類型的事件
    switch (stripeEvent.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(
          stripeEvent.data.object as Stripe.PaymentIntent
        );
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(
          stripeEvent.data.object as Stripe.PaymentIntent
        );
        break;

      case 'charge.refunded':
        await handleChargeRefunded(stripeEvent.data.object as Stripe.Charge);
        break;

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook processing failed' }),
    };
  }
};

/**
 * 處理支付成功事件
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment succeeded:', paymentIntent.id);

  try {
    // 從 metadata 中提取訂單 ID
    const { order_id } = paymentIntent.metadata || {};

    if (!order_id) {
      console.warn('No order_id in payment intent metadata');
      return;
    }

    // 更新訂單狀態為 PAID
    const { data, error } = await supabase
      .from('orders')
      .update({
        status: 'PAID',
        stripe_payment_intent_id: paymentIntent.id,
        stripe_customer_id: (paymentIntent.customer as string) || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', order_id)
      .select();

    if (error) {
      console.error('Error updating order:', error);
      throw error;
    }

    console.log(`Order ${order_id} marked as PAID`);

    // TODO: 發送訂單確認郵件
    // await sendOrderConfirmationEmail(order_id);
  } catch (error) {
    console.error('Error handling payment success:', error);
    throw error;
  }
}

/**
 * 處理支付失敗事件
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment failed:', paymentIntent.id);

  try {
    const { order_id } = paymentIntent.metadata || {};

    if (!order_id) {
      console.warn('No order_id in payment intent metadata');
      return;
    }

    const { error } = await supabase
      .from('orders')
      .update({
        status: 'CANCELLED',
        admin_notes: `Payment failed: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`,
        updated_at: new Date().toISOString(),
      })
      .eq('id', order_id);

    if (error) {
      console.error('Error updating order:', error);
      throw error;
    }

    console.log(`Order ${order_id} marked as CANCELLED due to payment failure`);
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

/**
 * 處理退款事件
 */
async function handleChargeRefunded(charge: Stripe.Charge) {
  console.log('Charge refunded:', charge.id);

  try {
    // 查找關聯的訂單
    const { data: orders, error: findError } = await supabase
      .from('orders')
      .select('id')
      .eq('stripe_payment_intent_id', charge.payment_intent as string)
      .single();

    if (findError || !orders) {
      console.warn('Order not found for refund');
      return;
    }

    const { error } = await supabase
      .from('orders')
      .update({
        status: 'REFUNDED',
        admin_notes: `Refunded on ${new Date().toISOString()}`,
        updated_at: new Date().toISOString(),
      })
      .eq('id', orders.id);

    if (error) {
      console.error('Error updating order:', error);
      throw error;
    }

    console.log(`Order ${orders.id} marked as REFUNDED`);
  } catch (error) {
    console.error('Error handling refund:', error);
  }
}
