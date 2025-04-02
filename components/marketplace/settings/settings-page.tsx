"use client"

import { TableCell } from "@/components/ui/table"

import { TableBody } from "@/components/ui/table"

import { TableHead } from "@/components/ui/table"

import { TableRow } from "@/components/ui/table"

import { TableHeader } from "@/components/ui/table"

import { Table } from "@/components/ui/table"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Key,
  Copy,
  Save,
  Upload,
  Lock,
  Globe,
  Smartphone,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [profileForm, setProfileForm] = useState({
    name: "Admin User",
    email: "admin@example.com",
    company: "AffiliateHub Inc.",
    bio: "Platform administrator managing affiliate and advertiser relationships.",
    website: "https://affiliatehub.com",
    timezone: "America/New_York",
  })

  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNewAffiliate: true,
    emailNewAdvertiser: true,
    emailNewApplication: true,
    emailNewConversion: false,
    emailPaymentProcessed: true,
    emailSystemUpdates: true,
    browserNewAffiliate: true,
    browserNewAdvertiser: true,
    browserNewApplication: true,
    browserNewConversion: true,
    browserPaymentProcessed: true,
    browserSystemUpdates: false,
  })

  const [apiKeys, setApiKeys] = useState([
    {
      id: "key_live_1234567890",
      name: "Production API Key",
      type: "live",
      created: "2023-01-15T10:30:00Z",
      lastUsed: "2023-03-15T14:22:00Z",
    },
    {
      id: "key_test_0987654321",
      name: "Test API Key",
      type: "test",
      created: "2023-01-15T10:35:00Z",
      lastUsed: "2023-03-10T09:15:00Z",
    },
  ])

  const handleProfileUpdate = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated",
    })
  }

  const handlePasswordUpdate = () => {
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Password updated",
      description: "Your password has been updated successfully",
    })

    setSecurityForm({
      ...securityForm,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleCopyApiKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "API key copied",
      description: "API key copied to clipboard",
    })
  }

  const handleCreateApiKey = () => {
    toast({
      title: "New API key created",
      description: "Your new API key has been created",
    })
  }

  const handleRevokeApiKey = (keyId: string) => {
    toast({
      title: "API key revoked",
      description: "The API key has been revoked",
    })
  }

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

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="h-4 w-4 mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                    <AvatarFallback>AU</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Change Avatar
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profileForm.company}
                      onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={3}
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <Input
                      id="website"
                      value={profileForm.website}
                      onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <Select
                      value={profileForm.timezone}
                      onValueChange={(value) => setProfileForm({ ...profileForm, timezone: value })}
                    >
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                        <SelectItem value="Australia/Sydney">Australian Eastern Time (AET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleProfileUpdate}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-new-affiliate" className="flex-1">
                      New affiliate signup
                    </Label>
                    <Switch
                      id="email-new-affiliate"
                      checked={notificationSettings.emailNewAffiliate}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailNewAffiliate: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-new-advertiser" className="flex-1">
                      New advertiser signup
                    </Label>
                    <Switch
                      id="email-new-advertiser"
                      checked={notificationSettings.emailNewAdvertiser}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailNewAdvertiser: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-new-application" className="flex-1">
                      New offer application
                    </Label>
                    <Switch
                      id="email-new-application"
                      checked={notificationSettings.emailNewApplication}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailNewApplication: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-new-conversion" className="flex-1">
                      New conversion
                    </Label>
                    <Switch
                      id="email-new-conversion"
                      checked={notificationSettings.emailNewConversion}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailNewConversion: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-payment-processed" className="flex-1">
                      Payment processed
                    </Label>
                    <Switch
                      id="email-payment-processed"
                      checked={notificationSettings.emailPaymentProcessed}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailPaymentProcessed: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-system-updates" className="flex-1">
                      System updates
                    </Label>
                    <Switch
                      id="email-system-updates"
                      checked={notificationSettings.emailSystemUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailSystemUpdates: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Browser Notifications</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="browser-new-affiliate" className="flex-1">
                      New affiliate signup
                    </Label>
                    <Switch
                      id="browser-new-affiliate"
                      checked={notificationSettings.browserNewAffiliate}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, browserNewAffiliate: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="browser-new-advertiser" className="flex-1">
                      New advertiser signup
                    </Label>
                    <Switch
                      id="browser-new-advertiser"
                      checked={notificationSettings.browserNewAdvertiser}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, browserNewAdvertiser: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="browser-new-application" className="flex-1">
                      New offer application
                    </Label>
                    <Switch
                      id="browser-new-application"
                      checked={notificationSettings.browserNewApplication}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, browserNewApplication: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="browser-new-conversion" className="flex-1">
                      New conversion
                    </Label>
                    <Switch
                      id="browser-new-conversion"
                      checked={notificationSettings.browserNewConversion}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, browserNewConversion: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="browser-payment-processed" className="flex-1">
                      Payment processed
                    </Label>
                    <Switch
                      id="browser-payment-processed"
                      checked={notificationSettings.browserPaymentProcessed}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, browserPaymentProcessed: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="browser-system-updates" className="flex-1">
                      System updates
                    </Label>
                    <Switch
                      id="browser-system-updates"
                      checked={notificationSettings.browserSystemUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, browserSystemUpdates: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-gray-500" />
                      <Input
                        id="current-password"
                        type="password"
                        value={securityForm.currentPassword}
                        onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-gray-500" />
                      <Input
                        id="new-password"
                        type="password"
                        value={securityForm.newPassword}
                        onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-gray-500" />
                      <Input
                        id="confirm-password"
                        type="password"
                        value={securityForm.confirmPassword}
                        onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePasswordUpdate}
                  disabled={!securityForm.currentPassword || !securityForm.newPassword || !securityForm.confirmPassword}
                >
                  Update Password
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Two-factor authentication</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Add an extra layer of security to your account
                    </div>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={securityForm.twoFactorEnabled}
                    onCheckedChange={(checked) => setSecurityForm({ ...securityForm, twoFactorEnabled: checked })}
                  />
                </div>

                {securityForm.twoFactorEnabled ? (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800 dark:text-green-300">
                          Two-factor authentication is enabled
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                          Your account is protected with an authenticator app.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Reconfigure 2FA
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800 dark:text-yellow-300">
                          Two-factor authentication is disabled
                        </h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                          Enable two-factor authentication for enhanced account security.
                        </p>
                        <Button size="sm" className="mt-2">
                          Enable 2FA
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Active Sessions</h3>

                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          Current Session
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Chrome on Windows • IP: 192.168.1.1
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      >
                        Active Now
                      </Badge>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          Mobile App
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">iPhone 13 • IP: 192.168.1.2</div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                      >
                        Last active 2 hours ago
                      </Badge>
                    </div>
                  </div>
                </div>

                <Button variant="outline">Sign Out All Other Sessions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API keys for programmatic access to the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Your API Keys</h3>
                <Button onClick={handleCreateApiKey}>
                  <Key className="h-4 w-4 mr-2" />
                  Create New API Key
                </Button>
              </div>

              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div key={key.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{key.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Created: {formatDate(key.created)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Last used: {formatDate(key.lastUsed)}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          key.type === "live"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        }
                      >
                        {key.type === "live" ? "Live" : "Test"}
                      </Badge>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleCopyApiKey(key.id)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                        onClick={() => handleRevokeApiKey(key.id)}
                      >
                        Revoke
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-300">API Key Security</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                      Keep your API keys secure. They provide full access to your account. If you believe a key has been
                      compromised, revoke it immediately and create a new one.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your billing information and subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">Current Plan</h3>
                  <p className="text-gray-500 dark:text-gray-400">Manage your subscription plan</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                  Enterprise
                </Badge>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Enterprise Plan</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Unlimited affiliates, advertisers, and offers
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">$499/month</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Next billing: April 15, 2023</div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Method</h3>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <div className="font-medium">Visa ending in 4242</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Expires 12/2025</div>
                      </div>
                    </div>
                    <Badge variant="outline">Default</Badge>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      Remove
                    </Button>
                  </div>
                </div>

                <Button>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Billing History</h3>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>INV-001234</TableCell>
                        <TableCell>Mar 1, 2023</TableCell>
                        <TableCell>$499.00</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          >
                            Paid
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>INV-001233</TableCell>
                        <TableCell>Feb 1, 2023</TableCell>
                        <TableCell>$499.00</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          >
                            Paid
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>INV-001232</TableCell>
                        <TableCell>Jan 1, 2023</TableCell>
                        <TableCell>$499.00</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          >
                            Paid
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

