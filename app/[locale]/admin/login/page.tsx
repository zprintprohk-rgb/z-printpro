/**
 * 管理員登錄頁面 (Client Side)
 * Admin Login Page
 * 
 * 使用 localStorage 存儲 Token，兼容靜態導出
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, AlertCircle } from 'lucide-react';

// 管理員密碼（實際應從環境變量獲取，這裡使用硬編碼作為示例）
const ADMIN_PASSWORD = 'admin123';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin/orders';

  // 檢查是否已登錄
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      router.push(redirect);
    }
  }, [redirect, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 簡易認證（生產環境應調用 Netlify Function 進行驗證）
      if (password === ADMIN_PASSWORD) {
        // 存儲 Token 到 localStorage
        localStorage.setItem('admin_token', ADMIN_PASSWORD);
        router.push(redirect);
      } else {
        setError('密碼錯誤，請重試');
      }
    } catch (err) {
      setError('登錄失敗，請重試');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">管理員登錄</h1>
          <p className="text-gray-600 mt-2">請輸入管理員密碼</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密碼</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="請輸入管理員密碼"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '登錄中...' : '登錄'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-700">
            返回首頁
          </a>
        </div>

        {/* 開發環境提示 */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>開發環境提示:</strong><br />
            默認密碼: admin123
          </p>
        </div>
      </div>
    </div>
  );
}
