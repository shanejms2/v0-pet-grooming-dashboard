"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { LayoutDashboard, Calendar, MapIcon, Truck, Users, Settings, Scissors } from 'lucide-react';

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Bookings", href: "/bookings", icon: Calendar },
  { name: "Route Map", href: "/map", icon: MapIcon },
  { name: "GPS Tracking", href: "/tracking", icon: Truck },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Services", href: "/services", icon: Scissors },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2 font-bold text-xl text-teal-700">
          <Truck className="h-6 w-6" />
          <span>GroomerGo</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "text-teal-600" : "text-slate-400 group-hover:text-slate-500"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-medium">
            JD
          </div>
          <div className="text-sm">
            <p className="font-medium text-slate-900">John Doe</p>
            <p className="text-slate-500 text-xs">Driver / Groomer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
