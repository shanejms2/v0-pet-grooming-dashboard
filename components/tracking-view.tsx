'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Truck, Navigation, Clock, MapPin, AlertTriangle, Battery, Signal, History } from 'lucide-react'

// Mock GPS data
const mockTruckStatus = {
  id: 'TRUCK-01',
  driver: 'John Smith',
  status: 'moving', // moving, stopped, offline
  speed: 45, // km/h
  battery: 85, // %
  signal: 'strong',
  lastUpdate: 'Just now',
  currentLocation: 'Main St & 4th Ave',
  nextStop: '123 Maple St',
  eta: '15 mins'
}

const mockHistory = [
  { time: '10:30 AM', event: 'Arrived at 456 Oak Ave', type: 'stop' },
  { time: '10:15 AM', event: 'Route deviation detected', type: 'alert' },
  { time: '09:45 AM', event: 'Departed from 123 Maple St', type: 'move' },
  { time: '09:00 AM', event: 'Service started at 123 Maple St', type: 'service' },
  { time: '08:30 AM', event: 'Shift started', type: 'system' },
]

export function TrackingView() {
  const [status, setStatus] = useState(mockTruckStatus)
  
  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        speed: prev.status === 'moving' ? Math.floor(Math.random() * 20) + 30 : 0,
        lastUpdate: 'Just now'
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-full">
      {/* Sidebar for Truck Status */}
      <div className="w-96 bg-card border-r flex flex-col h-full overflow-hidden">
        {/* Live Status Card */}
        <div className="p-4 border-b bg-primary/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">{status.id}</h3>
                <p className="text-xs text-muted-foreground">{status.driver}</p>
              </div>
            </div>
            <Badge variant={status.status === 'moving' ? 'default' : 'secondary'}>
              {status.status.toUpperCase()}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Navigation className="w-3 h-3" /> Speed
              </span>
              <p className="font-mono font-bold text-lg">{status.speed} <span className="text-xs font-normal text-muted-foreground">km/h</span></p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Battery className="w-3 h-3" /> Battery
              </span>
              <p className="font-mono font-bold text-lg">{status.battery}%</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Current Location</p>
                <p className="font-medium">{status.currentLocation}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Next Stop (ETA: {status.eta})</p>
                <p className="font-medium">{status.nextStop}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-3 border-b bg-muted/10 flex items-center justify-between">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <History className="w-4 h-4" /> Activity Log
            </h4>
            <Badge variant="outline" className="text-xs">Today</Badge>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {mockHistory.map((item, idx) => (
                <div key={idx} className="flex gap-3 text-sm">
                  <span className="text-muted-foreground font-mono text-xs w-14 shrink-0">
                    {item.time}
                  </span>
                  <div className="space-y-1">
                    <p className="font-medium leading-none">{item.event}</p>
                    {item.type === 'alert' && (
                      <Badge variant="destructive" className="text-[10px] h-5">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Alert
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-slate-100">
        {/* Placeholder for live map */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-[url('https://api.placeholder.com/map')] bg-cover opacity-10">
          <div className="text-center p-8 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
              <div className="relative bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center">
                <Truck className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Live Tracking Active</h3>
            <p className="max-w-xs text-sm">
              Real-time location updates are being received. 
              Map visualization would render the truck's live position here.
            </p>
          </div>
        </div>

        {/* Map Overlay Controls */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-center">
          <div className="bg-background/90 backdrop-blur border rounded-full px-4 py-2 shadow-lg flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-medium">Online</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <Signal className="w-4 h-4" />
              <span>GPS Signal Strong</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
