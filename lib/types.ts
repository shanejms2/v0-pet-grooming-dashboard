export type BookingStatus = "Awaiting Schedule" | "Scheduled" | "Completed" | "Cancelled";

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
}

export interface Pet {
  id: string;
  name: string;
  breed: string;
  size: "Small" | "Medium" | "Large" | "Giant";
  age: number;
  specialInstructions?: string;
}

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  address: Address;
  loyaltyPoints: number;
  pets: Pet[];
}

export interface Package {
  id: string;
  name: string;
  price: number;
  estimatedDurationMinutes: number;
}

export interface Booking {
  id: string;
  customerId: string;
  customer: Customer;
  status: BookingStatus;
  scheduledTime?: string; // ISO string
  package: Package;
  notes?: string;
  groomerId?: string;
}

export interface GPSTrackingEvent {
  id: string;
  vehicleId: string;
  timestamp: string;
  lat: number;
  lng: number;
  speed: number; // km/h
  status: "Moving" | "Idle" | "Stopped";
}

export interface VehicleSummary {
  id: string;
  name: string;
  totalDistanceKm: number;
  totalTimeDrivingMinutes: number;
  totalTimeServiceMinutes: number;
  currentLocation: { lat: number; lng: number };
  status: "Active" | "Inactive";
}
