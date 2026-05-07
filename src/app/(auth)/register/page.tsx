'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, LockKeyhole, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from '@/hooks/useAuth'

const schema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  password_confirmation: z.string().min(8, 'Konfirmasi password minimal 8 karakter'),
}).refine((data) => data.password === data.password_confirmation, {
  path: ['password_confirmation'],
  message: 'Konfirmasi password tidak sama',
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const { register: registerUser } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data)
    } catch {
      setError('root', { message: 'Registrasi gagal.' })
    }
  }

  return (
    <div className="w-full">
      <div className="mb-10 text-center lg:text-left">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Buat akun baru</p>
        <h2 className="mb-4 text-4xl tracking-tight text-brand-navy">Mulai Petualangan</h2>
        <p className="max-w-md text-sm leading-7 font-light text-slate-500">
          Buat akun untuk menyimpan rencana perjalanan, tempat pilihan, dan preferensi eksplorasi kamu sendiri.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm md:p-8">
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Nama Lengkap</label>
            <div className="relative">
              <UserRound className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input {...register('name')} className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy" placeholder="Sesuai kartu identitas" />
            </div>
            {errors.name ? <p className="mt-1 text-xs text-red-500">{errors.name.message}</p> : null}
          </div>
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Alamat Email</label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input {...register('email')} type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy" placeholder="nama@email.com" />
            </div>
            {errors.email ? <p className="mt-1 text-xs text-red-500">{errors.email.message}</p> : null}
          </div>
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Password</label>
            <div className="relative">
              <LockKeyhole className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input {...register('password')} type="password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy" placeholder="Minimal 8 karakter" />
            </div>
            {errors.password ? <p className="mt-1 text-xs text-red-500">{errors.password.message}</p> : null}
          </div>
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Konfirmasi Password</label>
            <div className="relative">
              <LockKeyhole className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input {...register('password_confirmation')} type="password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy" placeholder="Ulangi kata sandi" />
            </div>
            {errors.password_confirmation ? <p className="mt-1 text-xs text-red-500">{errors.password_confirmation.message}</p> : null}
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
            Dengan membuat akun, kamu menyetujui <a href="#" className="font-semibold text-brand-navy hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="font-semibold text-brand-navy hover:underline">Kebijakan Privasi</a> yang berlaku.
          </p>
          {errors.root ? <p className="text-center text-sm text-red-500">{errors.root.message}</p> : null}
          <button type="submit" disabled={isSubmitting} className="mt-3 w-full rounded-full bg-brand-navy py-4 text-sm font-semibold text-white transition-all hover:bg-[var(--color-brand)] hover:shadow-lg disabled:opacity-60">{isSubmitting ? 'Memproses...' : 'Buat akun'}</button>
        </form>

      <p className="mt-8 text-center text-sm text-slate-500 lg:text-left">Sudah punya akun? <Link href="/login" className="border-b border-brand-navy pb-0.5 font-semibold text-brand-navy transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]">Masuk di sini</Link></p>
    </div>
  )
}
