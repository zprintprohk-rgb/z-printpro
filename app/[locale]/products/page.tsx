// ============================================================================
// 产品列表页（多语言子目录 + SEO/GEO 优化）
// 适配：/zh-hk/products /en/products /ja/products
// ============================================================================
'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cartStore';
import { filterProducts, getProductsWithPagination, getAllCategories, getPriceRange } from '@/lib/products';
import { Product, Locale, ProductsFilter, AddCartItemParams } from '@/types';
import { Loader2, ShoppingCart, ChevronDown, Search } from 'lucide-react';

export default function ProductsPage() {
  const params = useParams<{ locale: Locale }>();
  const searchParams = useSearchParams();
  const locale = params.locale || 'zh-hk';
  
  // 状态管理
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  // 过滤参数
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState<ProductsFilter['sortBy']>(
    (searchParams.get('sort') as ProductsFilter['sortBy']) || 'newest'
  );
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 0
  });
  
  // 购物车
  const addItem = useCartStore(state => state.addItem);
  const setLocale = useCartStore(state => state.setLocale);
  
  // 获取分类和价格范围
  const categories = getAllCategories();
  
  // 初始化
  useEffect(() => {
    setLoading(true);
    setLocale(locale);
    
    // 获取价格范围
    const range = getPriceRange(locale);
    setPriceRange({
      min: range.min,
      max: range.max
    });
    
    // 构建过滤参数
    const filter: ProductsFilter = {
      category: category || undefined,
      search: search || undefined,
      sortBy,
      locale
    };
    
    // 获取分页产品
    const { products: filteredProducts, totalPages } = getProductsWithPagination(1, 12, filter);
    setProducts(filteredProducts);
    setTotalPages(totalPages);
    setLoading(false);
    
  }, [locale, category, search, sortBy]);
  
  // 分页处理
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setLoading(true);
    
    const filter: ProductsFilter = {
      category: category || undefined,
      search: search || undefined,
      sortBy,
      locale
    };
    
    const { products: filteredProducts } = getProductsWithPagination(page, 12, filter);
    setProducts(filteredProducts);
    setLoading(false);
  };
  
  // 添加到购物车
  const handleAddToCart = (product: Product) => {
    // 严格匹配 AddCartItemParams 类型
    const cartItem: AddCartItemParams = {
      productId: product.id,
      productName: locale === 'zh-hk' ? product.nameZh || product.name :
                   locale === 'ja' ? product.nameJa || product.name :
                   product.name || '',
      productNameZh: product.nameZh,
      productNameJa: product.nameJa,
      price: parseFloat(product.price as string) || 0,
      unitPrice: parseFloat(product.price as string) || 0,
      totalPrice: parseFloat(product.price as string) || 0,
      image: product.image
    };
    
    addItem(cartItem, 1);
  };
  
  // 本地化文本
  const t = {
    title: locale === 'zh-hk' ? '產品列表' : locale === 'ja' ? '製品リスト' : 'Products',
    search: locale === 'zh-hk' ? '搜索產品...' : locale === 'ja' ? '製品を検索...' : 'Search products...',
    category: locale === 'zh-hk' ? '分類' : locale === 'ja' ? 'カテゴリ' : 'Category',
    allCategories: locale === 'zh-hk' ? '所有分類' : locale === 'ja' ? 'すべてのカテゴリ' : 'All Categories',
    sortBy: locale === 'zh-hk' ? '排序方式' : locale === 'ja' ? 'ソート方式' : 'Sort by',
    price: locale === 'zh-hk' ? '價格' : locale === 'ja' ? '価格' : 'Price',
    newest: locale === 'zh-hk' ? '最新上架' : locale === 'ja' ? '最新上架' : 'Newest',
    popular: locale === 'zh-hk' ? '人氣推薦' : locale === 'ja' ? '人気推奨' : 'Popular',
    priceAsc: locale === 'zh-hk' ? '價格從低到高' : locale === 'ja' ? '価格が低い順' : 'Price: Low to High',
    priceDesc: locale === 'zh-hk' ? '價格從高到低' : locale === 'ja' ? '価格が高い順' : 'Price: High to Low',
    addToCart: locale === 'zh-hk' ? '加入購物車' : locale === 'ja' ? 'ショッピングカートに追加' : 'Add to Cart',
    noProducts: locale === 'zh-hk' ? '未找到相關產品' : locale === 'ja' ? '関連製品が見つかりません' : 'No products found',
    page: locale === 'zh-hk' ? '頁' : locale === 'ja' ? 'ページ' : 'Page'
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t.title}</h1>
      
      {/* 过滤栏 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* 搜索框 */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={t.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        {/* 分类筛选 */}
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
          >
            <option value="">{t.allCategories}</option>
            {categories.map(cat => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        {/* 排序筛选 */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as ProductsFilter['sortBy'])}
            className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
          >
            <option value="newest">{t.newest}</option>
            <option value="popular">{t.popular}</option>
            <option value="price-asc">{t.priceAsc}</option>
            <option value="price-desc">{t.priceDesc}</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>
      
      {/* 产品列表 */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">{t.noProducts}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/${locale}/products/${product.slug}`}>
                  <div className="aspect-square bg-gray-100">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <span className="text-4xl">🖨️</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">
                      {locale === 'zh-hk' ? product.nameZh || product.name :
                       locale === 'ja' ? product.nameJa || product.name :
                       product.name}
                    </h3>
                    <p className="text-primary font-bold mb-4">
                      {locale === 'zh-hk' ? 'HK$' : locale === 'ja' ? '¥' : '$'}{extractPrice(product.price)}
                    </p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      className="w-full bg-primary text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                    >
                      <ShoppingCart size={18} />
                      {t.addToCart}
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          {/* 分页 */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                ← {t.page}
              </button>
              <span className="px-4 py-2">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                {t.page} →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// 辅助函数
function extractPrice(price: string | number): number {
  if (typeof price === 'number') return price;
  const numStr = price.replace(/[^\d.]/g, '');
  return parseFloat(numStr) || 0;
}