// ============================================================================
// Z-PrintPro SEO & GEO 类型定义
// 支持 9 大高利润品类 + 3 语言 (zh-hk/en/ja) + SGE 结构化数据
// ============================================================================

/**
 * 支持的语言代码
 * - zh-hk: 香港主场（繁体中文）
 * - en: 全球英语（美国/英国/澳洲共用）
 * - ja: 日本（日文）
 */
export type LangCode = 'zh-hk' | 'en' | 'ja';

/**
 * 9 大高利润品类代码
 * ⚠️ 绝对排除：business-card / name-card / postcard
 */
export type CategoryCode = 
  | 'paper-bag'      // 纸袋
  | 'packaging-box'  // 包装盒
  | 'sticker'        // 贴纸
  | 'flyer'          // 单张/传单
  | 'brochure'       // 小册子
  | 'poster'         // 海报
  | 'envelope'       // 信封
  | 'large-format'   // 喷绘/大幅面
  | 'ai-digital-art'; // AI 数字艺术印刷

/**
 * 本地商家信息（仅 zh-hk 使用）
 */
export interface LocalBusiness {
  name: string;
  address: string;
  geo: {
    lat: number;
    lng: number;
  };
  telephone: string;
}

/**
 * FAQ 结构化数据（仅 zh-hk 使用）
 */
export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * 对比表格数据（仅 en 使用）
 */
export interface ComparisonItem {
  product: string;
  material: string;
  price: string;
  ourAdvantage: string;
}

/**
 * 工艺流程步骤（仅 ja 使用）
 */
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

/**
 * SEO 页面类型定义
 * 极致 SEO + GEO (AI 搜索优化) 核心数据结构
 */
export interface SeoPageType {
  /** 页面标题（含关键词） */
  title: string;
  /** 页面描述（150-160 字符） */
  description: string;
  /** 规范 URL（避免重复内容） */
  canonicalUrl: string;
  /** 页面语言 */
  lang: LangCode;
  /** 产品品类 */
  category: CategoryCode;
  /** 是否高利润品类（必须为 true） */
  isHighProfit: boolean;
  /** 本地化关键词数组 */
  localizedKeywords: string[];
  /** AI 搜索摘要片段（SGE 优化） */
  aiSummarySnippet: string;
  /** 作者权威性声明（E-E-A-T） */
  authorAuthority: string;
  /** FAQ 列表（仅 zh-hk 使用，用于 SGE FAQ 结构化数据） */
  faqSchema?: FaqItem[];
  /** 对比表格（仅 en 使用，用于 SGE 对比数据） */
  comparisonTable?: ComparisonItem[];
  /** 工艺流程（仅 ja 使用，5-step process） */
  processSteps?: ProcessStep[];
  /** 材料选项（纸张/喷绘材料） */
  materialOptions?: string[];
  /** 加工选项（燙金/UV/凹凸压印） */
  finishOptions?: string[];
  /** 本地商家信息（仅 zh-hk 使用，用于 LocalBusiness 结构化数据） */
  localBusiness?: LocalBusiness;
}

/**
 * 基础 SEO Props（兼容旧组件）
 */
export interface SeoProps {
  title: string;
  description: string;
  keywords: string[];
  hreflang?: {
    [key: string]: string;
  };
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    type?: string;
    locale?: string;
    siteName?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    images?: string[];
  };
}