import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AppHeader } from './components/AppHeader'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { AdvancedPage } from './pages/AdvancedPage'
import { TemplatesPage } from './pages/TemplatesPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { ChangelogPage } from './pages/ChangelogPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <ScrollToTop />
      <AppHeader />
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/advanced" element={<AdvancedPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  )
}
