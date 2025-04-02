import Layout from "@/components/marketplace/layout"
import AnalyticsDashboard from "@/components/marketplace/analytics/analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <AnalyticsDashboard />
      </div>
    </Layout>
  )
}

