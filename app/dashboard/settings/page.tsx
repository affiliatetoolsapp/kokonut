import Layout from "@/components/marketplace/layout"
import SettingsPage from "@/components/marketplace/settings/settings-page"

export default function Settings() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <SettingsPage />
      </div>
    </Layout>
  )
}

