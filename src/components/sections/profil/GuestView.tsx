'use client'

import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'

export default function GuestView() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-2xl">
                    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center md:flex md:text-left">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-brand-navy mx-auto md:mx-0">
                            <FaUserCircle />
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6">
                            <h1 className="text-2xl font-bold text-brand-navy">Guest Traveler</h1>
                            <p className="mt-1 text-sm text-slate-500">Bergabunglah untuk menyimpan wishlist dan preferensi perjalanan</p>
                            <div className="mt-4 flex gap-3 justify-center md:justify-start">
                                <Link href="/login" className="rounded-full bg-brand-navy px-6 py-2 text-sm font-medium text-white">Masuk</Link>
                                <Link href="/register" className="rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-medium text-slate-700">Daftar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}