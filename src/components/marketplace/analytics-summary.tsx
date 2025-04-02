"use client"

import { cn } from "@/lib/utils"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendItem } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const clicksData = [
  { date: "Jan 1", clicks: 1200, conversions: 84, revenue: 3780 },
  { date: "Jan 8", clicks: 1600, conversions: 112, revenue: 5040 },
  { date: "Jan 15", clicks: 1900, conversions: 133, revenue: 5985 },
  { date: "Jan 22", clicks: 1700, conversions: 119, revenue: 5355 },
  { date: "Jan 29", clicks: 2100, conversions: 147, revenue: 6615 },
  { date: "Feb 5", clicks: 2400, conversions: 168, revenue: 7560 },
  { date: "Feb 12", clicks: 2200, conversions: 154, revenue: 6930 },
  { date: "Feb 19", clicks: 2500, conversions: 175, revenue: 7875 },
  { date: "Feb 26", clicks: 2800, conversions: 196, revenue: 8820 },
  { date: "Mar 5", clicks: 3000, conversions: 210, revenue: 9450 },
  { date: "Mar 12", clicks: 2700, conversions: 189, revenue: 8505 },
  { date: "Mar 19", clicks: 3200, conversions: 224, revenue: 10080 },
]

const conversionsByOfferData = [
  { name: "VPN Subscription", value: 420 },
  { name: "Fitness App", value: 380 },
  { name: "Online Course", value: 290 },
  { name: "E-commerce", value: 250 },
  { name: "Credit Card", value: 180 },
]

const timeRanges = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "Year to date", value: "ytd" },
]

export default function AnalyticsSummary() {
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Tabs defaultValue="performance" className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={timeRange === range.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range.value)}
              className="text-xs"
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-zinc-900/70 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-4">Performance Metrics</h3>
            <div className="h-[300px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={clicksData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                    <XAxis dataKey="date" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#6B7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6, fill: "#8B5CF6" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="conversions"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6, fill: "#10B981" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <ChartLegend className="mt-4 justify-center">
                  <ChartLegendItem name="Clicks" color="#8B5CF6" />
                  <ChartLegendItem name="Conversions" color="#10B981" />
                </ChartLegend>
              </ChartContainer>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-zinc-900/70 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-4">Conversions by Offer</h3>
            <div className="h-[300px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={conversionsByOfferData}
                    layout="vertical"
                    margin={{ top: 5, right: 5, left: 50, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#374151"
                      opacity={0.1}
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis type="number" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      stroke="#6B7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      width={100}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <MetricCard title="Total Clicks" value="24,568" change="+12.5%" isPositive={true} />
        <MetricCard title="Conversions" value="1,284" change="+18.2%" isPositive={true} />
        <MetricCard title="Conversion Rate" value="5.2%" change="+2.3%" isPositive={true} />
      </div>
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
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
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

interface MetricCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
}

function MetricCard({ title, value, change, isPositive }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900/70 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800">
      <h3 className="text-sm text-zinc-600 dark:text-zinc-400">{title}</h3>
      <div className="flex items-end justify-between mt-2">
        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{value}</p>
        <span
          className={cn(
            "text-xs font-medium",
            isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
          )}
        >
          {change}
        </span>
      </div>
    </div>
  )
}

