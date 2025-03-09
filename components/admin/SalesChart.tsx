"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SalesChartProps {
  className?: string
}

export function SalesChart({ className }: SalesChartProps) {
  const [period, setPeriod] = useState("7d")

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Daily revenue and order count</CardDescription>
        </div>
        <Select defaultValue={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
          <p className="text-muted-foreground">Chart visualization would go here</p>
        </div>
      </CardContent>
    </Card>
  )
}

