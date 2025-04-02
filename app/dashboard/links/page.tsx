import Layout from "@/components/marketplace/layout"
import TrackingLinks from "@/components/marketplace/tracking/tracking-links"

export default function LinksPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tracking Links</h1>
        <TrackingLinks />
      </div>
    </Layout>
  )
}

