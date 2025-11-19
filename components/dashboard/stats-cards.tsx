import { Calendar, CheckCircle, Clock, DollarSign } from 'lucide-react';

const stats = [
  {
    name: "Total Bookings Today",
    value: "8",
    change: "+2 from yesterday",
    icon: Calendar,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    name: "Completed Services",
    value: "3",
    change: "37% of daily goal",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    name: "Est. Revenue",
    value: "$680",
    change: "+12% vs last week",
    icon: DollarSign,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    name: "Avg. Service Time",
    value: "1h 15m",
    change: "-5m vs average",
    icon: Clock,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
            </div>
            <div className={`rounded-full p-3 ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-slate-600">{stat.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
