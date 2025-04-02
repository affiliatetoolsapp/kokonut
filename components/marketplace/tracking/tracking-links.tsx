"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Copy,
  MoreHorizontal,
  Search,
  Filter,
  Plus,
  ExternalLink,
  BarChart,
  Trash2,
  Edit,
  CheckCircle,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { DateRangePicker } from "../analytics/date-range-picker"

// Sample data
const trackingLinks = [
  {
    id: "TL-1234",
    name: "Software Pro - Email Campaign",
    offerId: "OFF-9012",
    offerName: "Software Subscription Pro",
    url: "https://track.affiliate.com/click/1234",
    createdDate: "2023-03-15T10:30:00Z",
    clicks: 1245,
    conversions: 87,
    conversionRate: 6.99,
    revenue: 4350,
    source: "Email",
    status: "active",
  },
  {
    id: "TL-2345",
    name: "Analytics Tool - Blog Post",
    offerId: "OFF-8901",
    offerName: "Marketing Analytics Tool",
    url: "https://track.affiliate.com/click/2345",
    createdDate: "2023-03-14T09:15:00Z",
    clicks: 876,
    conversions: 42,
    conversionRate: 4.79,
    revenue: 2100,
    source: "Blog",
    status: "active",
  },
  {
    id: "TL-3456",
    name: "E-commerce Platform - YouTube",
    offerId: "OFF-7890",
    offerName: "E-commerce Platform",
    url: "https://track.affiliate.com/click/3456",
    createdDate: "2023-03-13T16:45:00Z",
    clicks: 2134,
    conversions: 156,
    conversionRate: 7.31,
    revenue: 7800,
    source: "YouTube",
    status: "active",
  },
  {
    id: "TL-4567",
    name: "Cloud Storage - Social Media",
    offerId: "OFF-6789",
    offerName: "Cloud Storage Service",
    url: "https://track.affiliate.com/click/4567",
    createdDate: "2023-03-16T08:20:00Z",
    clicks: 543,
    conversions: 21,
    conversionRate: 3.87,
    revenue: 1050,
    source: "Social Media",
    status: "paused",
  },
  {
    id: "TL-5678",
    name: "Project Management - Webinar",
    offerId: "OFF-5678",
    offerName: "Project Management Software",
    url: "https://track.affiliate.com/click/5678",
    createdDate: "2023-03-12T13:40:00Z",
    clicks: 321,
    conversions: 18,
    conversionRate: 5.61,
    revenue: 900,
    source: "Webinar",
    status: "active",
  },
]

// Sample offers for dropdown
const offers = [
  { id: "OFF-9012", name: "Software Subscription Pro" },
  { id: "OFF-8901", name: "Marketing Analytics Tool" },
  { id: "OFF-7890", name: "E-commerce Platform" },
  { id: "OFF-6789", name: "Cloud Storage Service" },
  { id: "OFF-5678", name: "Project Management Software" },
]

// Sample sources for dropdown
const sources = [
  { id: "email", name: "Email" },
  { id: "blog", name: "Blog" },
  { id: "social", name: "Social Media" },
  { id: "youtube", name: "YouTube" },
  { id: "webinar", name: "Webinar" },
  { id: "podcast", name: "Podcast" },
  { id: "ppc", name: "PPC/Ads" },
  { id: "other", name: "Other" },
]

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  paused: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  archived: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
}

interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

export default function TrackingLinks() {
  const [searchTerm, setSearchTerm] = useState("")
  const [offerFilter, setOfferFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newLink, setNewLink] = useState({
    name: "",
    offerId: "",
    source: "",
    customParams: "",
  })

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  // Filter tracking links based on search term and filters
  const filteredLinks = trackingLinks.filter((link) => {
    const matchesSearch =
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.offerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesOffer = offerFilter === "all" || link.offerId === offerFilter
    const matchesSource = sourceFilter === "all" || link.source.toLowerCase() === sourceFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || link.status === statusFilter

    return matchesSearch && matchesOffer && matchesSource && matchesStatus
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "Link copied",
      description: "Tracking link copied to clipboard",
    })
  }

  const handleCreateLink = () => {
    // In a real app, this would make an API call to create the link
    toast({
      title: "Link created",
      description: `Created tracking link: ${newLink.name}`,
    })
    setIsCreateDialogOpen(false)
    setNewLink({
      name: "",
      offerId: "",
      source: "",
      customParams: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Tracking Link
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Tracking Link</DialogTitle>
              <DialogDescription>Generate a new tracking link for your affiliate campaigns.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link-name" className="text-right">
                  Link Name
                </Label>
                <Input
                  id="link-name"
                  placeholder="E.g., Summer Email Campaign"
                  className="col-span-3"
                  value={newLink.name}
                  onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="offer" className="text-right">
                  Offer
                </Label>
                <Select value={newLink.offerId} onValueChange={(value) => setNewLink({ ...newLink, offerId: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select an offer" />
                  </SelectTrigger>
                  <SelectContent>
                    {offers.map((offer) => (
                      <SelectItem key={offer.id} value={offer.id}>
                        {offer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="source" className="text-right">
                  Traffic Source
                </Label>
                <Select value={newLink.source} onValueChange={(value) => setNewLink({ ...newLink, source: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a source" />
                  </SelectTrigger>
                  <SelectContent>
                    {sources.map((source) => (
                      <SelectItem key={source.id} value={source.id}>
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="custom-params" className="text-right">
                  Custom Parameters
                </Label>
                <Input
                  id="custom-params"
                  placeholder="E.g., utm_campaign=summer"
                  className="col-span-3"
                  value={newLink.customParams}
                  onChange={(e) => setNewLink({ ...newLink, customParams: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateLink} disabled={!newLink.name || !newLink.offerId || !newLink.source}>
                Create Link
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Tracking Links</CardTitle>
          <CardDescription>Manage and monitor your affiliate tracking links</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search links..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={offerFilter} onValueChange={setOfferFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by offer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Offers</SelectItem>
                  {offers.map((offer) => (
                    <SelectItem key={offer.id} value={offer.id}>
                      {offer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {sources.map((source) => (
                    <SelectItem key={source.id} value={source.id}>
                      {source.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Offer</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Conv.</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLinks.length > 0 ? (
                  filteredLinks.map((link) => (
                    <TableRow key={link.id}>
                      <TableCell className="font-medium">{link.name}</TableCell>
                      <TableCell>{link.offerName}</TableCell>
                      <TableCell>{link.source}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(statusColors[link.status as keyof typeof statusColors])}>
                          {link.status.charAt(0).toUpperCase() + link.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{link.clicks.toLocaleString()}</TableCell>
                      <TableCell>{link.conversions.toLocaleString()}</TableCell>
                      <TableCell>{link.conversionRate.toFixed(2)}%</TableCell>
                      <TableCell>${link.revenue.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleCopyLink(link.url)}
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy Link</span>
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
                              <DropdownMenuItem onClick={() => handleCopyLink(link.url)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Link
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BarChart className="h-4 w-4 mr-2" />
                                View Stats
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Open Link
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Link
                              </DropdownMenuItem>
                              {link.status === "active" ? (
                                <DropdownMenuItem>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Pause Link
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Activate Link
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Link
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No tracking links found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Link Performance</CardTitle>
              <CardDescription>Track the performance of your links over time</CardDescription>
            </div>
            <DateRangePicker date={dateRange} onDateChange={setDateRange} />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="clicks">
            <TabsList className="mb-4">
              <TabsTrigger value="clicks">Clicks</TabsTrigger>
              <TabsTrigger value="conversions">Conversions</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>

            <TabsContent value="clicks">
              <div className="h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Click chart will be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="conversions">
              <div className="h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Conversion chart will be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="revenue">
              <div className="h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Revenue chart will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

