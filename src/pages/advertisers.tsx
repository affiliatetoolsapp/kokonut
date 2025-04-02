import Layout from "@/components/marketplace/layout"
import AdvertisersManagement from "@/components/marketplace/management/advertisers-management"

export default function AdvertisersPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Advertiser Management</h1>
        <AdvertisersManagement />
      </div>
    </Layout>
  )
}

