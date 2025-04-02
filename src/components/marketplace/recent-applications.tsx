import { cn } from "@/lib/utils"
import { ArrowRight, CheckCircle, Clock, XCircle } from "lucide-react"

interface Application {
  id: string
  affiliateName: string
  affiliateAvatar: string
  offerTitle: string
  advertiser: string
  appliedAt: string
  status: "pending" | "approved" | "rejected"
}

interface RecentApplicationsProps {
  applications?: Application[]
  className?: string
}

const APPLICATIONS: Application[] = [
  {
    id: "1",
    affiliateName: "Sarah Johnson",
    affiliateAvatar: "/placeholder.svg?height=40&width=40",
    offerTitle: "Premium VPN Subscription",
    advertiser: "SecureNet VPN",
    appliedAt: "2 hours ago",
    status: "pending",
  },
  {
    id: "2",
    affiliateName: "Michael Chen",
    affiliateAvatar: "/placeholder.svg?height=40&width=40",
    offerTitle: "Fitness App Free Trial",
    advertiser: "FitLife Pro",
    appliedAt: "5 hours ago",
    status: "approved",
  },
  {
    id: "3",
    affiliateName: "Jessica Williams",
    affiliateAvatar: "/placeholder.svg?height=40&width=40",
    offerTitle: "Online Course Bundle",
    advertiser: "EduMasters",
    appliedAt: "1 day ago",
    status: "rejected",
  },
  {
    id: "4",
    affiliateName: "David Rodriguez",
    affiliateAvatar: "/placeholder.svg?height=40&width=40",
    offerTitle: "E-commerce Cashback",
    advertiser: "ShopSmart",
    appliedAt: "1 day ago",
    status: "pending",
  },
  {
    id: "5",
    affiliateName: "Emma Thompson",
    affiliateAvatar: "/placeholder.svg?height=40&width=40",
    offerTitle: "Credit Card Application",
    advertiser: "Global Finance",
    appliedAt: "2 days ago",
    status: "approved",
  },
]

const statusConfig = {
  pending: {
    icon: Clock,
    class: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  approved: {
    icon: CheckCircle,
    class: "text-green-600 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-900/30",
  },
  rejected: {
    icon: XCircle,
    class: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-900/30",
  },
}

export default function RecentApplications({ applications = APPLICATIONS, className }: RecentApplicationsProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-3">
        {applications.map((application) => {
          const StatusIcon = statusConfig[application.status].icon

          return (
            <div
              key={application.id}
              className={cn(
                "group flex items-center gap-3",
                "p-3 rounded-lg",
                "bg-white dark:bg-zinc-900/70",
                "border border-zinc-100 dark:border-zinc-800",
                "hover:border-zinc-200 dark:hover:border-zinc-700",
                "transition-all duration-200",
              )}
            >
              <img
                src={application.affiliateAvatar}
                alt={application.affiliateName}
                width={40}
                height={40}
                className="rounded-full"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {application.affiliateName}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
                      Applied for <span className="font-medium">{application.offerTitle}</span> by{" "}
                      {application.advertiser}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
                      statusConfig[application.status].bg,
                      statusConfig[application.status].class,
                    )}
                  >
                    <StatusIcon className="w-3.5 h-3.5" />
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{application.appliedAt}</span>

                  {application.status === "pending" && (
                    <div className="flex gap-1">
                      <button className="p-1 rounded-md text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="p-1 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button
        className={cn(
          "w-full mt-4",
          "flex items-center justify-center gap-2",
          "py-2 px-3 rounded-lg",
          "text-xs font-medium",
          "bg-zinc-100 dark:bg-zinc-800",
          "text-zinc-700 dark:text-zinc-300",
          "hover:bg-zinc-200 dark:hover:bg-zinc-700",
          "transition-colors duration-200",
        )}
      >
        View All Applications
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

