import { Button } from '@/components/ui/button'
import { MapPin, Calendar, TruckIcon } from 'lucide-react'
import Link from 'next/link'

export function DashboardHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
              <TruckIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg">PawGrooming</h2>
              <p className="text-xs text-muted-foreground">Mobile Grooming</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Calendar className="w-4 h-4 mr-2" />
                Bookings
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/map">
                <MapPin className="w-4 h-4 mr-2" />
                Map & Routes
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tracking">
                <TruckIcon className="w-4 h-4 mr-2" />
                GPS Tracking
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
