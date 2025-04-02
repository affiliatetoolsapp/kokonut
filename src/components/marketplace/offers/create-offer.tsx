"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, Globe, ImagePlus, Info, Loader2, Save, Target, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"

const payoutTypes = [
  { id: "cpa", name: "CPA (Cost Per Action)", description: "Pay per completed action (sale, signup, etc.)" },
  { id: "cpl", name: "CPL (Cost Per Lead)", description: "Pay per lead generated" },
  { id: "cpc", name: "CPC (Cost Per Click)", description: "Pay per click on your offer" },
  { id: "cps", name: "CPS (Cost Per Sale)", description: "Pay a percentage of each sale" },
  { id: "revshare", name: "Revenue Share", description: "Pay a percentage of revenue generated" },
  { id: "cpi", name: "CPI (Cost Per Install)", description: "Pay per app installation" },
]

const categories = [
  "Software",
  "Health & Fitness",
  "Education",
  "Finance",
  "Retail",
  "Gaming",
  "Web Services",
  "Food & Beverage",
  "Travel",
  "Entertainment",
]

const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "UK", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "JP", name: "Japan" },
  { code: "BR", name: "Brazil" },
  { code: "IN", name: "India" },
  { code: "MX", name: "Mexico" },
]

const trafficSources = [
  { id: "search", name: "Search" },
  { id: "social", name: "Social Media" },
  { id: "content", name: "Content/Blogs" },
  { id: "email", name: "Email" },
  { id: "display", name: "Display Ads" },
  { id: "native", name: "Native Ads" },
  { id: "video", name: "Video" },
  { id: "push", name: "Push Notifications" },
  { id: "incentive", name: "Incentivized" },
  { id: "popup", name: "Pop-ups/Pop-unders" },
  { id: "toolbar", name: "Toolbars" },
  { id: "adult", name: "Adult" },
]

export default function CreateOffer() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    payoutType: "",
    payoutValue: "",
    requirements: "",
    allowedCountries: [] as string[],
    allowedTrafficSources: [] as string[],
    prohibitedTrafficSources: [] as string[],
    featured: false,
    status: "active",
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTrafficSourceChange = (sourceId: string, allowed: boolean) => {
    if (allowed) {
      // Add to allowed, remove from prohibited if present
      setFormData((prev) => ({
        ...prev,
        allowedTrafficSources: [...prev.allowedTrafficSources, sourceId],
        prohibitedTrafficSources: prev.prohibitedTrafficSources.filter((id) => id !== sourceId),
      }))
    } else {
      // Add to prohibited, remove from allowed if present
      setFormData((prev) => ({
        ...prev,
        prohibitedTrafficSources: [...prev.prohibitedTrafficSources, sourceId],
        allowedTrafficSources: prev.allowedTrafficSources.filter((id) => id !== sourceId),
      }))
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to offers page
    navigate("/dashboard/offers")
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Offer</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Set up a new offer for affiliates to promote</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 dark:bg-gray-700" />

          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={cn(
                "relative z-10 flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium border",
                currentStep === step
                  ? "bg-purple-600 text-white border-purple-600"
                  : currentStep > step
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white dark:bg-[#1F1F23] text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600",
              )}
            >
              {currentStep > step ? <Check className="h-5 w-5" /> : step}
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-2 text-sm">
          <div className="text-center">Basic Info</div>
          <div className="text-center">Payout</div>
          <div className="text-center">Targeting</div>
          <div className="text-center">Creatives</div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && "Basic Information"}
            {currentStep === 2 && "Payout Details"}
            {currentStep === 3 && "Targeting & Requirements"}
            {currentStep === 4 && "Creatives & Launch"}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Enter the basic details about your offer"}
            {currentStep === 2 && "Set up how affiliates will be paid"}
            {currentStep === 3 && "Define targeting and traffic requirements"}
            {currentStep === 4 && "Upload creatives and prepare to launch"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Offer Title</Label>
                <Input
                  id="title"
                  placeholder="Enter a descriptive title"
                  value={formData.title}
                  onChange={(e) => updateFormData("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your offer in detail"
                  rows={5}
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Clearly explain what your offer is about and why affiliates should promote it.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => updateFormData("featured", checked)}
                />
                <Label htmlFor="featured">Feature this offer (highlighted in marketplace)</Label>
              </div>
            </div>
          )}

          {/* Step 2: Payout Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Payout Type</Label>
                <RadioGroup
                  value={formData.payoutType}
                  onValueChange={(value) => updateFormData("payoutType", value)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {payoutTypes.map((type) => (
                    <div key={type.id} className="flex items-start space-x-2">
                      <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                      <div className="grid gap-1">
                        <Label htmlFor={type.id} className="font-medium">
                          {type.name}
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payoutValue">Payout Value</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="payoutValue"
                    placeholder={
                      formData.payoutType === "cps" || formData.payoutType === "revshare" ? "e.g. 15%" : "e.g. $25.00"
                    }
                    value={formData.payoutValue}
                    onChange={(e) => updateFormData("payoutValue", e.target.value)}
                  />
                  <Select defaultValue="usd">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="percent">Percent (%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formData.payoutType === "cps" || formData.payoutType === "revshare"
                    ? "Enter the percentage of sales or revenue you'll share with affiliates"
                    : "Enter the fixed amount you'll pay per action, lead, click, or install"}
                </p>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex gap-2">
                  <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800 dark:text-amber-300">Payout Tips</h4>
                    <ul className="mt-1 text-sm text-amber-700 dark:text-amber-400 space-y-1 list-disc list-inside">
                      <li>Set competitive rates to attract quality affiliates</li>
                      <li>Consider tiered payouts for high-performing affiliates</li>
                      <li>Be clear about payout terms and conditions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Targeting & Requirements */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-gray-500" />
                  <Label>Geo Targeting</Label>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Select countries where this offer will be available
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {countries.map((country) => (
                    <div key={country.code} className="flex items-center space-x-2">
                      <Checkbox
                        id={`country-${country.code}`}
                        checked={formData.allowedCountries.includes(country.code)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData("allowedCountries", [...formData.allowedCountries, country.code])
                          } else {
                            updateFormData(
                              "allowedCountries",
                              formData.allowedCountries.filter((c) => c !== country.code),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={`country-${country.code}`} className="text-sm">
                        {country.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-gray-500" />
                  <Label>Traffic Sources</Label>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Specify allowed and prohibited traffic sources
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Allowed Sources</h4>
                    <div className="flex flex-wrap gap-2">
                      {trafficSources.map((source) => (
                        <Badge
                          key={source.id}
                          variant="outline"
                          className={cn(
                            "cursor-pointer",
                            formData.allowedTrafficSources.includes(source.id)
                              ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                              : "bg-gray-100 dark:bg-gray-800",
                          )}
                          onClick={() => handleTrafficSourceChange(source.id, true)}
                        >
                          {source.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Prohibited Sources</h4>
                    <div className="flex flex-wrap gap-2">
                      {trafficSources.map((source) => (
                        <Badge
                          key={source.id}
                          variant="outline"
                          className={cn(
                            "cursor-pointer",
                            formData.prohibitedTrafficSources.includes(source.id)
                              ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                              : "bg-gray-100 dark:bg-gray-800",
                          )}
                          onClick={() => handleTrafficSourceChange(source.id, false)}
                        >
                          {source.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="requirements">Additional Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="Enter any additional requirements or restrictions"
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) => updateFormData("requirements", e.target.value)}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Specify any other requirements such as minimum age, specific demographics, etc.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Creatives & Launch */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Upload Banner Images</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Upload banner images for affiliates to use in their promotions
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <div className="flex flex-col items-center justify-center h-40">
                      <ImagePlus className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">300x250 Banner</p>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Image
                      </Button>
                    </div>
                  </div>

                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <div className="flex flex-col items-center justify-center h-40">
                      <ImagePlus className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">728x90 Banner</p>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Promotional Text</Label>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="headline" className="text-sm">
                        Headline
                      </Label>
                      <Input id="headline" placeholder="Enter a catchy headline" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="promo-description" className="text-sm">
                        Description
                      </Label>
                      <Textarea id="promo-description" placeholder="Enter promotional description" rows={3} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cta" className="text-sm">
                        Call to Action
                      </Label>
                      <Input id="cta" placeholder="e.g. 'Start Your Free Trial'" />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Offer Status</Label>
                <RadioGroup
                  defaultValue="active"
                  value={formData.status}
                  onValueChange={(value) => updateFormData("status", value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="active" />
                    <Label htmlFor="active">Active (Live)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pending" id="pending" />
                    <Label htmlFor="pending">Pending (Draft)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paused" id="paused" />
                    <Label htmlFor="paused">Paused</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {currentStep < 4 ? (
            <Button onClick={nextStep}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Offer...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Offer
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

