'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Mail, Clock, DollarSign, ChevronRight, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface BookingListProps {
  bookings: any[]
  onStatusChange: (id: string, status: string) => void
}

const statusConfig = {
  scheduled: { label: 'Scheduled', color: 'bg-blue-500' },
  completed: { label: 'Completed', color: 'bg-green-500' },
  awaiting: { label: 'Awaiting Schedule', color: 'bg-yellow-500' },
  cancelled: { label: 'Cancelled', color: 'bg-red-500' }
}

export function BookingList({ bookings, onStatusChange }: BookingListProps) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
        <p className="text-muted-foreground">No bookings found matching your filters.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {bookings.map((booking) => (
        <Card key={booking.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{booking.customer.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {booking.customer.loyaltyPoints} pts
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {booking.customer.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {booking.customer.email}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${statusConfig[booking.status as keyof typeof statusConfig]?.color || 'bg-gray-500'}`} />
                    <span className="text-sm font-medium">
                      {statusConfig[booking.status as keyof typeof statusConfig]?.label || booking.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{booking.customer.address}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {booking.scheduledTime ? (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{booking.scheduledTime}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">Not Scheduled</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">${booking.package.price}</span>
                    <span className="text-muted-foreground">• {booking.package.name}</span>
                  </div>
                  
                  <span className="text-muted-foreground">
                    {booking.package.duration} min
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {booking.pets.map((pet: any, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {pet.name} • {pet.breed} • {pet.size}
                    </Badge>
                  ))}
                </div>

                {booking.notes && (
                  <p className="text-sm text-muted-foreground italic">
                    Note: {booking.notes}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onStatusChange(booking.id, 'scheduled')}>
                      Mark as Scheduled
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(booking.id, 'completed')}>
                      Mark as Completed
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(booking.id, 'awaiting')}>
                      Mark as Awaiting
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => onStatusChange(booking.id, 'cancelled')}
                    >
                      Cancel Booking
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
