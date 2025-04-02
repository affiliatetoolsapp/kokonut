"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import type { DateRange } from "react-day-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Sample data for top offers
const topOffersByConversions = [
  { name: "Premium VPN", value: 420, fill: "#8B5CF6" },
  { name: "Fitness App", value: 380, fill: "#3B82F6" },
  { name: "Online Course", value: 290, fill: "#10B981" },
  { name: "E-commerce", value: 250, fill: "#F59E0B" },
  { name: "Credit Card", value: 180, fill: "#EC4899" },
]

const offerPerformanceData = [
  {
    id: "OFF-1234",
    name: "Premium VPN Subscription",
    advertiser: "SecureNet VPN",
    category: "Software",
    payoutType: "CPA",
    payoutValue: "$45.00",
    clicks: 5240,
    conversions: 420,
    revenue: 18900,
    epc: "$3.61",
    convRate: "8.02%",
  },
  {
    id: "OFF-2345",
    name: "Fitness App Free Trial",
    advertiser: "FitLife Pro",
    category: "Health & Fitness",
    payoutType: "CPL",
    payoutValue: "$8.50",
    clicks: 7600,
    conversions: 380,
    revenue: 3230,
    epc: "$0.42",
    convRate: "5.00%",
  },
  {
    id: "OFF-3456",
    name: "Online Course Bundle",
    advertiser: "EduMasters",
    category: "Education",
    payoutType: "RevShare",
    payoutValue: "30%",
    clicks: 4100,
    conversions: 290,
    revenue: 8700,
    epc: "$2.12",
    convRate: "7.07%",
  },
  {
    id: "OFF-4567",
    name: "E-commerce Cashback",
    advertiser: "ShopSmart",
    category: "Retail",
    payoutType: "CPS",
    payoutValue: "12%",
    clicks: 6300,
    conversions: 250,
    revenue: 7500,
    epc: "$1.19",
    convRate: "3.97%",
  },
  {
    id: "OFF-5678",
    name: "Credit Card Application",
    advertiser: "Global Finance",
    category: "Finance",
    payoutType: "CPA",
    payoutValue: "$75.00",
    clicks: 3600,
    conversions: 180,
    revenue: 13500,
    epc: "$3.75",
    convRate: "5.00%",
  },
]

const offerConversionTrend = [
  { date: "Jan", "Premium VPN": 120, "Fitness App": 100, "Online Course": 80, "E-commerce": 70, "Credit Card": 50 },
  { date: "Feb", "Premium VPN": 140, "Fitness App": 120, "Online Course": 90, "E-commerce": 80, "Credit Card": 60 },
  { date: "Mar", "Premium VPN": 160, "Fitness App": 160, "Online Course": 120, "E-commerce": 100, "Credit Card": 70 },
]

const COLORS = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EC4899"]

const payoutTypeColors = {
  CPA: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  CPC: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  CPL: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  CPS: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  RevShare: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
}

interface TopOffersProps {
  dateRange: DateRange
  filterType: string
}

export default function TopOffers({ dateRange, filterType }: TopOffersProps) {
  // In a real app, we would filter the data based on dateRange and filterType

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Top Offers by Conversions</CardTitle>
            <CardDescription>Distribution of conversions across top performing offers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topOffersByConversions}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {topOffersByConversions.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Offer Conversion Trends</CardTitle>
            <CardDescription>Monthly conversion trends for top offers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={offerConversionTrend}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                    <XAxis dataKey="date" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="Premium VPN" fill="#8B5CF6" />
                    <Bar dataKey="Fitness App" fill="#3B82F6" />
                    <Bar dataKey="Online Course" fill="#10B981" />
                    <Bar dataKey="E-commerce" fill="#F59E0B" />
                    <Bar dataKey="Credit Card" fill="#EC4899" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Offer Performance Details</CardTitle>
          <CardDescription>Detailed performance metrics for top offers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Offer</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Payout</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Conversions</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>EPC</TableHead>
                  <TableHead>Conv. Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offerPerformanceData.map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{offer.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{offer.advertiser}</div>
                      </div>
                    </TableCell>
                    <TableCell>{offer.category}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <Badge
                          variant="outline"
                          className={cn("w-fit", payoutTypeColors[offer.payoutType as keyof typeof payoutTypeColors])}
                        >
                          {offer.payoutType}
                        </Badge>
                        <span className="text-sm font-medium mt-1">{offer.payoutValue}</span>
                      </div>
                    </TableCell>
                    <TableCell>{offer.clicks.toLocaleString()}</TableCell>
                    <TableCell>{offer.conversions.toLocaleString()}</TableCell>
                    <TableCell>${offer.revenue.toLocaleString()}</TableCell>
                    <TableCell>{offer.epc}</TableCell>
                    <TableCell>{offer.convRate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltip>
        <ChartTooltipContent>
          {label && <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{label}</p>}
          <div className="space-y-1">
            {payload.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color || item.fill }} />
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {item.name}: <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.value}</span>
                </p>
              </div>
            ))}
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }
  return null
}

