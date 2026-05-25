// src/hooks/useToast.ts

'use client'

import { useState, useCallback } from 'react'

/** Interface untuk struktur Toast notification */
export interface Toast {
    id: number
    type: 'success' | 'error' | 'info' | 'warning'
    message: string
    duration?: number
}

const DEFAULT_DURATION = 4000

/** Hook untuk mengelola toast notification */
export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([])
    const [toastIdCounter, setToastIdCounter] = useState(0)

    /**
     * Menambahkan toast notification baru
     * @param type - Tipe toast (success, error, info, warning)
     * @param message - Pesan yang akan ditampilkan
     * @param duration - Durasi toast dalam milidetik (default: 4000)
     */
    const addToast = useCallback((type: Toast['type'], message: string, duration: number = DEFAULT_DURATION) => {
        setToastIdCounter(prev => prev + 1)
        const id = toastIdCounter + 1

        setToasts((prev) => [...prev, { id, type, message, duration }])

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id))
        }, duration)

        return id
    }, [toastIdCounter])

    /**
     * Menghapus toast notification berdasarkan ID
     * @param id - ID toast yang akan dihapus
     */
    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, [])

    /** Toast success - menampilkan notifikasi sukses */
    const success = useCallback((message: string, duration?: number) => {
        return addToast('success', message, duration)
    }, [addToast])

    /** Toast error - menampilkan notifikasi error */
    const error = useCallback((message: string, duration?: number) => {
        return addToast('error', message, duration)
    }, [addToast])

    /** Toast info - menampilkan notifikasi informasi */
    const info = useCallback((message: string, duration?: number) => {
        return addToast('info', message, duration)
    }, [addToast])

    /** Toast warning - menampilkan notifikasi peringatan */
    const warning = useCallback((message: string, duration?: number) => {
        return addToast('warning', message, duration)
    }, [addToast])

    return {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        info,
        warning,
    }
}