/**
 * LoginPage - Halaman login untuk autentikasi pengguna
 * 
 * Fitur:
 * - Form login dengan validasi menggunakan Zod
 * - Toggle show/hide password
 * - Loading state dengan spinner saat submit
 * - Error handling untuk credential yang salah
 * - Toast notification untuk feedback error
 * - Link ke halaman register
 * 
 * @returns {JSX.Element} Form login yang terintegrasi dengan auth context
 */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { useSearchParams } from 'next/navigation'
import ToastContainer from '@/components/ui/ToastContainer'

/**
 * Schema validasi menggunakan Zod
 * - email: harus valid (format email)
 * - password: minimal 6 karakter
 */
const schema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

/** Type untuk data form berdasarkan schema Zod */
type FormData = z.infer<typeof schema>

function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callback') || undefined

  /** Hook autentikasi dari context (login function) */
  const { login } = useAuth()

  /** Custom hook untuk toast notification */
  const { toasts, error: toastError, success: toastSuccess, removeToast } = useToast()

  /** State untuk toggle visibility password (show/hide) */
  const [showPassword, setShowPassword] = useState(false)

  /**
   * React Hook Form configuration
   * - resolver: integrasi dengan Zod untuk validasi
   * - defaultValues: nilai awal form kosong
   */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  /**
   * Handler submit form untuk login
   * 
   * @param data - Data form yang sudah divalidasi (email & password)
   * 
   * Proses:
   * 1. Memanggil function login dari useAuth
   * 2. Jika berhasil, tampilkan toast sukses dan redirect
   * 3. Jika gagal, tampilkan toast error dan set error form
   */
  const onSubmit = async (data: FormData) => {
    try {
      await login(data, callbackUrl)
      // Success: tampilkan toast dan redirect handled by useAuth
      toastSuccess('Login berhasil! Selamat datang kembali.')
      reset()
    } catch (error: unknown) {
      // Set root error yang muncul di atas tombol submit
      const errorMessage = error instanceof Error ? error.message : 'Email atau password salah.'
      toastError(errorMessage)
      setError('root', { message: errorMessage })
    }
  }

  return (
    <>
      {/* Container untuk menampilkan semua toast notification */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="w-full">

        {/* Header Section */}
        <div className="mb-10 text-center lg:text-left">
          {/* Badge label */}
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Masuk ke akun
          </p>

          {/* Title */}
          <h2 className="mb-4 text-4xl text-brand-navy">
            Selamat Datang Kembali
          </h2>

          {/* Description */}
          <p className="max-w-md text-sm leading-7 font-light text-slate-500">
            Masuk untuk melihat itinerary tersimpan, daftar pilihan,
            dan jejak perjalanan yang sudah pernah kamu susun.
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-4xl border border-slate-200 bg-white p-7 shadow-sm md:p-8"
        >

          {/* Email Field */}
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Alamat Email
            </label>
            <div className="relative">
              {/* Email icon */}
              <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />

              {/* Email input */}
              <input
                {...register('email')}
                type="email"
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy disabled:opacity-60"
                placeholder="nama@email.com"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
            </div>
            {/* Error message untuk email */}
            {errors.email && (
              <p className="mt-1 text-xs text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              {/* Lock icon */}
              <LockKeyhole className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />

              {/* Password input dengan toggle visibility */}
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy disabled:opacity-60"
                placeholder="Masukkan kata sandi"
                aria-invalid={errors.password ? 'true' : 'false'}
              />

              {/* Toggle password visibility button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {/* Error message untuk password */}
            {errors.password && (
              <p className="mt-1 text-xs text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Root Error (credential error) */}
          {errors.root && (
            <p className="text-center text-sm text-red-500" role="alert">
              {errors.root.message}
            </p>
          )}

          {/* Submit Button dengan loading spinner */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-3 w-full rounded-full bg-brand-navy py-4 text-sm font-semibold text-white transition-all hover:bg-brand-navy/90 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Memproses...
              </span>
            ) : (
              'Masuk'
            )}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-8 text-center text-sm text-slate-500 lg:text-left">
          Belum punya akun?{' '}
          <Link
            href="/register"
            className="border-b border-brand-navy pb-0.5 font-semibold text-brand-navy transition-colors hover:border-brand-navy/80 hover:text-brand-navy/80"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-48 animate-pulse rounded bg-slate-200" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}