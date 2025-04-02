import Layout from "@/components/marketplace/layout"
import ApplicationsList from "@/components/marketplace/applications/applications-list"

export default function ApplicationsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Offer Applications</h1>
        <ApplicationsList />
      </div>
    </Layout>
  )
}

