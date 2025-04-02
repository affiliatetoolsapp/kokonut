"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendItem } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, LineChart, Line } from "recharts"
import type { DateRange } from "react-day-picker"

// Sample data for revenue analysis
const revenueData = [
  { date: "Jan 1", revenue: 4000, payout: 2400, profit: 1600 },
  { date: "Jan 8", revenue: 3000, payout: 1398, profit: 1602 },
  { date: "Jan 15", revenue: 2000, payout: 1200, profit: 800 },
  { date: "Jan 22", revenue: 2780, payout: 1908, profit: 872 },
  { date: "Jan 29", revenue: 1890, payout: 1800, profit: 90 },
  { date: "Feb 5", revenue: 2390, payout: 1800, profit: 590 },
  { date: "Feb 12", revenue: 3490, payout: 2300, profit: 1190 },
  { date: "Feb 19", revenue: 4000, payout: 2400, profit: 1600 },
  { date: "Feb 26", revenue: 3000, payout: 1398, profit: 1602 },
  { date: "Mar 5", revenue: 2000, payout: 1200, profit: 800 },
  { date: "Mar 12", revenue: 2780, payout: 1908, profit: 872 },
  { date: "Mar 19", revenue: 1890, payout: 1800, profit: 90 },
]

const payoutByOfferType = [
  { name: "CPA", value: 45000 },
  { name: "CPL", value: 28000 },
  { name: "CPS", value: 18000 },
  { name: "RevShare", value: 12000 },
  { name: "CPC", value: 5000 },
]

const profitMarginData = [
  { date: "Jan", margin: 40 },
  { date: "Feb", margin: 42 },
  { date: "Mar", margin: 38 },
  { date: "Apr", margin: 45 },
  { date: "May", margin: 39 },
  { date: "Jun", margin: 41 },
  { date: "Jul", margin: 43 },
  { date: "Aug", margin: 40 },
  { date: "Sep", margin: 42 },
  { date: "Oct", margin: 44 },
  { date: "Nov", margin: 46 },
  { date: "Dec", margin: 45 },
]

interface RevenueAnalysisProps {
  dateRange: DateRange
  filterType: string
}

export default function RevenueAnalysis({ dateRange, filterType }: RevenueAnalysisProps) {
  // In a real app, we would filter the data based on dateRange and filterType

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Revenue & Payouts</CardTitle>
          <CardDescription>Track revenue, affiliate payouts, and profit over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
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
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" fill="#8B5CF6" name="Revenue" />
                  <Bar dataKey="payout" fill="#3B82F6" name="Payout" />
                  <Bar dataKey="profit" fill="#10B981" name="Profit" />
                </BarChart>
              </ResponsiveContainer>
              <ChartLegend className="mt-4 justify-center">
                <ChartLegendItem name="Revenue" color="#8B5CF6" />
                <ChartLegendItem name="Payout" color="#3B82F6" />
                <ChartLegendItem name="Profit" color="#10B981" />
              </ChartLegend>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Payout by Offer Type</CardTitle>
            <CardDescription>Distribution of payouts across different offer types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={payoutByOfferType}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 80,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#374151"
                      opacity={0.1}
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis
                      type="number"
                      stroke="#6B7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      stroke="#6B7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#8B5CF6" name="Payout" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profit Margin</CardTitle>
            <CardDescription>Monthly profit margin percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={profitMarginData}
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
                      dataKey="margin"
                      stroke="#EC4899"
                      strokeWidth={2}
                      dot={true}
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
                    {item.name === "Profit Margin" || item.name === "margin" ? `${item.value}%` : `$${item.value}`}
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

