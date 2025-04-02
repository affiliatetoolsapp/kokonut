import type React from "react"
import { BarChart2, Briefcase, Users2 } from "lucide-react"
import OffersList from "./offers-list"
import RecentApplications from "./recent-applications"
import AnalyticsSummary from "./analytics-summary"

export default function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Active Offers"
          value="24"
          change="+3"
          icon={Briefcase}
          iconColor="text-blue-600 dark:text-blue-400"
          bgColor="bg-blue-50 dark:bg-blue-900/20"
        />
        <StatCard
          title="Total Affiliates"
          value="156"
          change="+12"
          icon={Users2}
          iconColor="text-green-600 dark:text-green-400"
          bgColor="bg-green-50 dark:bg-green-900/20"
        />
        <StatCard
          title="Conversions (MTD)"
          value="1,284"
          change="+18%"
          icon={BarChart2}
          iconColor="text-purple-600 dark:text-purple-400"
          bgColor="bg-purple-50 dark:bg-purple-900/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2 ">
            <Briefcase className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
            Popular Offers
          </h2>
          <div className="flex-1">
            <OffersList className="h-full" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
            <Users2 className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
            Recent Applications
          </h2>
          <div className="flex-1">
            <RecentApplications className="h-full" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col items-start justify-start border border-gray-200 dark:border-[#1F1F23]">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
          Performance Analytics
        </h2>
        <AnalyticsSummary />
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ElementType
  iconColor: string
  bgColor: string
}

function StatCard({ title, value, change, icon: Icon, iconColor, bgColor }: StatCardProps) {
  const isPositive = change.startsWith("+")

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <span
          className={`text-sm font-medium ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
        >
          {change}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
      </div>
    </div>
  )
}

