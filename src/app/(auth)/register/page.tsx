'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, LockKeyhole, UserRound, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useRef, useState } from 'react'
import { useToast } from '@/hooks/useToast'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useAuth } from '@/hooks/useAuth'
import { authApi } from '@/lib/api/auth'
import ToastContainer from '@/components/ui/ToastContainer'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/[A-Z]/, 'Password harus mengandung minimal 1 huruf besar')
    .regex(/[a-z]/, 'Password harus mengandung minimal 1 huruf kecil')
    .regex(/\d/, 'Password harus mengandung minimal 1 angka'),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  path: ['password_confirmation'],
  message: 'Konfirmasi password tidak sama',
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  usePageTitle('Daftar')
  const router = useRouter()
  const { isLoggedIn, hasHydrated } = useAuth()
  const { toasts, error: toastError, success: toastSuccess, removeToast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const submittedRef = useRef(false)

  useEffect(() => {
    if (hasHydrated && isLoggedIn && !submittedRef.current) {
      router.replace('/')
    }
  }, [isLoggedIn, hasHydrated, router])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nama: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    submittedRef.current = true
    try {
      const result = await authApi.register({
        nama: data.nama,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })

      if (result.success) {
        toastSuccess('Registrasi berhasil! Silakan login.')
        reset()
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      } else {
        const errorMessage = result.message || 'Registrasi gagal. Silakan coba lagi.'
        toastError(errorMessage)
        setError('root', { message: errorMessage })
      }
    } catch {
      const errorMessage = 'Terjadi kesalahan jaringan. Silakan periksa koneksi internet Anda.'
      toastError(errorMessage)
      setError('root', { message: errorMessage })
    }
  }

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <h2 className="text-center font-display text-2xl font-bold text-citra-ink">Daftar</h2>
      <p className="mt-1 text-center text-sm text-citra-muted">Mulai jelajahi Ciayumajakuning</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-citra-muted">Nama Lengkap</label>
          <div className="relative">
            <UserRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-citra-muted" />
            <input
              {...register('nama')}
              type="text"
              disabled={isSubmitting}
              className="w-full rounded-full border border-citra-border bg-white py-3 pl-11 pr-4 text-sm text-citra-ink outline-none transition-all placeholder:text-citra-muted-soft focus:border-citra-primary focus:ring-2 focus:ring-citra-primary/20 disabled:opacity-60"
              placeholder="Sesuai kartu identitas"
            />
          </div>
          {errors.nama && <p className="mt-1 text-xs text-citra-error">{errors.nama.message}</p>}
        </div>

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
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-citra-muted">Kata Sandi</label>
          <div className="relative">
            <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-citra-muted" />
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              disabled={isSubmitting}
              className="w-full rounded-full border border-citra-border bg-white py-3 pl-11 pr-11 text-sm text-citra-ink outline-none transition-all placeholder:text-citra-muted-soft focus:border-citra-primary focus:ring-2 focus:ring-citra-primary/20 disabled:opacity-60"
              placeholder="Minimal 8 karakter"
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

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-citra-muted">Konfirmasi Kata Sandi</label>
          <div className="relative">
            <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-citra-muted" />
            <input
              {...register('password_confirmation')}
              type={showConfirmPassword ? 'text' : 'password'}
              disabled={isSubmitting}
              className="w-full rounded-full border border-citra-border bg-white py-3 pl-11 pr-11 text-sm text-citra-ink outline-none transition-all placeholder:text-citra-muted-soft focus:border-citra-primary focus:ring-2 focus:ring-citra-primary/20 disabled:opacity-60"
              placeholder="Ulangi kata sandi"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-citra-muted hover:text-citra-body"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password_confirmation && <p className="mt-1 text-xs text-citra-error">{errors.password_confirmation.message}</p>}
        </div>

        <label className="flex items-start gap-2.5 text-sm text-citra-body">
          <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-citra-border text-citra-primary focus:ring-citra-focus" />
          <span>Saya setuju dengan <Link href="#" className="font-semibold text-citra-primary hover:text-citra-primary-hover">Syarat &amp; Ketentuan</Link></span>
        </label>

        {errors.root && (
          <p className="text-center text-sm text-citra-error">{errors.root.message}</p>
        )}

        <Button type="submit" loading={isSubmitting} className="w-full">
          Daftar
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-citra-muted">
        Sudah punya akun?{' '}
        <Link href="/login" className="font-semibold text-citra-primary hover:text-citra-primary-hover transition-colors">
          Masuk
        </Link>
      </p>
    </>
  )
}
