"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Send, Clock, CheckCircle, XCircle, RefreshCw, Copy, UserPlus, Building, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Sample data for pending invitations
const pendingInvitations = [
  {
    id: "INV-1234",
    email: "john.smith@example.com",
    name: "John Smith",
    type: "affiliate",
    status: "pending",
    sentDate: "2023-03-15T10:30:00Z",
    expiresDate: "2023-03-22T10:30:00Z",
  },
  {
    id: "INV-2345",
    email: "sarah.johnson@example.com",
    name: "Sarah Johnson",
    type: "affiliate",
    status: "pending",
    sentDate: "2023-03-16T09:15:00Z",
    expiresDate: "2023-03-23T09:15:00Z",
  },
  {
    id: "INV-3456",
    email: "michael.chen@example.com",
    name: "Michael Chen",
    type: "advertiser",
    status: "expired",
    sentDate: "2023-03-01T16:45:00Z",
    expiresDate: "2023-03-08T16:45:00Z",
  },
  {
    id: "INV-4567",
    email: "emily.davis@example.com",
    name: "Emily Davis",
    type: "affiliate",
    status: "accepted",
    sentDate: "2023-03-10T08:20:00Z",
    acceptedDate: "2023-03-11T14:30:00Z",
  },
  {
    id: "INV-5678",
    email: "david.wilson@example.com",
    name: "David Wilson",
    type: "advertiser",
    status: "declined",
    sentDate: "2023-03-05T13:40:00Z",
    declinedDate: "2023-03-06T09:15:00Z",
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/30">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      )
    case "accepted":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/30">
          <CheckCircle className="h-3 w-3 mr-1" />
          Accepted
        </Badge>
      )
    case "declined":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/30">
          <XCircle className="h-3 w-3 mr-1" />
          Declined
        </Badge>
      )
    case "expired":
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900/30 dark:text-gray-300 dark:hover:bg-gray-900/30">
          <AlertCircle className="h-3 w-3 mr-1" />
          Expired
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

// Type badge component
const TypeBadge = ({ type }: { type: string }) => {
  switch (type) {
    case "affiliate":
      return (
        <Badge
          variant="outline"
          className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800"
        >
          <UserPlus className="h-3 w-3 mr-1" />
          Affiliate
        </Badge>
      )
    case "advertiser":
      return (
        <Badge
          variant="outline"
          className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800"
        >
          <Building className="h-3 w-3 mr-1" />
          Advertiser
        </Badge>
      )
    default:
      return <Badge variant="outline">{type}</Badge>
  }
}

export default function InviteUsers() {
  const [inviteForm, setInviteForm] = useState({
    email: "",
    name: "",
    type: "affiliate",
    message: "",
  })

  const [bulkInviteEmails, setBulkInviteEmails] = useState("")
  const [bulkInviteType, setBulkInviteType] = useState("affiliate")
  const [bulkInviteMessage, setBulkInviteMessage] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const handleSendInvite = () => {
    // In a real app, this would make an API call to send the invitation
    toast({
      title: "Invitation sent",
      description: `Invitation sent to ${inviteForm.email}`,
    })

    // Reset form
    setInviteForm({
      email: "",
      name: "",
      type: "affiliate",
      message: "",
    })
  }

  const handleSendBulkInvites = () => {
    // In a real app, this would make an API call to send bulk invitations
    const emailCount = bulkInviteEmails.split("\n").filter((email) => email.trim()).length

    toast({
      title: "Bulk invitations sent",
      description: `${emailCount} invitations have been sent`,
    })

    // Reset form
    setBulkInviteEmails("")
    setBulkInviteType("affiliate")
    setBulkInviteMessage("")
  }

  const handleResendInvite = (invitation: any) => {
    // In a real app, this would make an API call to resend the invitation
    toast({
      title: "Invitation resent",
      description: `Invitation resent to ${invitation.email}`,
    })
  }

  const handleCancelInvite = (invitation: any) => {
    // In a real app, this would make an API call to cancel the invitation
    toast({
      title: "Invitation cancelled",
      description: `Invitation to ${invitation.email} has been cancelled`,
    })
  }

  const handleCopyInviteLink = (invitation: any) => {
    // In a real app, this would copy the invitation link to clipboard
    navigator.clipboard.writeText(`https://affiliatehub.com/invite/${invitation.id}`)

    toast({
      title: "Invitation link copied",
      description: "Invitation link copied to clipboard",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="single">
        <TabsList>
          <TabsTrigger value="single">Single Invite</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Invite</TabsTrigger>
          <TabsTrigger value="pending">Pending Invitations</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Invite a New User</CardTitle>
              <CardDescription>Send an invitation to join your affiliate program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Name (Optional)</Label>
                  <Input
                    id="name"
                    placeholder="John Smith"
                    value={inviteForm.name}
                    onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">User Type</Label>
                  <Select
                    value={inviteForm.type}
                    onValueChange={(value) => setInviteForm({ ...inviteForm, type: value })}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="affiliate">Affiliate</SelectItem>
                      <SelectItem value="advertiser">Advertiser</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Personal Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter a personal message to include in the invitation email"
                    rows={4}
                    value={inviteForm.message}
                    onChange={(e) => setInviteForm({ ...inviteForm, message: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full sm:w-auto" onClick={handleSendInvite} disabled={!inviteForm.email}>
                <Send className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Invite Users</CardTitle>
              <CardDescription>Send invitations to multiple users at once</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bulk-emails">Email Addresses</Label>
                  <Textarea
                    id="bulk-emails"
                    placeholder="Enter one email address per line"
                    rows={6}
                    value={bulkInviteEmails}
                    onChange={(e) => setBulkInviteEmails(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Enter one email address per line</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bulk-type">User Type</Label>
                  <Select value={bulkInviteType} onValueChange={setBulkInviteType}>
                    <SelectTrigger id="bulk-type">
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="affiliate">Affiliate</SelectItem>
                      <SelectItem value="advertiser">Advertiser</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bulk-message">Personal Message (Optional)</Label>
                  <Textarea
                    id="bulk-message"
                    placeholder="Enter a personal message to include in the invitation emails"
                    rows={4}
                    value={bulkInviteMessage}
                    onChange={(e) => setBulkInviteMessage(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full sm:w-auto" onClick={handleSendBulkInvites} disabled={!bulkInviteEmails.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send Bulk Invitations
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations</CardTitle>
              <CardDescription>Manage your sent invitations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sent Date</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingInvitations.length > 0 ? (
                      pendingInvitations.map((invitation) => (
                        <TableRow key={invitation.id}>
                          <TableCell>{invitation.email}</TableCell>
                          <TableCell>{invitation.name || "-"}</TableCell>
                          <TableCell>
                            <TypeBadge type={invitation.type} />
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={invitation.status} />
                          </TableCell>
                          <TableCell>{formatDate(invitation.sentDate)}</TableCell>
                          <TableCell>
                            {invitation.status === "pending" ? formatDate(invitation.expiresDate) : "-"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {invitation.status === "pending" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleCopyInviteLink(invitation)}
                                  >
                                    <Copy className="h-4 w-4" />
                                    <span className="sr-only">Copy link</span>
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleResendInvite(invitation)}
                                  >
                                    <RefreshCw className="h-4 w-4" />
                                    <span className="sr-only">Resend</span>
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleCancelInvite(invitation)}
                                  >
                                    <XCircle className="h-4 w-4" />
                                    <span className="sr-only">Cancel</span>
                                  </Button>
                                </>
                              )}
                              {invitation.status === "expired" && (
                                <Button variant="outline" size="sm" onClick={() => handleResendInvite(invitation)}>
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Resend
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No pending invitations.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

