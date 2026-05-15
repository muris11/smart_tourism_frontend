'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { User as UserIcon, Mail, LogOut, Edit3, Save, Loader2, Shield } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/stores/authStore'

const profileSchema = z.object({
  nama: z.string().min(2, 'Nama minimal 2 karakter').max(150),
})

type ProfileFormData = z.infer<typeof profileSchema>

function GuestView() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="flex flex-col items-center gap-8 rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm md:flex-row md:text-left">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-slate-100">
            <UserIcon className="h-10 w-10 text-slate-400" />
          </div>
          <div>
            <h1 className="mb-2 text-2xl font-bold text-slate-900">Guest Traveler</h1>
            <p className="mb-6 text-sm text-slate-500">Silakan masuk untuk menyimpan wishlist dan plan perjalanan.</p>
            <div className="flex justify-center gap-4 md:justify-start">
              <Link href="/login" className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
                Masuk
              </Link>
              <Link href="/register" className="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileView() {
  const { user, logout } = useAuth()
  const { setUser } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nama: user?.name || '',
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    setSuccessMsg(null)
    setErrorMsg(null)
    try {
      await authApi.updateProfile(data)
      setUser({ ...user!, name: data.nama })
      setSuccessMsg('Profil berhasil diperbarui.')
      setIsEditing(false)
    } catch {
      setErrorMsg('Gagal memperbarui profil.')
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  const initial = user?.name?.charAt(0)?.toUpperCase() || '?'

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center gap-6 border-b border-slate-100 pb-8 md:flex-row md:items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
              {initial}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-slate-900">{user?.name}</h1>
              <p className="mt-1 flex items-center justify-center gap-2 text-sm text-slate-500 md:justify-start">
                <Mail className="h-3.5 w-3.5" />
                {user?.email}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                <Shield className="h-3 w-3" />
                {user?.role === 'admin' ? 'Admin' : 'Pengunjung'}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Informasi Profil</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
                >
                  <Edit3 className="h-3 w-3" />
                  Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Nama</label>
                  <input
                    {...register('nama')}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white"
                  />
                  {errors.nama && <p className="mt-1 text-xs text-red-500">{errors.nama.message}</p>}
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    Batal
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-xs text-slate-500">Nama</span>
                  <span className="text-sm font-medium text-slate-800">{user?.name}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-xs text-slate-500">Email</span>
                  <span className="text-sm font-medium text-slate-800">{user?.email}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-xs text-slate-500">Role</span>
                  <span className="text-sm font-medium text-slate-800">{user?.role === 'admin' ? 'Admin' : 'Pengunjung'}</span>
                </div>
              </div>
            )}

            {successMsg && (
              <div className="mt-4 rounded-xl border border-green-100 bg-green-50 p-3 text-sm text-green-700">{successMsg}</div>
            )}
            {errorMsg && (
              <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600">{errorMsg}</div>
            )}
          </div>

          <div className="mt-8 border-t border-slate-100 pt-8">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProfilPage() {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <GuestView />
  }

  return <ProfileView />
}
