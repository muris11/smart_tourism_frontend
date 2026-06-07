'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
    {
        url: 'https://images.unsplash.com/photo-1707371675262-94f8528d12c8?q=80&w=749&auto=format&fit=crop',
        alt: 'Pemandangan alam pegunungan'
    },
    {
        url: 'https://images.unsplash.com/photo-1572697041670-b3e8937166f7?q=80&w=1074&auto=format&fit=crop',
        alt: 'Wisata budaya dan sejarah'
    },
    {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1173&auto=format&fit=crop',
        alt: 'Pantai dengan pemandangan matahari terbenam'
    },
    {
        url: 'https://images.unsplash.com/photo-1696385793104-745d4dd65c5a?q=80&w=1174&auto=format&fit=crop',
        alt: 'Kuliner khas daerah dengan pemandangan yang menarik'
    },
    {
        url: 'https://images.unsplash.com/photo-1511081692775-05d0f180a065?q=80&w=686&auto=format&fit=crop',
        alt: 'Cafe dengan suasana yang nyaman dan instagramable'
    }
]

export default function AuthSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {images.map((img, index) => (
                <Image
                    key={img.url}
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 0px, 50vw"
                    className={`object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    priority={index === 0}
                />
            ))}
        </>
    )
}