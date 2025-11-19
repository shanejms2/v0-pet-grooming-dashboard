import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardContent } from '@/components/dashboard-content'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your pet grooming bookings and track your mobile truck</p>
          </div>
        </div>

        <DashboardContent />
      </main>
    </div>
  )
}
