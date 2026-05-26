'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import {
  UserRound, Mail, Calendar, LogOut, ClipboardList, Star, Settings, Luggage,
  MessageSquareText, LockKeyhole, Save, UserCircle,
  Eye, EyeOff, ImagePlus, Camera, Trash2, Loader2, ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import ToastContainer from '@/components/ui/ToastContainer'
import { getAvatarUrl } from '@/lib/api/client'
import { planningApi, SavedPlanning } from '@/lib/api/planning'

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-citra-canvas pt-28 pb-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 skeleton-shimmer rounded-full" />
            <div className="mt-4 h-6 w-48 skeleton-shimmer rounded" />
            <div className="mt-2 h-4 w-64 skeleton-shimmer rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

type TabKey = 'rencana' | 'ulasan' | 'pengaturan'

export default function ProfilPage() {
  const { isLoggedIn, isLoading, user, logout, updateProfile } = useAuth()
  const { toasts, error: toastError, success: toastSuccess, removeToast } = useToast()
  const [activeTab, setActiveTab] = useState<TabKey>('rencana')
  const [saving, setSaving] = useState(false)
  const [nama, setNama] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [plans, setPlans] = useState<SavedPlanning[]>([])
  const [loadingPlans, setLoadingPlans] = useState(false)
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null)

  useEffect(() => {
    if (user) {
      setNama(user.nama || '')
      setAvatarPreview(getAvatarUrl(user.avatar_url))
    }
  }, [user])

  useEffect(() => {
    if (!isLoggedIn) return
    setLoadingPlans(true)
    planningApi.list()
      .then(setPlans)
      .finally(() => setLoadingPlans(false))
  }, [isLoggedIn])

  const handleDeletePlan = async (id: number) => {
    try {
      await planningApi.destroy(id)
      setPlans((prev) => prev.filter((p) => p.id !== id))
      toastSuccess('Rencana berhasil dihapus.')
    } catch {
      toastError('Gagal menghapus rencana.')
    }
  }

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => {
      setAvatarPreview(ev.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  if (isLoading) return <ProfileSkeleton />

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-citra-canvas pt-28 pb-24">
        <div className="container-page">
          <div className="mx-auto max-w-md py-20 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-citra-primary-soft">
              <UserRound className="h-10 w-10 text-citra-primary" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold text-citra-ink">Belum Masuk</h2>
            <p className="mt-2 text-sm text-citra-muted">Masuk atau daftar untuk mengakses profil dan rencana perjalananmu</p>
            <Button
              className="mt-6"
              onClick={() => { window.location.href = '/login?callback=/profil' }}
            >
              Masuk / Daftar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      let ok: boolean
      if (avatarFile) {
        const fd = new FormData()
        fd.append('nama', nama)
        fd.append('avatar', avatarFile)
        ok = await updateProfile(fd)
      } else {
        ok = await updateProfile({ nama })
      }
      if (ok) {
        toastSuccess('Profil berhasil diperbarui!')
      } else {
        toastError('Gagal menyimpan profil. Silakan coba lagi.')
      }
    } catch {
      toastError('Gagal menyimpan profil. Silakan coba lagi.')
    } finally {
      setSaving(false)
      setAvatarFile(null)
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'rencana', label: 'Rencana Saya', icon: ClipboardList },
    { key: 'ulasan', label: 'Ulasan', icon: Star },
    { key: 'pengaturan', label: 'Pengaturan', icon: Settings },
  ]

  const initial = (user?.nama || 'U').charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-citra-canvas pt-28 pb-24">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center text-center">
            <div
              className="relative cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={user?.nama || 'Avatar'}
                  className="h-24 w-24 rounded-full object-cover shadow-card"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling
                    if (fallback) (fallback as HTMLElement).style.display = 'flex'
                  }}
                />
              ) : null}
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full bg-citra-primary text-3xl font-bold text-white shadow-card ${avatarPreview ? 'hidden' : ''}`}
              >
                {initial}
              </div>
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 transition-colors group-hover:bg-black/40">
                <Camera className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarSelect}
            />
            <h1 className="mt-4 font-display text-2xl font-bold text-citra-ink">
              {user?.nama || 'Pengguna'}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-citra-muted">
              <Mail className="h-4 w-4" />
              {user?.email || ''}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-citra-primary-soft px-3 py-1 text-xs font-medium text-citra-primary">
                <UserCircle className="h-3.5 w-3.5" />
                {user?.role === 'admin' ? 'Admin' : 'Pengunjung'}
              </span>
              {user?.created_at && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-citra-surface-soft px-3 py-1 text-xs text-citra-muted">
                  <Calendar className="h-3.5 w-3.5" />
                  Bergabung {new Date(user.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
                </span>
              )}
            </div>
          </div>

          <div className="mt-10 flex justify-center border-b border-citra-border">
            <div className="flex gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.key
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? 'border-citra-primary text-citra-primary'
                        : 'border-transparent text-citra-muted hover:text-citra-body hover:border-citra-border-strong'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-8">
            {activeTab === 'rencana' && (
              <div>
                {loadingPlans ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-6 w-6 animate-spin text-citra-primary" />
                  </div>
                ) : plans.length === 0 ? (
                  <div className="flex flex-col items-center rounded-lg bg-citra-surface px-6 py-16 text-center shadow-card">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-citra-primary-soft">
                      <Luggage className="h-8 w-8 text-citra-primary" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-citra-ink">Belum ada rencana</h3>
                    <p className="mt-1 text-sm text-citra-muted">Yuk, buat rencanamu sekarang!</p>
                    <Button className="mt-4" size="sm" onClick={() => window.location.href = '/planning'}>
                      Buat Rencana
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {plans.map((plan) => {
                      const isExpanded = expandedPlan === plan.id
                      const items = (plan.items as Array<{ hari: number; urutan: number; nama: string; tipe_tempat: string }>) || []
                      const days = [...new Set(items.map(i => i.hari))].sort()
                      return (
                        <div key={plan.id} className="rounded-lg bg-citra-surface shadow-card transition-all hover:shadow-md">
                          <div
                            className="flex cursor-pointer items-center justify-between p-4"
                            onClick={() => setExpandedPlan(isExpanded ? null : plan.id)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-citra-primary-soft">
                                <Luggage className="h-6 w-6 text-citra-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-citra-ink">{plan.judul}</h4>
                                <p className="text-xs text-citra-muted">
                                  {plan.created_at
                                    ? new Date(plan.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
                                    : ''}
                                  {plan.wilayah?.length > 0 && ` · ${plan.wilayah.join(', ')}`}
                                  {days.length > 0 && ` · ${days.length} Hari`}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDeletePlan(plan.id) }}
                                className="flex h-9 w-9 items-center justify-center rounded-full text-citra-muted transition-all hover:bg-red-50 hover:text-red-500"
                                title="Hapus rencana"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                              <ChevronDown className={`h-5 w-5 text-citra-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                          </div>
                          {isExpanded && items.length > 0 && (
                            <div className="border-t border-citra-border px-4 pb-4 pt-3">
                              {days.map((hari) => {
                                const dayItems = items.filter(i => i.hari === hari).sort((a, b) => a.urutan - b.urutan)
                                return (
                                  <div key={hari} className="mb-3 last:mb-0">
                                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-citra-muted">Hari {hari}</h5>
                                    <div className="space-y-1.5">
                                      {dayItems.map((item, idx) => (
                                        <div key={`${hari}-${idx}`} className="flex items-center gap-3 rounded-lg bg-citra-canvas px-3 py-2 text-sm">
                                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-citra-primary-soft text-xs font-bold text-citra-primary">
                                            {item.urutan}
                                          </span>
                                          <span className="text-citra-ink">{item.nama}</span>
                                          <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${
                                            item.tipe_tempat === 'wisata' ? 'bg-emerald-100 text-emerald-700' :
                                            item.tipe_tempat === 'kuliner' ? 'bg-amber-100 text-amber-700' :
                                            'bg-violet-100 text-violet-700'
                                          }`}>
                                            {item.tipe_tempat}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'ulasan' && (
              <div className="flex flex-col items-center rounded-lg bg-citra-surface px-6 py-16 text-center shadow-card">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-citra-primary-soft">
                  <MessageSquareText className="h-8 w-8 text-citra-primary" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-citra-ink">Belum ada ulasan</h3>
                <p className="mt-1 text-sm text-citra-muted">Bagikan pengalamanmu setelah mengunjungi tempat wisata</p>
              </div>
            )}

            {activeTab === 'pengaturan' && (
              <div className="rounded-lg bg-citra-surface p-6 shadow-card md:p-8">
                <h3 className="font-display text-lg font-semibold text-citra-ink">Edit Profil</h3>
                <p className="mt-1 text-sm text-citra-muted">Perbarui data dirimu kapan saja</p>

                <div className="mt-8 space-y-5">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-citra-muted">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="w-full rounded-full border border-citra-border bg-citra-canvas px-5 py-3 text-sm text-citra-ink outline-none transition-all focus:border-citra-primary focus:ring-2 focus:ring-citra-primary/20"
                      placeholder="Nama lengkap"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-citra-muted">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full rounded-full border border-citra-border bg-citra-surface-soft px-5 py-3 text-sm text-citra-muted outline-none cursor-not-allowed"
                      placeholder="email@example.com"
                    />
                    <p className="mt-1 text-xs text-citra-muted">Email tidak dapat diubah</p>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-citra-muted">
                      Foto Profil
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="flex cursor-pointer items-center gap-3 rounded-full border border-dashed border-citra-border bg-citra-canvas px-5 py-3 text-sm text-citra-muted transition-all hover:border-citra-primary hover:text-citra-primary"
                    >
                      <ImagePlus className="h-5 w-5 shrink-0" />
                      <span>{avatarFile ? avatarFile.name : 'Klik untuk upload foto profil'}</span>
                    </div>
                    <p className="mt-1 text-xs text-citra-muted">Format: JPG, PNG. Maksimal 2MB</p>
                  </div>

                  <div className="border-t border-citra-border pt-5">
                    <button
                      type="button"
                      onClick={() => setShowPasswordInput(!showPasswordInput)}
                      className="flex items-center gap-2 text-sm font-medium text-citra-primary hover:text-citra-primary-hover transition-colors"
                    >
                      <LockKeyhole className="h-4 w-4" />
                      {showPasswordInput ? 'Batal ganti password' : 'Ganti Password'}
                    </button>

                    {showPasswordInput && (
                      <div className="mt-4">
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-citra-muted">
                          Password Baru
                        </label>
                        <div className="relative">
                          <LockKeyhole className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-citra-muted" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-full border border-citra-border bg-citra-canvas py-3 pl-12 pr-12 text-sm text-citra-ink outline-none transition-all focus:border-citra-primary focus:ring-2 focus:ring-citra-primary/20"
                            placeholder="Minimal 6 karakter"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-citra-muted hover:text-citra-body"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-citra-muted">Biarkan kosong jika tidak ingin mengubah</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button onClick={handleSaveProfile} loading={saving} className="w-full sm:w-auto">
                      <Save className="mr-2 h-4 w-4" />
                      Simpan Perubahan
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <Button
              variant="secondary"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Keluar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
