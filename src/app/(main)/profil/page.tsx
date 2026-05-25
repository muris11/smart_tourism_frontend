// src/app/(main)/profil/page.tsx

'use client'

import { useAuth } from '@/hooks/useAuth'
import GuestView from '@/components/sections/profil/GuestView'
import ProfileView from '@/components/sections/profil/ProfileView'

export default function ProfilPage() {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <GuestView />
  }

  return <ProfileView />
}