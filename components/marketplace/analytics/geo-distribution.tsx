"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import type { DateRange } from "react-day-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Sample data for geo distribution
const conversionsByCountry = [
  { name: "United States", value: 1240, fill: "#8B5CF6" },
  { name: "United Kingdom", value: 580, fill: "#3B82F6" },
  { name: "Canada", value: 390, fill: "#10B981" },
  { name: "Australia", value: 280, fill: "#F59E0B" },
  { name: "Germany", value: 210, fill: "#EC4899" },
  { name: "Other", value: 450, fill: "#6B7280" },
]

const revenueByCountry = [
  { name: "United States", value: 56000 },
  { name: "United Kingdom", value: 26100 },
  { name: "Canada", value: 17550 },
  { name: "Australia", value: 12600 },
  { name: "Germany", value: 9450 },
  { name: "Other", value: 20250 },
]

const countryPerformanceData = [
  {
    country: "United States",
    code: "US",
    clicks: 25240,
    conversions: 1240,
    revenue: 56000,
    epc: "$2.22",
    convRate: "4.91%",
  },
  {
    country: "United Kingdom",
    code: "UK",
    clicks: 12600,
    conversions: 580,
    revenue: 26100,
    epc: "$2.07",
    convRate: "4.60%",
  },
  {
    country: "Canada",
    code: "CA",
    clicks: 8700,
    conversions: 390,
    revenue: 17550,
    epc: "$2.02",
    convRate: "4.48%",
  },
  {
    country: "Australia",
    code: "AU",
    clicks: 6300,
    conversions: 280,
    revenue: 12600,
    epc: "$2.00",
    convRate: "4.44%",
  },
  {
    country: "Germany",
    code: "DE",
    clicks: 4800,
    conversions: 210,
    revenue: 9450,
    epc: "$1.97",
    convRate: "4.38%",
  },
  {
    country: "Other Countries",
    code: "OT",
    clicks: 10900,
    conversions: 450,
    revenue: 20250,
    epc: "$1.86",
    convRate: "4.13%",
  },
]

const COLORS = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EC4899", "#6B7280"]

interface GeoDistributionProps {
  dateRange: DateRange
  filterType: string
}

export default function GeoDistribution({ dateRange, filterType }: GeoDistributionProps) {
  // In a real app, we would filter the data based on dateRange and filterType

  // Calculate total conversions for percentage
  const totalConversions = conversionsByCountry.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Conversions by Country</CardTitle>
            <CardDescription>Distribution of conversions across countries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={conversionsByCountry}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {conversionsByCountry.map((entry, index) => (
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
            <CardTitle>Revenue by Country</CardTitle>
            <CardDescription>Revenue distribution across countries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueByCountry}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 100,
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
                    <Bar dataKey="value" fill="#8B5CF6" name="Revenue" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Country Performance Details</CardTitle>
          <CardDescription>Detailed performance metrics by country</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Conversions</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>EPC</TableHead>
                  <TableHead>Conv. Rate</TableHead>
                  <TableHead>Share</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {countryPerformanceData.map((country) => (
                  <TableRow key={country.code}>
                    <TableCell>
                      <div className="font-medium">{country.country}</div>
                    </TableCell>
                    <TableCell>{country.clicks.toLocaleString()}</TableCell>
                    <TableCell>{country.conversions.toLocaleString()}</TableCell>
                    <TableCell>${country.revenue.toLocaleString()}</TableCell>
                    <TableCell>{country.epc}</TableCell>
                    <TableCell>{country.convRate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={(country.conversions / totalConversions) * 100} className="h-2 w-20" />
                        <span className="text-sm">{((country.conversions / totalConversions) * 100).toFixed(1)}%</span>
                      </div>
                    </TableCell>
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
                  {item.name}:{" "}
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {item.name === "Revenue" ? `$${item.value}` : item.value}
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

