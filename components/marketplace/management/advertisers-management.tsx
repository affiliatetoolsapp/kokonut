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
import AdvertiserDetails from "./advertiser-details"

// Sample data
const advertisers = [
  {
    id: "ADV-1234",
    name: "SecureNet VPN",
    companyName: "SecureNet Technologies Inc.",
    email: "partnerships@securenetvpn.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2023-01-10T10:30:00Z",
    website: "https://securenetvpn.com",
    industry: "Software & Technology",
    performance: {
      activeOffers: 3,
      totalClicks: 25240,
      totalConversions: 1420,
      totalSpend: 38900,
      conversionRate: "5.63%",
    },
    billingInfo: {
      method: "Credit Card",
      status: "Active",
      lastBilled: "2023-03-01T10:30:00Z",
      nextBilling: "2023-04-01T10:30:00Z",
    },
    contactPerson: {
      name: "Alex Johnson",
      position: "Marketing Director",
      email: "alex.johnson@securenetvpn.com",
      phone: "+1 (555) 123-4567",
    },
  },
  {
    id: "ADV-2345",
    name: "FitLife Pro",
    companyName: "FitLife Wellness LLC",
    email: "affiliates@fitlifepro.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2023-02-05T09:15:00Z",
    website: "https://fitlifepro.com",
    industry: "Health & Fitness",
    performance: {
      activeOffers: 2,
      totalClicks: 18600,
      totalConversions: 980,
      totalSpend: 25600,
      conversionRate: "5.27%",
    },
    billingInfo: {
      method: "Bank Transfer",
      status: "Active",
      lastBilled: "2023-03-01T10:30:00Z",
      nextBilling: "2023-04-01T10:30:00Z",
    },
    contactPerson: {
      name: "Sarah Miller",
      position: "Affiliate Manager",
      email: "sarah.miller@fitlifepro.com",
      phone: "+1 (555) 234-5678",
    },
  },
  {
    id: "ADV-3456",
    name: "EduMasters",
    companyName: "EduMasters Learning Inc.",
    email: "partners@edumasters.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "pending",
    joinDate: "2023-03-12T16:45:00Z",
    website: "https://edumasters.com",
    industry: "Education",
    performance: {
      activeOffers: 0,
      totalClicks: 0,
      totalConversions: 0,
      totalSpend: 0,
      conversionRate: "0.00%",
    },
    billingInfo: {
      method: "Pending",
      status: "Pending",
    },
    contactPerson: {
      name: "Michael Chen",
      position: "Business Development",
      email: "michael.chen@edumasters.com",
      phone: "+1 (555) 345-6789",
    },
  },
  {
    id: "ADV-4567",
    name: "ShopSmart",
    companyName: "ShopSmart Retail Solutions",
    email: "affiliates@shopsmart.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2022-11-15T08:20:00Z",
    website: "https://shopsmart.com",
    industry: "Retail",
    performance: {
      activeOffers: 4,
      totalClicks: 32300,
      totalConversions: 1250,
      totalSpend: 42800,
      conversionRate: "3.87%",
    },
    billingInfo: {
      method: "Credit Card",
      status: "Active",
      lastBilled: "2023-03-01T10:30:00Z",
      nextBilling: "2023-04-01T10:30:00Z",
    },
    contactPerson: {
      name: "Emily Rodriguez",
      position: "Marketing Manager",
      email: "emily.rodriguez@shopsmart.com",
      phone: "+1 (555) 456-7890",
    },
  },
  {
    id: "ADV-5678",
    name: "Global Finance",
    companyName: "Global Finance Partners Ltd.",
    email: "partnerships@globalfinance.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "suspended",
    joinDate: "2022-09-05T13:40:00Z",
    website: "https://globalfinance.com",
    industry: "Finance",
    performance: {
      activeOffers: 0,
      totalClicks: 15600,
      totalConversions: 580,
      totalSpend: 29000,
      conversionRate: "3.72%",
    },
    billingInfo: {
      method: "Bank Transfer",
      status: "Suspended",
      lastBilled: "2023-02-01T10:30:00Z",
    },
    contactPerson: {
      name: "David Wilson",
      position: "Partnership Director",
      email: "david.wilson@globalfinance.com",
      phone: "+1 (555) 567-8901",
    },
    suspensionReason: "Payment issues - Failed to pay last 2 invoices",
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

export default function AdvertisersManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [selectedAdvertiser, setSelectedAdvertiser] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Get unique industries for filter
  const industries = Array.from(new Set(advertisers.map((adv) => adv.industry)))

  // Filter advertisers based on search term and filters
  const filteredAdvertisers = advertisers.filter((advertiser) => {
    const matchesSearch =
      advertiser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advertiser.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advertiser.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advertiser.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || advertiser.status === statusFilter
    const matchesIndustry = industryFilter === "all" || advertiser.industry === industryFilter

    return matchesSearch && matchesStatus && matchesIndustry
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const handleViewDetails = (advertiser: any) => {
    setSelectedAdvertiser(advertiser)
    setIsDetailsOpen(true)
  }

  const handleApprove = (advertiser: any) => {
    // In a real app, this would make an API call to approve the advertiser
    toast({
      title: "Advertiser approved",
      description: `${advertiser.name} has been approved and can now access the platform`,
    })
  }

  const handleSuspend = (advertiser: any) => {
    // In a real app, this would make an API call to suspend the advertiser
    toast({
      title: "Advertiser suspended",
      description: `${advertiser.name} has been suspended`,
    })
  }

  const handleReactivate = (advertiser: any) => {
    // In a real app, this would make an API call to reactivate the advertiser
    toast({
      title: "Advertiser reactivated",
      description: `${advertiser.name} has been reactivated`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button onClick={() => (window.location.href = "/dashboard/invite")}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Advertiser
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Advertisers</CardTitle>
          <CardDescription>Manage your advertiser partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search advertisers..."
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

              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Advertiser</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Active Offers</TableHead>
                  <TableHead>Conversions</TableHead>
                  <TableHead>Total Spend</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdvertisers.length > 0 ? (
                  filteredAdvertisers.map((advertiser) => (
                    <TableRow key={advertiser.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={advertiser.avatar} alt={advertiser.name} />
                            <AvatarFallback>{advertiser.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{advertiser.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{advertiser.companyName}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={advertiser.status} />
                      </TableCell>
                      <TableCell>{advertiser.industry}</TableCell>
                      <TableCell>{formatDate(advertiser.joinDate)}</TableCell>
                      <TableCell>{advertiser.performance.activeOffers}</TableCell>
                      <TableCell>{advertiser.performance.totalConversions.toLocaleString()}</TableCell>
                      <TableCell>${advertiser.performance.totalSpend.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewDetails(advertiser)}
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
                              <DropdownMenuItem onClick={() => handleViewDetails(advertiser)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Contact Advertiser
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
                              {advertiser.status === "pending" && (
                                <DropdownMenuItem onClick={() => handleApprove(advertiser)}>
                                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                                  Approve
                                </DropdownMenuItem>
                              )}
                              {advertiser.status === "active" && (
                                <DropdownMenuItem onClick={() => handleSuspend(advertiser)}>
                                  <Ban className="h-4 w-4 mr-2 text-red-600 dark:text-red-400" />
                                  Suspend
                                </DropdownMenuItem>
                              )}
                              {advertiser.status === "suspended" && (
                                <DropdownMenuItem onClick={() => handleReactivate(advertiser)}>
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
                      No advertisers found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Advertiser Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          {selectedAdvertiser && (
            <AdvertiserDetails
              advertiser={selectedAdvertiser}
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

