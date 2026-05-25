'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { FaEnvelope, FaShieldAlt, FaEdit, FaSave, FaUser } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'

interface ProfileFormData {
    nama: string
}

interface ProfileHeaderProps {
    user: {
        nama: string
        email: string
        role: string
    }
    isEditing: boolean
    isSubmitting: boolean
    errors: FieldErrors<ProfileFormData>
    register: UseFormRegister<ProfileFormData>
    onSubmit: () => void
    onEdit: () => void
    onCancel: () => void
    successMsg: string | null
    errorMsg: string | null
}

export default function ProfileHeader({
    user,
    isEditing,
    isSubmitting,
    errors,
    register,
    onSubmit,
    onEdit,
    onCancel,
    successMsg,
    errorMsg,
}: ProfileHeaderProps) {
    const initial = user?.nama?.charAt(0)?.toUpperCase() || '?'

    return (
        <div>
            {/* Profile Header */}
            <div className="flex flex-col items-center gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-start">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-navy text-2xl font-bold text-white">
                    {initial}
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-xl font-semibold text-brand-navy">{user?.nama}</h2>
                    <p className="mt-1 flex items-center justify-center gap-2 text-sm text-slate-500 md:justify-start">
                        <FaEnvelope />
                        <span>{user?.email}</span>
                    </p>
                    <div className="mt-2 flex justify-center md:justify-start">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-brand-navy">
                            <FaShieldAlt />
                            {user?.role === 'admin' ? 'Administrator' : 'Wisatawan'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="mt-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-brand-navy">Informasi Akun</h3>
                    {!isEditing && (
                        <button
                            onClick={onEdit}
                            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium text-brand-green transition-colors hover:bg-brand-green/10"
                        >
                            <FaEdit />
                            Edit
                        </button>
                    )}
                </div>

                {isEditing ? (
                    <form onSubmit={onSubmit} className="mt-4 space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">Nama Lengkap</label>
                            <input
                                {...register('nama')}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-all focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
                                placeholder="Masukkan nama lengkap"
                            />
                            {errors.nama && (
                                <p className="mt-1.5 text-xs text-red-500">{errors.nama.message}</p>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                ) : (
                                    <FaSave />
                                )}
                                Simpan
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <FaUser />
                                <span>Nama Lengkap</span>
                            </div>
                            <span className="text-sm font-medium text-slate-800">{user?.nama}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <FaEnvelope />
                                <span>Alamat Email</span>
                            </div>
                            <span className="text-sm font-medium text-slate-800">{user?.email}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <FaShieldAlt />
                                <span>Tipe Akun</span>
                            </div>
                            <span className="text-sm font-medium text-slate-800">
                                {user?.role === 'admin' ? 'Administrator' : 'Wisatawan'}
                            </span>
                        </div>
                    </div>
                )}

                {/* Messages */}
                {successMsg && (
                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2.5 text-sm text-green-700">
                        <FiCheck />
                        <span>{successMsg}</span>
                    </div>
                )}
                {errorMsg && (
                    <div className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
                        {errorMsg}
                    </div>
                )}
            </div>
        </div>
    )
}