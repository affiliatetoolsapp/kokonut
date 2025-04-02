"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, ChevronRight } from "lucide-react"
import UserProfile from "./user-profile"
import { Link } from "react-router-dom"
import { ThemeToggle } from "../theme-toggle"

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function TopNav() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "AffiliateHub", href: "#" },
    { label: "dashboard", href: "#" },
  ]

  return (
    <div className="h-16 px-6 flex items-center justify-between border-b border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center gap-4">
        {/* Left side empty for now */}
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative">
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                3
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[440px]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-[#1F1F23]">
              <span className="text-sm font-medium">Notifications</span>
              <button className="text-xs text-blue-600 dark:text-blue-400">Mark all as read</button>
            </div>
            <div className="py-2">
              <NotificationItem
                title="New Offer Application"
                description="John Doe applied to your offer 'Summer Sale Campaign'"
                time="2 min ago"
              />
              <NotificationItem
                title="Conversion Tracked"
                description="A new conversion worth $50 was tracked for 'Winter Promo'"
                time="1 hour ago"
              />
              <NotificationItem
                title="Payment Processed"
                description="Your payment of $1,200 has been processed"
                time="2 hours ago"
              />
            </div>
            <div className="px-4 py-3 border-t border-gray-200 dark:border-[#1F1F23]">
              <button className="w-full text-sm text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1">
                View all notifications
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <UserProfile />
      </div>
    </div>
  )
}

function NotificationItem({ title, description, time }: { title: string; description: string; time: string }) {
  return (
    <button className="w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-[#1F1F23] transition-colors">
      <div className="h-2 w-2 mt-2 rounded-full bg-blue-600" />
      <div className="flex-1 text-left">
        <div className="text-sm font-medium text-gray-900 dark:text-white">{title}</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">{description}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{time}</div>
      </div>
    </button>
  )
}

