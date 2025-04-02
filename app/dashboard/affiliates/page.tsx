import Layout from "@/components/marketplace/layout"
import AffiliatesManagement from "@/components/marketplace/management/affiliates-management"

export default function AffiliatesPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Affiliate Management</h1>
        <AffiliatesManagement />
      </div>
    </Layout>
  )
}

