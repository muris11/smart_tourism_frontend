import ChatbotButton from '@/components/chatbot/ChatbotButton'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatbotButton />
    </div>
  )
}
