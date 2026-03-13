'use client'

import React, { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { STANDARD_PACKAGES } from '@/lib/constants'
import { 
  Upload, Sparkles, Image as ImageIcon, ShoppingCart, 
  ChevronRight, ChevronLeft, Check, Loader2, AlertCircle,
  ZoomIn, Palette, Crop, Wand2
} from 'lucide-react'

type AIStep = 'upload' | 'enhance' | 'size' | 'preview'

interface AIState {
  step: AIStep
  originalImage: string | null
  enhancedImage: string | null
  selectedSize: string
  quantity: number
  isEnhancing: boolean
  enhanceProgress: number
  selectedEnhancements: string[]
}

function createAICustomCartItem(
  size: string,
  unitPrice: number,
  quantity: number,
  imageUrl: string,
  metadata?: any
) {
  return {
    uniqueId: `ai-${Date.now()}`,
    productId: `ai-custom-${Date.now()}`,
    productName: `AI 定制畫作 (${size})`,
    type: 'ai-custom',
    size,
    quantity,
    unitPrice,
    totalPrice: unitPrice * quantity,
    image: imageUrl,
    metadata,
  }
}

interface Props {
  locale: string;
}

export default function AIStudioClient({ locale }: Props) {
  const router = useRouter()
  const isHK = locale === 'zh-hk'
  
  const addToCart = useCallback((item: any) => {
    console.log('Add to cart:', item)
    alert(isHK ? '已添加到购物车（功能开发中）' : 'Added to cart (feature in development)')
  }, [isHK])
  
  const [state, setState] = useState<AIState>({
    step: 'upload',
    originalImage: null,
    enhancedImage: null,
    selectedSize: 'M',
    quantity: 1,
    isEnhancing: false,
    enhanceProgress: 0,
    selectedEnhancements: ['upscale', 'color-correction'],
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const steps: { id: AIStep; label: string; icon: React.ElementType }[] = [
    { id: 'upload', label: isHK ? '上傳照片' : 'Upload', icon: Upload },
    { id: 'enhance', label: isHK ? 'AI 優化' : 'Enhance', icon: Sparkles },
    { id: 'size', label: isHK ? '選擇尺寸' : 'Size', icon: Crop },
    { id: 'preview', label: isHK ? '預覽確認' : 'Preview', icon: ImageIcon },
  ]

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      alert(isHK ? '請上傳 JPG 或 PNG 格式的圖片' : 'Please upload JPG or PNG image')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert(isHK ? '圖片大小不能超過 10MB' : 'Image size must be less than 10MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setState(prev => ({
        ...prev,
        originalImage: e.target?.result as string,
        step: 'enhance',
      }))
    }
    reader.readAsDataURL(file)
  }, [isHK])

  const handleEnhance = useCallback(() => {
    setState(prev => ({ ...prev, isEnhancing: true, enhanceProgress: 0 }))

    const interval = setInterval(() => {
      setState(prev => {
        if (prev.enhanceProgress >= 100) {
          clearInterval(interval)
          return {
            ...prev,
            isEnhancing: false,
            enhanceProgress: 100,
            enhancedImage: prev.originalImage,
            step: 'size',
          }
        }
        return { ...prev, enhanceProgress: prev.enhanceProgress + 10 }
      })
    }, 200)
  }, [])

  const handleAddToCart = useCallback(() => {
    const selectedPkg = STANDARD_PACKAGES.find(p => p.size === state.selectedSize)
    if (!selectedPkg || !state.enhancedImage) return

    const cartItem = createAICustomCartItem(
      `${selectedPkg.dimensions.width}x${selectedPkg.dimensions.height}mm`,
      selectedPkg.priceHKD,
      state.quantity,
      state.enhancedImage,
      {
        aiImageUrl: state.enhancedImage,
        originalImageUrl: state.originalImage || undefined,
        enhancements: state.selectedEnhancements,
      }
    )

    addToCart(cartItem)
  }, [state, addToCart])

  const canProceed = () => {
    switch (state.step) {
      case 'upload': return !!state.originalImage
      case 'enhance': return !!state.enhancedImage && !state.isEnhancing
      case 'size': return true
      case 'preview': return true
      default: return false
    }
  }

  const handleNext = () => {
    const currentIndex = steps.findIndex(s => s.id === state.step)
    if (currentIndex < steps.length - 1) {
      setState(prev => ({ ...prev, step: steps[currentIndex + 1].id }))
    }
  }

  const handleBack = () => {
    const currentIndex = steps.findIndex(s => s.id === state.step)
    if (currentIndex > 0) {
      setState(prev => ({ ...prev, step: steps[currentIndex - 1].id }))
    }
  }

  const selectedPkg = STANDARD_PACKAGES.find(p => p.size === state.selectedSize)
  const totalPrice = selectedPkg ? selectedPkg.priceHKD * state.quantity : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {isHK ? 'AI 定制工作室' : 'AI Studio'}
            </h1>
            <p className="text-gray-600">
              {isHK ? '上傳照片，AI 智能優化，一鍵定制專屬藝術品' : 'Upload photo, AI enhancement, one-click custom art'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => {
              const isActive = state.step === step.id
              const isCompleted = steps.findIndex(s => s.id === state.step) > index
              const Icon = step.icon

              return (
                <React.Fragment key={step.id}>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-blue-100 text-blue-700' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive ? 'bg-blue-500 text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200'
                    }`}>
                      {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className="hidden sm:inline font-medium text-sm">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && <ChevronRight className="w-5 h-5 text-gray-300 mx-2" />}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {state.step === 'upload' && (
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                  state.originalImage ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {state.originalImage ? (
                  <div className="space-y-4">
                    <img src={state.originalImage} alt="Preview" className="max-w-full max-h-64 mx-auto rounded-lg object-contain" />
                    <p className="text-green-600 font-medium">
                      {isHK ? '圖片上傳成功！' : 'Image uploaded successfully!'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {isHK ? '點擊上傳照片' : 'Click to upload photo'}
                    </h3>
                    <p className="text-gray-500">{isHK ? '支持 JPG, PNG 格式' : 'Supports JPG, PNG format'}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {state.step !== 'upload' && (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <p className="text-gray-600 mb-4">
                {isHK ? '當前步驟：' : 'Current step: '} {state.step}
              </p>
              {state.step === 'preview' && (
                <button onClick={handleAddToCart} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
                  {isHK ? '添加到購物車' : 'Add to Cart'}
                </button>
              )}
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={state.step === 'upload'}
              className="px-6 py-3 rounded-lg border border-gray-300 disabled:opacity-50"
            >
              {isHK ? '上一步' : 'Back'}
            </button>
            {state.step !== 'preview' && (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white disabled:opacity-50"
              >
                {isHK ? '下一步' : 'Next'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}