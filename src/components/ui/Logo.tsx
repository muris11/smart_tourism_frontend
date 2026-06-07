'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

interface LogoProps {
    variant?: 'default' | 'white'
    href?: string
    className?: string
    showText?: boolean
    iconSize?: number
    textSize?: { width: number; height: number }
}

export default function Logo({
    variant = 'default',
    href = '/',
    className,
    showText = true,
    iconSize = 32,
    textSize = { width: 112, height: 32 }
}: LogoProps) {
    const logoSrc = variant === 'white'
        ? '/images/logo/citra-logo-white.png'
        : '/images/logo/citra-logo.png'

    if (!showText) {
        return (
            <Link href={href} aria-label="CITRA" className={cn('block', className)}>
                <div
                    className="relative"
                    style={{ width: iconSize, height: iconSize }}
                >
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
            <div
                className="relative"
                style={{ width: textSize.width, height: textSize.height }}
            >
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