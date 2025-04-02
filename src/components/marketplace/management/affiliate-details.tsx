"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CheckCircle,
  AlertCircle,
  Ban,
  Globe,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  ExternalLink,
  DollarSign,
  CreditCard,
  BarChart,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AffiliateDetailsProps {
  affiliate: any
  onApprove: (affiliate: any) => void
  onSuspend: (affiliate: any) => void
  onReactivate: (affiliate: any) => void
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

export default function AffiliateDetails({ affiliate, onApprove, onSuspend, onReactivate }: AffiliateDetailsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "youtube":
        return <Youtube className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={affiliate.avatar} alt={affiliate.name} />
            <AvatarFallback>{affiliate.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{affiliate.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{affiliate.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <StatusBadge status={affiliate.status} />
              <Badge
                variant="outline"
                className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800"
              >
                {affiliate.tier}
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
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          {affiliate.status === "suspended" && <TabsTrigger value="suspension">Suspension</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Affiliate Information</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Affiliate ID</p>
                  <p className="font-medium">{affiliate.id}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Joined Date</p>
                  <p>{formatDate(affiliate.joinDate)}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</p>
                  <a
                    href={affiliate.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {affiliate.website}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {affiliate.socialProfiles && Object.keys(affiliate.socialProfiles).length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Social Profiles</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {Object.entries(affiliate.socialProfiles).map(([platform, handle]) => (
                        <Badge key={platform} variant="outline" className="flex items-center gap-1">
                          {renderSocialIcon(platform)}
                          <span>{handle}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Traffic Sources</h3>

              {affiliate.trafficSources && affiliate.trafficSources.length > 0 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {affiliate.trafficSources.map((source: string) => (
                      <Badge key={source} variant="secondary">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <h3 className="text-lg font-semibold mt-6 mb-2">Performance Summary</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Clicks</p>
                  <p className="text-lg font-semibold">{affiliate.performance.clicks.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Conversions</p>
                  <p className="text-lg font-semibold">{affiliate.performance.conversions.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Revenue</p>
                  <p className="text-lg font-semibold">${affiliate.performance.revenue.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">EPC</p>
                  <p className="text-lg font-semibold">{affiliate.performance.epc}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{affiliate.performance.convRate}</div>
                <div className="text-xs text-muted-foreground">Clicks to conversions</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${affiliate.performance.revenue.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">All time</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Earnings Per Click</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{affiliate.performance.epc}</div>
                <div className="text-xs text-muted-foreground">Average</div>
              </CardContent>
            </Card>
          </div>

          <div className="h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Performance chart will be displayed here</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Top Performing Offers</h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">Premium VPN Subscription</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SecureNet VPN</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(affiliate.performance.revenue * 0.4).toFixed(2)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">120 conversions</p>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">Marketing Analytics Tool</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">DataInsight Pro</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(affiliate.performance.revenue * 0.3).toFixed(2)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">95 conversions</p>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">Cloud Storage Service</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">CloudSafe</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(affiliate.performance.revenue * 0.2).toFixed(2)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">65 conversions</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Traffic Sources Performance</h3>
              <div className="space-y-2">
                {affiliate.trafficSources &&
                  affiliate.trafficSources.map((source: string, index: number) => {
                    // Calculate mock values based on index
                    const percentage = 80 - index * 15
                    const clicks = Math.floor(affiliate.performance.clicks * (percentage / 100))
                    const conversions = Math.floor(affiliate.performance.conversions * (percentage / 100))

                    return (
                      <div key={source} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <p className="font-medium">{source}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{percentage}% of traffic</p>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>{clicks.toLocaleString()} clicks</span>
                          <span>{conversions.toLocaleString()} conversions</span>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Payment Information</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Method</p>
                  <p className="font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    {affiliate.paymentInfo.method}
                  </p>
                </div>

                {affiliate.paymentInfo.email && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Email</p>
                    <p>{affiliate.paymentInfo.email}</p>
                  </div>
                )}

                {affiliate.paymentInfo.accountName && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Name</p>
                    <p>{affiliate.paymentInfo.accountName}</p>
                  </div>
                )}

                {affiliate.paymentInfo.lastPaid && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Payment Date</p>
                    <p>{formatDate(affiliate.paymentInfo.lastPaid)}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Amount</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    ${affiliate.paymentInfo.pendingAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              {affiliate.paymentInfo.pendingAmount > 0 && (
                <Button className="mt-4 gap-2">
                  <DollarSign className="h-4 w-4" />
                  Process Payment
                </Button>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Payment History</h3>

              <div className="space-y-2">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">March 2023 Payout</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Processed on Apr 5, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$1,250.00</p>
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
                    <p className="font-medium">February 2023 Payout</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Processed on Mar 5, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$980.00</p>
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
                    <p className="font-medium">January 2023 Payout</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Processed on Feb 5, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$1,120.00</p>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    >
                      Paid
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {affiliate.status === "suspended" && (
          <TabsContent value="suspension" className="space-y-6 pt-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Suspension Details</h3>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Reason for Suspension</h4>
                <p className="text-red-700 dark:text-red-400">{affiliate.suspensionReason}</p>
              </div>

              <div className="mt-6">
                <Button onClick={() => onReactivate(affiliate)}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Reactivate Affiliate
                </Button>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>

      {affiliate.status === "pending" && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onSuspend(affiliate)}>
            <Ban className="h-4 w-4 mr-2" />
            Reject
          </Button>
          <Button onClick={() => onApprove(affiliate)}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </Button>
        </div>
      )}

      {affiliate.status === "active" && (
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onSuspend(affiliate)}>
            <Ban className="h-4 w-4 mr-2" />
            Suspend Affiliate
          </Button>
        </div>
      )}
    </div>
  )
}

