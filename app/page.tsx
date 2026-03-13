// ============================================================================
// Z-PrintPro - 首页（重定向到 /zh-hk）
// Next.js 14 App Router + Vercel Edge Network 混合渲染方案
// ============================================================================

import { redirect } from 'next/navigation';

export default function Home() {
  // 重定向到香港中文首页（主场优化）
  redirect('/zh-hk');
}
