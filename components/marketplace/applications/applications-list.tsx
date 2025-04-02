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
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle, Clock, MoreHorizontal, Search, Filter, Eye, Mail, AlertTriangle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import ApplicationDetails from "./application-details"

// Sample data
const applications = [
  {
    id: "APP-1234",
    affiliateId: "AFF-5678",
    affiliateName: "John Smith",
    affiliateAvatar: "/placeholder.svg?height=40&width=40",
    affiliateEmail: "john.smith@example.com",
    offerId: "OFF-9012",
    offerName: "Premium VPN Subscription",
    advertiser: "SecureNet VPN",
    status: "pending",
    appliedDate: "2023-03-15T10:30:00Z",
    notes:
      "I have a tech blog with 50k monthly visitors and a newsletter with 15k subscribers. I'd like to promote your VPN service to my audience who are tech-savvy and privacy-conscious.",
    website: "https://techblog.example.com",
    socialProfiles: {
      twitter: "@johnsmith",
      instagram: "@johnsmith_tech",
    },
    trafficSources: ["Blog", "Email Newsletter", "Social Media"],
    previousResults: "Generated 200+ conversions for similar products in the past 3 months.",
  },
  {
    id: "APP-2345",
    affiliateId: "AFF-6789",
    affiliateName: "Sarah Johnson",
    affiliateAvatar: "/placeholder.svg?height=40&width=40",
    affiliateEmail: "sarah.johnson@example.com",
    offerId: "OFF-8901",
    offerName: "Fitness App Free Trial",
    advertiser: "FitLife Pro",
    status: "approved",
    appliedDate: "2023-03-14T09:15:00Z",
    approvedDate: "2023-03-16T14:20:00Z",
    notes:
      "I run a fitness Instagram account with 75k followers and a YouTube channel with 30k subscribers. I create workout and nutrition content and would love to promote your app.",
    website: "https://sarahfitness.example.com",
    socialProfiles: {
      youtube: "@sarahfitness",
      instagram: "@sarah_fitness",
    },
    trafficSources: ["YouTube", "Instagram", "Blog"],
    previousResults: "My last fitness app promotion resulted in 350 signups.",
  },
  {
    id: "APP-3456",
    affiliateId: "AFF-7890",
    affiliateName: "Michael Brown",
    affiliateAvatar: "/placeholder.svg?height=40&width=40",
    affiliateEmail: "michael.brown@example.com",
    offerId: "OFF-7890",
    offerName: "Online Course Bundle",
    advertiser: "EduMasters",
    status: "rejected",
    appliedDate: "2023-03-13T16:45:00Z",
    rejectedDate: "2023-03-15T11:10:00Z",
    rejectionReason: "Website doesn't meet our quality standards and traffic volume is too low.",
    notes: "I have a small blog about learning and education. I'd like to promote your courses to my audience.",
    website: "https://learnwithmike.example.com",
    socialProfiles: {
      twitter: "@mike_learns",
    },
    trafficSources: ["Blog", "Twitter"],
    previousResults: "New to affiliate marketing, no previous results yet.",
  },
  {
    id: "APP-4567",
    affiliateId: "AFF-8901",
    affiliateName: "Emily Davis",
    affiliateAvatar: "/placeholder.svg?height=40&width=40",
    affiliateEmail: "emily.davis@example.com",
    offerId: "OFF-6789",
    offerName: "Cloud Storage Service",
    advertiser: "CloudHost Pro",
    status: "pending",
    appliedDate: "2023-03-16T08:20:00Z",
    notes:
      "I run a tech review YouTube channel with 100k subscribers. I focus on software reviews and tutorials and would like to create a dedicated video about your cloud storage service.",
    website: "https://emilytechtips.example.com",
    socialProfiles: {
      youtube: "@emilytechtips",
      twitter: "@emily_tech",
    },
    trafficSources: ["YouTube", "Blog", "Email Newsletter"],
    previousResults: "My tech product reviews typically generate 50-100 conversions per video.",
  },
  {
    id: "APP-5678",
    affiliateId: "AFF-9012",
    affiliateName: "David Wilson",
    affiliateAvatar: "/placeholder.svg?height=40&width=40",
    affiliateEmail: "david.wilson@example.com",
    offerId: "OFF-5678",
    offerName: "Project Management Software",
    advertiser: "TaskMaster Pro",
    status: "approved",
    appliedDate: "2023-03-12T13:40:00Z",
    approvedDate: "2023-03-14T10:30:00Z",
    notes:
      "I create content for entrepreneurs and small business owners. My audience is always looking for tools to improve productivity and streamline their operations.",
    website: "https://businesswithDavid.example.com",
    socialProfiles: {
      linkedin: "davidwilson",
      youtube: "@davidwilsonbiz",
    },
    trafficSources: ["LinkedIn", "YouTube", "Podcast", "Email Newsletter"],
    previousResults: "Generated over $50,000 in affiliate commissions last year from similar B2B SaaS products.",
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
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

export default function ApplicationsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")

  // Filter applications based on search term and status
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.affiliateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.offerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter

    return matchesSearch && matchesStatus
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

  const handleViewDetails = (application: any) => {
    setSelectedApplication(application)
    setIsDetailsOpen(true)
  }

  const handleApprove = (application: any) => {
    // In a real app, this would make an API call to approve the application
    toast({
      title: "Application approved",
      description: `You have approved ${application.affiliateName}'s application for ${application.offerName}`,
    })
  }

  const handleOpenRejectDialog = (application: any) => {
    setSelectedApplication(application)
    setRejectionReason("")
    setIsRejectDialogOpen(true)
  }

  const handleReject = () => {
    // In a real app, this would make an API call to reject the application
    if (!rejectionReason.trim()) {
      toast({
        title: "Rejection reason required",
        description: "Please provide a reason for rejecting this application",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Application rejected",
      description: `You have rejected ${selectedApplication.affiliateName}'s application`,
    })

    setIsRejectDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>Review and manage affiliate applications to your offers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search applications..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Affiliate</TableHead>
                  <TableHead>Offer</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={application.affiliateAvatar} alt={application.affiliateName} />
                            <AvatarFallback>{application.affiliateName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{application.affiliateName}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{application.affiliateEmail}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.offerName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{application.advertiser}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(application.appliedDate)}</TableCell>
                      <TableCell>
                        <StatusBadge status={application.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewDetails(application)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Button>

                          {application.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20"
                                onClick={() => handleApprove(application)}
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span className="sr-only">Approve</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                                onClick={() => handleOpenRejectDialog(application)}
                              >
                                <XCircle className="h-4 w-4" />
                                <span className="sr-only">Reject</span>
                              </Button>
                            </>
                          )}

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewDetails(application)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Contact Affiliate
                              </DropdownMenuItem>
                              {application.status === "pending" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleApprove(application)}>
                                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleOpenRejectDialog(application)}>
                                    <XCircle className="h-4 w-4 mr-2 text-red-600 dark:text-red-400" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No applications found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Application Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          {selectedApplication && (
            <ApplicationDetails
              application={selectedApplication}
              onApprove={handleApprove}
              onReject={handleOpenRejectDialog}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this application. This will be shared with the affiliate.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <p className="text-sm text-amber-500">
                This action cannot be undone. The affiliate will be notified of your decision.
              </p>
            </div>
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

