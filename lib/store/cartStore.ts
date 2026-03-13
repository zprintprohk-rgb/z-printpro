// ============================================================================
// 购物车 Store（极致 SEO + GEO 优化版）
// 适配：Next.js 14 App Router + Vercel Edge Network + 多语言子目录
// ============================================================================
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartState, Currency, Locale, AddCartItemParams } from '@/types';

// 初始状态
const initialState: CartState = {
  items: [],
  isOpen: false,
  currency: 'HKD', // 默认港币（香港主场）
  subtotal: 0,
  shipping: 0,
  discount: 0,
  total: 0,
  itemCount: 0
};

// 计算购物车总额
const calculateCartTotals = (items: CartItem[]): Omit<CartState, 'items' | 'isOpen' | 'currency'> => {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = subtotal > 1000 ? 0 : 50; // 香港主场满1000免运费
  const total = subtotal + shipping - 0;
  
  return {
    subtotal,
    shipping,
    discount: 0,
    total,
    itemCount: items.length
  };
};

// GEO 货币转换（适配多语言子目录：修复 CNY 缺失）
const convertCurrency = (price: number, fromCurrency: Currency, toCurrency: Currency): number => {
  // ✅ 修复：补充 CNY 汇率，匹配 Currency 类型
  const rates: Record<Currency, number> = {
    HKD: 1,
    USD: 0.13,
    CNY: 0.92, // 新增：港币兑人民币汇率
    JPY: 18.5
  };
  // 运算优先级修复
  return Math.round((price * rates[toCurrency]) / rates[fromCurrency]);
};

// 创建购物车 Store（修复 persist 类型错误）
export const useCartStore = create(
  persist<CartState & {
    // 严格类型定义
    addItem: (item: AddCartItemParams, quantity: number) => void;
    removeItem: (uniqueId: string) => void;
    updateQuantity: (uniqueId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    setCurrency: (currency: Currency) => void;
    setLocale: (locale: Locale) => void;
  }>(
    (set, get) => ({
      ...initialState,
      
      // 添加商品（严格匹配 AddCartItemParams 类型）
      addItem: (item, quantity) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(i => i.productId === item.productId);
        
        let newItems;
        if (existingItem) {
          // 更新已有商品数量
          newItems = currentItems.map(i => 
            i.productId === item.productId 
              ? { 
                  ...i, 
                  quantity: i.quantity + quantity, 
                  totalPrice: i.unitPrice * (i.quantity + quantity) 
                } 
              : i
          );
        } else {
          // 添加新商品（自动生成内部字段）
          const newItem: CartItem = {
            ...item,
            uniqueId: `${item.productId}-${Date.now()}`,
            quantity,
            totalPrice: item.unitPrice * quantity,
            addedAt: new Date().toISOString()
          };
          newItems = [...currentItems, newItem];
        }
        
        // 更新总额
        const totals = calculateCartTotals(newItems);
        set({ 
          items: newItems,
          ...totals
        });
      },
      
      // 移除商品
      removeItem: (uniqueId) => {
        const newItems = get().items.filter(item => item.uniqueId !== uniqueId);
        const totals = calculateCartTotals(newItems);
        set({ 
          items: newItems,
          ...totals
        });
      },
      
      // 更新数量
      updateQuantity: (uniqueId, quantity) => {
        if (quantity < 1) return;
        
        const newItems = get().items.map(item => 
          item.uniqueId === uniqueId 
            ? { 
                ...item, 
                quantity, 
                totalPrice: item.unitPrice * quantity 
              } 
            : item
        );
        
        const totals = calculateCartTotals(newItems);
        set({ 
          items: newItems,
          ...totals
        });
      },
      
      // 清空购物车
      clearCart: () => {
        set(initialState);
      },
      
      // 切换购物车显示
      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },
      
      // 设置货币（GEO 适配）
      setCurrency: (currency) => {
        const currentItems = get().items;
        const baseCurrency = get().currency;
        
        // 转换所有商品价格
        const convertedItems = currentItems.map(item => ({
          ...item,
          price: convertCurrency(item.price, baseCurrency, currency),
          unitPrice: convertCurrency(item.unitPrice, baseCurrency, currency),
          totalPrice: convertCurrency(item.totalPrice, baseCurrency, currency)
        }));
        
        const totals = calculateCartTotals(convertedItems);
        set({
          currency,
          items: convertedItems,
          ...totals
        });
      },
      
      // 设置语言（多语言子目录适配）
      setLocale: (locale) => {
        const currencyMap: Record<Locale, Currency> = {
          'zh-hk': 'HKD',
          'en': 'USD',
          'ja': 'JPY'
        };
        get().setCurrency(currencyMap[locale]);
      }
    }),
    {
      name: 'z-printpro-cart',
      // 修复：类型断言解决 persist 类型错误
      partialize: (state) => ({ 
        items: state.items,
        currency: state.currency 
      }) as any
    }
  )
);