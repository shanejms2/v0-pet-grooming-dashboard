import { DashboardHeader } from '@/components/dashboard-header'
import { TrackingView } from '@/components/tracking-view'

export default function TrackingPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6 h-[calc(100vh-80px)] flex flex-col">
        <div className="flex items-center justify-between mb-6 shrink-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">GPS Tracking</h1>
            <p className="text-muted-foreground mt-1">Monitor your mobile grooming truck in real-time</p>
          </div>
        </div>

        <div className="flex-1 bg-muted rounded-lg overflow-hidden border shadow-sm">
          <TrackingView />
        </div>
      </main>
    </div>
  )
}
