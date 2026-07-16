import { Seo } from '../components/Seo'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { Privacy } from '../components/Privacy'

export function PrivacyPage() {
  return (
    <div className="min-h-screen pb-8">
      <Seo
        title="Privacy e cookie — Dove vedere Odissea"
        description="Informativa privacy e cookie di dovevedereodissea.it: geolocalizzazione, AdSense e CMP Google."
        path={"/privacy"}
      />
      <SiteHeader />
      <Privacy />
      <div className="mx-auto max-w-3xl">
        <SiteFooter />
      </div>
    </div>
  )
}