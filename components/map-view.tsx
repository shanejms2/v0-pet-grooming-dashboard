'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Navigation, Clock, RotateCw, Truck } from 'lucide-react'

// Mock data for map visualization
const mockRoute = [
  { id: 'start', type: 'depot', lat: 40.7128, lng: -74.0060, address: 'HQ Depot', time: '8:00 AM' },
  { id: '1', type: 'stop', lat: 40.7282, lng: -73.9942, address: '123 Maple St', time: '9:00 AM', status: 'scheduled' },
  { id: '2', type: 'stop', lat: 40.7589, lng: -73.9851, address: '456 Oak Ave', time: '11:00 AM', status: 'scheduled' },
  { id: '3', type: 'stop', lat: 40.7829, lng: -73.9654, address: '789 Pine Rd', time: '2:00 PM', status: 'completed' },
  { id: 'end', type: 'depot', lat: 40.7128, lng: -74.0060, address: 'HQ Depot', time: '5:00 PM' }
]

export function MapView() {
  const [isOptimizing, setIsOptimizing] = useState(false)

  const handleOptimize = () => {
    setIsOptimizing(true)
    setTimeout(() => setIsOptimizing(false), 1500)
  }

  return (
    <div className="flex h-full">
      {/* Sidebar for Route Details */}
      <div className="w-80 bg-card border-r flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b bg-muted/10">
          <h3 className="font-semibold mb-1">Daily Route</h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>3 stops • 42.5 km</span>
            <span>Est. 6h 30m</span>
          </div>
          <Button 
            className="w-full mt-4" 
            size="sm" 
            onClick={handleOptimize}
            disabled={isOptimizing}
          >
            {isOptimizing ? (
              <>
                <RotateCw className="w-4 h-4 mr-2 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 mr-2" />
                Optimize Route
              </>
            )}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockRoute.map((stop, index) => (
            <div key={stop.id} className="relative pl-6 pb-6 last:pb-0">
              {/* Timeline line */}
              {index !== mockRoute.length - 1 && (
                <div className="absolute left-[11px] top-3 bottom-0 w-0.5 bg-border" />
              )}
              
              {/* Timeline dot */}
              <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-background z-10
                ${stop.type === 'depot' ? 'border-primary text-primary' : 
                  stop.status === 'completed' ? 'border-green-500 text-green-500' : 'border-blue-500 text-blue-500'}`}
              >
                {stop.type === 'depot' ? (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                ) : (
                  <span className="text-xs font-bold">{index}</span>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{stop.time}</span>
                  {stop.status && (
                    <Badge variant="outline" className={`text-[10px] px-1 py-0 h-5 
                      ${stop.status === 'completed' ? 'text-green-600 border-green-200 bg-green-50' : 'text-blue-600 border-blue-200 bg-blue-50'}`}>
                      {stop.status}
                    </Badge>
                  )}
                </div>
                <p className="text-sm font-medium leading-none">{stop.address}</p>
                {index < mockRoute.length - 1 && (
                  <p className="text-xs text-muted-foreground pt-1">
                    <Truck className="w-3 h-3 inline mr-1" />
                    15 min drive
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-slate-100">
        {/* Placeholder for actual map integration */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-[url('https://api.placeholder.com/map')] bg-cover opacity-10">
          <div className="text-center p-8 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Interactive Map View</h3>
            <p className="max-w-xs text-sm">
              This area will display the interactive map with customer locations, 
              truck position, and optimized route paths.
            </p>
          </div>
        </div>

        {/* Map Controls Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button variant="secondary" size="icon" className="shadow-md bg-background">
            <Navigation className="w-4 h-4" />
          </Button>
          <Button variant="secondary" size="icon" className="shadow-md bg-background">
            <RotateCw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
