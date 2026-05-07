'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, LockKeyhole } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from '@/hooks/useAuth'

const schema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const { login } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    try {
      await login(data)
    } catch {
      setError('root', { message: 'Email atau password salah.' })
    }
  }

  return (
    <div className="w-full">
      <div className="mb-10 text-center lg:text-left">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Masuk ke akun</p>
        <h2 className="mb-4 text-4xl text-brand-navy">Selamat Datang Kembali</h2>
        <p className="max-w-md text-sm leading-7 font-light text-slate-500">
          Masuk untuk melihat itinerary tersimpan, daftar pilihan, dan jejak perjalanan yang sudah pernah kamu susun.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm md:p-8">
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Alamat Email</label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input {...register('email')} type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy" placeholder="nama@email.com" />
            </div>
            {errors.email ? <p className="mt-1 text-xs text-red-500">{errors.email.message}</p> : null}
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Kata Sandi</label>
              <a href="#" className="text-xs font-medium text-slate-500 transition-colors hover:text-brand-navy hover:underline">Lupa Kata Sandi?</a>
            </div>
            <div className="relative">
              <LockKeyhole className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input {...register('password')} type="password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy" placeholder="Masukkan kata sandi" />
            </div>
            {errors.password ? <p className="mt-1 text-xs text-red-500">{errors.password.message}</p> : null}
          </div>
          {errors.root ? <p className="text-center text-sm text-red-500">{errors.root.message}</p> : null}
          <button type="submit" disabled={isSubmitting} className="mt-3 w-full rounded-full bg-brand-navy py-4 text-sm font-semibold text-white transition-all hover:bg-[var(--color-brand)] hover:shadow-lg disabled:opacity-60">{isSubmitting ? 'Memproses...' : 'Masuk'}</button>
        </form>

      <p className="mt-8 text-center text-sm text-slate-500 lg:text-left">Belum punya akun? <Link href="/register" className="border-b border-brand-navy pb-0.5 font-semibold text-brand-navy transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]">Daftar sekarang</Link></p>
    </div>
  )
}
