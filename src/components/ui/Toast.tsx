/**
 * Toast - Komponen notifikasi reusable
 * 
 * Menampilkan pesan notifikasi dengan berbagai tipe (success, error, info, warning)
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Toast} props.toast - Data toast yang akan ditampilkan
 * @param {function} props.onClose - Callback saat toast ditutup
 * 
 * @returns {JSX.Element} Toast notification component
 */

'use client'

import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { Toast as ToastType } from '@/hooks/useToast'

/** Mapping icon berdasarkan tipe toast */
const toastIcons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle,
}

/** Mapping warna berdasarkan tipe toast */
const toastStyles = {
    success: {
        container: 'bg-green-50 border border-green-200',
        icon: 'text-green-500',
        text: 'text-green-800',
    },
    error: {
        container: 'bg-red-50 border border-red-200',
        icon: 'text-red-500',
        text: 'text-red-800',
    },
    info: {
        container: 'bg-blue-50 border border-blue-200',
        icon: 'text-blue-500',
        text: 'text-blue-800',
    },
    warning: {
        container: 'bg-yellow-50 border border-yellow-200',
        icon: 'text-yellow-500',
        text: 'text-yellow-800',
    },
}

interface ToastProps {
    /** Data toast yang akan ditampilkan */
    toast: ToastType
    /** Callback saat toast ditutup */
    onClose: (id: number) => void
}

export default function Toast({ toast, onClose }: ToastProps) {
    const Icon = toastIcons[toast.type]
    const styles = toastStyles[toast.type]

    return (
        <div
            className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg animate-in slide-in-from-right-5 duration-300',
                styles.container
            )}
        >
            {/* Toast Icon */}
            <Icon className={cn('h-5 w-5', styles.icon)} />

            {/* Toast Message */}
            <p className={cn('text-sm font-medium', styles.text)}>
                {toast.message}
            </p>

            {/* Close Button */}
            <button
                onClick={() => onClose(toast.id)}
                className="ml-2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Tutup notifikasi"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    )
}