'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

interface LogoProps {
    variant?: 'default' | 'white'
    href?: string
    className?: string
    showText?: boolean
}

export default function Logo({
    variant = 'default',
    href = '/',
    className,
    showText = true
}: LogoProps) {
    const logoSrc = variant === 'white'
        ? '/images/logo/citra-logo-white.png'
        : '/images/logo/citra-logo.png'

    if (!showText) {
        return (
            <Link href={href} aria-label="CITRA" className={cn('block', className)}>
                <div className="relative h-8 w-8">
                    <Image
                        src={logoSrc}
                        alt="CITRA"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </Link>
        )
    }

    return (
        <Link href={href} aria-label="CITRA" className={cn('block', className)}>
            <div className="relative h-8 w-28">
                <Image
                    src={logoSrc}
                    alt="CITRA"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </Link>
    )
}