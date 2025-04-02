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
import { DateRangePicker } from "@/components/marketplace/analytics/date-range-picker"
import {
  MoreHorizontal,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  Eye,
  ExternalLink,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import ConversionDetails from "./conversion-details"
import type { DateRange } from "react-day-picker"

// Sample data
const conversions = [
  {
    id: "CONV-1234",
    transactionId: "TRX-9876",
    affiliateId: "AFF-5678",
    affiliateName: "John Smith",
    offerId: "OFF-9012",
    offerName: "Software Subscription Pro",
    amount: 49.99,
    commission: 15.0,
    status: "approved",
    date: "2023-03-15T10:30:00Z",
    ipAddress: "192.168.1.1",
    trackingLinkId: "TL-1234",
    trackingLinkName: "Software Pro - Email Campaign",
    country: "United States",
    device: "Desktop",
    browser: "Chrome",
    paidDate: "2023-04-15T10:30:00Z",
  },
  {
    id: "CONV-2345",
    transactionId: "TRX-8765",
    affiliateId: "AFF-6789",
    affiliateName: "Sarah Johnson",
    offerId: "OFF-8901",
    offerName: "Marketing Analytics Tool",
    amount: 99.99,
    commission: 25.0,
    status: "pending",
    date: "2023-03-16T09:15:00Z",
    ipAddress: "192.168.1.2",
    trackingLinkId: "TL-2345",
    trackingLinkName: "Analytics Tool - Blog Post",
    country: "Canada",
    device: "Mobile",
    browser: "Safari",
  },
  {
    id: "CONV-3456",
    transactionId: "TRX-7654",
    affiliateId: "AFF-7890",
    affiliateName: "Michael Brown",
    offerId: "OFF-7890",
    offerName: "E-commerce Platform",
    amount: 199.99,
    commission: 40.0,
    status: "rejected",
    date: "2023-03-14T16:45:00Z",
    ipAddress: "192.168.1.3",
    trackingLinkId: "TL-3456",
    trackingLinkName: "E-commerce Platform - YouTube",
    country: "United Kingdom",
    device: "Desktop",
    browser: "Firefox",
    rejectionReason: "Duplicate conversion",
  },
  {
    id: "CONV-4567",
    transactionId: "TRX-6543",
    affiliateId: "AFF-8901",
    affiliateName: "Emily Davis",
    offerId: "OFF-6789",
    offerName: "Cloud Storage Service",
    amount: 29.99,
    commission: 7.5,
    status: "approved",
    date: "2023-03-17T08:20:00Z",
    ipAddress: "192.168.1.4",
    trackingLinkId: "TL-4567",
    trackingLinkName: "Cloud Storage - Social Media",
    country: "Australia",
    device: "Tablet",
    browser: "Chrome",
    paidDate: "2023-04-15T10:30:00Z",
  },
  {
    id: "CONV-5678",
    transactionId: "TRX-5432",
    affiliateId: "AFF-9012",
    affiliateName: "David Wilson",
    offerId: "OFF-5678",
    offerName: "Project Management Software",
    amount: 79.99,
    commission: 20.0,
    status: "approved",
    date: "2023-03-13T13:40:00Z",
    ipAddress: "192.168.1.5",
    trackingLinkId: "TL-5678",
    trackingLinkName: "Project Management - Webinar",
    country: "Germany",
    device: "Desktop",
    browser: "Edge",
    paidDate: "2023-04-15T10:30:00Z",
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "approved":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/30">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved
        </Badge>
      )
    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/30">
          <XCircle className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      )
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/30">
          <AlertCircle className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      )
    case "paid":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/30">
          <DollarSign className="h-3 w-3 mr-1" />
          Paid
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

export default function ConversionsTracker() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [offerFilter, setOfferFilter] = useState("all")
  const [affiliateFilter, setAffiliateFilter] = useState("all")
  const [selectedConversion, setSelectedConversion] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  // Filter conversions based on search term, status, and date range
  const filteredConversions = conversions.filter((conv) => {
    const matchesSearch =
      conv.affiliateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.offerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.transactionId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || conv.status === statusFilter
    const matchesOffer = offerFilter === "all" || conv.offerId === offerFilter
    const matchesAffiliate = affiliateFilter === "all" || conv.affiliateId === affiliateFilter

    const convDate = new Date(conv.date)
    const matchesDateRange =
      (!dateRange.from || convDate >= dateRange.from) && (!dateRange.to || convDate <= dateRange.to)

    return matchesSearch && matchesStatus && matchesOffer && matchesAffiliate && matchesDateRange
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Calculate totals
  const totalAmount = filteredConversions.reduce((sum, conv) => sum + conv.amount, 0)
  const totalCommission = filteredConversions.reduce((sum, conv) => sum + conv.commission, 0)
  const approvedCount = filteredConversions.filter((conv) => conv.status === "approved").length
  const pendingCount = filteredConversions.filter((conv) => conv.status === "pending").length
  const rejectedCount = filteredConversions.filter((conv) => conv.status === "rejected").length

  const handleViewDetails = (conversion: any) => {
    setSelectedConversion(conversion)
    setIsDetailsOpen(true)
  }

  const handleApprove = (conversion: any) => {
    // In a real app, this would make an API call to approve the conversion
    toast({
      title: "Conversion approved",
      description: `Conversion ${conversion.id} has been approved`,
    })
  }

  const handleReject = (conversion: any) => {
    // In a real app, this would make an API call to reject the conversion
    toast({
      title: "Conversion rejected",
      description: `Conversion ${conversion.id} has been rejected`,
    })
  }

  const handleMarkAsPaid = (conversion: any) => {
    // In a real app, this would make an API call to mark the conversion as paid
    toast({
      title: "Conversion marked as paid",
      description: `Conversion ${conversion.id} has been marked as paid`,
    })
  }

  // Get unique offers and affiliates for filters
  const uniqueOffers = Array.from(new Set(conversions.map((conv) => conv.offerId))).map((offerId) => {
    const offer = conversions.find((conv) => conv.offerId === offerId)
    return { id: offerId, name: offer?.offerName || "" }
  })

  const uniqueAffiliates = Array.from(new Set(conversions.map((conv) => conv.affiliateId))).map((affiliateId) => {
    const affiliate = conversions.find((conv) => conv.affiliateId === affiliateId)
    return { id: affiliateId, name: affiliate?.affiliateName || "" }
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">For selected period</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCommission.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">For selected period</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <div className="text-xs text-muted-foreground">Conversions</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <div className="text-xs text-muted-foreground">Conversions</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
            <div className="text-xs text-muted-foreground">Conversions</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Conversions</CardTitle>
              <CardDescription>Track and manage all conversions from your affiliate links</CardDescription>
            </div>
            <DateRangePicker date={dateRange} onDateChange={setDateRange} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search conversions..."
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
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>

              <Select value={offerFilter} onValueChange={setOfferFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by offer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Offers</SelectItem>
                  {uniqueOffers.map((offer) => (
                    <SelectItem key={offer.id} value={offer.id}>
                      {offer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={affiliateFilter} onValueChange={setAffiliateFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by affiliate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Affiliates</SelectItem>
                  {uniqueAffiliates.map((affiliate) => (
                    <SelectItem key={affiliate.id} value={affiliate.id}>
                      {affiliate.name}
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
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Affiliate</TableHead>
                  <TableHead>Offer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConversions.length > 0 ? (
                  filteredConversions.map((conversion) => (
                    <TableRow key={conversion.id}>
                      <TableCell className="font-medium">{conversion.transactionId}</TableCell>
                      <TableCell>{conversion.affiliateName}</TableCell>
                      <TableCell>{conversion.offerName}</TableCell>
                      <TableCell>${conversion.amount.toFixed(2)}</TableCell>
                      <TableCell>${conversion.commission.toFixed(2)}</TableCell>
                      <TableCell>{formatDate(conversion.date)}</TableCell>
                      <TableCell>
                        <StatusBadge status={conversion.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewDetails(conversion)}
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
                              <DropdownMenuItem onClick={() => handleViewDetails(conversion)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Transaction
                              </DropdownMenuItem>
                              {conversion.status === "pending" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleApprove(conversion)}>
                                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleReject(conversion)}>
                                    <XCircle className="h-4 w-4 mr-2 text-red-600 dark:text-red-400" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              {conversion.status === "approved" && (
                                <DropdownMenuItem onClick={() => handleMarkAsPaid(conversion)}>
                                  <DollarSign className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                                  Mark as Paid
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
                      No conversions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          {selectedConversion && (
            <ConversionDetails
              conversion={selectedConversion}
              onApprove={handleApprove}
              onReject={handleReject}
              onMarkAsPaid={handleMarkAsPaid}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

