'use client'

import { useEffect } from 'react'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

export type ToastType = 'loading' | 'success' | 'error'

interface ToastProps {
  type: ToastType
  message: string
  visible: boolean
  onClose: () => void
}

export function Toast({ type, message, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible && (type === 'success' || type === 'error')) {
      const timer = setTimeout(onClose, 5000)
      return () => clearTimeout(timer)
    }
  }, [visible, type, onClose])

  if (!visible) return null

  const icons = {
    loading: <Loader2 className="w-5 h-5 animate-spin text-amber-400" />,
    success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    error: <XCircle className="w-5 h-5 text-red-400" />,
  }

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in">
      <div className="flex items-center gap-3 bg-[#0F172A] border border-white/10 rounded-xl px-5 py-4 shadow-2xl backdrop-blur-xl">
        {icons[type]}
        <span className="text-sm text-slate-200">{message}</span>
      </div>
    </div>
  )
}
