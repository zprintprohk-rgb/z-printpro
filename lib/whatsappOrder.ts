export interface WhatsAppOrderData {
  items: any[];
  total: number;
  shipping: number;
  customerInfo: any;
  locale: 'zh-hk' | 'en';
}

export function generateWhatsAppOrderMessage(data: WhatsAppOrderData): string {
  const { items, total, shipping, customerInfo, locale } = data;
  const grandTotal = total + shipping;
  
  if (locale === 'zh-hk') {
    return 'New Order (HK)\nCustomer: ' + customerInfo.name + '\nPhone: ' + customerInfo.phone + '\nTotal: HK$' + grandTotal + '\nAddress: ' + customerInfo.address;
  } else {
    return 'New Order\nCustomer: ' + customerInfo.name + '\nPhone: ' + customerInfo.phone + '\nTotal: HK$' + grandTotal + '\nAddress: ' + customerInfo.address;
  }
}