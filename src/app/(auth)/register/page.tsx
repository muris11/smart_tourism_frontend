/**
 * RegisterPage - Halaman registrasi untuk membuat akun baru
 * 
 * Fitur:
 * - Form registrasi dengan validasi menggunakan Zod
 * - Validasi password match (password & konfirmasi password)
 * - Integrasi dengan API backend untuk registrasi
 * - Loading state saat submit
 * - Error handling untuk berbagai skenario kegagalan
 * - Link ke halaman login
 * - Toast notification untuk feedback sukses/gagal (reusable)
 * - Toggle show/hide password dengan icon Eye
 * 
 * @returns {JSX.Element} Form registrasi yang terintegrasi dengan API
 */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, LockKeyhole, UserRound, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { useToast } from '@/hooks/useToast'
import { authApi } from '@/lib/api/auth'
import ToastContainer from '@/components/ui/ToastContainer'

/** Type untuk form data */
type RegisterFormData = {
  nama: string
  email: string
  password: string
  password_confirmation: string
}

/**
 * Schema validasi menggunakan Zod
 * - nama: minimal 2 karakter
 * - email: format email valid
 * - password: minimal 6 karakter
 * - password_confirmation: harus sama dengan password
 * 
 * .refine() digunakan untuk validasi custom antar field
 */
const schema = z.object({
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  path: ['password_confirmation'],
  message: 'Konfirmasi password tidak sama',
})

/** Type untuk data form berdasarkan schema Zod */
type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  /** Next.js router untuk navigasi setelah registrasi sukses */
  const router = useRouter()

  /** Custom hook untuk toast notification */
  const { toasts, error: toastError, success: toastSuccess, removeToast } = useToast()

  /** State untuk toggle visibility password */
  const [showPassword, setShowPassword] = useState(false)

  /** State untuk toggle visibility confirm password */
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  /**
   * React Hook Form configuration
   * - resolver: integrasi dengan Zod untuk validasi
   * - defaultValues: nilai awal form (kosong)
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
      nama: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  /**
   * Handler submit form
   * @param data - Data form yang sudah divalidasi (nama, email, password)
   * 
   * Proses:
   * 1. Mengirim data ke API endpoint registrasi
   * 2. Jika sukses, tampilkan toast sukses dan redirect ke halaman login
   * 3. Jika gagal, tampilkan toast error dan set error form
   */
  const onSubmit = async (data: RegisterFormData) => {
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
      {/* Toast Container - Menampilkan semua toast notification */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="w-full">

        {/* HEADER SECTION */}
        <div className="mb-10 text-center lg:text-left">
          {/* Badge Label */}
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Buat akun baru
          </p>

          {/* Title */}
          <h2 className="mb-4 text-4xl tracking-tight text-brand-navy">
            Mulai Petualangan
          </h2>

          {/* Description */}
          <p className="max-w-md text-sm leading-7 font-light text-slate-500">
            Buat akun untuk menyimpan rencana perjalanan, tempat pilihan,
            dan preferensi eksplorasi kamu sendiri.
          </p>
        </div>

        {/* REGISTRATION FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-4xl border border-slate-200 bg-white p-7 shadow-sm md:p-8"
        >

          {/* FIELD: Nama Lengkap */}
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Nama Lengkap
            </label>
            <div className="relative">
              <UserRound className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                {...register('nama')}
                type="text"
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="Sesuai kartu identitas"
                aria-invalid={errors.nama ? 'true' : 'false'}
              />
            </div>
            {errors.nama && (
              <p className="mt-1 text-xs text-red-500" role="alert">
                {errors.nama.message}
              </p>
            )}
          </div>

          {/* FIELD: Email */}
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Alamat Email
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                {...register('email')}
                type="email"
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="nama@email.com"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* FIELD: Password */}
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Password
            </label>
            <div className="relative">
              <LockKeyhole className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="Minimal 6 karakter"
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {/* Toggle Password Visibility Button */}
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
            {errors.password && (
              <p className="mt-1 text-xs text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* FIELD: Konfirmasi Password */}
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Konfirmasi Password
            </label>
            <div className="relative">
              <LockKeyhole className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                {...register('password_confirmation')}
                type={showConfirmPassword ? 'text' : 'password'}
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy disabled:opacity-60 disabled:cursor-not-allowed"
                placeholder="Ulangi kata sandi"
                aria-invalid={errors.password_confirmation ? 'true' : 'false'}
              />
              {/* Toggle Confirm Password Visibility Button */}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showConfirmPassword ? 'Sembunyikan konfirmasi password' : 'Tampilkan konfirmasi password'}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="mt-1 text-xs text-red-500" role="alert">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          {/* TERMS & CONDITIONS */}
          <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
            Dengan membuat akun, kamu menyetujui{' '}
            <a href="#" className="font-semibold text-brand-navy hover:underline transition-colors">
              Syarat & Ketentuan
            </a>{' '}
            serta{' '}
            <a href="#" className="font-semibold text-brand-navy hover:underline transition-colors">
              Kebijakan Privasi
            </a>{' '}
            yang berlaku.
          </p>

          {/* ROOT ERROR (API Error) */}
          {errors.root && (
            <p className="text-center text-sm text-red-500" role="alert">
              {errors.root.message}
            </p>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-3 w-full rounded-full bg-brand-navy py-4 text-sm font-semibold text-white transition-all hover:bg-brand-navy/90 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            ) : (
              'Buat akun'
            )}
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="mt-8 text-center text-sm text-slate-500 lg:text-left">
          Sudah punya akun?{' '}
          <Link
            href="/login"
            className="border-b border-brand-navy pb-0.5 font-semibold text-brand-navy transition-colors hover:border-brand-navy/80 hover:text-brand-navy/80"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </>
  )
}