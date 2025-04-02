"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Filter, MoreHorizontal, Search, Plus, Eye, LinkIcon, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import OfferDetails from "./offer-details"

interface Offer {
  id: string
  title: string
  advertiser: string
  category: string
  payoutType: "CPA" | "CPC" | "CPL" | "CPS" | "RevShare" | "CPI"
  payoutValue: string
  status: "active" | "pending" | "paused"
  epc: string
  conversionRate: string
  description: string
  requirements: string
  imageUrl: string
  featured: boolean
  createdAt: string
}

const OFFERS: Offer[] = [
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
    description: "Promote our premium VPN service with industry-leading security features and global server coverage.",
    requirements: "Traffic must be from tier 1 countries (US, UK, CA, AU, EU). No incentivized traffic allowed.",
    imageUrl: "/placeholder.svg?height=100&width=200",
    featured: true,
    createdAt: "2023-10-15",
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
    description: "Promote our fitness app that offers personalized workout plans and nutrition guidance.",
    requirements: "Valid email required. No incentivized traffic.",
    imageUrl: "/placeholder.svg?height=100&width=200",
    featured: false,
    createdAt: "2023-11-02",
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
    description: "Promote our comprehensive online course bundle covering programming, design, and digital marketing.",
    requirements: "90-day cookie window. Recurring commissions for subscription plans.",
    imageUrl: "/placeholder.svg?height=100&width=200",
    featured: true,
    createdAt: "2023-09-20",
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
    description: "Promote our e-commerce platform that offers cashback on purchases from over 500 retailers.",
    requirements: "30-day cookie window. Commission on first purchase only.",
    imageUrl: "/placeholder.svg?height=100&width=200",
    featured: false,
    createdAt: "2023-12-05",
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
    description: "Promote our premium credit card with cashback rewards, travel benefits, and no annual fee.",
    requirements: "US traffic only. Approved applications only. No incentivized traffic.",
    imageUrl: "/placeholder.svg?height=100&width=200",
    featured: true,
    createdAt: "2023-08-18",
  },
  {
    id: "6",
    title: "Mobile Game Install",
    advertiser: "GameForge Studios",
    category: "Gaming",
    payoutType: "CPI",
    payoutValue: "$2.50",
    status: "active",
    epc: "$0.85",
    conversionRate: "7.2%",
    description: "Promote our new mobile RPG game with stunning graphics and immersive gameplay.",
    requirements: "iOS and Android users. User must open the app after installation.",
    imageUrl: "/placeholder.svg?height=100&width=200",
    featured: false,
    createdAt: "2024-01-10",
  },
  {
    id: "7",
    title: "Web Hosting Plan",
    advertiser: "CloudHost Pro",
    category: "Web Services",
    payoutType: "CPA",
    payoutValue: "$65.00",
    status: "paused",
    epc: "$1.95",
    conversionRate: "2.9%",
    description: "Promote our reliable web hosting service with 99.9% uptime guarantee and 24/7 support.",
    requirements: "Valid for new customers only. Minimum 6-month plan purchase required.",
    imageUrl: "/placeholder.svg?height=100&width=200",
    featured: false,
    createdAt: "2023-11-28",
  },
  {
    id: "8",
    title: "Language Learning App",
    advertiser: "LinguaLearn",
    category: "Education",
    payoutType: "CPL",
    payoutValue: "$6.00",
    status: "active",
    epc: "$1.10",
    conversionRate: "4.5%",
    description: "Promote our language learning app that uses AI to personalize the learning experience.",
    requirements: "Valid email and phone verification required. Global traffic accepted.",
    imageUrl: "/placeholder.svg?height=100&width=200",
    featured: false,
    createdAt: "2024-02-05",
  },
  {
    id: "9",
    title: "Investment Platform",
    advertiser: "WealthGrow",
    category: "Finance",
    payoutType: "CPA",
    payoutValue: "$100.00",
    status: "pending",
    epc: "$3.20",
    conversionRate: "1.2%",
    description: "Promote our investment platform that offers stocks, ETFs, and cryptocurrency trading.",
    requirements: "KYC verification required. Minimum deposit of $100 required.",
    imageUrl: "/placeholder.svg?height=100&width=200",
    featured: true,
    createdAt: "2023-12-15",
  },
  {
    id: "10",
    title: "Food Delivery Service",
    advertiser: "QuickBite",
    category: "Food & Beverage",
    payoutType: "CPA",
    payoutValue: "$12.00",
    status: "active",
    epc: "$1.45",
    conversionRate: "3.8%",
    description: "Promote our food delivery service available in major cities with thousands of restaurant partners.",
    requirements: "New users only. First order must be at least $20.",
    imageUrl: "/placeholder.svg?height=100&width=200",
    featured: false,
    createdAt: "2024-01-20",
  },
]

const payoutTypeColors = {
  CPA: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  CPC: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  CPL: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  CPS: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  RevShare: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  CPI: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
}

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  paused: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
}

export default function OffersMarketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [payoutFilter, setPayoutFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Get unique categories for filter
  const categories = Array.from(new Set(OFFERS.map((offer) => offer.category)))

  // Filter offers based on search and filters
  const filteredOffers = OFFERS.filter((offer) => {
    const matchesSearch =
      offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.advertiser.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || offer.category === categoryFilter
    const matchesPayout = payoutFilter === "all" || offer.payoutType === payoutFilter
    const matchesStatus = statusFilter === "all" || offer.status === statusFilter

    return matchesSearch && matchesCategory && matchesPayout && matchesStatus
  })

  const openOfferDetails = (offer: Offer) => {
    setSelectedOffer(offer)
    setIsDetailsOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Offer Marketplace</h1>
        <Link href="/dashboard/offers/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Offer
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23] overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-[#1F1F23]">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search offers..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px] h-9">
                    <div className="flex items-center gap-2">
                      <Filter className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                      <SelectValue placeholder="Category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center">
                <Select value={payoutFilter} onValueChange={setPayoutFilter}>
                  <SelectTrigger className="w-[140px] h-9">
                    <div className="flex items-center gap-2">
                      <Filter className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                      <SelectValue placeholder="Payout Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payouts</SelectItem>
                    <SelectItem value="CPA">CPA</SelectItem>
                    <SelectItem value="CPC">CPC</SelectItem>
                    <SelectItem value="CPL">CPL</SelectItem>
                    <SelectItem value="CPS">CPS</SelectItem>
                    <SelectItem value="RevShare">RevShare</SelectItem>
                    <SelectItem value="CPI">CPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px] h-9">
                    <div className="flex items-center gap-2">
                      <Filter className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  <div className="flex items-center gap-2">
                    Offer
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  </div>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Payout</TableHead>
                <TableHead>EPC</TableHead>
                <TableHead>Conv. Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOffers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No offers found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredOffers.map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {offer.featured && (
                          <Badge
                            variant="outline"
                            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                          >
                            Featured
                          </Badge>
                        )}
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{offer.title}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{offer.advertiser}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{offer.category}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <Badge
                          variant="outline"
                          className={cn("w-fit", payoutTypeColors[offer.payoutType as keyof typeof payoutTypeColors])}
                        >
                          {offer.payoutType}
                        </Badge>
                        <span className="text-sm font-medium mt-1">{offer.payoutValue}</span>
                      </div>
                    </TableCell>
                    <TableCell>{offer.epc}</TableCell>
                    <TableCell>{offer.conversionRate}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(statusColors[offer.status as keyof typeof statusColors])}>
                        {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => openOfferDetails(offer)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <LinkIcon className="h-4 w-4" />
                          <span className="sr-only">Get link</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <LinkIcon className="mr-2 h-4 w-4" />
                              <span>Get Tracking Link</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Copy Offer ID</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-[#1F1F23] flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredOffers.length} of {OFFERS.length} offers
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Offer Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogTitle className="sr-only">Offer Details</DialogTitle>
          {selectedOffer && <OfferDetails offer={selectedOffer} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

