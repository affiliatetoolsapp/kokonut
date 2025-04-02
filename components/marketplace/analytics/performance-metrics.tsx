"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendItem } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import type { DateRange } from "react-day-picker"

// Sample data for performance metrics
const performanceData = [
  { date: "Jan 1", clicks: 1200, impressions: 15000, conversions: 84, ctr: 8.0, convRate: 7.0 },
  { date: "Jan 8", clicks: 1600, impressions: 19000, conversions: 112, ctr: 8.4, convRate: 7.0 },
  { date: "Jan 15", clicks: 1900, impressions: 22000, conversions: 133, ctr: 8.6, convRate: 7.0 },
  { date: "Jan 22", clicks: 1700, impressions: 20000, conversions: 119, ctr: 8.5, convRate: 7.0 },
  { date: "Jan 29", clicks: 2100, impressions: 24000, conversions: 147, ctr: 8.8, convRate: 7.0 },
  { date: "Feb 5", clicks: 2400, impressions: 27000, conversions: 168, ctr: 8.9, convRate: 7.0 },
  { date: "Feb 12", clicks: 2200, impressions: 25000, conversions: 154, ctr: 8.8, convRate: 7.0 },
  { date: "Feb 19", clicks: 2500, impressions: 28000, conversions: 175, ctr: 8.9, convRate: 7.0 },
  { date: "Feb 26", clicks: 2800, impressions: 31000, conversions: 196, ctr: 9.0, convRate: 7.0 },
  { date: "Mar 5", clicks: 3000, impressions: 33000, conversions: 210, ctr: 9.1, convRate: 7.0 },
  { date: "Mar 12", clicks: 2700, impressions: 30000, conversions: 189, ctr: 9.0, convRate: 7.0 },
  { date: "Mar 19", clicks: 3200, impressions: 35000, conversions: 224, ctr: 9.1, convRate: 7.0 },
]

interface PerformanceMetricsProps {
  dateRange: DateRange
  filterType: string
}

export default function PerformanceMetrics({ dateRange, filterType }: PerformanceMetricsProps) {
  // In a real app, we would filter the data based on dateRange and filterType

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Traffic & Conversions</CardTitle>
          <CardDescription>Track clicks, impressions, and conversions over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
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
                    dataKey="impressions"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, fill: "#3B82F6" }}
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
                <ChartLegendItem name="Impressions" color="#3B82F6" />
                <ChartLegendItem name="Conversions" color="#10B981" />
              </ChartLegend>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Click-Through Rate (CTR)</CardTitle>
            <CardDescription>Percentage of impressions that resulted in clicks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                    <XAxis dataKey="date" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#6B7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="ctr"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6, fill: "#F59E0B" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
            <CardDescription>Percentage of clicks that resulted in conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                    <XAxis dataKey="date" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#6B7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="convRate"
                      stroke="#EC4899"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6, fill: "#EC4899" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
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
                  {item.name}:{" "}
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {item.name.includes("Rate") ? `${item.value}%` : item.value}
                  </span>
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

