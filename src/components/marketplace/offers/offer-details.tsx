import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Calendar, Clock, Copy, ExternalLink, Globe, LinkIcon, Shield, Tag, Target, User } from "lucide-react"
import { DialogFooter } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface Offer {
  id: string
  title: string
  advertiser: string
  category: string
  payoutType: string
  payoutValue: string
  status: string
  epc: string
  conversionRate: string
  description: string
  requirements: string
  imageUrl: string
  featured: boolean
  createdAt: string
}

interface OfferDetailsProps {
  offer: Offer
}

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

export default function OfferDetails({ offer }: OfferDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-[#1F1F23]">
            <img
              src={offer.imageUrl || "/placeholder.svg"}
              alt={offer.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="md:w-2/3 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{offer.title}</h2>
              <p className="text-gray-500 dark:text-gray-400">{offer.advertiser}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className={cn(statusColors[offer.status as keyof typeof statusColors])}>
                {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
              </Badge>
              {offer.featured && (
                <Badge
                  variant="outline"
                  className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                >
                  Featured
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Payout</div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn("w-fit", payoutTypeColors[offer.payoutType as keyof typeof payoutTypeColors])}
                >
                  {offer.payoutType}
                </Badge>
                <span className="font-medium">{offer.payoutValue}</span>
              </div>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Category</div>
              <div className="font-medium flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5" />
                {offer.category}
              </div>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">EPC</div>
              <div className="font-medium">{offer.epc}</div>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Conv. Rate</div>
              <div className="font-medium">{offer.conversionRate}</div>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>Added: {offer.createdAt}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>ID: {offer.id}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button className="gap-2">
              <LinkIcon className="h-4 w-4" />
              Get Tracking Link
            </Button>
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Preview Offer
            </Button>
            <Button variant="outline" className="gap-2">
              <Copy className="h-4 w-4" />
              Copy Offer ID
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="creatives">Creatives</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="p-4 border rounded-lg mt-2">
          <h3 className="text-lg font-medium mb-2">Description</h3>
          <p className="text-gray-700 dark:text-gray-300">{offer.description}</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Target Audience
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>Age: 18-45</li>
                <li>Interest: Technology, Privacy, Security</li>
                <li>Device: All devices</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Geo Targeting
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>Allowed: US, UK, CA, AU, EU</li>
                <li>Restricted: All other countries</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4" />
              Conversion Flow
            </h4>
            <div className="bg-gray-50 dark:bg-[#1F1F23] p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300">
              <ol className="list-decimal list-inside space-y-1">
                <li>User clicks tracking link</li>
                <li>User signs up for free trial (valid email required)</li>
                <li>User completes email verification</li>
                <li>Conversion is tracked and commission is paid</li>
              </ol>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="requirements" className="p-4 border rounded-lg mt-2">
          <h3 className="text-lg font-medium mb-2">Offer Requirements</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{offer.requirements}</p>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Allowed Traffic Sources
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20">
                  Search
                </Badge>
                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20">
                  Social Media
                </Badge>
                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20">
                  Content
                </Badge>
                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20">
                  Email
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-500" />
                Prohibited Traffic Sources
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-red-50 dark:bg-red-900/20">
                  Incentivized
                </Badge>
                <Badge variant="outline" className="bg-red-50 dark:bg-red-900/20">
                  Adult
                </Badge>
                <Badge variant="outline" className="bg-red-50 dark:bg-red-900/20">
                  Pop-ups
                </Badge>
                <Badge variant="outline" className="bg-red-50 dark:bg-red-900/20">
                  Toolbar
                </Badge>
              </div>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-sm text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              <p className="font-medium">Important Notes:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>30-day cookie window</li>
                <li>Commissions are paid on the 15th of each month</li>
                <li>All traffic must comply with our terms of service</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="creatives" className="p-4 border rounded-lg mt-2">
          <h3 className="text-lg font-medium mb-4">Marketing Creatives</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="p-3 border-b bg-gray-50 dark:bg-[#1F1F23] flex justify-between items-center">
                <span className="text-sm font-medium">Banner 300x250</span>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </Button>
              </div>
              <div className="p-4 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=250&width=300"
                  alt="Banner 300x250"
                  className="border"
                />
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="p-3 border-b bg-gray-50 dark:bg-[#1F1F23] flex justify-between items-center">
                <span className="text-sm font-medium">Banner 728x90</span>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </Button>
              </div>
              <div className="p-4 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=90&width=728"
                  alt="Banner 728x90"
                  className="border"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">Promotional Text</h4>
            <div className="p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-lg text-sm text-gray-700 dark:text-gray-300 border">
              <p className="mb-2">
                <strong>Headline:</strong> "Secure Your Online Privacy Today!"
              </p>
              <p className="mb-2">
                <strong>Description:</strong> "Get complete online privacy with our premium VPN service. Protect your
                data, access geo-restricted content, and browse anonymously with military-grade encryption."
              </p>
              <p>
                <strong>CTA:</strong> "Start Your Free Trial Now"
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <Separator />
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Apply Now</Button>
      </DialogFooter>
    </div>
  )
}

