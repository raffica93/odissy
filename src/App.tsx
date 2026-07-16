import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LandingPage } from './pages/LandingPage'
import { ArticlePage } from './pages/ArticlePage'
import { GuidePage } from './pages/GuidePage'
import { PrivacyPage } from './pages/PrivacyPage'
import { AdSlot } from './components/AdSlot'
import { Analytics } from './components/Analytics'
import { SEO_LANDINGS } from './data/seo-landings'

export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <Routes>

        <Route path="/" element={<HomePage />} />
        {SEO_LANDINGS.map((l) => (
          <Route
            key={l.path}
            path={l.path}
            element={<LandingPage slug={l.slug} />}
          />
        ))}
        <Route path="/come-scegliere-sala-nolan" element={<ArticlePage />} />
        <Route path="/guida-formati" element={<GuidePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <AdSlot slot="sticky" className="fixed inset-x-0 bottom-0 z-30" />
    </BrowserRouter>
  )
}
