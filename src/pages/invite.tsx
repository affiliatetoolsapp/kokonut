import Layout from "@/components/marketplace/layout"
import InviteUsers from "@/components/marketplace/management/invite-users"

export default function InvitePage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invite Users</h1>
        <InviteUsers />
      </div>
    </Layout>
  )
}

