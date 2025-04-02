"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CheckCircle,
  AlertCircle,
  Ban,
  Mail,
  ExternalLink,
  Building,
  Phone,
  CreditCard,
  BarChart,
  Package,
} from "lucide-react"

interface AdvertiserDetailsProps {
  advertiser: any
  onApprove: (advertiser: any) => void
  onSuspend: (advertiser: any) => void
  onReactivate: (advertiser: any) => void
}

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

export default function AdvertiserDetails({ advertiser, onApprove, onSuspend, onReactivate }: AdvertiserDetailsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={advertiser.avatar} alt={advertiser.name} />
            <AvatarFallback>{advertiser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{advertiser.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{advertiser.companyName}</p>
            <div className="flex items-center gap-2 mt-1">
              <StatusBadge status={advertiser.status} />
              <Badge
                variant="outline"
                className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800"
              >
                {advertiser.industry}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Mail className="h-4 w-4" />
            Contact
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <BarChart className="h-4 w-4" />
            Analytics
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          {advertiser.status === "suspended" && <TabsTrigger value="suspension">Suspension</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Advertiser Information</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Advertiser ID</p>
                  <p className="font-medium">{advertiser.id}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Joined Date</p>
                  <p>{formatDate(advertiser.joinDate)}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</p>
                  <a
                    href={advertiser.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {advertiser.website}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Industry</p>
                  <p>{advertiser.industry}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Performance Summary</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Active Offers</p>
                  <p className="text-lg font-semibold">{advertiser.performance.activeOffers}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Clicks</p>
                  <p className="text-lg font-semibold">{advertiser.performance.totalClicks.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Conversions</p>
                  <p className="text-lg font-semibold">{advertiser.performance.totalConversions.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Conversion Rate</p>
                  <p className="text-lg font-semibold">{advertiser.performance.conversionRate}</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Total Spend</p>
                  <p className="text-xl font-bold">${advertiser.performance.totalSpend.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="offers" className="space-y-6 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Active Offers</h3>
            <Button size="sm">
              <Package className="h-4 w-4 mr-2" />
              Create New Offer
            </Button>
          </div>

          {advertiser.performance.activeOffers > 0 ? (
            <div className="space-y-3">
              <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Premium VPN Subscription</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">CPA - $45.00</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      >
                        Active
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                      >
                        Featured
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Performance</p>
                    <p className="font-medium">820 conversions</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">$36,900 spent</p>
                  </div>
                </div>
              </div>

              {advertiser.performance.activeOffers > 1 && (
                <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Annual Subscription</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">CPA - $75.00</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        >
                          Active
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Performance</p>
                      <p className="font-medium">350 conversions</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">$26,250 spent</p>
                    </div>
                  </div>
                </div>
              )}

              {advertiser.performance.activeOffers > 2 && (
                <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Mobile App Subscription</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">CPA - $25.00</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        >
                          Active
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Performance</p>
                      <p className="font-medium">250 conversions</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">$6,250 spent</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Active Offers</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                This advertiser doesn't have any active offers yet.
              </p>
              <Button>Create First Offer</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="billing" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Billing Information</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Method</p>
                  <p className="font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    {advertiser.billingInfo.method}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Billing Status</p>
                  <Badge
                    variant="outline"
                    className={
                      advertiser.billingInfo.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }
                  >
                    {advertiser.billingInfo.status}
                  </Badge>
                </div>

                {advertiser.billingInfo.lastBilled && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Billed</p>
                    <p>{formatDate(advertiser.billingInfo.lastBilled)}</p>
                  </div>
                )}

                {advertiser.billingInfo.nextBilling && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Billing</p>
                    <p>{formatDate(advertiser.billingInfo.nextBilling)}</p>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <Button variant="outline" className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  Update Billing Info
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Billing History</h3>

              <div className="space-y-2">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">March 2023 Invoice</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Issued on Mar 1, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$12,500.00</p>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    >
                      Paid
                    </Badge>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">February 2023 Invoice</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Issued on Feb 1, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$10,800.00</p>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    >
                      Paid
                    </Badge>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">January 2023 Invoice</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Issued on Jan 1, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$9,750.00</p>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    >
                      Paid
                    </Badge>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4 gap-2">
                <ExternalLink className="h-4 w-4" />
                View All Invoices
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Primary Contact</h3>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="font-medium text-lg">{advertiser.contactPerson.name}</p>
                <p className="text-gray-500 dark:text-gray-400">{advertiser.contactPerson.position}</p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <a
                      href={`mailto:${advertiser.contactPerson.email}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {advertiser.contactPerson.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <a
                      href={`tel:${advertiser.contactPerson.phone}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {advertiser.contactPerson.phone}
                    </a>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Send Email
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Company Information</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Company Name</p>
                  <p className="font-medium">{advertiser.companyName}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Business Email</p>
                  <p>{advertiser.email}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</p>
                  <a
                    href={advertiser.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {advertiser.website}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Industry</p>
                  <p>{advertiser.industry}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {advertiser.status === "suspended" && (
          <TabsContent value="suspension" className="space-y-6 pt-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Suspension Details</h3>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Reason for Suspension</h4>
                <p className="text-red-700 dark:text-red-400">{advertiser.suspensionReason}</p>
              </div>

              <div className="mt-6">
                <Button onClick={() => onReactivate(advertiser)}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Reactivate Advertiser
                </Button>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>

      {advertiser.status === "pending" && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onSuspend(advertiser)}>
            <Ban className="h-4 w-4 mr-2" />
            Reject
          </Button>
          <Button onClick={() => onApprove(advertiser)}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </Button>
        </div>
      )}

      {advertiser.status === "active" && (
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onSuspend(advertiser)}>
            <Ban className="h-4 w-4 mr-2" />
            Suspend Advertiser
          </Button>
        </div>
      )}
    </div>
  )
}

