"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MoreHorizontal,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Eye,
  Mail,
  UserPlus,
  Ban,
  BarChart,
  ExternalLink,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import AffiliateDetails from "./affiliate-details"

// Sample data
const affiliates = [
  {
    id: "AFF-5678",
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2023-01-15T10:30:00Z",
    website: "https://johnsmith.com",
    socialProfiles: {
      twitter: "@johnsmith",
      instagram: "@johnsmith_tech",
    },
    trafficSources: ["Blog", "Email Newsletter", "Social Media"],
    performance: {
      clicks: 15240,
      conversions: 420,
      revenue: 18900,
      epc: "$1.24",
      convRate: "2.76%",
    },
    paymentInfo: {
      method: "PayPal",
      email: "john.smith@example.com",
      lastPaid: "2023-03-01T10:30:00Z",
      pendingAmount: 1250.0,
    },
    tier: "Gold",
  },
  {
    id: "AFF-6789",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2023-02-10T09:15:00Z",
    website: "https://sarahfitness.com",
    socialProfiles: {
      youtube: "@sarahfitness",
      instagram: "@sarah_fitness",
    },
    trafficSources: ["YouTube", "Instagram", "Blog"],
    performance: {
      clicks: 12600,
      conversions: 380,
      revenue: 15600,
      epc: "$1.24",
      convRate: "3.02%",
    },
    paymentInfo: {
      method: "Bank Transfer",
      accountName: "Sarah Johnson",
      lastPaid: "2023-03-01T10:30:00Z",
      pendingAmount: 980.0,
    },
    tier: "Silver",
  },
  {
    id: "AFF-7890",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "pending",
    joinDate: "2023-03-05T16:45:00Z",
    website: "https://michaelbrown.com",
    socialProfiles: {
      twitter: "@mike_brown",
    },
    trafficSources: ["Blog", "Twitter"],
    performance: {
      clicks: 0,
      conversions: 0,
      revenue: 0,
      epc: "$0.00",
      convRate: "0.00%",
    },
    paymentInfo: {
      method: "Pending",
      pendingAmount: 0.0,
    },
    tier: "Bronze",
  },
  {
    id: "AFF-8901",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2022-11-20T08:20:00Z",
    website: "https://emilytech.com",
    socialProfiles: {
      youtube: "@emilytechtips",
      twitter: "@emily_tech",
    },
    trafficSources: ["YouTube", "Blog", "Email Newsletter"],
    performance: {
      clicks: 8300,
      conversions: 250,
      revenue: 9800,
      epc: "$1.18",
      convRate: "3.01%",
    },
    paymentInfo: {
      method: "PayPal",
      email: "emily.davis@example.com",
      lastPaid: "2023-03-01T10:30:00Z",
      pendingAmount: 750.0,
    },
    tier: "Gold",
  },
  {
    id: "AFF-9012",
    name: "David Wilson",
    email: "david.wilson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "suspended",
    joinDate: "2022-09-12T13:40:00Z",
    website: "https://davidwilson.com",
    socialProfiles: {
      linkedin: "davidwilson",
      youtube: "@davidwilsonbiz",
    },
    trafficSources: ["LinkedIn", "YouTube", "Podcast", "Email Newsletter"],
    performance: {
      clicks: 6600,
      conversions: 180,
      revenue: 7500,
      epc: "$1.14",
      convRate: "2.73%",
    },
    paymentInfo: {
      method: "Bank Transfer",
      accountName: "David Wilson",
      lastPaid: "2023-02-01T10:30:00Z",
      pendingAmount: 0.0,
    },
    tier: "Silver",
    suspensionReason: "Violation of terms - Incentivized traffic",
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/30">
          <CheckCircle className="h-3 w-3 mr-1" />
          Active
        </Badge>
      )
    case "suspended":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/30">
          <Ban className="h-3 w-3 mr-1" />
          Suspended
        </Badge>
      )
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/30">
          <AlertCircle className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

// Tier badge component
const TierBadge = ({ tier }: { tier: string }) => {
  switch (tier) {
    case "Gold":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
        >
          Gold
        </Badge>
      )
    case "Silver":
      return (
        <Badge
          variant="outline"
          className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800"
        >
          Silver
        </Badge>
      )
    case "Bronze":
      return (
        <Badge
          variant="outline"
          className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800"
        >
          Bronze
        </Badge>
      )
    default:
      return <Badge variant="outline">{tier}</Badge>
  }
}

export default function AffiliatesManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tierFilter, setTierFilter] = useState("all")
  const [selectedAffiliate, setSelectedAffiliate] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Filter affiliates based on search term and filters
  const filteredAffiliates = affiliates.filter((affiliate) => {
    const matchesSearch =
      affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || affiliate.status === statusFilter
    const matchesTier = tierFilter === "all" || affiliate.tier === tierFilter

    return matchesSearch && matchesStatus && matchesTier
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const handleViewDetails = (affiliate: any) => {
    setSelectedAffiliate(affiliate)
    setIsDetailsOpen(true)
  }

  const handleApprove = (affiliate: any) => {
    // In a real app, this would make an API call to approve the affiliate
    toast({
      title: "Affiliate approved",
      description: `${affiliate.name} has been approved and can now access the platform`,
    })
  }

  const handleSuspend = (affiliate: any) => {
    // In a real app, this would make an API call to suspend the affiliate
    toast({
      title: "Affiliate suspended",
      description: `${affiliate.name} has been suspended`,
    })
  }

  const handleReactivate = (affiliate: any) => {
    // In a real app, this would make an API call to reactivate the affiliate
    toast({
      title: "Affiliate reactivated",
      description: `${affiliate.name} has been reactivated`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button onClick={() => (window.location.href = "/dashboard/invite")}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Affiliate
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Affiliates</CardTitle>
          <CardDescription>Manage your affiliate partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search affiliates..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>

              <Select value={tierFilter} onValueChange={setTierFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Bronze">Bronze</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Affiliate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Conversions</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>EPC</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAffiliates.length > 0 ? (
                  filteredAffiliates.map((affiliate) => (
                    <TableRow key={affiliate.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={affiliate.avatar} alt={affiliate.name} />
                            <AvatarFallback>{affiliate.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{affiliate.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{affiliate.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={affiliate.status} />
                      </TableCell>
                      <TableCell>
                        <TierBadge tier={affiliate.tier} />
                      </TableCell>
                      <TableCell>{formatDate(affiliate.joinDate)}</TableCell>
                      <TableCell>{affiliate.performance.conversions.toLocaleString()}</TableCell>
                      <TableCell>${affiliate.performance.revenue.toLocaleString()}</TableCell>
                      <TableCell>{affiliate.performance.epc}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewDetails(affiliate)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewDetails(affiliate)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Contact Affiliate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BarChart className="h-4 w-4 mr-2" />
                                View Analytics
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Visit Website
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {affiliate.status === "pending" && (
                                <DropdownMenuItem onClick={() => handleApprove(affiliate)}>
                                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                                  Approve
                                </DropdownMenuItem>
                              )}
                              {affiliate.status === "active" && (
                                <DropdownMenuItem onClick={() => handleSuspend(affiliate)}>
                                  <Ban className="h-4 w-4 mr-2 text-red-600 dark:text-red-400" />
                                  Suspend
                                </DropdownMenuItem>
                              )}
                              {affiliate.status === "suspended" && (
                                <DropdownMenuItem onClick={() => handleReactivate(affiliate)}>
                                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                                  Reactivate
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No affiliates found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Affiliate Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          {selectedAffiliate && (
            <AffiliateDetails
              affiliate={selectedAffiliate}
              onApprove={handleApprove}
              onSuspend={handleSuspend}
              onReactivate={handleReactivate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

