'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/stores/authStore'
import ProfileHeader from './ProfileHeader'

const profileSchema = z.object({
    nama: z.string().min(2, 'Nama minimal 2 karakter').max(150),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfileView() {
    const { user, logout } = useAuth()
    const { setUser } = useAuthStore()
    const [isEditing, setIsEditing] = useState(false)
    const [successMsg, setSuccessMsg] = useState<string | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: { nama: user?.nama || '' },
    })

    const onSubmit = async (data: ProfileFormData) => {
        setSuccessMsg(null)
        setErrorMsg(null)
        try {
            await authApi.updateProfile({ nama: data.nama })
            setUser({ ...user!, nama: data.nama })
            setSuccessMsg('Profil berhasil diperbarui')
            setTimeout(() => setSuccessMsg(null), 3000)
            setIsEditing(false)
        } catch {
            setErrorMsg('Gagal memperbarui profil')
            setTimeout(() => setErrorMsg(null), 3000)
        }
    }

    const handleLogout = async () => {
        await logout()
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold text-brand-navy">Profil Saya</h1>
                        <p className="mt-1 text-sm text-slate-500">Kelola informasi akun dan preferensi perjalanan</p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <ProfileHeader
                            user={user as unknown as { nama: string; email: string; role: string }}
                            isEditing={isEditing}
                            isSubmitting={isSubmitting}
                            errors={errors}
                            register={register}
                            onSubmit={handleSubmit(onSubmit)}
                            onEdit={() => setIsEditing(true)}
                            onCancel={() => setIsEditing(false)}
                            successMsg={successMsg}
                            errorMsg={errorMsg}
                        />

                        {/* <WishlistSection />
                        <PreferencesSection /> */}

                        <div className="mt-6 border-t border-slate-200 pt-6">
                            <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-red-600">
                                <FaSignOutAlt />
                                Keluar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}