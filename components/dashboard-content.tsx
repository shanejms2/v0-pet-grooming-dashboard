'use client'

import { useState } from 'react'
import { MetricsCards } from '@/components/metrics-cards'
import { BookingFilters } from '@/components/booking-filters'
import { BookingList } from '@/components/booking-list'
import { NewBookingDialog } from '@/components/new-booking-dialog'
import { DateRange } from 'react-day-picker'
import { isWithinInterval, startOfDay, endOfDay } from 'date-fns'

// Initial mock data
const initialBookings = [
  {
    id: '1',
    status: 'scheduled',
    customer: {
      name: 'Sarah Johnson',
      phone: '(555) 123-4567',
      email: 'sarah.j@email.com',
      address: '123 Maple Street, Springfield',
      loyaltyPoints: 450
    },
    scheduledTime: '9:00 AM',
    package: {
      name: 'Premium Grooming',
      price: 85,
      duration: 90
    },
    pets: [
      { name: 'Max', breed: 'Golden Retriever', size: 'Large', age: 3 }
    ],
    notes: 'Max is nervous around clippers'
  },
  {
    id: '2',
    status: 'scheduled',
    customer: {
      name: 'Michael Chen',
      phone: '(555) 234-5678',
      email: 'mchen@email.com',
      address: '456 Oak Avenue, Springfield',
      loyaltyPoints: 220
    },
    scheduledTime: '11:00 AM',
    package: {
      name: 'Basic Bath & Trim',
      price: 55,
      duration: 60
    },
    pets: [
      { name: 'Bella', breed: 'Poodle', size: 'Medium', age: 5 },
      { name: 'Luna', breed: 'Poodle', size: 'Medium', age: 2 }
    ],
    notes: ''
  },
  {
    id: '3',
    status: 'completed',
    customer: {
      name: 'Emily Rodriguez',
      phone: '(555) 345-6789',
      email: 'emily.r@email.com',
      address: '789 Pine Road, Springfield',
      loyaltyPoints: 680
    },
    scheduledTime: '8:00 AM',
    package: {
      name: 'Deluxe Spa Package',
      price: 120,
      duration: 120
    },
    pets: [
      { name: 'Charlie', breed: 'Shih Tzu', size: 'Small', age: 7 }
    ],
    notes: 'Regular customer, prefers lavender shampoo'
  },
  {
    id: '4',
    status: 'awaiting',
    customer: {
      name: 'David Thompson',
      phone: '(555) 456-7890',
      email: 'dthompson@email.com',
      address: '321 Elm Street, Springfield',
      loyaltyPoints: 150
    },
    scheduledTime: null,
    package: {
      name: 'Basic Bath & Trim',
      price: 55,
      duration: 60
    },
    pets: [
      { name: 'Rocky', breed: 'Bulldog', size: 'Medium', age: 4 }
    ],
    notes: 'First time customer'
  }
]

export function DashboardContent() {
  const [bookings, setBookings] = useState(initialBookings)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  const handleAddBooking = (newBooking: any) => {
    setBookings([
      ...bookings,
      {
        ...newBooking,
        id: Math.random().toString(36).substr(2, 9),
        customer: {
          ...newBooking.customer,
          loyaltyPoints: 0
        }
      }
    ])
  }

  const handleStatusChange = (id: string, newStatus: string) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ))
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.phone.includes(searchQuery) ||
      booking.customer.address.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    
    let matchesDate = true
    if (dateRange?.from) {
      const bookingDate = new Date()
      const from = startOfDay(dateRange.from)
      const to = dateRange.to ? endOfDay(dateRange.to) : endOfDay(dateRange.from)
      
      matchesDate = isWithinInterval(bookingDate, { start: from, end: to })
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  const metrics = {
    todayBookings: bookings.length,
    completed: bookings.filter(b => b.status === 'completed').length,
    scheduled: bookings.filter(b => b.status === 'scheduled').length,
    distanceDriven: 42.5,
    timeOnJobs: '4h 20m',
    drivingTime: '1h 45m'
  }

  return (
    <div className="space-y-6">
      <MetricsCards metrics={metrics} />
      
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <BookingFilters 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
          <NewBookingDialog onAddBooking={handleAddBooking} />
        </div>
        
        <BookingList 
          bookings={filteredBookings} 
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  )
}
