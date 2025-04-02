import { cn } from "@/lib/utils"
import { ArrowRight, ExternalLink, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface OfferItem {
  id: string
  title: string
  advertiser: string
  category: string
  payoutType: "CPA" | "CPC" | "CPL" | "CPS" | "RevShare"
  payoutValue: string
  status: "active" | "pending" | "paused"
  epc: string
  conversionRate: string
}

interface OffersListProps {
  offers?: OfferItem[]
  className?: string
}

const OFFERS: OfferItem[] = [
  {
    id: "1",
    title: "Premium VPN Subscription",
    advertiser: "SecureNet VPN",
    category: "Software",
    payoutType: "CPA",
    payoutValue: "$45.00",
    status: "active",
    epc: "$1.20",
    conversionRate: "3.2%",
  },
  {
    id: "2",
    title: "Fitness App Free Trial",
    advertiser: "FitLife Pro",
    category: "Health & Fitness",
    payoutType: "CPL",
    payoutValue: "$8.50",
    status: "active",
    epc: "$0.95",
    conversionRate: "5.8%",
  },
  {
    id: "3",
    title: "Online Course Bundle",
    advertiser: "EduMasters",
    category: "Education",
    payoutType: "RevShare",
    payoutValue: "30%",
    status: "active",
    epc: "$2.10",
    conversionRate: "2.4%",
  },
  {
    id: "4",
    title: "E-commerce Cashback",
    advertiser: "ShopSmart",
    category: "Retail",
    payoutType: "CPS",
    payoutValue: "12%",
    status: "active",
    epc: "$1.75",
    conversionRate: "4.1%",
  },
  {
    id: "5",
    title: "Credit Card Application",
    advertiser: "Global Finance",
    category: "Finance",
    payoutType: "CPA",
    payoutValue: "$75.00",
    status: "active",
    epc: "$2.50",
    conversionRate: "1.8%",
  },
]

const payoutTypeColors = {
  CPA: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  CPC: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  CPL: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  CPS: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  RevShare: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
}

export default function OffersList({ offers = OFFERS, className }: OffersListProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={cn(
              "group flex flex-col",
              "p-4 rounded-lg",
              "bg-white dark:bg-zinc-900/70",
              "border border-zinc-100 dark:border-zinc-800",
              "hover:border-zinc-200 dark:hover:border-zinc-700",
              "transition-all duration-200",
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{offer.title}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">{offer.advertiser}</p>
              </div>
              <Badge variant="outline" className={cn(payoutTypeColors[offer.payoutType])}>
                {offer.payoutType}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2 mb-3">
              <div className="text-center p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-md">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Payout</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{offer.payoutValue}</p>
              </div>
              <div className="text-center p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-md">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">EPC</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{offer.epc}</p>
              </div>
              <div className="text-center p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-md">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Conv. Rate</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{offer.conversionRate}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                <Tag className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                <span className="text-xs text-zinc-600 dark:text-zinc-400">{offer.category}</span>
              </div>

              <div className="flex gap-2">
                <button
                  className={cn(
                    "flex items-center justify-center gap-1",
                    "py-1 px-2 rounded-md",
                    "text-xs font-medium",
                    "bg-zinc-100 dark:bg-zinc-800",
                    "text-zinc-700 dark:text-zinc-300",
                    "hover:bg-zinc-200 dark:hover:bg-zinc-700",
                    "transition-colors duration-200",
                  )}
                >
                  <ExternalLink className="w-3 h-3" />
                  Preview
                </button>
                <button
                  className={cn(
                    "flex items-center justify-center gap-1",
                    "py-1 px-2 rounded-md",
                    "text-xs font-medium",
                    "bg-purple-600 dark:bg-purple-700",
                    "text-white",
                    "hover:bg-purple-700 dark:hover:bg-purple-600",
                    "transition-colors duration-200",
                  )}
                >
                  Apply
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
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
        View All Offers
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

