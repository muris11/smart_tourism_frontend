'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from '@/hooks/useAuth'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useToast } from '@/hooks/useToast'
import { useSearchParams } from 'next/navigation'
import ToastContainer from '@/components/ui/ToastContainer'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

type FormData = z.infer<typeof schema>

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callback') || undefined
  const { login, isLoggedIn, hasHydrated } = useAuth()
  const { toasts, error: toastError, success: toastSuccess, removeToast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const submittedRef = useRef(false)

  useEffect(() => {
    if (hasHydrated && isLoggedIn && !submittedRef.current) {
      router.replace(callbackUrl || '/')
    }
  }, [hasHydrated, isLoggedIn, router, callbackUrl])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const [submitCount, setSubmitCount] = useState(0)

  const onSubmit = async (data: FormData) => {
    if (submitCount > 0) return
    setSubmitCount(1)
    try {
      await login(data)
      submittedRef.current = true
      toastSuccess('Login berhasil! Selamat datang kembali.')
      reset()
      router.replace(callbackUrl || '/')
    } catch (error: unknown) {
      setSubmitCount(0)
      let errorMessage = 'Email atau password salah.'
      if (error instanceof Error) {
        const msg = error.message
        if (msg.includes('429')) {
          errorMessage = 'Terlalu banyak percobaan. Silakan tunggu 30 detik.'
        } else if (msg.includes('401') || msg.includes('Unauthorized')) {
          errorMessage = 'Email atau password salah.'
        } else if (msg.includes('Network Error') || msg.includes('network')) {
          errorMessage = 'Tidak dapat terhubung ke server. Periksa koneksi internet.'
        } else if (msg.includes('timeout') || msg.includes('ECONNABORTED')) {
          errorMessage = 'Koneksi timeout. Silakan coba lagi.'
        } else if (msg.includes('500')) {
          errorMessage = 'Server sedang sibuk. Silakan coba lagi.'
        } else {
          errorMessage = msg
        }
      }
      toastError(errorMessage)
      setError('root', { message: errorMessage })
    }
  }

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <h2 className="text-center font-display text-2xl font-bold text-citra-ink">Masuk</h2>
      <p className="mt-1 text-center text-sm text-citra-muted">Selamat datang kembali</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-citra-muted">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-citra-muted" />
            <input
              {...register('email')}
              type="email"
              disabled={isSubmitting}
              className="w-full rounded-full border border-citra-border bg-white py-3 pl-11 pr-4 text-sm text-citra-ink outline-none transition-all placeholder:text-citra-muted-soft focus:border-citra-primary focus:ring-2 focus:ring-citra-primary/20 disabled:opacity-60"
              placeholder="nama@email.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-citra-error">{errors.email.message}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-citra-muted">Password</label>
          <div className="relative">
            <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-citra-muted" />
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              disabled={isSubmitting}
              className="w-full rounded-full border border-citra-border bg-white py-3 pl-11 pr-11 text-sm text-citra-ink outline-none transition-all placeholder:text-citra-muted-soft focus:border-citra-primary focus:ring-2 focus:ring-citra-primary/20 disabled:opacity-60"
              placeholder="Masukkan kata sandi"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-citra-muted hover:text-citra-body"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-citra-error">{errors.password.message}</p>}
        </div>

        <label className="flex items-center gap-2.5 text-sm text-citra-body">
          <input type="checkbox" className="h-4 w-4 rounded border-citra-border text-citra-primary focus:ring-citra-focus" />
          Ingat saya
        </label>

        {errors.root && (
          <p className="text-center text-sm text-citra-error">{errors.root.message}</p>
        )}

        <Button type="submit" loading={isSubmitting} className="w-full">
          Masuk
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-citra-muted">
        Belum punya akun?{' '}
        <Link href="/register" className="font-semibold text-citra-primary hover:text-citra-primary-hover transition-colors">
          Daftar
        </Link>
      </p>
    </>
  )
}

export default function LoginPage() {
  usePageTitle('Login')
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-citra-canvas">
        <div className="h-10 w-48 skeleton-shimmer rounded-full" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
