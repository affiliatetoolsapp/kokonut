"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Mail,
  Globe,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react"

interface ApplicationDetailsProps {
  application: any
  onApprove: (application: any) => void
  onReject: (application: any) => void
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
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

export default function ApplicationDetails({ application, onApprove, onReject }: ApplicationDetailsProps) {
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
            <AvatarImage src={application.affiliateAvatar} alt={application.affiliateName} />
            <AvatarFallback>{application.affiliateName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{application.affiliateName}</h2>
            <p className="text-gray-500 dark:text-gray-400">{application.affiliateEmail}</p>
          </div>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Application Details</h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Offer</p>
              <p className="font-medium">{application.offerName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{application.advertiser}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Applied Date</p>
              <p>{formatDate(application.appliedDate)}</p>
            </div>

            {application.status === "approved" && application.approvedDate && (
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Approved Date</p>
                <p>{formatDate(application.approvedDate)}</p>
              </div>
            )}

            {application.status === "rejected" && application.rejectedDate && (
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rejected Date</p>
                <p>{formatDate(application.rejectedDate)}</p>
              </div>
            )}

            {application.status === "rejected" && application.rejectionReason && (
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rejection Reason</p>
                <p className="text-red-600 dark:text-red-400">{application.rejectionReason}</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Affiliate Information</h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</p>
              <a
                href={application.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
              >
                {application.website}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {application.socialProfiles && Object.keys(application.socialProfiles).length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Social Profiles</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {Object.entries(application.socialProfiles).map(([platform, handle]) => (
                    <Badge key={platform} variant="outline" className="flex items-center gap-1">
                      {renderSocialIcon(platform)}
                      <span>{handle}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {application.trafficSources && application.trafficSources.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Traffic Sources</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {application.trafficSources.map((source: string) => (
                    <Badge key={source} variant="secondary">
                      {source}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {application.previousResults && (
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Previous Results</p>
                <p>{application.previousResults}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Application Notes</h3>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p>{application.notes}</p>
        </div>
      </div>

      {application.status === "pending" && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onReject(application)}>
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </Button>
          <Button onClick={() => onApprove(application)}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </Button>
        </div>
      )}

      {application.status !== "pending" && (
        <div className="flex justify-end">
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Contact Affiliate
          </Button>
        </div>
      )}
    </div>
  )
}

