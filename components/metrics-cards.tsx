'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, CheckCircle2, Clock, TruckIcon } from 'lucide-react'

interface MetricsCardsProps {
  metrics?: {
    todayBookings: number
    completed: number
    scheduled: number
    distanceDriven: number
    timeOnJobs: string
    drivingTime: string
  }
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  // Default values if no metrics provided
  const data = metrics || {
    todayBookings: 0,
    completed: 0,
    scheduled: 0,
    distanceDriven: 0,
    timeOnJobs: '0h 0m',
    drivingTime: '0h 0m'
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Today's Bookings
          </CardTitle>
          <Calendar className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.todayBookings}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {data.scheduled} scheduled, {data.completed} completed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Completed Today
          </CardTitle>
          <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.completed}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {data.timeOnJobs} spent on jobs
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Distance Driven
          </CardTitle>
          <TruckIcon className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.distanceDriven} km</div>
          <p className="text-xs text-muted-foreground mt-1">
            {data.drivingTime} driving time
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Efficiency
          </CardTitle>
          <Clock className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">71%</div>
          <p className="text-xs text-muted-foreground mt-1">
            Job time vs driving time
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
