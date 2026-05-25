/**
 * ToastContainer - Container untuk menampilkan daftar toast notification
 * 
 * Komponen ini bertanggung jawab untuk merender semua toast yang aktif
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Toast[]} props.toasts - Daftar toast yang akan ditampilkan
 * @param {function} props.onClose - Callback saat toast ditutup
 * 
 * @returns {JSX.Element} Toast container component
 */

'use client'

import Toast from './Toast'
import type { Toast as ToastType } from '@/hooks/useToast'

interface ToastContainerProps {
    /** Daftar toast yang akan ditampilkan */
    toasts: ToastType[]
    /** Callback saat toast ditutup */
    onClose: (id: number) => void
}

export default function ToastContainer({ toasts, onClose }: ToastContainerProps) {
    if (toasts.length === 0) return null

    return (
        <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    toast={toast}
                    onClose={onClose}
                />
            ))}
        </div>
    )
}