"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/marketplace/analytics/date-range-picker"
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, MousePointerClick, ShoppingCart, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PerformanceMetrics from "./performance-metrics"
import RevenueAnalysis from "./revenue-analysis"
import TopOffers from "./top-offers"
import TopAffiliates from "./top-affiliates"
import GeoDistribution from "./geo-distribution"
import DeviceBreakdown from "./device-breakdown"

// Sample data for overview metrics
const overviewMetrics = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    isPositive: true,
    icon: DollarSign,
  },
  {
    title: "Clicks",
    value: "132,540",
    change: "+12.3%",
    isPositive: true,
    icon: MousePointerClick,
  },
  {
    title: "Conversions",
    value: "2,345",
    change: "-3.2%",
    isPositive: false,
    icon: ShoppingCart,
  },
  {
    title: "Active Affiliates",
    value: "573",
    change: "+7.4%",
    isPositive: true,
    icon: Users,
  },
]

interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  const [filterType, setFilterType] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Offers</SelectItem>
              <SelectItem value="active">Active Offers</SelectItem>
              <SelectItem value="featured">Featured Offers</SelectItem>
              <SelectItem value="paused">Paused Offers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DateRangePicker date={dateRange} onDateChange={setDateRange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={`flex items-center text-sm ${metric.isPositive ? "text-green-500" : "text-red-500"}`}>
                {metric.isPositive ? (
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                )}
                {metric.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <PerformanceMetrics dateRange={dateRange} filterType={filterType} />
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <RevenueAnalysis dateRange={dateRange} filterType={filterType} />
        </TabsContent>

        <TabsContent value="offers" className="space-y-4">
          <TopOffers dateRange={dateRange} filterType={filterType} />
        </TabsContent>

        <TabsContent value="affiliates" className="space-y-4">
          <TopAffiliates dateRange={dateRange} filterType={filterType} />
        </TabsContent>

        <TabsContent value="geography" className="space-y-4">
          <GeoDistribution dateRange={dateRange} filterType={filterType} />
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <DeviceBreakdown dateRange={dateRange} filterType={filterType} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

