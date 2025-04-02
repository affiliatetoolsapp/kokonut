import Layout from "@/components/marketplace/layout"
import ConversionsTracker from "@/components/marketplace/tracking/conversions-tracker"

export default function ConversionsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Conversions</h1>
        <ConversionsTracker />
      </div>
    </Layout>
  )
}

