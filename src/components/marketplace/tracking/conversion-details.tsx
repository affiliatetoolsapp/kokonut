"use client"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface ConversionDetailsProps {
  conversion: any
  onApprove: (conversion: any) => void
  onReject: (conversion: any) => void
  onMarkAsPaid: (conversion: any) => void
}

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

export default function ConversionDetails({ conversion, onApprove, onReject, onMarkAsPaid }: ConversionDetailsProps) {
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

  const renderDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "desktop":
        return <Monitor className="h-4 w-4" />
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">Conversion Details</h2>
          <p className="text-gray-500 dark:text-gray-400">Transaction ID: {conversion.transactionId}</p>
        </div>
        <StatusBadge status={conversion.status} />
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="tracking">Tracking Info</TabsTrigger>
          {conversion.status === "rejected" && <TabsTrigger value="rejection">Rejection</TabsTrigger>}
          {conversion.status === "approved" || conversion.status === "paid" ? (
            <TabsTrigger value="payment">Payment</TabsTrigger>
          ) : null}
        </TabsList>

        <TabsContent value="details" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Conversion Information</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Conversion ID</p>
                  <p className="font-medium">{conversion.id}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                  <p>{formatDate(conversion.date)}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount</p>
                  <p className="font-medium">${conversion.amount.toFixed(2)}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Commission</p>
                  <p className="font-medium">${conversion.commission.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Offer & Affiliate</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Offer</p>
                  <p className="font-medium">{conversion.offerName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ID: {conversion.offerId}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Affiliate</p>
                  <p className="font-medium">{conversion.affiliateName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ID: {conversion.affiliateId}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tracking Link</p>
                  <p className="font-medium">{conversion.trackingLinkName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ID: {conversion.trackingLinkId}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Device Information</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {renderDeviceIcon(conversion.device)}
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Device</p>
                    <p className="font-medium">{conversion.device}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Browser</p>
                  <p className="font-medium">{conversion.browser}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">IP Address</p>
                  <p className="font-medium">{conversion.ipAddress}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</p>
                  <p className="font-medium">{conversion.country}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Tracking URL</h3>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm break-all">
                  {conversion.url || "https://track.affiliate.com/click/" + conversion.trackingLinkId.split("-")[1]}
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open URL
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {conversion.status === "rejected" && (
          <TabsContent value="rejection" className="space-y-6 pt-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Rejection Details</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rejection Date</p>
                  <p>{conversion.rejectedDate ? formatDate(conversion.rejectedDate) : "N/A"}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Reason</p>
                  <p className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-800 dark:text-red-300">
                    {conversion.rejectionReason || "No reason provided"}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        )}

        {(conversion.status === "approved" || conversion.status === "paid") && (
          <TabsContent value="payment" className="space-y-6 pt-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Payment Details</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Approval Date</p>
                  <p>{formatDate(conversion.date)}</p>
                </div>

                {conversion.paidDate && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Date</p>
                    <p>{formatDate(conversion.paidDate)}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Status</p>
                  <StatusBadge status={conversion.status} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Amount</p>
                  <p className="text-xl font-bold">${conversion.commission.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>

      {conversion.status === "pending" && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onReject(conversion)}>
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </Button>
          <Button onClick={() => onApprove(conversion)}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </Button>
        </div>
      )}

      {conversion.status === "approved" && (
        <div className="flex justify-end">
          <Button onClick={() => onMarkAsPaid(conversion)}>
            <DollarSign className="h-4 w-4 mr-2" />
            Mark as Paid
          </Button>
        </div>
      )}
    </div>
  )
}

