'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[var(--shadow-card)]">
        <h1 className="mb-6 text-center text-2xl font-bold">Masuk</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input {...register('email')} type="email" className="w-full rounded-xl border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]" placeholder="email@kamu.com" />
            {errors.email ? <p className="mt-1 text-xs text-red-500">{errors.email.message}</p> : null}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input {...register('password')} type="password" className="w-full rounded-xl border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]" placeholder="••••••••" />
            {errors.password ? <p className="mt-1 text-xs text-red-500">{errors.password.message}</p> : null}
          </div>
          {errors.root ? <p className="text-center text-sm text-red-500">{errors.root.message}</p> : null}
          <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-[var(--color-brand)] py-2.5 font-semibold text-white transition hover:bg-[var(--color-brand-dark)] disabled:opacity-60">{isSubmitting ? 'Memproses...' : 'Masuk'}</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">Belum punya akun? <Link href="/register" className="font-medium text-[var(--color-brand)] hover:underline">Daftar</Link></p>
      </div>
    </div>
  )
}
