'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { MapPin, DollarSign, Navigation, TrendingUp, Clock, Sparkles, CheckCircle2, Circle } from 'lucide-react'
import { format } from 'date-fns'

// Mock scheduled bookings for the day
const scheduledBookings = [
  {
    id: '1',
    time: '9:00 AM',
    customer: 'Sarah Johnson',
    address: '123 Maple Street',
    coordinates: { lat: 40.7282, lng: -73.9942 },
    package: 'Premium Grooming',
    value: 85,
    duration: 90,
    status: 'scheduled'
  },
  {
    id: '2',
    time: '11:00 AM',
    customer: 'Michael Chen',
    address: '456 Oak Avenue',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    package: 'Basic Bath & Trim',
    value: 55,
    duration: 60,
    status: 'scheduled'
  },
  {
    id: '3',
    time: '2:00 PM',
    customer: 'Emily Rodriguez',
    address: '789 Pine Road',
    coordinates: { lat: 40.7829, lng: -73.9654 },
    package: 'Deluxe Spa Package',
    value: 120,
    duration: 120,
    status: 'scheduled'
  }
]

// Mock available bookings (customers waiting to be scheduled)
const availableBookings = [
  {
    id: 'a1',
    customer: 'David Thompson',
    address: '321 Elm Street',
    coordinates: { lat: 40.7350, lng: -73.9900 },
    package: 'Basic Bath & Trim',
    value: 55,
    duration: 60,
    requestedTime: 'Morning preferred',
    distanceFromRoute: 0.8, // km from nearest scheduled stop
    efficiency: 95 // efficiency score
  },
  {
    id: 'a2',
    customer: 'Lisa Anderson',
    address: '234 Birch Lane',
    coordinates: { lat: 40.7720, lng: -73.9800 },
    package: 'Premium Grooming',
    value: 85,
    duration: 90,
    requestedTime: 'Afternoon preferred',
    distanceFromRoute: 1.2,
    efficiency: 88
  },
  {
    id: 'a3',
    customer: 'Robert Garcia',
    address: '567 Cedar Court',
    coordinates: { lat: 40.7450, lng: -73.9850 },
    package: 'Deluxe Spa Package',
    value: 120,
    duration: 120,
    requestedTime: 'Flexible',
    distanceFromRoute: 0.5,
    efficiency: 98
  },
  {
    id: 'a4',
    customer: 'Jennifer Lee',
    address: '890 Willow Way',
    coordinates: { lat: 40.8100, lng: -73.9500 },
    package: 'Basic Bath & Trim',
    value: 55,
    duration: 60,
    requestedTime: 'Morning preferred',
    distanceFromRoute: 4.2,
    efficiency: 62
  }
]

export function BookingScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [scheduled, setScheduled] = useState(scheduledBookings)
  const [available] = useState(availableBookings.sort((a, b) => b.efficiency - a.efficiency))

  const totalScheduledValue = scheduled.reduce((sum, b) => sum + b.value, 0)
  const totalScheduledTime = scheduled.reduce((sum, b) => sum + b.duration, 0)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Booking Scheduler</h1>
          <p className="text-muted-foreground mt-1">Optimize your daily schedule with AI-powered suggestions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Calendar & Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Daily Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Scheduled</span>
                  </div>
                  <span className="font-semibold">{scheduled.length} bookings</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span>Total Value</span>
                  </div>
                  <span className="font-semibold">${totalScheduledValue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Total Time</span>
                  </div>
                  <span className="font-semibold">{Math.floor(totalScheduledTime / 60)}h {totalScheduledTime % 60}m</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Navigation className="w-4 h-4" />
                    <span>Est. Distance</span>
                  </div>
                  <span className="font-semibold">42.5 km</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Scheduled Bookings */}
          <div>
            <Card className="h-full">
              <CardHeader className="bg-teal-50 border-b">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  Scheduled for {selectedDate ? format(selectedDate, 'MMM d') : 'Today'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                {scheduled.map((booking, index) => (
                  <div key={booking.id} className="relative pl-6">
                    {/* Timeline line */}
                    {index !== scheduled.length - 1 && (
                      <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-border" />
                    )}
                    
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-teal-500 bg-teal-50 flex items-center justify-center z-10">
                      <span className="text-xs font-bold text-teal-700">{index + 1}</span>
                    </div>

                    <div className="p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-sm">{booking.customer}</p>
                          <p className="text-xs text-muted-foreground">{booking.time}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-teal-100 text-teal-700">
                          ${booking.value}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span className="line-clamp-1">{booking.address}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{booking.duration} min • {booking.package}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Suggestions */}
          <div>
            <Card className="h-full">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  AI Suggestions
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Ranked by value and route efficiency
                </p>
              </CardHeader>
              <CardContent className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                {available.map((booking) => (
                  <div 
                    key={booking.id} 
                    className={`p-3 rounded-lg border transition-all
                      ${booking.efficiency >= 90 ? 'bg-green-50/50 border-green-200' : 
                        booking.efficiency >= 75 ? 'bg-blue-50/50 border-blue-200' : 
                        'bg-slate-50 border-slate-200'}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm">{booking.customer}</p>
                          {booking.efficiency >= 90 && (
                            <Badge className="text-[10px] px-1.5 py-0 h-4 bg-green-600">
                              Best Match
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{booking.requestedTime}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs font-semibold">
                        ${booking.value}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-1">{booking.address}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{booking.duration} min • {booking.package}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-1">
                          <Navigation className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-medium text-blue-600">
                            {booking.distanceFromRoute.toFixed(1)} km detour
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-green-600" />
                          <span className="text-xs font-medium text-green-600">
                            {booking.efficiency}% efficient
                          </span>
                        </div>
                      </div>

                      <Button 
                        size="sm" 
                        className="w-full mt-2 h-7 text-xs"
                        variant={booking.efficiency >= 90 ? "default" : "outline"}
                      >
                        Add to Schedule
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
