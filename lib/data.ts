import { Booking, VehicleSummary } from "./types";

export const mockBookings: Booking[] = [
  {
    id: "BK-001",
    customerId: "CUST-001",
    customer: {
      id: "CUST-001",
      fullName: "Sarah Johnson",
      phone: "555-0123",
      email: "sarah.j@example.com",
      address: {
        street: "123 Maple Ave",
        city: "Springfield",
        state: "IL",
        zip: "62704",
        lat: 39.7817,
        lng: -89.6501,
      },
      loyaltyPoints: 150,
      pets: [
        {
          id: "PET-001",
          name: "Bella",
          breed: "Golden Retriever",
          size: "Large",
          age: 3,
          specialInstructions: "Nervous around loud noises",
        },
      ],
    },
    status: "Scheduled",
    scheduledTime: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
    package: {
      id: "PKG-001",
      name: "Full Groom",
      price: 85,
      estimatedDurationMinutes: 90,
    },
    notes: "Please use hypoallergenic shampoo",
  },
  {
    id: "BK-002",
    customerId: "CUST-002",
    customer: {
      id: "CUST-002",
      fullName: "Mike Chen",
      phone: "555-0124",
      email: "mike.c@example.com",
      address: {
        street: "456 Oak Dr",
        city: "Springfield",
        state: "IL",
        zip: "62704",
        lat: 39.7922,
        lng: -89.6555,
      },
      loyaltyPoints: 50,
      pets: [
        {
          id: "PET-002",
          name: "Max",
          breed: "Poodle",
          size: "Medium",
          age: 5,
        },
      ],
    },
    status: "Scheduled",
    scheduledTime: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(),
    package: {
      id: "PKG-002",
      name: "Bath & Brush",
      price: 55,
      estimatedDurationMinutes: 60,
    },
  },
  {
    id: "BK-003",
    customerId: "CUST-003",
    customer: {
      id: "CUST-003",
      fullName: "Emily Davis",
      phone: "555-0125",
      email: "emily.d@example.com",
      address: {
        street: "789 Pine Ln",
        city: "Springfield",
        state: "IL",
        zip: "62704",
        lat: 39.7755,
        lng: -89.6422,
      },
      loyaltyPoints: 300,
      pets: [
        {
          id: "PET-003",
          name: "Luna",
          breed: "French Bulldog",
          size: "Small",
          age: 2,
        },
        {
          id: "PET-004",
          name: "Charlie",
          breed: "Beagle",
          size: "Medium",
          age: 4,
        },
      ],
    },
    status: "Awaiting Schedule",
    package: {
      id: "PKG-001",
      name: "Full Groom",
      price: 140, // Multi-pet discount applied manually in mock
      estimatedDurationMinutes: 150,
    },
  },
  {
    id: "BK-004",
    customerId: "CUST-004",
    customer: {
      id: "CUST-004",
      fullName: "Robert Wilson",
      phone: "555-0126",
      email: "rob.w@example.com",
      address: {
        street: "321 Elm St",
        city: "Springfield",
        state: "IL",
        zip: "62704",
        lat: 39.7888,
        lng: -89.6333,
      },
      loyaltyPoints: 0,
      pets: [
        {
          id: "PET-005",
          name: "Rocky",
          breed: "German Shepherd",
          size: "Large",
          age: 1,
        },
      ],
    },
    status: "Completed",
    scheduledTime: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    package: {
      id: "PKG-003",
      name: "Nail Trim",
      price: 25,
      estimatedDurationMinutes: 20,
    },
  },
];

export const mockVehicleSummary: VehicleSummary = {
  id: "VEH-01",
  name: "Grooming Van 1",
  totalDistanceKm: 45.2,
  totalTimeDrivingMinutes: 120,
  totalTimeServiceMinutes: 240,
  currentLocation: { lat: 39.7817, lng: -89.6501 },
  status: "Active",
};
