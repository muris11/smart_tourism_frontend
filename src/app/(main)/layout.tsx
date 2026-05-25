/**
 * Main Layout - Layout untuk halaman utama (group (main))
 * 
 * Layout ini digunakan untuk halaman-halaman yang membutuhkan:
 * - Navbar (navigasi atas)
 * - Footer (bagian bawah halaman)
 * - ChatbotButton (tombol chat floating)
 * - ChatbotDrawer (panel chat yang muncul dari samping)
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Konten halaman spesifik
 * 
 * @returns {JSX.Element} Layout lengkap dengan navigasi dan chatbot
 */
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import ChatbotButton from '@/components/chatbot/ChatbotButton'
import ChatbotDrawer from '@/components/chatbot/ChatbotDrawer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Layout utama dengan flex column untuk sticky footer */}
      <div className="flex min-h-screen flex-col">
        {/* Navigasi atas - muncul di semua halaman main */}
        <Navbar />

        {/* Konten utama - flex-1 memastikan footer tetap di bawah */}
        <main className="flex-1">{children}</main>

        {/* Footer - muncul di bagian bawah */}
        <Footer />

        {/* Tombol chatbot floating - muncul di pojok kanan bawah */}
        <ChatbotButton />
      </div>

      {/* 
        ChatbotDrawer
      */}
      <ChatbotDrawer />
    </>
  )
}