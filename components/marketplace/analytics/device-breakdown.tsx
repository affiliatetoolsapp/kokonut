"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import type { DateRange } from "react-day-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Sample data for device breakdown
const conversionsByDevice = [
  { name: "Desktop", value: 1450, fill: "#8B5CF6" },
  { name: "Mobile", value: 780, fill: "#3B82F6" },
  { name: "Tablet", value: 320, fill: "#10B981" },
]

const conversionsByBrowser = [
  { name: "Chrome", value: 1240 },
  { name: "Safari", value: 580 },
  { name: "Firefox", value: 390 },
  { name: "Edge", value: 280 },
  { name: "Other", value: 60 },
]

const devicePerformanceData = [
  {
    device: "Desktop",
    clicks: 28500,
    conversions: 1450,
    revenue: 65250,
    epc: "$2.29",
    convRate: "5.09%",
  },
  {
    device: "Mobile",
    clicks: 16200,
    conversions: 780,
    revenue: 35100,
    epc: "$2.17",
    convRate: "4.81%",
  },
  {
    device: "Tablet",
    clicks: 6800,
    conversions: 320,
    revenue: 14400,
    epc: "$2.12",
    convRate: "4.71%",
  },
]

const browserPerformanceData = [
  {
    browser: "Chrome",
    clicks: 25600,
    conversions: 1240,
    revenue: 55800,
    epc: "$2.18",
    convRate: "4.84%",
  },
  {
    browser: "Safari",
    clicks: 12400,
    conversions: 580,
    revenue: 26100,
    epc: "$2.10",
    convRate: "4.68%",
  },
  {
    browser: "Firefox",
    clicks: 8200,
    conversions: 390,
    revenue: 17550,
    epc: "$2.14",
    convRate: "4.76%",
  },
  {
    browser: "Edge",
    clicks: 6100,
    conversions: 280,
    revenue: 12600,
    epc: "$2.07",
    convRate: "4.59%",
  },
  {
    browser: "Other",
    clicks: 1300,
    conversions: 60,
    revenue: 2700,
    epc: "$2.08",
    convRate: "4.62%",
  },
]

const COLORS = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EC4899"]

interface DeviceBreakdownProps {
  dateRange: DateRange
  filterType: string
}

export default function DeviceBreakdown({ dateRange, filterType }: DeviceBreakdownProps) {
  // In a real app, we would filter the data based on dateRange and filterType

  // Calculate totals for percentages
  const totalDeviceConversions = conversionsByDevice.reduce((sum, item) => sum + item.value, 0)
  const totalBrowserConversions = conversionsByBrowser.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Conversions by Device</CardTitle>
            <CardDescription>Distribution of conversions across device types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={conversionsByDevice}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {conversionsByDevice.map((entry, index) => (
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
            <CardTitle>Conversions by Browser</CardTitle>
            <CardDescription>Distribution of conversions across browsers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={conversionsByBrowser}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                    <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#3B82F6" name="Conversions" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Device Performance</CardTitle>
            <CardDescription>Performance metrics by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Conversions</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>EPC</TableHead>
                    <TableHead>Conv. Rate</TableHead>
                    <TableHead>Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devicePerformanceData.map((device) => (
                    <TableRow key={device.device}>
                      <TableCell>
                        <div className="font-medium">{device.device}</div>
                      </TableCell>
                      <TableCell>{device.clicks.toLocaleString()}</TableCell>
                      <TableCell>{device.conversions.toLocaleString()}</TableCell>
                      <TableCell>${device.revenue.toLocaleString()}</TableCell>
                      <TableCell>{device.epc}</TableCell>
                      <TableCell>{device.convRate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={(device.conversions / totalDeviceConversions) * 100} className="h-2 w-20" />
                          <span className="text-sm">
                            {((device.conversions / totalDeviceConversions) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browser Performance</CardTitle>
            <CardDescription>Performance metrics by browser</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Browser</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Conversions</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {browserPerformanceData.map((browser) => (
                    <TableRow key={browser.browser}>
                      <TableCell>
                        <div className="font-medium">{browser.browser}</div>
                      </TableCell>
                      <TableCell>{browser.clicks.toLocaleString()}</TableCell>
                      <TableCell>{browser.conversions.toLocaleString()}</TableCell>
                      <TableCell>${browser.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={(browser.conversions / totalBrowserConversions) * 100}
                            className="h-2 w-20"
                          />
                          <span className="text-sm">
                            {((browser.conversions / totalBrowserConversions) * 100).toFixed(1)}%
                          </span>
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

